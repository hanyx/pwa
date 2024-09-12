self.addEventListener('install', function (event) {
    self.skipWaiting();
    console.log('安装')
});
self.addEventListener('activate', function (event) {
    console.log('激活成功');
    self.clients.claim()
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage('Service Worker 激活成功');
        });
    });
});
self.addEventListener('fetch', function (event) {
    console.log('fetch')
});
self.addEventListener('message', function (event) {
    console.log('sw收到主页面的消息：', event.data);
});
self.addEventListener('push', function (event) {
    console.log('sw收到push消息：', event.data.text());
});
self.addEventListener('sync', function (event) {
    console.log('sw收到sync消息：', event.tag);
});