'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';

import styles from './Slider.module.scss';
import { TimeWidgetItem } from '../types';

type SliderProps = {
  items: TimeWidgetItem[];
};

export default function Slider({ items }: SliderProps) {
  if (!items || !items.length) return null;

  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        slidesOffsetBefore={16} // отступ слева
        slidesOffsetAfter={16} // отступ справа
        grabCursor={true}
        resistance={true}
        resistanceRatio={0.85}
      >
        {items.map(({ year, article }, idx) => (
          <SwiperSlide key={idx} className={styles.slide}>
            {/*<div className={styles.slide}>*/}
            <div className={styles.year}>{year}</div>
            <div className={styles.article}>{article}</div>
            {/*</div>*/}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
