mapboxgl.accessToken = 'pk.eyJ1IjoiYW5lZXNodGlnZ2EiLCJhIjoiY2plbXJ6YmpxMWJpYzJxbzhvaG14ZXQ1ayJ9.BWIXf2Xyj_7tzayM6zl1Aw';

current = {}

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
    current = position
}

function errorLocation(position) {}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        // style: 'mapbox://styles/mapbox/navigation-day-v1',
        center: center,
        zoom: 14
    })

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        interactive: false,
        controls: false
    });

    const wayPoints = [
        {'lon':-79.42652, 'lat':43.653195},
        {'lon':-79.440794, 'lat':43.678883},
        {'lon':-79.411766, 'lat':43.688618},
        {'lon':-79.423306, 'lat':43.733118},
        {'lon':-79.3460488, 'lat':43.7360176},
        {'lon':-79.361907, 'lat':43.704906},
        {'lon':-79.399731, 'lat':43.68729},
        {'lon':-79.392018, 'lat':43.678601},
        {'lon':-79.387855, 'lat':43.665471},
        {'lon':-79.38656800000001, 'lat':43.647228999999996},
        {'lon':-79.38374250000001, 'lat':43.6427425},
        {'lon':-79.374808, 'lat':43.641897},
        {'lon':-79.39364, 'lat':43.644777}
    ]


    map.on('load', () =>  {
        directions.setOrigin([current.coords.longitude, current.coords.latitude]);
        wayPoints.forEach((w, i) => {
            directions.addWaypoint(i, [w.lon, w.lat]);
            new mapboxgl.Marker().setLngLat([w.lon, w.lat]).addTo(map);
            console.log(i+1, [w.lon, w.lat])
        });
        directions.setDestination([-79.425792, 43.652645]);
        zoom: 14;
    })
      
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
        }));

    map.addControl(directions);

};


var firebaseConfig = {
    apiKey: "AIzaSyAEaulieiixPWSB_O96p3aWMyxuI_sRBKE",
    authDomain: "ltgrouting.firebaseapp.com",
    projectId: "ltgrouting",
    storageBucket: "ltgrouting.appspot.com",
    messagingSenderId: "244666722335",
    appId: "1:244666722335:web:e35d2952f1c31091930d2a",
    measurementId: "G-Z901D1ZJ85"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signoutfun() {
    auth.signOut();
    console.log("Signed Out");
};

auth.onAuthStateChanged(function(user) {
    if(user){
        var email = user.email;
        console.log("Active user: "+email);
    }else {
        console.log("No Active user");
        window.location = '/index.html';
    }
});

var today = new Date().toISOString().split('T')[0];
document.getElementsByName("somedate")[0].setAttribute('min', today);


// Get booking locations

function CallWebAPI() {
    var newdate = document.getElementById('bookingdate').value;

    let link = 'https://struckhigh.co.in/acuity/route.php/?newdate=' + newdate;

    fetch(link,
        {
            method: 'GET'
        })
            .then(response=>{
                return response.json();
            }).then(json=>{
                filterLoc(json)
            });

    function filterLoc(json) {
        let locations = [];
        for (let index = 0; index < json.length; ++index) {
            locations.push(json[index]['location']);
        }
        geoCode(locations);
    };

    function geoCode(locations) {
        let geocodes = {};
        let gcodeend = 'https://struckhigh.co.in/acuity/geocode.php/?address=';
        for (let index = 0; index < locations.length; ++index) {
            temploc = locations[index];
            encodeaddr = encodeURI(temploc.replace(/,/g, '').replace(/\./g, ""));
            tempurl = gcodeend + encodeaddr;

            fetch(tempurl,
                {
                    method: 'GET'
                })
                    .then(response=>{
                        return response.json();
                    }).then(json=>{
                        geocodes[json['query']] = json['features'][0]['geometry']['coordinates'];                    
                    });
        }
        console.log(geocodes)
    }

};