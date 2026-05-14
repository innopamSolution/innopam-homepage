import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';
import { asset } from '../utils/asset';

// ── 아이콘 ─────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className="shrink-0">
      <circle cx="12" cy="12.5" r="12" fill="#5871ed" fillOpacity="0.12"/>
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#5871ed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── 데이터 ─────────────────────────────────────────────────────────
const industries = [
  {
    id: 'urban',
    tabLabel: '도시변화 모니터링',
    title: '도시변화 모니터링',
    description: [
      '위성, 항공, 드론 데이터를 AI로 분석해 도시 변화를 실시간으로 탐지하고 관리합니다.',
      '도시계획·개발제한구역 관리, 불법건축·개발 감시, 수치지형도 고도화 등 행정 효율화에 활용됩니다.',
    ],
    circleImage: asset('assets/industries-city-circle.jpg'),
    cases: [
      {
        id: 'geoai',
        label: 'GEO-AI 영상분석 서비스',
        title: 'GEO-AI 영상분석 서비스',
        subtitle: '멀티센서(위성, 항공, 드론)영상 기반의 GeoAI 분석 플랫폼 서비스',
        features: [
          { title: '데이터 수집 · 관리', desc: '위성, 드론, 항공 영상 데이터를 한 곳에 모아 쉽게 저장하고 관리' },
          { title: 'GEO-AI 모델 개발', desc: '모델 앙상블 적용을 통한 AI모델 객체 탐지 정확도 제고' },
          { title: 'One-Stop AI 서비스', desc: '학습데이터 수집, 전처리, 구축, 관리를 위한 One-Stop 서비스' },
          { title: '모델 학습 갱신', desc: '플랫폼에서 구축된 학습데이터를 이용해 직접 모델 학습 갱신' },
        ],
        caseImage: asset('assets/industries-case-screen.jpg'),
      },
      {
        id: 'cityvision',
        label: 'GeoX CityVision',
        title: 'GeoX CityVision',
        subtitle: '드론·항공 영상 기반 도시 변화 탐지 및 3D 도시 모델링 서비스',
        features: [
          { title: '변화 자동 탐지', desc: '다시기 영상 비교를 통해 건물·도로 등 도시 구조물 변화를 자동으로 감지' },
          { title: '3D 도시 모델', desc: '항공·드론 영상으로부터 고정밀 3D 도시 모델을 자동 생성' },
          { title: '행정 연계', desc: '지자체 공간정보시스템과 연동하여 변화 이력을 자동 반영' },
          { title: '이상 감지 알림', desc: '불법 건축·개발 등 이상 변화 발생 시 실시간 알림 제공' },
        ],
        caseImage: asset('assets/solution-city.jpg'),
      },
    ],
  },
  {
    id: 'agriculture',
    tabLabel: '농업분석',
    title: '농업 분석',
    description: [
      '드론으로 촬영한 영상을 AI가 분석하여 농작물의 종류를 자동으로 식별하고 작물의 재배면적을 산출합니다.',
      '분석된 데이터를 기반으로 직불금 관리, 휴경지 관리, 통계 관리 등 농업 행정 전반에 활용됩니다.',
    ],
    circleImage: asset('assets/solution-farm.jpg'),
    cases: [
      {
        id: 'geoai-farm',
        label: 'GEO-AI 영상분석 서비스',
        title: 'GEO-AI 영상분석 서비스 (농업)',
        subtitle: '드론 영상 기반 농작물 분류 및 재배면적 자동 산출 서비스',
        features: [
          { title: '작물 자동 분류', desc: '드론 영상에서 AI가 농작물 종류를 자동으로 식별하여 분류' },
          { title: '재배면적 산출', desc: '필지별 작물 재배면적을 자동으로 계산하여 통계 데이터 제공' },
          { title: '직불금 관리 연계', desc: '작물 재배 현황 데이터를 직불금 지급 시스템과 연계' },
          { title: '이상지 탐지', desc: '휴경지, 불법 경작지 등을 AI로 자동 탐지하여 행정 효율화' },
        ],
        caseImage: asset('assets/solution-farm.jpg'),
      },
      {
        id: 'drone-mgmt',
        label: '드론영상관리 시스템',
        title: '드론영상관리 시스템',
        subtitle: '농업 드론 영상 데이터의 수집·저장·분석을 통합하는 관리 플랫폼',
        features: [
          { title: '영상 데이터 수집', desc: '다양한 드론 기종의 영상 데이터를 표준화하여 통합 관리' },
          { title: '자동 전처리', desc: '수집된 영상의 정합·보정 등 전처리 과정을 자동화' },
          { title: '분석 결과 시각화', desc: 'GIS 기반 지도 위에 분석 결과를 직관적으로 시각화' },
          { title: '보고서 자동 생성', desc: '분석 결과를 기반으로 행정용 보고서를 자동으로 생성' },
        ],
        caseImage: asset('assets/solution-farm.jpg'),
      },
    ],
  },
  {
    id: 'environment',
    tabLabel: '산림, 해양',
    title: '산림 · 해양',
    description: [
      '위성, 항공, 드론 영상을 AI가 분석하여 산림 훼손 지역을 자동으로 탐지하고 변화 현황을 지속적으로 모니터링합니다.',
      '불법 산림 훼손 감시, 복구지 관리, 해양 쓰레기 탐지 등 환경 행정 전반에 활용됩니다.',
    ],
    circleImage: asset('assets/solution-eco.jpg'),
    cases: [
      {
        id: 'forest',
        label: '산림 모니터링 서비스',
        title: '산림 모니터링 서비스',
        subtitle: '위성·드론 영상 기반 산림 변화 탐지 및 훼손지 관리 서비스',
        features: [
          { title: '산림 훼손 자동 탐지', desc: '다시기 영상 분석으로 산림 훼손 지역을 자동으로 감지' },
          { title: '복구지 관리', desc: '훼손 지역의 복구 진행 현황을 주기적으로 모니터링' },
          { title: '불법 벌채 감시', desc: '항공·위성 영상 분석으로 불법 산림 훼손 행위를 실시간 감시' },
          { title: '변화 이력 관리', desc: '산림 변화 이력을 체계적으로 기록하고 리포트 자동 생성' },
        ],
        caseImage: asset('assets/solution-eco.jpg'),
      },
      {
        id: 'ocean',
        label: '해양 모니터링 서비스',
        title: '해양 모니터링 서비스',
        subtitle: '위성·드론 영상 기반 해양환경 변화 탐지 및 해양 쓰레기 관리 서비스',
        features: [
          { title: '해양 쓰레기 탐지', desc: '드론 영상으로 해안선 및 해양 쓰레기 분포를 자동 탐지' },
          { title: '해안선 변화 분석', desc: '다시기 위성영상으로 해안선 침식·퇴적 변화를 모니터링' },
          { title: '수질 모니터링', desc: '위성 분광 데이터 분석으로 수질 변화를 원격 탐지' },
          { title: '환경 이력 관리', desc: '해양환경 변화 이력 데이터베이스 구축 및 통계 제공' },
        ],
        caseImage: asset('assets/solution-eco.jpg'),
      },
    ],
  },
  {
    id: 'safety',
    tabLabel: '재난 안전',
    title: '재난 · 안전',
    description: [
      '시설물 영상 데이터를 AI가 분석해 균열, 파손 등 손상 상태를 자동으로 탐지합니다.',
      '분석 결과를 기반으로 외관조사망도를 자동 생성하고 시설물 안전 점검·유지보수 계획 수립에 활용됩니다.',
    ],
    circleImage: asset('assets/solution-disaster.jpg'),
    cases: [
      {
        id: 'crackeye',
        label: 'CrackEye X',
        title: 'CrackEye X',
        subtitle: 'AI 기반 시설물 균열·손상 자동 탐지 및 안전점검 관리 서비스',
        features: [
          { title: '균열 자동 탐지', desc: '영상 데이터에서 AI가 균열·박리·파손 등 손상을 자동으로 식별' },
          { title: '외관조사망도 생성', desc: '점검 결과를 기반으로 외관조사망도를 자동으로 생성' },
          { title: '안전 등급 산정', desc: 'AI 분석 결과를 기반으로 시설물 안전 등급을 자동 산정' },
          { title: '이력 관리', desc: '시설물별 점검 이력 데이터베이스 구축 및 유지보수 계획 지원' },
        ],
        caseImage: asset('assets/solution-disaster.jpg'),
      },
      {
        id: 'totalcare',
        label: 'TotalCare 기술개발',
        title: '기반시설 첨단관리 (TotalCare)',
        subtitle: '기반시설 안전점검 전 과정을 디지털화하는 스마트 유지관리 시스템',
        features: [
          { title: '디지털 점검', desc: '현장 점검 결과를 모바일로 실시간 입력하고 자동 분석' },
          { title: 'IoT 센서 연동', desc: '진동·변위 센서 데이터와 영상 분석 결과를 통합 관리' },
          { title: '위험도 예측', desc: '축적된 이력 데이터 기반 AI 모델로 시설물 위험도 예측' },
          { title: '행정 보고 자동화', desc: '안전점검 결과 보고서 및 유지보수 계획서를 자동 생성' },
        ],
        caseImage: asset('assets/solution-disaster.jpg'),
      },
    ],
  },
];

