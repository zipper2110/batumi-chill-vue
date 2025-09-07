// Типы данных для приложения Батуми Гид

export interface Location {
  name: string;
  description: string;
  category: LocationCategory;
  latitude: number;
  longitude: number;
  photos: string[];
  address?: string;
  openingHours?: string;
  coolnessRating?: CoolnessRating;
  externalMapUrl?: string;
  visited?: boolean; // Добавляем для отслеживания посещений
}

export type LocationCategory = 
  | 'PARK'          // Парк
  | 'ATTRACTION'    // Достопримечательность
  | 'RESTAURANT'    // Ресторан
  | 'BEACH'         // Пляж
  | 'MUSEUM'        // Музей
  | 'SHOPPING'      // Шопинг
  | 'NIGHTLIFE'     // Ночная жизнь
  | 'HOTEL'         // Отель
  | 'ENTERTAINMENT' // Развлечения
  | 'DESSERT'       // Десерты
  | 'CAFE'          // Кафе
  | 'OTHER';        // Другое

export type CoolnessRating = 
  | 'MUST_SEE'      // Обязательно посетить
  | 'COOL'          // Круто
  | 'JUST_OK';      // Просто ок

export interface FilterOptions {
  category?: LocationCategory;
  visited?: boolean;
  searchQuery?: string;
}
