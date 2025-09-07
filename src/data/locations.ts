import type { Location } from '../types/Location';

export const locations: Location[] = [
  {
    name: "Батумский ботанический сад",
    description: "Субтропический ботанический сад на Зелёном Мысе (Мцване Концхи), в ~9 км к северу от Батуми. Около 108–111 га, тематические участки (Кавказ, Восточная Азия, Средиземноморье и др.), пешие тропы и панорамы Чёрного моря.",
    category: "PARK",
    latitude: 41.6927167,
    longitude: 41.7197833,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/6/65/Batumi_Botanic_Garden.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Batumi_-_Botanical_Garden_%289461068618%29.jpg"
    ],
    address: "Посёлок Мцване Концхи (Зелёный Мыс), Батуми 6411, Грузия",
    openingHours: "Ежедневно 09:00–18:00 (летом до 20:00)",
    coolnessRating: "MUST_SEE",
    externalMapUrl: "https://maps.google.com/?q=41.6927167,41.7197833",
    visited: false
  },
  {
    name: "Батумский бульвар",
    description: "Главная набережная Батуми протяженностью 7 км вдоль Черного моря. Красивые фонтаны, скульптуры, пальмы, велосипедные дорожки и множество кафе. Идеальное место для прогулок и отдыха.",
    category: "ATTRACTION",
    latitude: 41.6556,
    longitude: 41.6367,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Batumi_Boulevard_2019.jpg/800px-Batumi_Boulevard_2019.jpg"
    ],
    address: "Батумский бульвар, Батуми, Грузия",
    openingHours: "Круглосуточно",
    coolnessRating: "MUST_SEE",
    externalMapUrl: "https://maps.google.com/?q=41.6556,41.6367",
    visited: false
  },
  {
    name: "Башни Али и Нино",
    description: "Символическая скульптура двух движущихся фигур, представляющих трагическую любовь мусульманина Али и христианки Нино. Фигуры движутся навстречу друг другу и расходятся, символизируя вечную любовь.",
    category: "ATTRACTION",
    latitude: 41.6556,
    longitude: 41.6367,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ali_and_Nino_statue_in_Batumi.jpg/800px-Ali_and_Nino_statue_in_Batumi.jpg"
    ],
    address: "Батумский бульвар, Батуми, Грузия",
    openingHours: "Круглосуточно",
    coolnessRating: "MUST_SEE",
    externalMapUrl: "https://maps.google.com/?q=41.6556,41.6367",
    visited: false
  },
  {
    name: "Пляж Батуми",
    description: "Галечный пляж в центре города с развитой инфраструктурой. Множество пляжных кафе, водные развлечения, прокат зонтиков и лежаков. Отличное место для отдыха у моря.",
    category: "BEACH",
    latitude: 41.6556,
    longitude: 41.6367,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Batumi_Beach_2019.jpg/800px-Batumi_Beach_2019.jpg"
    ],
    address: "Пляж Батуми, Батуми, Грузия",
    openingHours: "Круглосуточно",
    coolnessRating: "COOL",
    externalMapUrl: "https://maps.google.com/?q=41.6556,41.6367",
    visited: false
  },
  {
    name: "Площадь Европы",
    description: "Центральная площадь Батуми с красивой архитектурой в европейском стиле. Фонтаны, кафе, магазины и исторические здания. Сердце города и место встреч.",
    category: "ATTRACTION",
    latitude: 41.6431,
    longitude: 41.6394,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Europe_Square_Batumi.jpg/800px-Europe_Square_Batumi.jpg"
    ],
    address: "Площадь Европы, Батуми, Грузия",
    openingHours: "Круглосуточно",
    coolnessRating: "COOL",
    externalMapUrl: "https://maps.google.com/?q=41.6431,41.6394",
    visited: false
  },
  {
    name: "Канатная дорога Арго",
    description: "Канатная дорога длиной 2.5 км, поднимающаяся на гору Ферия. Открывает потрясающие виды на Батуми и Черное море. Самая длинная канатная дорога в Грузии.",
    category: "ATTRACTION",
    latitude: 41.6556,
    longitude: 41.6367,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Argo_Cable_Car_Batumi.jpg/800px-Argo_Cable_Car_Batumi.jpg"
    ],
    address: "Канатная дорога Арго, Батуми, Грузия",
    openingHours: "10:00–22:00",
    coolnessRating: "MUST_SEE",
    externalMapUrl: "https://maps.google.com/?q=41.6556,41.6367",
    visited: false
  },
  {
    name: "Ресторан Barbarestan",
    description: "Один из лучших ресторанов Батуми, специализирующийся на грузинской кухне. Современная интерпретация традиционных блюд в элегантной атмосфере.",
    category: "RESTAURANT",
    latitude: 41.6431,
    longitude: 41.6394,
    photos: [
      "https://example.com/barbarestan.jpg"
    ],
    address: "ул. Пушкина 12, Батуми, Грузия",
    openingHours: "12:00–23:00",
    coolnessRating: "COOL",
    externalMapUrl: "https://maps.google.com/?q=41.6431,41.6394",
    visited: false
  },
  {
    name: "Музей искусств Аджарии",
    description: "Региональный музей с коллекцией грузинского и европейского искусства. Постоянные и временные выставки, образовательные программы.",
    category: "MUSEUM",
    latitude: 41.6431,
    longitude: 41.6394,
    photos: [
      "https://example.com/adjara_museum.jpg"
    ],
    address: "ул. Руставели 8, Батуми, Грузия",
    openingHours: "10:00–18:00 (выходной: понедельник)",
    coolnessRating: "JUST_OK",
    externalMapUrl: "https://maps.google.com/?q=41.6431,41.6394",
    visited: false
  },
  {
    name: "Торговый центр Batumi Mall",
    description: "Современный торговый центр с множеством магазинов, ресторанов и развлечений. Кинотеатр, детская площадка, супермаркет.",
    category: "SHOPPING",
    latitude: 41.6556,
    longitude: 41.6367,
    photos: [
      "https://example.com/batumi_mall.jpg"
    ],
    address: "ул. Агмашенебели 1, Батуми, Грузия",
    openingHours: "10:00–22:00",
    coolnessRating: "JUST_OK",
    externalMapUrl: "https://maps.google.com/?q=41.6556,41.6367",
    visited: false
  },
  {
    name: "Ночной клуб Drama",
    description: "Популярный ночной клуб в центре Батуми с живой музыкой, диджеями и танцполом. Современная атмосфера и качественная музыка.",
    category: "NIGHTLIFE",
    latitude: 41.6431,
    longitude: 41.6394,
    photos: [
      "https://example.com/drama_club.jpg"
    ],
    address: "ул. Гогебашвили 15, Батуми, Грузия",
    openingHours: "22:00–06:00 (пятница-воскресенье)",
    coolnessRating: "COOL",
    externalMapUrl: "https://maps.google.com/?q=41.6431,41.6394",
    visited: false
  }
];
