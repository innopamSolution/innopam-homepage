// Figma node: 163:2647 (Frame 19 — stats bar)
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';
import { useLanguage } from '../i18n/LanguageContext';

const imgBgPattern = asset('assets/stats-bg-pattern.png');

export default function StatsSection() {
  const { ref, className } = useFadeUp(0.1, 'stagger');
  const { t } = useLanguage();

  // Figma: 숫자 + 단위(년/개) + 별도 medium weight "+"
  const stats = [
    { label: t('GeoAI 연구', 'GeoAI Research'), num: '10', unit: t('년', ' Yrs') },
    { label: t('산업분야', 'Industries'),        num: '7',  unit: t('개', '') },
    { label: t('AI모델 보유', 'AI Models'),      num: '30', unit: t('개', '') },
    { label: t('프로젝트 수행', 'Projects'),      num: '30', unit: t('개', '') },
  ];

  return (
    <section className="relative bg-[#eef1ff] py-[48px] px-6 md:px-[147px]">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none overflow-hidden" aria-hidden="true">
        <img src={imgBgPattern} alt="" className="w-full h-full object-cover" />
      </div>

      <div ref={ref} className={`relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:flex md:justify-center md:gap-[190px] items-center ${className}`}>
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-[20px] md:gap-[32px] items-center text-center text-[#5871ed] min-w-0 md:min-w-[140px]">
            {/* 라벨 */}
            <p className="font-pretendard font-medium text-[14px] md:text-[20px] leading-[1.4] md:leading-[40px]">
              {stat.label}
            </p>
            {/* 숫자 + 단위 + + */}
            <p className="font-pretendard font-black text-[32px] md:text-[48px] leading-[40px] whitespace-nowrap">
              {stat.num}
              <span className="font-medium">{stat.unit} </span>
              <span className="font-medium">+</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
