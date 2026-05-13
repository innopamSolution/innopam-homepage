import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsHero from '../components/NewsHero';
import { asset } from '../utils/asset';
import { fetchNewsById, fetchNews } from '../lib/supabase';
import { newsItems as localNewsItems } from '../data/news';

function IconBack() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15.5 5L8.5 12L15.5 19" stroke="#3a343b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconNext() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8.5 5L15.5 12L8.5 19" stroke="#3a343b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [prevItem, setPrevItem] = useState(null);
  const [nextItem, setNextItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const numId = Number(id);
    // Supabase 시도, 실패시 로컬 fallback
    fetchNewsById(numId)
      .then(async data => {
        setItem(data);
        // 이전/다음 글
        const all = await fetchNews().catch(() => localNewsItems);
        const same = all.filter(n => n.category === '이노팸 소식');
        const idx = same.findIndex(n => n.id === data.id);
        setPrevItem(idx > 0 ? same[idx - 1] : null);
        setNextItem(idx < same.length - 1 ? same[idx + 1] : null);
      })
      .catch(() => {
        // 로컬 fallback
        const local = localNewsItems.find(n => n.id === numId);
        setItem(local || null);
        if (local) {
          const same = localNewsItems.filter(n => n.category === '이노팸 소식');
          const idx = same.findIndex(n => n.id === numId);
          setPrevItem(idx > 0 ? same[idx - 1] : null);
          setNextItem(idx < same.length - 1 ? same[idx + 1] : null);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-pretendard text-[#6d758f]">불러오는 중...</p>
      </div>
    );
  }

  if (!item || item.category !== '이노팸 소식') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-pretendard text-[#6d758f]">게시물을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="pt-[84px]">

        <NewsHero />

        <div className="flex flex-col gap-[80px] items-center px-6 md:px-[88px] pt-[120px] pb-[200px]">

          {/* 목록 버튼 */}
          <div className="w-full max-w-[1264px]">
            <button
              onClick={() => navigate('/news')}
              className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
            >
              <IconBack />
              <span className="font-pretendard font-bold text-[#3a343b] text-[20px] tracking-[-1.2px]">
                목록
              </span>
            </button>
          </div>

          {/* 제목 헤더 영역 */}
          <div className="w-full max-w-[1264px] flex flex-col items-start pb-[40px] border-b border-[#e9e9e9]">
            {/* 카테고리 */}
            <span className="font-pretendard font-bold text-[#4262ff] text-[14px] leading-[24px] mb-1">
              이노팸 소식
            </span>
            {/* 제목 */}
            <h1
              className="font-pretendard font-semibold text-[#3a343b] text-[30px] w-full mb-8"
              style={{ lineHeight: '36px' }}
            >
              {item.title}
            </h1>
            {/* 날짜 */}
            <p className="font-pretendard font-normal text-[#6d758f] text-[16px]" style={{ lineHeight: '22px' }}>
              {item.date}
            </p>
          </div>

          {/* 본문 콘텐츠 */}
          <div className="w-full max-w-[1264px] flex flex-col gap-[50px] items-center pb-[40px] border-b border-[#e9e9e9]">
            {item.content.map((block, i) => {
              if (block.type === 'text') {
                return (
                  <p
                    key={i}
                    className="font-pretendard text-[#3a343b] text-[20px] w-full"
                    style={{ fontWeight: 500, lineHeight: '36px' }}
                  >
                    {block.value}
                  </p>
                );
              }
              if (block.type === 'image') {
                const imgSrc = block.src || block.image_url || '';
                return (
                  <div key={i} className="w-full flex flex-col items-center gap-4">
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt={block.alt || ''}
                        className="w-full object-cover rounded-[4px]"
                        style={{ maxWidth: '1000px', maxHeight: '750px' }}
                      />
                    )}
                    {block.caption && (
                      <p className="font-pretendard text-[#6d758f] text-[14px] text-center">
                        {block.caption}
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* 이전 / 다음 네비게이션 */}
          <div className="w-full max-w-[1264px] flex items-center justify-between h-[58px]">
            {prevItem ? (
              <Link
                to={`/news/${prevItem.id}`}
                className="flex items-center gap-[10px] hover:opacity-70 transition-opacity"
              >
                <IconBack />
                <span className="font-pretendard font-bold text-[#3a343b] text-[20px] tracking-[-1.2px]">
                  이전글
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextItem ? (
              <Link
                to={`/news/${nextItem.id}`}
                className="flex items-center gap-[10px] hover:opacity-70 transition-opacity"
              >
                <span className="font-pretendard font-bold text-[#3a343b] text-[20px] tracking-[-1.2px]">
                  다음글
                </span>
                <IconNext />
              </Link>
            ) : (
              <div />
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
