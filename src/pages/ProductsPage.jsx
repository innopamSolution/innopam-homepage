// Products Page — Figma node 242:2397
// Faithfully implements the Figma design for the Products page

import SectionLabel from '../components/SectionLabel'
import Footer from '../components/Footer'
import Header from '../components/Header'

// ---- Icon Components (from Figma) ----
import { asset } from '../utils/asset';

function IconBlurOn() {
  return (
    <img
      src={asset('assets/products/icon-blur-on.svg')}
      alt=""
      aria-hidden="true"
      className="w-[30px] h-[30px] shrink-0"
    />
  )
}

function IconMdiImage() {
  return (
    <img
      src={asset('assets/products/icon-image.svg')}
      alt=""
      aria-hidden="true"
      className="w-[30px] h-[30px] shrink-0"
    />
  )
}

function IconStairsOutline() {
  return (
    <img
      src={asset('assets/products/icon-stairs-outline.png')}
      alt=""
      aria-hidden="true"
      className="w-[30px] h-[30px] shrink-0"
    />
  )
}

function IconFrameSelect() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      className="w-[30px] h-[30px] shrink-0"
    >
      <rect x="2.5" y="2.5" width="25" height="25" rx="1" stroke="#161C2D" strokeWidth="1.5" />
      <path d="M2.5 4.375H4.375M4.375 4.375V2.5M4.375 4.375H2.5M2.5 4.375V2.5" stroke="#161C2D" strokeWidth="1.5" />
      <path d="M27.5 4.375H25.625M25.625 4.375V2.5M25.625 4.375H27.5M27.5 4.375V2.5" stroke="#161C2D" strokeWidth="1.5" />
      <path d="M2.5 25.625H4.375M4.375 25.625V27.5M4.375 25.625H2.5M2.5 25.625V27.5" stroke="#161C2D" strokeWidth="1.5" />
      <path d="M27.5 25.625H25.625M25.625 25.625V27.5M25.625 25.625H27.5M27.5 25.625V27.5" stroke="#161C2D" strokeWidth="1.5" />
      <circle cx="15" cy="15" r="4" stroke="#161C2D" strokeWidth="1.5" />
      <line x1="18" y1="18" x2="22" y2="22" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconPageSearch() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      className="w-[30px] h-[30px] shrink-0"
    >
      <rect x="5" y="2.5" width="16" height="20" rx="1" stroke="#161C2D" strokeWidth="1.5" />
      <line x1="8" y1="7.5" x2="17" y2="7.5" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="11.25" x2="17" y2="11.25" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="15" x2="13" y2="15" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22.5" cy="22.5" r="4.5" stroke="#161C2D" strokeWidth="1.5" />
      <line x1="25.6" y1="25.6" x2="28" y2="28" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconAddMedia() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      className="w-[30px] h-[30px] shrink-0"
    >
      <rect x="3.75" y="3.75" width="22.5" height="18.75" rx="1.5" stroke="#161C2D" strokeWidth="1.5" />
      <path d="M3.75 17.5L9.375 12.5L13.75 16.25L18.125 11.25L26.25 17.5" stroke="#161C2D" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="10" cy="8.75" r="2" stroke="#161C2D" strokeWidth="1.5" />
      <line x1="15" y1="23.75" x2="15" y2="27.5" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="27.5" x2="20" y2="27.5" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconDevMode() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      className="w-[30px] h-[30px] shrink-0"
    >
      <rect x="2.5" y="5" width="25" height="17.5" rx="1.5" stroke="#161C2D" strokeWidth="1.5" />
      <line x1="2.5" y1="20" x2="27.5" y2="20" stroke="#161C2D" strokeWidth="1.5" />
      <line x1="10" y1="25" x2="20" y2="25" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="22.5" x2="15" y2="25" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.625 10.625L7.5 13.75L10.625 16.875" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.375 9.375L12.5 18.125" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.375 10.625L22.5 13.75L19.375 16.875" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMultiplePages() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      className="w-[30px] h-[30px] shrink-0"
    >
      <rect x="8.75" y="6.25" width="15" height="17.5" rx="1" stroke="#161C2D" strokeWidth="1.5" />
      <rect x="5" y="3.75" width="15" height="17.5" rx="1" stroke="#161C2D" strokeWidth="1.5" />
      <line x1="8.75" y1="10" x2="16.25" y2="10" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.75" y1="13.125" x2="16.25" y2="13.125" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.75" y1="16.25" x2="13.125" y2="16.25" stroke="#161C2D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ---- Demo Button ----

