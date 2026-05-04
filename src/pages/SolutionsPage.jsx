import { useState } from 'react';
import { asset } from '../utils/asset';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';

const tabs = ['DmapAI', 'LDMapAI', 'MS-AI-PS', 'D-drive'];

const features = [
  {
    img: asset('assets/solutions-feature1.jpg'),
    title: '정사 영상 제작',
    desc: '사용자가 업로드한 드론영상을 활용해, 영상매칭과 사진측량 기술을 이용해 정사영상을 제작하는 기능',
  },
  {
    img: asset('assets/solutions-feature2.jpg'),
    title: 'Point Cloud/3DMesh 제작',
    desc: '사용자가 업로드한 드론영상으로 영상 매칭과 사진측량 기술을 이용해 3차원 Point Cloud와 Mesh를 제작하는 기능',
  },
  {
    img: asset('assets/solutions-feature3.jpg'),
    title: 'DSM 제작',
    desc: '사용자가 업로드한 여러장의 드론영상을 활용해, 영상매칭과 사진측량 기술을 이용해 DSM을 제작하는 기능',
  },
  {
    img: asset('assets/solutions-feature4.jpg'),
    title: 'AI 기반 드론 영상 분석',
    desc: '딥러닝 영상 세그멘테이션 기반 농작물 자동 탐지 기능',
  },
  {
    img: asset('assets/solutions-feature5.jpg'),
    title: 'AI 기반 드론 영상 분석',
    desc: '변화탐지 및 불법건축물 탐지 기능',
  },
  {
    img: asset('assets/solutions-feature6.jpg'),
    title: 'AI 기반 드론 영상 분석',
    desc: '도심 녹지 및 태양광 패널 자동 탐지',
  },
];

const cases = [
  {
    img: asset('assets/solutions-feature1.jpg'),
    title: '국립 공원 공단',
    desc: '드론 영상과 AI 기반 해양쓰레기/불법건축물 자동탐지',
  },
  {
    img: asset('assets/solutions-feature2.jpg'),
    title: '제주특별자치도',
    desc: '드론 영상과 AI 기반 월동작물 재배면적 산정 서비스',
  },
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">

        {/* Hero */}
        <section
          className="relative w-full h-[500px] md:h-[638px] overflow-hidden flex items-center justify-center"
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
            style={{
              background:
                'radial-gradient(ellipse at 50% 60%, rgba(44,41,86,0.85) 0%, rgba(9,33,65,0.9) 100%)',
            }}
          />
          <div className="relative z-10 flex flex-col items-center text-center gap-[38px] px-6 max-w-[795px]">
            <SectionLabel text="Solutions" light />
            <h1
              className="font-pretendard font-bold text-white text-[34px] md:text-[48px] tracking-[-2px] leading-[1.35]"
            >
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
          <div className="flex w-full overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-1 min-w-[100px] py-[18px] md:py-[30px] text-[16px] md:text-[22px] font-pretendard text-center transition-colors whitespace-nowrap ${
                  activeTab === i
                    ? 'bg-[#5871ed] text-white'
                    : 'border border-[#e9e9e9] text-[#161c2d] hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* DmapAI Content */}
        <section className="w-full px-6 md:px-[88px] py-[60px] md:py-[120px] flex flex-col gap-[60px] md:gap-[80px] items-center">

          {/* Title + Description */}
          <div className="flex flex-col items-center gap-[20px] md:gap-[40px] w-full max-w-[840px]">
            <h2
              className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px]"
            >
              {tabs[activeTab]}
            </h2>
            <div className="flex flex-col gap-[20px] w-full text-center">
              <h3 className="font-pretendard text-[#161c2d] text-[24px] md:text-[36px] tracking-[-1.2px] leading-[1.35]">
                Drone Mapping {tabs[activeTab]}
              </h3>
              <p className="font-pretendard text-[#161c2d] text-[16px] md:text-[22px] leading-[1.4] opacity-70 tracking-[-0.2px]">
                드론 영상을 업로드하면 정사영사(Orthophoto), 포인트클라우드(PointCloud),<br className="hidden md:block" />
                {' '}3차원모델(3D Mesh), DSM(Digital Surface Model)을 생성하는 솔루션
              </p>
            </div>
          </div>

          {/* Laptop Mockup */}
          <div className="w-full max-w-[815px] rounded-[8px] overflow-hidden shadow-[0px_42px_44px_-10px_rgba(1,23,48,0.12)] bg-[#94a2b6]">
            <img
              src={asset('assets/solutions-laptop-screen.jpg')}
              alt="DmapAI 화면"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 주요 기능 */}
          <div className="w-full flex flex-col gap-[20px]">
            <h3 className="font-pretendard font-bold text-[#3a343b] text-[24px] md:text-[32px] tracking-[-1.2px]">
              주요 기능
            </h3>
            <div className="grid gap-[40px] md:gap-[60px]" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(540px, 1fr))' }}>
              {features.map((f) => (
                <div key={f.title + f.desc} className="flex flex-col gap-[20px] min-w-[540px]">
                  <div className="w-full h-[333px] overflow-hidden rounded-[4px]">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-pretendard font-bold text-[#161c2d] text-[18px] md:text-[20px] leading-[1.5]">
                      {f.title}
                    </p>
                    <p className="font-pretendard text-[#161c2d] text-[14px] md:text-[16px] leading-[1.4] opacity-70 tracking-[-0.2px]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 도입 사례 */}
          <div className="w-full flex flex-col gap-[20px]">
            <h3 className="font-pretendard font-bold text-[#3a343b] text-[24px] md:text-[32px] tracking-[-1.2px]">
              도입 사례
            </h3>
            <div className="grid gap-[40px] md:gap-[60px]" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(540px, 1fr))' }}>
              {cases.map((c) => (
                <div key={c.title} className="flex flex-col gap-[20px] min-w-[540px]">
                  <div className="w-full h-[333px] overflow-hidden rounded-[4px]">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-pretendard font-bold text-[#161c2d] text-[18px] md:text-[20px] leading-[1.5]">
                      {c.title}
                    </p>
                    <p className="font-pretendard text-[#161c2d] text-[14px] md:text-[16px] leading-[1.4] opacity-70 tracking-[-0.2px]">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
