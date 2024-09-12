self.addEventListener('fetch', function(event) {
    console.log('event', event, 'this', this)
});