// News Page — Figma node 183:3759
// Data: innopam.com/media/ (8 articles)
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';
import { asset } from '../utils/asset';

const newsItems = [
  {
    id: 1,
    date: 'Oct 28, 2024',
    category: '언론보도',
    title: "[건설기술] 도시계획 재난·안전 개발제한구역 '모니터링' 신속 정확한 공간정보 분석 기대",
    image: asset('assets/news/20241028.jpg'),
    link: 'https://www.ctman.kr/31971',
  },
  {
    id: 2,
    date: 'Feb 9, 2023',
    category: '언론보도',
    title: "[매일건설신문] AI 분석으로 문제 해결… '플랫폼 솔루션 서비스 기업' 될 것",
    image: asset('assets/news/20230209.jpeg'),
    link: 'https://mcnews.co.kr/77976',
  },
  {
    id: 3,
    date: 'Feb 15, 2023',
    category: '언론보도',
    title: "[공학저널] 12시간 비행하는 '태양광 드론', 인공지능 더해 산불까지 예방",
    image: asset('assets/news/20210215.jpeg'),
    link: 'http://www.engjournal.co.kr/news/articleView.html?idxno=1310',
  },
  {
    id: 4,
    date: 'Sep 10, 2020',
    category: '언론보도',
    title: '[한겨레] 제주 해양은 드론이 지킨다…제주 해안선 147㎞ 비행 성공',
    image: asset('assets/news/20200910.jpeg'),
    link: 'https://www.hani.co.kr/arti/area/jeju/961625.html',
  },
  {
    id: 5,
    date: 'Sep 10, 2020',
    category: '언론보도',
    title: "[뉴시스] 제주 '드론'이 괭생이 모자반 위치도 분석시대 돌입",
    image: asset('assets/news/202009102.jpeg'),
    link: 'https://newsis.com/view/?id=NISX20200910_0001161175',
  },
  {
    id: 6,
    date: 'Dec 16, 2020',
    category: '언론보도',
    title: '[중앙일보] [미래를 선도하는 제주] 수소드론·자율주행차 가속 … 제주, 신산업의 메카로 뜬다',
    image: asset('assets/news/20201216.jpeg'),
    link: 'https://www.joongang.co.kr/article/23946581',
  },
  {
    id: 7,
    date: 'Dec 9, 2018',
    category: '언론보도',
    title: '[연합뉴스] LG유플러스, 드론 활용해 사회기반시설 정밀점검 시연',
    image: asset('assets/news/20181209.jpeg'),
    link: 'https://www.yna.co.kr/view/AKR20181207152600017',
  },
  {
    id: 8,
    date: 'Oct 7, 2018',
    category: '언론보도',
    title: '[아시아경제] 서울시, 1인칭 시점 동영상지도·드론맵핑 개발 지원…중소기업 돕는다',
    image: asset('assets/news/20181007.jpeg'),
    link: 'https://www.asiae.co.kr/article/2018100707572000522',
  },
];

// 아이콘: 캘린더
function IconCalendar() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="2.5" width="13" height="11.5" rx="1.5" stroke="#6d758f" strokeWidth="1.2"/>
      <line x1="1" y1="5.5" x2="14" y2="5.5" stroke="#6d758f" strokeWidth="1.2"/>
      <line x1="4.5" y1="1" x2="4.5" y2="4" stroke="#6d758f" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10.5" y1="1" x2="10.5" y2="4" stroke="#6d758f" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

// 아이콘: 태그
function IconTag() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1.5 1.5H7.5L13.5 7.5L7.5 13.5L1.5 7.5V1.5Z" stroke="#6d758f" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="4.5" cy="4.5" r="1" fill="#6d758f"/>
    </svg>
  );
}

// 아이콘: 외부링크
function IconExternal() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6.5 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9.5" stroke="#4262ff" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M9 2h5v5" stroke="#4262ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="14" y1="2" x2="7.5" y2="8.5" stroke="#4262ff" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

export default function NewsPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="pt-[84px]">

        {/* Hero */}
        <section
          className="relative w-full h-[320px] md:h-[440px] overflow-hidden flex items-center justify-center"
          style={{ background: '#0b1225' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 60%, rgba(44,41,86,0.85) 0%, rgba(9,33,65,0.95) 100%)',
            }}
          />
          <div className="relative z-10 flex flex-col items-center text-center gap-[20px] px-6">
            <SectionLabel text="News" light />
            <h1 className="font-space font-light text-white text-[36px] md:text-[56px] tracking-[2px] uppercase">
              NEWS
            </h1>
            <p className="font-pretendard font-normal text-white text-[15px] md:text-[18px] leading-[1.6] opacity-80 max-w-[600px]">
              공공기관 및 지자체와 함께 진행한 GeoAI 기반 주요 프로젝트 사례입니다.
            </p>
          </div>
        </section>

        {/* Articles */}
        <section className="w-full px-6 md:px-[88px] py-[80px] md:py-[120px]">
          <div className="flex flex-col gap-[60px] md:gap-[80px] w-full max-w-[1104px] mx-auto">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 justify-between border-b border-[#e9e9e9] pb-[60px] md:pb-[80px] last:border-0 last:pb-0"
              >
                {/* 썸네일 */}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-[461px] md:h-[286px] rounded-[8px] overflow-hidden shrink-0 block"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-left-top hover:scale-105 transition-transform duration-300"
                  />
                </a>

                {/* 텍스트 */}
                <div className="flex flex-col w-full md:w-[509px]">
                  {/* 날짜 · 카테고리 */}
                  <div className="flex items-center gap-[18px] mb-6">
                    <div className="flex items-center gap-1.5 text-[#6d758f] text-[15px] font-inter">
                      <IconCalendar />
                      <span>{item.date}</span>
                    </div>
                    <span className="w-[23px] h-px bg-[#6d758f] shrink-0" />
                    <div className="flex items-center gap-1.5 text-[#6d758f] text-[15px] font-inter">
                      <IconTag />
                      <span>{item.category}</span>
                    </div>
                  </div>

                  {/* 제목 */}
                  <h2 className="font-inter font-semibold text-[20px] md:text-[28px] leading-[1.35] text-[#3a343b] mb-8">
                    {item.title}
                  </h2>

                  {/* 기사 보기 */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#4262ff] text-[14px] font-pretendard font-medium hover:gap-3 transition-all duration-200"
                  >
                    기사 보기
                    <IconExternal />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
