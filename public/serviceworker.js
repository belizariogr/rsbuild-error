self.addEventListener('push', e => {
    const notificationInfo = JSON.parse(e.data.text());
    self.registration.showNotification(notificationInfo.title, { body: notificationInfo.body, icon: '/favicon.svg', badge: '/favicon.svg' });
});