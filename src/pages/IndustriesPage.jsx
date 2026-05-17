import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';
import { asset } from '../utils/asset';

// ── 체크 아이콘 ────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className="shrink-0">
      <circle cx="12" cy="12.5" r="12" fill="#5871ed" fillOpacity="0.12"/>
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#5871ed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── 인터랙티브 원형 이미지 ─────────────────────────────────────────
function InteractiveCircle({ image, alt, markers }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] shrink-0 mx-auto lg:mx-0">
      {/* 원형 이미지 */}
      <div className="w-full h-full rounded-full overflow-hidden" style={{ boxShadow: '0px 4px 32px rgba(0,0,0,0.18)' }}>
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </div>

      {/* 스캔 라인 */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="scan-line" />
      </div>

      {/* 그리드 오버레이 */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(88,113,237,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(88,113,237,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* AI 마커들 */}
      {markers.map((m) => (
        <div
          key={m.id}
          className="absolute"
          style={{ top: m.top, left: m.left, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setHoveredId(m.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* 감지 박스 */}
          {m.box && (
            <div
              className="absolute border border-dashed pointer-events-none"
              style={{
                width: m.box.w,
                height: m.box.h,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderColor: m.color || '#5871ed',
                opacity: 0.85,
              }}
            >
              <span
                className="absolute -top-5 left-0 text-[9px] font-bold px-1 py-0.5 whitespace-nowrap"
                style={{ background: m.color || '#5871ed', color: '#fff' }}
              >
                {m.label}
              </span>
            </div>
          )}

          {/* 펄스 도트 */}
          <div className="relative cursor-pointer">
            <span className="absolute inline-flex rounded-full opacity-60 animate-ping"
              style={{ width: 20, height: 20, top: -10, left: -10, background: m.color || '#5871ed' }} />
            <span className="relative flex items-center justify-center w-5 h-5 rounded-full border-2 border-white"
              style={{ background: m.color || '#5871ed', boxShadow: `0 0 0 3px ${m.color || '#5871ed'}40` }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
          </div>

          {/* 툴팁 */}
          {hoveredId === m.id && (
            <div
              className="absolute z-20 bg-white rounded-xl px-3 py-2 shadow-xl border border-gray-100 whitespace-nowrap animate-fadeIn"
              style={{
                bottom: 28,
                left: '50%',
                transform: 'translateX(-50%)',
                minWidth: 130,
              }}
            >
              <p className="text-[11px] font-bold text-[#5871ed] mb-0.5">{m.label}</p>
              <p className="text-[11px] text-gray-600 leading-tight">{m.desc}</p>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45" />
            </div>
          )}
        </div>
      ))}

      {/* 우측 하단 AI 뱃지 */}
      <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5 bg-[#5871ed] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        AI 분석 중
      </div>
    </div>
  );
}

// ── 산업별 데이터 ──────────────────────────────────────────────────
const industries = [
  {
    id: 'urban',
    tabLabel: '도시변화 모니터링',
    title: '도시변화 모니터링',
    description: [
      '위성, 항공, 드론 데이터를 AI로 분석해 도시 변화를 실시간으로 탐지하고 관리합니다.',
      '도시계획·개발제한구역 관리, 불법건축·개발 감시, 수치지형도 고도화 등 행정 효율화에 활용됩니다.',
    ],
    circleImage: asset('assets/solution-city.jpg'),
    markers: [
      { id: 1, top: '30%', left: '38%', color: '#ef4444', label: '불법 건축 의심', desc: '신규 구조물 탐지 · 신뢰도 94%', box: { w: 52, h: 44 } },
      { id: 2, top: '55%', left: '62%', color: '#5871ed', label: '도로 변화 탐지', desc: '도로 신설 / 확장 감지', box: { w: 64, h: 28 } },
      { id: 3, top: '72%', left: '35%', color: '#f59e0b', label: '건물 변화', desc: '증축 탐지 · 면적 +128㎡', box: { w: 44, h: 40 } },
    ],
    cases: [
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
        caseImage: asset('assets/cityvision-service.png'),
      },
      {
        id: 'seoul-urban',
        label: '서울시 도시변화탐지',
        title: '서울시 도시변화탐지',
        subtitle: '서울시 전역 위성·항공 영상 기반 도시 변화 자동 탐지 서비스',
        features: [
          { title: '건물 변화 탐지', desc: '서울시 전역의 신축·증축·멸실 건물을 위성 영상으로 자동 탐지' },
          { title: '개발제한구역 감시', desc: '그린벨트 내 불법 개발 행위를 AI로 실시간 모니터링' },
          { title: '도로·인프라 변화', desc: '도로 신설·확장 및 도시 기반시설 변화를 자동으로 감지' },
          { title: '이력 관리', desc: '탐지된 변화 이력을 시계열로 관리하고 행정 보고서 자동 생성' },
        ],
        caseImage: asset('assets/seoul-change-detection.png'),
      },
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
    markers: [
      { id: 1, top: '35%', left: '40%', color: '#16a34a', label: '생산량예측', desc: '재배면적 2.4ha · 수확량 예측', box: { w: 60, h: 50 } },
      { id: 2, top: '60%', left: '65%', color: '#f59e0b', label: '휴경지 탐지', desc: '미경작 확인 · 직불금 제외', box: { w: 54, h: 42 } },
      { id: 3, top: '45%', left: '25%', color: '#5871ed', label: '작물탐지', desc: '고추 재배 추정 · 0.8ha', box: { w: 46, h: 38 } },
    ],
    cases: [
      {
        id: 'crop-management',
        label: '재배면적 관리 서비스',
        title: '재배면적 관리 서비스',
        subtitle: '드론·위성 영상 기반 농작물 재배면적 AI 자동 분석 및 관리 서비스',
        features: [
          { title: '작물 자동 탐지 및 분류', desc: '드론·위성 영상으로 월동무·감귤·양배추 등 작물 종류를 AI가 자동 식별' },
          { title: '재배면적 산출', desc: '필지별 작물 재배면적을 자동 계산하여 지역별 통계 데이터 제공' },
          { title: '생산량 예측', desc: 'AI 분석 기반 작물별 예측 생산량 및 검출면적·건수 정보 제공' },
          { title: '데이터 기반 행정 업무 지원', desc: '재배 현황 데이터를 직불금 지급·휴경지 관리 등 농업 행정에 연계' },
        ],
        caseImage: asset('assets/crop-management-service.png'),
      },
      {
        id: 'drone-mgmt',
        label: '드론영상관리 시스템',
        title: '드론영상관리 시스템',
        subtitle: '농업 드론 영상 데이터의 수집·저장·분석을 통합하는 관리 플랫폼',
        features: [
          { title: '드론 기체 운영 관리', desc: '등록된 드론 기체의 비행 이력, 상태, 스케줄을 통합 관리' },
          { title: '영상 데이터 업로드 및 전처리', desc: '업로드된 영상의 정합·보정·AI 분석을 자동화하여 데이터 품질 향상' },
          { title: '분석결과 시각화', desc: 'GIS 기반 지도에서 AI 분석 결과와 공간정보를 직관적으로 조회' },
          { title: '보고서 자동생성', desc: '분석 결과를 기반으로 행정용 보고서를 자동으로 생성' },
        ],
        caseImage: asset('assets/drone-mgmt-service.png'),
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
    markers: [
      { id: 1, top: '32%', left: '55%', color: '#ef4444', label: '산림 훼손 탐지', desc: '훼손 면적 0.6ha · 신규 감지', box: { w: 56, h: 48 } },
      { id: 2, top: '62%', left: '38%', color: '#f59e0b', label: '해양쓰레기 탐지', desc: '해안선 쓰레기 분포 감지', box: { w: 56, h: 44 } },
      { id: 3, top: '48%', left: '70%', color: '#06b6d4', label: '해안선 변화', desc: '침식 2.1m 후퇴 감지', box: { w: 44, h: 36 } },
    ],
    cases: [
      {
        id: 'forest',
        label: '불법 산림훼손 관리 서비스',
        title: '불법 산림훼손 관리 서비스',
        subtitle: '위성·드론 영상 기반 산림 변화 탐지 및 훼손지 관리 서비스',
        features: [
          { title: '산림 훼손 자동 탐지', desc: '다시기 영상 분석으로 산림 훼손 지역을 자동으로 감지' },
          { title: '복구지 관리', desc: '훼손 지역의 복구 진행 현황을 주기적으로 모니터링' },
          { title: '불법 훼손 감시', desc: '항공·위성 영상 분석으로 불법 산림 훼손 모니터링' },
          { title: '변화 이력 관리', desc: '산림 변화 이력을 체계적으로 기록하고 리포트 자동 생성' },
        ],
        caseImage: asset('assets/forest-aerial.png'),
      },
      {
        id: 'ocean',
        label: '해양쓰레기 관리 서비스',
        title: '해양쓰레기 관리 서비스',
        subtitle: '위성·드론 영상 기반 해양환경 변화 탐지 및 해양 쓰레기 관리 서비스',
        features: [
          { title: '해양 쓰레기 탐지', desc: '드론 영상으로 해안선 및 해양 쓰레기 분포를 자동 탐지' },
          { title: '해안선 퇴적물 및 쓰레기 모니터링', desc: '시기별 위성영상으로 해안선 퇴적물 및 쓰레기 분포 변화를 모니터링' },
          { title: '탐지 이력 관리', desc: '쓰레기 탐지 이력 데이터베이스 구축 및 통계 제공' },
          { title: '현장 업무 지원', desc: '수거 및 관리 업무에 지원할 수 있는 데이터 제공' },
        ],
        caseImage: asset('assets/ocean-waste-service.png'),
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
    markers: [
      { id: 1, top: '38%', left: '45%', color: '#ef4444', label: '균열 탐지 (D등급)', desc: '폭 0.8mm · 즉시 보수 필요', box: { w: 50, h: 30 } },
      { id: 2, top: '58%', left: '30%', color: '#f59e0b', label: '손상 탐지 (C등급)', desc: '박리 면적 0.12㎡ 감지', box: { w: 46, h: 36 } },
      { id: 3, top: '30%', left: '65%', color: '#5871ed', label: '정상 구간', desc: '이상 없음 · A등급', box: { w: 42, h: 32 } },
    ],
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
        caseImage: asset('assets/crackeye-service.png'),
      },
      {
        id: 'totalcare',
        label: '정사영상생성 솔루션',
        title: '정사영상생성 솔루션',
        subtitle: '드론 영상 업로드부터 정사영상 생성까지 자동화된 3D 공간정보 처리 솔루션',
        features: [
          { title: '이미지 점검 (Tie Points)', desc: '드론 촬영 영상을 업로드하면 AI가 특징점(Tie Points)을 자동 추출하고 정확도를 검증' },
          { title: '포인트 클라우드 생성', desc: '검증된 영상으로부터 3D 포인트 클라우드를 자동 생성하여 공간 구조 정보 구축' },
          { title: '3D 모델 생성', desc: '포인트 클라우드 기반으로 교량·터널 등 시설물의 고정밀 3D 메시 모델 자동 생성' },
          { title: '정사영상 생성', desc: '3D 모델을 기반으로 왜곡 보정된 정사영상을 자동 생성하여 GIS 활용 가능 형태로 제공' },
        ],
        caseImage: asset('assets/ortho-3d-model.png'),
      },
    ],
  },
];

// ── 메인 페이지 ────────────────────────────────────────────────────
export default function IndustriesPage() {
  const [activeIndustryId, setActiveIndustryId] = useState(industries[0].id);
  const [activeCaseId, setActiveCaseId] = useState(industries[0].cases[0].id);

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
          {/* 배경 이미지 */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              alt=""
              className="absolute w-full h-full object-cover object-center blur-[5px] scale-110"
              src={asset('assets/industries-hero-main.jpg')}
            />
            <div className="absolute inset-0" style={{ background: 'rgba(41,42,105,0.6)' }} />
          </div>

          {/* 텍스트 */}
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
        <div className="w-full px-4 md:px-[88px] py-[28px] flex justify-center">
          <div className="flex w-full max-w-[1264px]">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => handleIndustryChange(ind.id)}
                className={`flex-1 py-[22px] md:py-[30px] text-[16px] md:text-[22px] font-pretendard text-center transition-colors ${
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

        {/* 콘텐츠 */}
        {activeIndustry && (
          <div className="w-full px-4 md:px-[88px] pt-[80px] pb-[120px] flex flex-col gap-[80px] items-center">
            <div className="w-full max-w-[1264px] flex flex-col gap-[80px]">

              {/* 산업 개요: 타이틀+설명(좌) + 인터랙티브 원형 이미지(우) */}
              <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-0">
                <div className="flex flex-col gap-[80px] lg:w-[640px]">
                  <h2 className="font-pretendard font-black text-[36px] md:text-[48px] text-[#3a343b] tracking-[-1.2px] leading-[48px]">
                    {activeIndustry.title}
                  </h2>
                  <div className="flex flex-col gap-[20px]">
                    {activeIndustry.description.map((p, i) => (
                      <p key={i} className="font-pretendard text-[20px] md:text-[28px] text-[#161c2d] leading-[48px] tracking-[-1.2px]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
                <InteractiveCircle
                  image={activeIndustry.circleImage}
                  alt={activeIndustry.title}
                  markers={activeIndustry.markers}
                />
              </div>

              {/* 실제 도입 사례 */}
              <div className="flex flex-col gap-[40px]">
                <h3 className="font-pretendard font-medium text-[36px] md:text-[48px] text-[#3a343b] tracking-[-1.2px] leading-[48px]">
                  실제 도입 사례
                </h3>

                {/* 프로젝트 필터 탭 */}
                <div className="flex flex-wrap gap-2">
                  {activeIndustry.cases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCaseId(c.id)}
                      className={`px-[24px] md:px-[36px] py-[12px] md:py-[16px] rounded-full text-[14px] md:text-[18px] font-pretendard transition-colors ${
                        activeCaseId === c.id
                          ? 'bg-[#f1f3fd] border border-[#5871ed] text-[#161c2d] font-bold'
                          : 'bg-white border border-[#d4d4d4] text-[#3a343b] font-semibold hover:border-[#5871ed]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* 도입사례 상세 */}
                {activeCase && (
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-[40px] animate-fadeIn">
                    <div className="flex flex-col gap-[30px] lg:flex-1 min-w-0">
                      <div className="flex flex-col gap-1">
                        <h4 className="font-pretendard font-bold text-[24px] md:text-[32px] text-black tracking-[-2px] leading-[65px]">
                          {activeCase.title}
                        </h4>
                        <p className="font-pretendard font-medium text-[14px] md:text-[16px] text-[#444] leading-[1.4]">
                          {activeCase.subtitle}
                        </p>
                      </div>
                      <div className="flex flex-col gap-[20px] md:gap-[26px]">
                        {activeCase.features.map((f, i) => (
                          <div key={i} className="flex gap-[14px] items-start">
                            <CheckIcon />
                            <div className="flex flex-col">
                              <p className="font-pretendard text-[16px] md:text-[18px] font-bold text-[#050038] leading-[24px]">
                                {f.title}
                              </p>
                              <p className="font-pretendard text-[14px] md:text-[16px] text-[#050038] leading-[24px]">
                                {f.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`w-full lg:w-[580px] xl:w-[613px] h-[240px] md:h-[380px] lg:h-[447px] rounded-xl shrink-0 ${['crackeye','cityvision','totalcare'].includes(activeCase.id) ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'}`}
                      style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.15)' }}
                    >
                      <img
                        src={activeCase.caseImage}
                        alt={activeCase.title}
                        className={['crackeye','cityvision','totalcare'].includes(activeCase.id) ? 'h-full w-auto max-w-none' : 'w-full h-full object-cover object-left-top'}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
