
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyAQWXjHqKdbCehNBok9XLMVuMVfLG30u2g",
  authDomain: "rouhaniyat-ddf02.firebaseapp.com",
  projectId: "rouhaniyat-ddf02",
  storageBucket: "rouhaniyat-ddf02.firebasestorage.app",
  messagingSenderId: "94444537651",
  appId: "1:94444537651:web:46ab667a26436805682046",
  measurementId: "G-6RKDXVC60Q"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
