// Конфигурация приложения Батуми Гид

export const APP_CONFIG = {
  name: 'Батуми Гид',
  version: '1.0.0',
  language: 'ru',
  defaultCity: 'Batumi',
  coordinates: {
    lat: 41.6168,
    lng: 41.6367
  }
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  PARK: 'Парк',
  ATTRACTION: 'Достопримечательность',
  RESTAURANT: 'Ресторан',
  BEACH: 'Пляж',
  MUSEUM: 'Музей',
  SHOPPING: 'Шопинг',
  NIGHTLIFE: 'Ночная жизнь',
  HOTEL: 'Отель',
  ENTERTAINMENT: 'Развлечения',
  DESSERT: 'Десерты',
  CAFE: 'Кафе',
  OTHER: 'Другое'
};

export const COOLNESS_LABELS: Record<string, string> = {
  MUST_SEE: 'Обязательно посетить',
  COOL: 'Круто',
  JUST_OK: 'Просто ок'
};
