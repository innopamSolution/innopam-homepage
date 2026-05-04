// Figma node: 180:3372 (Project section — carousel)
import { useState } from "react";
import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';

const imgProjectMain = asset('assets/project-main.jpg');

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
    image: imgProjectMain,
  },
];

export default function ProjectSection() {
  const [current, setCurrent] = useState(0);
  const project = projects[current] ?? projects[0];

  return (
    <section className="bg-white flex flex-col gap-[60px] lg:gap-[120px] items-center px-4 md:px-[88px] py-[60px] lg:py-[100px]">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-[803px]">
        <SectionLabel text="Project" />
        <h2 className="section-title mt-4 mb-3">실제 도입 사례</h2>
        <p className="font-pretendard text-[16px] text-[#444] leading-[1.4]">
          공공기관 및 지자체와 함께 진행한 GeoAI 기반 주요 프로젝트 사례입니다.
        </p>
      </div>

      {/* Carousel */}
      <div className="flex items-center gap-4 lg:gap-12 w-full max-w-[1264px]">
        {/* Prev button — hidden on mobile */}
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          className="hidden md:flex shrink-0 w-[34px] h-[34px] rounded-[6px] bg-[#6d758f] items-center justify-center text-white hover:bg-[#4262ff] transition-colors"
          aria-label="이전"
        >
          ←
        </button>

        {/* Card — stack on mobile, row on desktop */}
        <div className="flex flex-col lg:flex-row flex-1 items-start lg:items-center justify-between gap-8">
          {/* Text */}
          <div className="flex flex-col gap-[26px] flex-1 w-full">
            <div>
              <h3 className="font-pretendard font-bold text-[24px] md:text-[32px] text-black tracking-[-2px] leading-[1.3] md:leading-[65px]">
                {project.title}
              </h3>
              <p className="font-pretendard font-medium text-[16px] text-[#444] leading-[1.4]">
                {project.subtitle}
              </p>
            </div>

            {/* Feature list */}
            <ul className="flex flex-col gap-[26px]">
              {project.features.map((f) => (
                <li key={f.title} className="flex items-center gap-[14px] pb-px">
                  <div className="shrink-0 overflow-hidden" style={{ width: "24px", height: "25px" }}>
                    <img
                      src={asset('assets/check-icon.svg')}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="font-pretendard font-normal text-[#050038] leading-[0]">
                    <p className="text-[18px] leading-[24px] mb-0">{f.title}</p>
                    <p className="text-[16px] leading-[24px]">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* 자세히 보기 */}
            <div className="flex items-end gap-[5px] pl-[40px]">
              <span
                className="relative border-b border-[#4262ff]"
                style={{ width: "65px", height: "23px" }}
              >
                <span className="absolute top-1/2 -translate-y-1/2 left-0 font-pretendard font-normal text-[14px] text-[#4262ff] leading-[24px] whitespace-nowrap">
                  자세히 보기
                </span>
              </span>
              <span className="font-inter font-normal text-[18px] text-[#4262ff] leading-none">
                →
              </span>
            </div>
          </div>

          {/* Image — full width on mobile, fixed on desktop */}
          <div
            className="w-full h-auto lg:shrink-0 overflow-hidden rounded-[12px] relative"
            style={{ maxWidth: '613px', boxShadow: "0px 4px 4px rgba(0,0,0,0.15)" }}
          >
            <div className="relative" style={{ paddingBottom: '72.9%' }}>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Next button — hidden on mobile */}
        <button
          onClick={() => setCurrent((c) => Math.min(projects.length - 1, c + 1))}
          className="hidden md:flex shrink-0 w-[34px] h-[34px] rounded-[6px] bg-[#f8faff] border border-[#e1e4ed] items-center justify-center text-[#6d758f] hover:bg-[#4262ff] hover:text-white hover:border-[#4262ff] transition-colors"
          aria-label="다음"
        >
          →
        </button>
      </div>

      {/* Mobile prev/next buttons */}
      <div className="flex md:hidden gap-4 items-center">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          className="w-[34px] h-[34px] rounded-[6px] bg-[#6d758f] flex items-center justify-center text-white hover:bg-[#4262ff] transition-colors"
          aria-label="이전"
        >
          ←
        </button>
        <button
          onClick={() => setCurrent((c) => Math.min(projects.length - 1, c + 1))}
          className="w-[34px] h-[34px] rounded-[6px] bg-[#f8faff] border border-[#e1e4ed] flex items-center justify-center text-[#6d758f] hover:bg-[#4262ff] hover:text-white hover:border-[#4262ff] transition-colors"
          aria-label="다음"
        >
          →
        </button>
      </div>
    </section>
  );
}
