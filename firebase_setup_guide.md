# NotesBuddy - Firebase Setup Guide 🚀

This guide will walk you through setting up a complete Google Firebase backend for NotesBuddy from absolute scratch. 

By the end of this guide, you will have a live Database (Firestore) for your courses and subjects, and a Cloud Storage bucket for uploading real PDF files.

---

## Phase 1: Create the Firebase Project

1. Open your web browser and go to the [Firebase Console](https://console.firebase.google.com/).
2. Sign in using your Google account.
3. Click the massive **"Add project"** (or "Create a project") button.
4. **Name your project:** Type in `NotesBuddy` and click **Continue**.
5. **Google Analytics:** Since we have an Analytics Dashboard in our admin panel, **keep the switch ON** for Google Analytics. Click **Continue**.
6. **Configure Analytics:** 
   - Click the dropdown menu.
   - Select **"Default Account for Firebase"**.
7. Click **Create Project**. Wait a moment for the loading bar to finish, then click **Continue**.

---

## Phase 2: Register NotesBuddy as a Web App

Now we need to tell Firebase that we are building a website, which will generate your secret connection keys.

1. You are now on your NotesBuddy project overview dashboard. Right below the text *"Get started by adding Firebase to your app"*, click the **Web Icon** (it looks like this: `</>`).
2. **App nickname:** Type `NotesBuddy Web`.
3. **Firebase Hosting:** Do **NOT** check this box right now. We will handle hosting later.
4. Click **Register app**.
5. **Get your Secret Keys:** Firebase will now display a block of code. Look for the part that looks exactly like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyDOCAbC123...",
     authDomain: "notesbuddy-xxxx.firebaseapp.com",
     projectId: "notesbuddy-xxxx",
     storageBucket: "notesbuddy-xxxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
6. **Copy that entire `firebaseConfig` block** and save it somewhere safe (or just paste it back to me in our chat!).
7. Click **Continue to console** at the bottom.

---

## Phase 3: Turn on the Firestore Database

This database will store all text data: Course lists, Subject names, User credentials, and Contact messages.

1. On the left-hand sidebar menu, click on **Build** to expand the list.
2. Click **Firestore Database**.
3. Click the **Create database** button.
4. **Security Rules:** Select **Start in Test Mode**. 
   > *Note: This is very important. Test Mode allows our website to read and write data without us needing to write complex security rules right now. We will secure it later before going public.*
5. Click **Next**.
6. **Location:** Choose a server location closest to your users (for example, `asia-south1` for India).
7. Click **Enable**. 

---

## Phase 4: Turn on Firebase Storage

We need Firebase Storage to handle actual file uploads (like syllabus PDFs and study notes).

1. On the left-hand sidebar menu under **Build**, click on **Storage**.
2. Click **Get Started**.
3. **Security Rules:** Again, select **Start in Test mode**. Click **Next**.
4. **Location:** It should automatically select the same location you picked for the Database. Just click **Done**.

---

## Phase 5: Next Steps

You are completely done with the browser setup! 

To actually connect the NotesBuddy code to this new database, **paste the `firebaseConfig` code (from Phase 2, Step 5) into our chat.** I will write the final JavaScript code to link your files!
