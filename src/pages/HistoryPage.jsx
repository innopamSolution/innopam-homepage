import { asset } from '../utils/asset';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompanyHero } from './IntroductionPage';

// Figma node: 298:223 — History
const historyData = [
  {
    year: '2025',
    items: [
      { month: '12', text: 'GeoX Cityvision GS 인증 1등급 획득' },
      { month: '10', text: 'GeoX Cityvision GS 인증 1등급 획득' },
      { month: '07', text: 'GeoX Cityvision GS 인증 1등급 획득' },
    ],
  },
  {
    year: '2024',
    items: [
      { month: '12', text: 'GeoX Cityvision GS 인증 1등급 획득' },
      { month: '10', text: 'GeoX Cityvision GS 인증 1등급 획득' },
      { month: '07', text: 'GeoX Cityvision GS 인증 1등급 획득' },
    ],
  },
  {
    year: '2023',
    items: [
      { month: '12', text: 'GeoX Cityvision GS 인증 1등급 획득' },
      { month: '10', text: 'GeoX Cityvision GS 인증 1등급 획득' },
      { month: '07', text: 'GeoX Cityvision GS 인증 1등급 획득' },
    ],
  },
  {
    year: '2022',
    items: [
      { month: '12', text: 'GeoX Cityvision GS 인증 1등급 획득' },
      { month: '10', text: 'GeoX Cityvision GS 인증 1등급 획득' },
      { month: '07', text: 'GeoX Cityvision GS 인증 1등급 획득' },
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle="AI 기반 공간정보 기술로 다양한 산업의 문제를 해결합니다" />

        <section className="w-full px-6 md:px-[88px] pb-[120px] md:pb-[200px] pt-[60px] md:pt-[120px] flex flex-col gap-[60px] md:gap-[80px] items-center max-w-[1440px] mx-auto">

          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center">
            History
          </h2>

          <div className="w-full flex flex-col gap-[40px] md:gap-[60px]">
            {historyData.map((group) => (
              <div key={group.year} className="flex gap-[40px] md:gap-[80px] items-start">
                {/* Year */}
                <p className="font-pretendard font-bold text-[#3a343b] text-[32px] md:text-[48px] tracking-[-1.2px] whitespace-nowrap shrink-0">
                  {group.year}
                </p>
                {/* Items */}
                <div className="flex flex-col gap-[20px] md:gap-[30px] flex-1 min-w-0">
                  {group.items.map((item, i) => (
                    <div key={i} className="flex gap-[16px] md:gap-[20px] items-start">
                      <p className="font-pretendard font-bold text-[#5871ed] text-[20px] md:text-[28px] leading-[1.7] tracking-[-1.2px] w-[40px] md:w-[62px] shrink-0">
                        {item.month}
                      </p>
                      <p className="font-pretendard font-medium text-[#3a343b] text-[16px] md:text-[28px] leading-[1.8] flex-1 min-w-0">
                        {item.text}
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
