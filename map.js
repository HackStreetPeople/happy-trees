// Map stuff starts here

function initMap() {
  let lenoir = { lat: 35.9140196, lng: -81.5389849 };
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: lenoir,
  });

  // ARRAY of multiple markers
  let markers = [
    {
      coords: { lat: 36.529847, lng: -80.987143 },
      content: "<h3>Double H Mitigation Site</h3>",
    },

    {
      coords: { lat: 35.350886, lng: -82.556899 },
      content: "<h3>Banner Farm Road Mitigation Site</h3>",
    },

    {
      coords: { lat: 35.40367, lng: -81.35136 },
      content: "<h3>Oak Hill Dairy Mitigation Site</h3>",
    },

    {
      coords: { lat: 35.3662, lng: -83.8026 },
      content: "<h3>East Buffalo Creek Mitigation Site</h3>",
    },
  ];

  // Loop through markers
  for (let i = 0; i < markers.length; i++) {
    // Add the marker w/ this
    addMarker(markers[i]);
  }

  function addMarker(props) {
    let marker = new google.maps.Marker({
      position: props.coords,
      map: map,
    });

    // Check the content
    if (props.content) {
      let infoWindow = new google.maps.InfoWindow({
        content: props.content,
      });

      marker.addListener("click", function () {
        infoWindow.open(map, marker);
      });
    }
  }
}
