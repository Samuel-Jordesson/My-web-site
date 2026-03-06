import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: { opacity?: number; y?: number; x?: number };
  to?: { opacity?: number; y?: number; x?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
  showCallback = false,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const items = splitType === 'chars' ? text.split('') : text.split(' ');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const elements = el.querySelectorAll('.split-item');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(elements, 
            { ...from },
            {
              ...to,
              duration: duration,
              ease: ease,
              stagger: delay / 1000,
              onComplete: () => {
                if (showCallback && onLetterAnimationComplete) {
                  onLetterAnimationComplete();
                }
              }
            }
          );
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, delay, duration, ease, from, to, threshold, rootMargin, showCallback, onLetterAnimationComplete]);

  return (
    <p
      ref={containerRef}
      className={`split-parent ${className}`}
      style={{ textAlign, display: 'inline-block', width: '100%' }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="split-item inline-block"
          style={{ whiteSpace: item === ' ' ? 'pre' : 'normal' }}
        >
          {item}
        </span>
      ))}
    </p>
  );
};

export default SplitText;
