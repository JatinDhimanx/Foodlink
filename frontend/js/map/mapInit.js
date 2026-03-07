var map = L.map('map').setView([28.6139,77.2090],13);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19
}
).addTo(map);

var marker = L.marker([28.6139,77.2090]).addTo(map);

marker.bindPopup(
"Restaurant: Pizza Hub <br> Food: 20 meals"
);