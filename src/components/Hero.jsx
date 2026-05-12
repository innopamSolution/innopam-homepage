// Figma node: 159:2199 (Hero)
// Text frame 161:2643 — x=64, y=205, w=795, h=232 within hero
//   Title 161:2640 — Space Grotesk Bold, 48px, line-height 1.2, center
//   Desc  161:2642 — Pretendard Regular, 22px, line-height 1.4, center
//   Gap between title and desc: 38px
// Background: video loop (Sequence 02_2.mp4)

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] md:h-[706px] bg-[#1c193f] overflow-hidden">
      {/* Background video — autoplay, muted, loop */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={`${BASE}hero-bg.mp4`}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/20" />

      {/* Text content — responsive: centered on mobile, centered on all */}
      <div className="absolute z-10 flex flex-col items-center text-center text-white inset-0 justify-center px-6 md:px-[120px]">
        <div className="flex flex-col items-center w-full max-w-[795px]" style={{ gap: "38px" }}>
          {/* Title */}
          <h1
            className="font-space font-bold text-white w-full text-[34px] md:text-[48px] text-center"
            style={{ lineHeight: "1.2" }}
          >
            Innovation Platform
            <br />
            For AI &amp; Mapping
          </h1>

          {/* Description */}
          <p
            className="font-pretendard font-normal text-white w-full text-[17px] md:text-[22px] text-center"
            style={{ lineHeight: "1.7" }}
          >
            AI와 공간정보, 드론, 빅데이터 기술을 통해<span className="hidden md:inline"><br /></span>{' '}
            도시·농업·재난 등 다양한 환경의 변화를 분석하고<span className="hidden md:inline"><br /></span>{' '}
            예측부터 실행까지 연결합니다
          </p>
        </div>
      </div>
    </section>
  );
}
