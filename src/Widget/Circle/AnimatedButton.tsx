import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './AnimatedButton.module.scss';

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  number: number;
  selected: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ label, number, selected, onClick, ...rest }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const combinedRef = (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const numberRef = useRef<HTMLSpanElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const [showLabel, setShowLabel] = useState(false);
    const [showNumber, setShowNumber] = useState(false);

    const colorPrimary = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary')
      .trim();
    const colorBorder = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-border')
      .trim();

    useEffect(() => {
      if (selected) {
        gsap.to(innerRef.current, {
          width: 56,
          height: 56,
          duration: 0.2,
          borderRadius: '50%',
          border: `1px solid ${colorBorder}`,
          fontWeight: 'normal',
          fontSize: 0.2,
          lineHeight: 1.5,
          color: `${colorPrimary}`,
          backgroundColor: '#F4F5F9',
          ease: 'power2.out',
        });

        setShowNumber(true);

        gsap.delayedCall(1, () => {
          setShowLabel(true);
        });
      } else {
        if (labelRef.current) {
          // Анимация исчезновения label
          gsap.to(labelRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              setShowLabel(false);
            },
          });
        } else {
          setShowLabel(false);
        }

        if (numberRef.current) {
          gsap.to(numberRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              setShowNumber(false); // Скрыть number после анимации
            },
          });
        } else {
          setShowNumber(false);
        }

        gsap.to(innerRef.current, {
          width: 6,
          height: 6,
          duration: 0.2,
          borderRadius: '50%',
          backgroundColor: `${colorPrimary}`,
          ease: 'power2.in',
        });
      }
    }, [selected]);

    useEffect(() => {
      if (showLabel && labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        );
      }
    }, [showLabel]);

    useEffect(() => {
      if (showNumber && numberRef.current) {
        gsap.fromTo(
          numberRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        );
      }
    }, [showNumber]);

    return (
      <button ref={combinedRef} onClick={onClick} className={styles.btn} {...rest}>
        {showNumber && (
          <span
            ref={numberRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 24,
              pointerEvents: 'none',
            }}
          >
            {number}
          </span>
        )}
        {showLabel && (
          <span
            ref={labelRef}
            style={{
              position: 'absolute',
              marginLeft: 50,
              transform: 'translate(0%, -50%)',
              fontSize: 24,
              fontWeight: 'bold',
              pointerEvents: 'none',
            }}
          >
            {label}
          </span>
        )}
      </button>
    );
  },
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
