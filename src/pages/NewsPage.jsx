// News Page — Figma node 183:3759 / 434:146
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';
import { newsItems } from '../data/news';

const TABS = ['All', '이노팸 소식', '언론보도'];
const PER_PAGE = 10;

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

function IconTag() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1.5 1.5H7.5L13.5 7.5L7.5 13.5L1.5 7.5V1.5Z" stroke="#6d758f" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="4.5" cy="4.5" r="1" fill="#6d758f"/>
    </svg>
  );
}

function IconExternal() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.5 3.75H3.75A1.5 1.5 0 002.25 5.25v9A1.5 1.5 0 003.75 15.75h9a1.5 1.5 0 001.5-1.5V10.5" stroke="#4262ff" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M10.5 2.25h5.25v5.25" stroke="#4262ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="15.75" y1="2.25" x2="8.25" y2="9.75" stroke="#4262ff" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="#4262ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function NewsCard({ item }) {
  const isInternal = item.category === '이노팸 소식';

  const thumbnail = isInternal ? (
    <Link
      to={`/news/${item.id}`}
      className="shrink-0 w-full md:w-[461px] md:h-[286px] rounded-[8px] overflow-hidden block"
      style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.15)' }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover object-left-top hover:scale-105 transition-transform duration-300"
      />
    </Link>
  ) : (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 w-full md:w-[461px] md:h-[286px] rounded-[8px] overflow-hidden block"
      style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.15)' }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover object-left-top hover:scale-105 transition-transform duration-300"
      />
    </a>
  );

  const linkEl = isInternal ? (
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
  );

  const titleEl = isInternal ? (
    <Link to={`/news/${item.id}`} className="hover:text-[#4262ff] transition-colors">
      <h2 className="font-pretendard font-semibold text-[#3a343b] w-full mb-8" style={{ fontSize: '30px', lineHeight: '36px' }}>
        {item.title}
      </h2>
    </Link>
  ) : (
    <h2 className="font-pretendard font-semibold text-[#3a343b] w-full mb-8" style={{ fontSize: '30px', lineHeight: '36px' }}>
      {item.title}
    </h2>
  );

  return (
    <article className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0 w-full">
      {thumbnail}
      <div className="flex flex-col items-start w-full md:w-[697px]">
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
        {titleEl}
        {linkEl}
      </div>
    </article>
  );
}

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = activeTab === 'All'
    ? newsItems
    : newsItems.filter(item => item.category === activeTab);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleTab(tab) {
    setActiveTab(tab);
    setPage(1);
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="pt-[84px]">

        {/* Hero */}
        <section className="relative w-full h-[400px] overflow-hidden flex items-center justify-center bg-[#1a1008]">
          <img
            src="/innopam-homepage/assets/news-hero-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ objectPosition: '50% 63%' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
          <div className="relative z-10 flex flex-col items-center text-center gap-[20px] px-6">
            <SectionLabel text="News" light />
            <h1 className="font-pretendard font-bold text-white text-[48px] tracking-[-2px]" style={{ lineHeight: '65px' }}>
              News
            </h1>
            <p className="font-pretendard font-normal text-white text-[18px] leading-[1.6] opacity-80 max-w-[600px]">
              이노팸의 주요 소식과 언론보도 내용을 전합니다.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="w-full px-6 md:px-[88px] pt-[120px] pb-[200px]">
          <div className="flex flex-col gap-[80px] items-center w-full max-w-[1264px] mx-auto">

            {/* Tabs */}
            <div className="flex gap-[40px] items-start w-full">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTab(tab)}
                  className="font-pretendard font-bold text-[28px] md:text-[38px] tracking-[-1.2px] leading-[48px] transition-opacity"
                  style={{ color: '#3a343b', opacity: activeTab === tab ? 1 : 0.28 }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Articles */}
            <div className="flex flex-col gap-[50px] w-full">
              {paged.length === 0 ? (
                <p className="font-pretendard text-[#6d758f] text-[18px] text-center py-20">
                  해당 카테고리의 소식이 없습니다.
                </p>
              ) : paged.map(item => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e9e9e9] text-[#6d758f] hover:border-[#4262ff] hover:text-[#4262ff] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className="w-10 h-10 flex items-center justify-center rounded-full font-pretendard font-bold text-[15px] transition-colors"
                    style={{
                      background: page === n ? 'linear-gradient(27.5deg,#4262FF 0%,#03C7FD 50%,#4262FF 100%)' : 'transparent',
                      color: page === n ? '#fff' : '#3a343b',
                      border: page === n ? 'none' : '1px solid #e9e9e9',
                    }}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e9e9e9] text-[#6d758f] hover:border-[#4262ff] hover:text-[#4262ff] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            )}

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
