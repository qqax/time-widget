import styles from './Navigation.module.scss';

type CategoriesProps = {
  totalCategories: number;
  setSelectedCategory: (selectedCategory: number) => void;
};

type NavigationProps = {
  selectedCategory: number;
} & CategoriesProps;

type MobileNavigationProps = {
  selectedIndex: number;
} & CategoriesProps;

export default function Navigation({
  totalCategories,
  selectedCategory,
  setSelectedCategory,
}: NavigationProps) {
  const selectPrevCategory = () => {
    setSelectedCategory((selectedCategory - 2 + totalCategories) % totalCategories);
  };

  const selectNextCategory = () => {
    setSelectedCategory(selectedCategory % totalCategories);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
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

export function NavigationMobile({
  totalCategories,
  selectedIndex,
  setSelectedCategory,
}: MobileNavigationProps) {
  return (
    <div className={styles.mobileNavigationContainer}>
      {Array.from({ length: totalCategories }).map((_, i) => (
        <button
          key={i}
          onClick={() => setSelectedCategory(i)}
          className={`${styles.mobileNavigationBtn} ${selectedIndex === i ? styles.active : ''}`}
        />
      ))}
    </div>
  );
}
