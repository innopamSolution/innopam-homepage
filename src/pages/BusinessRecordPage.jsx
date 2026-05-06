import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompanyHero } from './IntroductionPage';

const records = [
  {
    category: '공간정보 구축',
    items: [
      { year: '2024', name: '고정밀 전자지도 구축 챌린지 사업', client: '국토교통부' },
      { year: '2023', name: '드론 기반 정밀 수치지형도 제작', client: '서울특별시' },
      { year: '2022', name: 'AI 기반 지도 품질검증 지원 시스템 개발', client: '국토지리정보원' },
      { year: '2020', name: '3D 공간정보 구축 및 디지털트윈 플랫폼 구축', client: '인천광역시' },
    ],
  },
  {
    category: '농업·환경 분석',
    items: [
      { year: '2023', name: '드론 영상 기반 월동작물 재배면적 산정 서비스', client: '제주특별자치도' },
      { year: '2022', name: 'GeoAI 영상분석 서비스 (농작물 자동탐지)', client: '농림축산식품부' },
      { year: '2021', name: '산림 탄소흡수원 모니터링 사업', client: '산림청' },
      { year: '2020', name: '연안 침식 변화 탐지 시스템 개발', client: '해양수산부' },
    ],
  },
  {
    category: '재난·안전',
    items: [
      { year: '2024', name: '재난 피해 범위 AI 분석 시스템 구축', client: '국립재난안전연구원' },
      { year: '2023', name: '드론 영상 기반 해양쓰레기·불법건축물 자동탐지', client: '국립공원공단' },
      { year: '2022', name: '산불 피해 지역 변화탐지 및 복구 지원', client: '산림청' },
    ],
  },
  {
    category: '시설물 관리',
    items: [
      { year: '2023', name: 'AI 기반 도로 균열 탐지 시스템 (CrackEyeX)', client: '한국도로공사' },
      { year: '2022', name: '교량·터널 외관조사 AI 자동화 시스템 개발', client: '국토안전관리원' },
      { year: '2021', name: '도심 녹지 및 태양광 패널 자동 탐지', client: '서울특별시' },
    ],
  },
];

export default function BusinessRecordPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle="이노팸이 수행한 주요 사업 실적을 소개합니다" />

        <section className="w-full px-6 md:px-[88px] py-[60px] md:py-[120px] max-w-[1264px] mx-auto flex flex-col gap-[60px] md:gap-[80px]">
          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center">
            Business Record
          </h2>

          {records.map((group) => (
            <div key={group.category} className="flex flex-col gap-[24px]">
              <h3 className="font-pretendard font-bold text-[#5871ed] text-[20px] md:text-[28px] tracking-[-0.5px] pb-[16px] border-b-2 border-[#5871ed]">
                {group.category}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-[#f4f7fa]">
                      <th className="font-pretendard font-bold text-[#3a343b] text-[14px] md:text-[16px] text-left px-[20px] py-[14px] w-[80px]">
                        연도
                      </th>
                      <th className="font-pretendard font-bold text-[#3a343b] text-[14px] md:text-[16px] text-left px-[20px] py-[14px]">
                        사업명
                      </th>
                      <th className="font-pretendard font-bold text-[#3a343b] text-[14px] md:text-[16px] text-left px-[20px] py-[14px] w-[180px]">
                        발주처
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item, i) => (
                      <tr
                        key={item.name}
                        className={`border-b border-[#e9e9e9] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}
                      >
                        <td className="font-pretendard text-[#5871ed] font-bold text-[14px] md:text-[16px] px-[20px] py-[16px]">
                          {item.year}
                        </td>
                        <td className="font-pretendard text-[#3a343b] text-[14px] md:text-[16px] px-[20px] py-[16px] leading-[1.5]">
                          {item.name}
                        </td>
                        <td className="font-pretendard text-[#6d758f] text-[14px] md:text-[16px] px-[20px] py-[16px]">
                          {item.client}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
