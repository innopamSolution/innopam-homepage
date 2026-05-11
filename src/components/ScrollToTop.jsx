import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 브라우저 자동 스크롤 복원 비활성화
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // smooth 애니메이션 없이 즉시 최상단으로
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // Safari 대응
  }, [pathname]);

  return null;
}
