import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './Circle.module.scss';
import mainStyles from '../TimeWidget.module.scss';
import gsap from 'gsap';
import AnimatedButton from './AnimatedButton';
import Years from './Years';
import { CircleProps } from '../models';

const { crossLineHorizontal } = mainStyles;

export default function Circle({
  buttonsData,
  firstYear,
  lastYear,
  selectedIndex,
  setSelectedIndex,
}: CircleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const count = buttonsData.length;
  const initialAngle = -Math.PI / 3;
  const anglePerButton = useMemo(() => (Math.PI * 2) / count, [count]);

  const angleOffsetRef = useRef(initialAngle);

  const positionButtons = useCallback(
    (angleShift = initialAngle) => {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2;

      buttonRefs.current.forEach((btn, i) => {
        if (!btn) return;

        const angle = (i / count) * Math.PI * 2 + angleShift;
        const x = radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        gsap.set(btn, {
          x,
          y,
          transformOrigin: 'center center',
        });
      });
    },
    [count],
  );

  const rotateToIndex = useCallback(
    (targetIndex: number) => {
      setSelectedIndex(targetIndex);

      const targetAngle = -anglePerButton * targetIndex + initialAngle;

      gsap.to(angleOffsetRef, {
        current: targetAngle,
        duration: 1,
        ease: 'circular.inOut',
        onUpdate: () => {
          positionButtons(angleOffsetRef.current);
        },
      });
    },
    [anglePerButton, buttonsData.length, initialAngle, positionButtons],
  );

  useEffect(() => {
    positionButtons();
    const handleResize = () => positionButtons();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [positionButtons]);

  return (
    <>
      <div className={styles.circleWrapper}>
        <div className={styles.crossWrapper}>
          <div className={crossLineHorizontal} />
        </div>
        <Years firstYear={firstYear} lastYear={lastYear} />
        <div className={styles.circleContainer} ref={containerRef}>
          {buttonsData.map(({ id, label }, i) => (
            <AnimatedButton
              key={id}
              ref={(el) => {
                if (el) buttonRefs.current[i] = el;
              }}
              onClick={() => rotateToIndex(i)}
              label={label}
              number={i + 1}
              selected={selectedIndex === i}
            ></AnimatedButton>
          ))}
        </div>
      </div>
    </>
  );
}
