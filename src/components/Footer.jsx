// Figma node: 159:2380 (footer)
import { useState } from 'react';
import { asset } from '../utils/asset';
import DemoModal from './DemoModal';

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className="relative bg-black flex flex-col gap-[60px] md:gap-[100px] items-center pb-[40px] pt-[80px] md:pt-[100px] px-6 md:px-[80px]">
      {/* Main content — stack on mobile, side-by-side on desktop */}
      <div className="relative w-full max-w-[1280px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 lg:h-[377px]">
          {/* Left: CTA */}
          <div className="lg:absolute lg:left-10 lg:top-0 lg:right-[640px] lg:h-[352px] text-center lg:text-left">
            <p
              className="font-pretendard font-normal text-white mb-10 text-[18px] md:text-[24px]"
              style={{ lineHeight: "1.8", letterSpacing: "-0.48px" }}
            >
              공간정보 기반 AI 프로젝트를 계획 중이신가요?
              <br />
              도시·농업·재난·시설물 관리까지
              <br />
              다양한 분야의 문제 해결을 지원합니다
            </p>
            <button
              onClick={() => setContactOpen(true)}
              className="brand-gradient inline-flex items-center text-white font-space font-bold text-[12px] tracking-[1.3px] uppercase px-[54px] py-[15px] rounded-full hover:opacity-90 transition-opacity"
            >
              문의하기
            </button>
          </div>

          {/* Right: Contact info */}
          <div className="lg:absolute lg:left-[640px] lg:top-0 lg:right-0 flex flex-col gap-8 lg:gap-0 lg:h-[345px] lg:justify-between text-center lg:text-left items-center lg:items-start">
            {/* Address */}
            <div>
              <p className="font-space font-bold text-[11px] text-[rgba(255,255,255,0.6)] tracking-[1.2px] uppercase mb-3">
                Address
              </p>
              <div className="font-space text-[17px] text-white leading-[27.2px]">
                <p>본사</p>
                <p>서울시 용산구 원효로 146 금강프라임빌딩 6층, 13층</p>
                <br />
                <p>제주지사</p>
                <p>제주특별자치도 제주시 신대로 145. 2층 005호 (연동, 앤써밀당)</p>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-space font-bold text-[11px] text-[rgba(255,255,255,0.6)] tracking-[1.2px] uppercase mb-2">
                  PHONE
                </p>
                <p className="font-space text-[17px] text-white leading-[27.2px]">
                  02-702-5127
                </p>
              </div>
              <div>
                <p className="font-space font-bold text-[11px] text-[rgba(255,255,255,0.6)] tracking-[1.2px] uppercase mb-2">
                  EMAIL
                </p>
                <a
                  href="mailto:innopam@innopam.com"
                  className="font-space text-[17px] text-white leading-[27.2px] underline hover:text-blue-300 transition-colors"
                >
                  innopam@innopam.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative flex flex-col gap-9 w-full max-w-[1280px]">
        <div className="h-px bg-[rgba(255,255,255,0.1)] w-full" />
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-0">
          <img src={asset('assets/logo-footer-new.svg')} alt="Innopam" className="w-[128px] h-[44px] object-contain" />
          <p className="font-space text-[11px] text-[rgba(255,255,255,0.8)] md:text-right leading-[18px]">
            Copyright © Innopam.com All Rights Reserved
          </p>
        </div>
      </div>
      <DemoModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title="문의하기"
        subtitle="이노팸에 문의사항을 남겨주시면 빠르게 연락드리겠습니다."
        submitLabel="문의하기"
      />
    </footer>
  );
}
