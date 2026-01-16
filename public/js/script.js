const socket = io();

const routes = {
    'route1': [
        {name: 'PRATHAM DHABA (MANDIDEEP)', lat: 23.107024, lng: 77.509709}, 
        {name: 'PAL DHABA', lat: 23.127951, lng: 77.494503}, 
        {name: 'INDUS', lat: 23.181086, lng: 77.455975}, 
        {name: '11 MEEL TIRAHA ', lat: 23.141635, lng: 77.484274}, 
        {name: 'IPS SCHOOL', lat: 23.146856, lng: 77.480313}, 
        {name: 'Nirmal', lat: 23.150867, lng: 77.477294}, 
        {name: 'MISROD', lat: 23.161951203915706, lng: 77.46916344907227},
        {name: 'SHRIRAM COLONY', lat: 23.171009, lng: 77.462293},  
        {name: 'ASHIMA MALL', lat: 23.182541, lng: 77.455040},  
        {name: 'Danish Nagar', lat: 23.185374, lng: 77.453392},
        {name: 'BAGSEWANIYA THANA', lat: 23.192436, lng: 77.450464}, 
        {name: 'BU UNIVERSITY', lat: 23.199438, lng: 77.447883},
        {name: 'GANESH MANDIR', lat: 23.216491, lng: 77.440661}, 
        {name: 'RANI KAMLAPATI STATION', lat: 23.222001, lng: 77.435000},
        {name: 'UIT-RGPV ', lat: 23.309925, lng: 77.361736},
    ],
    'route2': [
        {name: 'PRABHAT PETROL PUMP', lat: 23.252508, lng: 77.430567}, 
        {name: 'ASHOKA GARDEN DASHAHRA MAIDAN', lat: 23.258893, lng: 77.431577},
        {name: 'ASHOKA GANRDEN THANA', lat: 23.260826, lng: 77.429440},
        {name: 'SANGAM TENT HOUSE', lat: 23.264441, lng: 77.424507},
        {name: 'PUSPA NAGAR PETROL PUMP', lat: 23.262933, lng: 77.418356},
        {name: 'NADRA BUS STAND', lat: 23.265585, lng: 77.405305},
        {name: 'Stop gGANESH MANDIR', lat: 23.275850, lng: 77.414825},
        {name: 'UIT-RGPV', lat: 23.309925, lng: 77.361736},
    ]
};

let selectedRoute = null;
let busStops = [];

const map = L.map("map").setView([28.6139, 77.2090], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "InnovateX"
}).addTo(map); 

const busIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=15137&format=png&color=000000',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const busStopIcon = L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=AthI4ZKv44Zs&format=png&color=000000',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
});

const stopMarkers = L.layerGroup().addTo(map);
let routingControl = null;

// Selector clicks
document.getElementById('student').addEventListener('click', () => {
    document.querySelector('.selector').style.display = 'none';
    document.getElementById('loginstudent').style.display = 'block';
});

document.getElementById('Driver').addEventListener('click', () => {
    document.querySelector('.selector').style.display = 'none';
    document.getElementById('logindriver').style.display = 'block';
});

// Student login
document.getElementById('loginBtnStudent').addEventListener('click', () => {
    selectedRoute = document.getElementById('routeSelectStudent').value;
    busStops = routes[selectedRoute];
    
    // Clear previous stops
    stopMarkers.clearLayers();
    
    // Load stops
    busStops.forEach(stop => {
        L.marker([stop.lat, stop.lng], {icon: busStopIcon}).addTo(stopMarkers).bindPopup(stop.name);
    });
    
    // Clear previous routing
    if(routingControl){
        map.removeControl(routingControl);
    }
    
    // Route via roads 
    const waypoints = busStops.map(stop => L.latLng(stop.lat, stop.lng));
    routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: false,
        createMarker: function() { return null; },
        lineOptions: {
            styles: [{ color: 'blue', weight: 5, opacity: 0.7 }]
        },
        show: false 
    }).addTo(map);
    
    document.getElementById('loginstudent').style.display = 'none';
    document.getElementById('projectname').style.display = 'none';
    document.getElementById('teamlogo').style.display = 'none';
    document.getElementById('map').style.display = 'block';
    
    map.invalidateSize();
    map.setView([busStops[0].lat, busStops[0].lng], 16);
    
    // Join room
    socket.emit("join-room", {route: selectedRoute});
});

// Driver login
document.getElementById('loginBtnDriver').addEventListener('click', () => {
    selectedRoute = document.getElementById('routeSelectDriver').value;
    const busNumber = document.getElementById('busNumber').value;
    busStops = routes[selectedRoute];
    
    // Clear previous stops
    stopMarkers.clearLayers();
    
    // Load stops
    busStops.forEach(stop => {
        L.marker([stop.lat, stop.lng], {icon: busStopIcon}).addTo(stopMarkers).bindPopup(stop.name);
    });
    
    // Clear previous routing
    if(routingControl){
        map.removeControl(routingControl);
    }
    
    // Route via roads 
    const waypoints = busStops.map(stop => L.latLng(stop.lat, stop.lng));
    routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: false,
        createMarker: function() { return null; },
        lineOptions: {
            styles: [{ color: 'blue', weight: 5, opacity: 0.7 }]
        },
        show: false 
    }).addTo(map);
    
    document.getElementById('logindriver').style.display = 'none';
    document.getElementById('projectname').style.display = 'none';
    document.getElementById('teamlogo').style.display = 'none';
    document.getElementById('map').style.display = 'block';
    
    map.invalidateSize();
    map.setView([busStops[0].lat, busStops[0].lng], 16);
    
    // Join room
    socket.emit("join-room", {route: selectedRoute});
    
    // Send location immediately and every 5 seconds
    if(navigator.geolocation){
        // Send initial location
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude, longitude} = position.coords;
            socket.emit("send-location", {latitude, longitude, route: selectedRoute, busNumber});
        }, (error)=>{
            console.error(error);
        });
        
        const locationInterval = setInterval(() => {
            navigator.geolocation.getCurrentPosition((position)=>{
                const {latitude, longitude} = position.coords;
                socket.emit("send-location", {latitude, longitude, route: selectedRoute, busNumber});
            }, (error)=>{
                console.error(error);
            });
        }, 5000);
        
        // Clear interval on page unload
        window.addEventListener('beforeunload', () => clearInterval(locationInterval));
    }
});

const markers = {};

socket.on("receive-location", (data)=>{
    const {id, latitude, longitude, busNumber} = data;
    map.setView([latitude, longitude]);

    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        markers[id] = L.marker([latitude, longitude], {icon: busIcon}).addTo(map).bindPopup(`Bus ${busNumber}`);
    }
});

socket.on("user-disconnected", (id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});