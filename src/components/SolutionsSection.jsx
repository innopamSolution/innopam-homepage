// Figma node: 159:2246 (Solutions) + 176:3308 (농업 분석 state)
// All spacing/padding/border values taken directly from Figma
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';

// ── Figma node 159:2246(도시변화), 176:3308(농업분석) 기준 데이터 ──────────
const solutions = [
  {
    id: 0,
    title: "도시변화 모니터링",
    image: asset('assets/solution-city.jpg'),
    description: [
      "위성, 항공, 드론 데이터를 AI로 분석해 도시 변화를 실시간으로 탐지하고 관리합니다.",
      "도시계획·개발제한구역 관리, 불법건축·개발 감시, 수치지형도 고도화 등 행정 효율화에 활용됩니다.",
    ],
    relatedProduct: { name: "GeoX CityVision", href: "/products#geoxcityvision" },
    projects: ["고정밀 전자지도 구축 챌린지 사업", "AI 기반 품질검증 지원 시스템 개발"],
    markers: [
      { id: 1, top: '35%', left: '40%', color: '#ef4444', label: '불법 건축 의심', desc: '신규 구조물 탐지 · 신뢰도 94%', box: { w: 60, h: 50 } },
      { id: 2, top: '58%', left: '65%', color: '#4262ff', label: '도로 변화 탐지', desc: '도로 신설 / 확장 감지', box: { w: 72, h: 32 } },
      { id: 3, top: '70%', left: '28%', color: '#f59e0b', label: '건물 변화', desc: '증축 탐지 · 면적 +128㎡', box: { w: 52, h: 46 } },
    ],
  },
  {
    id: 1,
    title: "농업 분석",
    image: asset('assets/solution-farm.jpg'),
    description: [
      "드론으로 촬영한 영상을 AI가 분석하여 농작물의 종류를 자동으로 식별하고 작물의 재배면적을 산출합니다.",
      "분석된 데이터를 기반으로 지역별 재배 현황을 파악하고 정책 수립과 수급 조절에 활용할 수 있습니다.",
      "또한 직불금 관리, 휴경지 관리, 통계 관리 등 농업 행정 전반에 활용됩니다.",
    ],
    relatedProduct: null,
    projects: ["GeoAI 영상분석 서비스", "드론영상관리 시스템"],
    markers: [
      { id: 1, top: '40%', left: '50%', color: '#16a34a', label: '생산량 예측', desc: '재배면적 2.4ha · 수확량 예측', box: { w: 68, h: 56 } },
      { id: 2, top: '65%', left: '70%', color: '#f59e0b', label: '휴경지 탐지', desc: '미경작 확인 · 직불금 제외', box: { w: 60, h: 48 } },
      { id: 3, top: '55%', left: '25%', color: '#4262ff', label: '작물 탐지', desc: '고추 재배 추정 · 0.8ha', box: { w: 52, h: 42 } },
    ],
  },
  {
    id: 2,
    title: "산림, 해양",
    image: asset('assets/solution-eco.jpg'),
    description: [
      "위성, 항공, 드론 영상을 AI가 분석하여 산림 훼손 지역을 자동으로 탐지하고 변화 현황을 지속적으로 모니터링합니다.",
      "분석된 데이터를 기반으로 훼손 지역을 신속하게 파악하고 정기적인 모니터링과 복구지 관리를 통해 체계적인 산림 관리를 지원합니다.",
      "불법 산림 훼손 감시, 복구지 관리, 변화 이력 관리 등 산림 행정 전반에 활용됩니다.",
      "또한 해양분야에서는 해양 쓰레기 관리, 해안선 변화 분석, 환경 모니터링 등 해양 행정 및 환경 관리에 활용됩니다.",
    ],
    relatedProduct: null,
    projects: ["GeoAI 영상분석 서비스", "제주 드론특별자유화구역 조성 사업"],
    markers: [
      { id: 1, top: '35%', left: '50%', color: '#ef4444', label: '산림 훼손 탐지', desc: '훼손 면적 0.6ha · 신규 감지', box: { w: 64, h: 54 } },
      { id: 2, top: '65%', left: '32%', color: '#f59e0b', label: '해양쓰레기 탐지', desc: '해안선 쓰레기 분포 감지', box: { w: 64, h: 50 } },
      { id: 3, top: '50%', left: '70%', color: '#06b6d4', label: '해안선 변화', desc: '침식 2.1m 후퇴 감지', box: { w: 50, h: 40 } },
    ],
  },
  {
    id: 3,
    title: "재난 안전",
    image: asset('assets/solution-disaster.jpg'),
    description: [
      "시설물 영상 데이터를 AI가 분석해 균열, 파손 등 손상 상태를 자동으로 탐지합니다.",
      "분석 결과를 기반으로 시설물 상태를 한눈에 확인하고 외관조사망도를 자동 생성하여 효율적인 점검과 관리에 활용할 수 있습니다.",
      "시설물 안전 점검 관리, 점검 결과 보고 및 이력 관리, 유지보수 계획 수립, 공공 안전 모니터링, 데이터 기반 행정 운영에 활용됩니다.",
    ],
    relatedProduct: { name: "CrackEye X", href: "/products#crackeyex" },
    projects: ["기반시설 첨단관리(TotalCare) 기술개발", "고정밀 전자지도 구축 챌린지 사업"],
    markers: [
      { id: 1, top: '55%', left: '45%', color: '#ef4444', label: '균열 탐지 (D등급)', desc: '폭 0.8mm · 즉시 보수 필요', box: { w: 58, h: 34 } },
      { id: 2, top: '72%', left: '28%', color: '#f59e0b', label: '손상 탐지 (C등급)', desc: '박리 면적 0.12㎡ 감지', box: { w: 54, h: 42 } },
      { id: 3, top: '42%', left: '68%', color: '#4262ff', label: '정상 구간', desc: '이상 없음 · A등급', box: { w: 48, h: 36 } },
    ],
  },
];

