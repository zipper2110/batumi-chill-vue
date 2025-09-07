<script setup lang="ts">
import { ref } from 'vue';
import type { Location, LocationCategory } from './types/Location';
import type { SortOption } from './components/SortOptions.vue';
import { locations } from './data/locations';
import { useVisitedLocations } from './composables/useVisitedLocations';
import AppHeader from './components/AppHeader.vue';
import LocationList from './components/LocationList.vue';
import LocationDetail from './components/LocationDetail.vue';
import FilterPanel from './components/FilterPanel.vue';
import MapView from './components/MapView.vue';

// Состояние приложения
const currentView = ref<'list' | 'detail' | 'map'>('list');
const selectedLocation = ref<Location | null>(null);

// Используем composable для управления посещенными местами и фильтрами
const {
  locationsWithVisitedStatus,
  allLocations,
  filterOptions,
  sortOption,
  toggleVisited,
  getVisitedCount,
  getTotalCount,
  updateFilters,
  clearFilters,
  updateSort
} = useVisitedLocations(locations);

// Обработчики событий
const handleToggleVisited = (location: Location) => {
  toggleVisited(location);
  
  // Update the selected location if we're in detail view
  if (currentView.value === 'detail' && selectedLocation.value?.name === location.name) {
    // Find the updated location from the reactive list
    const updatedLocation = allLocations.value.find(loc => loc.name === location.name);
    if (updatedLocation) {
      selectedLocation.value = updatedLocation;
    }
  }
};

const handleViewDetails = (location: Location) => {
  // Always get the latest location data from the reactive list
  const latestLocation = allLocations.value.find(loc => loc.name === location.name) || location;
  selectedLocation.value = latestLocation;
  currentView.value = 'detail';
};

const handleGoBack = () => {
  currentView.value = 'list';
  selectedLocation.value = null;
};

const handleMapLocationClick = (location: Location) => {
  const latestLocation = allLocations.value.find(loc => loc.name === location.name) || location;
  selectedLocation.value = latestLocation;
  currentView.value = 'detail';
};

const mapViewRef = ref<InstanceType<typeof MapView> | null>(null);

const handleViewToggle = (view: 'list' | 'map') => {
  currentView.value = view;
  selectedLocation.value = null;
  
  // Invalidate map size when switching to map view
  if (view === 'map' && mapViewRef.value) {
    setTimeout(() => {
      mapViewRef.value?.invalidateSize();
    }, 100);
  }
};

// Filter handlers
const handleCategoryChange = (category: LocationCategory | null) => {
  updateFilters({ category: category || undefined });
};

const handleStatusChange = (status: 'all' | 'visited' | 'not-visited') => {
  const visitedStatus = status === 'all' ? undefined : status === 'visited';
  updateFilters({ visited: visitedStatus });
};

const handleSearchChange = (query: string) => {
  updateFilters({ searchQuery: query });
};

const handleClearAllFilters = () => {
  clearFilters();
};

const handleSortChange = (sort: SortOption) => {
  updateSort(sort);
};
</script>

<template>
  <div class="app">
    <AppHeader
      :total-count="getTotalCount()"
      :visited-count="getVisitedCount()"
    />

    <!-- View Toggle Navigation -->
    <nav class="view-nav">
      <div class="view-nav-content">
        <button 
          class="view-toggle"
          :class="{ active: currentView === 'list' }"
          @click="handleViewToggle('list')"
        >
          📋 Список
        </button>
        <button 
          class="view-toggle"
          :class="{ active: currentView === 'map' }"
          @click="handleViewToggle('map')"
        >
          🗺️ Карта
        </button>
      </div>
    </nav>

    <main class="main">
      <LocationList
        v-if="currentView === 'list'"
        :locations="locationsWithVisitedStatus"
        @toggle-visited="handleToggleVisited"
        @view-details="handleViewDetails"
      >
        <template #filters>
          <FilterPanel
            :selected-category="filterOptions.category || null"
            :selected-status="filterOptions.visited === undefined ? 'all' : filterOptions.visited ? 'visited' : 'not-visited'"
            :search-query="filterOptions.searchQuery || ''"
            :selected-sort="sortOption"
            @category-change="handleCategoryChange"
            @status-change="handleStatusChange"
            @search-change="handleSearchChange"
            @sort-change="handleSortChange"
            @clear-all-filters="handleClearAllFilters"
          />
        </template>
      </LocationList>

      <MapView
        v-if="currentView === 'map'"
        ref="mapViewRef"
        :locations="locationsWithVisitedStatus"
        @location-click="handleMapLocationClick"
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
  position: relative;
  overflow-x: hidden;
}

.app::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.main {
  flex: 1;
  padding: 0;
  position: relative;
  z-index: 1;
}

.view-nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
}

.view-nav-content {
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
}

.view-toggle {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.view-toggle:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-2px);
}

.view-toggle.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
}

.footer p {
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
}

/* Smooth transitions for view changes */
.main > * {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .app {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .view-nav-content {
    padding: 0.75rem;
    gap: 0.25rem;
  }
  
  .view-toggle {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .footer {
    padding: 1.5rem 1rem;
  }
  
  .footer p {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .view-nav-content {
    padding: 0.5rem;
  }
  
  .view-toggle {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .app {
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  }
}
</style>
