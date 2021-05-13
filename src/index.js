import "./styles.css";

// Default View when intialiasing
let view = [48.856614, 2.3522219];
// Search button
const search = document.querySelector(".input");
const searchbar = document.querySelector(".searchbar");
const resultAdress = document.querySelector(".result_adress");
const resultLocation = document.querySelector(".result_location");
const resultTimezone = document.querySelector(".result_timezone");
const resultIsp = document.querySelector(".result_isp");

var mymap = L.map("mapid").setView(view, 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiZXBoeXJhcyIsImEiOiJja29sNzAydHcwY2hvMnlxcG55Z21tbzk2In0.RqKqQoj8Op_vPyW0ORXDnQ"
  }
).addTo(mymap);

function searchIp(location) {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_fgC4Ct9OY4DInzvSlQyR72g5uPNJn&ipAddress=${location}`
  )
    .then((res) => res.json())
    .then((data) => {
      view = [data.location.lat, data.location.lng];
      resultAdress.innerText = data.ip;
      resultLocation.innerText = data.location.city;
      resultTimezone.innerText = data.location.timezone;
      resultIsp.innerText = data.isp;
      mymap.flyTo([data.location.lat, data.location.lng]);
      L.marker(view).addTo(mymap);
      searchbar.value = "";
    })
    .catch((err) => {
      console.log(err);
      alert("You must enter an adress or domain");
    });
}

search.addEventListener("submit", (e) => {
  e.preventDefault();
  searchIp(searchbar.value);
});
