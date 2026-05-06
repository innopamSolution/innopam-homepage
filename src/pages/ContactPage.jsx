import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompanyHero } from './IntroductionPage';

// Figma node: 387:149 — Contact
// Map: 875px height, 실제 지도 API (Google Maps embed)

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle="AI 기반 공간정보 기술로 다양한 산업의 문제를 해결합니다" />

        <section className="w-full px-6 md:px-[88px] pb-[120px] md:pb-[200px] pt-[60px] md:pt-[120px] flex flex-col gap-[40px] items-center max-w-[1440px] mx-auto">

          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center w-full">
            Contact
          </h2>

          {/* 지도 — Google Maps embed (본사: 서울시 용산구 원효로 146) */}
          <div className="w-full border border-[#e9e9e9] overflow-hidden" style={{ height: '875px' }}>
            <iframe
              title="이노팸 본사 위치"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.8!2d126.9638!3d37.5386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f14a59cf5b5%3A0x6b9b1b0b0b0b0b0b!2z7ISc7Jq47Yq567OE7IucIOyEseuCqOq1rCDsmrjhtp7roZwgMTQ2!5e0!3m2!1sko!2skr!4v1620000000000!5m2!1sko!2skr"
            />
          </div>

          {/* 연락처 정보 */}
          <div className="w-full flex flex-col gap-[20px] md:gap-[20px] font-pretendard text-[20px] md:text-[28px]">
            <div className="flex gap-[20px] items-start">
              <p className="font-bold text-[#5871ed] tracking-[-1.2px] leading-[1.7] w-[80px] md:w-[120px] shrink-0">
                본사
              </p>
              <p className="font-medium text-[#3a343b] leading-[1.8] flex-1 min-w-0">
                서울시 용산구 원효로 146 금강프라임빌딩 6층, 13층
              </p>
            </div>
            <div className="flex gap-[20px] items-start">
              <p className="font-bold text-[#5871ed] tracking-[-1.2px] leading-[1.7] w-[80px] md:w-[120px] shrink-0">
                제주지사
              </p>
              <p className="font-medium text-[#3a343b] leading-[1.8] flex-1 min-w-0">
                제주특별자치도 제주시 신대로 145. 2층 005호 (연동, 앤써밀당)
              </p>
            </div>
            <div className="flex gap-[20px] items-start">
              <p className="font-bold text-[#5871ed] tracking-[-1.2px] leading-[1.7] w-[80px] md:w-[120px] shrink-0">
                Tel.
              </p>
              <a href="tel:0270255127" className="font-medium text-[#3a343b] leading-[1.8] hover:text-[#5871ed] transition-colors">
                02-702-5127
              </a>
            </div>
            <div className="flex gap-[20px] items-start">
              <p className="font-bold text-[#5871ed] tracking-[-1.2px] leading-[1.7] w-[80px] md:w-[120px] shrink-0">
                E-mail.
              </p>
              <a href="mailto:innopam@innopam.com" className="font-medium text-[#3a343b] leading-[1.8] hover:text-[#5871ed] transition-colors break-all">
                innopam@innopam.com
              </a>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
