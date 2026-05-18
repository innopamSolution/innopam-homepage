import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { submitDemoRequest } from '../lib/supabase';
import { useLanguage } from '../i18n/LanguageContext';

const PRODUCTS = [
  'GeoXRealMap',
  'GeoX CityVision',
  'CrackEyeX',
  '기타 / 미정',
];

const INQUIRY_TYPES_KO = [
  '제품 데모 신청',
  '기술 문의',
  '도입 검토',
  '파트너십',
  '기타',
];

const INQUIRY_TYPES_EN = [
  'Product Demo Request',
  'Technical Inquiry',
  'Adoption Review',
  'Partnership',
  'Other',
];

const EMPTY = {
  name: '',
  company: '',
  position: '',
  email: '',
  phone: '',
  product: '',
  inquiry_type: '',
  message: '',
  agreed: false,
};

export default function DemoModal({
  open,
  onClose,
  title,
  subtitle,
  submitLabel,
}) {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const modalTitle = title ?? t('데모 신청', 'Request a Demo');
  const modalSubtitle = subtitle ?? t('이노팸 솔루션 데모를 신청해 주시면 빠르게 연락드리겠습니다.', 'Request a demo of Innopam solutions and we will contact you promptly.');
  const modalSubmitLabel = submitLabel ?? t('데모 신청하기', 'Submit Request');

  const INQUIRY_TYPES = lang === 'en' ? INQUIRY_TYPES_EN : INQUIRY_TYPES_KO;
  const PRODUCT_LABELS = {
    'GeoXRealMap': 'GeoXRealMap',
    'GeoX CityVision': 'GeoX CityVision',
    'CrackEyeX': 'CrackEyeX',
    '기타 / 미정': t('기타 / 미정', 'Other / TBD'),
  };

  // 열릴 때 초기화
  useEffect(() => {
    if (open) { setForm(EMPTY); setDone(false); setError(''); }
  }, [open]);

  // 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreed) {
      setError(t('개인정보 수집 및 이용에 동의해 주세요.', 'Please agree to the collection and use of personal information.'));
      return;
    }
    setError(''); setSending(true);
    try {
      await submitDemoRequest({
        name: form.name,
        company: form.company,
        position: form.position,
        email: form.email,
        phone: form.phone,
        product: form.product,
        inquiry_type: form.inquiry_type,
        message: form.message,
        status: 'new',
      });

      const svcId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const tplId  = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const pubKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (svcId && tplId && pubKey) {
        await emailjs.send(svcId, tplId, {
          from_name:    form.name,
          from_company: form.company,
          from_position: form.position,
          from_email:   form.email,
          from_phone:   form.phone,
          product:      form.product,
          inquiry_type: form.inquiry_type,
          message:      form.message,
          to_email:     'innopam@innopam.com',
        }, pubKey);
      }

      setDone(true);
    } catch (err) {
      const msg = err?.message || JSON.stringify(err);
      setError(t(`전송 중 오류가 발생했습니다. (${msg})`, `An error occurred while sending. (${msg})`));
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)' }}
    >
      <div className="relative w-full max-w-[680px] max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl">

        {/* 헤더 */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="font-pretendard font-bold text-[20px] text-[#1a1a2e]">{modalTitle}</h2>
            <p className="font-pretendard text-[14px] text-[#6d758f] mt-0.5">
              {modalSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-all text-2xl font-light"
            aria-label={t('닫기', 'Close')}
          >×</button>
        </div>

        {/* 완료 화면 */}
        {done ? (
          <div className="flex flex-col items-center justify-center gap-5 py-20 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M7 16l6 6 12-12" stroke="#4262ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="font-pretendard font-bold text-[20px] text-[#1a1a2e] mb-2">
                {t('데모 신청이 정상적으로 완료되었습니다.', 'Your request has been successfully submitted.')}
              </p>
              <p className="font-pretendard text-[15px] text-[#6d758f] leading-relaxed">
                {t('빠른 시일내로 이노팸의 담당자가 연락드리겠습니다.', 'An Innopam representative will contact you shortly.')}
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-2 px-8 py-3 brand-gradient text-white font-pretendard font-bold text-[14px] rounded-full hover:opacity-90 transition-opacity"
            >
              {t('닫기', 'Close')}
            </button>
          </div>
        ) : (
          /* 폼 */
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-8 py-6 flex flex-col gap-5">

            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label={t('담당자 이름', 'Contact Name')} required>
                <input required className={input} placeholder={t('홍길동', 'John Doe')} value={form.name} onChange={e => set('name', e.target.value)} />
              </Field>
              <Field label={t('회사명', 'Company')}>
                <input className={input} placeholder={t('(주)이노팸', 'Innopam Inc.')} value={form.company} onChange={e => set('company', e.target.value)} />
              </Field>
              <Field label={t('부서 / 직책', 'Department / Title')}>
                <input className={input} placeholder={t('개발팀 / 과장', 'R&D Team / Manager')} value={form.position} onChange={e => set('position', e.target.value)} />
              </Field>
              <Field label={t('연락처', 'Phone')}>
                <input className={input} placeholder="010-0000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </Field>
            </div>

            <Field label={t('이메일', 'Email')} required>
              <input required type="email" className={input} placeholder="example@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </Field>

            {/* 관심 제품 */}
            <Field label={t('관심 제품', 'Product of Interest')}>
              <div className="flex flex-wrap gap-2">
                {PRODUCTS.map(p => (
                  <button
                    key={p} type="button"
                    onClick={() => set('product', form.product === p ? '' : p)}
                    className={`px-4 py-2 rounded-full text-[13px] font-pretendard font-medium border transition-colors ${
                      form.product === p
                        ? 'bg-[#4262ff] text-white border-[#4262ff]'
                        : 'bg-white text-[#6d758f] border-gray-200 hover:border-[#4262ff] hover:text-[#4262ff]'
                    }`}
                  >{PRODUCT_LABELS[p] || p}</button>
                ))}
              </div>
            </Field>

            {/* 문의 유형 */}
            <Field label={t('문의 유형', 'Inquiry Type')}>
              <div className="flex flex-wrap gap-2">
                {INQUIRY_TYPES.map((t_item, idx) => {
                  const koVal = INQUIRY_TYPES_KO[idx];
                  return (
                    <button
                      key={t_item} type="button"
                      onClick={() => set('inquiry_type', form.inquiry_type === koVal ? '' : koVal)}
                      className={`px-4 py-2 rounded-full text-[13px] font-pretendard font-medium border transition-colors ${
                        form.inquiry_type === koVal
                          ? 'bg-[#1a1a2e] text-white border-[#1a1a2e]'
                          : 'bg-white text-[#6d758f] border-gray-200 hover:border-[#1a1a2e] hover:text-[#1a1a2e]'
                      }`}
                    >{t_item}</button>
                  );
                })}
              </div>
            </Field>

            {/* 문의 내용 */}
            <Field label={t('문의 내용', 'Message')}>
              <textarea
                className={`${input} resize-none min-h-[120px]`}
                placeholder={t(
                  '프로젝트 개요, 도입 목적, 원하시는 기능 등을 자유롭게 작성해 주세요.',
                  'Please describe your project overview, adoption purpose, desired features, etc.'
                )}
                value={form.message}
                onChange={e => set('message', e.target.value)}
              />
            </Field>

            {/* 개인정보 동의 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
              <p className="font-pretendard font-bold text-[13px] text-[#3a343b]">
                {t('개인정보 수집 및 이용 동의', 'Consent to Collection and Use of Personal Information')}
              </p>
              <div className="font-pretendard text-[12px] text-[#6d758f] leading-relaxed max-h-24 overflow-y-auto">
                <p><strong>{t('수집 항목:', 'Items collected:')}</strong> {t('이름, 회사명, 직책, 이메일, 연락처, 문의 내용', 'Name, company, title, email, phone, message')}</p>
                <p><strong>{t('수집 목적:', 'Purpose:')}</strong> {t('데모 신청 접수 및 담당자 연락', 'Processing demo requests and contacting you')}</p>
                <p><strong>{t('보유 기간:', 'Retention period:')}</strong> {t('문의 처리 완료 후 1년', '1 year after inquiry processing is complete')}</p>
                <p className="mt-1">{t(
                  '귀하는 개인정보 제공을 거부할 권리가 있으나, 거부 시 데모 신청이 어려울 수 있습니다.',
                  'You have the right to refuse the provision of personal information; however, refusal may make it difficult to process your demo request.'
                )}</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={e => set('agreed', e.target.checked)}
                  className="w-4 h-4 accent-[#4262ff]"
                />
                <span className="font-pretendard text-[13px] text-[#3a343b] font-medium">
                  {t('개인정보 수집 및 이용에 동의합니다.', 'I agree to the collection and use of personal information.')} <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {error && (
              <p className="text-red-500 text-[13px] font-pretendard">{error}</p>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 brand-gradient text-white font-pretendard font-bold text-[15px] rounded-full hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {sending ? t('전송 중...', 'Sending...') : modalSubmitLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const input = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-pretendard text-[#3a343b] placeholder-gray-300 focus:outline-none focus:border-[#4262ff] transition-colors bg-white';

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-pretendard font-semibold text-[13px] text-[#3a343b]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