// ── 메인 컴포넌트 ──────────────────────────────────────────────────
export default function IndustriesPage() {
  const [activeIndustryId, setActiveIndustryId] = useState('urban');
  const [activeCaseId, setActiveCaseId] = useState('geoai');

  const activeIndustry = industries.find(i => i.id === activeIndustryId);
  const activeCase = activeIndustry?.cases.find(c => c.id === activeCaseId);

  const handleIndustryChange = (id) => {
    setActiveIndustryId(id);
    const ind = industries.find(i => i.id === id);
    if (ind) setActiveCaseId(ind.cases[0].id);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="pt-[84px]">

        {/* 히어로 */}
        <div className="relative w-full h-[400px] overflow-hidden">
          <img
            src={asset('assets/industries-hero-bg.jpg')}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-[5px]"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(41,42,105,0.6)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[38px] px-4">
            <SectionLabel text="Industries" light />
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="font-pretendard font-bold text-[40px] md:text-[48px] text-white tracking-[-2px] leading-[1.35]">
                GEO AI 산업 분야
              </h1>
              <p className="font-pretendard text-[18px] md:text-[20px] text-white leading-[1.4]">
                산업별 문제를 AI로 해결합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 탭 내비게이션 */}
        <div className="w-full px-[88px] py-[28px] flex justify-center border-b border-[#e9e9e9]">
          <div className="flex w-full max-w-[1264px]">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => handleIndustryChange(ind.id)}
                className={`flex-1 py-[30px] text-[22px] font-pretendard text-center transition-colors ${
                  activeIndustryId === ind.id
                    ? 'bg-[#5871ed] text-white'
                    : 'bg-white text-[#161c2d] border border-[#e9e9e9] hover:bg-gray-50'
                }`}
              >
                {ind.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        {activeIndustry && (
          <div className="w-full px-4 md:px-[88px] py-[80px] md:py-[120px] flex flex-col gap-[60px] md:gap-[80px] items-center">
            <div className="w-full max-w-[1264px] flex flex-col gap-[60px] md:gap-[80px]">

              {/* 산업 개요: 제목+설명(좌) + 원형이미지(우) */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-0">
                <div className="flex flex-col gap-[40px] lg:w-[640px]">
                  <h2 className="font-pretendard font-black text-[36px] md:text-[48px] text-[#3a343b] tracking-[-1.2px] leading-tight">
                    {activeIndustry.title}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {activeIndustry.description.map((p, i) => (
                      <p key={i} className="font-pretendard text-[18px] md:text-[22px] text-[#161c2d] leading-[1.7] tracking-[-0.5px]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
                <div
                  className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden shrink-0 mx-auto lg:mx-0"
                  style={{ boxShadow: '0px 4px 32px rgba(0,0,0,0.15)' }}
                >
                  <img
                    src={activeIndustry.circleImage}
                    alt={activeIndustry.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 프로젝트 필터 탭 */}
              <div className="flex flex-wrap gap-2 md:gap-[8px]">
                {activeIndustry.cases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCaseId(c.id)}
                    className={`px-[28px] md:px-[36px] py-[14px] md:py-[16px] rounded-full text-[15px] md:text-[18px] font-pretendard transition-colors ${
                      activeCaseId === c.id
                        ? 'bg-[#f1f3fd] border border-[#5871ed] text-[#161c2d] font-bold'
                        : 'bg-white border border-[#d4d4d4] text-[#3a343b] font-semibold hover:border-[#5871ed]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* 도입사례 상세: 피처리스트(좌) + 스크린샷(우) */}
              {activeCase && (
                <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-[60px] animate-fadeIn">
                  {/* 좌: 텍스트 */}
                  <div className="flex flex-col gap-[26px] lg:flex-1 min-w-0">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-pretendard font-bold text-[26px] md:text-[32px] text-black tracking-[-2px] leading-[1.5]">
                        {activeCase.title}
                      </h3>
                      <p className="font-pretendard font-medium text-[15px] md:text-[16px] text-[#444] leading-[1.4]">
                        {activeCase.subtitle}
                      </p>
                    </div>
                    <div className="flex flex-col gap-[20px] md:gap-[26px]">
                      {activeCase.features.map((f, i) => (
                        <div key={i} className="flex gap-[14px] items-start">
                          <CheckIcon />
                          <div className="flex flex-col gap-[2px]">
                            <p className="font-pretendard text-[16px] md:text-[18px] font-bold text-[#050038] leading-[1.5]">
                              {f.title}
                            </p>
                            <p className="font-pretendard text-[14px] md:text-[16px] text-[#050038] leading-[1.5]">
                              {f.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 우: 스크린샷 */}
                  <div
                    className="w-full lg:w-[580px] xl:w-[613px] h-[280px] md:h-[380px] lg:h-[447px] rounded-xl overflow-hidden shrink-0"
                    style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.15)' }}
                  >
                    <img
                      src={activeCase.caseImage}
                      alt={activeCase.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
