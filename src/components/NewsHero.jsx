import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';

export default function NewsHero() {
  return (
    <section className="relative w-full h-[400px] overflow-hidden flex items-center justify-center bg-[#1a1008]">
      <img
        src={asset('assets/news-hero-bg.jpg')}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ objectPosition: '50% 63%' }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
      <div className="relative z-10 flex flex-col items-center text-center gap-[38px] px-6">
        <SectionLabel text="News" light />
        <h1
          className="font-pretendard font-bold text-white text-[48px] tracking-[-2px]"
          style={{ lineHeight: '65px' }}
        >
          News
        </h1>
        <p className="font-pretendard font-normal text-white text-[20px] leading-[1.4] max-w-[451px]">
          이노팸의 주요 소식과 언론보도 내용을 전합니다.
        </p>
      </div>
    </section>
  );
}
