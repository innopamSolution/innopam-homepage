import { useState } from 'react';
import { asset } from '../utils/asset';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';

// ── 탭별 콘텐츠 데이터 (innopam.com/solutions/ 기준) ──────────────────────
const tabData = [
  {
    id: 'DmapAI',
    label: 'DmapAI',
    subtitle: 'Drone Mapping DmapAI',
    desc: '드론 영상을 업로드하면 정사영상(Orthophoto), 포인트클라우드(PointCloud), 3차원모델(3D Mesh), DSM(Digital Surface Model)을 생성하는 솔루션',
    hero: asset('assets/solutions/dmapai/hero.mp4'),
    features: [
      { img: asset('assets/solutions/dmapai/feature-1.png'), title: '정사 영상 제작 기능', desc: '사용자가 업로드한 드론영상을 활용해, 영상매칭과 사진측량 기술을 이용해 정사영상을 제작하는 기능' },
      { img: asset('assets/solutions/dmapai/feature-2.png'), title: 'Point Cloud/3DMesh 제작 기능', desc: '사용자가 업로드한 드론영상으로 영상 매칭과 사진측량 기술을 이용해 3차원 Point Cloud와 Mesh를 제작하는 기능' },
      { img: asset('assets/solutions/dmapai/feature-3.png'), title: 'DSM 제작 기능', desc: '사용자가 업로드한 여러장의 드론영상을 활용해, 영상매칭과 사진측량 기술을 이용해 DSM을 제작하는 기능' },
      { img: asset('assets/solutions/dmapai/feature-4.png'), title: 'AI 기반 드론 영상 분석 기능', desc: '딥러닝 영상 세그멘테이션 기반 농작물 자동 탐지 기능' },
      { img: asset('assets/solutions/dmapai/feature-5.png'), title: 'AI 기반 드론 영상 분석 기능', desc: '변화탐지 및 불법건축물 탐지 기능' },
      { img: asset('assets/solutions/dmapai/feature-6.png'), title: 'AI 기반 드론 영상 분석 기능', desc: '도심 녹지 및 태양광 패널 자동 탐지' },
    ],
    cases: [
      { img: asset('assets/solutions/dmapai/example-1.png'), title: '국립 공원 공단', desc: '드론 영상과 AI 기반 해양쓰레기/불법건축물 자동탐지' },
      { img: asset('assets/solutions/dmapai/example-2.png'), title: '제주특별자치도', desc: '드론 영상과 AI 기반 월동작물 재배면적 산정 서비스' },
    ],
  },
  {
    id: 'LDMapAI',
    label: 'LDMapAI',
    subtitle: 'LiveDroneMapAI',
    desc: '드론에서 전송되는 영상에서 자동으로 객체를 식별하고 실시간으로 위치를 결정하는 솔루션',
    hero: asset('assets/solutions/ldmapai/hero.mp4'),
    features: [
      { img: asset('assets/solutions/ldmapai/feature-1.png'), title: '재난재해 모니터링', desc: '드론 실시간 영상으로 재난재해 현장을 신속하게 모니터링' },
      { img: asset('assets/solutions/ldmapai/feature-2.png'), title: '실시간 객체 탐지 및 위치 결정', desc: '드론에서 전송되는 영상을 통해 객체를 자동 식별하고 실시간으로 정확한 위치 산출' },
    ],
    cases: [
      { img: asset('assets/solutions/ldmapai/example-1.png'), title: '국립재난안전연구원', desc: '드론 실시간 영상 기반 재난 현장 객체 탐지 및 위치 결정 시스템 구축' },
      { img: asset('assets/solutions/ldmapai/example-2.png'), title: '제주특별자치도', desc: '드론 영상 기반 실시간 모니터링 서비스 구축' },
    ],
  },
  {
    id: 'MS-AI-PS',
    label: 'MS-AI-PS',
    subtitle: 'Multi-Sensor AI platform service',
    desc: '멀티센서(위성, 항공, 드론)영상 기반의 GeoAI 분석 플랫폼 서비스',
    hero: asset('assets/solutions/msaips/hero.mp4'),
    features: [
      { img: asset('assets/solutions/msaips/data-get-save.png'), title: '데이터 수집 · 저장', desc: '위성 · 항공 · 드론 영상의 계층적 정보 취득 및 활용' },
      { img: asset('assets/solutions/msaips/GEO-AI.png'), title: 'GEO-AI 모델 개발', desc: '모델 앙상블 적용을 통한 AI모델 객체 탐지 정확도 제고' },
      { img: asset('assets/solutions/msaips/One-Stop.png'), title: 'One-Stop AI 서비스', desc: '학습데이터 수집, 전처리, 구축, 관리를 위한 One-Stop 서비스' },
      { img: asset('assets/solutions/msaips/model-practice.png'), title: '모델 학습 갱신', desc: '플랫폼에서 구축된 학습데이터를 이용해 직접 모델 학습 갱신' },
    ],
    cases: [
      { img: asset('assets/solutions/msaips/jeju-analysis.png'), title: '제주 위성영상 분석시스템', desc: '제주의 도시 문제에 대한 신속한 분석과 최적 대응 체계를 위해 GEO-AI를 활용한 범용적 영상분석 시스템 구축' },
      { img: asset('assets/solutions/msaips/jeju-plant-manage.png'), title: '제주 재배작물관리 서비스', desc: 'AI분석을 통한 작물자동탐지 및 편리하고 체계적인 재배면적 신고 관리를 위한 서비스' },
      { img: asset('assets/solutions/msaips/jeju-illegally-ruin-manage.png'), title: '제주 불법산림훼손관리 서비스', desc: 'AI분석을 통한 불법산림훼손 자동탐지 및 훼손지 관리를 위한 서비스' },
      { img: asset('assets/solutions/msaips/jeju-sea-trash-manage.png'), title: '제주 해양쓰레기관리 서비스', desc: 'AI 분석을 통한 해양쓰레기 자동탐지 및 행정구역별 통계 정보 확인을 위한 서비스' },
    ],
  },
  {
    id: 'D-drive',
    label: 'D-drive',
    subtitle: 'Drone drive',
    desc: '드론 영상을 한 곳에서 자동으로 정리하고 쉽게 찾을 수 있는 드론 영상 관리 서비스',
    hero: asset('assets/solutions/ddrive/hero.png'),
    features: [
      { img: asset('assets/solutions/ddrive/d1.png'), title: '드론영상 자동 관리 서비스', desc: 'D-drive 드론영상 자동 관리 서비스' },
      { img: asset('assets/solutions/ddrive/d2.png'), title: '관리', desc: 'AI를 활용한 자동 영상 분류' },
      { img: asset('assets/solutions/ddrive/d3.png'), title: '검색', desc: '지도-갤러리 연동한 사진/동영상 조회, 그룹·키워드·위치 조건을 활용한 검색 기능' },
      { img: asset('assets/solutions/ddrive/d4.png'), title: '공유', desc: '링크 방식으로 지도기반 화면의 영상 데이터 공유' },
    ],
    cases: [],
  },
];

