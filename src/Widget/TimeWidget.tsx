import styles from './TimeWidget.module.scss';
import CircleButtons from "./Circle/CircleButtons";
import Slider from "./Slider/Slider";

export default function TimeWidget() {
    return (
        <section className={styles.container}>
            <div className={styles.cross}></div>
            <span></span>
            <span></span>
            <h2 className={styles.title}>Исторические даты</h2>
            <CircleButtons/>
            <Slider/>
        </section>
    )
}