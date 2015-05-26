var to_register = document.createElement("iframe");
to_register.setAttribute("src", "https://anant0224.github.io/ServiceWorker/register.html"); 
to_register.style.width = 640+"px"; 
to_register.style.height = 480+"px"; 
document.body.appendChild(to_register); 


function req() {
  var request = document.createElement("iframe");
  request.setAttribute("src", "https://anant0224.github.io/ServiceWorker/test.html");
  document.getElementById('ifr1').appendChild(request);
  
  var request = new XMLHttpRequest();
  request.open('GET', "https://anant0224.github.io/ServiceWorker/test.html");
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
}

