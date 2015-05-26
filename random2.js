var to_register = document.createElement("iframe");
to_register.setAttribute("src", "https://anant0224.github.io/ServiceWorker/register.html"); 
to_register.style.width = 640+"px"; 
to_register.style.height = 480+"px"; 
document.body.appendChild(to_register); 


function req() {
  var request = document.createElement("iframe");
  request.setAttribute("src", "https://anant0224.github.io/ServiceWorker/test.html");
  document.getElementById('ifr1').appendChild(request);
}
