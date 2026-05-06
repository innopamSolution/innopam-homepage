import { asset } from '../utils/asset';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompanyHero } from './IntroductionPage';

const offices = [
  {
    name: '본사',
    address: '서울시 용산구 원효로 146 금강프라임빌딩 6층, 13층',
    phone: '02-702-5127',
    email: 'innopam@innopam.com',
  },
  {
    name: '제주지사',
    address: '제주특별자치도 제주시 신대로 145. 2층 005호 (연동, 앤써밀당)',
    phone: '02-702-5127',
    email: 'innopam@innopam.com',
  },
];

function InfoRow({ label, value, isLink, href }) {
  return (
    <div className="flex flex-col sm:flex-row gap-[4px] sm:gap-[24px] py-[16px] border-b border-[#e9e9e9]">
      <span className="font-space font-bold text-[11px] text-[#6d758f] tracking-[1.2px] uppercase w-[80px] shrink-0 pt-[2px]">
        {label}
      </span>
      {isLink ? (
        <a href={href} className="font-pretendard text-[#5871ed] text-[16px] md:text-[18px] leading-[1.6] underline hover:opacity-70 transition-opacity">
          {value}
        </a>
      ) : (
        <p className="font-pretendard text-[#3a343b] text-[16px] md:text-[18px] leading-[1.6]">{value}</p>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle="이노팸과 함께하세요. 언제든지 문의해 주세요." />

        <section className="w-full px-6 md:px-[88px] py-[60px] md:py-[120px] max-w-[1264px] mx-auto flex flex-col gap-[60px] md:gap-[80px]">
          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center">
            Contact
          </h2>

          {/* Office cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
            {offices.map((office) => (
              <div key={office.name} className="flex flex-col gap-0 border border-[#e9e9e9] rounded-[8px] overflow-hidden">
                {/* Card header */}
                <div className="bg-[#5871ed] px-[32px] py-[20px]">
                  <h3 className="font-pretendard font-bold text-white text-[22px] md:text-[28px]">
                    {office.name}
                  </h3>
                </div>
                {/* Card body */}
                <div className="px-[32px] py-[8px] flex flex-col">
                  <InfoRow label="Address" value={office.address} />
                  <InfoRow label="Phone" value={office.phone} isLink href={`tel:${office.phone.replace(/-/g, '')}`} />
                  <InfoRow label="Email" value={office.email} isLink href={`mailto:${office.email}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Inquiry CTA */}
          <div className="w-full flex flex-col items-center gap-[24px] bg-[#f4f7fa] rounded-[12px] px-6 py-[60px] text-center">
            <h3 className="font-pretendard font-bold text-[#3a343b] text-[24px] md:text-[36px] tracking-[-1px] leading-[1.35]">
              공간정보 기반 AI 프로젝트를 계획 중이신가요?
            </h3>
            <p className="font-pretendard text-[#6d758f] text-[16px] md:text-[20px] leading-[1.6]">
              도시·농업·재난·시설물 관리까지 다양한 분야의 문제 해결을 지원합니다
            </p>
            <a
              href="mailto:innopam@innopam.com"
              className="inline-flex items-center brand-gradient text-white font-space font-bold text-[13px] tracking-[1.3px] uppercase px-[54px] py-[16px] rounded-full hover:opacity-90 transition-opacity mt-[8px]"
            >
              문의하기
            </a>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
