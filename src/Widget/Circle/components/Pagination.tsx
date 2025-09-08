import styles from './Pagination.module.scss';

type PaginationProps = {
  totalCategories: number;
  selectedCategory: number;
  setSelectedCategory: (selectedCategory: number) => void;
};

export default function Pagination({
  totalCategories,
  selectedCategory,
  setSelectedCategory,
}: PaginationProps) {
  const selectPrevCategory = () => {
    setSelectedCategory((selectedCategory - 2 + totalCategories) % totalCategories);
  };

  const selectNextCategory = () => {
    setSelectedCategory(selectedCategory % totalCategories);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        {String(selectedCategory).padStart(2, '0')}/{String(totalCategories).padStart(2, '0')}
      </div>
      <div className={styles.btnContainer}>
        <button
          type={'button'}
          className={`${styles.btn} ${styles.btnPrev}`}
          onClick={selectPrevCategory}
        >
          <img src="/icons/arrow-right.svg" alt="Prev" />
          <img src="/icons/arrow-left-sm.svg" alt="Prev" />
        </button>
        <button
          type={'button'}
          className={`${styles.btn} ${styles.btnNext}`}
          onClick={selectNextCategory}
        >
          <img src="/icons/arrow-right.svg" alt="Prev" />
          <img src="/icons/arrow-left-sm.svg" alt="Prev" />
        </button>
      </div>
    </div>
  );
}

export function PaginationMobile({
  totalCategories,
  selectedCategory,
  setSelectedCategory,
}: PaginationProps) {
  return (
    <div className={styles.mobilePaginationContainer}>
      {Array.from({ length: totalCategories }).map((_, i) => (
        <button
          key={i}
          onClick={() => setSelectedCategory(i)}
          className={`${styles.mobilePaginationBtn} ${selectedCategory === i ? styles.active : ''}`}
        />
      ))}
    </div>
  );
}
