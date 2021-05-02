mapboxgl.accessToken = "pk.eyJ1Ijoic2hhYnJ1bDI0NTEiLCJhIjoiY2tvNjU5dm9lMHdoMjJvczc2ejh5dm9nYiJ9.wySHzN2GivcJhzhPdlLlQQ"


navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
  add.addEventListener('click', () => {
    console.log(position);
  })
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
  })

  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav)

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  })

  map.addControl(directions, "top-left")
}

const add = document.querySelector(".fav");

