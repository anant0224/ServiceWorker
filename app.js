// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: './' }).then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
};

// function for loading each image via XHR

function imgLoad(imgJSON, parity) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {

    if(parity == 0) {
    var init = { method: 'GET' };    
    fetch(imgJSON.url).then(function(response) {
      if (response.status == 200) {
        var arrayResponse = [];
        response.blob().then(function(myBlob) {
          arrayResponse[0] = myBlob;
          arrayResponse[1] = imgJSON;
          resolve(arrayResponse);
        });

      } else {
        reject(Error('Image didn\'t load successfully; error code:' + response.statusText));
      }
    }, function() {
      reject(Error('There was a network error.'));
    });
    }
    
    else {
    var request = new XMLHttpRequest();
    request.open('GET', null);
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
    alert('hi');
    request.send();
    }
  });
};

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

var imgSection = document.querySelector('section');

function create() {
  // load each set of image, alt text, name and caption
  for(i = 0; i< 2 * Gallery.images.length; i++) {
    imgLoad(Gallery.images[i / 2], i % 2).then(function(arrayResponse) {

      var myImage = document.createElement('img');
      var myFigure = document.createElement('figure');
      var myCaption = document.createElement('caption');
      var imageURL = window.URL.createObjectURL(arrayResponse[0]);

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


