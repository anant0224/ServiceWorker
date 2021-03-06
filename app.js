// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://x20web.corp.google.com/users/an/anantgupta/sw.js', { scope: './' }).then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
};

// function for loading each image via XHR

function imgLoad(imgJSON) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {

    var request = new XMLHttpRequest();
    request.open('GET', imgJSON.url);
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        var arrayResponse = [];
        arrayResponse[0] = request.response;
        arrayResponse[1] = imgJSON;
        resolve(arrayResponse);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();

    
  });
};

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

var imgSection = document.querySelector('section');

function create() {
  // load each set of image, alt text, name and caption
  for(i = 0; i<= Gallery.images.length - 1; i++) {
    imgLoad(Gallery.images[i]).then(function(arrayResponse) {

      var myImage = document.createElement('img');
      var myFigure = document.createElement('figure');
      var myCaption = document.createElement('caption');
      var imageURL = arrayResponse[1].url;

      myImage.src = imageURL;
      myImage.setAttribute('alt', arrayResponse[1].alt);
      myCaption.innerHTML = '<strong>' + arrayResponse[1].name + '</strong>: Taken by ' + arrayResponse[1].credit;

      imgSection.appendChild(myFigure);
      myFigure.appendChild(myImage);
      myFigure.appendChild(myCaption);

    }, function(Error) {
      console.log(Error);
    });
  };

}

function killSW() {
  console.log("tp");
  navigator.serviceWorker.getRegistration('https://anant0224.github.io/ServiceWorker/sw.js').then(function(reg) {
    if (typeof reg !== 'undefined') {
      reg.unregister().then(function(boolean) {
      // if boolean = true, unregister is successful.

        if (boolean) {
          console.log('Unregistered service worker.');
        }
        else {
          //should't reach here.
          console.log('No service worker found');
        }
      });
    }
  }).catch(function(error) {
    console.log(error);
  });
}

//window.onload = create();
