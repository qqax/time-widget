import styles from './TimeWidget.module.scss';
import Circle from './Circle/Circle';
import Slider from './Slider/Slider';
import { useMemo, useState } from 'react';
import { Button, TimeWidgetData } from './types';
import YearsRange from './Circle/components/YearsRange';
import Pagination, { PaginationMobile } from './Circle/components/Pagination';

type TimeWidgetProps = {
  data: TimeWidgetData;
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
      <div className={styles.crossWrapper}>
        <div className={styles.crossLineVertical} />
      </div>
      <h2 className={styles.title}>
        Исторические
        <br />
        даты
      </h2>
      <div className={styles.mobile}>
        <YearsRange firstYear={firstYear} lastYear={lastYear} />
        <h2 className={styles.titleMobile}>{data[selectedIndex].category}</h2>
        <div className={styles.crossLineHorizontal} />
      </div>
      <Circle
        buttonsData={buttonsData}
        firstYear={firstYear}
        lastYear={lastYear}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Slider items={sortedItems} />
      <Pagination
        totalCategories={buttonsData.length}
        selectedCategory={selectedIndex + 1}
        setSelectedCategory={setSelectedIndex}
      />
      <PaginationMobile
        totalCategories={buttonsData.length}
        selectedCategory={selectedIndex}
        setSelectedCategory={setSelectedIndex}
      />
    </section>
  );
}
