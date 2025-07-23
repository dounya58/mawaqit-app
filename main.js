
if ('serviceWorker' in navigator && 'Notification' in window) {
    navigator.serviceWorker.register('sw.js').then(reg => {
        console.log('Service Worker registered', reg);

        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');

                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`)
                        .then(res => res.json())
                        .then(data => {
                            const timings = data.data.timings;
                            const now = new Date();

                            Object.entries(timings).forEach(([prayer, timeStr]) => {
                                const [hours, minutes] = timeStr.split(':');
                                const prayerTime = new Date(now.toDateString() + ' ' + hours + ':' + minutes);

                                if (prayerTime > now) {
                                    const delay = prayerTime - now;
                                    setTimeout(() => {
                                        reg.showNotification("🕌 حان وقت الصلاة", {
                                            body: `حان الآن وقت ${prayer}، هيا بنا إلى الصلاة!`,
                                            icon: "icon-512.png",
                                            vibrate: [200, 100, 200],
                                            tag: "prayer-notification"
                                        });
                                    }, delay);
                                }
                            });
                        });
                });
            }
        });
    });
}
