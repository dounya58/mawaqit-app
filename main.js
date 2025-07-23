
if ('serviceWorker' in navigator && 'Notification' in window) {
    navigator.serviceWorker.register('sw.js').then(reg => {
        console.log('✅ Service Worker مسجل بنجاح');

        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('✅ تم السماح بالإشعارات');

                // الحصول على الموقع الجغرافي للمستخدم
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    // جلب أوقات الصلاة
                    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`)
                        .then(res => res.json())
                        .then(data => {
                            const timings = data.data.timings;
                            const now = new Date();

                            Object.entries(timings).forEach(([prayer, timeStr]) => {
                                const [hours, minutes] = timeStr.split(':');
                                const prayerTime = new Date(now);
                                prayerTime.setHours(+hours, +minutes, 0, 0);

                                // إذا كان وقت الصلاة لاحق للوقت الحالي
                                if (prayerTime > now) {
                                    const delay = prayerTime - now;

                                    console.log(`🔔 إشعار ${prayer} خلال ${Math.round(delay / 60000)} دقيقة`);

                                    setTimeout(() => {
                                        reg.showNotification("🕌 حان وقت الصلاة", {
                                            body: `🕋 حان الآن وقت صلاة ${prayer}، هيا إلى الصلاة!`,
                                            icon: "icon-512.png",
                                            vibrate: [300, 100, 300],
                                            tag: `prayer-${prayer}`
                                        });
                                    }, delay);
                                }
                            });
                        })
                        .catch(err => console.error("❌ خطأ في جلب أوقات الصلاة:", err));
                }, err => {
                    console.error("❌ فشل تحديد الموقع:", err.message);
                });
            } else {
                console.warn("⚠️ المستخدم لم يسمح بالإشعارات");
            }
        });
    }).catch(err => {
        console.error("❌ فشل تسجيل Service Worker:", err);
    });
}

