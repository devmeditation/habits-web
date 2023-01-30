console.log('Habits Service Worker - Notifications Running!');

self.addEventListener('push', function(event) {
  const body = event.data?.text() ?? 'Habits, nem uma notificação registrada!'
  
  event.waitUntil(
    self.registration.showNotification('Habits', { 
      body, 
      icon: '/icon.png',
    })
  )
})