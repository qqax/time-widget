import styles from './TimeWidget.module.scss';
import Circle from './Circle/Circle';
import Slider from './Slider/Slider';

export default function TimeWidget() {
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
      <Circle />
      <Slider />
    </section>
  );
}
