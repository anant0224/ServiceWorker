var swScope = /** @type {!ServiceWorkerGlobalScope} */ (self);

var swData = { numRequests: 0 };

swScope.addEventListener('install', function(event) {
  event.waitUntil(
    goog.db.openDatabase('mydb', 1, function(ev, db, tx) {
      db.createObjectStore('mystore');
    }).addCallback(function(db) {
      var putTx = db.createTransaction(
          [],
          goog.db.Transaction.TransactionMode.READ_WRITE);
      var store = putTx.objectStore('mystore');
      store.put('value', 'key');
      goog.listen(putTx, goog.db.Transaction.EventTypes.COMPLETE, function() {
        var getTx = db.createTransaction([]);
        var request = getTx.objectStore('mystore').get('key');
        request.addCallback(function(result) {
          
        });
      });
    })
  );
}

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
