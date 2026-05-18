// Figma node: 183:3535 (Clients section)
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';
import { useLanguage } from '../i18n/LanguageContext';

const imgLogo1  = asset('assets/client-logo1.svg');
const imgLogo2  = asset('assets/client-logo2.svg');
const imgLogo3  = asset('assets/client-logo3.svg');
const imgKiast  = asset('assets/client-kiast.png');
const imgUos    = asset('assets/client-uos.png');
const imgNdmri  = asset('assets/client-ndmri.png');
const imgSba    = asset('assets/client-sba.png');
const imgDaelim = asset('assets/client-daelim.png');
const imgKwater = asset('assets/client-kwater.png');

const clients = [
  { src: imgLogo1,  alt: "제주특별자치도",   width: 82 },
  { src: imgLogo2,  alt: "아산시",           width: 143 },
  { src: imgLogo3,  alt: "서울특별시",        width: 126 },
  { src: imgKiast,  alt: "KAIST",            width: 93 },
  { src: imgUos,    alt: "서울시립대학교",    width: 198 },
  { src: imgNdmri,  alt: "국립재난안전연구원", width: 167 },
  { src: imgSba,    alt: "SBA 서울산업진흥원", width: 112 },
  { src: imgDaelim, alt: "대림",              width: 96 },
  { src: imgKwater, alt: "K-water",           width: 112 },
];

const clientRows = [
  clients.slice(0, 3),
  clients.slice(3, 6),
  clients.slice(6, 9),
];

export default function ClientsSection() {
  const headerRef = useFadeUp(0.1, 'up');
  const logosRef  = useFadeUp(0.05, 'stagger');
  const { t } = useLanguage();

  return (
    <section className="bg-[#f8f8f8] flex flex-col gap-[60px] lg:gap-[120px] items-center px-4 md:px-[88px] py-[60px] lg:py-[100px]">
      {/* Header */}
      <div ref={headerRef.ref} className={`flex flex-col items-center text-center leading-none max-w-[803px] ${headerRef.className}`}>
        <h2 className="section-title font-space font-light text-[40px] text-black mb-3">
          Clients
        </h2>
        <p className="font-pretendard text-[16px] text-[#444] leading-[1.4]">
          {t('이노팸의 공공기관 및 지자체 파트너', "Innopam's public institution and local government partners")}
        </p>
      </div>

      {/* Mobile: 3-column grid */}
      <div className="grid grid-cols-3 gap-4 w-full md:hidden">
        {clients.map((logo) => (
          <div key={logo.alt} className="flex items-center justify-center p-1">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-6 w-auto object-contain"
              style={{ maxWidth: '80px' }}
            />
          </div>
        ))}
      </div>

      {/* Desktop: 3 rows × 3 columns */}
      <div ref={logosRef.ref} className={`hidden md:flex flex-col gap-[68px] ${logosRef.className}`}>
        {clientRows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex items-center justify-between w-[1104px]"
          >
            {row.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-10 w-auto object-contain"
                style={{ maxWidth: logo.width }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
