import { asset } from '../utils/asset';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';
import { useLanguage } from '../i18n/LanguageContext';

export function CompanyHero({ subtitle }) {
  return (
    <section className="relative w-full h-[400px] overflow-hidden flex items-center justify-center bg-[#0b1225]">
      <img
        src={asset('assets/company-hero-bg.jpg')}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ objectPosition: '50% 41%' }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(20,26,54,0.5)' }} />
      <div className="hero-content relative z-10 flex flex-col items-center text-center gap-[38px] px-6 max-w-[795px]">
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
  const { t } = useLanguage();

  const missions = [
    {
      icon: asset('assets/icon-handshake.svg'),
      title: t('사회적 문제 해결', 'Solving Social Challenges'),
      desc: t(
        '혁신적인 기술을 바탕으로\n사회적인 문제 해결 솔루션 제공',
        'Providing solutions to social problems\nbased on innovative technology'
      ),
    },
    {
      icon: asset('assets/icon-headcircuit.svg'),
      title: t('혁신적인 기술 개발', 'Innovative Technology Development'),
      desc: t(
        '지형공간의 가치를 극대화하는\n혁신적인 기술개발',
        'Developing innovative technologies\nthat maximize the value of geospatial data'
      ),
    },
    {
      icon: asset('assets/icon-usersfour.svg'),
      title: t('즐겁고 안정적인 일자리 창출', 'Creating Fulfilling & Stable Jobs'),
      desc: t(
        '자유롭고 안정적이며 즐겁게 일할 수 있는\n복리후생이 탄탄한 양질의 일자리 창출',
        'Creating high-quality jobs with a free,\nstable, and enjoyable work environment\nand strong employee benefits'
      ),
    },
  ];

  const heroSubtitle = t(
    'AI 기반 공간정보 기술로 다양한 산업의 문제를 해결합니다',
    'Solving problems across diverse industries with AI-based geospatial technology'
  );

  const ceoMessage = t(
    `안녕하세요.

우리 회사는 GeoAI 전문 기업입니다. 멀티센서(드론, 항공, 위성)영상을 활용한 공간정보 매핑 자동화, AI모델 개발, 빅데이터 기술, 디지털트윈 플랫폼을 기반으로 감시/정찰, 환경, 재난, 건설 등 공공과 민간 분야 맞춤형 솔루션을 제공합니다. 드론, 차량 등 다중센서 이동체를 통한 효율적인 데이터 취득에서부터, 현장에서 실시간 데이터 전송, 공간데이터베이스 기반의 저장과 관리, 빅데이터와 딥러닝 기반 처리와 분석, 분석 결과의 보고와 배포에 이르기까지 전체 과정이 임무 특화되어 맞춤형으로 통합된 토탈 시스템을 제공합니다.

우리 회사는 연구실 벤처입니다. 서울시립대학교 공간정보공학과 센서및모델링연구실에서 출발했습니다. 연구실과 상호 보완적으로 함께 성장합니다. 회사에서는 현장의 목소리를 전달하여 진짜 풀어야하는 문제가 무엇인지 일깨우고, 연구실에서 개발한 원천 기술을 단지 논문으로만 그치지 않고, 실제 현장에서 사용할 수 있도록 실용화와 사업화를 추진합니다.

우리 회사는 열려있습니다. 우리 회사는 기술 혁신을 통해 좀 더 나은 사회를 만들어 가려고 합니다. 우리 회사와 가치를 공유하는 다양한 그룹과 인재들과 함께 합니다. 많은 연락 부탁 드립니다. 함께 합시다.`,
    `Hello,

Innopam is a GeoAI specialist company. We provide tailored solutions for public and private sectors — including surveillance, environment, disaster management, and construction — based on automated geospatial mapping using multi-sensor (drone, aerial, satellite) imagery, AI model development, big data technologies, and digital twin platforms. We deliver a fully integrated total system covering every step from efficient data acquisition via multi-sensor vehicles to real-time field transmission, spatial database storage and management, big data and deep learning processing, and result reporting and distribution.

Innopam is a lab-based venture founded from the Sensor and Modeling Laboratory of the Department of Geoinformatics at the University of Seoul. We grow in symbiosis with the lab — the company brings real-world problems to the forefront, while the lab's core technologies are commercialized and put into practical use beyond academic papers.

Innopam is open. We aim to create a better society through technological innovation, and we welcome diverse groups and talented individuals who share our values. Please reach out — let's build the future together.`
  );

  const ceoCredit = t('(주)이노팸 대표이사\n이임평', 'CEO, Innopam Inc.\nLim-Pyeong Lee');

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle={heroSubtitle} />

        <section className="w-full px-6 md:px-[88px] py-[60px] md:py-[120px] flex flex-col gap-[60px] md:gap-[80px] items-start max-w-[1264px] mx-auto">

          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] w-full text-center">
            Introduction
          </h2>

          {/* CEO 인사말 */}
          <div className="w-full flex flex-col gap-[40px] md:gap-[60px]">
            <h3 className="font-pretendard font-bold text-[#3a343b] text-[28px] md:text-[48px] tracking-[-1.2px]">
              {t('CEO 인사말', "CEO's Message")}
            </h3>
            <p className="font-pretendard font-medium text-[#3a343b] text-[16px] md:text-[22px] leading-[1.8] whitespace-pre-line">
              {ceoMessage}
            </p>
            <p className="font-pretendard font-medium text-[#3a343b] text-[16px] md:text-[22px] leading-[1.8] text-right whitespace-pre-line">
              {ceoCredit}
            </p>
          </div>

          {/* Mission */}
          <div className="w-full flex flex-col gap-[40px] md:gap-[60px]">
            <h3 className="font-pretendard font-bold text-[#3a343b] text-[28px] md:text-[48px] tracking-[-1.2px]">
              Mission
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              {missions.map((m, i) => (
                <div
                  key={m.title}
                  className="relative flex flex-col gap-[24px] p-[36px] rounded-[20px] bg-white border border-[#e8eaf6] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* 번호 배지 */}
                  <span className="font-space font-bold text-[13px] tracking-[2px] text-[#4262ff] opacity-50">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* 아이콘 원형 배경 */}
                  <div className="w-[68px] h-[68px] rounded-full bg-[#eef1ff] flex items-center justify-center shrink-0">
                    <img src={m.icon} alt="" className="w-[36px] h-[36px] object-contain" />
                  </div>

                  {/* 텍스트 */}
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-pretendard font-bold text-[#1a1a2e] text-[20px] md:text-[22px] leading-[1.35]">
                      {m.title}
                    </p>
                    <p className="font-pretendard text-[#6d758f] text-[14px] md:text-[16px] leading-[1.7] whitespace-pre-line">
                      {m.desc}
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