function DemoButton() {
  return (
    <button
      className="flex items-center gap-[15px] bg-[#473bf0] text-white font-pretendard font-bold text-[18px] md:text-[20px] leading-[32px] px-[32px] md:px-[40px] py-[16px] md:py-[20px] rounded-full hover:bg-[#3c31cc] transition-colors"
    >
      데모 신청하기
      <img
        src={asset('assets/products/icon-arrow-next.svg')}
        alt=""
        aria-hidden="true"
        className="w-[16px] h-[11px]"
      />
    </button>
  )
}

// ---- Hero Section ----

function HeroSection() {
  return (
    <section className="relative w-full h-[400px] md:h-[638px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={asset('assets/products/hero-bg.png')}
          alt=""
          className="absolute max-w-none object-cover size-full"
        />
        {/* Dark radial overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 76px 34px at 50% 44.9%, rgba(11,18,37,1) 0%, rgba(10,24,61,1) 39%, rgba(10,30,86,1) 78%, rgba(12,21,46,1) 100%)',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Content — centered on all screen sizes */}
      <div className="absolute inset-0 flex flex-col gap-[24px] md:gap-[38px] items-center justify-center px-4 md:px-[88px] text-center">
        {/* Section label */}
        <div className="flex items-center gap-[10px]">
          <img
            src={asset('assets/products/arrow-group.svg')}
            alt=""
            aria-hidden="true"
            className="w-[12px] h-[12px]"
            style={{ filter: 'invert(1)' }}
          />
          <p className="font-space font-bold text-[14px] text-white tracking-[1.2px] uppercase">
            Products
          </p>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-[4px] items-center w-full max-w-[794px]">
          <p
            className="font-pretendard font-bold text-[32px] md:text-[48px] text-center text-white tracking-[-2px] w-full"
            style={{ lineHeight: '1.2' }}
          >
            공간정보 기술과 인공지능의 융합
          </p>
          <div className="flex gap-[10px] items-center">
            <img
              src={asset('assets/products/geox-logo.svg')}
              alt="GeoX"
              style={{ width: '136.638px', height: '38.408px' }}
            />
            <p
              className="font-pretendard font-black text-[32px] md:text-[48px] text-white tracking-[-2px]"
              style={{ lineHeight: '1.2' }}
            >
              Series
            </p>
          </div>
        </div>

        {/* Description */}
        <p
          className="font-pretendard font-normal text-[16px] md:text-[20px] text-center text-white w-full max-w-[794px]"
          style={{ lineHeight: '1.4' }}
        >
          GeoX는 &lsquo;공간(Geo)&rsquo;과 &lsquo;확장(eXpansion)&rsquo;의 의미를 담고 있으며, 이노팸이 개발한 공간지능정보(GeoAI) 기반의 &lsquo;차세대 미래지향 GeoX 플랫폼 솔루션 서비스&rsquo; 시리즈입니다.
        </p>
      </div>
    </section>
  )
}

// ---- GeoX Symbolic Meaning Section ----

