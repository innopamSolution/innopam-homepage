// Figma node: 183:3535 (Clients section)
import { asset } from '../utils/asset';
const imgLogo1 = asset('assets/client-logo1.svg');
const imgLogo2 = asset('assets/client-logo2.svg');
const imgLogo3 = asset('assets/client-logo3.svg');
const imgKiast = asset('assets/client-kiast.png');
const imgUos = asset('assets/client-uos.png');
const imgNdmri = asset('assets/client-ndmri.png');

const clients = [
  { src: imgLogo1, alt: "Client Logo 1", width: 103 },
  { src: imgLogo2, alt: "Client Logo 2", width: 179 },
  { src: imgLogo3, alt: "Client Logo 3", width: 157 },
  { src: imgKiast, alt: "KIAST", width: 116 },
  { src: imgUos, alt: "UOS", width: 247 },
  { src: imgNdmri, alt: "NDMRI", width: 209 },
];

const clientRows = [
  [
    { src: imgLogo1, alt: "Client Logo 1", width: 103 },
    { src: imgLogo2, alt: "Client Logo 2", width: 179 },
    { src: imgLogo3, alt: "Client Logo 3", width: 157 },
  ],
  [
    { src: imgKiast, alt: "KIAST", width: 116 },
    { src: imgUos, alt: "UOS", width: 247 },
    { src: imgNdmri, alt: "NDMRI", width: 209 },
  ],
];

export default function ClientsSection() {
  return (
    <section className="bg-[#f8f8f8] flex flex-col gap-[60px] lg:gap-[120px] items-center px-4 md:px-[88px] py-[60px] lg:py-[100px]">
      {/* Header */}
      <div className="flex flex-col items-center text-center leading-none max-w-[803px]">
        <h2 className="section-title font-space font-light text-[40px] text-black mb-3">
          Clients
        </h2>
        <p className="font-pretendard text-[16px] text-[#444] leading-[1.4]">
          이노팸의 공공기관 및 지자체 파트너
        </p>
      </div>

      {/* Mobile: 2-column grid */}
      <div className="grid grid-cols-2 gap-8 w-full md:hidden">
        {clients.map((logo) => (
          <div key={logo.alt} className="flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 w-auto object-contain"
              style={{ maxWidth: logo.width }}
            />
          </div>
        ))}
      </div>

      {/* Desktop: rows layout */}
      <div className="hidden md:flex flex-col gap-[58px]">
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