// ── 카드 컴포넌트 ──────────────────────────────────────────────────────────
function FeatureCard({ img, title, desc }) {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="w-full h-[280px] md:h-[333px] overflow-hidden rounded-[4px]">
        <img src={img} alt={title} className="w-full h-full object-cover object-left-top" />
      </div>
      <div className="flex flex-col gap-[12px]">
        <p className="font-pretendard font-bold text-[#161c2d] text-[18px] md:text-[20px] leading-[1.5]">
          {title}
        </p>
        <p className="font-pretendard text-[#161c2d] text-[14px] md:text-[16px] leading-[1.4] opacity-70 tracking-[-0.2px]">
          {desc}
        </p>
      </div>
    </div>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────────────────────
export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabData[activeTab];

  const handleTabChange = (i) => {
    setActiveTab(i);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">

        {/* Hero */}
        <section
          className="relative w-full h-[400px] overflow-hidden flex items-center justify-center"
          style={{ background: '#0b1225' }}
        >
          <img
            src={asset('assets/solutions-hero-bg.jpg')}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ filter: 'blur(2px)', transform: 'scale(1.05)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(44,41,86,0.85) 0%, rgba(9,33,65,0.9) 100%)' }}
          />
          <div className="relative z-10 flex flex-col items-center text-center gap-[38px] px-6 max-w-[795px]">
            <SectionLabel text="Solutions" light />
            <h1 className="font-pretendard font-bold text-white text-[34px] md:text-[48px] tracking-[-2px] leading-[1.35]">
              Mapping &amp; AI Solutions
            </h1>
            <p className="font-pretendard font-normal text-white text-[16px] md:text-[20px] leading-[1.4] opacity-90">
              위성·항공·드론 데이터를 기반으로 변화 탐지, 객체 분석, 디지털트윈 구축까지<br className="hidden md:block" />
              {' '}다양한 산업의 문제 해결을 지원합니다
            </p>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="w-full px-6 md:px-[88px] py-[28px]">
          <div className="flex w-full max-w-[1264px] mx-auto overflow-x-auto">
            {tabData.map((t, i) => (
              <button
                key={t.id}
                onClick={() => handleTabChange(i)}
                className={`flex-1 min-w-[100px] py-[18px] md:py-[30px] text-[16px] md:text-[22px] font-pretendard text-center transition-colors whitespace-nowrap ${
                  activeTab === i
                    ? 'bg-[#5871ed] text-white'
                    : 'border border-[#e9e9e9] text-[#161c2d] hover:bg-gray-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>

        {/* 탭 콘텐츠 */}
        <section className="w-full px-6 md:px-[88px] py-[60px] md:py-[120px] flex flex-col gap-[60px] md:gap-[80px] items-center max-w-[1440px] mx-auto">

          {/* 타이틀 + 설명 */}
          <div className="flex flex-col items-center gap-[20px] md:gap-[40px] w-full max-w-[840px]">
            <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px]">
              {tab.label}
            </h2>
            <div className="flex flex-col gap-[20px] w-full text-center">
              <h3 className="font-pretendard text-[#161c2d] text-[24px] md:text-[36px] tracking-[-1.2px] leading-[1.35]">
                {tab.subtitle}
              </h3>
              <p className="font-pretendard text-[#161c2d] text-[16px] md:text-[22px] leading-[1.4] opacity-70 tracking-[-0.2px]">
                {tab.desc}
              </p>
            </div>
          </div>

          {/* Hero — mp4는 video, jpg는 img */}
          <div className="w-full max-w-[815px] rounded-[8px] overflow-hidden shadow-[0px_42px_44px_-10px_rgba(1,23,48,0.12)] bg-[#94a2b6]">
            {tab.hero.endsWith('.mp4') ? (
              <video
                key={tab.hero}
                src={tab.hero}
                className="w-full h-auto block"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={tab.hero}
                alt={`${tab.label} 화면`}
                className="w-full h-auto object-left-top"
              />
            )}
          </div>

          {/* 주요 기능 */}
          {tab.features.length > 0 && (
            <div className="w-full max-w-[1264px] flex flex-col gap-[20px]">
              <h3 className="font-pretendard font-bold text-[#3a343b] text-[24px] md:text-[32px] tracking-[-1.2px]">
                주요 기능
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[40px] md:gap-y-[60px] md:gap-x-[40px] lg:gap-x-[160px]">
                {tab.features.map((f, i) => (
                  <FeatureCard key={i} {...f} />
                ))}
              </div>
            </div>
          )}

          {/* 도입 사례 */}
          {tab.cases.length > 0 && (
            <div className="w-full max-w-[1264px] flex flex-col gap-[20px]">
              <h3 className="font-pretendard font-bold text-[#3a343b] text-[24px] md:text-[32px] tracking-[-1.2px]">
                도입 사례
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[40px] md:gap-y-[60px] md:gap-x-[40px] lg:gap-x-[160px]">
                {tab.cases.map((c, i) => (
                  <FeatureCard key={i} {...c} />
                ))}
              </div>
            </div>
          )}

        </section>
      </main>
      <Footer />
    </div>
  );
}
