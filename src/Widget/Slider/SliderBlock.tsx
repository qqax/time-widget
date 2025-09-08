import styles from '../TimeWidget.module.scss';
import crossStyle from '../../styles/Cross.module.scss';
import Slider, { SliderProps } from './Slider';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { isAtLeast } from '../../styles/breakpoints';

type SliderBlockProps = {
  title: string;
} & SliderProps;

export default function SliderBlock({ title, items }: SliderBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const [sliderTitle, setSliderTitle] = useState(title);
  const [sliderItems, setSliderItems] = useState(items);
  const sliderTimeoutRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (isAtLeast('sm')) {
      setSliderItems(() => items);
      return;
    }

    const block = blockRef.current;
    if (!block) return;

    if (sliderTimeoutRef.current) {
      sliderTimeoutRef.current.kill();
      sliderTimeoutRef.current = null;
    }

    gsap.to(block, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        sliderTimeoutRef.current = gsap.delayedCall(0.15, () => {
          setSliderItems(() => items);
          setSliderTitle(title);

          gsap.to(block, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      },
    });
  }, [items]);

  return (
    <div ref={blockRef} className={styles.sliderContainer}>
      <h2 className={styles.titleMobile}>{sliderTitle}</h2>
      <div className={crossStyle.crossLineHorizontal} />
      <Slider items={sliderItems} />
    </div>
  );
}
