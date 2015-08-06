function addCinema(event){
  event.preventDefault();

  console.log('Adding a cinema');
    var json = window.localStorage.getItem('cinemas') || '[]';
    var cinemas = JSON.parse(json) || [];

    cinemas.push({
        name: $('#name').val(),
        latitude: $('#latitude').val(),
        longitude: $('#longitude').val()
    });
    console.log(cinemas)
    window.localStorage.setItem('cinemas',JSON.stringify(cinemas));
};

function clearCinemas() {

  // remove the locations from local storage
  window.localStorage.removeItem('cinemas');
};

function getLocation() {

  var location = {
    longitude: -3.6815095999999996,
    latitude: 40.4382369
  };
  //var distances = []
  var cinemas = JSON.parse(window.localStorage.getItem('cinemas'));


  cinemas.forEach(function(cinema){
 
    var distanceToCinema = distance(location.latitude, location.longitude, cinema.latitude, cinema.longitude);
    //distances.push(distanceToCinema);
    cinema.distance = distanceToCinema;

  });
  var minDistance = null;

    if (!minDistance) {
      minDistance = cinema;
      return;
    }
    if (cinema.distance < minDistance.distance) {
      minDistance = cinema;
    }
  });
  console.log('The nearest cinema is %s , %s', minDistance.name, minDistance.longitude, minDistance.latitude)
  displayMap(location.latitude, location.longitude);
}

//[{"longitude":-3.6815095999999996,"latitude":40.4382369}]
$('#save').on('click',addCinema);
$('#reset').on('click',clearCinemas);
$('#search').on('click',getLocation);


function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.853159;
  
  return dist;
}

function displayMap(lat, lon) {
  // your code here
  var src = 'https://api.mapbox.com/v4/mapbox.comic/'+lon+','+lat+',16/500x300.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
  console.log(src);
  $('#map').attr("src", src);
}