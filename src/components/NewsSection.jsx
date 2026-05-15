// Figma node: 183:3759 (NEWS section)
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from './SectionLabel';
import { fetchNews } from '../lib/supabase';
import { newsItems as localNewsItems } from '../data/news';
import { useFadeUp } from '../utils/useFadeUp';

const TABS = ['All', '이노팸 소식', '언론보도'];

function IconCalendar() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="13" height="11.5" rx="1.5" stroke="#6d758f" strokeWidth="1.2"/>
      <line x1="1" y1="5.5" x2="14" y2="5.5" stroke="#6d758f" strokeWidth="1.2"/>
      <line x1="4.5" y1="1" x2="4.5" y2="4" stroke="#6d758f" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="10.5" y1="1" x2="10.5" y2="4" stroke="#6d758f" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function IconTag() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M1.5 1.5H7.5L13.5 7.5L7.5 13.5L1.5 7.5V1.5Z" stroke="#6d758f" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="4.5" cy="4.5" r="1" fill="#6d758f"/>
    </svg>
  );
}

function IconExternal() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M7.5 3.75H3.75A1.5 1.5 0 002.25 5.25v9A1.5 1.5 0 003.75 15.75h9a1.5 1.5 0 001.5-1.5V10.5" stroke="#4262ff" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M10.5 2.25h5.25v5.25" stroke="#4262ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="15.75" y1="2.25" x2="8.25" y2="9.75" stroke="#4262ff" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="#4262ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState('All');
  const [allNews, setAllNews] = useState(localNewsItems);
  const headerRef  = useFadeUp(0.1, 'up');
  const tabsRef    = useFadeUp(0.08, 'up');
  const cardsRef   = useFadeUp(0.05, 'stagger');

  useEffect(() => {
    fetchNews()
      .then(data => { if (data?.length) setAllNews(data); })
      .catch(() => {});
  }, []);

  const filtered = (activeTab === 'All'
    ? allNews
    : allNews.filter(item => item.category === activeTab)
  ).slice(0, 3);

  return (
    <section id="news" className="bg-white flex flex-col gap-[60px] lg:gap-[120px] items-center px-4 md:px-[88px] py-[60px] lg:py-[100px]">

      {/* Header */}
      <div ref={headerRef.ref} className={`flex flex-col items-center text-center max-w-[803px] ${headerRef.className}`}>
        <SectionLabel text="News" />
        <h2 className="font-space font-light text-[32px] md:text-[40px] leading-[48px] text-black mt-4 mb-3">
          이노팸 소식과 언론보도
        </h2>
        <p className="font-pretendard text-[16px] text-[#444] leading-[1.4]">
          이노팸의 최근 소식과 언론보도 내용을 전합니다.
        </p>
      </div>

      {/* Tabs + 더 보기 */}
      <div ref={tabsRef.ref} className={`flex flex-col gap-[40px] items-center w-full max-w-[1104px] ${tabsRef.className}`}>
        {/* 모바일: 탭 + 더보기 세로 배치 / 데스크탑: 가로 배치 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 w-full">
          {/* 필터 탭 */}
          <div className="flex gap-[6px] md:gap-[8px] items-center">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-[16px] md:px-[36px] py-[10px] md:py-[16px] rounded-full text-[12px] md:text-[14px] font-pretendard font-semibold border transition-colors ${
                  activeTab === tab
                    ? 'bg-[#f1f3fd] border-[#f2f2f2] text-[#3d485b]'
                    : 'bg-white border-[#f2f2f2] text-[#3a343b] hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 더 보기 */}
          <Link
            to="/news"
            className="flex items-center gap-[5px] text-[#4262ff] text-[13px] md:text-[14px] font-pretendard hover:opacity-70 transition-opacity self-start md:self-auto"
          >
            더 보기 <IconArrow />
          </Link>
        </div>

        {/* Cards */}
        <div ref={cardsRef.ref} className={`flex flex-col gap-[48px] w-full ${cardsRef.className}`}>
          {filtered.length === 0 ? (
            <p className="font-pretendard text-[#6d758f] text-[16px] text-center py-12">
              해당 카테고리의 소식이 없습니다.
            </p>
          ) : filtered.map((item) => (
            <article
              key={item.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0"
            >
              {/* Image */}
              <div className="w-full h-[200px] md:w-[350px] md:h-[218px] rounded-[8px] overflow-hidden shrink-0"
                style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.15)' }}>
                <img
                  src={item.image_url || item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col items-start w-full md:w-[697px]">
                {/* Meta */}
                <div className="flex items-center gap-[18px] mb-6">
                  <div className="flex items-center gap-[6px] text-[#6d758f] text-[16px] font-pretendard">
                    <IconCalendar />
                    <span>{item.date}</span>
                  </div>
                  <span className="w-[23px] h-px bg-[#6d758f] shrink-0" />
                  <div className="flex items-center gap-[6px] text-[#6d758f] text-[16px] font-pretendard">
                    <IconTag />
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-pretendard font-semibold text-[20px] md:text-[30px] leading-[1.3] md:leading-[36px] text-[#3a343b] mb-8 w-full">
                  {item.title}
                </h3>

                {/* CTA */}
                {item.category === '이노팸 소식' ? (
                  <Link
                    to={`/news/${item.id}`}
                    className="flex items-center gap-[5px] text-[#4262ff] text-[14px] font-pretendard hover:opacity-70 transition-opacity"
                  >
                    자세히 보기 <IconArrow />
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[5px] text-[#4262ff] text-[14px] font-pretendard hover:opacity-70 transition-opacity"
                  >
                    기사 보기 <IconExternal />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
