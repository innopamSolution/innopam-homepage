// Figma node: 163:2647 (Frame 19 — stats bar)
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';
const imgBgPattern = asset('assets/stats-bg-pattern.png');

const stats = [
  { label: "GeoAI 연구", value: "10년+", suffix: "" },
  { label: "산업분야", value: "7개+", suffix: "" },
  { label: "AI모델 보유", value: "30개+", suffix: "" },
  { label: "프로젝트 수행", value: "100개+", suffix: "" },
];

export default function StatsSection() {
  const { ref, className } = useFadeUp(0.1, 'stagger');
  return (
    <section className="relative bg-[#eef1ff] py-[57px] px-6 md:px-[147px]">
      {/* Subtle bg pattern */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <img src={imgBgPattern} alt="" className="w-full h-full object-cover" />
      </div>

      <div ref={ref} className={`relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:flex md:justify-center md:gap-[190px] items-center ${className}`}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-4 md:gap-8 items-center text-center text-[#5871ed] min-w-0 md:min-w-[140px]"
          >
            <p className="font-pretendard font-medium text-[16px] md:text-[20px] leading-[1.4] md:leading-[40px]">
              {stat.label}
            </p>
            <p className="font-pretendard font-black text-[36px] md:text-[48px] leading-[40px] whitespace-nowrap">
              {stat.value}
              <span className="font-medium">{stat.suffix}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
