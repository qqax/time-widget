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
      <span>
        {selectedCategory}/{totalCategories}
      </span>
      <div className={styles.btnContainer}>
        <button
          type={'button'}
          className={`${styles.btn} ${styles.btnPrev}`}
          onClick={selectPrevCategory}
        >
          <img src="/icons/arrow-right.svg" alt="Prev" />
        </button>
        <button type={'button'} className={styles.btn} onClick={selectNextCategory}>
          <img src="/icons/arrow-right.svg" alt="Prev" />
        </button>
      </div>
    </div>
  );
}
