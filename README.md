# TimeWidget

An interactive React component for displaying historical dates with circular navigation and a slider.

---

## Installation

```bash
npm install <your-time-widget-directory>
# or
yarn add <your-time-widget-directory>
```

## Usage

```js
import React from 'react';
import TimeWidget from 'your-time-widget';

function App() {
    return (
        <div style={{height: '100vh'}}>
            <TimeWidget/>
        </div>
    );
}
```

Make sure to include the styles:

```ts
import '<your-time-widget-directory>/dist/main.css';
```

## Props

```ts
type TimeWidgetProps = {
    data: HistoricalData;
};

type HistoricalData = { category: string; items: HistoricalItem[] }[];

type HistoricalItem = {
    year: number;
    article: string;
};
```

## Local Development

```bash
npm install
npm start
```

The project will be available at: http://localhost:3000

## Build

```bash
npm run build
```

Build files will be output to the ```dist/``` directory.

## Project Structure

```bash
src/
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
│       │   ├── AnimatedButton.module.scss
│       │   ├── AnimatedButton.tsx
│       │   ├── Circle.module.scss
│       │   └── Circle.tsx
│       ├── Navigation
│       │   ├── Navigation.module.scss
│       │   └── Navigation.tsx
│       ├── Slider
│       │   ├── GrowDiv.tsx
│       │   ├── SliderBlock.tsx
│       │   ├── Slider.module.scss
│       │   └── Slider.tsx
│       ├── TimeWidget.module.scss
│       ├── TimeWidget.tsx
│       ├── types.ts
│       └── YearsRange
│           ├── Years.module.scss
│           └── YearsRange.tsx
├── tsconfig.json
└── webpack.config.js
```

| Компонент        | Назначение                           |
|------------------|--------------------------------------|
| `TimeWidget`     | Main component                       |
| `Circle`         | Interactive circular area            |
| `Navigation`     | Category navigation                  |
| `Slider`         | Vertical slider with yearly articles |
| `AnimatedButton` | Animated button for year selection   |
| `YearsRange`     | Displays the range of years          |
