import { useState, useEffect, useRef } from 'react';
import { fetchNews, saveNews, deleteNews, uploadImage } from '../lib/supabase';

const CATEGORIES = ['이노팸 소식', '언론보도'];

const emptyForm = {
  id: null,
  category: '이노팸 소식',
  title: '',
  date: new Date().toISOString().slice(0, 10),
  image_url: '',
  link: '',
  content: [],
  published: true,
};

// ── 본문 블록 에디터 ──────────────────────────────────────────────
function BlockEditor({ blocks, onChange }) {
  const addText = () => onChange([...blocks, { type: 'text', value: '' }]);
  const addImage = () => onChange([...blocks, { type: 'image', src: '', alt: '', caption: '' }]);
  const remove = (i) => onChange(blocks.filter((_, idx) => idx !== i));
  const update = (i, key, val) => {
    const next = blocks.map((b, idx) => idx === i ? { ...b, [key]: val } : b);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">{block.type}</span>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">✕ 삭제</button>
          </div>
          {block.type === 'text' && (
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm resize-y min-h-[80px]"
              placeholder="본문 텍스트"
              value={block.value}
              onChange={e => update(i, 'value', e.target.value)}
            />
          )}
          {block.type === 'image' && (
            <div className="flex flex-col gap-2">
              <input className="border border-gray-300 rounded p-2 text-sm" placeholder="이미지 URL" value={block.src} onChange={e => update(i, 'src', e.target.value)} />
              <input className="border border-gray-300 rounded p-2 text-sm" placeholder="alt 텍스트" value={block.alt} onChange={e => update(i, 'alt', e.target.value)} />
              <input className="border border-gray-300 rounded p-2 text-sm" placeholder="캡션 (선택)" value={block.caption} onChange={e => update(i, 'caption', e.target.value)} />
              {block.src && <img src={block.src} alt="" className="h-32 object-cover rounded mt-1" />}
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={addText} className="flex-1 border-2 border-dashed border-gray-300 rounded-lg py-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">+ 텍스트 블록</button>
        <button onClick={addImage} className="flex-1 border-2 border-dashed border-gray-300 rounded-lg py-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">+ 이미지 블록</button>
      </div>
    </div>
  );
}

// ── 메인 관리자 페이지 ────────────────────────────────────────────
export default function AdminPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState('list'); // 'list' | 'form'
  const fileRef = useRef();

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchNews();
      setNewsList(data);
    } catch (e) {
      setMsg('❌ 불러오기 실패: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setField('image_url', url);
      setMsg('✅ 이미지 업로드 완료');
    } catch (err) {
      setMsg('❌ 업로드 실패: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      category: item.category,
      title: item.title,
      date: item.date,
      image_url: item.image_url || '',
      link: item.link || '',
      content: item.content || [],
      published: item.published,
    });
    setEditing(true);
    setTab('form');
    window.scrollTo(0, 0);
  };

  const handleNew = () => {
    setForm(emptyForm);
    setEditing(false);
    setTab('form');
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteNews(id);
      setMsg('✅ 삭제 완료');
      load();
    } catch (e) {
      setMsg('❌ 삭제 실패: ' + e.message);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setMsg('❌ 제목을 입력하세요'); return; }
    if (!form.date) { setMsg('❌ 날짜를 입력하세요'); return; }
    setSaving(true);
    setMsg('');
    try {
      const payload = {
        ...(form.id ? { id: form.id } : {}),
        category: form.category,
        title: form.title.trim(),
        date: form.date,
        image_url: form.image_url || null,
        link: form.category === '언론보도' ? (form.link || null) : null,
        content: form.category === '이노팸 소식' ? form.content : null,
        published: form.published,
      };
      await saveNews(payload);
      setMsg('✅ 저장 완료');
      load();
      setTab('list');
    } catch (e) {
      setMsg('❌ 저장 실패: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#45469A] text-xl">INNOPAM</span>
          <span className="text-gray-400">|</span>
          <span className="font-semibold text-gray-700">뉴스 관리</span>
        </div>
        <a href="/innopam-homepage/news" target="_blank" className="text-sm text-blue-500 hover:underline">사이트 보기 →</a>
      </header>

      <div className="max-w-[900px] mx-auto px-6 py-8">

        {/* 알림 */}
        {msg && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${msg.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {msg}
            <button onClick={() => setMsg('')} className="ml-2 opacity-60 hover:opacity-100">✕</button>
          </div>
        )}

        {/* 탭 */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
          <button
            onClick={() => setTab('list')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'list' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
          >
            목록
          </button>
          <button
            onClick={handleNew}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'form' && !editing ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
          >
            + 새 글
          </button>
        </div>

        {/* 목록 */}
        {tab === 'list' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="text-center py-16 text-gray-400">불러오는 중...</div>
            ) : newsList.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg mb-2">등록된 뉴스가 없습니다</p>
                <button onClick={handleNew} className="text-blue-500 hover:underline text-sm">첫 번째 글 작성하기</button>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium">카테고리</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium">제목</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium w-[100px]">날짜</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium w-[60px]">공개</th>
                    <th className="px-4 py-3 w-[100px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {newsList.map((item, i) => (
                    <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.category === '이노팸 소식' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-800 font-medium max-w-[320px] truncate">{item.title}</td>
                      <td className="px-4 py-3 text-gray-500">{item.date}</td>
                      <td className="px-4 py-3">
                        <span className={`w-2 h-2 rounded-full inline-block ${item.published ? 'bg-green-400' : 'bg-gray-300'}`} />
                      </td>
                      <td className="px-4 py-3 flex gap-2 justify-end">
                        <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 font-medium">수정</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 font-medium">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* 작성/수정 폼 */}
        {tab === 'form' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-5">
            <h2 className="font-bold text-lg text-gray-800">{editing ? '뉴스 수정' : '새 뉴스 작성'}</h2>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1.5">카테고리 *</label>
              <div className="flex gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setField('category', cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${form.category === cat ? 'bg-[#45469A] text-white border-[#45469A]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#45469A]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 제목 */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1.5">제목 *</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#45469A]"
                placeholder="뉴스 제목을 입력하세요"
                value={form.title}
                onChange={e => setField('title', e.target.value)}
              />
            </div>

            {/* 날짜 */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1.5">날짜 *</label>
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#45469A]"
                value={form.date}
                onChange={e => setField('date', e.target.value)}
              />
            </div>

            {/* 대표 이미지 */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1.5">대표 이미지</label>
              <div className="flex gap-2 items-start">
                <input
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#45469A]"
                  placeholder="이미지 URL 직접 입력 또는 업로드"
                  value={form.image_url}
                  onChange={e => setField('image_url', e.target.value)}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm hover:bg-gray-200 whitespace-nowrap disabled:opacity-50"
                >
                  {uploading ? '업로드 중...' : '파일 업로드'}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
              {form.image_url && (
                <img src={form.image_url} alt="" className="mt-2 h-32 object-cover rounded-lg border border-gray-200" />
              )}
            </div>

            {/* 언론보도 - 외부 링크 */}
            {form.category === '언론보도' && (
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">기사 링크 URL</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#45469A]"
                  placeholder="https://..."
                  value={form.link}
                  onChange={e => setField('link', e.target.value)}
                />
              </div>
            )}

            {/* 이노팸 소식 - 본문 블록 */}
            {form.category === '이노팸 소식' && (
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">본문</label>
                <BlockEditor
                  blocks={form.content}
                  onChange={blocks => setField('content', blocks)}
                />
              </div>
            )}

            {/* 공개 여부 */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-600">공개 여부</label>
              <button
                onClick={() => setField('published', !form.published)}
                className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-[#45469A]' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm text-gray-500">{form.published ? '공개' : '비공개'}</span>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-[#45469A] text-white rounded-lg text-sm font-bold hover:bg-[#3535a0] disabled:opacity-50 transition-colors"
              >
                {saving ? '저장 중...' : editing ? '수정 완료' : '등록'}
              </button>
              <button
                onClick={() => { setTab('list'); setMsg(''); }}
                className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
