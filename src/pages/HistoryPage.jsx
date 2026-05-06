import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompanyHero } from './IntroductionPage';

const historyData = [
  {
    year: '2024',
    items: [
      '고정밀 전자지도 구축 챌린지 사업 수행',
      'AI 기반 품질검증 지원 시스템 개발',
      'GeoX CityVision 플랫폼 고도화',
    ],
  },
  {
    year: '2023',
    items: [
      'GeoX 플랫폼 솔루션 시리즈 공식 론칭',
      'GeoX RealMap · CityVision · CrackEyeX 출시',
      '국립재난안전연구원 과제 수행',
    ],
  },
  {
    year: '2022',
    items: [
      '국토교통부 GeoAI 공간정보 연구과제 수행',
      '드론영상관리 시스템 개발',
      '서울시립대학교 산학협력 협약 체결',
    ],
  },
  {
    year: '2020',
    items: [
      'GeoAI 기반 변화탐지 서비스 출시',
      'AI 기반 농작물 재배면적 산정 서비스 개발',
      '제주특별자치도 월동작물 분석 사업 수행',
    ],
  },
  {
    year: '2018',
    items: [
      '드론 매핑 솔루션 DmapAI 1.0 출시',
      '정사영상·Point Cloud·DSM 자동 생성 기능 탑재',
      '국립공원공단 해양쓰레기 탐지 사업 수행',
    ],
  },
  {
    year: '2015',
    items: [
      '(주)이노팸 법인 설립',
      '공간정보 AI 연구 및 사업화 착수',
    ],
  },
  {
    year: '2014',
    items: [
      '서울시립대학교 공간정보공학과 센서및모델링연구실 창설',
      'GeoAI 원천 기술 연구 시작',
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle="이노팸의 발자취와 성장 과정을 소개합니다" />

        <section className="w-full px-6 md:px-[88px] py-[60px] md:py-[120px] max-w-[1264px] mx-auto">
          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center mb-[60px] md:mb-[80px]">
            History
          </h2>

          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-px bg-[#e9e9e9]" />

            {historyData.map((group, gi) => (
              <div key={group.year} className="flex flex-col md:flex-row gap-4 md:gap-0 pb-[48px] md:pb-[60px]">
                {/* Year */}
                <div className="md:w-[120px] shrink-0 flex md:flex-col items-center md:items-end md:pr-[32px] gap-3 md:gap-0 md:pt-[2px]">
                  <span className="font-pretendard font-black text-[#5871ed] text-[24px] md:text-[28px] tracking-[-1px]">
                    {group.year}
                  </span>
                  {/* Dot on timeline */}
                  <div className="hidden md:flex absolute left-[112px] w-[16px] h-[16px] rounded-full bg-[#5871ed] border-4 border-white shadow-[0_0_0_2px_#5871ed] mt-[6px]" />
                </div>

                {/* Items */}
                <div className="md:pl-[48px] flex flex-col gap-[12px]">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-start gap-[12px]">
                      <span className="mt-[8px] w-[6px] h-[6px] rounded-full bg-[#5871ed] shrink-0" />
                      <p className="font-pretendard text-[#3a343b] text-[16px] md:text-[20px] leading-[1.6]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
