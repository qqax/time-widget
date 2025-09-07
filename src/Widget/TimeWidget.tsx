import styles from './TimeWidget.module.scss';
import Circle from './Circle/Circle';
import Slider from './Slider/Slider';
import { useMemo, useState } from 'react';
import { Button, TimeWidgetData } from './types';

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

  return (
    <section className={styles.container}>
      <div className={styles.crossWrapper}>
        <div className={styles.crossLineVertical} />
      </div>
      <span></span>
      <span></span>
      <h2 className={styles.title}>
        Исторические
        <br />
        даты
      </h2>
      <Circle
        buttonsData={buttonsData}
        firstYear={sortedItems[0].year}
        lastYear={sortedItems[data[selectedIndex].items.length - 1].year}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Slider items={sortedItems} />
    </section>
  );
}
