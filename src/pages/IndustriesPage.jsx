import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asset } from '../utils/asset';

// ── 산업별 데이터 ──────────────────────────────────────────────────
const industries = [
  {
    id: 'urban',
    title: '도시변화 모니터링',
    subtitle: 'Urban Monitoring',
    image: asset('assets/solution-city.jpg'),
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M4 30h28M8 30V16l10-8 10 8v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="14" y="22" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 16h2M22 16h2M12 20h2M22 20h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    description: '위성·항공·드론 데이터를 AI로 분석해 도시 변화를 실시간으로 탐지하고 관리합니다. 도시계획, 개발제한구역 관리, 불법 건축 감시 등 행정 효율화에 활용됩니다.',
    tags: ['도시계획', '불법건축 감시', '수치지형도', '개발제한구역'],
    relatedProduct: { name: 'GeoX CityVision', href: '/products' },
    cases: [
      {
        title: '고정밀 전자지도 구축 챌린지 사업',
        client: '국토지리정보원',
        desc: 'AI 기반 위성·항공 영상 분석으로 전국 전자지도를 자동 갱신하여 지도 제작 비용과 시간을 대폭 절감했습니다.',
        result: '지도 갱신 주기 50% 단축 · 정확도 98%+',
      },
      {
        title: 'AI 기반 품질검증 지원 시스템 개발',
        client: '서울특별시',
        desc: 'GeoAI 모델로 도로·건물 변화를 자동 감지하여 수치지형도 품질검증 업무를 자동화했습니다.',
        result: '검수 시간 60% 단축 · 행정 효율화',
      },
    ],
  },
  {
    id: 'agriculture',
    title: '농업 분석',
    subtitle: 'Agriculture',
    image: asset('assets/solution-farm.jpg'),
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M6 28c0-8 6-14 12-16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 12c0 6 4 12 10 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 12c0 6-4 12-10 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="18" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <line x1="6" y1="28" x2="30" y2="28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    description: '드론 영상을 AI가 분석하여 농작물 종류를 자동 식별하고 재배면적을 산출합니다. 직불금 관리·휴경지 관리·농업 통계 등 농업 행정 전반에 활용됩니다.',
    tags: ['작물 분류', '재배면적 산출', '직불금 관리', '휴경지 감지'],
    relatedProduct: null,
    cases: [
      {
        title: 'GeoAI 영상분석 서비스',
        client: '농림축산식품부',
        desc: '드론 영상 기반 AI 분석으로 논·밭 농작물 종류와 재배 면적을 자동 산출하여 정책 수립에 활용했습니다.',
        result: '작물 분류 정확도 95%+ · 직불금 부정수급 방지',
      },
      {
        title: '드론영상관리 시스템',
        client: '지자체',
        desc: '드론으로 수집한 농업 영상 데이터를 통합 관리하고 AI 분석 결과를 시각화하여 행정 담당자의 업무 효율을 높였습니다.',
        result: '현장 조사 비용 40% 절감 · 통계 자동화',
      },
    ],
  },
  {
    id: 'environment',
    title: '산림 · 해양',
    subtitle: 'Forest & Ocean',
    image: asset('assets/solution-eco.jpg'),
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 6L10 18h6l-4 12h12l-4-12h6L18 6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 32c2-3 6-4 12-4s10 1 12 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    description: '위성·항공·드론 영상으로 산림 훼손 지역을 자동 탐지하고 변화를 지속 모니터링합니다. 해양 쓰레기 관리, 해안선 변화 분석 등 환경 행정에도 활용됩니다.',
    tags: ['산림 훼손 탐지', '불법 벌채 감시', '해양 모니터링', '환경 변화 이력'],
    relatedProduct: null,
    cases: [
      {
        title: 'GeoAI 영상분석 서비스',
        client: '산림청',
        desc: '위성·항공 영상을 AI가 분석하여 산림 훼손 지역을 자동으로 탐지하고 복구지 관리 및 변화 이력을 체계적으로 관리합니다.',
        result: '훼손지 자동 탐지율 93%+ · 현장 조사 50% 감소',
      },
      {
        title: '제주 드론특별자유화구역 조성 사업',
        client: '제주특별자치도',
        desc: '드론 영상 기반 제주 전역의 산림·해양 환경 모니터링 시스템을 구축하여 환경 변화를 실시간으로 추적합니다.',
        result: '모니터링 주기 30일→7일 단축 · 데이터 자동화',
      },
    ],
  },
  {
    id: 'safety',
    title: '재난 · 안전',
    subtitle: 'Disaster & Safety',
    image: asset('assets/solution-disaster.jpg'),
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4L4 30h28L18 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="18" y1="16" x2="18" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="18" cy="26" r="1.2" fill="currentColor"/>
      </svg>
    ),
    description: '시설물 영상을 AI가 분석해 균열·파손 등 손상 상태를 자동 탐지합니다. 외관조사망도 자동 생성, 안전 점검 이력 관리, 유지보수 계획 수립에 활용됩니다.',
    tags: ['균열 탐지', '시설물 안전점검', '외관조사망도', '유지보수 관리'],
    relatedProduct: { name: 'CrackEye X', href: '/products' },
    cases: [
      {
        title: '기반시설 첨단관리(TotalCare) 기술개발',
        client: '국토안전관리원',
        desc: 'AI 카메라로 교량·터널 등 주요 시설물의 균열을 자동 탐지하고 외관조사망도를 자동 생성하여 안전 점검 업무를 혁신했습니다.',
        result: '균열 탐지 정확도 97%+ · 점검 시간 70% 단축',
      },
      {
        title: '스마트 시설물 안전관리 시스템',
        client: '지자체',
        desc: '드론·고정 카메라 영상 분석으로 공공 시설물 상태를 원격 모니터링하고 이상 징후를 조기에 감지하는 시스템을 구축했습니다.',
        result: '원격 점검 전환율 80% · 사고 예방 효과',
      },
    ],
  },
];

