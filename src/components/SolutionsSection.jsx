// Figma node: 159:2246 (Solutions) + 176:3308 (농업 분석 state)
// All spacing/padding/border values taken directly from Figma
import { useState } from "react";
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
      "홍수·산불·지진 등 자연재해 발생 전후의 위성·드론 영상을 AI로 분석해 피해 범위와 규모를 신속하게 파악합니다.",
      "재난 대응 기관에 실시간 공간정보를 제공하고, 복구 우선순위 선정 및 자원 배분 의사결정을 지원합니다.",
    ],
    relatedProduct: null,
    projects: ["재난 피해지역 긴급 공간분석 시스템", "AI 기반 산불 확산 예측 플랫폼"],
  },
];

export default function SolutionsSection() {
  const [active, setActive] = useState(0);

  return (
    // Figma: px-88 py-100 gap-120
    <section id="solutions" className="bg-white flex flex-col gap-[60px] lg:gap-[120px] items-center px-4 md:px-[88px] py-[60px] lg:py-[100px]">

      {/* Heading */}
      <div className="flex flex-col items-center gap-[9px] w-full max-w-[880px]">
        <SectionLabel text="Solutions" />
        <h2
          className="font-space font-light text-[28px] md:text-[40px] text-black text-center leading-[1.3] md:leading-[48px] w-full"
        >
          <span>산업별 문제를 </span>
          <strong className="font-bold">AI로 해결합니다.</strong>
        </h2>
      </div>

      {/* Content — mobile: flex-col, desktop: flex-row */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[80px] items-start lg:items-center w-full max-w-[1264px]">

        {/* Image — full width on mobile, fixed on desktop */}
        <div className="w-full h-[300px] md:h-[400px] lg:w-[600px] lg:h-[600px] shrink-0 overflow-hidden rounded-none">
          <img
            key={active}
            src={solutions[active].image}
            alt={solutions[active].title}
            className="w-full h-full object-cover transition-opacity duration-400"
          />
        </div>

        {/* List */}
        <ul className="flex flex-col gap-[20px] items-start flex-1 min-w-0 min-h-[400px] lg:h-[600px] overflow-hidden w-full">
          {solutions.map((sol) => {
            const isActive = sol.id === active;
            return (
              <li
                key={sol.id}
                className={`border-b border-[#e9e9e9] w-full shrink-0 ${
                  isActive ? "" : "h-[42.5px] relative"
                }`}
              >
                {isActive ? (
                  /* ── ACTIVE STATE ── */
                  <div className="flex flex-col gap-[28px] items-center py-[30px]">

                    {/* Title row */}
                    <div className="relative flex items-start w-full pl-[39px]">
                      <img
                        src={asset('assets/arrow-right02.svg')}
                        alt=""
                        aria-hidden="true"
                        className="absolute"
                        style={{ width: "29px", height: "19px", left: "0px", top: "7px" }}
                      />
                      <span className="font-space font-bold text-[22px] md:text-[30px] text-black tracking-[0.5px] uppercase leading-[31.5px] whitespace-nowrap">
                        {sol.title}
                      </span>
                    </div>

                    {/* Content div */}
                    <div className="flex flex-col gap-[20px] items-start px-[23px] w-full lg:w-[487px]">

                      {/* Description */}
                      <div className="flex flex-col font-pretendard font-normal text-[16px] text-[#444] leading-[1.4] w-full">
                        {sol.description.map((line, i) => (
                          <p key={i} className={i < sol.description.length - 1 ? "mb-0" : ""}>
                            {line}
                          </p>
                        ))}
                      </div>

                      {/* 관련 제품 */}
                      {sol.relatedProduct && (
                        <div className="flex flex-col gap-[4px] items-start w-full">
                          <p className="font-pretendard font-bold text-[14px] text-[#040000] leading-[1.4]">
                            관련 제품
                          </p>
                          <a href={sol.relatedProduct.href} className="flex items-end gap-[5px]">
                            <span className="font-pretendard font-normal text-[14px] text-[#4262ff] leading-[24px] border-b border-[#4262ff] whitespace-nowrap">
                              {sol.relatedProduct.name}
                            </span>
                            <span className="font-inter font-normal text-[18px] text-[#4262ff] leading-none">
                              →
                            </span>
                          </a>
                        </div>
                      )}

                      {/* 프로젝트 사례 */}
                      {sol.projects.length > 0 && (
                        <div className="flex flex-col gap-[4px] items-start w-full">
                          <p className="font-pretendard font-bold text-[14px] text-[#040000] leading-[1.4]">
                            프로젝트 사례
                          </p>
                          <div className="flex flex-wrap items-start gap-[4px]">
                            {sol.projects.map((p, i) => (
                              <a
                                key={p}
                                href="#"
                                className={`font-pretendard font-medium text-[14px] text-[#444] leading-[1.2] py-[4px] ${
                                  i < sol.projects.length - 1
                                    ? "border-r border-[rgba(4,0,0,0.15)] pr-[10px]"
                                    : "pl-[10px]"
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
                ) : (
                  /* ── INACTIVE STATE ── */
                  <button
                    className="absolute inset-0 w-full text-left group"
                    onClick={() => setActive(sol.id)}
                    aria-expanded={false}
                  >
                    <span
                      className="absolute top-1/2 -translate-y-1/2 left-0 font-space font-normal text-[20px] md:text-[29px] text-black tracking-[0.5px] uppercase leading-[31.5px] group-hover:text-[#4262ff] transition-colors duration-200"
                    >
                      {sol.title}
                    </span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
