import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';

export default function NewsHero() {
  return (
    <section className="relative w-full h-[375px] md:h-[471px] overflow-hidden bg-[#1a1008]">

      {/* 이미지: Figma 스펙 h=259.34%, top=-110.67% */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={asset('assets/news-hero-bg.jpg')}
          alt=""
          className="absolute left-0 w-full pointer-events-none"
          style={{
            height: '259.34%',
            top: '-110.67%',
            objectFit: 'cover',
            objectPosition: '50% 50%',
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-[38px] px-6 pt-[80px] md:pt-[115px]">
        <SectionLabel text="News" light />
        <h1
          className="font-pretendard font-bold text-white text-[36px] md:text-[48px] tracking-[-2px]"
          style={{ lineHeight: '1.35' }}
        >
          News
        </h1>
        <p className="font-pretendard font-normal text-white text-[15px] md:text-[20px] leading-[1.4] max-w-[451px]">
          이노팸의 주요 소식과 언론보도 내용을 전합니다.
        </p>
      </div>
    </section>
  );
}
