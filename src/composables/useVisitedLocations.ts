import { ref, watch, computed } from 'vue';
import type { Location, LocationCategory, FilterOptions } from '../types/Location';

const STORAGE_KEY = 'batumi-guide-visited-locations';

// Получаем сохраненные данные из LocalStorage
const getStoredVisitedLocations = (): Set<string> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.warn('Failed to load visited locations from localStorage:', error);
    return new Set();
  }
};

// Сохраняем данные в LocalStorage
const saveVisitedLocations = (visitedSet: Set<string>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(visitedSet)));
  } catch (error) {
    console.warn('Failed to save visited locations to localStorage:', error);
  }
};

export function useVisitedLocations(initialLocations: Location[]) {
  const visitedLocations = ref<Set<string>>(getStoredVisitedLocations());
  const filterOptions = ref<FilterOptions>({
    category: undefined,
    visited: undefined,
    searchQuery: ''
  });
  
  // Инициализируем статус посещения для всех локаций
  const allLocations = ref<Location[]>(
    initialLocations.map(location => ({
      ...location,
      visited: visitedLocations.value.has(location.name)
    }))
  );

  // Фильтрованные локации
  const filteredLocations = computed(() => {
    let filtered = allLocations.value;

    // Фильтр по категории
    if (filterOptions.value.category) {
      filtered = filtered.filter(location => location.category === filterOptions.value.category);
    }

    // Фильтр по статусу посещения
    if (filterOptions.value.visited !== undefined) {
      filtered = filtered.filter(location => location.visited === filterOptions.value.visited);
    }

    // Фильтр по поисковому запросу
    if (filterOptions.value.searchQuery) {
      const query = filterOptions.value.searchQuery.toLowerCase();
      filtered = filtered.filter(location => 
        location.name.toLowerCase().includes(query) ||
        location.description.toLowerCase().includes(query) ||
        (location.address && location.address.toLowerCase().includes(query))
      );
    }

    return filtered;
  });

  // Отслеживаем изменения и сохраняем в LocalStorage
  watch(visitedLocations, (newVisitedSet) => {
    saveVisitedLocations(newVisitedSet);
    
    // Обновляем статус в локациях
    allLocations.value = allLocations.value.map(location => ({
      ...location,
      visited: newVisitedSet.has(location.name)
    }));
  }, { deep: true });

  const toggleVisited = (location: Location) => {
    const newVisitedSet = new Set(visitedLocations.value);
    if (newVisitedSet.has(location.name)) {
      newVisitedSet.delete(location.name);
    } else {
      newVisitedSet.add(location.name);
    }
    visitedLocations.value = newVisitedSet;
  };

  const isVisited = (locationName: string): boolean => {
    return visitedLocations.value.has(locationName);
  };

  const getVisitedCount = (): number => {
    return visitedLocations.value.size;
  };

  const getTotalCount = (): number => {
    return allLocations.value.length;
  };

  const getProgressPercentage = (): number => {
    const total = getTotalCount();
    return total > 0 ? Math.round((getVisitedCount() / total) * 100) : 0;
  };

  const updateFilters = (options: Partial<FilterOptions>) => {
    filterOptions.value = { ...filterOptions.value, ...options };
  };

  const clearFilters = () => {
    filterOptions.value = {
      category: undefined,
      visited: undefined,
      searchQuery: ''
    };
  };

  return {
    locationsWithVisitedStatus: filteredLocations,
    allLocations,
    filterOptions,
    toggleVisited,
    isVisited,
    getVisitedCount,
    getTotalCount,
    getProgressPercentage,
    updateFilters,
    clearFilters
  };
}
