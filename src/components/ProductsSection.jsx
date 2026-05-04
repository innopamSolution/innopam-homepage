// Figma node: 170:1518 (Products section)
// GeoX logo 242:2098 — w=136.638px, h=38.408px
import SectionLabel from './SectionLabel';
import { asset } from '../utils/asset';

const imgBg = asset('assets/products-bg.jpg');

export default function ProductsSection() {
  return (
    <section id="products" className="relative w-full h-[500px] md:h-[638px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={imgBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1440 638' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.5'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(1.282e-14 33.756 -76.189 -5.716e-8 713 286.63)'><stop stop-color='rgba(11,18,37,1)' offset='0'/><stop stop-color='rgba(10,24,61,1)' offset='0.3913'/><stop stop-color='rgba(10,30,86,1)' offset='0.78261'/><stop stop-color='rgba(12,21,46,1)' offset='0.999'/></radialGradient></defs></svg>\")",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-[38px] text-center px-6">
        {/* Section label with Figma arrow01.svg icon */}
        <SectionLabel text="Products" light />

        <div className="flex flex-col gap-1 items-center">
          <p className="font-pretendard font-bold text-[32px] md:text-[48px] text-white leading-[1.3] md:leading-[65px] tracking-[-2px]">
            공간정보 기술과 인공지능의 융합
          </p>
          <div className="flex items-center gap-2.5">
            {/* GeoX logo */}
            <img
              src={asset('assets/geox-logo.svg')}
              alt="GeoX"
              style={{ width: "136.64px", height: "38.41px" }}
            />
            <p className="font-pretendard font-black text-[32px] md:text-[48px] text-white leading-[1.3] md:leading-[65px] tracking-[-2px]">
              Series
            </p>
          </div>
        </div>

        <p className="font-pretendard text-[16px] md:text-[20px] text-white leading-[1.4] max-w-[795px] text-center">
          GeoX는 '공간(Geo)'과 '확장(eXpansion)'의 의미를 담고 있으며, 이노팸이 개발한 공간지능정보(GeoAI) 기반의
          '차세대 미래지향 GeoX 플랫폼 솔루션 서비스' 시리즈입니다.
        </p>

        <button className="brand-gradient text-white font-pretendard font-bold text-[14px] tracking-[1.3px] px-[54px] py-4 rounded-full hover:opacity-90 transition-opacity">
          자세히보기
        </button>
      </div>
    </section>
  );
}
