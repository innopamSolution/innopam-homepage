// Figma node: 180:3372 (Project section — sliding carousel)
import { useState } from "react";
import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';
import { useLanguage } from '../i18n/LanguageContext';

export default function ProjectSection() {
  const { t } = useLanguage();

  const projects = [
    {
      id: 0,
      title: t('GEO-AI 영상분석 서비스', 'GEO-AI Image Analysis Service'),
      subtitle: t(
        '멀티센서(위성, 항공, 드론)영상 기반의 GeoAI 분석 플랫폼 서비스',
        'GeoAI analysis platform service based on multi-sensor (satellite, aerial, drone) imagery'
      ),
      features: [
        {
          title: t('데이터 수집 · 관리', 'Data Collection & Management'),
          desc: t(
            '위성, 드론, 항공 영상 데이터를 한 곳에 모아 쉽게 저장하고 관리',
            'Consolidate satellite, drone, and aerial imagery into a single platform for easy storage and management'
          ),
        },
        {
          title: t('GEO-AI 모델 개발', 'GEO-AI Model Development'),
          desc: t(
            '모델 앙상블 적용을 통한 AI모델 객체 탐지 정확도 제고',
            'Improved object detection accuracy through AI model ensemble techniques'
          ),
        },
        {
          title: t('One-Stop AI 서비스', 'One-Stop AI Service'),
          desc: t(
            '학습데이터 수집, 전처리, 구축, 관리를 위한 One-Stop 서비스',
            'One-stop service for training data collection, preprocessing, construction, and management'
          ),
        },
        {
          title: t('모델 학습 갱신', 'Model Training Update'),
          desc: t(
            '플랫폼에서 구축된 학습데이터를 이용해 직접 모델 학습 갱신',
            'Directly update model training using training data built within the platform'
          ),
        },
      ],
      image: asset('assets/industries-case-screen.jpg'),
      tag: t('도시변화 모니터링', 'Urban Change Monitoring'),
    },
    {
      id: 1,
      title: t('재배면적 관리 서비스', 'Cultivation Area Management Service'),
      subtitle: t(
        '드론·위성 영상 기반 농작물 재배면적 AI 자동 분석 및 관리 서비스',
        'AI-based automatic analysis and management of crop cultivation areas using drone and satellite imagery'
      ),
      features: [
        {
          title: t('작물 자동 탐지 및 분류', 'Automatic Crop Detection & Classification'),
          desc: t(
            '드론·위성 영상으로 월동무·감귤·양배추 등 작물 종류를 AI가 자동 식별',
            'AI automatically identifies crop types such as winter radish, citrus, and cabbage from drone/satellite imagery'
          ),
        },
        {
          title: t('재배면적 산출', 'Cultivation Area Calculation'),
          desc: t(
            '필지별 작물 재배면적을 자동 계산하여 지역별 통계 데이터 제공',
            'Automatically calculates crop cultivation area per parcel and provides regional statistical data'
          ),
        },
        {
          title: t('생산량 예측', 'Yield Forecasting'),
          desc: t(
            'AI 분석 기반 작물별 예측 생산량 및 검출면적·건수 정보 제공',
            'Provides AI-based yield predictions and detected area and count information per crop'
          ),
        },
        {
          title: t('데이터 기반 행정 업무 지원', 'Data-Driven Administrative Support'),
          desc: t(
            '재배 현황 데이터를 직불금 지급·휴경지 관리 등 농업 행정에 연계',
            'Links cultivation data to agricultural administration including direct payments and fallow land management'
          ),
        },
      ],
      image: asset('assets/crop-management-service.png'),
      tag: t('농업분석', 'Agricultural Analysis'),
    },
    {
      id: 2,
      title: t('드론영상관리 시스템', 'Drone Imagery Management System'),
      subtitle: t(
        '농업 드론 영상 데이터의 수집·저장·분석을 통합하는 관리 플랫폼',
        'Integrated management platform for collection, storage, and analysis of agricultural drone imagery'
      ),
      features: [
        {
          title: t('드론 기체 운영 관리', 'Drone Fleet Management'),
          desc: t(
            '등록된 드론 기체의 비행 이력, 상태, 스케줄을 통합 관리',
            'Integrated management of registered drone flight history, status, and schedules'
          ),
        },
        {
          title: t('영상 데이터 업로드 및 전처리', 'Image Upload & Preprocessing'),
          desc: t(
            '업로드된 영상의 정합·보정·AI 분석을 자동화하여 데이터 품질 향상',
            'Automates alignment, correction, and AI analysis of uploaded imagery to improve data quality'
          ),
        },
        {
          title: t('분석결과 시각화', 'Analysis Result Visualization'),
          desc: t(
            'GIS 기반 지도에서 AI 분석 결과와 공간정보를 직관적으로 조회',
            'Intuitively view AI analysis results and spatial data on a GIS-based map'
          ),
        },
        {
          title: t('보고서 자동생성', 'Automatic Report Generation'),
          desc: t(
            '분석 결과를 기반으로 행정용 보고서를 자동으로 생성',
            'Automatically generates administrative reports based on analysis results'
          ),
        },
      ],
      image: asset('assets/drone-mgmt-service.png'),
      tag: t('농업분석', 'Agricultural Analysis'),
    },
    {
      id: 3,
      title: t('불법 산림훼손 관리 서비스', 'Illegal Deforestation Management Service'),
      subtitle: t(
        '위성·드론 영상 기반 산림 변화 탐지 및 훼손지 관리 서비스',
        'Forest change detection and damage site management using satellite and drone imagery'
      ),
      features: [
        {
          title: t('산림 훼손 자동 탐지', 'Automatic Forest Damage Detection'),
          desc: t(
            '다시기 영상 분석으로 산림 훼손 지역을 자동으로 감지',
            'Automatically detects forest damage areas through multi-temporal image analysis'
          ),
        },
        {
          title: t('복구지 관리', 'Recovery Site Management'),
          desc: t(
            '훼손 지역의 복구 진행 현황을 주기적으로 모니터링',
            'Periodically monitors the restoration progress of damaged areas'
          ),
        },
        {
          title: t('불법 훼손 감시', 'Illegal Damage Surveillance'),
          desc: t(
            '항공·위성 영상 분석으로 불법 산림 훼손 모니터링',
            'Monitors illegal forest damage through aerial and satellite image analysis'
          ),
        },
        {
          title: t('변화 이력 관리', 'Change History Management'),
          desc: t(
            '산림 변화 이력을 체계적으로 기록하고 리포트 자동 생성',
            'Systematically records forest change history and automatically generates reports'
          ),
        },
      ],
      image: asset('assets/forest-aerial.png'),
      tag: t('산림 · 해양', 'Forest & Ocean'),
    },
    {
      id: 4,
      title: t('해양쓰레기 관리 서비스', 'Marine Debris Management Service'),
      subtitle: t(
        '위성·드론 영상 기반 해양환경 변화 탐지 및 해양 쓰레기 관리 서비스',
        'Marine environment change detection and debris management using satellite and drone imagery'
      ),
      features: [
        {
          title: t('해양 쓰레기 탐지', 'Marine Debris Detection'),
          desc: t(
            '드론 영상으로 해안선 및 해양 쓰레기 분포를 자동 탐지',
            'Automatically detects coastline and marine debris distribution from drone imagery'
          ),
        },
        {
          title: t('해안선 퇴적물 및 쓰레기 모니터링', 'Coastline Sediment & Debris Monitoring'),
          desc: t(
            '시기별 위성영상으로 해안선 퇴적물 및 쓰레기 분포 변화를 모니터링',
            'Monitors changes in coastline sediment and debris distribution using time-series satellite imagery'
          ),
        },
        {
          title: t('탐지 이력 관리', 'Detection History Management'),
          desc: t(
            '쓰레기 탐지 이력 데이터베이스 구축 및 통계 제공',
            'Builds a detection history database and provides statistical information'
          ),
        },
        {
          title: t('현장 업무 지원', 'Field Operations Support'),
          desc: t(
            '수거 및 관리 업무에 지원할 수 있는 데이터 제공',
            'Provides data to support collection and management operations'
          ),
        },
      ],
      image: asset('assets/ocean-waste-service.png'),
      tag: t('산림 · 해양', 'Forest & Ocean'),
    },
    {
      id: 5,
      title: t('정사영상생성 솔루션', 'Orthophoto Generation Solution'),
      subtitle: t(
        '드론·항공 영상을 활용한 고정밀 정사영상 및 3D 모델 자동 생성 솔루션',
        'High-precision orthophoto and 3D model automatic generation solution using drone and aerial imagery'
      ),
      features: [
        {
          title: t('정사영상 자동 생성', 'Automatic Orthophoto Generation'),
          desc: t(
            '드론·항공 촬영 영상을 자동으로 처리하여 기하보정된 정사영상 생성',
            'Automatically processes drone and aerial imagery to generate geometrically corrected orthophotos'
          ),
        },
        {
          title: t('3D 포인트클라우드', '3D Point Cloud'),
          desc: t(
            'SfM/MVS 기반으로 고밀도 3D 포인트클라우드 및 DSM 자동 생성',
            'Automatically generates high-density 3D point clouds and DSMs based on SfM/MVS'
          ),
        },
        {
          title: t('정확도 검증', 'Accuracy Verification'),
          desc: t(
            'GCP(지상기준점) 기반 정확도 검증 및 품질 리포트 자동 생성',
            'GCP-based accuracy verification and automatic quality report generation'
          ),
        },
        {
          title: t('공간정보 연계', 'Spatial Data Integration'),
          desc: t(
            '생성된 정사영상을 GIS 시스템에 바로 연동하여 분석에 활용',
            'Directly integrates generated orthophotos with GIS systems for analysis'
          ),
        },
      ],
      image: asset('assets/ortho-3d-model.png'),
      tag: t('공간정보', 'Geospatial'),
    },
  ];

  const [current, setCurrent] = useState(0);
  const [slideDir, setSlideDir] = useState('right');
  const [animKey, setAnimKey] = useState(0);
  const headerRef  = useFadeUp(0.1, 'up');
  const contentRef = useFadeUp(0.08, 'up');

  const go = (next) => {
    const idx = Math.max(0, Math.min(projects.length - 1, next));
    if (idx === current) return;
    setSlideDir(idx > current ? 'right' : 'left');
    setAnimKey(k => k + 1);
    setCurrent(idx);
  };

  const project = projects[current];
  const slideClass = slideDir === 'right' ? 'slide-from-right' : 'slide-from-left';

  return (
    <section className="bg-white flex flex-col gap-[60px] lg:gap-[120px] items-center px-4 md:px-[88px] py-[60px] lg:py-[100px]">

      {/* Header */}
      <div ref={headerRef.ref} className={`flex flex-col items-center text-center max-w-[803px] ${headerRef.className}`}>
        <SectionLabel text="Project" />
        <h2 className="section-title mt-4 mb-3">{t('실제 도입 사례', 'Real-World Case Studies')}</h2>
        <p className="font-pretendard text-[16px] text-[#444] leading-[1.4]">
          {t(
            '공공기관 및 지자체와 함께 진행한 GeoAI 기반 주요 프로젝트 사례입니다.',
            'Key GeoAI-based project cases conducted with public institutions and local governments.'
          )}
        </p>
      </div>

      {/* Carousel */}
      <div ref={contentRef.ref} className={`flex flex-col gap-8 w-full max-w-[1264px] ${contentRef.className}`}>

        {/* 모바일 전용 상단 네비게이션 */}
        <div className="flex md:hidden items-center justify-between w-full">
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            className="w-[36px] h-[36px] rounded-full border border-[#e1e4ed] flex items-center justify-center text-[#6d758f] hover:bg-[#4262ff] hover:text-white disabled:opacity-25 transition-all"
          >←</button>

          <div className="flex items-center gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-5 h-2 bg-[#4262ff]' : 'w-2 h-2 bg-gray-200'
                }`}
                aria-label={`${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(current + 1)}
            disabled={current === projects.length - 1}
            className="w-[36px] h-[36px] rounded-full border border-[#e1e4ed] bg-white flex items-center justify-center text-[#6d758f] hover:bg-[#4262ff] hover:text-white hover:border-[#4262ff] disabled:opacity-25 transition-all"
          >→</button>
        </div>

        {/* 슬라이드 컨텐츠 */}
        <div className="flex items-center gap-4 lg:gap-12 w-full">
          {/* Prev */}
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            className="hidden md:flex shrink-0 w-[44px] h-[44px] rounded-full border border-[#e1e4ed] items-center justify-center text-[#6d758f] hover:bg-[#4262ff] hover:text-white hover:border-[#4262ff] disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label={t('이전', 'Previous')}
          >
            ←
          </button>

          {/* Card */}
          <div key={animKey} className={`flex flex-col lg:flex-row flex-1 items-start lg:items-center justify-between gap-8 lg:gap-12 ${slideClass}`}>
            {/* Text */}
            <div className="flex flex-col gap-[26px] flex-1 min-w-0">
              {/* 태그 */}
              <span className="inline-flex w-fit text-[12px] font-pretendard font-bold px-3 py-1 rounded-full bg-[#eef1ff] text-[#4262ff]">
                {project.tag}
              </span>
              <div>
                <h3 className="font-pretendard font-bold text-[24px] md:text-[32px] text-black tracking-[-2px] leading-[1.3] md:leading-[1.4]">
                  {project.title}
                </h3>
                <p className="font-pretendard font-medium text-[16px] text-[#444] leading-[1.4] mt-1">
                  {project.subtitle}
                </p>
              </div>
              <ul className="flex flex-col gap-[20px]">
                {project.features.map((f) => (
                  <li key={f.title} className="flex items-start gap-[14px]">
                    <div className="shrink-0 mt-0.5 overflow-hidden" style={{ width: "24px", height: "24px" }}>
                      <img src={asset('assets/check-icon.svg')} alt="" aria-hidden="true" className="w-full h-full" />
                    </div>
                    <div className="font-pretendard text-[#050038]">
                      <p className="text-[17px] font-semibold leading-[1.4]">{f.title}</p>
                      <p className="text-[15px] leading-[1.5] text-[#555]">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div
              className="w-full lg:shrink-0 overflow-hidden rounded-[12px]"
              style={{ maxWidth: '560px', boxShadow: "0px 4px 24px rgba(0,0,0,0.12)" }}
            >
              <div className="relative" style={{ paddingBottom: '66%' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={() => go(current + 1)}
            disabled={current === projects.length - 1}
            className="hidden md:flex shrink-0 w-[44px] h-[44px] rounded-full border border-[#e1e4ed] bg-white items-center justify-center text-[#6d758f] hover:bg-[#4262ff] hover:text-white hover:border-[#4262ff] disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label={t('다음', 'Next')}
          >
            →
          </button>
        </div>

        {/* 하단: 데스크탑 도트 + 카운터 */}
        <div className="hidden md:flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2.5 bg-[#4262ff]'
                    : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-400'
                }`}
                aria-label={`${i + 1}`}
              />
            ))}
          </div>
          <span className="font-pretendard text-[13px] text-[#aab0c6] ml-2">
            {current + 1} / {projects.length}
          </span>
        </div>

      </div>
    </section>
  );
}
