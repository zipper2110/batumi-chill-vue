<script setup lang="ts">
import { ref } from 'vue';
import type { Location } from './types/Location';
import { locations } from './data/locations';
import { useVisitedLocations } from './composables/useVisitedLocations';
import AppHeader from './components/AppHeader.vue';
import LocationList from './components/LocationList.vue';
import LocationDetail from './components/LocationDetail.vue';

// Состояние приложения
const currentView = ref<'list' | 'detail'>('list');
const selectedLocation = ref<Location | null>(null);

// Используем composable для управления посещенными местами
const {
  locationsWithVisitedStatus,
  toggleVisited,
  getVisitedCount,
  getTotalCount
} = useVisitedLocations(locations);

// Обработчики событий
const handleToggleVisited = (location: Location) => {
  toggleVisited(location);
  
  // Update the selected location if we're in detail view
  if (currentView.value === 'detail' && selectedLocation.value?.name === location.name) {
    // Find the updated location from the reactive list
    const updatedLocation = locationsWithVisitedStatus.value.find(loc => loc.name === location.name);
    if (updatedLocation) {
      selectedLocation.value = updatedLocation;
    }
  }
};

const handleViewDetails = (location: Location) => {
  // Always get the latest location data from the reactive list
  const latestLocation = locationsWithVisitedStatus.value.find(loc => loc.name === location.name) || location;
  selectedLocation.value = latestLocation;
  currentView.value = 'detail';
};

const handleGoBack = () => {
  currentView.value = 'list';
  selectedLocation.value = null;
};
</script>

<template>
  <div class="app">
    <AppHeader 
      :total-count="getTotalCount()"
      :visited-count="getVisitedCount()"
    />
    
    <main class="main">
      <LocationList 
        v-if="currentView === 'list'"
        :locations="locationsWithVisitedStatus"
        @toggle-visited="handleToggleVisited"
        @view-details="handleViewDetails"
      />
      
      <LocationDetail 
        v-if="currentView === 'detail' && selectedLocation"
        :location="selectedLocation"
        @toggle-visited="handleToggleVisited"
        @go-back="handleGoBack"
      />
    </main>
    
    <footer class="footer">
      <p>Создано с ❤️ для любителей Батуми</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.main {
  flex: 1;
  padding: 0;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.footer p {
  margin: 0;
  opacity: 0.8;
}
</style>
