import type { Position } from 'geojson';

export type LineType = {
  name: string;
  coords: Position;
  render: boolean;
  count?: number;
  desc?: string;
  imgs?: string[];
  hideButton?: boolean;
};

export const firstLine: LineType[] = [
  {
    name: 'Первая встреча! 👀',
    desc: 'Я заехал за тобой на ул. Патриса Лабубы, ты неловко постучала в стекло и села даже не посмотрев номер машины...',
    coords: [42.966252, 44.10498],
    render: true,
    count: 1,
  },
  {
    name: '',
    coords: [42.9842, 44.0713],
    render: false,
  },
  {
    name: '',
    coords: [43.063, 44.061],
    render: false,
  },

  {
    name: 'Первое свидание! 🏔️',
    desc: 'Мы много гуляли по всему Пятигорску, я не оставил тебя голодную, и мы даже дошли до Музея каменных древностей, на котором ты расписывала стенки ещё в СКУДе',
    coords: [43.0847, 44.03604],
    render: true,
    count: 2,
  },
];

export const secondLine: LineType[] = [
  {
    name: '',
    desc: '',
    coords: [43.0847, 44.03604],
    render: false,
    count: 2,
  },
  {
    name: 'Бештау! 🌋',
    desc: 'Вокруг этой горы мы околачиваемся постоянно: источники, Монастырь, кровавая Луна 🌑, танцы ночью и в конце концов подъем на неё. Ура! ',
    coords: [43.02209, 44.098],
    render: true,
    count: 3,
    imgs: ['besh.jpg'],
  },
];

export const thirdLine: LineType[] = [
  {
    name: '',
    coords: [43.02209, 44.098],
    render: false,
    count: 3,
  },
  {
    name: '',
    coords: [43.0582, 44.0899],
    render: false,
  },
  {
    name: 'Первый полцелуй 💋',
    desc: 'Тут мы очень долго целовались, обнимались и никуда не хотели идти. Совсем скоро мы начали планировать нашу первую большую поездку...',
    coords: [43.0774, 44.0499],
    render: true,
    count: 4,
    imgs: ['scale_1200.jpg'],
  },
];

export const fourth: LineType[] = [
  {
    name: 'Первый полцелуй 💋',
    coords: [43.0774, 44.0499],
    render: false,
    count: 4,
  },
  {
    name: '',
    coords: [42.1852, 43.7766],
    render: false,
  },
  {
    name: 'Теберда - Домбай ⛰️⛰️⛰️ 🚗',
    desc: 'Шумка, Сурфуджинский, Алибекский и Бадукские озера, вот это мы находились, как-нибудь повторим? 💥',
    imgs: Array.from({ length: 8 }, (v, i) => `teberda_${i + 1}.jpg`),
    coords: [41.7371, 43.4224],
    render: true,
    count: 5,
  },
];

export const five: LineType[] = [
  {
    name: 'Теберда',
    desc: '',

    coords: [41.7371, 43.4224],
    render: false,
    count: 5,
  },
  {
    name: 'Москва ✈️',
    desc: 'Съездили к твоим друзьям и хорошо провели время! Музей Космонавтики 🚀🌌, мексиканский ресторан 🌮 и мастер-класс по рисованию, где ты всем показала, насколько ты талантливая художница! 🖼️🎨🖌️',
    imgs: Array.from({ length: 6 }, (v, i) => `moscow_${6 - i}.jpg`),
    coords: [37.3574, 55.7009],
    render: true,
    count: 6,
  },
];
export const six: LineType[] = [
  {
    name: 'Москва ✈️',
    coords: [37.3574, 55.7009],
    render: false,
    count: 6,
  },
  {
    name: 'Осетия ❄️, Порог Неба 🎿',
    desc: 'Первый раз попробовали лыжи и с пользой провели январские праздники!',
    coords: [43.6033, 42.897],
    imgs: Array.from({ length: 4 }, (v, i) => `nebo_${i + 1}.jpg`),
    render: true,
    count: 7,
  },
];
export const seven: LineType[] = [
  {
    name: 'Осетия ❄️, Порог Неба 🎿',
    coords: [43.6033, 42.897],
    render: false,
    count: 7,
  },
  {
    name: '',
    coords: [39.728, 43.46126],
    render: false,
    count: 7,
  },
  {
    name: 'Ростов-на-Дону 🌇, концерт Зилкова А.Е. 🎸🎶🎼🎙',
    desc: 'Теплый Ростов на (при)вольном Дону! Здорово погуляли, снова мексиканские рестораны🌶️🌵 и вкусные коктейли🍹! А также уютный и веселый концерт как апогей поездки 🎵',
    coords: [39.7202, 47.2167],
    render: true,
    imgs: Array.from({ length: 7 }, (v, i) => `rostov_${i + 1}.jpg`),
    count: 11,
  },
];
export const eight: LineType[] = [
  {
    name: 'Ростов-на-Дону 🌇, концерт Зилкова А.Е. 🎸🎶🎼🎙',
    coords: [39.7202, 47.2167],
    render: false,
    count: 10,
  },
  {
    name: '',
    coords: [49.5606, 49.5606],
    render: false,
    count: 10,
  },
  {
    name: 'Санкт-Петербург 🏛️🏺',
    desc: 'Уже совсем скоро! А пока загляни в шкафчик, где лежит покрывало!',
    coords: [30.311, 59.9351],
    render: true,
    count: 12,
    hideButton: true,
  },
];
export const nine: LineType[] = [
  {
    name: 'Ростов-на-Дону 🌇, концерт Зилкова А.Е. 🎸🎶🎼🎙',
    coords: [39.7202, 47.2167],
    render: false,
    count: 10,
  },
  {
    name: '',
    coords: [37.797, 44.6636],
    render: false,
    count: 10,
  },
  {
    name: 'Грузия 🏞️',
    desc: 'Однажды! To Be Continued',
    coords: [44.8262, 41.6779],
    render: true,
    count: 12,
    hideButton: true,
  },
];
export const ten: LineType[] = [
  {
    name: '',
    coords: [39.7202, 47.2167],
    render: false,
    count: 10,
  },
  {
    name: '',
    coords: [48.1202, 46.2574],
    render: false,
    count: 10,
  },
  {
    name: '',
    coords: [50.5167, 38.1333],
    render: false,
    count: 10,
  },
  {
    name: 'Армения 🏞️',
    desc: 'Однажды! To Be Continued',
    coords: [44.535, 40.1377],
    render: true,
    count: 12,
    hideButton: true,
  },
];
export const eleven: LineType[] = [
  {
    name: '',
    coords: [39.7202, 47.2167],
    render: false,
    count: 10,
  },
  {
    name: 'Крым 🐋 🫧🌊🐟',
    desc: 'Однажды! To Be Continued',
    coords: [34.1708, 44.5302],
    render: true,
    count: 12,
    hideButton: true,
  },
];

export const lines = [
  firstLine,
  secondLine,
  thirdLine,
  fourth,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
];

export const markers = lines.flat().filter((m) => m.render);
