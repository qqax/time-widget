import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

type GrowDivProps = {
  children: ReactNode;
  maxHeight?: number;
  maxWidth?: number;
  startWidth?: number;
  step?: number;
  className?: string | undefined;
};

const GrowDiv: React.FC<GrowDivProps> = ({
  children,
  maxHeight = 90,
  maxWidth = 400,
  startWidth = 320,
  step = 10,
  className,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(startWidth);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    el.style.width = `${width}px`;

    const fitsHeight = el.scrollHeight <= maxHeight;

    if (!fitsHeight && width < maxWidth) {
      setWidth((w) => Math.min(w + step, maxWidth));
    }
  }, [children, width, maxHeight, maxWidth, step]);

  const containerStyle: CSSProperties = {
    maxHeight: `${maxHeight}px`,
    maxWidth: `${maxWidth}px`,
    overflowY: 'auto',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    width: `${width}px`,
    boxSizing: 'border-box',
    display: 'inline-block',
  };

  return (
    <div ref={divRef} style={containerStyle} className={className} {...props}>
      {children}
    </div>
  );
};

export default GrowDiv;
