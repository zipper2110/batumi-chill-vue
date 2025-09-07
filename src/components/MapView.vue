<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Location } from '../types/Location';
import { CATEGORY_LABELS } from '../config/app';

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Props {
  locations: Location[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  locationClick: [location: Location];
  mapReady: [];
}>();


const mapContainer = ref<HTMLDivElement>();
const map = ref<L.Map | null>(null);
const markers = ref<L.Marker[]>([]);
const isMapInitialized = ref(false);

// Map configuration
const MAP_CONFIG = {
  center: [41.6168, 41.6367] as [number, number], // Batumi center
  zoom: 13,
  minZoom: 10,
  maxZoom: 18
};

// Category colors for markers
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    PARK: '#28a745',
    ATTRACTION: '#007bff',
    RESTAURANT: '#dc3545',
    BEACH: '#17a2b8',
    MUSEUM: '#6f42c1',
    SHOPPING: '#fd7e14',
    NIGHTLIFE: '#6c757d',
    HOTEL: '#20c997',
    ENTERTAINMENT: '#e83e8c',
    DESSERT: '#ffc107',
    CAFE: '#795548',
    OTHER: '#6c757d'
  };
  return colors[category] || '#6c757d';
};

// Category icons for popup
const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    PARK: '🌳',
    ATTRACTION: '🏛️',
    RESTAURANT: '🍽️',
    BEACH: '🏖️',
    MUSEUM: '🏛️',
    SHOPPING: '🛍️',
    NIGHTLIFE: '🌃',
    HOTEL: '🏨',
    ENTERTAINMENT: '🎪',
    DESSERT: '🍰',
    CAFE: '☕',
    OTHER: '📍'
  };
  return icons[category] || '📍';
};

// Create custom marker icon
const createCustomIcon = (category: string, isVisited: boolean) => {
  const color = getCategoryColor(category);
  const opacity = isVisited ? 0.7 : 1;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        opacity: ${opacity};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        font-weight: bold;
      ">
        ${isVisited ? '✓' : '📍'}
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// Initialize map
const initMap = async () => {
  if (!mapContainer.value || isMapInitialized.value) return;

  try {
    // Wait for DOM to be ready
    await nextTick();
    
    // Additional delay to ensure container is properly sized
    await new Promise(resolve => setTimeout(resolve, 200));

    if (!mapContainer.value) return;

    // Clear any existing map
    if (map.value) {
      map.value.remove();
      map.value = null;
    }

    // Create new map
    map.value = L.map(mapContainer.value, {
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
      zoomControl: true,
      attributionControl: true,
      preferCanvas: false
    });

    // Add tile layer
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      tileSize: 256,
      zoomOffset: 0,
      updateWhenIdle: true,
      keepBuffer: 2
    });

    tileLayer.addTo(map.value as L.Map);

    // Add markers
    addMarkers();

    // Force map to recalculate its size
    setTimeout(() => {
      if (map.value) {
        map.value.invalidateSize();
        map.value.setView(MAP_CONFIG.center, MAP_CONFIG.zoom);
      }
    }, 300);

    isMapInitialized.value = true;
    emit('mapReady');

  } catch (error) {
    console.error('Error initializing map:', error);
  }
};

// Add markers for all locations
const addMarkers = () => {
  if (!map.value) return;

  // Clear existing markers
  markers.value.forEach(marker => {
    if (map.value) {
      (map.value as any).removeLayer(marker);
    }
  });
  markers.value = [];

  props.locations.forEach(location => {
    const marker = L.marker([location.latitude, location.longitude], {
      icon: createCustomIcon(location.category, location.visited || false)
    });

    marker.bindPopup(`
      <div class="map-popup">
        <h3>${location.name}</h3>
        <p class="category">${CATEGORY_LABELS[location.category]}</p>
        <p class="description">${location.description.substring(0, 100)}...</p>
        ${location.address ? `<p class="address">📍 ${location.address}</p>` : ''}
        <button class="view-details-btn" onclick="window.viewLocationDetails('${location.name}')">
          Подробнее
        </button>
      </div>
    `);

    marker.on('click', () => {
      marker.openPopup();
    });

    if (map.value) {
      marker.addTo(map.value as L.Map);
    }
    markers.value.push(marker);
  });
};

// Update markers when locations change
watch(() => props.locations, () => {
  if (isMapInitialized.value) {
    addMarkers();
  }
}, { deep: true });

// Fit map to show all markers
const fitMapToMarkers = () => {
  if (!map.value || markers.value.length === 0) return;

  const bounds = L.latLngBounds(markers.value.map(marker => marker.getLatLng()));
  map.value.fitBounds(bounds, { padding: [20, 20] });
};