// ── 서브 컴포넌트 ──────────────────────────────────────────────────
function IndustryCard({ industry, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 ${
        active ? 'ring-2 ring-[#4262ff] ring-offset-2' : 'hover:shadow-xl'
      }`}
      style={{ aspectRatio: '4/3' }}
    >
      {/* 배경 이미지 */}
      <img
        src={industry.image}
        alt={industry.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* 오버레이 */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        active
          ? 'bg-gradient-to-t from-[#4262ff]/90 via-[#4262ff]/40 to-black/20'
          : 'bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80'
      }`} />

      {/* 콘텐츠 */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        {/* 아이콘 + 서브타이틀 */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
            active ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white'
          }`}>
            {industry.icon}
          </div>
          <span className="font-space text-[11px] font-bold tracking-[1.5px] uppercase text-white/60">
            {industry.subtitle}
          </span>
        </div>

        {/* 제목 + 태그 */}
        <div>
          <h3 className="font-pretendard font-bold text-[22px] md:text-[26px] text-white leading-tight mb-3">
            {industry.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {industry.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[11px] font-pretendard px-2.5 py-1 rounded-full bg-white/15 text-white/90 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          {/* 선택 인디케이터 */}
          <div className={`mt-4 flex items-center gap-1.5 text-white text-[13px] font-pretendard font-semibold transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`}>
            도입사례 보기
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function CaseCard({ c }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-pretendard font-bold px-2.5 py-1 rounded-full bg-[#eef1ff] text-[#4262ff]">
          {c.client}
        </span>
      </div>
      <h4 className="font-pretendard font-bold text-[16px] text-[#1a1a2e] leading-snug">
        {c.title}
      </h4>
      <p className="font-pretendard text-[14px] text-[#6d758f] leading-relaxed flex-1">
        {c.desc}
      </p>
      <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#4262ff" strokeWidth="1.2"/>
          <path d="M5 7l2 2 3-3" stroke="#4262ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-pretendard text-[12px] font-semibold text-[#4262ff]">{c.result}</span>
      </div>
    </div>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────────────
export default function IndustriesPage() {
  const [activeId, setActiveId] = useState(null);
  const active = industries.find(i => i.id === activeId);

  const handleCardClick = (id) => {
    setActiveId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="pt-[84px]">

        {/* 히어로 */}
        <div className="relative w-full h-[400px] overflow-hidden">
          <img
            src={asset('assets/solutions-hero-bg.jpg')}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.52)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[38px]">
            <div className="flex flex-col items-center gap-4 text-center px-4">
              <span className="flex items-center gap-[10px] font-space font-bold text-[13px] tracking-[1.4px] uppercase text-white/60">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H4M11 1V8" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                </svg>
                Industries
              </span>
              <h1 className="font-pretendard font-bold text-[32px] md:text-[48px] text-white leading-tight">
                이노팸이 적용된 산업 분야
              </h1>
              <p className="font-pretendard text-[16px] text-white/70 max-w-[520px] leading-relaxed">
                GeoAI 기술로 공공·산업 현장의 문제를 해결합니다
              </p>
            </div>
          </div>
        </div>

        {/* 카드 그리드 */}
        <section className="px-4 md:px-[88px] py-[80px] md:py-[100px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {industries.map(industry => (
              <IndustryCard
                key={industry.id}
                industry={industry}
                active={activeId === industry.id}
                onClick={() => handleCardClick(industry.id)}
              />
            ))}
          </div>

          {/* 도입사례 패널 */}
          {active && (
            <div className="mt-10 animate-fadeIn">
              {/* 패널 헤더 */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                <div>
                  <span className="font-space text-[11px] font-bold tracking-[1.5px] uppercase text-[#4262ff] mb-2 block">
                    {active.subtitle}
                  </span>
                  <h2 className="font-pretendard font-bold text-[28px] md:text-[36px] text-[#1a1a2e]">
                    {active.title} 도입사례
                  </h2>
                  <p className="font-pretendard text-[15px] text-[#6d758f] mt-2 leading-relaxed max-w-[600px]">
                    {active.description}
                  </p>
                  {active.relatedProduct && (
                    <Link
                      to={active.relatedProduct.href}
                      className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-pretendard font-semibold text-[#4262ff] hover:opacity-70 transition-opacity"
                    >
                      관련 제품: {active.relatedProduct.name} →
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map(tag => (
                    <span key={tag} className="text-[12px] font-pretendard px-3 py-1.5 rounded-full bg-[#eef1ff] text-[#4262ff] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 케이스 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {active.cases.map((c, i) => (
                  <CaseCard key={i} c={c} />
                ))}
              </div>
            </div>
          )}

          {/* 카드 미선택 안내 */}
          {!active && (
            <p className="text-center font-pretendard text-[14px] text-[#aab0c6] mt-10">
              산업 카드를 클릭하면 도입사례를 확인할 수 있습니다.
            </p>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
