const btn = document.querySelector(".arrow-btn")
const input = document.querySelector(".js-input")
const ipAddress = document.querySelector(".js-ip-address");
const ipLocation = document.querySelector(".js-ip-location");
const ipTime = document.querySelector(".js-ip-time");
const ipISP = document.querySelector(".js-ip-isp");


const loadIp = function (ip=0) {
  // fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_2gXUBrFzVLRNxqaAB3xPREK8zkjq8&ipAddress=' + ip)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);

      coords = [myJson.location.lat, myJson.location.lng];
      renderIPDetails(myJson);
      renderMap(coords);
    });
}

// loads the api then render map
loadIp()

// renders the ip details to template
const renderIPDetails = function (data) {
  ipAddress.textContent = data.ip;
  ipLocation.textContent = data.location.region;
  ipTime.textContent = data.location.timezone;
  ipISP.textContent = data.isp;
}

// Initialize the map as global variable
let map;

//render map
const renderMap = function (coords) {
  map = L.map('map').setView(coords, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(coords).addTo(map)
    .bindPopup('You are here')
    .openPopup();
}


function showMap (){
  var ip = input.value;
  if(!ip) {
    return
  }
  map.remove()
  loadIp(ip)
}

// Error handling
  
//Listen for click
btn.addEventListener('click', showMap)

// Listen for enter key
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    showMap()
  }
});