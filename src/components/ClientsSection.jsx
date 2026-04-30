// Figma node: 183:3535 (Clients section)
const imgLogo1 = "https://www.figma.com/api/mcp/asset/f235800c-82ff-4102-a37f-b9453e1463bb";
const imgLogo2 = "https://www.figma.com/api/mcp/asset/3d1bb66f-5fc1-42b6-9df4-a299640ed4ee";
const imgLogo3 = "https://www.figma.com/api/mcp/asset/c5befc78-d9ad-4883-887f-4d762c375b61";
const imgKiast = "https://www.figma.com/api/mcp/asset/0c23fe6e-6e6e-4953-8559-91c372c8d306";
const imgUos = "https://www.figma.com/api/mcp/asset/d9a9e659-5990-4b56-b1b6-fd129514295b";
const imgNdmri = "https://www.figma.com/api/mcp/asset/28d33673-48ca-4eb5-8f9a-5a4428b8e016";

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
