var map=L.map('map').setView([28.61,77.20],13);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

L.marker([28.61,77.20])
.addTo(map)
.bindPopup("Restaurant: Surplus Food Available");