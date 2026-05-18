// Figma node: 481:483 (Clients section — updated)
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';
import { useLanguage } from '../i18n/LanguageContext';

// Row 1 — 공공기관 (6)
const row1 = [
  { src: asset('assets/clients/client-sanrimcheong.png'), alt: '산림청',           h: 44 },
  { src: asset('assets/clients/client-ngii.png'),         alt: '국토지리정보원',   h: 44 },
  { src: asset('assets/clients/client-ndmri-new.png'),    alt: '국립재난안전연구원', h: 44 },
  { src: asset('assets/clients/client-seoul-new.png'),    alt: '서울특별시',        h: 40 },
  { src: asset('assets/clients/client-jeju-new.png'),     alt: '제주특별자치도',   h: 32 },
  { src: asset('assets/clients/client-asan-new.png'),     alt: '아산시',           h: 36 },
];

// Row 2 — 연구기관 (5)
const row2 = [
  { src: asset('assets/clients/client-uos-new.png'),  alt: '서울시립대학교',       h: 32 },
  { src: asset('assets/clients/client-nia.png'),       alt: '한국지능정보사회진흥원', h: 26 },
  { src: asset('assets/clients/client-krei.png'),      alt: 'KREI 한국농촌경제연구원', h: 56 },
  { src: asset('assets/clients/client-kiast.png'),     alt: 'KIAST 항공안전기술원', h: 40 },
];

// Row 3 — 공기업·진흥원 (3)
const row3 = [
  { src: asset('assets/clients/client-kofpi.png'),     alt: '한국임업진흥원',    h: 40 },
  { src: asset('assets/clients/client-kwater-new.png'), alt: '한국수자원공사',   h: 36 },
  { src: asset('assets/clients/client-sba-new.png'),   alt: '서울경제진흥원',   h: 36 },
];

const allClients = [...row1, ...row2, ...row3];

// KICT 로고 (복합 이미지 — 별도 컴포넌트)
function KictLogo({ h = 56 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: h, width: 'auto', minWidth: 120 }}>
      <div className="relative" style={{ height: h, aspectRatio: '570/123' }}>
        <img src={asset('assets/clients/client-kict-1.png')} alt=""
          className="absolute object-contain"
          style={{ top: '0.01%', right: '74.24%', bottom: '32.12%', left: 0 }} />
        <img src={asset('assets/clients/client-kict-2.png')} alt=""
          className="absolute object-contain"
          style={{ top: '61.96%', right: '62.64%', bottom: 0, left: '10.49%' }} />
        <img src={asset('assets/clients/client-kict-3.png')} alt=""
          className="absolute object-contain"
          style={{ top: '70.33%', right: 0, bottom: '0.55%', left: '40.69%' }} />
      </div>
      <span className="sr-only">KICT 한국건설기술연구원</span>
    </div>
  );
}

function LogoItem({ logo, mobile = false }) {
  return (
    <div className="flex items-center justify-center">
      <img
        src={logo.src}
        alt={logo.alt}
        className="w-auto object-contain"
        style={{
          height: mobile ? Math.round(logo.h * 0.6) : logo.h,
          maxWidth: mobile ? 80 : 200,
        }}
      />
    </div>
  );
}

function DesktopRow({ logos, withKict = false }) {
  return (
    <div className="flex items-center justify-center gap-[48px] xl:gap-[72px] flex-wrap">
      {logos.map(logo => <LogoItem key={logo.alt} logo={logo} />)}
      {withKict && <KictLogo h={56} />}
    </div>
  );
}

export default function ClientsSection() {
  const headerRef = useFadeUp(0.1, 'up');
  const logosRef  = useFadeUp(0.05, 'up');
  const { t } = useLanguage();

  return (
    <section className="bg-[#f8f8f8] flex flex-col gap-[60px] lg:gap-[80px] items-center px-4 md:px-[88px] py-[60px] lg:py-[100px]">

      {/* 헤더 */}
      <div ref={headerRef.ref} className={`flex flex-col items-center text-center leading-none max-w-[803px] ${headerRef.className}`}>
        <h2 className="section-title font-space font-light text-[40px] text-black mb-3">Clients</h2>
        <p className="font-pretendard text-[16px] text-[#444] leading-[1.4]">
          {t('이노팸의 공공기관 및 지자체 파트너', "Innopam's public institution and local government partners")}
        </p>
      </div>

      {/* 모바일: 3열 그리드 */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-8 w-full md:hidden">
        {allClients.map(logo => (
          <LogoItem key={logo.alt} logo={logo} mobile />
        ))}
        {/* KICT는 단순히 3개 이미지를 겹치지 않고 대표 이미지만 */}
        <div className="flex items-center justify-center">
          <img src={asset('assets/clients/client-kict-3.png')} alt="한국건설기술연구원"
            className="w-auto object-contain" style={{ height: 22, maxWidth: 80 }} />
        </div>
      </div>

      {/* 데스크탑: 행 단위 배치 */}
      <div ref={logosRef.ref} className={`hidden md:flex flex-col gap-[52px] w-full max-w-[1104px] ${logosRef.className}`}>
        {/* Row 1: 공공기관 6개 */}
        <div className="h-px bg-[#e4e4e4] w-full" />
        <DesktopRow logos={row1} />

        {/* Row 2: 연구기관 4개 + KICT */}
        <div className="h-px bg-[#e4e4e4] w-full" />
        <DesktopRow logos={row2} withKict />

        {/* Row 3: 공기업·진흥원 3개 */}
        <div className="h-px bg-[#e4e4e4] w-full" />
        <DesktopRow logos={row3} />
        <div className="h-px bg-[#e4e4e4] w-full" />
      </div>

    </section>
  );
}