// Handle window resize
const handleResize = () => {
  if (map.value && isMapInitialized.value) {
    setTimeout(() => {
      map.value?.invalidateSize();
    }, 100);
  }
};

// Invalidate map size
const invalidateSize = () => {
  if (map.value && isMapInitialized.value) {
    setTimeout(() => {
      map.value?.invalidateSize();
    }, 100);
  }
};

// Expose methods for parent component
defineExpose({
  fitMapToMarkers,
  getMap: () => map.value,
  invalidateSize
});

onMounted(() => {
  // Initialize map after component is mounted
  setTimeout(() => {
    initMap();
  }, 100);
  
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
    map.value = null;
  }
  isMapInitialized.value = false;
  window.removeEventListener('resize', handleResize);
});

// Global function for popup button
(window as any).viewLocationDetails = (locationName: string) => {
  const location = props.locations.find(loc => loc.name === locationName);
  if (location) {
    emit('locationClick', location);
  }
};

</script>

<template>
  <div class="map-view">
    <div class="map-header">
      <h2>Карта Батуми</h2>
      <p class="map-subtitle">
        {{ locations.length }} мест на карте
      </p>
    </div>
    
    <div class="map-container">
      <div ref="mapContainer" class="map"></div>
    </div>
    
    <div class="map-legend">
      <h4>Легенда:</h4>
      <div class="legend-items">
        <div class="legend-item">
          <div class="legend-marker visited">✓</div>
          <span>Посещено</span>
        </div>
        <div class="legend-item">
          <div class="legend-marker not-visited">📍</div>
          <span>Не посещено</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-view {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  pointer-events: auto;
}

.map-header {
  padding: 1.5rem 1.5rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  z-index: 2;
}

.map-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.map-subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.map-container {
  position: relative;
  height: 500px;
  width: 100%;
  overflow: hidden;
  border-radius: 0;
  background: #f8f9fa;
  pointer-events: auto;
}

.map {
  height: 100%;
  width: 100%;
  border-radius: 0;
  position: relative;
  z-index: 1;
  background: #f8f9fa;
  pointer-events: auto;
}

.map-legend {
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.map-legend h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: #333;
}

.legend-items {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.legend-marker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
  font-weight: bold;
}

.legend-marker.visited {
  background-color: #28a745;
}

.legend-marker.not-visited {
  background-color: #007bff;
}

/* Ensure map tiles render properly */
:global(.leaflet-container) {
  background: #f8f9fa !important;
  font-family: inherit;
  height: 100% !important;
  width: 100% !important;
  position: relative !important;
  z-index: 1 !important;
  pointer-events: auto !important;
  touch-action: none !important;
}

:global(.leaflet-tile) {
  border: none !important;
  outline: none !important;
  image-rendering: -webkit-optimize-contrast !important;
  image-rendering: crisp-edges !important;
}

:global(.leaflet-tile-container) {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
}

:global(.leaflet-map-pane) {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
}

:global(.leaflet-interactive) {
  cursor: pointer !important;
}

:global(.leaflet-grab) {
  cursor: grab !important;
}

:global(.leaflet-grabbing) {
  cursor: grabbing !important;
}

:global(.leaflet-control-zoom) {
  border: none !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
}

:global(.leaflet-control-zoom a) {
  background-color: white !important;
  color: #333 !important;
  border: none !important;
}

:global(.leaflet-control-zoom a:hover) {
  background-color: #f8f9fa !important;
}

:global(.leaflet-popup-content-wrapper) {
  border-radius: 8px !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
}

:global(.leaflet-popup-tip) {
  background: white !important;
}

:global(.map-popup h3) {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
}

:global(.map-popup .category) {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: #667eea;
  font-weight: 500;
}

:global(.map-popup .description) {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

:global(.map-popup .address) {
  margin: 0 0 0.75rem 0;
  font-size: 0.8rem;
  color: #888;
}

:global(.map-popup .view-details-btn) {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

:global(.map-popup .view-details-btn:hover) {
  background: #5a6fd8;
}


/* Mobile responsive */
@media (max-width: 768px) {
  .map-container {
    height: 400px;
  }
  
  .map-header {
    padding: 1rem;
  }
  
  .map-header h2 {
    font-size: 1.3rem;
  }
  
  .map-legend {
    padding: 0.75rem 1rem;
  }
  
  .legend-items {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .map-container {
    height: 350px;
  }
  
  .legend-items {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
