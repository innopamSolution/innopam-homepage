// Figma node: 170:1518 (Products section)
// GeoX logo 242:2098 — w=136.638px, h=38.408px
import { Link } from 'react-router-dom';
import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';

export default function ProductsSection() {
  const { ref, className } = useFadeUp(0.1, 'up');
  return (
    <section id="products" className="relative w-full h-[480px] md:h-[638px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={asset('assets/products-bg-new.jpg')}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-[rgba(11,18,37,0.5)]" />
      </div>

      {/* Content */}
      <div ref={ref} className={`relative z-10 flex flex-col items-center justify-center h-full gap-[20px] md:gap-[38px] text-center px-6 ${className}`}>
        <SectionLabel text="Products" light />

        <div className="flex flex-col gap-[4px] items-center w-full max-w-[794px]">
          <p className="font-pretendard font-bold text-[26px] md:text-[48px] text-white leading-[1.3] md:leading-[65px] tracking-[-1px] md:tracking-[-2px] text-center w-full">
            공간정보 기술과 인공지능의 융합
          </p>
          <div className="flex items-center gap-[8px] md:gap-[10px]">
            <img
              src={asset('assets/geox-logo-new.svg')}
              alt="GeoX"
              className="w-[90px] h-[25px] md:w-[137px] md:h-[38px]"
            />
            <p className="font-pretendard font-black text-[26px] md:text-[48px] text-white leading-[1.3] md:leading-[65px] tracking-[-1px] md:tracking-[-2px]">
              Series
            </p>
          </div>
        </div>

        <p className="font-pretendard font-normal text-[14px] md:text-[20px] text-white leading-[1.6] md:leading-[1.4] max-w-[794px] text-center px-2">
          GeoX는 '공간(Geo)'과 '확장(eXpansion)'의 의미를 담고 있으며, 이노팸이 개발한 공간지능정보(GeoAI) 기반의
          '차세대 미래지향 GeoX 플랫폼 솔루션 서비스' 시리즈입니다.
        </p>

        <Link
          to="/products"
          className="brand-gradient inline-flex items-center text-white font-pretendard font-bold text-[13px] md:text-[14px] tracking-[1.3px] px-[36px] md:px-[54px] py-[12px] md:py-[15px] rounded-full hover:opacity-90 transition-opacity"
        >
          자세히보기
        </Link>
      </div>
    </section>
  );
}
