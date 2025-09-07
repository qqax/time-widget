import styles from './Years.module.scss';
import { YearsProps } from '../models';

export default function Years({ firstYear, lastYear }: YearsProps) {
  return (
    <div className={styles.yearsContainer}>
      <span>{firstYear}</span>
      <span>{lastYear}</span>
    </div>
  );
}
