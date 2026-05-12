import { asset } from '../utils/asset';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';

const missions = [
  {
    icon: asset('assets/icon-handshake.svg'),
    title: '사회적 문제 해결',
    desc: '혁신적인 기술을 바탕으로\n사회적인 문제 해결 솔루션 제공',
  },
  {
    icon: asset('assets/icon-headcircuit.svg'),
    title: '혁신적인 기술 개발',
    desc: '지형공간의 가치를 극대화하는\n혁신적인 기술개발',
  },
  {
    icon: asset('assets/icon-usersfour.svg'),
    title: '즐겁고 안정적인 일자리 창출',
    desc: '자유롭고 안정적이며 즐겁게 일할 수 있는\n복리후생이 탄탄한 양질의 일자리 창출',
  },
];

export function CompanyHero({ subtitle }) {
  return (
    <section className="relative w-full h-[500px] md:h-[638px] overflow-hidden flex items-center justify-center bg-[#0b1225]">
      <img
        src={asset('assets/company-hero-bg.jpg')}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ transform: 'scale(1.3)', transformOrigin: 'center center' }}
      />
      {/* Dark overlays matching Figma 272:482 */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
      <div className="absolute inset-0" style={{ background: 'rgba(20,26,54,0.5)' }} />
      <div className="relative z-10 flex flex-col items-center text-center gap-[38px] px-6 max-w-[795px]">
        <SectionLabel text="Company" light />
        <h1 className="font-pretendard font-bold text-white text-[34px] md:text-[48px] tracking-[-2px]" style={{ lineHeight: '65px' }}>
          About Innopam
        </h1>
        <p className="font-pretendard font-normal text-white text-[16px] md:text-[20px] leading-[1.4]">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default function IntroductionPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle="AI 기반 공간정보 기술로 다양한 산업의 문제를 해결합니다" />

        <section className="w-full px-6 md:px-[88px] py-[60px] md:py-[120px] flex flex-col gap-[60px] md:gap-[80px] items-start max-w-[1264px] mx-auto">

          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] w-full text-center">
            Introduction
          </h2>

          {/* CEO 인사말 */}
          <div className="w-full flex flex-col gap-[40px] md:gap-[60px]">
            <h3 className="font-pretendard font-bold text-[#3a343b] text-[28px] md:text-[48px] tracking-[-1.2px]">
              CEO 인사말
            </h3>
            <p className="font-pretendard font-medium text-[#3a343b] text-[16px] md:text-[22px] leading-[1.8] whitespace-pre-line">
              {`안녕하세요.

우리 회사는 GeoAI 전문 기업입니다. 멀티센서(드론, 항공, 위성)영상을 활용한 공간정보 매핑 자동화, AI모델 개발, 빅데이터 기술, 디지털트윈 플랫폼을 기반으로 감시/정찰, 환경, 재난, 건설 등 공공과 민간 분야 맞춤형 솔루션을 제공합니다. 드론, 차량 등 다중센서 이동체를 통한 효율적인 데이터 취득에서부터, 현장에서 실시간 데이터 전송, 공간데이터베이스 기반의 저장과 관리, 빅데이터와 딥러닝 기반 처리와 분석, 분석 결과의 보고와 배포에 이르기까지 전체 과정이 임무 특화되어 맞춤형으로 통합된 토탈 시스템을 제공합니다.

우리 회사는 연구실 벤처입니다. 서울시립대학교 공간정보공학과 센서및모델링연구실에서 출발했습니다. 연구실과 상호 보완적으로 함께 성장합니다. 회사에서는 현장의 목소리를 전달하여 진짜 풀어야하는 문제가 무엇인지 일깨우고, 연구실에서 개발한 원천 기술을 단지 논문으로만 그치지 않고, 실제 현장에서 사용할 수 있도록 실용화와 사업화를 추진합니다.

우리 회사는 열려있습니다. 우리 회사는 기술 혁신을 통해 좀 더 나은 사회를 만들어 가려고 합니다. 우리 회사와 가치를 공유하는 다양한 그룹과 인재들과 함께 합니다. 많은 연락 부탁 드립니다. 함께 합시다.`}
            </p>
            <p className="font-pretendard font-medium text-[#3a343b] text-[16px] md:text-[22px] leading-[1.8] text-right">
              (주)이노팸 대표이사<br />이임평
            </p>
          </div>

          {/* Mission */}
          <div className="w-full flex flex-col gap-[40px] md:gap-[60px]">
            <h3 className="font-pretendard font-bold text-[#3a343b] text-[28px] md:text-[48px] tracking-[-1.2px]">
              Mission
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px]">
              {missions.map((m) => (
                <div key={m.title} className="flex flex-col items-center gap-[20px] text-center">
                  <div className="w-[60px] h-[60px] flex items-center justify-center">
                    <img src={m.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <p className="font-pretendard font-bold text-[#5871ed] text-[20px] md:text-[28px] leading-[1.35]">
                    {m.title}
                  </p>
                  <p className="font-pretendard text-[#3a343b] text-[14px] md:text-[20px] leading-[1.4] tracking-[-0.2px] whitespace-pre-line">
                    {m.desc}
                  </p>
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
