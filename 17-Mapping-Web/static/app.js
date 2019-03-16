var API_KEY = "pk.eyJ1IjoiamVzc2ljYWNoZW4iLCJhIjoiY2p0Ymt5anliMG10cDQ0cDkwazF6eGJzaCJ9.FZ1TvCV4FbO2RFmZQs0uUg";

function createMap(data) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };
    var earthquakes = new L.LayerGroup();
    // Create an overlayMaps object to hold the earth quakes
    var overlayMaps = {
        "Earth Quakes": earthquakes
    };

    // Create the map object with options
    var myMap = L.map("map-id", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [lightmap]
    });

    function getColorForMagnitude(magnitude) {
        if (magnitude > 5) {
            return "#f44242"
        } else if (magnitude > 4) {
            return "#f47142"
        } else if (magnitude > 3) {
            return "#f49841"
        } else if (magnitude > 2) {
            return "#f49441"
        } else if (magnitude > 1) {
            return "#f4bb41"
        } else {
            return "#f4eb41";
        }
    }

    function getRadiusForMagnitude(magnitude) {
        if (magnitude === 0) {
            return 2;
        } else {
            return magnitude * 4;
        }

    }
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    function getStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColorForMagnitude(feature.properties.mag),
            color: "#000000",
            radius: getRadiusForMagnitude(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
    }
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: getStyle,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }

    }).addTo(earthquakes);

    earthquakes.addTo(myMap);


    var legend = L.control({
        position: "bottomright"
    });


    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        var grades = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
        var colors = [
            "#f4eb41", "#f4bb41", "#f49441", "#f49841", "#f47142", "#f44242"
        ];
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                "<div class = color-box style=background-color:" + colors[i] +
                " >" + grades[i] + " </div> <br>"
        }
        return div;
    };


    legend.addTo(myMap);

}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMap);