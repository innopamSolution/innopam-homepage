import { useState } from 'react';
import { asset } from '../utils/asset';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompanyHero } from './IntroductionPage';

// Figma node: 298:415 — Business Record
const yearTabs = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

const projects = [
  { name: '산림청 임업직불제 통합관리시스템 구축', client: '지에스아이티엠', content: '시스템 개발' },
  { name: '개발제한구역 내 불법개발 건물변화탐지를 통한 인공지능 알고리즘의 효과성 분석 연구 용역', client: '재단법인서울디지털재단', content: 'AI알고리즘 개발' },
  { name: '도시생태현황지도 기반의 정보플랫폼 구축 정보화 전략계획', client: '㈜올포랜드', content: 'ISP' },
  { name: '위성영상 AI분석 기반 멀티영상 분석 플랫폼 고도화', client: '제주특별자치도', content: 'AI알고리즘 및 시스템 개발' },
  { name: '위성영상 AI분석 기반 멀티영상 분석 플랫폼 고도화', client: '제주특별자치도', content: 'AI알고리즘 및 시스템 개발' },
  { name: '위성영상 AI분석 기반 멀티영상 분석 플랫폼 고도화', client: '제주특별자치도', content: 'AI알고리즘 및 시스템 개발' },
];

const ipTabs = ['특허', '프로그램 등록', '학술지', '학술대회'];

const patents = [
  { type: '특허', title: '재배 작물 모니터링 방법 및 시스템', date: '2023.08.31', number: '10-2023-0115473' },
  { type: '특허', title: '시설물 손상 분석 방법 및 시스템', date: '2024.05.28', number: '10-2024-0069062' },
  { type: '특허', title: '재배 작물 모니터링 방법 및 시스템', date: '2023.08.31', number: '10-2023-0115473' },
  { type: '특허', title: '재배 작물 모니터링 방법 및 시스템', date: '2023.08.31', number: '10-2023-0115473' },
  { type: '특허', title: '재배 작물 모니터링 방법 및 시스템', date: '2023.08.31', number: '10-2023-0115473' },
  { type: '특허', title: '재배 작물 모니터링 방법 및 시스템', date: '2023.08.31', number: '10-2023-0115473' },
];

export default function BusinessRecordPage() {
  const [activeYear, setActiveYear] = useState(0);
  const [activeIp, setActiveIp] = useState(0);

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle="AI 기반 공간정보 기술로 다양한 산업의 문제를 해결합니다" />

        <section className="w-full px-6 md:px-[88px] pb-[120px] md:pb-[200px] pt-[60px] md:pt-[120px] flex flex-col gap-[60px] md:gap-[80px] items-center max-w-[1440px] mx-auto">

          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center">
            Business Record
          </h2>

          <div className="w-full flex flex-col gap-[120px]">

            {/* 주요사업 수행 실적 */}
            <div className="flex flex-col gap-[40px]">
              <h3 className="font-pretendard font-bold text-[#3a343b] text-[28px] md:text-[48px] tracking-[-1.2px]">
                주요사업 수행 실적
              </h3>

              {/* Year tabs */}
              <div className="flex overflow-x-auto w-full">
                {yearTabs.map((year, i) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(i)}
                    className={`flex-1 min-w-[80px] py-[20px] md:py-[30px] font-pretendard text-[16px] md:text-[22px] text-center transition-colors whitespace-nowrap ${
                      activeYear === i
                        ? 'bg-[#5871ed] text-white'
                        : 'border border-[#e9e9e9] text-[#161c2d]'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-[#f4f7fa] border-b border-[#e9e9e9]">
                      <th className="font-pretendard font-bold text-[#5871ed] text-[16px] md:text-[22px] text-left px-[20px] py-[10px] tracking-[-1.2px] leading-[48px] w-[55%]">
                        과제명
                      </th>
                      <th className="font-pretendard font-bold text-[#5871ed] text-[16px] md:text-[22px] text-left px-[20px] py-[10px] tracking-[-1.2px] leading-[48px] w-[25%]">
                        발주처
                      </th>
                      <th className="font-pretendard font-bold text-[#5871ed] text-[16px] md:text-[22px] text-left px-[20px] py-[10px] tracking-[-1.2px] leading-[48px]">
                        사업내용
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p, i) => (
                      <tr key={i} className="border-b border-[#e9e9e9]">
                        <td className="font-pretendard font-medium text-[#3a343b] text-[14px] md:text-[20px] leading-[1.8] px-[10px] py-[10px]">
                          {p.name}
                        </td>
                        <td className="font-pretendard font-medium text-[#3a343b] text-[14px] md:text-[20px] leading-[1.8] px-[10px] py-[10px]">
                          {p.client}
                        </td>
                        <td className="font-pretendard font-medium text-[#3a343b] text-[14px] md:text-[20px] leading-[1.8] px-[10px] py-[10px]">
                          {p.content}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 지적재산권 */}
            <div className="flex flex-col gap-[40px]">
              <h3 className="font-pretendard font-bold text-[#3a343b] text-[28px] md:text-[48px] tracking-[-1.2px]">
                지적재산권
              </h3>

              {/* IP tabs */}
              <div className="flex overflow-x-auto w-full">
                {ipTabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveIp(i)}
                    className={`flex-1 min-w-[100px] py-[20px] md:py-[30px] font-pretendard text-[16px] md:text-[22px] text-center transition-colors whitespace-nowrap ${
                      activeIp === i
                        ? 'bg-[#5871ed] text-white'
                        : 'border border-[#e9e9e9] text-[#161c2d]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Patent cards — 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                {patents.map((p, i) => (
                  <div key={i} className="bg-[#f4f7fa] border border-[#e9e9e9] rounded-[8px] px-[28px] py-[20px] flex flex-col gap-[16px]">
                    {/* Badge + check */}
                    <div className="flex items-start justify-between">
                      <span className="border border-[#5871ed] text-[#5871ed] font-pretendard font-semibold text-[14px] px-[20px] rounded-[4px] leading-[1.8]">
                        {p.type}
                      </span>
                      <img src={asset('assets/icon-offer-check.svg')} alt="" className="w-[24px] h-[24px]" />
                    </div>
                    {/* Title */}
                    <div className="border-b border-[#e9e9e9] pb-[10px]">
                      <p className="font-pretendard font-medium text-[#3a343b] text-[16px] md:text-[20px] leading-[1.8]">
                        {p.title}
                      </p>
                    </div>
                    {/* Meta */}
                    <div className="flex gap-[40px] md:gap-[80px]">
                      <div className="flex flex-col">
                        <span className="font-pretendard font-medium text-[#6d758f] text-[12px] leading-[1.8]">등록일</span>
                        <span className="font-pretendard font-medium text-[#3a343b] text-[16px] md:text-[20px] leading-[1.4]">{p.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-pretendard font-medium text-[#6d758f] text-[12px] leading-[1.8]">특허번호</span>
                        <span className="font-pretendard font-medium text-[#3a343b] text-[16px] md:text-[20px] leading-[1.4]">{p.number}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
