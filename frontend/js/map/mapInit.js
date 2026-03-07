let mapInstance = null;
let currentMarkers = [];

const mapInit = {
  init: (containerId, initialCenter = [0, 0], zoom = 2) => {
    if (!window.L) {
      console.error('Leaflet is not loaded!');
      return null;
    }

    if (mapInstance) {
      mapInstance.remove();
    }

    mapInstance = L.map(containerId).setView(initialCenter, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    return mapInstance;
  },

  getMap: () => mapInstance,
  
  clearMarkers: () => {
    if (mapInstance) {
      currentMarkers.forEach(marker => mapInstance.removeLayer(marker));
      currentMarkers = [];
    }
  },

  addMarker: (lat, lng, popupContent, iconClass = '') => {
    if (!mapInstance) return;

    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class='marker-pin ${iconClass}'></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -35]
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapInstance);
    if (popupContent) {
      marker.bindPopup(popupContent);
    }
    currentMarkers.push(marker);
    return marker;
  },

  centerMap: (lat, lng, zoom = 14) => {
    if (mapInstance) {
      mapInstance.setView([lat, lng], zoom);
    }
  }
};

export default mapInit;
