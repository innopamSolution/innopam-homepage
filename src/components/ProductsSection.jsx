// Figma node: 170:1518 (Products section)
// GeoX logo 242:2098 — w=136.638px, h=38.408px
import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';

export default function ProductsSection() {
  return (
    <section id="products" className="relative w-full h-[500px] md:h-[638px] overflow-hidden">
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
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-[38px] text-center px-6">
        <SectionLabel text="Products" light />

        <div className="flex flex-col gap-[4px] items-center w-full max-w-[794px]">
          <p className="font-pretendard font-bold text-[48px] text-white leading-[65px] tracking-[-2px] text-center w-full">
            공간정보 기술과 인공지능의 융합
          </p>
          <div className="flex items-center gap-[10px]">
            <img
              src={asset('assets/geox-logo-new.svg')}
              alt="GeoX"
              style={{ width: "136.638px", height: "38.408px" }}
            />
            <p className="font-pretendard font-black text-[48px] text-white leading-[65px] tracking-[-2px]">
              Series
            </p>
          </div>
        </div>

        <p className="font-pretendard font-normal text-[20px] text-white leading-[1.4] max-w-[794px] text-center">
          GeoX는 '공간(Geo)'과 '확장(eXpansion)'의 의미를 담고 있으며, 이노팸이 개발한 공간지능정보(GeoAI) 기반의
          '차세대 미래지향 GeoX 플랫폼 솔루션 서비스' 시리즈입니다.
        </p>

        <a
          href="/innopam-homepage/products"
          className="brand-gradient inline-flex items-center text-white font-pretendard font-bold text-[14px] tracking-[1.3px] px-[54px] py-[15px] rounded-full hover:opacity-90 transition-opacity"
        >
          자세히보기
        </a>
      </div>
    </section>
  );
}
