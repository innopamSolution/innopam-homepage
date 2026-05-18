// News Page — Figma node 183:3759 / 434:146
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsHero from '../components/NewsHero';
import { fetchNews } from '../lib/supabase';
import { newsItems as localNewsItems } from '../data/news';
import { useLanguage } from '../i18n/LanguageContext';

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

function NewsCard({ item, t }) {
  const isInternal = item.category === '이노팸 소식';
  const imgSrc = item.image_url || item.image;

  const WrapperLink = ({ children, className }) => isInternal
    ? <Link to={`/news/${item.id}`} className={className}>{children}</Link>
    : <a href={item.link} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;

  const linkEl = isInternal ? (
    <Link to={`/news/${item.id}`} className="flex items-center gap-[5px] text-[#4262ff] text-[14px] font-pretendard hover:opacity-70 transition-opacity mt-auto pt-4">
      {t('자세히 보기', 'Read More')} <IconArrow />
    </Link>
  ) : (
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[5px] text-[#4262ff] text-[14px] font-pretendard hover:opacity-70 transition-opacity mt-auto pt-4">
      {t('기사 보기', 'View Article')} <IconExternal />
    </a>
  );

  return (
    <>
      {/* ── 모바일 카드 ── */}
      <article className="md:hidden bg-white rounded-2xl overflow-hidden border border-gray-100"
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
        <WrapperLink className="block">
          <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <img
              src={imgSrc}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </WrapperLink>
        <div className="flex flex-col p-5 gap-3">
          <div className="flex items-center gap-3">
            <span className={`text-[11px] font-pretendard font-bold px-2 py-0.5 rounded-full ${isInternal ? 'bg-blue-50 text-[#4262ff]' : 'bg-gray-100 text-[#6d758f]'}`}>
              {item.category}
            </span>
            <span className="text-[#6d758f] text-[13px] font-pretendard">{item.date}</span>
          </div>
          <WrapperLink className="block">
            <h2 className="font-pretendard font-semibold text-[#3a343b] text-[17px] leading-[1.5] line-clamp-3">
              {item.title}
            </h2>
          </WrapperLink>
          {linkEl}
        </div>
      </article>

      {/* ── 데스크탑 가로형 ── */}
      <article className="hidden md:flex flex-row items-center justify-between gap-0 w-full">
        <WrapperLink className="shrink-0 w-[461px] h-[286px] rounded-[8px] overflow-hidden block"
          style={{ boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.15)' }}>
          <img
            src={imgSrc}
            alt={item.title}
            className="w-full h-full object-cover object-left-top hover:scale-105 transition-transform duration-300"
          />
        </WrapperLink>
        <div className="flex flex-col items-start w-[697px]">
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
          {isInternal ? (
            <Link to={`/news/${item.id}`} className="hover:text-[#4262ff] transition-colors">
              <h2 className="font-pretendard font-semibold text-[#3a343b] w-full mb-8" style={{ fontSize: '30px', lineHeight: '36px' }}>
                {item.title}
              </h2>
            </Link>
          ) : (
            <h2 className="font-pretendard font-semibold text-[#3a343b] w-full mb-8" style={{ fontSize: '30px', lineHeight: '36px' }}>
              {item.title}
            </h2>
          )}
          {linkEl}
        </div>
      </article>
    </>
  );
}

export default function NewsPage() {
  const { t } = useLanguage();
  const TABS = ['All', t('이노팸 소식', 'Innopam News'), t('언론보도', 'Press Coverage')];

  const [activeTab, setActiveTab] = useState('All');
  const [page, setPage] = useState(1);
  const [newsItems, setNewsItems] = useState(localNewsItems);

  // Supabase에서 뉴스 로드
  useEffect(() => {
    fetchNews()
      .then(data => { if (data?.length) { setNewsItems(data); } })
      .catch(() => {});
  }, []);

  // Reset tab on language switch
  useEffect(() => {
    setActiveTab('All');
    setPage(1);
  }, [t]);

  const filtered = activeTab === 'All'
    ? newsItems
    : newsItems.filter(item =>
        (item.category === '이노팸 소식' && activeTab === t('이노팸 소식', 'Innopam News')) ||
        (item.category === '언론보도' && activeTab === t('언론보도', 'Press Coverage'))
      );

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

        <NewsHero />

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
            <div className="flex flex-col gap-5 md:gap-[50px] w-full">
              {paged.length === 0 ? (
                <p className="font-pretendard text-[#6d758f] text-[18px] text-center py-20">
                  {t('해당 카테고리의 소식이 없습니다.', 'No news available in this category.')}
                </p>
              ) : paged.map(item => (
                <NewsCard key={item.id} item={item} t={t} />
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
