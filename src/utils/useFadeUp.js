import { useEffect, useRef } from 'react';

// direction: 'up' | 'left' | 'right' | 'scale' | 'stagger'
export function useFadeUp(threshold = 0.12, direction = 'up') {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // CSS class mapping
  const classMap = {
    up:      'fade-up',
    left:    'fade-left',
    right:   'fade-right',
    scale:   'fade-scale',
    stagger: 'stagger-children',
  };

  return { ref, className: classMap[direction] || 'fade-up' };
}
