'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';

import styles from './Slider.module.scss';
import { TimeWidgetItem } from '../types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import GrowDiv from './GrowDiv';

import { isAtLeast } from '../../styles/breakpoints';

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
  const sliderTimeoutRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (sliderTimeoutRef.current) {
      sliderTimeoutRef.current.kill();
      sliderTimeoutRef.current = null;
    }

    gsap.to('.swiper-slide', {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        setSliderItems(() => items);
        sliderTimeoutRef.current = gsap.delayedCall(0.05, () => {
          gsap.to('.swiper-slide', {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.in',
          });
        });
      },
    });
  }, [items]);

  const spaceBetweenSlides = isAtLeast('xl') ? 80 : isAtLeast('md') ? 32 : 25;

  useEffect(() => {
    if (!swiperInstance) return;

    const updateOpacity = () => {
      swiperInstance.slides.forEach((slideEl: HTMLElement) => {
        const progress = Math.abs((slideEl as unknown as { progress: number }).progress);

        const targetOpacity = progress < 0.5 ? 1 : 0.5;

        gsap.to(slideEl, {
          opacity: targetOpacity,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    };

    swiperInstance.on('progress', updateOpacity);
    swiperInstance.on('setTranslate', updateOpacity);

    updateOpacity();

    return () => {
      swiperInstance.off('progress', updateOpacity);
      swiperInstance.off('setTranslate', updateOpacity);
    };
  }, [swiperInstance]);

  if (!sliderItems || !sliderItems.length) return null;

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.btnWrapper}>
        <div
          className={`${styles.swiperButtonPrev} swiper-button-prev ${isBeginning ? styles.swiperButtonDisabled : ''}`}
        >
          <img src="/icons/arrow-right.svg" alt="Prev" />
        </div>
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
        spaceBetween={spaceBetweenSlides}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        grabCursor={true}
        resistance={true}
        resistanceRatio={0.85}
        watchSlidesProgress={true}
        className={styles.swiperMain}
      >
        {sliderItems.map(({ year, article }, idx) => (
          <SwiperSlide key={idx} className={styles.slide}>
            <h3 className={styles.year}>{year}</h3>
            <GrowDiv
              className={styles.article}
              maxHeight={isAtLeast('md') ? 90 : 80}
              startWidth={isAtLeast('md') ? 320 : 166}
              maxWidth={isAtLeast('md') ? 400 : 255}
            >
              {article}
            </GrowDiv>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.btnWrapper}>
        <div
          className={`${styles.swiperButtonNext} swiper-button-next ${isEnd ? styles.swiperButtonDisabled : ''}`}
        >
          <img src="/icons/arrow-right.svg" alt="Next" />
        </div>
      </div>
    </div>
  );
}
