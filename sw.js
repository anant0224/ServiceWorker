self.addEventListener('install', function(event) {
  console.log("Installed");
});
console.log('See');

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.log('Got here!');
  event.respondWith(new Response("Hello world!"));

});
