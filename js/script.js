mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hhYnJ1bDI0NTEiLCJhIjoiY2tvNjU5dm9lMHdoMjJvczc2ejh5dm9nYiJ9.wySHzN2GivcJhzhPdlLlQQ";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  //   console.log(position);
  const { latitude, longitude } = position.coords;
  setupPosition([longitude, latitude]);
}

function errorLocation() {
  setupPosition([0, 0]);
}

function setupPosition(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 14,
  });

  const nav = new mapboxgl.NavigationControl();

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  });

  map.addControl(directions, "top-left");
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    })
  );
  map.addControl(nav);

  map.on("style.load", function () {
    map.on("click", function (e) {
      let coordinates = e.lngLat;
      //   console.log(coordinates);
      addToFavourites(coordinates);

      //   new mapboxgl.Popup()
      //     .setLngLat(coordinates)
      //     .setHTML("you clicked here: <br/>" + coordinates)
      //     .addTo(map);
    });
  });

  function addToFavourites(coordinates) {
    let ans = window.confirm("Do you want to save the location ?");
    if (ans) {
      let addressName = window.prompt("Enter the name");

      setTimeout(() => {
        // var inpt = document.querySelector(
        //   ".mapboxgl-ctrl-geocoder input[placeholder='Choose a starting place']"
        // ).value;
        // // console.log(inpt);
        // document.querySelector(
        //   ".mapboxgl-ctrl-geocoder input[placeholder='Choose a starting place']"
        // ).value = "";
        var b = document.querySelector(".geocoder-icon-close");
        // console.log(b);
        b.click();
      }, 500);

      let { lat, lng } = coordinates;

      var fevAddress = document.getElementById("fevAddress");
      var card = document.createElement("div");
      card.className = "card";
      var card_title = document.createElement("h3");
      card_title.className = "card-title";
      var latitude = document.createElement("span");
      latitude.className = "latitude";
      var longitude = document.createElement("span");
      longitude.className = "longitude";
      var nextLine = document.createElement("br");

      card_title.innerText = addressName ? addressName : "Unknown";
      latitude.innerText = "Latitude: " + lat.toFixed(2);
      longitude.innerText = "Longitude: " + lng.toFixed(2);

      fevAddress.appendChild(card);
      card.appendChild(card_title);
      card.appendChild(latitude);
      card.appendChild(nextLine);
      card.appendChild(longitude);
    }

    // console.log(obj);
    // window.alert(
    //   "AddressName: " +
    //     addressName +
    //     "\nLat: " +
    //     lat.toFixed(2) +
    //     "\nLng: " +
    //     lng.toFixed(2)
    // );
  }
}
