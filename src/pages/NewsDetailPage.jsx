import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { newsItems } from '../data/news';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = newsItems.find(n => n.id === Number(id));

  if (!item || item.category !== '이노팸 소식') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-pretendard text-[#6d758f]">게시물을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const sameCategory = newsItems.filter(n => n.category === '이노팸 소식');
  const idx = sameCategory.findIndex(n => n.id === item.id);
  const prevItem = idx > 0 ? sameCategory[idx - 1] : null;
  const nextItem = idx < sameCategory.length - 1 ? sameCategory[idx + 1] : null;

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="pt-[84px]">

        {/* 상단 히어로 */}
        <section className="w-full bg-[#f4f7fa] px-6 md:px-[88px] py-[60px] md:py-[80px]">
          <div className="max-w-[860px] mx-auto flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 font-pretendard font-bold text-[13px] text-[#4262ff] tracking-[1px] uppercase">
              이노팸 소식
            </span>
            <h1
              className="font-pretendard font-bold text-[#1a1a2e] text-[28px] md:text-[38px] tracking-[-1px]"
              style={{ lineHeight: 1.4 }}
            >
              {item.title}
            </h1>
            <p className="font-inter text-[#6d758f] text-[15px]">{item.date}</p>
          </div>
        </section>

        {/* 대표 이미지 */}
        <div className="w-full max-w-[860px] mx-auto px-6 md:px-0 mt-[48px]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full rounded-[8px] object-cover"
            style={{ maxHeight: '480px', objectPosition: 'center' }}
          />
        </div>

        {/* 본문 */}
        <article className="w-full max-w-[860px] mx-auto px-6 md:px-0 py-[60px] flex flex-col gap-8">
          {item.content.map((block, i) => {
            if (block.type === 'text') {
              return (
                <p
                  key={i}
                  className="font-pretendard font-normal text-[#3a343b] text-[17px] md:text-[18px]"
                  style={{ lineHeight: 1.9 }}
                >
                  {block.value}
                </p>
              );
            }
            if (block.type === 'image') {
              return (
                <figure key={i} className="flex flex-col gap-3">
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="w-full rounded-[8px] object-cover"
                    style={{ maxHeight: '400px' }}
                  />
                  {block.caption && (
                    <figcaption className="font-pretendard text-[#6d758f] text-[14px] text-center">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return null;
          })}
        </article>

        {/* 구분선 */}
        <div className="w-full max-w-[860px] mx-auto px-6 md:px-0">
          <div className="h-px bg-[#e9e9e9]" />
        </div>

        {/* 이전글 / 다음글 */}
        <nav className="w-full max-w-[860px] mx-auto px-6 md:px-0 py-[40px] flex flex-col gap-0">
          {nextItem && (
            <Link
              to={`/news/${nextItem.id}`}
              className="flex items-start gap-4 py-5 border-b border-[#e9e9e9] hover:bg-[#f9f9fb] transition-colors px-4 -mx-4 rounded-[4px]"
            >
              <span className="font-pretendard font-bold text-[13px] text-[#4262ff] shrink-0 mt-0.5 w-12">다음글</span>
              <span className="font-pretendard text-[16px] text-[#3a343b] leading-[1.5]">{nextItem.title}</span>
            </Link>
          )}
          {prevItem && (
            <Link
              to={`/news/${prevItem.id}`}
              className="flex items-start gap-4 py-5 border-b border-[#e9e9e9] hover:bg-[#f9f9fb] transition-colors px-4 -mx-4 rounded-[4px]"
            >
              <span className="font-pretendard font-bold text-[13px] text-[#6d758f] shrink-0 mt-0.5 w-12">이전글</span>
              <span className="font-pretendard text-[16px] text-[#3a343b] leading-[1.5]">{prevItem.title}</span>
            </Link>
          )}
        </nav>

        {/* 목록 버튼 */}
        <div className="w-full max-w-[860px] mx-auto px-6 md:px-0 pb-[120px] flex justify-center">
          <button
            onClick={() => navigate('/news')}
            className="font-pretendard font-bold text-[14px] text-[#3a343b] border border-[#d0d0d8] px-[40px] py-[14px] rounded-full hover:border-[#4262ff] hover:text-[#4262ff] transition-colors"
          >
            목록으로
          </button>
        </div>

      </main>
      <Footer />
    </div>
  );
}
