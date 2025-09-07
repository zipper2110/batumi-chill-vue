import { ref, watch } from 'vue';
import type { Location } from '../types/Location';

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
  
  // Инициализируем статус посещения для всех локаций
  const locationsWithVisitedStatus = ref<Location[]>(
    initialLocations.map(location => ({
      ...location,
      visited: visitedLocations.value.has(location.name)
    }))
  );

  // Отслеживаем изменения и сохраняем в LocalStorage
  watch(visitedLocations, (newVisitedSet) => {
    saveVisitedLocations(newVisitedSet);
    
    // Обновляем статус в локациях
    locationsWithVisitedStatus.value = locationsWithVisitedStatus.value.map(location => ({
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
    return locationsWithVisitedStatus.value.length;
  };

  const getProgressPercentage = (): number => {
    const total = getTotalCount();
    return total > 0 ? Math.round((getVisitedCount() / total) * 100) : 0;
  };

  return {
    locationsWithVisitedStatus,
    toggleVisited,
    isVisited,
    getVisitedCount,
    getTotalCount,
    getProgressPercentage
  };
}
