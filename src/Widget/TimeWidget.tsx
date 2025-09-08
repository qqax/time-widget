import styles from './TimeWidget.module.scss';
import crossStyle from '../styles/Cross.module.scss';
import Circle from './Circle/Circle';
import { useMemo, useState } from 'react';
import { Button, HistoricalData } from './types';
import YearsRange from './YearsRange/YearsRange';
import Navigation, { NavigationMobile } from './Navigation/Navigation';
import SliderBlock from './Slider/SliderBlock';

type TimeWidgetProps = {
  data: HistoricalData;
};

export default function TimeWidget({ data }: TimeWidgetProps) {
  if (!(data && data.length)) return null;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const buttonsData: Button[] = useMemo(() => {
    return data.map(({ category }) => {
      return { id: category, label: category };
    });
  }, [data]);

  const sortedItems = useMemo(() => {
    return [...data[selectedIndex].items].sort((a, b) => a.year - b.year);
  }, [data, selectedIndex]);

  const firstYear = sortedItems[0].year;
  const lastYear = sortedItems[data[selectedIndex].items.length - 1].year;

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>
          <span>Исторические</span>
          <span>даты</span>
        </h2>
        <Navigation
          totalCategories={buttonsData.length}
          selectedCategory={selectedIndex + 1}
          setSelectedCategory={setSelectedIndex}
        />
        <YearsRange firstYear={firstYear} lastYear={lastYear} />
      </div>
      <Circle
        buttonsData={buttonsData}
        firstYear={firstYear}
        lastYear={lastYear}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <SliderBlock title={data[selectedIndex].category} items={sortedItems} />
      <Navigation
        totalCategories={buttonsData.length}
        selectedCategory={selectedIndex + 1}
        setSelectedCategory={setSelectedIndex}
      />
      <NavigationMobile
        totalCategories={buttonsData.length}
        selectedIndex={selectedIndex}
        setSelectedCategory={setSelectedIndex}
      />
      <div className={crossStyle.crossLineVertical} />
    </section>
  );
}
