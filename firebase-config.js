
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQWXjHqKdbCehNBok9XLMVuMVfLG30u2g",
  authDomain: "rouhaniyat-ddf02.firebaseapp.com",
  projectId: "rouhaniyat-ddf02",
  storageBucket: "rouhaniyat-ddf02.firebasestorage.app",
  messagingSenderId: "94444537651",
  appId: "1:94444537651:web:46ab667a26436805682046",
  measurementId: "G-6RKDXVC60Q"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// تسجيل الـ Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log("Service Worker مسجل بنجاح", registration);

      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          getToken(messaging, {
            vapidKey: "BBc2-p3ilM_UCfZGJu1ZPPr4Y1feRnZr5BVKZ7pgFE1OL4uUKmPvRk_cVovuyjvSc2pAx1F1qf7M39H6xyEd3MI", // استبدله بمفتاح VAPID العام من Firebase
            serviceWorkerRegistration: registration
          }).then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
              // أرسل التوكن إلى الخادم الخاص بك لحفظه
            } else {
              console.warn("لم يتم الحصول على التوكن.");
            }
          });
        }
      });
    });
}

// استقبال الإشعار عند فتح التطبيق
onMessage(messaging, (payload) => {
  console.log("📩 إشعار مباشر: ", payload);
  alert(`${payload.notification.title}\n${payload.notification.body}`);
});