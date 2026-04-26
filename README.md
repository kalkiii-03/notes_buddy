# 🎓 NotesBuddy — Master Your Syllabus

[![Live Demo](https://img.shields.io/badge/demo-online-00e5a0?style=for-the-badge)](https://your-netlify-link.netlify.app)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**NotesBuddy** is a premium, real-time study material platform designed for college students. It provides instant access to curated notes, textbooks, previous year questions (PYQs), and syllabus details with a sleek, modern UI.

---

## ✨ Key Features

- 📱 **PWA Ready**: Install NotesBuddy on your phone or desktop like a native app.
- ⚡ **Real-time Sync**: Powered by Google Firebase—updates to courses and files reflect instantly across all users.
- 🎨 **Premium UI**: Dark-mode aesthetic with Glassmorphism, subtle noise textures, and "Electric Productivity" design system.
- 📊 **Live Analytics**: Real-time tracking of page views and file downloads for admins.
- 👨‍🏫 **Teacher Dashboard**: Dedicated portal for educators to share Google Drive links directly with students.
- 🛡️ **Admin Console**: Full CRUD operations for managing courses, subjects, teachers, and system stats.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Design System**: Custom CSS Variables, Space Grotesk & Inter Typography
- **Backend**: Google Firebase (Cloud Firestore)
- **Hosting**: Netlify / Firebase Hosting
- **Architecture**: Single Page Application (SPA) logic with real-time listeners

---

## 🚀 Project Workflow

1. **Student Journey**: Splash screen ➔ Course Selection ➔ Semester Selection ➔ Subject ➔ View/Download Materials.
2. **Teacher Workflow**: Login ➔ Submit Google Drive Link ➔ Real-time appearance on student portal.
3. **Admin Workflow**: Real-time Analytics ➔ Global Course/Subject Management ➔ Security monitoring.

---

## ⚙️ Local Setup & Installation

Follow these steps to get a local copy up and running:

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/notes_buddy.git
   ```

2. **Open the project**
   Simply open `index.html` in your browser (using Live Server in VS Code is recommended).

3. **Firebase Configuration**
   To use your own database, update the `firebaseConfig` object in `js/app.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     // ... rest of your config
   };
   ```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Programmed with ❤️ by Shivam**
