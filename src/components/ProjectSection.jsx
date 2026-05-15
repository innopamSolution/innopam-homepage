// Figma node: 180:3372 (Project section — sliding carousel)
import { useState } from "react";
import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';

const projects = [
  {
    id: 0,
    title: "GEO-AI 영상분석 서비스",
    subtitle: "멀티센서(위성, 항공, 드론)영상 기반의 GeoAI 분석 플랫폼 서비스",
    features: [
      { title: "데이터 수집 · 관리", desc: "위성, 드론, 항공 영상 데이터를 한 곳에 모아 쉽게 저장하고 관리" },
      { title: "GEO-AI 모델 개발", desc: "모델 앙상블 적용을 통한 AI모델 객체 탐지 정확도 제고" },
      { title: "One-Stop AI 서비스", desc: "학습데이터 수집, 전처리, 구축, 관리를 위한 One-Stop 서비스" },
      { title: "모델 학습 갱신", desc: "플랫폼에서 구축된 학습데이터를 이용해 직접 모델 학습 갱신" },
    ],
    image: asset('assets/industries-case-screen.jpg'),
    tag: '농업 · 산림 · 해양',
  },
  {
    id: 1,
    title: "드론영상관리 시스템",
    subtitle: "농업 드론 영상 데이터의 수집·저장·분석을 통합하는 관리 플랫폼",
    features: [
      { title: "영상 데이터 수집", desc: "다양한 드론 기종의 영상 데이터를 표준화하여 통합 관리" },
      { title: "자동 전처리", desc: "수집된 영상의 정합·보정 등 전처리 과정을 자동화" },
      { title: "분석 결과 시각화", desc: "GIS 기반 지도 위에 분석 결과를 직관적으로 시각화" },
      { title: "보고서 자동 생성", desc: "분석 결과를 기반으로 행정용 보고서를 자동으로 생성" },
    ],
    image: asset('assets/solution-farm.jpg'),
    tag: '농업 분석',
  },
  {
    id: 2,
    title: "서울시 도시변화탐지",
    subtitle: "서울시 전역 위성·항공 영상 기반 도시 변화 자동 탐지 서비스",
    features: [
      { title: "건물 변화 탐지", desc: "서울시 전역의 신축·증축·멸실 건물을 위성 영상으로 자동 탐지" },
      { title: "개발제한구역 감시", desc: "그린벨트 내 불법 개발 행위를 AI로 실시간 모니터링" },
      { title: "도로·인프라 변화", desc: "도로 신설·확장 및 도시 기반시설 변화를 자동으로 감지" },
      { title: "이력 관리", desc: "탐지된 변화 이력을 시계열로 관리하고 행정 보고서 자동 생성" },
    ],
    image: asset('assets/solution-city.jpg'),
    tag: '도시변화 모니터링',
  },
  {
    id: 3,
    title: "산림 모니터링 서비스",
    subtitle: "위성·드론 영상 기반 산림 변화 탐지 및 훼손지 관리 서비스",
    features: [
      { title: "산림 훼손 자동 탐지", desc: "다시기 영상 분석으로 산림 훼손 지역을 자동으로 감지" },
      { title: "복구지 관리", desc: "훼손 지역의 복구 진행 현황을 주기적으로 모니터링" },
      { title: "불법 벌채 감시", desc: "항공·위성 영상 분석으로 불법 산림 훼손 행위를 실시간 감시" },
      { title: "변화 이력 관리", desc: "산림 변화 이력을 체계적으로 기록하고 리포트 자동 생성" },
    ],
    image: asset('assets/solution-eco.jpg'),
    tag: '산림 · 해양',
  },
  {
    id: 4,
    title: "해양 모니터링 서비스",
    subtitle: "위성·드론 영상 기반 해양환경 변화 탐지 및 해양 쓰레기 관리 서비스",
    features: [
      { title: "해양 쓰레기 탐지", desc: "드론 영상으로 해안선 및 해양 쓰레기 분포를 자동 탐지" },
      { title: "해안선 변화 분석", desc: "다시기 위성영상으로 해안선 침식·퇴적 변화를 모니터링" },
      { title: "수질 모니터링", desc: "위성 분광 데이터 분석으로 수질 변화를 원격 탐지" },
      { title: "환경 이력 관리", desc: "해양환경 변화 이력 데이터베이스 구축 및 통계 제공" },
    ],
    image: asset('assets/solution-eco.jpg'),
    tag: '산림 · 해양',
  },
  {
    id: 5,
    title: "기반시설 첨단관리 (TotalCare)",
    subtitle: "기반시설 안전점검 전 과정을 디지털화하는 스마트 유지관리 시스템",
    features: [
      { title: "디지털 점검", desc: "현장 점검 결과를 모바일로 실시간 입력하고 자동 분석" },
      { title: "IoT 센서 연동", desc: "진동·변위 센서 데이터와 영상 분석 결과를 통합 관리" },
      { title: "위험도 예측", desc: "축적된 이력 데이터 기반 AI 모델로 시설물 위험도 예측" },
      { title: "행정 보고 자동화", desc: "안전점검 결과 보고서 및 유지보수 계획서를 자동 생성" },
    ],
    image: asset('assets/solution-disaster.jpg'),
    tag: '재난 · 안전',
  },
];

export default function ProjectSection() {
  const [current, setCurrent] = useState(0);
  const [slideDir, setSlideDir] = useState('right'); // 'right' = 다음, 'left' = 이전
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
        <h2 className="section-title mt-4 mb-3">실제 도입 사례</h2>
        <p className="font-pretendard text-[16px] text-[#444] leading-[1.4]">
          공공기관 및 지자체와 함께 진행한 GeoAI 기반 주요 프로젝트 사례입니다.
        </p>
      </div>

      {/* Carousel */}
      <div ref={contentRef.ref} className={`flex flex-col gap-8 w-full max-w-[1264px] ${contentRef.className}`}>

        {/* 슬라이드 컨텐츠 */}
        <div className="flex items-center gap-4 lg:gap-12 w-full">
          {/* Prev */}
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            className="hidden md:flex shrink-0 w-[44px] h-[44px] rounded-full border border-[#e1e4ed] items-center justify-center text-[#6d758f] hover:bg-[#4262ff] hover:text-white hover:border-[#4262ff] disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="이전"
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
            aria-label="다음"
          >
            →
          </button>
        </div>

        {/* 하단: 도트 + 모바일 버튼 */}
        <div className="flex items-center justify-center gap-6">
          {/* 모바일 이전 버튼 */}
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            className="md:hidden w-[40px] h-[40px] rounded-full border border-[#e1e4ed] flex items-center justify-center text-[#6d758f] hover:bg-[#4262ff] hover:text-white disabled:opacity-25 transition-all"
          >←</button>

          {/* 도트 인디케이터 */}
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
                aria-label={`${i + 1}번째 슬라이드`}
              />
            ))}
          </div>

          {/* 모바일 다음 버튼 */}
          <button
            onClick={() => go(current + 1)}
            disabled={current === projects.length - 1}
            className="md:hidden w-[40px] h-[40px] rounded-full border border-[#e1e4ed] bg-white flex items-center justify-center text-[#6d758f] hover:bg-[#4262ff] hover:text-white hover:border-[#4262ff] disabled:opacity-25 transition-all"
          >→</button>

          {/* 카운터 */}
          <span className="hidden md:block font-pretendard text-[13px] text-[#aab0c6] ml-2">
            {current + 1} / {projects.length}
          </span>
        </div>

      </div>
    </section>
  );
}
