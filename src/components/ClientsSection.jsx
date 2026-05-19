// Figma node: 481:526 — 무한 롤링 마퀴
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';
import { useLanguage } from '../i18n/LanguageContext';

// 모든 로고를 하나의 배열로 — 높이를 40px 기준으로 통일
const clients = [
  { src: asset('assets/clients/client-sanrimcheong.svg'), alt: '산림청',             h: 40 },
  { src: asset('assets/clients/client-ngii.svg'),         alt: '국토지리정보원',     h: 40 },
  { src: asset('assets/clients/client-mois.svg'),         alt: '행정안전부',         h: 40 },
  { src: asset('assets/clients/client-seoul.svg'),        alt: '서울특별시',         h: 38 },
  { src: asset('assets/clients/client-jeju.svg'),         alt: '제주특별자치도',     h: 32 },
  { src: asset('assets/clients/client-asan.svg'),         alt: '아산시',             h: 34 },
  { src: asset('assets/clients/client-uos.svg'),          alt: '서울시립대학교',     h: 30 },
  { src: asset('assets/clients/client-nia.svg'),          alt: '한국지능정보사회진흥원', h: 24 },
  { src: asset('assets/clients/client-krei.svg'),         alt: 'KREI 한국농촌경제연구원', h: 48 },
  { src: asset('assets/clients/client-kict.svg'),         alt: 'KICT 한국건설기술연구원', h: 44 },
  { src: asset('assets/clients/client-kiast.svg'),        alt: 'KIAST 항공안전기술원',  h: 38 },
  { src: asset('assets/clients/client-kofpi.svg'),        alt: '한국임업진흥원',     h: 38 },
  { src: asset('assets/clients/client-kwater.svg'),       alt: '한국수자원공사',     h: 34 },
  { src: asset('assets/clients/client-sba.svg'),          alt: '서울경제진흥원',     h: 34 },
];

export default function ClientsSection() {
  const headerRef = useFadeUp(0.1, 'up');
  const { t } = useLanguage();

  return (
    <section className="bg-[#f8f8f8] flex flex-col gap-[48px] lg:gap-[64px] items-center py-[60px] lg:py-[100px] overflow-hidden">

      {/* 헤더 */}
      <div ref={headerRef.ref} className={`flex flex-col items-center text-center leading-none max-w-[803px] px-4 ${headerRef.className}`}>
        <h2 className="section-title mb-3">Clients</h2>
        <p className="font-pretendard text-[16px] text-[#444] leading-[1.4]">
          {t('이노팸의 공공기관 및 지자체 파트너', "Innopam's public institution and local government partners")}
        </p>
      </div>

      {/* 마퀴 영역 */}
      <div className="relative w-full">
        {/* 좌우 페이드 오버레이 */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[120px] z-10"
          style={{ background: 'linear-gradient(to right, #f8f8f8 0%, transparent 100%)' }} />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[120px] z-10"
          style={{ background: 'linear-gradient(to left, #f8f8f8 0%, transparent 100%)' }} />

        {/* 롤링 트랙 — 로고 두 벌로 무한 루프 */}
        <div className="flex items-center marquee-track" style={{ width: 'max-content' }}>
          {/* 첫 번째 세트 */}
          {clients.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center px-[40px] xl:px-[56px] shrink-0">
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-auto object-contain"
                style={{ height: logo.h, maxWidth: 180 }}
                draggable={false}
              />
            </div>
          ))}
          {/* 두 번째 세트 (무한 루프용 복사본) */}
          {clients.map((logo) => (
            <div key={`dup-${logo.alt}`} className="flex items-center justify-center px-[40px] xl:px-[56px] shrink-0" aria-hidden="true">
              <img
                src={logo.src}
                alt=""
                className="w-auto object-contain"
                style={{ height: logo.h, maxWidth: 180 }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
