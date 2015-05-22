var request = new XMLHttpRequest();
    request.open('GET', "https://commons.wikimedia.org/wiki/File:Hippie-flower_-_Virginia_-_ForestWander.jpg");
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        console.log("Success");
      } else {
        console.log(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      console.log(Error('There was a network error.'));
    };

    // Send the request
    request.send();

