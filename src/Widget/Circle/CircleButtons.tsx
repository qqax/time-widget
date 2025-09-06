import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './CircleButtons.module.scss';
import gsap from 'gsap';

const buttonData = [
  { label: 'First' },
  { label: 'Second' },
  { label: 'Third' },
  { label: 'Fourth' },
  { label: 'Fifth' },
  { label: 'Sixth' },
];

export default function CircleButtons() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const count = buttonData.length;
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
    [anglePerButton],
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
    <div className={styles.circleWrapper}>
      <div className={styles.circleContainer} ref={containerRef}>
        {buttonData.map((data, i) => (
          <button
            key={data.label}
            ref={(el) => {
              if (el) buttonRefs.current[i] = el;
            }}
            onClick={() => rotateToIndex(i)}
            className={styles.circleBtn}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