function GeoXMeaningSection() {
  return (
    <section className="bg-white flex flex-col items-center overflow-hidden px-4 md:px-[88px] py-[60px] md:py-[120px] w-full">
      <div className="flex flex-col gap-[60px] md:gap-[100px] items-center max-w-[1264px] w-full">
        {/* Title */}
        <div className="flex flex-wrap gap-[4px] items-center justify-center">
          <img
            src={asset('assets/products/geox-vector21.svg')}
            alt="GeoX"
            style={{ width: '159.526px', height: '44.842px' }}
          />
          <p
            className="font-pretendard font-black text-[#5871ed] text-[32px] md:text-[48px] tracking-[-0.2px] whitespace-nowrap"
            style={{ lineHeight: '1.2' }}
          >
            의 상징적 의미
          </p>
        </div>

        {/* Features grid — 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {/* Feature 1 */}
          <div className="flex flex-col gap-[24px] md:gap-[40px] items-center">
            <img
              src={asset('assets/products/icon-cognition.svg')}
              alt=""
              aria-hidden="true"
              className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            />
            <div className="flex flex-col gap-[12px] md:gap-[16px] items-start text-[#161c2d] w-full">
              <div
                className="font-pretendard font-bold text-[20px] md:text-[21px] text-center tracking-[-0.5px] w-full"
                style={{ lineHeight: '1.4' }}
              >
                <p>차세대 기술</p>
                <p>(Next-generation Technology)</p>
              </div>
              <p
                className="font-pretendard font-normal text-[16px] md:text-[19px] tracking-[-0.2px] opacity-70 w-full"
                style={{ lineHeight: '1.6' }}
              >
                GeoAI를 기반으로 고도화된 분석, 예측 및 의사결정 기술을 통해 차세대 스마트 공간 서비스 실현
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col gap-[24px] md:gap-[40px] items-center">
            <img
              src={asset('assets/products/icon-ai-knowledge.svg')}
              alt=""
              aria-hidden="true"
              className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            />
            <div className="flex flex-col gap-[12px] md:gap-[16px] items-start text-[#161c2d] w-full">
              <div
                className="font-pretendard font-bold text-[20px] md:text-[21px] text-center tracking-[-0.5px] w-full"
                style={{ lineHeight: '1.4' }}
              >
                <p>혁신적 변화</p>
                <p>(Transformation)</p>
              </div>
              <p
                className="font-pretendard font-normal text-[16px] md:text-[19px] tracking-[-0.2px] opacity-70 w-full"
                style={{ lineHeight: '1.6' }}
              >
                공간 데이터를 활용한 새로운 비즈니스 모델과 프로세스를 창출하여 산업 전반의 혁신적 변화
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col gap-[24px] md:gap-[40px] items-center">
            <img
              src={asset('assets/products/icon-ambient.svg')}
              alt=""
              aria-hidden="true"
              className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            />
            <div className="flex flex-col gap-[12px] md:gap-[16px] items-start text-[#161c2d] w-full">
              <div
                className="font-pretendard font-bold text-[20px] md:text-[21px] text-center tracking-[-0.5px] w-full"
                style={{ lineHeight: '1.4' }}
              >
                <p>확장성과 융합</p>
                <p>(eXtended, Cross-Disciplinary)</p>
              </div>
              <p
                className="font-pretendard font-normal text-[16px] md:text-[19px] tracking-[-0.2px] opacity-70 w-full"
                style={{ lineHeight: '1.6' }}
              >
                GeoX는 다양한 산업 분야(예: 도시관리, 농업, 산림, 에너지 등)와 융합하여 확장 가능한 통합 서비스 제공
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Laptop Mockup (reusable) ----

// drop-shadow는 filter로 외부에 적용 → overflow-hidden에 잘리지 않음
// rounded-[8px] + overflow-hidden으로 이미지를 정확히 크롭
function LaptopMockup({ screenSrc, screenAlt }) {
  return (
    <div
      className="w-full max-w-[816px] mx-auto"
      style={{ filter: 'drop-shadow(0px 32px 44px rgba(1,23,48,0.18))' }}
    >
      {/* 라운드 스퀘어 — overflow-hidden이 이미지를 정확히 크롭 */}
      <div
        className="relative w-full overflow-hidden rounded-[8px] bg-[#94a2b6]"
        style={{ paddingBottom: '58.3%' }}
      >
        <img
          src={screenSrc}
          alt={screenAlt}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

// ---- Feature Item (reusable) ----
// Mobile: card style (white bg, rounded-2xl, padding)
// Desktop: plain flex row

function FeatureItem({ icon, title, children }) {
  return (
    <div className="flex gap-[16px] md:gap-[20px] items-start w-full">
      <div className="shrink-0">{icon}</div>
      <div className="flex flex-col gap-[10px] items-start text-[#161c2d] flex-1">
        <p className="font-pretendard font-bold text-[18px] md:text-[20px] w-full" style={{ lineHeight: '1.4' }}>
          {title}
        </p>
        <div
          className="font-pretendard font-normal text-[16px] tracking-[-0.2px] opacity-70 w-full"
          style={{ lineHeight: '1.6' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// ---- GeoXRealMap Section (Content 01) ----

function GeoXRealMapSection() {
  return (
    <section
      className="flex flex-col gap-[60px] md:gap-[80px] items-center px-4 md:px-[88px] py-[60px] md:py-[120px] w-full"
      style={{ background: 'linear-gradient(to right, #eef1ff, #eef1ff)' }}
    >
      {/* Product title */}
      <img
        src={asset('assets/products/geoxrealmap-title.svg')}
        alt="GeoXRealMap"
        className="w-full max-w-[361px]"
        style={{ height: '54px', objectFit: 'contain' }}
      />

      {/* Description */}
      <div className="flex flex-col items-center w-full max-w-[840px]">
        <div className="flex flex-col gap-[20px] items-start font-pretendard font-normal text-[#161c2d] w-full">
          <p
            className="text-[28px] md:text-[36px] text-center tracking-[-1px] w-full font-bold"
            style={{ lineHeight: '1.4' }}
          >
            AI 영상 분석과 실감 정사영상 제작을 위한 차세대 솔루션
          </p>
          <p
            className="text-[17px] md:text-[22px] tracking-[-0.2px] opacity-70 w-full"
            style={{ lineHeight: '1.4' }}
          >
            GeoXRealMap은 고정밀 AI 분석 기술을 활용하여 위성·항공·드론 영상으로부터 실감형 정사영상을 자동 생성하고, 공간 데이터를 시각적으로 정밀하게 구현해내는 차세대 지도 제작 솔루션입니다.
          </p>
        </div>
      </div>

      {/* Laptop mockup — responsive */}
      <LaptopMockup
        screenSrc={asset('assets/products/laptop1-screen.png')}
        screenAlt="GeoXRealMap interface screenshot"
      />

      {/* Feature list — stack on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-[80px] items-start w-full max-w-[840px]">
        <FeatureItem icon={<IconMdiImage />} title="실감정사영상 생성">
          <p>영상의 정밀한 위치 추정과 포인트클라우드, DSM 생성 과정을 통해  기복변위를 해소하고 고정밀 실감 정사영상 생성을 제공합니다.</p>
        </FeatureItem>
        <FeatureItem icon={<IconStairsOutline />} title="생성 단계별 관리">
          <p>실감정사영상 제작 프로세스를 확인하고, 단계별 산출물(원본영상, 포인트클라우드, DSM, 정사영상 등)을 지도 기반으로 조회합니다.</p>
        </FeatureItem>
      </div>

      {/* Demo button */}
      <DemoButton />
    </section>
  )
}

// ---- GeoX CityVision Section (Content 2) ----

function GeoXCityVisionSection() {
  return (
    <section className="bg-[#f4f7fa] flex flex-col gap-[60px] md:gap-[80px] items-center px-4 md:px-[88px] py-[60px] md:py-[120px] w-full">
      {/* Title area with GS1 mark */}
      <div className="flex flex-wrap gap-[20px] md:gap-[40px] items-center justify-center">
        <img
          src={asset('assets/products/geoxcityvision-title.svg')}
          alt="GeoX CityVision"
          className="w-full max-w-[396px]"
          style={{ height: '54px', objectFit: 'contain' }}
        />
        <img
          src={asset('assets/products/mark-gs1.png')}
          alt="GS1 certification mark"
          style={{ width: '79px', height: '54px', objectFit: 'cover' }}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col items-center w-full max-w-[840px]">
        <div className="flex flex-col gap-[20px] items-start font-pretendard font-normal text-[#161c2d] w-full">
          <p
            className="text-[28px] md:text-[36px] text-center tracking-[-1px] w-full font-bold"
            style={{ lineHeight: '1.4' }}
          >
            도시 변화를 관리하고 미래를 예측하는 혁신적 솔루션
          </p>
          <p
            className="text-[17px] md:text-[22px] tracking-[-0.2px] opacity-70 w-full"
            style={{ lineHeight: '1.4' }}
          >
            GeoX CityVision은 건물, 도로, 지형 등 도시의 변화를 AI로 탐지하고 최신 공간 데이터를 기반으로 스마트시티 의사결정을 지원하는 솔루션입니다
          </p>
        </div>
      </div>

      {/* Laptop mockup — responsive */}
      <LaptopMockup
        screenSrc={asset('assets/products/laptop3-screen.png')}
        screenAlt="GeoX CityVision interface screenshot"
      />

      {/* Feature list — stack on mobile, 2-col grid on desktop */}
      <div className="flex flex-col gap-8 md:gap-[48px] items-start w-full max-w-[840px]">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[80px] items-start w-full">
          <FeatureItem icon={<IconBlurOn />} title="도시의 변화를 AI로 탐지">
            <p>항공·드론 영상데이터를 기반으로 건물 및 도로의 변화를 AI로 탐지·분석합니다. 영상-영상비교·영상-수치지도를 비교하여 분석합니다.</p>
          </FeatureItem>
          <FeatureItem icon={<IconFrameSelect />} title="변화탐지 결과 검수">
            <p>영상비교 및 생성, 수정, 삭제 기능</p>
            <p>변화가 확실한 결과부터 의심되는 결과까지 사용자가 선택하여 검수 할 수 있습니다.</p>
          </FeatureItem>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-[80px] items-start w-full">
          <FeatureItem icon={<IconPageSearch />} title="통계 리포트">
            <p>변화탐지된 결과를 PDF와 엑셀파일로 다운로드 받아 사용자의 용도에 맞게 활용할 수 있습니다.</p>
            <p>유형별, 지역별 분포 차트와 상세 위치 목록 제공</p>
          </FeatureItem>
        </div>
      </div>

      {/* Demo button */}
      <DemoButton />
    </section>
  )
}

// ---- CrackEyeX Section (Content 3) ----

function CrackEyeXSection() {
  return (
    <section
      className="flex flex-col gap-[60px] md:gap-[80px] items-center px-4 md:px-[88px] py-[60px] md:py-[120px] w-full"
      style={{ background: 'linear-gradient(to right, #eef1ff, #eef1ff)' }}
    >
      {/* Product name */}
      <p
        className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] whitespace-nowrap"
        style={{ lineHeight: '1.2' }}
      >
        CrackEyeX
      </p>

      {/* Description */}
      <div className="flex flex-col items-center w-full max-w-[840px]">
        <div className="flex flex-col gap-[20px] items-start font-pretendard font-normal text-[#161c2d] w-full">
          <p
            className="text-[28px] md:text-[36px] text-center tracking-[-1px] w-full font-bold"
            style={{ lineHeight: '1.4' }}
          >
            도시 시설물의 미세균열을 관리하기 위한 토탈케어 솔루션
          </p>
          <p
            className="text-[17px] md:text-[22px] tracking-[-0.2px] opacity-70 w-full"
            style={{ lineHeight: '1.4' }}
          >
            CrackEyeX는 AI 기반의 미세 균열 탐지 기술을 통해 교량, 터널, 도로, 건축물 등 도시 기반 시설물의 이상 징후를 정밀 진단하고, 유지보수를 효율화하는 스마트 유지관리 솔루션입니다.
          </p>
        </div>
      </div>

      {/* Laptop mockup — responsive */}
      <LaptopMockup
        screenSrc={asset('assets/products/laptop5-screen.png')}
        screenAlt="CrackEyeX interface screenshot"
      />

      {/* Feature list — stack on mobile, 2-col grid on desktop */}
      <div className="flex flex-col gap-8 md:gap-[48px] items-start w-full max-w-[840px]">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[80px] items-start w-full">
          <FeatureItem icon={<IconAddMedia />} title="시설물 관리와 영상등록">
            <p>교량, 터널, 도로 등 시설물의 정보를 등록하고 체계적으로 관리합니다. 정사 영상과 도면 데이터를 업로드해 분석을 간편하게 진행할 수 있습니다</p>
          </FeatureItem>
          <FeatureItem icon={<IconBlurOn />} title="AI 기반 손상 탐지">
            <p>AI가 균열, 박락, 철근 노출, 누수 등 시설물의 손상 여부를 자동으로 탐지합니다.</p>
          </FeatureItem>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-[80px] items-start w-full">
          <FeatureItem icon={<IconDevMode />} title="상태 평가 및 등급 산정">
            <p>탐지 결과를 기반으로 시설물 상태를 분석하고 상태평가 등급을 산정합니다.</p>
          </FeatureItem>
          <FeatureItem icon={<IconMultiplePages />} title="외관조사망도 자동 생성">
            <p>탐지 결과를 시각화하여 디지털 외관조사망도와 보고서를 자동으로 생성합니다</p>
          </FeatureItem>
        </div>
      </div>

      {/* Demo button */}
      <DemoButton />
    </section>
  )
}

// ---- Main ProductsPage Component ----

export default function ProductsPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main>
        {/* pt-[84px] to offset fixed header height (py-[20px] * 2 + logo 44px = 84px) */}
        <div className="pt-[84px]">
          <HeroSection />
          <GeoXMeaningSection />
          <GeoXRealMapSection />
          <GeoXCityVisionSection />
          <CrackEyeXSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
