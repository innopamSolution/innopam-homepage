// Products Page — Figma node 242:2397
// Faithfully implements the Figma design for the Products page

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'
import Footer from '../components/Footer'
import Header from '../components/Header'
import DemoModal from '../components/DemoModal'
import { useFadeUp } from '../utils/useFadeUp';
import { useLanguage } from '../i18n/LanguageContext';

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

function DemoButton({ onOpen, label }) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-[15px] bg-[#473bf0] text-white font-pretendard font-bold text-[18px] md:text-[20px] leading-[32px] px-[32px] md:px-[40px] py-[16px] md:py-[20px] rounded-full hover:bg-[#3c31cc] transition-colors"
    >
      {label}
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

function HeroSection({ t }) {
  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={asset('assets/products/hero-bg-new.jpg')}
          alt=""
          className="absolute max-w-none object-cover size-full"
        />
        <div className="absolute inset-0 bg-[rgba(18,33,75,0.6)]" />
      </div>

      {/* Content — centered */}
      <div className="hero-content absolute inset-0 flex flex-col gap-[38px] items-center justify-center px-4 md:px-[88px] text-center">
        {/* Section label */}
        <div className="flex items-center gap-[10px]">
          <img
            src={asset('assets/arrow01.svg')}
            alt=""
            aria-hidden="true"
            className="w-[12px] h-[12px]"
            style={{ filter: 'invert(1)' }}
          />
          <p className="font-space font-bold text-[14px] text-white tracking-[1.2px] uppercase">
            Products
          </p>
        </div>

        {/* Heading: GeoX logo + Series */}
        <div className="flex flex-col gap-[4px] items-center w-full max-w-[794px]">
          <div className="flex gap-[10px] items-center">
            <img
              src={asset('assets/geox-logo-white.svg')}
              alt="GeoX"
              style={{ width: '136.638px', height: '38.408px' }}
            />
            <p
              className="font-pretendard font-black text-[48px] text-white tracking-[-2px]"
              style={{ lineHeight: '65px' }}
            >
              Series
            </p>
          </div>
        </div>

        {/* Description */}
        <p
          className="font-pretendard font-normal text-[20px] text-center text-white w-full max-w-[794px]"
          style={{ lineHeight: '1.4' }}
        >
          {t(
            "GeoX는 '공간(Geo)'과 '확장(eXpansion)'의 의미를 담고 있으며, 이노팸이 개발한 공간지능정보(GeoAI) 기반의 '차세대 미래지향 GeoX 플랫폼 솔루션 서비스' 시리즈입니다.",
            "GeoX combines 'Geo' (space) and 'eXpansion', representing Innopam's next-generation GeoAI-based platform solution service series."
          )}
        </p>
      </div>
    </section>
  )
}

// ---- GeoX Symbolic Meaning Section ----

