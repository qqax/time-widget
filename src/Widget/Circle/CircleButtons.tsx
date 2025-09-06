import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from './CircleButtons.module.scss';
import gsap from "gsap";

const buttonData = [
    {label: "First"},
    {label: "Second"},
    {label: "Third"},
    {label: "Fourth"},
    {label: "Fifth"},
    {label: "Sixth"},
]

export default function CircleButtons() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRefs = useRef<HTMLButtonElement[]>([]);
    const angleRef = useRef( 0 );
    const count = 6;

    const positionButtons = useCallback(
        (angleShift = 0) => {
            const container = containerRef.current;
            if (!container) return;

            const {width, height} = container.getBoundingClientRect();
            // const width = rect.width;
            // const height = rect.height;
            //
            // const centerX = width / 2;
            const centerY = height / 2;
            const centerX = 0;
            // const centerY = 0;
            const radius = Math.min(width, height) / 2 - 40;

            buttonRefs.current.forEach((btn, i) => {
                if (!btn) return;

                const angle = (i / count) * Math.PI * 2 + angleShift;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                gsap.set(btn, {
                    x,
                    y,
                    // rotation: (angle * 180) / Math.PI + 90,
                    transformOrigin: 'center center',
                });
            });
        },
        [count]
    );

    const rotateToIndex = (targetIndex: number) => {
        const anglePerButton = (Math.PI * 2) / count;

        const targetAngle = -anglePerButton * targetIndex + Math.PI / 6; // чуть правее верха

        gsap.to(angleRef, {
            current: targetAngle,
            duration: 1,
            ease: 'circular.inOut',
            onUpdate: () => {
                positionButtons(angleRef.current);
            },
        });
    };

    useEffect(() => {
        positionButtons();
        window.addEventListener('resize', () => positionButtons());

        return () => {
            window.removeEventListener('resize', () => positionButtons());
        };
    }, [positionButtons]);

    return (
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
    );
};
