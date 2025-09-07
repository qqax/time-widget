'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';

import styles from './Slider.module.scss';
import { TimeWidgetItem } from '../types';
import React, { useCallback, useEffect, useState } from 'react';

import gsap from 'gsap';
import GrowDiv from './GrowDiv';

type SliderProps = {
  items: TimeWidgetItem[];
};

export default function Slider({ items }: SliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigation = useCallback(() => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  }, [swiperInstance]);

  useEffect(() => {
    updateNavigation();
  }, [swiperInstance, items, updateNavigation]);

  const [sliderItems, setSliderItems] = useState(items);

  useEffect(() => {
    gsap.to('.swiper-slide', {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        setSliderItems(() => items);
        gsap.delayedCall(0.05, () => {
          gsap.to('.swiper-slide', {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.in',
          });
        });
      },
    });
  }, [items]);

  if (!sliderItems || !sliderItems.length) return null;

  return (
    <div className={styles.sliderWrapper}>
      <div
        className={`${styles.swiperButtonPrev} swiper-button-prev ${isBeginning ? styles.swiperButtonDisabled : ''}`}
      >
        <img src="/icons/arrow-right.svg" alt="Prev" />
      </div>
      <div
        className={`${styles.swiperButtonNext} swiper-button-next ${isEnd ? styles.swiperButtonDisabled : ''}`}
      >
        <img src="/icons/arrow-right.svg" alt="Next" />
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={updateNavigation}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        spaceBetween={80}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        grabCursor={true}
        resistance={true}
        resistanceRatio={0.85}
        className={styles.fade}
      >
        {sliderItems.map(({ year, article }, idx) => (
          <SwiperSlide key={idx} className={styles.slide}>
            <h3 className={styles.year}>{year}</h3>
            <GrowDiv className={styles.article} maxHeight={90} startWidth={320} maxWidth={400}>
              {article}
            </GrowDiv>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
