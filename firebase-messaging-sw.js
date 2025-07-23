
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAQWXjHqKdbCehNBok9XLMVuMVfLG30u2g",
  authDomain: "rouhaniyat-ddf02.firebaseapp.com",
  projectId: "rouhaniyat-ddf02",
  storageBucket: "rouhaniyat-ddf02.firebasestorage.app",
  messagingSenderId: "94444537651",
  appId: "1:94444537651:web:46ab667a26436805682046",
  measurementId: "G-6RKDXVC60Q"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('📥 إشعار في الخلفية:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon-512.png'
  });
});
