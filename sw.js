var swScope = /** @type {!ServiceWorkerGlobalScope} */ (self);

var swData = { numRequests: 0 };

swScope.addEventListener('install', function(event) {
  /** @const {!IDBOpenDBRequest} */
  var openRequest;
  console.log(event.target.state);
  event.waitUntil(openRequest = swScope['indexedDB'].open('requestStats'));

  //Called when opening a db with a new version, or for the first time
  openRequest.onupgradeneeded = function(event) {
    db = event.target.result; // Average 8ms
    //db.deleteObjectStore('data');
    var objectStore = db.createObjectStore('data', { autoIncrement: true });
    objectStore.transaction.oncomplete = function(event) {
      console.log("y");
      console.log("u");
      console.log("do");
    };
  };

  //Called on every successful open (after onupgradeneeded in case it is called)
  openRequest.onsuccess = function(event) {
    db = event.target.result; // Average 8ms
  };
  console.log(event.target.state);
});
console.log("Test");
swScope.addEventListener('activate', function(event) {
  console.log(event.target.state);
  event.waitUntil(new Promise(
    function(resolve, reject) {
      setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
    }).then(function(val) {
      console.log("af");
    }).catch(function(error) {
      console.log("how");
    })
  );
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
