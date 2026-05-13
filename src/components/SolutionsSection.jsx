// Figma node: 159:2246 (Solutions) + 176:3308 (농업 분석 state)
// All spacing/padding/border values taken directly from Figma
import { useState, useEffect, useRef } from "react";
import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';

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
    relatedProduct: { name: "GeoX CityVision", href: "#products" },
    projects: ["고정밀 전자지도 구축 챌린지 사업", "AI 기반 품질검증 지원 시스템 개발"],
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
    relatedProduct: { name: "CrackEye X", href: "#products" },
    projects: ["기반시설 첨단관리(TotalCare) 기술개발", "고정밀 전자지도 구축 챌린지 사업"],
  },
];

export default function SolutionsSection() {
  const [active, setActive] = useState(0);
  const hoveredRef = useRef(null); // 현재 호버 중인 탭 id (null이면 자동 순환)
  const timerRef = useRef(null);

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
      <div className="flex flex-col items-center gap-[9px] w-full max-w-[880px]">
        <SectionLabel text="Solutions" />
        <h2 className="font-space font-light text-[28px] md:text-[40px] text-black text-center leading-[1.3] md:leading-[48px] w-full">
          <span>산업별 문제를 </span>
          <strong className="font-bold">AI로 해결합니다.</strong>
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[80px] items-start lg:items-center w-full max-w-[1264px]">

        {/* 이미지 */}
        <div className="w-full h-[300px] md:h-[400px] lg:w-[600px] lg:h-[600px] shrink-0 overflow-hidden">
          <img
            src={solutions[active].image}
            alt={solutions[active].title}
            className="w-full h-full object-cover object-left-top"
            style={{ transition: 'opacity 300ms ease' }}
          />
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
                      transition: 'opacity 120ms ease, transform 120ms ease',
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

                {/* 콘텐츠 — grid-template-rows + opacity (GPU 가속) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isActive ? '1fr' : '0fr',
                    transition: 'grid-template-rows 180ms cubic-bezier(0.4,0,0.2,1)',
                    willChange: 'grid-template-rows',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      className="flex flex-col gap-[20px] items-start px-[23px] pb-[28px] w-full lg:w-[487px]"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(-6px)',
                        transition: 'opacity 150ms ease, transform 150ms ease',
                        willChange: 'opacity, transform',
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
                          <a href={sol.relatedProduct.href} className="flex items-end gap-[5px]">
                            <span className="font-pretendard font-normal text-[14px] text-[#4262ff] leading-[24px] border-b border-[#4262ff] whitespace-nowrap">
                              {sol.relatedProduct.name}
                            </span>
                            <span className="font-inter font-normal text-[18px] text-[#4262ff] leading-none">→</span>
                          </a>
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
