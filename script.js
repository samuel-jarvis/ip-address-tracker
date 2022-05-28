const btn = document.querySelector(".arrow-btn")
const input = document.querySelector(".js-input")
const ipAddress = document.querySelector(".js-ip-address");
const ipLocation = document.querySelector(".js-ip-location");
const ipTime = document.querySelector(".js-ip-time");
const ipISP = document.querySelector(".js-ip-isp");
const error = document.querySelector(".js-error");



const loadAPI = function (ip=0) {
  fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_2gXUBrFzVLRNxqaAB3xPREK8zkjq8&ipAddress=' + ip)
    .then(function (response) {
      console.log(response)

      if (!response.ok) {
        throw new Error(`Error ${response.status} Please enter a valid IP Address`);
      }

      return response.json();
    })
    .then(function (myJson) {
      coords = [myJson.location.lat, myJson.location.lng];
      renderIPDetails(myJson);
      renderMap(coords);
    })
    .catch (error => {
      // console.error(`${error}`);
      renderError(`${error.message}`)     
    })
}

// Initialize the map as global variable
let map;

//render map
const renderMap = function (coords) {
  // Check is map is rendered and remove
  var container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
    }
  
  map = L.map('map').setView(coords, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(coords).addTo(map)
    .bindPopup('You are here')
    .openPopup();
  
    if (L.Browser.mobile) {
      map.removeControl(map.zoomControl);
    }
}


// loads the api then render map
loadAPI();

// renders the ip details to template
const renderIPDetails = function (data) {
  ipAddress.textContent = data.ip;
  ipLocation.textContent = data.location.region;
  ipTime.textContent = "UTC " + data.location.timezone;
  ipISP.textContent = data.isp;
}


//Listen for click
btn.addEventListener('click', showMap)

// Listen for enter key
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    showMap()
  }
}); 

function showMap (){
  var ip = input.value;

  if(!ip){
    renderError("Please enter a valid IP Address");
    return
  }

  clearIPDetails();

  // map.remove()
  
  loadAPI(ip)
}

const clearIPDetails = function () {
  ipAddress.textContent = "N/A";
  ipLocation.textContent = "N/A";
  ipTime.textContent = "N/A";
  ipISP.textContent = "N/A";
}

const renderError = function (msg) {
  error.textContent = msg;
  setTimeout(function () {
    error.textContent = "";
  }, 5000);
}