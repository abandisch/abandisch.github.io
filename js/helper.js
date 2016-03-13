/*

 This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

 Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

 Cameron Pittman
 */

/* Custom Additions */
var fontAwesomeIcon = '<i class="fa %data%"></i>';
var contactDetailsButton = '<p id="contact-details">Contact Details <i class="fa fa-bars"></i></p>';
var drawer = '<div id="drawer"></div>';

/*
 These are HTML strings. As part of the course, you'll be using JavaScript functions
 replace the %data% placeholder text you see in them.
 */
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span id="role">%data%</span><hr/>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';


/*
 The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
 */
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName() || function(){};
    $('#name').html(iName);
  });
});

/*
 The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
 */
clickLocations = [];

function logClicks(x,y) {

  clickLocations.push(
      {
        x: x,
        y: y
      }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  // your code goes here!
  var x = loc.pageX;
  var y = loc.pageY;
  logClicks(x, y);
});



/*
 This is the fun part. Here's where we generate the custom Google Map for the website.
 See the documentation below for more details.
 https://developers.google.com/maps/documentation/javascript/reference
 */
var map;    // declares a global map variable


/*
 Start here! initializeMap() is called when page is loaded.
 */
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /*
   For the map to be displayed, the googleMap var must be
   appended to #mapDiv in resumeBuilder.js.
   */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
   locationFinder() returns an array of every location string from the JSONs
   written for bio, education, and work.

   AlexB: Updated locationFinder() so it doesn't add duplicate locations

   */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // Variable for new locations
    var newLocation;

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array
    for (var school in education.schools) {
      newLocation = education.schools[school].location;

      // Check if new location exists, if not, add it to the locations array
      if (!containsLocation(locations, newLocation)) {
        locations.push(newLocation);
      }

    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      newLocation = work.jobs[job].location;

      // Check if new location exists, if not, add it to the locations array
      if (!containsLocation(locations, newLocation)) {
        locations.push(newLocation);
      }
    }

    return locations;
  }

  /*
   AlexB: containsLocation(allLocations, newLocation) returns true if the given newLocation
   is in the array allLocations, false otherwise
   */
  function containsLocation(allLocations, newLocation) {
    return (allLocations.indexOf(newLocation) >= 0);
  }

  /*
   createMapMarker(placeData) reads Google Places search results to create map pins.
   placeData is the object returned from search results containing information
   about a single location.

   AlexB: Added "Drop" animation and bounce on click animation for markers (Source: https://developers.google.com/maps/documentation/javascript/examples/marker-animations-iteration)

   */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      animation: google.maps.Animation.DROP, // Drops the marker into the map
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    // Adds click event listener for the marker that if clicked will toggle the
    // info window and the bounce animation of the marker
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
        infoWindow.open(map, marker);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        infoWindow.close();
      }
    });

    // An event listener that checks if the map has loaded, then makes the markers bounce
    google.maps.event.addListener(map, 'idle', function () {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    });

    // An event listener that checks if infoWindow has been closed, then makes the marker bounce
    google.maps.event.addListener(infoWindow, 'closeclick', function () {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());

    // Set custom zoom level
    //map.setZoom(10);
  }

  /*
   callback(results, status) makes sure the search returned results for a location.
   If so, it creates a new map marker for that location.
   */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
   pinPoster(locations) takes in the array of locations created by locationFinder()
   and fires off Google place searches for each location
   */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
 Uncomment the code below when you're ready to implement a Google Map!
 */

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
//window.addEventListener('resize', function(e) {
//Make sure the map bounds get updated on page resize
//  map.fitBounds(mapBounds);
//});
