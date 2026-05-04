import { asset } from '../utils/asset';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';

const missions = [
  {
    title: '사회적 문제 해결',
    desc: '혁신적인 기술을 바탕으로\n사회적인 문제 해결 솔루션 제공',
  },
  {
    title: '기술 혁신',
    desc: '공간정보·AI·드론 기술로\n산업의 디지털 전환을 선도',
  },
  {
    title: '지속 가능한 성장',
    desc: '연구·산업·공공을 잇는\n지속 가능한 협력 생태계 구축',
  },
];

export default function IntroductionPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">

        {/* Hero */}
        <section className="relative w-full h-[500px] md:h-[638px] overflow-hidden flex items-center justify-center bg-[#0b1225]">
          <img
            src={asset('assets/company-hero-bg.jpg')}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col items-center text-center gap-[38px] px-6 max-w-[795px]">
            <SectionLabel text="Company" light />
            <h1 className="font-pretendard font-bold text-[#5871ed] text-[34px] md:text-[48px] tracking-[-2px] leading-[1.35]">
              About Innopam
            </h1>
            <p className="font-pretendard font-normal text-[#5871ed] text-[16px] md:text-[20px] leading-[1.4]">
              AI 기반 공간정보 기술로 다양한 산업의 문제를 해결합니다
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full px-6 md:px-[88px] py-[60px] md:py-[120px] flex flex-col gap-[60px] md:gap-[80px] items-center">

          {/* Section Title */}
          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center">
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

우리 회사는 연구실 벤처입니다. 서울시립대학교 공간정보공학과 센서및모델링연구실에서 출발했습니다. 연구실과 상호 보완적으로 함께 성장합니다. 회사에서는 현장의 목소리를 전달하여 진짜 풀어야하는 문제가 무엇인지 일깨우고, 연구실에서 개발한 원천 기술을 단지 논문으로만 그치지 않고, 실제 현장에서 사용할 수 있도록 실용화와 사업화를 추진합니다. 실제 현장의 목소리를 반영하여 함께 요구사항을 분석하고 맞춤형 솔루션을 설계하고 구현하고 시험하고 검증합니다.

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
                  {/* HeadCircuit Icon */}
                  <div className="w-[60px] h-[60px] flex items-center justify-center">
                    <img
                      src={asset('assets/icon-mission.svg')}
                      alt=""
                      className="w-full h-full object-contain"
                      style={{ filter: 'invert(42%) sepia(80%) saturate(400%) hue-rotate(200deg) brightness(90%)' }}
                    />
                  </div>
                  <p className="font-pretendard font-bold text-[#5871ed] text-[20px] md:text-[28px] leading-[1.35]">
                    {m.title}
                  </p>
                  <p className="font-pretendard text-[#161c2d] text-[14px] md:text-[20px] leading-[1.4] opacity-70 tracking-[-0.2px] whitespace-pre-line">
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
