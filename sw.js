self.addEventListener('push', function(event) {
  const data = event.data ? event.data.text() : 'حان وقت الصلاة!';
  const options = {
    body: data,
    icon: 'icon-512.png',
    badge: 'icon-512.png',
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification("⏰ تنبيه الصلاة", options)
  );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
