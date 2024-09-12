window.addEventListener('load', function () {
    // 注册
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
    let appPromptEvent = null;
    const installBtn = document.getElementById('installBtn');
    window.addEventListener('beforeinstallprompt', function (event) {
        console.log('触发事件：beforeinstallprompt');
        event.preventDefault();
        appPromptEvent = event;
        installBtn.hidden = false;
        return false;
    });
    installBtn.addEventListener('click', function () {
        if (appPromptEvent !== null) {
            appPromptEvent.prompt();
            appPromptEvent.userChoice.then(function (result) {
                if (result.outcome === 'accepted') {
                    console.log('同意安装应用');
                } else {
                    console.log('不同意安装应用');
                }
                appPromptEvent = null;
            });
        }
    });
    window.addEventListener('appinstalled', function () {
        console.log('应用已安装');
        installBtn.hidden = true;
    });
});