function GeoXMeaningSection({ t }) {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="fade-up bg-white flex flex-col items-center overflow-hidden px-4 md:px-[88px] py-[60px] md:py-[120px] w-full">
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
            {t('의 상징적 의미', 'Symbolic Meaning')}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {/* Feature 1 */}
          <div className="flex flex-col gap-[40px] items-center">
            <div className="overflow-hidden relative w-[100px] h-[100px] shrink-0">
              <div className="absolute" style={{ inset: '7.03% 17.97% 5.47% 14.84%' }}>
                <img src={asset('assets/products/icon-cognition.svg')} alt="" aria-hidden="true" className="block w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col gap-[12px] md:gap-[16px] items-start text-[#161c2d] w-full">
              <div
                className="font-pretendard font-bold text-[20px] md:text-[21px] text-center tracking-[-0.5px] w-full"
                style={{ lineHeight: '1.4' }}
              >
                <p>{t('차세대 기술', 'Next-generation Technology')}</p>
                <p>(Next-generation Technology)</p>
              </div>
              <p
                className="font-pretendard font-normal text-[16px] md:text-[19px] tracking-[-0.2px] opacity-70 w-full"
                style={{ lineHeight: '1.6' }}
              >
                {t(
                  'GeoAI를 기반으로 고도화된 분석, 예측 및 의사결정 기술을 통해 차세대 스마트 공간 서비스 실현',
                  'Realizing next-generation smart spatial services through advanced GeoAI-based analysis, prediction, and decision-making technologies'
                )}
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col gap-[40px] items-center">
            <div className="overflow-hidden relative w-[100px] h-[100px] shrink-0">
              <div className="absolute" style={{ inset: '8.59% 5.47% 9.38% 5.47%' }}>
                <img src={asset('assets/products/icon-ai-knowledge.svg')} alt="" aria-hidden="true" className="block w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col gap-[12px] md:gap-[16px] items-start text-[#161c2d] w-full">
              <div
                className="font-pretendard font-bold text-[20px] md:text-[21px] text-center tracking-[-0.5px] w-full"
                style={{ lineHeight: '1.4' }}
              >
                <p>{t('혁신적 변화', 'Transformation')}</p>
                <p>(Transformation)</p>
              </div>
              <p
                className="font-pretendard font-normal text-[16px] md:text-[19px] tracking-[-0.2px] opacity-70 w-full"
                style={{ lineHeight: '1.6' }}
              >
                {t(
                  '공간 데이터를 활용한 새로운 비즈니스 모델과 프로세스를 창출하여 산업 전반의 혁신적 변화',
                  'Creating new business models and processes using spatial data to drive transformative change across industries'
                )}
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col gap-[40px] items-center">
            <div className="overflow-hidden relative w-[100px] h-[100px] shrink-0">
              <div className="absolute" style={{ inset: '5.47% 11.72%' }}>
                <img src={asset('assets/products/icon-ambient.svg')} alt="" aria-hidden="true" className="block w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col gap-[12px] md:gap-[16px] items-start text-[#161c2d] w-full">
              <div
                className="font-pretendard font-bold text-[20px] md:text-[21px] text-center tracking-[-0.5px] w-full"
                style={{ lineHeight: '1.4' }}
              >
                <p>{t('확장성과 융합', 'eXtended, Cross-Disciplinary')}</p>
                <p>(eXtended, Cross-Disciplinary)</p>
              </div>
              <p
                className="font-pretendard font-normal text-[16px] md:text-[19px] tracking-[-0.2px] opacity-70 w-full"
                style={{ lineHeight: '1.6' }}
              >
                {t(
                  'GeoX는 다양한 산업 분야(예: 도시관리, 농업, 산림, 에너지 등)와 융합하여 확장 가능한 통합 서비스 제공',
                  'GeoX integrates with diverse industries (e.g. urban management, agriculture, forestry, energy) to deliver scalable integrated services'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Laptop Mockup (reusable) ----

function LaptopMockup({ screenSrc, screenAlt }) {
  return (
    <div
      className="w-full max-w-[816px] mx-auto"
      style={{ filter: 'drop-shadow(0px 32px 44px rgba(1,23,48,0.18))' }}
    >
      <div
        className="relative w-full overflow-hidden rounded-[8px] bg-[#94a2b6]"
        style={{ paddingBottom: '58.3%' }}
      >
        <img
          src={screenSrc}
          alt={screenAlt}
          className="absolute inset-0 w-full h-full object-cover object-left-top"
        />
      </div>
    </div>
  )
}

// ---- Feature Item (reusable) ----

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

// ---- GeoXRealMap Section ----

function GeoXRealMapSection({ onOpen, t }) {
  const ref = useFadeUp();
  return (
    <section
      id="geoxrealmap"
      ref={ref}
      className="fade-up flex flex-col gap-[60px] md:gap-[80px] items-center px-4 md:px-[88px] py-[60px] md:py-[120px] w-full"
      style={{ background: 'linear-gradient(to right, #eef1ff, #eef1ff)' }}
    >
      <img
        src={asset('assets/products/geoxrealmap-title.svg')}
        alt="GeoXRealMap"
        className="w-full max-w-[361px]"
        style={{ height: '54px', objectFit: 'contain' }}
      />

      <div className="flex flex-col items-center w-full max-w-[840px]">
        <div className="flex flex-col gap-[20px] items-start font-pretendard font-normal text-[#161c2d] w-full">
          <p
            className="text-[28px] md:text-[36px] text-center tracking-[-1px] w-full font-bold"
            style={{ lineHeight: '1.4' }}
          >
            {t(
              'AI 영상 분석과 실감 정사영상 제작을 위한 차세대 솔루션',
              'Next-generation solution for AI image analysis and true orthophoto production'
            )}
          </p>
          <p
            className="text-[17px] md:text-[22px] tracking-[-0.2px] opacity-70 w-full"
            style={{ lineHeight: '1.4' }}
          >
            {t(
              'GeoXRealMap은 고정밀 AI 분석 기술을 활용하여 위성·항공·드론 영상으로부터 실감형 정사영상을 자동 생성하고, 공간 데이터를 시각적으로 정밀하게 구현해내는 차세대 지도 제작 솔루션입니다.',
              'GeoXRealMap is a next-generation mapping solution that utilizes high-precision AI analysis to automatically generate true orthophotos from satellite, aerial, and drone imagery with precise spatial data visualization.'
            )}
          </p>
        </div>
      </div>

      <LaptopMockup
        screenSrc={asset('assets/products/laptop1-screen.png')}
        screenAlt="GeoXRealMap interface screenshot"
      />

      <div className="flex flex-col md:flex-row gap-10 md:gap-[80px] items-start w-full max-w-[840px]">
        <FeatureItem icon={<IconMdiImage />} title={t('실감정사영상 생성', 'True Orthophoto Generation')}>
          <p>{t(
            '영상의 정밀한 위치 추정과 포인트클라우드, DSM 생성 과정을 통해  기복변위를 해소하고 고정밀 실감 정사영상 생성을 제공합니다.',
            'Provides high-precision true orthophoto generation by resolving relief displacement through precise image positioning, point cloud, and DSM generation.'
          )}</p>
        </FeatureItem>
        <FeatureItem icon={<IconStairsOutline />} title={t('생성 단계별 관리', 'Step-by-step Generation Management')}>
          <p>{t(
            '실감정사영상 제작 프로세스를 확인하고, 단계별 산출물(원본영상, 포인트클라우드, DSM, 정사영상 등)을 지도 기반으로 조회합니다.',
            'Monitor the orthophoto production process and view step-by-step outputs (raw images, point cloud, DSM, orthophotos, etc.) on a map.'
          )}</p>
        </FeatureItem>
      </div>

      <DemoButton onOpen={onOpen} label={t('데모 신청하기', 'Request a Demo')} />
    </section>
  )
}

// ---- GeoX CityVision Section ----

function GeoXCityVisionSection({ onOpen, t }) {
  const ref = useFadeUp();
  return (
    <section id="geoxcityvision" ref={ref} className="fade-up bg-[#f4f7fa] flex flex-col gap-[60px] md:gap-[80px] items-center px-4 md:px-[88px] py-[60px] md:py-[120px] w-full">
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

      <div className="flex flex-col items-center w-full max-w-[840px]">
        <div className="flex flex-col gap-[20px] items-start font-pretendard font-normal text-[#161c2d] w-full">
          <p
            className="text-[28px] md:text-[36px] text-center tracking-[-1px] w-full font-bold"
            style={{ lineHeight: '1.4' }}
          >
            {t(
              '도시 변화를 관리하고 미래를 예측하는 혁신적 솔루션',
              'An innovative solution for managing urban change and predicting the future'
            )}
          </p>
          <p
            className="text-[17px] md:text-[22px] tracking-[-0.2px] opacity-70 w-full"
            style={{ lineHeight: '1.4' }}
          >
            {t(
              'GeoX CityVision은 건물, 도로, 지형 등 도시의 변화를 AI로 탐지하고 최신 공간 데이터를 기반으로 스마트시티 의사결정을 지원하는 솔루션입니다',
              'GeoX CityVision is a solution that uses AI to detect changes in urban structures such as buildings, roads, and terrain, and supports smart city decision-making based on up-to-date spatial data.'
            )}
          </p>
        </div>
      </div>

      <LaptopMockup
        screenSrc={asset('assets/products/laptop3-screen.png')}
        screenAlt="GeoX CityVision interface screenshot"
      />

      <div className="flex flex-col gap-8 md:gap-[48px] items-start w-full max-w-[840px]">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[80px] items-start w-full">
          <FeatureItem icon={<IconBlurOn />} title={t('도시의 변화를 AI로 탐지', 'AI-powered Urban Change Detection')}>
            <p>{t(
              '항공·드론 영상데이터를 기반으로 건물 및 도로의 변화를 AI로 탐지·분석합니다. 영상-영상비교·영상-수치지도를 비교하여 분석합니다.',
              'AI detects and analyzes changes in buildings and roads based on aerial and drone imagery. Analyzes through image-to-image and image-to-digital map comparisons.'
            )}</p>
          </FeatureItem>
          <FeatureItem icon={<IconFrameSelect />} title={t('변화탐지 결과 검수', 'Change Detection Result Verification')}>
            <p>{t('영상비교 및 생성, 수정, 삭제 기능', 'Image comparison and create, edit, delete functions')}</p>
            <p>{t(
              '변화가 확실한 결과부터 의심되는 결과까지 사용자가 선택하여 검수 할 수 있습니다.',
              'Users can select and verify results from confirmed changes to suspected ones.'
            )}</p>
          </FeatureItem>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-[80px] items-start w-full">
          <FeatureItem icon={<IconPageSearch />} title={t('통계 리포트', 'Statistical Report')}>
            <p>{t(
              '변화탐지된 결과를 PDF와 엑셀파일로 다운로드 받아 사용자의 용도에 맞게 활용할 수 있습니다.',
              'Download change detection results as PDF and Excel files for use according to your needs.'
            )}</p>
            <p>{t('유형별, 지역별 분포 차트와 상세 위치 목록 제공', 'Distribution charts by type and region and detailed location list provided')}</p>
          </FeatureItem>
        </div>
      </div>

      <DemoButton onOpen={onOpen} label={t('데모 신청하기', 'Request a Demo')} />
    </section>
  )
}

// ---- CrackEyeX Section ----

function CrackEyeXSection({ onOpen, t }) {
  const ref = useFadeUp();
  return (
    <section
      id="crackeyex"
      ref={ref}
      className="fade-up flex flex-col gap-[60px] md:gap-[80px] items-center px-4 md:px-[88px] py-[60px] md:py-[120px] w-full"
      style={{ background: 'linear-gradient(to right, #eef1ff, #eef1ff)' }}
    >
      <p
        className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] whitespace-nowrap"
        style={{ lineHeight: '1.2' }}
      >
        CrackEyeX
      </p>

      <div className="flex flex-col items-center w-full max-w-[840px]">
        <div className="flex flex-col gap-[20px] items-start font-pretendard font-normal text-[#161c2d] w-full">
          <p
            className="text-[28px] md:text-[36px] text-center tracking-[-1px] w-full font-bold"
            style={{ lineHeight: '1.4' }}
          >
            {t(
              '도시 시설물의 미세균열을 관리하기 위한 토탈케어 솔루션',
              'Total care solution for managing micro-cracks in urban infrastructure'
            )}
          </p>
          <p
            className="text-[17px] md:text-[22px] tracking-[-0.2px] opacity-70 w-full"
            style={{ lineHeight: '1.4' }}
          >
            {t(
              'CrackEyeX는 AI 기반의 미세 균열 탐지 기술을 통해 교량, 터널, 도로, 건축물 등 도시 기반 시설물의 이상 징후를 정밀 진단하고, 유지보수를 효율화하는 스마트 유지관리 솔루션입니다.',
              'CrackEyeX is a smart maintenance solution that precisely diagnoses abnormal signs in urban infrastructure such as bridges, tunnels, roads, and buildings using AI-based micro-crack detection technology, and streamlines maintenance operations.'
            )}
          </p>
        </div>
      </div>

      <LaptopMockup
        screenSrc={asset('assets/products/laptop5-screen.png')}
        screenAlt="CrackEyeX interface screenshot"
      />

      <div className="flex flex-col gap-8 md:gap-[48px] items-start w-full max-w-[840px]">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[80px] items-start w-full">
          <FeatureItem icon={<IconAddMedia />} title={t('시설물 관리와 영상등록', 'Facility Management & Image Registration')}>
            <p>{t(
              '교량, 터널, 도로 등 시설물의 정보를 등록하고 체계적으로 관리합니다. 정사 영상과 도면 데이터를 업로드해 분석을 간편하게 진행할 수 있습니다',
              'Register and systematically manage information for facilities such as bridges, tunnels, and roads. Upload orthophotos and drawing data to conduct analysis easily.'
            )}</p>
          </FeatureItem>
          <FeatureItem icon={<IconBlurOn />} title={t('AI 기반 손상 탐지', 'AI-based Damage Detection')}>
            <p>{t(
              'AI가 균열, 박락, 철근 노출, 누수 등 시설물의 손상 여부를 자동으로 탐지합니다.',
              'AI automatically detects facility damage such as cracks, spalling, rebar exposure, and leakage.'
            )}</p>
          </FeatureItem>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-[80px] items-start w-full">
          <FeatureItem icon={<IconDevMode />} title={t('상태 평가 및 등급 산정', 'Condition Assessment & Grade Rating')}>
            <p>{t(
              '탐지 결과를 기반으로 시설물 상태를 분석하고 상태평가 등급을 산정합니다.',
              'Analyzes facility condition based on detection results and calculates condition assessment grades.'
            )}</p>
          </FeatureItem>
          <FeatureItem icon={<IconMultiplePages />} title={t('외관조사망도 자동 생성', 'Automatic Inspection Diagram Generation')}>
            <p>{t(
              '탐지 결과를 시각화하여 디지털 외관조사망도와 보고서를 자동으로 생성합니다',
              'Visualizes detection results to automatically generate digital inspection diagrams and reports.'
            )}</p>
          </FeatureItem>
        </div>
      </div>

      <DemoButton onOpen={onOpen} label={t('데모 신청하기', 'Request a Demo')} />
    </section>
  )
}

// ---- Main ProductsPage Component ----

export default function ProductsPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main>
        <div className="pt-[84px]">
          <HeroSection t={t} />
          <GeoXMeaningSection t={t} />
          <GeoXRealMapSection onOpen={() => setDemoOpen(true)} t={t} />
          <GeoXCityVisionSection onOpen={() => setDemoOpen(true)} t={t} />
          <CrackEyeXSection onOpen={() => setDemoOpen(true)} t={t} />
        </div>
      </main>
      <DemoModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title={t('데모 신청', 'Request a Demo')}
        subtitle={t('이노팸 솔루션 데모를 신청해 주시면 빠르게 연락드리겠습니다.', 'Request a demo of Innopam solutions and we will contact you promptly.')}
        submitLabel={t('데모 신청하기', 'Submit Request')}
      />
      <Footer />
    </div>
  )
}
