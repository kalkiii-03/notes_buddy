// General app utilities
const currentCourseId = localStorage.getItem('currentCourseId');
const currentSem = localStorage.getItem('currentSem');
const currentSubject = localStorage.getItem('currentSubject');
const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
const currentTeacherUser = localStorage.getItem('currentTeacher');

const getCourseObj = (id) => data.courses.find(c => c.id === id);

const firebaseConfig = {
  apiKey: "AIzaSyBVMJ3QlhliATg16WTeom-TYHpqcHIbvpc",
  authDomain: "notesbuddy-46e04.firebaseapp.com",
  projectId: "notesbuddy-46e04",
  storageBucket: "notesbuddy-46e04.firebasestorage.app",
  messagingSenderId: "950454515623",
  appId: "1:950454515623:web:670f4181decf17a54f6882",
  measurementId: "G-0J83B9TPXY"
};

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
  });
}

// Dynamically load Firebase SDKs
const script1 = document.createElement('script');
script1.src = "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js";
document.head.appendChild(script1);

script1.onload = () => {
  const script2 = document.createElement('script');
  script2.src = "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore-compat.js";
  document.head.appendChild(script2);
  
  script2.onload = () => {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    console.log("Firebase Connected!");
    
    // Real-time Metadata Listener
    db.collection("appData").doc("metadata").onSnapshot(doc => {
      if (doc.exists) {
        const d = doc.data();
        data.courses = d.courses || [];
        data.subjects = d.subjects || {};
        data.teachers = d.teachers || [];
        
        if(typeof renderCourses === 'function') renderCourses();
        if(typeof renderSemesters === 'function') renderSemesters();
        if(typeof renderSubjects === 'function') renderSubjects();
        if(typeof populateAdminDropdowns === 'function') populateAdminDropdowns();
        if(typeof updateAdminStats === 'function') updateAdminStats();
        if(typeof renderAdminCourses === 'function') renderAdminCourses();
        if(typeof renderAdminTeachers === 'function') renderAdminTeachers();
        if(typeof populateDropdowns === 'function') populateDropdowns();
      }
    });

    // Real-time Files Listener (Optimized)
    let filesRef = db.collection("files");
    
    // Only fetch everything if we are an admin or on the all-files page
    // Otherwise, try to filter by the current context to save speed
    const isSpecialPage = window.location.pathname.includes('admin.html') || window.location.pathname.includes('teacher-dash.html');
    
    if (!isSpecialPage && currentSubject) {
      // If we are on a subject page, only get files for that subject
      filesRef = filesRef.where("subject", "==", currentSubject);
    } else if (!isSpecialPage && currentCourseId && currentSem) {
      // If we are on a subjects list page, get files for that sem to show badges
      filesRef = filesRef.where("course", "==", currentCourseId).where("sem", "==", currentSem.toString());
    }
    
    filesRef.onSnapshot(snapshot => {
      data.files = {};
      snapshot.forEach(doc => {
        const f = doc.data();
        f.id = doc.id;
        if (!data.files[f.subject]) data.files[f.subject] = { notes:[], books:[], pyqs:[], syllabus:[] };
        if (!data.files[f.subject][f.type]) data.files[f.subject][f.type] = [];
        data.files[f.subject][f.type].push(f);
      });
      
      if(typeof renderSubjects === 'function') renderSubjects();
      if(typeof renderContent === 'function') renderContent();
      if(typeof renderAdminAllFiles === 'function') renderAdminAllFiles();
      if(typeof renderTeacherUploads === 'function') renderTeacherUploads();
      if(typeof updateAdminStats === 'function') updateAdminStats();
      
      // If we are on the splash screen, we are now ready to go
      if(window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        setTimeout(() => window.location.href = 'home.html', 1000);
      }
    });

    // Professional Analytics: Separate Views and Daily Visitors
    const lastVisit = localStorage.getItem('nb_last_visit');
    const today = new Date().toDateString();
    
    let statsUpdate = { views: firebase.firestore.FieldValue.increment(1) };
    if (lastVisit !== today) {
      statsUpdate.visitors = firebase.firestore.FieldValue.increment(1);
      localStorage.setItem('nb_last_visit', today);
    }
    
    db.collection("appData").doc("stats").update(statsUpdate).catch(() => {
      db.collection("appData").doc("stats").set({ views: 1, visitors: 1, downloads: 0 }, { merge: true });
    });

    // If a page has a specific onFirebaseLoad function, call it
    if (typeof window.onFirebaseLoad === 'function') {
      window.onFirebaseLoad();
    }
  };
};

async function migrateDataToFirebase() {
  try {
    // 1. Migrate courses, subjects, and teachers
    await db.collection("appData").doc("metadata").set({
      courses: data.courses,
      subjects: data.subjects,
      teachers: data.teachers
    });
    
    // 2. Migrate files
    const batch = db.batch();
    for (const subject in data.files) {
      // Find course and sem
      let cId = "", semId = "";
      for (const c in data.subjects) {
        for (const s in data.subjects[c]) {
          if (data.subjects[c][s].includes(subject)) {
            cId = c; semId = s; break;
          }
        }
      }
      
      for (const type in data.files[subject]) {
        data.files[subject][type].forEach(f => {
          const docRef = db.collection("files").doc();
          batch.set(docRef, {
            course: cId,
            sem: semId,
            subject: subject,
            type: type,
            name: f.name,
            size: f.size || "Link",
            url: f.url || "#",
            credit: f.credit || "Admin",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
      }
    }
    await batch.commit();
    console.log("Migration completely successful!");
    alert("Live Database Connected! Migration successful. You can now refresh.");
  } catch(e) {
    console.error("Migration failed:", e);
  }
}

let toastTimer;
function showToast(msg) {
  // Ensure a toast container exists
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerText = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 3000);
}
// Floating Contact Button injection
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById('global-contact-btn') && !window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('contact.html')) {
    const btn = document.createElement('a');
    btn.id = 'global-contact-btn';
    btn.className = 'support-pill';
    btn.href = 'contact.html';
    btn.innerHTML = '✉️ Contact Me';
    document.body.appendChild(btn);
  }
});

function togglePassword(inputId, spanEl) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    spanEl.innerText = 'Hide';
  } else {
    input.type = 'password';
    spanEl.innerText = 'Show';
  }
}
