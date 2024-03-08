// Initialize Leaflet map
const map = L.map('map').setView([23.245710, 72.668848], 15); // Adjust the initial view and zoom level

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define the list of data points
const dataPoints = [
    {
        htmlPopup: "30 Road 7, Gandhinagar",
        coordinates: [23.245710, 72.668848]
    },
    {
        htmlPopup: "Ch-6, Gandhinagar",
        coordinates: [23.237869, 72.663941]
    },
    {
        htmlPopup: "Ch-5, Gandhinagar",
        coordinates: [23.229599, 72.658767]
    },
    {
        htmlPopup: "Ch Road, Sector 10B, Gandhinagar",
        coordinates: [23.225310, 72.656084]
    },
    {
        htmlPopup: "Kishan Chowk Bhavan, Gandhinagar",
        coordinates: [23.212868, 72.648288]
    },
    {
        htmlPopup: "Nyay Circle Ch-2, Gandhinagar",
        coordinates: [23.204605, 72.643145]
    },
    {
        htmlPopup: "Ch-0 Indroda Circle, Gandhinagar",
        coordinates: [23.196637, 72.639841]
    },
    {
        htmlPopup: "Dholakuva Circle, Gandhinagar",
        coordinates: [23.186070, 72.638793]
    },
    {
        htmlPopup: "Bhaijipura Circle, Gandhinagar",
        coordinates: [23.160494, 72.635893]
    },
    {
        htmlPopup: "Koba Circle, Gandhinagar",
        coordinates: [23.134066, 72.633110]
    }
];

// Loop through the data points and add markers to the map
dataPoints.forEach(dataPoint => {
    const { htmlPopup, coordinates } = dataPoint;
    L.marker(coordinates)
        .addTo(map)
        .bindPopup(htmlPopup);
});
// Handle form submission
const locationForm = document.getElementById('location-form');
const locationSelect = document.getElementById('location-select');

locationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const location = locationSelect.value;
    if (location === '') {
        alert('Please select a location');
        return;
    }

    // Find the selected location in the dataPoints array
    const selectedDataPoint = dataPoints.find(dataPoint => dataPoint.htmlPopup === location);

    if (selectedDataPoint) {
        const { coordinates } = selectedDataPoint;
        
        // Remove previous markers
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add a marker to the map
        L.marker(coordinates)
            .addTo(map)
            .bindPopup(location)
            .openPopup();

        // Pan the map to the new marker
        map.panTo(coordinates);
    } else {
        alert('Location not found');
    }
});
