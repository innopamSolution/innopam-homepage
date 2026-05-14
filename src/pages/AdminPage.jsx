import { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { fetchNews, saveNews, deleteNews, uploadImage, signIn, signOut, getSession, fetchDemoRequests, updateDemoStatus, deleteDemoRequest, fetchHistory, saveHistory, deleteHistory, fetchBusinessRecords, saveBusinessRecord, deleteBusinessRecord, fetchIpRights, saveIpRight, deleteIpRight } from '../lib/supabase';

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

// ── 블록 내 이미지 업로드 ─────────────────────────────────────────
function BlockImageUpload({ src, onSrc }) {
  const ref = useRef();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onSrc(url);
    } catch (e) {
      alert('업로드 실패: ' + e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => !uploading && ref.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        className={`border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors
          ${uploading ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-[#45469A] hover:bg-gray-50'}
          ${src ? 'p-1' : 'py-6'}`}
      >
        {uploading ? (
          <div className="py-4 flex items-center gap-2 text-blue-500 text-sm">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            업로드 중...
          </div>
        ) : src ? (
          <div className="relative w-full">
            <img src={src} alt="" className="w-full max-h-40 object-cover rounded" />
            <button onClick={e => { e.stopPropagation(); onSrc(''); }} className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full text-xs flex items-center justify-center">✕</button>
          </div>
        ) : (
          <p className="text-xs text-gray-400">클릭 또는 드래그로 이미지 업로드</p>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={e => handleFile(e.target.files[0])} />
      <input className="w-full border border-gray-200 rounded p-1.5 text-xs text-gray-400 mt-1 bg-gray-50"
        placeholder="또는 URL 직접 입력" value={src} onChange={e => onSrc(e.target.value)} />
    </div>
  );
}

// ── 본문 블록 에디터 ──────────────────────────────────────────────
function BlockEditor({ blocks, onChange }) {
  const addText  = () => onChange([...blocks, { type: 'text', value: '' }]);
  const addImage = () => onChange([...blocks, { type: 'image', src: '', alt: '', caption: '' }]);
  const remove   = (i) => onChange(blocks.filter((_, idx) => idx !== i));
  const update   = (i, key, val) => onChange(blocks.map((b, idx) => idx === i ? { ...b, [key]: val } : b));

  const moveUp   = (i) => {
    if (i === 0) return;
    const next = [...blocks];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onChange(next);
  };
  const moveDown = (i) => {
    if (i === blocks.length - 1) return;
    const next = [...blocks];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, i) => (
        <div key={i} className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
          {/* 블록 헤더 */}
          <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              {/* 순서 이동 버튼 */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="w-6 h-5 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  title="위로"
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M5 1L1 7h8L5 1z" fill="currentColor"/>
                  </svg>
                </button>
                <button
                  onClick={() => moveDown(i)}
                  disabled={i === blocks.length - 1}
                  className="w-6 h-5 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  title="아래로"
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M5 7L9 1H1l4 6z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              {/* 블록 번호 + 타입 */}
              <span className="text-xs text-gray-400 font-mono">{i + 1}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                block.type === 'text'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-purple-50 text-purple-600'
              }`}>
                {block.type === 'text' ? '텍스트' : '이미지'}
              </span>
            </div>
            <button
              onClick={() => remove(i)}
              className="text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors"
            >
              삭제
            </button>
          </div>

          {/* 블록 내용 */}
          <div className="p-3">
            {block.type === 'text' && (
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm resize-y min-h-[100px] focus:outline-none focus:border-[#45469A]"
                placeholder="본문 텍스트를 입력하세요"
                value={block.value}
                onChange={e => update(i, 'value', e.target.value)}
              />
            )}
            {block.type === 'image' && (
              <div className="flex flex-col gap-2">
                <BlockImageUpload src={block.src} onSrc={val => update(i, 'src', val)} />
                <input className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#45469A]" placeholder="alt 텍스트 (접근성)" value={block.alt} onChange={e => update(i, 'alt', e.target.value)} />
                <input className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#45469A]" placeholder="캡션 (선택)" value={block.caption} onChange={e => update(i, 'caption', e.target.value)} />
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-1">
        <button onClick={addText}  className="flex-1 border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-colors font-medium">
          + 텍스트 블록
        </button>
        <button onClick={addImage} className="flex-1 border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-500 hover:border-purple-400 hover:text-purple-500 hover:bg-purple-50 transition-colors font-medium">
          + 이미지 블록
        </button>
      </div>
    </div>
  );
}

// ── 로그인 화면 ───────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await signIn(email, password);
      onLogin();
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <span className="font-bold text-[#45469A] text-2xl tracking-tight">INNOPAM</span>
          <p className="text-gray-500 text-sm mt-1">관리자 로그인</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-4 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">이메일</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#45469A]"
              placeholder="admin@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">비밀번호</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#45469A]"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#45469A] text-white rounded-lg font-bold text-sm hover:bg-[#3535a0] disabled:opacity-50 transition-colors mt-2"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── 메인 관리자 페이지 ────────────────────────────────────────────
export default function AdminPage() {
  const [session, setSession] = useState(undefined); // undefined=loading, null=없음
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState('list'); // 'list' | 'form' | 'requests' | 'history'
  const [requests, setRequests] = useState([]);
  const [reqLoading, setReqLoading] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const fileRef = useRef();

  const bizXlsxRef = useRef();
  const ipXlsxRef = useRef();

  // ── 실적 state ──
  const [bizRecords, setBizRecords] = useState([]);
  const [bizLoading, setBizLoading] = useState(false);
  const [bizForm, setBizForm] = useState({ id: null, year: '', name: '', client: '', content: '', sort_order: 0 });
  const [bizEditing, setBizEditing] = useState(false);
  const [bizSaving, setBizSaving] = useState(false);
  const [bizMsg, setBizMsg] = useState('');
  const [bizSubTab, setBizSubTab] = useState('records'); // 'records' | 'ip'
  const [ipList, setIpList] = useState([]);
  const [ipForm, setIpForm] = useState({ id: null, type: '특허', title: '', date: '', number: '', sort_order: 0 });
  const [ipEditing, setIpEditing] = useState(false);
  const [ipSaving, setIpSaving] = useState(false);
  const [ipMsg, setIpMsg] = useState('');

  // ── 연혁 state ──
  const [historyList, setHistoryList] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyForm, setHistoryForm] = useState({ id: null, year: '', month: '', text: '', sort_order: 0 });
  const [historyEditing, setHistoryEditing] = useState(false);
  const [historySaving, setHistorySaving] = useState(false);
  const [historyMsg, setHistoryMsg] = useState('');

  // 세션 확인
  useEffect(() => {
    getSession().then(s => setSession(s ?? null));
  }, []);

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

  const loadRequests = async () => {
    setReqLoading(true);
    try { setRequests(await fetchDemoRequests()); }
    catch (e) { console.error('demo_requests 로드 실패:', e); }
    finally { setReqLoading(false); }
  };

  // ── 실적 함수 ──
  const loadBiz = async () => {
    setBizLoading(true);
    try {
      const [rec, ip] = await Promise.all([fetchBusinessRecords(), fetchIpRights()]);
      setBizRecords(rec);
      setIpList(ip);
    } catch (e) { setBizMsg('❌ ' + e.message); }
    finally { setBizLoading(false); }
  };

  const handleBizSubmit = async (e) => {
    e.preventDefault();
    if (!bizForm.year || !bizForm.name) return setBizMsg('연도와 과제명을 입력하세요.');
    setBizSaving(true);
    try {
      await saveBusinessRecord(bizForm);
      await loadBiz();
      setBizForm({ id: null, year: '', name: '', client: '', content: '', sort_order: bizRecords.length + 1 });
      setBizEditing(false);
      setBizMsg('✅ 저장 완료');
    } catch (e) { setBizMsg('❌ ' + e.message); }
    finally { setBizSaving(false); }
  };

  // ── 엑셀 다운로드 ──
  const downloadBizExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      bizRecords.map(r => ({ 연도: r.year, 과제명: r.name, 발주처: r.client, 사업내용: r.content, 정렬순서: r.sort_order }))
    );
    ws['!cols'] = [{ wch: 8 }, { wch: 60 }, { wch: 25 }, { wch: 30 }, { wch: 8 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '주요사업수행실적');
    XLSX.writeFile(wb, `이노팸_주요사업수행실적_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const downloadIpExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      ipList.map(r => ({ 유형: r.type, 제목: r.title, 등록일: r.date, 등록번호: r.number, 정렬순서: r.sort_order }))
    );
    ws['!cols'] = [{ wch: 12 }, { wch: 60 }, { wch: 12 }, { wch: 20 }, { wch: 8 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '지적재산권');
    XLSX.writeFile(wb, `이노팸_지적재산권_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // ── 엑셀 업로드 ──
  const uploadBizExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    setBizMsg('📤 업로드 중...');
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws);
      if (!rows.length) return setBizMsg('❌ 데이터가 없습니다.');
      let order = bizRecords.length + 1;
      for (const row of rows) {
        await saveBusinessRecord({
          year:       String(row['연도'] ?? row['year'] ?? ''),
          name:       String(row['과제명'] ?? row['name'] ?? ''),
          client:     String(row['발주처'] ?? row['client'] ?? ''),
          content:    String(row['사업내용'] ?? row['content'] ?? ''),
          sort_order: Number(row['정렬순서'] ?? row['sort_order'] ?? order++),
        });
      }
      await loadBiz();
      setBizMsg(`✅ ${rows.length}건 업로드 완료`);
    } catch (err) { setBizMsg('❌ ' + err.message); }
  };

  const uploadIpExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    setIpMsg('📤 업로드 중...');
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws);
      if (!rows.length) return setIpMsg('❌ 데이터가 없습니다.');
      let order = ipList.length + 1;
      for (const row of rows) {
        await saveIpRight({
          type:       String(row['유형'] ?? row['type'] ?? '특허'),
          title:      String(row['제목'] ?? row['title'] ?? ''),
          date:       String(row['등록일'] ?? row['date'] ?? ''),
          number:     String(row['등록번호'] ?? row['number'] ?? ''),
          sort_order: Number(row['정렬순서'] ?? row['sort_order'] ?? order++),
        });
      }
      await loadBiz();
      setIpMsg(`✅ ${rows.length}건 업로드 완료`);
    } catch (err) { setIpMsg('❌ ' + err.message); }
  };

  const handleIpSubmit = async (e) => {
    e.preventDefault();
    if (!ipForm.title || !ipForm.date) return setIpMsg('제목과 등록일을 입력하세요.');
    setIpSaving(true);
    try {
      await saveIpRight(ipForm);
      await loadBiz();
      setIpForm({ id: null, type: '특허', title: '', date: '', number: '', sort_order: ipList.length + 1 });
      setIpEditing(false);
      setIpMsg('✅ 저장 완료');
    } catch (e) { setIpMsg('❌ ' + e.message); }
    finally { setIpSaving(false); }
  };

  // ── 연혁 함수 ──
  const loadHistory = async () => {
    setHistoryLoading(true);
    try { setHistoryList(await fetchHistory()); }
    catch (e) { setHistoryMsg('❌ ' + e.message); }
    finally { setHistoryLoading(false); }
  };

  const handleHistorySubmit = async (e) => {
    e.preventDefault();
    if (!historyForm.year || !historyForm.text) return setHistoryMsg('연도와 내용을 입력하세요.');
    setHistorySaving(true);
    try {
      await saveHistory(historyForm);
      await loadHistory();
      setHistoryForm({ id: null, year: '', month: '', text: '', sort_order: historyList.length + 1 });
      setHistoryEditing(false);
      setHistoryMsg('✅ 저장 완료');
    } catch (e) { setHistoryMsg('❌ ' + e.message); }
    finally { setHistorySaving(false); }
  };

  const handleHistoryEdit = (item) => {
    setHistoryForm(item);
    setHistoryEditing(true);
    setHistoryMsg('');
  };

  const handleHistoryDelete = async (id) => {
    if (!confirm('삭제하시겠습니까?')) return;
    try { await deleteHistory(id); await loadHistory(); setHistoryMsg('✅ 삭제 완료'); }
    catch (e) { setHistoryMsg('❌ ' + e.message); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateDemoStatus(id, status);
      setRequests(r => r.map(req => req.id === id ? { ...req, status } : req));
      setSelectedReq(prev => prev?.id === id ? { ...prev, status } : prev);
    } catch (e) { console.error(e); }
  };

  const handleDeleteRequest = async (id) => {
    if (!confirm('이 신청을 삭제하시겠습니까?')) return;
    try {
      await deleteDemoRequest(id);
      // DB 삭제 성공 후에만 UI 업데이트
      setRequests(r => r.filter(req => req.id !== id));
      if (selectedReq?.id === id) setSelectedReq(null);
      setMsg('✅ 삭제 완료');
    } catch (e) {
      setMsg('❌ 삭제 실패: ' + e.message);
    }
  };

  useEffect(() => {
    if (session) { load(); loadRequests(); }
  }, [session]);

  const handleLogout = async () => {
    await signOut();
    setSession(null);
  };

  // 세션 로딩 중
  if (session === undefined) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">...</div>;
  }

  // 미로그인
  if (!session) {
    return <LoginScreen onLogin={() => getSession().then(s => setSession(s))} />;
  }

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
      <header className="bg-white border-b border-gray-200 px-6 sticky top-0 z-10">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#45469A] text-xl">INNOPAM</span>
            <span className="text-gray-400">|</span>
            <span className="font-semibold text-gray-700">관리자</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden md:block">{session?.user?.email}</span>
            <a href="#/news" target="_blank" className="text-sm text-blue-500 hover:underline">사이트 보기 →</a>
            <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 transition-colors">로그아웃</button>
          </div>
        </div>
        {/* 탭 네비게이션 */}
        <div className="flex gap-6">
          <button
            onClick={() => { if (tab === 'requests') setTab('list'); }}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${tab !== 'requests' ? 'border-[#45469A] text-[#45469A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            뉴스 관리
          </button>
          <button
            onClick={() => { setTab('requests'); loadRequests(); }}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${tab === 'requests' ? 'border-[#45469A] text-[#45469A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            데모 신청
            {requests.filter(r => r.status === 'new').length > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {requests.filter(r => r.status === 'new').length}
              </span>
            )}
          </button>
          <button
            onClick={() => { setTab('history'); loadHistory(); }}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${tab === 'history' ? 'border-[#45469A] text-[#45469A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            연혁 관리
          </button>
          <button
            onClick={() => { setTab('biz'); loadBiz(); }}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${tab === 'biz' ? 'border-[#45469A] text-[#45469A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            실적 관리
          </button>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-6 py-8">

        {/* 알림 */}
        {msg && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${msg.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {msg}
            <button onClick={() => setMsg('')} className="ml-2 opacity-60 hover:opacity-100">✕</button>
          </div>
        )}

        {/* 뉴스 관리 서브탭 */}
        {tab !== 'requests' && (
          <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
            <button onClick={() => setTab('list')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'list' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}>
              목록
            </button>
            <button onClick={handleNew}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'form' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}>
              + 새 글
            </button>
          </div>
        )}

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
              {/* 드래그앤드롭 / 클릭 업로드 영역 */}
              <div
                onClick={() => !uploading && fileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={async e => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const syntheticEvent = { target: { files: [file] } };
                    await handleImageUpload(syntheticEvent);
                  }
                }}
                className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors
                  ${uploading ? 'border-blue-300 bg-blue-50 cursor-wait' : 'border-gray-300 hover:border-[#45469A] hover:bg-gray-50'}
                  ${form.image_url ? 'p-2' : 'py-10'}`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2 py-6">
                    <div className="w-8 h-8 border-4 border-[#45469A] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-blue-500 font-medium">업로드 중...</p>
                  </div>
                ) : form.image_url ? (
                  <div className="relative w-full">
                    <img src={form.image_url} alt="" className="w-full max-h-48 object-cover rounded-lg" />
                    <button
                      onClick={e => { e.stopPropagation(); setField('image_url', ''); }}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center text-sm hover:bg-black/70"
                    >✕</button>
                    <p className="text-xs text-gray-400 text-center mt-2">클릭하여 이미지 변경</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 pointer-events-none">
                    <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <p className="text-sm font-medium text-gray-500">클릭하거나 파일을 여기에 드래그하세요</p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF, WEBP 지원</p>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              {/* URL 직접 입력 */}
              <div className="mt-2">
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 focus:outline-none focus:border-[#45469A] bg-gray-50"
                  placeholder="또는 이미지 URL 직접 입력"
                  value={form.image_url}
                  onChange={e => setField('image_url', e.target.value)}
                />
              </div>
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

        {/* ── 데모 신청 목록 ── */}
        {tab === 'requests' && (
          <div className="flex gap-4 items-start">
            {/* 목록 */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {reqLoading ? (
                <div className="text-center py-16 text-gray-400">불러오는 중...</div>
              ) : requests.length === 0 ? (
                <div className="text-center py-16 text-gray-400">신청 내역이 없습니다.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {requests.map(req => (
                    <div
                      key={req.id}
                      className={`flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors ${selectedReq?.id === req.id ? 'bg-blue-50' : ''}`}
                    >
                      <button
                        onClick={() => setSelectedReq(req)}
                        className="flex-1 text-left flex items-start gap-3 min-w-0"
                      >
                        <span className={`shrink-0 mt-0.5 w-2 h-2 rounded-full ${req.status === 'new' ? 'bg-red-400' : req.status === 'replied' ? 'bg-green-400' : 'bg-gray-300'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-sm text-gray-800 truncate">{req.name}</span>
                            {req.company && <span className="text-xs text-gray-400 truncate">{req.company}</span>}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{req.product || req.inquiry_type || '문의'}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{req.created_at?.slice(0,10)}</p>
                        </div>
                        <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          req.status === 'new' ? 'bg-red-50 text-red-500' :
                          req.status === 'replied' ? 'bg-green-50 text-green-600' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {req.status === 'new' ? '신규' : req.status === 'checked' ? '확인' : '답변완료'}
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(req.id)}
                        className="shrink-0 w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1.75 3.5h10.5M5.25 3.5V2.333a.583.583 0 01.583-.583h2.334a.583.583 0 01.583.583V3.5M11.083 3.5l-.583 7.583a.583.583 0 01-.583.584H4.083a.583.583 0 01-.583-.584L2.917 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 상세 */}
            {selectedReq && (
              <div className="w-[360px] shrink-0 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 sticky top-20">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 text-[15px]">신청 상세</h3>
                  <button onClick={() => setSelectedReq(null)} className="text-gray-400 hover:text-gray-600 text-lg">×</button>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  {[
                    ['이름', selectedReq.name],
                    ['회사', selectedReq.company],
                    ['직책', selectedReq.position],
                    ['이메일', selectedReq.email],
                    ['연락처', selectedReq.phone],
                    ['관심 제품', selectedReq.product],
                    ['문의 유형', selectedReq.inquiry_type],
                  ].map(([label, val]) => val ? (
                    <div key={label} className="flex gap-3">
                      <span className="text-gray-400 w-16 shrink-0">{label}</span>
                      <span className="text-gray-800 font-medium break-all">{val}</span>
                    </div>
                  ) : null)}

                  {selectedReq.message && (
                    <div className="bg-gray-50 rounded-xl p-3 mt-1">
                      <p className="text-gray-400 text-xs mb-1">문의 내용</p>
                      <p className="text-gray-700 text-[13px] leading-relaxed whitespace-pre-wrap">{selectedReq.message}</p>
                    </div>
                  )}
                </div>

                {/* 상태 변경 */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  {[['new','신규','bg-red-100 text-red-600'],['checked','확인','bg-gray-100 text-gray-600'],['replied','답변완료','bg-green-100 text-green-700']].map(([val, label, cls]) => (
                    <button
                      key={val}
                      onClick={() => handleStatusChange(selectedReq.id, val)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-opacity ${cls} ${selectedReq.status === val ? 'opacity-100 ring-2 ring-offset-1 ring-current' : 'opacity-50 hover:opacity-80'}`}
                    >{label}</button>
                  ))}
                </div>

                {/* 이메일 바로가기 */}
                {selectedReq.email && (
                  <a
                    href={`mailto:${selectedReq.email}?subject=[이노팸] 데모 신청 답변&body=안녕하세요 ${selectedReq.name}님,`}
                    className="w-full py-2.5 bg-[#45469A] text-white text-sm font-bold rounded-xl text-center hover:bg-[#3535a0] transition-colors block"
                  >
                    ✉ 이메일 답변하기
                  </a>
                )}

                {/* 삭제 */}
                <button
                  onClick={() => handleDeleteRequest(selectedReq.id)}
                  className="w-full py-2.5 border border-red-200 text-red-400 text-sm font-bold rounded-xl text-center hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  🗑 신청 삭제
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── 연혁 관리 탭 ── */}
        {tab === 'history' && (
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-lg text-gray-800">연혁 관리</h2>

            {/* 메시지 */}
            {historyMsg && (
              <p className={`text-sm px-4 py-2 rounded-lg ${historyMsg.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {historyMsg}
              </p>
            )}

            {/* 추가/수정 폼 */}
            <form onSubmit={handleHistorySubmit} className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-3 border border-gray-100">
              <p className="text-sm font-bold text-gray-700">{historyEditing ? '✏️ 수정 중' : '➕ 새 연혁 추가'}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">연도 *</label>
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    placeholder="예) 2025"
                    value={historyForm.year}
                    onChange={e => setHistoryForm(f => ({ ...f, year: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">월 (없으면 —)</label>
                  <input
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    placeholder="예) 06 또는 —"
                    value={historyForm.month}
                    onChange={e => setHistoryForm(f => ({ ...f, month: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">내용 *</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="예) 벤처기업 인증(중소벤처기업부)"
                  value={historyForm.text}
                  onChange={e => setHistoryForm(f => ({ ...f, text: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">정렬 순서 (숫자 작을수록 위)</label>
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  value={historyForm.sort_order}
                  onChange={e => setHistoryForm(f => ({ ...f, sort_order: Number(e.target.value) }))}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={historySaving}
                  className="px-5 py-2 bg-[#45469A] text-white text-sm font-bold rounded-lg hover:bg-[#3535a0] transition-colors disabled:opacity-50">
                  {historySaving ? '저장 중...' : historyEditing ? '수정 완료' : '추가'}
                </button>
                {historyEditing && (
                  <button type="button"
                    onClick={() => { setHistoryForm({ id: null, year: '', month: '', text: '', sort_order: 0 }); setHistoryEditing(false); setHistoryMsg(''); }}
                    className="px-5 py-2 border border-gray-200 text-gray-500 text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    취소
                  </button>
                )}
              </div>
            </form>

            {/* 목록 */}
            {historyLoading ? (
              <p className="text-sm text-gray-400 text-center py-8">불러오는 중...</p>
            ) : (
              <div className="flex flex-col gap-2">
                {historyList.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-bold text-[#45469A] text-sm w-[36px] shrink-0">{item.year}</span>
                      <span className="text-[#6d758f] text-sm w-[28px] shrink-0">{item.month}</span>
                      <span className="text-gray-700 text-sm truncate">{item.text}</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleHistoryEdit(item)}
                        className="px-3 py-1 text-xs font-bold border border-[#45469A] text-[#45469A] rounded-lg hover:bg-[#45469A] hover:text-white transition-colors">
                        수정
                      </button>
                      <button onClick={() => handleHistoryDelete(item.id)}
                        className="px-3 py-1 text-xs font-bold border border-red-200 text-red-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── 실적 관리 탭 ── */}
        {tab === 'biz' && (
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-lg text-gray-800">실적 관리</h2>

            {/* 서브탭 */}
            <div className="flex gap-2">
              {[{key:'records', label:'주요사업 수행 실적'}, {key:'ip', label:'지적재산권'}].map(s => (
                <button key={s.key} onClick={() => setBizSubTab(s.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${bizSubTab === s.key ? 'bg-[#45469A] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  {s.label}
                </button>
              ))}
            </div>

            {bizLoading ? <p className="text-sm text-gray-400 text-center py-8">불러오는 중...</p> : (<>

            {/* ── 주요사업 수행 실적 ── */}
            {bizSubTab === 'records' && (<>
              {bizMsg && <p className={`text-sm px-4 py-2 rounded-lg ${bizMsg.startsWith('✅') ? 'bg-green-50 text-green-700' : bizMsg.startsWith('📤') ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>{bizMsg}</p>}

              <form onSubmit={handleBizSubmit} className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-3 border border-gray-100">
                <p className="text-sm font-bold text-gray-700">{bizEditing ? '✏️ 수정 중' : '➕ 새 실적 추가'}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">연도 *</label>
                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="예) 2024"
                      value={bizForm.year} onChange={e => setBizForm(f => ({ ...f, year: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">발주처</label>
                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="예) 제주특별자치도"
                      value={bizForm.client} onChange={e => setBizForm(f => ({ ...f, client: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">과제명 *</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="과제명을 입력하세요"
                    value={bizForm.name} onChange={e => setBizForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">사업내용</label>
                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="예) AI알고리즘 개발"
                      value={bizForm.content} onChange={e => setBizForm(f => ({ ...f, content: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">정렬 순서</label>
                    <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                      value={bizForm.sort_order} onChange={e => setBizForm(f => ({ ...f, sort_order: Number(e.target.value) }))} />
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={bizSaving}
                    className="px-5 py-2 bg-[#45469A] text-white text-sm font-bold rounded-lg hover:bg-[#3535a0] transition-colors disabled:opacity-50">
                    {bizSaving ? '저장 중...' : bizEditing ? '수정 완료' : '추가'}
                  </button>
                  {bizEditing && (
                    <button type="button" onClick={() => { setBizForm({ id: null, year: '', name: '', client: '', content: '', sort_order: 0 }); setBizEditing(false); setBizMsg(''); }}
                      className="px-5 py-2 border border-gray-200 text-gray-500 text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors">취소</button>
                  )}
                </div>
              </form>
              {/* 엑셀 다운로드/업로드 */}
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={downloadBizExcel}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                  📥 엑셀 다운로드
                </button>
                <button onClick={() => bizXlsxRef.current?.click()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors">
                  📤 엑셀 업로드
                </button>
                <input ref={bizXlsxRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={uploadBizExcel} />
                <span className="text-xs text-gray-400">※ 업로드 시 기존 데이터에 추가됩니다</span>
              </div>

              <div className="flex flex-col gap-2">
                {bizRecords.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-bold text-[#45469A] text-sm w-[40px] shrink-0">{item.year}</span>
                      <span className="text-gray-700 text-sm truncate flex-1">{item.name}</span>
                      <span className="text-gray-400 text-xs shrink-0 hidden md:block">{item.client}</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setBizForm(item); setBizEditing(true); setBizMsg(''); }}
                        className="px-3 py-1 text-xs font-bold border border-[#45469A] text-[#45469A] rounded-lg hover:bg-[#45469A] hover:text-white transition-colors">수정</button>
                      <button onClick={async () => { if (!confirm('삭제하시겠습니까?')) return; await deleteBusinessRecord(item.id); await loadBiz(); }}
                        className="px-3 py-1 text-xs font-bold border border-red-200 text-red-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            </>)}

            {/* ── 지적재산권 ── */}
            {bizSubTab === 'ip' && (<>
              {ipMsg && <p className={`text-sm px-4 py-2 rounded-lg ${ipMsg.startsWith('✅') ? 'bg-green-50 text-green-700' : ipMsg.startsWith('📤') ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>{ipMsg}</p>}

              <form onSubmit={handleIpSubmit} className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-3 border border-gray-100">
                <p className="text-sm font-bold text-gray-700">{ipEditing ? '✏️ 수정 중' : '➕ 새 지재권 추가'}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">유형 *</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                      value={ipForm.type} onChange={e => setIpForm(f => ({ ...f, type: e.target.value }))}>
                      {['특허','프로그램 등록','학술지','학술대회'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">등록일 *</label>
                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="예) 2024.05.28"
                      value={ipForm.date} onChange={e => setIpForm(f => ({ ...f, date: e.target.value }))} required />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">제목 *</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="제목을 입력하세요"
                    value={ipForm.title} onChange={e => setIpForm(f => ({ ...f, title: e.target.value }))} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">등록번호</label>
                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="예) 10-2024-0069062"
                      value={ipForm.number} onChange={e => setIpForm(f => ({ ...f, number: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">정렬 순서</label>
                    <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                      value={ipForm.sort_order} onChange={e => setIpForm(f => ({ ...f, sort_order: Number(e.target.value) }))} />
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={ipSaving}
                    className="px-5 py-2 bg-[#45469A] text-white text-sm font-bold rounded-lg hover:bg-[#3535a0] transition-colors disabled:opacity-50">
                    {ipSaving ? '저장 중...' : ipEditing ? '수정 완료' : '추가'}
                  </button>
                  {ipEditing && (
                    <button type="button" onClick={() => { setIpForm({ id: null, type: '특허', title: '', date: '', number: '', sort_order: 0 }); setIpEditing(false); setIpMsg(''); }}
                      className="px-5 py-2 border border-gray-200 text-gray-500 text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors">취소</button>
                  )}
                </div>
              </form>
              {/* 엑셀 다운로드/업로드 */}
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={downloadIpExcel}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                  📥 엑셀 다운로드
                </button>
                <button onClick={() => ipXlsxRef.current?.click()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors">
                  📤 엑셀 업로드
                </button>
                <input ref={ipXlsxRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={uploadIpExcel} />
                <span className="text-xs text-gray-400">※ 업로드 시 기존 데이터에 추가됩니다</span>
              </div>

              <div className="flex flex-col gap-2">
                {ipList.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-4 bg-white border border-gray-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 shrink-0">{item.type}</span>
                      <span className="text-gray-700 text-sm truncate flex-1">{item.title}</span>
                      <span className="text-gray-400 text-xs shrink-0 hidden md:block">{item.date}</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setIpForm(item); setIpEditing(true); setIpMsg(''); }}
                        className="px-3 py-1 text-xs font-bold border border-[#45469A] text-[#45469A] rounded-lg hover:bg-[#45469A] hover:text-white transition-colors">수정</button>
                      <button onClick={async () => { if (!confirm('삭제하시겠습니까?')) return; await deleteIpRight(item.id); await loadBiz(); }}
                        className="px-3 py-1 text-xs font-bold border border-red-200 text-red-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            </>)}
            </>)}
          </div>
        )}
      </div>
    </div>
  );
}
