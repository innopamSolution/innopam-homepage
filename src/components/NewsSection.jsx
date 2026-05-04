// Figma node: 183:3759 (NEWS section)
import SectionLabel from './SectionLabel';
const imgNews1 = "/assets/news1.jpg";
const imgNews2 = "/assets/news2.jpg";
const imgCalendar = "/assets/icon-calendar.png";
const imgTag = "/assets/icon-tag.png";
const imgExternal = "/assets/icon-external.png";

const newsItems = [
  {
    id: 1,
    date: "Jan 28, 2024",
    category: "언론보도",
    title:
      "[건설기술] 도시계획 재난·안전 개발제한구역 '모니터링' 신속 정확한 공간정보 분석 기대",
    image: imgNews1,
    link: "#",
  },
  {
    id: 2,
    date: "Jan 28, 2024",
    category: "언론보도",
    title:
      "[매일건설신문] AI 분석'으로 문제 해결… '플랫폼 솔루션 서비스 기업' 될 것",
    image: imgNews2,
    link: "#",
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="bg-white flex flex-col gap-[60px] lg:gap-[120px] items-center px-4 md:px-[88px] py-[60px] lg:py-[100px]">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-[803px]">
        <SectionLabel text="News" />
        <h2 className="section-title mt-4 mb-3">NEWS</h2>
        <p className="font-pretendard text-[16px] text-[#444] leading-[1.4]">
          공공기관 및 지자체와 함께 진행한 GeoAI 기반 주요 프로젝트 사례입니다.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-12 w-full max-w-[1104px]">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0"
          >
            {/* Image — full width on mobile, fixed on desktop */}
            <div className="w-full h-[200px] md:w-[461px] md:h-[286px] rounded-[8px] shadow-card overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-[8px]"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col w-full md:w-[509px]">
              {/* Meta */}
              <div className="flex items-center gap-[18px] mb-6">
                <div className="flex items-center gap-1.5 text-[#6d758f] text-[16px] font-inter">
                  <img src={imgCalendar} alt="" className="w-[15px] h-[15px]" />
                  <span>{item.date}</span>
                </div>
                <span className="w-[23px] h-px bg-[#6d758f]" />
                <div className="flex items-center gap-1.5 text-[#6d758f] text-[16px] font-inter">
                  <img src={imgTag} alt="" className="w-[15px] h-[15px]" />
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-inter font-semibold text-[20px] md:text-[30px] leading-[1.3] md:leading-[36px] text-[#6d758f] mb-8">
                {item.title}
              </h3>

              {/* CTA */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#4262ff] text-[14px] font-pretendard"
              >
                기사 보기
                <img src={imgExternal} alt="" className="w-[18px] h-[18px]" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
