import { TimeWidgetData } from './models';

export const mockTimeWidgetData: TimeWidgetData = [
  {
    category: 'История',
    items: Array.from({ length: 10 }, (_, i) => ({
      year: 1900 + i * 10,
      article: `Историческое событие ${i + 1}: краткое описание события в этом году.`,
    })),
  },
  {
    category: 'Наука',
    items: Array.from({ length: 10 }, (_, i) => ({
      year: 1850 + i * 5,
      article: `Научное открытие ${i + 1}: описание значимого достижения.`,
    })),
  },
  {
    category: 'Культура',
    items: Array.from({ length: 10 }, (_, i) => ({
      year: 1950 + i * 3,
      article: `Культурное событие ${i + 1}: влияние на общество.`,
    })),
  },
  {
    category: 'Технологии',
    items: Array.from({ length: 10 }, (_, i) => ({
      year: 1980 + i * 2,
      article: `Технологический прогресс ${i + 1}: внедрение новой технологии.`,
    })),
  },
  {
    category: 'Политика',
    items: Array.from({ length: 10 }, (_, i) => ({
      year: 1810 + i * 7,
      article: `Политическое событие ${i + 1}: описание изменений.`,
    })),
  },
  {
    category: 'Экономика',
    items: Array.from({ length: 10 }, (_, i) => ({
      year: 1900 + i * 6,
      article: `Экономическое событие ${i + 1}: влияние на рынки.`,
    })),
  },
];
