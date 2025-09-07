import styles from './Years.module.scss';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Years } from '../types';

type YearsProps = Years;

export default function YearsRange({ firstYear, lastYear }: YearsProps) {
  const firstRef = useRef<HTMLSpanElement>(null);
  const lastRef = useRef<HTMLSpanElement>(null);

  const prevFirstYear = useRef(firstYear);
  const prevLastYear = useRef(lastYear);

  const animateNumber = (
    ref: React.RefObject<HTMLSpanElement | null>,
    startValue: number,
    endValue: number,
  ) => {
    if (!ref.current) return;

    const obj = {
      val: isFinite(startValue) ? startValue : 0,
    };

    gsap.to(obj, {
      val: isFinite(endValue) ? endValue : 0,
      duration: 1,
      ease: 'power2.out',
      onUpdate: function () {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val).toString();
        }
      },
    });
  };

  useEffect(() => {
    animateNumber(firstRef, prevFirstYear.current, firstYear);
    animateNumber(lastRef, prevLastYear.current, lastYear);

    prevFirstYear.current = firstYear;
    prevLastYear.current = lastYear;
  }, [firstYear, lastYear]);

  return (
    <div className={styles.yearsContainer}>
      <span ref={firstRef}>{firstYear}</span>
      <span ref={lastRef}>{lastYear}</span>
    </div>
  );
}
