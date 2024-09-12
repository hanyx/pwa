let sw;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js', { scope: './' })
            .then(function (registration) {
                console.log('注册成功');
                // 注册成功以后才能进行通信
                registration.active?.postMessage("serviceWorker注册成功了");
                sw = registration.active;
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', function() {
                    console.log('状态', newWorker)
                });
            })
            .catch(function (err) {
                console.log('err', err)
            });
    });
    navigator.serviceWorker.addEventListener('message', function (e) {
        console.log('主页面收到的消息', e.data); // this message is from sw.js, to page
    });
    function unregister() {
        const serviceWorker = navigator.serviceWorker;
        if (typeof serviceWorker.getRegistrations === 'function') {
            serviceWorker.getRegistrations().then(function (registrations) {
                registrations.forEach(function (registration) {
                    registration.unregister();
                });
            });
        } else if (typeof serviceWorker.getRegistration === 'function') {
            serviceWorker.getRegistration().then(function (registration) {
                registration.unregister();
            })
        }
    }
}
function sendMessage() {
    sw.postMessage("发送一个消息");
}
