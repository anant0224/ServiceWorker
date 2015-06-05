var swScope = /** @type {!ServiceWorkerGlobalScope} */ (self);

var swData = { numRequests: 0 };

swScope.addEventListener('install', function(event) {
  console.log(event.target.state);
  event.waitUntil(new Promise(
    function(resolve, reject) {
      setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(100);
                }, Math.random() * 2000 + 1000);
    }).then(function(val) {
      setTimeout(
                function() {
                    console.log("af");
                }, Math.random() * 2000 + 1000);
      
    }).catch(function(error) {
      console.log("how");
    })
  );
});
console.log("Test");
swScope.addEventListener('activate', function(event) {
console.log("good");
});
    
console.log("West");
swScope.addEventListener('fetch', function(event) {
  var transaction = db.transaction(['data'], 'readwrite');
  var objectStore = transaction.objectStore('data');
  var getRequest = objectStore.get(1);

  getRequest.onsuccess = function(event) {
    var data = getRequest.result;
    //Incrementing number of requests intercepted by service worker
    data.numRequests = data.numRequests + 1;

    var reqUpdate = getRequest.transaction.objectStore('data').put(data, 1);
  };

  // Clone the request for fetch
  // A request is a stream and can be consumed only once.
  var fetchRequest = event.request.clone();

  // Respond with content from fetch
  event.respondWith(

    // Try fetch
    fetch(fetchRequest)
      .then(function(response) {
        return response;
      })
  );
}, false);
