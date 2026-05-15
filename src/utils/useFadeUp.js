import { useEffect, useRef } from 'react';

// direction: 'up' | 'left' | 'right' | 'scale' | 'stagger'
// 인자 없이 호출하면 예전처럼 ref만 반환 (하위 호환)
export function useFadeUp(threshold = 0.12, direction) {
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

  // direction 미지정 시 ref만 반환 (ProductsPage 등 기존 코드 호환)
  if (!direction) return ref;

  const classMap = {
    up:      'fade-up',
    left:    'fade-left',
    right:   'fade-right',
    scale:   'fade-scale',
    stagger: 'stagger-children',
  };

  return { ref, className: classMap[direction] || 'fade-up' };
}
