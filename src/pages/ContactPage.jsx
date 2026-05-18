import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompanyHero } from './IntroductionPage';
import KakaoMap from '../components/KakaoMap';
import { useLanguage } from '../i18n/LanguageContext';

// Figma node: 387:149 — Contact

export default function ContactPage() {
  const { t } = useLanguage();

  const heroSubtitle = t(
    'AI 기반 공간정보 기술로 다양한 산업의 문제를 해결합니다',
    'Solving problems across diverse industries with AI-based geospatial technology'
  );

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle={heroSubtitle} />

        <section className="w-full px-6 md:px-[88px] pb-[120px] md:pb-[200px] pt-[60px] md:pt-[120px] flex flex-col gap-[40px] items-center max-w-[1440px] mx-auto">

          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center w-full">
            Contact
          </h2>

          {/* 지도 — Kakao Maps, 본사(서울)·제주지사 마커 */}
          <div className="w-full">
            <KakaoMap />
          </div>

          {/* 연락처 정보 */}
          <div className="w-full flex flex-col gap-[20px] font-pretendard text-[20px] md:text-[28px]">
            <div className="flex gap-[20px] items-start">
              <p className="font-bold text-[#5871ed] tracking-[-1.2px] leading-[1.7] w-[80px] md:w-[120px] shrink-0">
                {t('본사', 'HQ')}
              </p>
              <p className="font-medium text-[#3a343b] leading-[1.8] flex-1 min-w-0">
                {t(
                  '서울시 용산구 원효로 146 금강프라임빌딩 6층, 13층',
                  '146 Wonhyo-ro, Yongsan-gu, Seoul, Geumgang Prime Bldg. 6F & 13F'
                )}
              </p>
            </div>
            <div className="flex gap-[20px] items-start">
              <p className="font-bold text-[#5871ed] tracking-[-1.2px] leading-[1.7] w-[80px] md:w-[120px] shrink-0">
                {t('제주지사', 'Jeju Branch')}
              </p>
              <p className="font-medium text-[#3a343b] leading-[1.8] flex-1 min-w-0">
                {t(
                  '제주특별자치도 제주시 신대로 145. 2층 005호 (연동, 앤써밀당)',
                  '145 Sindae-ro, Jeju-si, Jeju-do, 2F #005'
                )}
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