export default function SolutionsSection() {
  const [active, setActive] = useState(0);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const hoveredRef = useRef(null); // 현재 호버 중인 탭 id (null이면 자동 순환)
  const timerRef = useRef(null);
  const headerFade = useFadeUp(0.1, 'up');

  // 타이머 시작: 20초마다 다음 탭으로 이동
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (hoveredRef.current !== null) return; // 호버 중이면 건너뜀
      setActive((prev) => (prev + 1) % solutions.length);
    }, 2000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleMouseEnter = (id) => {
    hoveredRef.current = id;
    setActive(id);
  };

  const handleMouseLeave = () => {
    hoveredRef.current = null;
  };

  return (
    <section id="solutions" className="bg-white flex flex-col gap-[60px] lg:gap-[120px] items-center px-4 md:px-[88px] py-[60px] lg:py-[100px]">

      {/* Heading */}
      <div ref={headerFade.ref} className={`flex flex-col items-center gap-[9px] w-full max-w-[880px] ${headerFade.className}`}>
        <SectionLabel text="Solutions" />
        <h2 className="font-space font-light text-[28px] md:text-[40px] text-black text-center leading-[1.3] md:leading-[48px] w-full">
          <span>산업별 문제를 </span>
          <strong className="font-bold">AI로 해결합니다.</strong>
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[80px] items-start lg:items-center w-full max-w-[1264px]">

        {/* 이미지 — 크로스페이드 + AI 인터랙션 오버레이 */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:w-[600px] lg:h-[600px] shrink-0 overflow-hidden rounded-[12px]">
          {/* 크로스페이드 이미지들 */}
          {solutions.map((sol) => (
            <img
              key={sol.id}
              src={sol.image}
              alt={sol.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{
                opacity: sol.id === active ? 1 : 0,
                transition: 'opacity 700ms ease-in-out',
              }}
            />
          ))}

          {/* 스캔 라인 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="scan-line" />
          </div>

          {/* 그리드 오버레이 */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: 'linear-gradient(rgba(88,113,237,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(88,113,237,0.8) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* 활성 솔루션 마커들 */}
          {solutions[active]?.markers.map((m) => (
            <div
              key={m.id}
              className="absolute z-10"
              style={{ top: m.top, left: m.left, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHoveredMarker(m.id)}
              onMouseLeave={() => setHoveredMarker(null)}
            >
              {/* 감지 박스 */}
              {m.box && (
                <div
                  className="absolute border border-dashed pointer-events-none"
                  style={{
                    width: m.box.w, height: m.box.h,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: m.color,
                    opacity: 0.9,
                  }}
                >
                  <span
                    className="absolute -top-5 left-0 text-[9px] font-bold px-1.5 py-0.5 whitespace-nowrap"
                    style={{ background: m.color, color: '#fff' }}
                  >
                    {m.label}
                  </span>
                </div>
              )}

              {/* 펄스 도트 */}
              <div className="relative cursor-pointer">
                <span className="absolute inline-flex rounded-full opacity-50 animate-ping"
                  style={{ width: 20, height: 20, top: -10, left: -10, background: m.color }} />
                <span className="relative flex items-center justify-center w-5 h-5 rounded-full border-2 border-white"
                  style={{ background: m.color, boxShadow: `0 0 0 3px ${m.color}40` }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </div>

              {/* 툴팁 */}
              {hoveredMarker === m.id && (
                <div
                  className="absolute z-20 bg-white rounded-xl px-3 py-2 shadow-xl border border-gray-100 whitespace-nowrap animate-fadeIn"
                  style={{ bottom: 28, left: '50%', transform: 'translateX(-50%)', minWidth: 140 }}
                >
                  <p className="text-[11px] font-bold mb-0.5" style={{ color: m.color }}>{m.label}</p>
                  <p className="text-[11px] text-gray-600 leading-tight">{m.desc}</p>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45" />
                </div>
              )}
            </div>
          ))}

          {/* AI 분석 중 뱃지 */}
          <div className="absolute bottom-4 right-4 bg-[#4262ff] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            AI 분석 중
          </div>
        </div>

        {/* 아코디언 — grid-template-rows 트릭으로 실제 높이 기반 자연스러운 애니메이션 */}
        <ul className="flex flex-col items-start flex-1 min-w-0 w-full">
          {solutions.map((sol) => {
            const isActive = sol.id === active;
            return (
              <li
                key={sol.id}
                className="border-b border-[#e9e9e9] w-full"
                onMouseEnter={() => handleMouseEnter(sol.id)}
                onMouseLeave={handleMouseLeave}
              >

                {/* 타이틀 버튼 */}
                <button
                  className="w-full text-left py-[14px] flex items-center gap-[10px] group"
                  onClick={() => setActive(sol.id)}
                  aria-expanded={isActive}
                >
                  <img
                    src={asset('assets/arrow-right02.svg')}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: '24px', height: '16px', flexShrink: 0,
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                      transition: 'opacity 250ms ease, transform 250ms ease',
                    }}
                  />
                  <span className={`font-space tracking-[0.5px] uppercase whitespace-nowrap
                    transition-colors duration-200
                    ${isActive
                      ? 'font-bold text-[22px] md:text-[30px] text-black leading-[31.5px]'
                      : 'font-normal text-[20px] md:text-[28px] text-black group-hover:text-[#4262ff] leading-[31.5px]'
                    }`}
                  >
                    {sol.title}
                  </span>
                </button>

                {/* 콘텐츠 — grid-template-rows: 0fr ↔ 1fr */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isActive ? '1fr' : '0fr',
                    transition: 'grid-template-rows 350ms ease',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      className="flex flex-col gap-[20px] items-start px-[23px] pb-[28px] w-full lg:w-[487px]"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 300ms ease',
                      }}
                    >
                      {/* 설명 */}
                      <div className="flex flex-col font-pretendard font-normal text-[16px] text-[#444] leading-[1.4] w-full">
                        {sol.description.map((line, i) => (
                          <p key={i} className={i < sol.description.length - 1 ? 'mb-0' : ''}>{line}</p>
                        ))}
                      </div>

                      {/* 관련 제품 */}
                      {sol.relatedProduct && (
                        <div className="flex flex-col gap-[4px] items-start w-full">
                          <p className="font-pretendard font-bold text-[14px] text-[#040000] leading-[1.4]">관련 제품</p>
                          <Link to={sol.relatedProduct.href} className="flex items-end gap-[5px]">
                            <span className="font-pretendard font-normal text-[14px] text-[#4262ff] leading-[24px] border-b border-[#4262ff] whitespace-nowrap">
                              {sol.relatedProduct.name}
                            </span>
                            <span className="font-inter font-normal text-[18px] text-[#4262ff] leading-none">→</span>
                          </Link>
                        </div>
                      )}

                      {/* 프로젝트 사례 */}
                      {sol.projects.length > 0 && (
                        <div className="flex flex-col gap-[4px] items-start w-full">
                          <p className="font-pretendard font-bold text-[14px] text-[#040000] leading-[1.4]">프로젝트 사례</p>
                          <div className="flex flex-wrap items-start gap-[4px]">
                            {sol.projects.map((p, i) => (
                              <a
                                key={p}
                                href="#"
                                className={`font-pretendard font-medium text-[14px] text-[#444] leading-[1.2] py-[4px] ${
                                  i < sol.projects.length - 1
                                    ? 'border-r border-[rgba(4,0,0,0.15)] pr-[10px]'
                                    : 'pl-[10px]'
                                }`}
                              >
                                {p}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
