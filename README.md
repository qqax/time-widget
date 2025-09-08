# TimeWidget

Интерактивный React-компонент для отображения исторических дат с круговой навигацией и слайдером.

---

## Установка

```bash
npm install your-time-widget
# или
yarn add your-time-widget
```
## Использование
```js
import React from 'react';
import TimeWidget from 'your-time-widget';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <TimeWidget />
    </div>
  );
}
```
Убедитесь, что стили подключены:
```ts
import 'your-time-widget/dist/main.css';
```

## Пропсы
```ts
interface TimeWidgetProps {
  data?: HistoricalItem[];
}

type HistoricalItem = {
    year: string;
    article: string;
}
```
## Локальная разработка
```bash
npm install
npm start
```
Проект будет доступен по адресу: http://localhost:3000
## Сборка
```bash
npm run build
```
Файлы попадут в директорию dist/.
## Структура
```bash
src/
├── package.json
├── package-lock.json
├── public
│   ├── icons
│   │   ├── arrow-left-sm.svg
│   │   └── arrow-right.svg
│   └── index.html
├── README.md
├── src
│   ├── App.tsx
│   ├── declaration.d.ts
│   ├── index.tsx
│   ├── mockTimeWidgetData.ts
│   ├── styles
│   │   ├── _breakpoints.scss
│   │   ├── breakpoints.ts
│   │   ├── Cross.module.scss
│   │   ├── main.scss
│   │   └── _variables.scss
│   └── Widget
│       ├── Circle
│       │   ├── Circle.module.scss
│       │   ├── Circle.tsx
│       │   └── components
│       │       ├── AnimatedButton.module.scss
│       │       ├── AnimatedButton.tsx
│       │       ├── Navigation.module.scss
│       │       ├── Navigation.tsx
│       │       ├── Years.module.scss
│       │       └── YearsRange.tsx
│       ├── Slider
│       │   ├── GrowDiv.tsx
│       │   ├── SliderBlock.tsx
│       │   ├── Slider.module.scss
│       │   └── Slider.tsx
│       ├── TimeWidget.module.scss
│       ├── TimeWidget.tsx
│       └── types.ts
├── tsconfig.json
└── webpack.config.js

```
| Компонент        | Назначение                               |
| ---------------- | ---------------------------------------- |
| `TimeWidget`     | Главный компонент                        |
| `Circle`         | Круговая интерактивная область           |
| `Slider`         | Вертикальный слайдер с годовыми статьями |
| `AnimatedButton` | Кнопка с анимацией выбора года           |
| `YearsRange`     | Компонент, показывающий диапазон лет     |
