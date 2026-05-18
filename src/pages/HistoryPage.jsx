import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompanyHero } from './IntroductionPage';
import { fetchHistory } from '../lib/supabase';
import { useLanguage } from '../i18n/LanguageContext';

// 로컬 fallback 데이터 (DB 실패 시 사용)
const localHistoryData = [
  { year: '2025', items: [
    { month: '—', text: '실감정사영상, AI변화탐지 솔루션 - 품질경영시스템 인증(ISO 9001)' },
    { month: '—', text: '지상기준점 자동 매칭을 이용한 정사영상 생성 방법 및 시스템 특허 등록' },
    { month: '—', text: '변화탐지 솔루션 GS (1등급) 인증' },
  ]},
  { year: '2024', items: [{ month: '—', text: '공간영상도화업 등록(측량업)' }]},
  { year: '2021', items: [{ month: '06', text: '기업부설연구소 인정(과학기술정보통신부)' }]},
  { year: '2020', items: [{ month: '05', text: 'TECH밸리 선정' }]},
  { year: '2019', items: [
    { month: '10', text: '측량업등록(국토교통부)' },
    { month: '02', text: '연구개발전담부서 인정(과학기술정보통신부)' },
  ]},
  { year: '2018', items: [
    { month: '10', text: '서울형 R&D사업 올해의 최우수기업 선정' },
    { month: '08', text: "국토교통부 '드론규제샌드박스 시범사업' 수행" },
    { month: '04', text: '초경량비행장치사용사업등록(국토교통부 서울지방공청)' },
    { month: '03', text: '중소기업청 중소기업 인증' },
  ]},
  { year: '2014', items: [{ month: '06', text: '벤처기업 인증(중소벤처기업부)' }]},
];

// 영문 번역 맵
const historyTextMap = {
  '실감정사영상, AI변화탐지 솔루션 - 품질경영시스템 인증(ISO 9001)': 'True Orthophoto & AI Change Detection Solution — Quality Management System Certification (ISO 9001)',
  '지상기준점 자동 매칭을 이용한 정사영상 생성 방법 및 시스템 특허 등록': 'Patent registered: Orthophoto generation method and system using automatic GCP matching',
  '변화탐지 솔루션 GS (1등급) 인증': 'Change Detection Solution GS Grade 1 Certification',
  '공간영상도화업 등록(측량업)': 'Registered as a spatial image mapping business (surveying industry)',
  '기업부설연구소 인정(과학기술정보통신부)': 'Corporate Research Institute Recognition (Ministry of Science and ICT)',
  'TECH밸리 선정': 'Selected as TECH Valley company',
  '측량업등록(국토교통부)': 'Surveying business registration (Ministry of Land, Infrastructure and Transport)',
  '연구개발전담부서 인정(과학기술정보통신부)': 'Dedicated R&D Department Recognition (Ministry of Science and ICT)',
  '서울형 R&D사업 올해의 최우수기업 선정': "Selected as Best Company of the Year in Seoul R&D Program",
  "국토교통부 '드론규제샌드박스 시범사업' 수행": "Executed Ministry of Land's 'Drone Regulatory Sandbox Pilot Project'",
  '초경량비행장치사용사업등록(국토교통부 서울지방공청)': 'Ultra-light aerial vehicle business registration (Seoul Regional Aviation Administration, MOLIT)',
  '중소기업청 중소기업 인증': 'SME Certification from Small and Medium Business Administration',
  '벤처기업 인증(중소벤처기업부)': 'Venture Company Certification (Ministry of SMEs and Startups)',
};

// 플랫 배열 → 연도별 그룹으로 변환
function groupByYear(rows) {
  const map = {};
  rows.forEach(row => {
    if (!map[row.year]) map[row.year] = [];
    map[row.year].push({ month: row.month, text: row.text });
  });
  return Object.entries(map)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, items]) => ({ year, items }));
}

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState(localHistoryData);
  const { t } = useLanguage();

  useEffect(() => {
    fetchHistory()
      .then(data => { if (data?.length) setHistoryData(groupByYear(data)); })
      .catch(() => {});
  }, []);

  const heroSubtitle = t(
    'AI 기반 공간정보 기술로 다양한 산업의 문제를 해결합니다',
    'Solving problems across diverse industries with AI-based geospatial technology'
  );

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle={heroSubtitle} />

        <section className="w-full px-6 md:px-[88px] pb-[120px] md:pb-[200px] pt-[60px] md:pt-[120px] flex flex-col gap-[60px] md:gap-[80px] items-center max-w-[1440px] mx-auto">

          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center">
            History
          </h2>

          <div className="w-full flex flex-col gap-[40px] md:gap-[60px]">
            {historyData.map((group) => (
              <div key={group.year} className="flex gap-[40px] md:gap-[80px] items-start">
                <p className="font-pretendard font-bold text-[#3a343b] text-[28px] md:text-[48px] tracking-[-1.2px] whitespace-nowrap shrink-0 w-[80px] md:w-auto">
                  {group.year}
                </p>
                <div className="flex flex-col gap-[20px] md:gap-[30px] flex-1 min-w-0">
                  {group.items.map((item, i) => (
                    <div key={i} className="flex gap-[16px] md:gap-[20px] items-start">
                      <p className="font-pretendard font-bold text-[#5871ed] text-[18px] md:text-[28px] leading-[1.7] tracking-[-1.2px] w-[36px] md:w-[62px] shrink-0">
                        {item.month}
                      </p>
                      <p className="font-pretendard font-medium text-[#3a343b] text-[16px] md:text-[28px] leading-[1.8] flex-1 min-w-0">
                        {t(item.text, historyTextMap[item.text] || item.text)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
