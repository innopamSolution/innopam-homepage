import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 뉴스 목록 조회
export async function fetchNews({ category } = {}) {
  let query = supabase
    .from('news')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// 단일 뉴스 조회
export async function fetchNewsById(id) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// 뉴스 저장 (신규/수정)
export async function saveNews(item) {
  if (item.id) {
    const { data, error } = await supabase
      .from('news')
      .update(item)
      .eq('id', item.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('news')
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

// 뉴스 삭제
export async function deleteNews(id) {
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) throw error;
}

// ── 인증 ─────────────────────────────────────────────────────────
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ── 이미지 업로드 ─────────────────────────────────────────────────
export async function uploadImage(file) {
  const ext = file.name.split('.').pop();
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from('news-images')
    .upload(name, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('news-images').getPublicUrl(name);
  return data.publicUrl;
}
