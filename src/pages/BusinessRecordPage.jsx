import { useState } from 'react';
import { asset } from '../utils/asset';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompanyHero } from './IntroductionPage';

// Figma node: 298:415 — Business Record
// Data source: https://innopam.com/business-record/

const projectsByYear = {
  '2024': [
    { name: '산림청 임업직불제 통합관리시스템 구축', client: '지에스아이티엠', content: '시스템 개발' },
    { name: '개발제한구역 내 불법개발 건물변화탐지를 통한 인공지능 알고리즘의 효과성 분석 연구 용역', client: '재단법인서울디지털재단', content: 'AI알고리즘 개발' },
    { name: '도시생태현황지도 기반의 정보플랫폼 구축 정보화 전략계획', client: '㈜올포랜드', content: 'ISP' },
    { name: '위성영상 AI분석 기반 멀티영상 분석 플랫폼 고도화', client: '제주특별자치도', content: 'AI알고리즘 및 시스템 개발' },
    { name: '디지털혁신교육센터 체험시설 제작', client: '경기도 광명시', content: '시스템 개발·드론' },
    { name: '드론 상용화 지원', client: '항공안전기술원', content: 'AI알고리즘·드론' },
    { name: '드론 영상 AI분석 시스템 유지관리', client: '제주특별자치도', content: '시스템 개발·AI·유지보수' },
  ],
  '2023': [
    { name: '수소연료전지드론 농작물 모니터링', client: '국토교통과학기술진흥원', content: 'AI알고리즘 개발' },
    { name: '드론 실증도시 구축', client: '항공안전기술원', content: 'AI알고리즘 개발' },
    { name: '제주 위성영상 분석시스템', client: '제주특별자치도', content: 'AI알고리즘·시스템 개발' },
    { name: 'NIA 디지털 공공서비스 혁신', client: '한국지능정보사회진흥원', content: 'AI알고리즘·시스템 개발' },
    { name: '드론특별자유화구역 조성', client: '제주특별자치도', content: 'AI·드론·시스템 개발' },
    { name: '초등학교 통학로 위험유해시설 맵핑', client: '광명시', content: '시스템 개발' },
    { name: '성수 디지털아카이브', client: '테크캡슐', content: 'AI·드론' },
  ],
  '2022': [
    { name: '드론특별자유화구역 조성', client: '제주특별자치도', content: 'AI알고리즘 개발' },
    { name: 'GeoAI 기반 도시 변화탐지', client: '서울디지털재단', content: 'AI알고리즘 개발' },
    { name: '수월봉 화산쇄설층 3D 변화탐지', client: '제주특별자치도', content: '드론장비·AI알고리즘 개발' },
    { name: '주요 채소류 생산정보 서비스', client: '제주특별자치도', content: '시스템 개발' },
    { name: '미세균열 탐지 AI 균열검측 시스템', client: '한국건설기술연구원', content: 'AI알고리즘 개발' },
    { name: 'Land-XI 플랫폼 구축', client: '국토정보공사', content: 'AI알고리즘·시스템 개발' },
    { name: '드론 관리·영상 보관시스템', client: '국립공원관리공단', content: '시스템 개발' },
  ],
  '2021': [
    { name: '월동작물 자동탐지 드론 이미지', client: '한국정보화진흥원', content: 'AI' },
    { name: '수소연료전지드론 농작물 모니터링(1차)', client: '국토교통과학기술진흥원', content: 'AI·드론' },
    { name: '드론 영상 AI분석 시스템 고도화', client: '제주특별자치도', content: 'AI·시스템 개발' },
    { name: '주요작물 자동탐지 데이터 구축', client: '한국지능정보화사회진흥원', content: 'AI 학습 데이터 구축' },
    { name: '차량 탑재형 영상 취득·분석', client: '한국건설기술연구원', content: '시스템 개발' },
    { name: '드론특별자유화구역 조성', client: '제주특별자치도', content: 'AI·드론·시스템 개발' },
    { name: '수중영상정합 융합기술', client: '한국수자원공사', content: 'AI·시스템 개발' },
    { name: '항공 촬영 작물 식별 딥러닝', client: '한국농촌경제연구', content: 'AI' },
    { name: '공간영상 딥러닝 학습 솔루션', client: '올포랜드', content: 'AI·시스템 개발' },
  ],
  '2020': [
    { name: '태양광 드론·AI 산불 모니터링', client: '서울산업진흥원', content: '알고리즘·시스템 개발' },
    { name: '단지모형 3D 모델링', client: '대림산업', content: '장비 개발' },
    { name: '스마트 친환경 드론 제주 도시행정', client: '항공안전기술원', content: 'AI·시스템 개발' },
    { name: 'AI 기반 실시간 재난정보 탐지', client: '국립재난안전연구원', content: 'AI·드론 연구' },
    { name: '드론영상 AI분석·모바일 조사시스템', client: '제주특별자치도', content: 'AI·드론·시스템 개발' },
    { name: '수중영상정합 전처리 방법', client: '한국수자원공사', content: '영상처리' },
    { name: '드론 영상 보관·처리 시스템', client: '국립공원공단', content: 'AI·드론·시스템 개발' },
  ],
  '2019': [
    { name: '디지털트윈 도시재생 지원 플랫폼', client: '서울산업진흥원', content: '드론 촬영 데이터 처리' },
    { name: '클라우드 기반 드론 매핑 서비스', client: '서울산업진흥원', content: '시스템 개발' },
    { name: '스마트 드론 제주 환경·안전 모니터링', client: '항공안전기술원', content: 'AI·시스템 개발' },
    { name: '하이브리드 무인항공기 해양유해 감시', client: '항공안전기술원', content: '시스템 개발' },
    { name: '저고도 드론 산불탐지 활용기술', client: '항공안전기술원', content: '알고리즘 개발' },
    { name: '드론 준공현장 고화질 모델링', client: '대림산업', content: '시스템 개발' },
    { name: '드론관리시스템 구축', client: '국립공원공단', content: '시스템 개발' },
  ],
  '2018': [
    { name: '서울시립미술관 3D 공간정보', client: '서울시', content: '드론 촬영 데이터 처리' },
    { name: '오픈드론맵 사용자 지침서', client: '국립공원공단', content: '교육·교재 개발' },
    { name: '실시간 드론 매핑 멀티센서 데이터', client: '서울시립대학교', content: '알고리즘 개발' },
    { name: '사회기반시설 정밀점검', client: '항공안전기술원', content: '드론 촬영 데이터 처리' },
  ],
};

const yearTabs = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

const ipData = {
  '특허': [
    { type: '특허', title: '재배 작물 모니터링 방법 및 시스템', date: '2023.08.31', number: '10-2023-0115473' },
    { type: '특허', title: '시설물 손상 분석 방법 및 시스템', date: '2024.05.28', number: '10-2024-0069062' },
    { type: '특허', title: '지상기준점 자동 매칭 정사영상 생성 방법', date: '2024.04.18', number: '10-2024-0052291' },
    { type: '특허', title: 'AI·드론 영상 실시간 재난정보 탐지 시스템', date: '2021.05.07', number: '10-2021-0059196' },
    { type: '특허', title: 'GeoAI 공간 정보 생성 방법 및 장치', date: '2019.11.26', number: '10-2019-0153767' },
    { type: '특허', title: '지리공간정보 실시간 감독 학습 방법', date: '2017.08.31', number: '10-2017-0110631' },
    { type: '특허', title: '복수센서 무인 비행체 매핑 방법 및 시스템', date: '2014.12.29', number: '10-2014-0192665' },
  ],
  '프로그램 등록': [
    { type: '프로그램 등록', title: '전개도 기반 손상 탐지·물량 산출 프로그램', date: '2024.06.14', number: 'C-2024-020472' },
    { type: '프로그램 등록', title: '시설물 손상 정량화 SW', date: '2023.11.07', number: 'C-2023-049786' },
    { type: '프로그램 등록', title: 'AI 기반 시설물 손상 탐지 S/W', date: '2023.10.19', number: 'C-2023-046109' },
    { type: '프로그램 등록', title: 'GeoAI·공간영상 빅데이터 도시 변화탐지 플랫폼', date: '2021.09.13', number: 'C-2021-036634' },
    { type: '프로그램 등록', title: '공간데이터베이스 기반 학습데이터 관리체계', date: '2021.03.24', number: 'C-2021-013800' },
    { type: '프로그램 등록', title: '드론영상 실시간 전송 어플리케이션', date: '2021.03.19', number: 'C-2021-013315' },
    { type: '프로그램 등록', title: 'AI·드론 기반 재해정보 자동 탐지', date: '2021.03.19', number: 'C-2021-013316' },
    { type: '프로그램 등록', title: '드론 동영상 개별 매핑 프로그램', date: '2020.03.12', number: 'C-2020-008884' },
    { type: '프로그램 등록', title: '드론 동영상 AI 기반 재난정보 탐지 프로그램', date: '2020.03.12', number: 'C-2020-008883' },
    { type: '프로그램 등록', title: 'AI 기반 불법건축물 탐지 프로그램', date: '2019.11.18', number: 'C-2019-033829' },
    { type: '프로그램 등록', title: '클라우드 기반 드론 영상 매핑 프로그램', date: '2019.04.16', number: 'C-2019-009052' },
    { type: '프로그램 등록', title: '변화탐지 AI 네트워크 학습 데이터 구축 프로그램', date: '2019.11.18', number: 'C-2019-033828' },
  ],
  '학술지': [
    { type: '학술지', title: '지하시설물 안전점검을 위한 딥러닝 기반 콘크리트 균열 검출', date: '2023.11.30', number: '' },
    { type: '학술지', title: '시설물 상태평가를 위한 파운데이션 모델 기반 2-Step 손상 분석', date: '2023.10.31', number: '' },
    { type: '학술지', title: '드론 영상 월동 작물 분류 딥러닝 모델 최적 공간 해상도 선정', date: '2021.12.31', number: '' },
    { type: '학술지', title: '콘크리트 라이닝 균열 분할 딥러닝 모델 평가 방법', date: '2022.10.31', number: '' },
    { type: '학술지', title: '터널 콘크리트 라이닝 균열 분석 의미론적 분할 모델 학습', date: '2021.11.30', number: '' },
    { type: '학술지', title: '딥러닝 기반 터널 콘크리트 라이닝 균열 탐지', date: '2022.10.31', number: '' },
    { type: '학술지', title: '코리더 모니터링을 위한 드론 영상 기반 액션 카메라 매핑', date: '2021.09.30', number: '' },
    { type: '학술지', title: '장기체공형 태양광 드론·딥러닝 산불 감시 시스템 개발', date: '2020.06.30', number: '' },
  ],
  '학술대회': [
    { type: '학술대회', title: 'Exploring the Potential of Super-Resolution for Crack Analysis', date: '2025.09.10', number: '' },
    { type: '학술대회', title: 'Multi-Class Building Change Detection using High-Resolution Aerial Images', date: '2025.08.05', number: '' },
    { type: '학술대회', title: 'Two-Step Structural Damage Analysis Based on Foundation Models', date: '2025.05.26', number: '' },
    { type: '학술대회', title: '입면 정사영상 기반 균열 탐지 초해상화 활용성 검토', date: '2025.04.10', number: '' },
    { type: '학술대회', title: 'Building Extraction from High Resolution Aerial Imagery', date: '2024.10.25', number: '' },
    { type: '학술대회', title: '다시점 수치지도를 활용한 건물 변화 탐지 Ground Truth 생성', date: '2024.10.25', number: '' },
    { type: '학술대회', title: '수치지도 건물 속성정보 항공영상 기반 건물 분할 성능평가', date: '2024.10.16', number: '' },
    { type: '학술대회', title: '딥러닝 기반 콘크리트 구조물 손상 탐지·상태평가 시스템', date: '2024.09.30', number: '' },
    { type: '학술대회', title: 'REGISTRATION OF AERIAL AND GROUND IMAGES FOR 3D RECONSTRUCTION', date: '2024.07.12', number: '' },
    { type: '학술대회', title: '파운데이션 모델을 이용한 항공사진 건물 의미론적 분할', date: '2024.05.17', number: '' },
    { type: '학술대회', title: '시설물 손상 탐지를 위한 AI 파운데이션 모델 활용·검증', date: '2023.10.20', number: '' },
    { type: '학술대회', title: '콘크리트 라이닝 균열 딥러닝 성능 평가 지표 버퍼 범위 선정', date: '2023.10.19', number: '' },
    { type: '학술대회', title: 'Citrus Unshiu Monitoring using UAV and Deep Learning', date: '2023.08.23', number: '' },
    { type: '학술대회', title: '딥러닝 기반 터널 라이닝 균열 탐지 라인 스캐닝 활용방안', date: '2022.10.20', number: '' },
    { type: '학술대회', title: '기반시설물 손상부위 딥러닝 학습 분류체계·학습데이터 구조 설계', date: '2022.10.20', number: '' },
    { type: '학술대회', title: '균열의 특성을 고려한 의미론적 분할 딥러닝 모델 평가 방법', date: '2022.05.19', number: '' },
    { type: '학술대회', title: '드론 영상과 팜맵을 이용한 딥러닝 기반 작물 재배면적 산정', date: '2022.05.19', number: '' },
    { type: '학술대회', title: '수중 구조물 모니터링을 위한 ROV 영상 3D 모델링', date: '2022.05.19', number: '' },
    { type: '학술대회', title: '장기체공형 태양광 드론·딥러닝 산불 이상징후 감지 체계', date: '2019.04.11', number: '' },
  ],
};

const ipTabs = ['특허', '프로그램 등록', '학술지', '학술대회'];

export default function BusinessRecordPage() {
  const [activeYear, setActiveYear] = useState(0);
  const [activeIp, setActiveIp] = useState(0);

  const currentProjects = projectsByYear[yearTabs[activeYear]] || [];
  const currentIp = ipData[ipTabs[activeIp]] || [];

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="pt-[84px]">
        <CompanyHero subtitle="AI 기반 공간정보 기술로 다양한 산업의 문제를 해결합니다" />

        <section className="w-full px-6 md:px-[88px] pb-[120px] md:pb-[200px] pt-[60px] md:pt-[120px] flex flex-col gap-[60px] md:gap-[80px] items-center max-w-[1440px] mx-auto">

          <h2 className="font-pretendard font-black text-[#3a343b] text-[40px] md:text-[58px] tracking-[-1.2px] text-center">
            Business Record
          </h2>

          <div className="w-full flex flex-col gap-[80px] md:gap-[120px]">

            {/* 주요사업 수행 실적 */}
            <div className="flex flex-col gap-[40px]">
              <h3 className="font-pretendard font-bold text-[#3a343b] text-[28px] md:text-[48px] tracking-[-1.2px]">
                주요사업 수행 실적
              </h3>

              {/* Year tabs */}
              <div className="flex w-full overflow-x-auto">
                {yearTabs.map((year, i) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(i)}
                    className={`flex-1 min-w-[70px] py-[16px] md:py-[30px] font-pretendard text-[14px] md:text-[22px] text-center transition-colors whitespace-nowrap ${
                      activeYear === i
                        ? 'bg-[#5871ed] text-white'
                        : 'border border-[#e9e9e9] text-[#161c2d] hover:bg-gray-50'
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
                      <th className="font-pretendard font-bold text-[#5871ed] text-[14px] md:text-[22px] text-left px-[20px] py-[10px] tracking-[-1.2px] leading-[48px] w-[55%]">
                        과제명
                      </th>
                      <th className="font-pretendard font-bold text-[#5871ed] text-[14px] md:text-[22px] text-left px-[20px] py-[10px] tracking-[-1.2px] leading-[48px] w-[25%]">
                        발주처
                      </th>
                      <th className="font-pretendard font-bold text-[#5871ed] text-[14px] md:text-[22px] text-left px-[20px] py-[10px] tracking-[-1.2px] leading-[48px]">
                        사업내용
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProjects.map((p, i) => (
                      <tr key={i} className="border-b border-[#e9e9e9]">
                        <td className="font-pretendard font-medium text-[#3a343b] text-[13px] md:text-[20px] leading-[1.8] px-[10px] py-[10px]">
                          {p.name}
                        </td>
                        <td className="font-pretendard font-medium text-[#3a343b] text-[13px] md:text-[20px] leading-[1.8] px-[10px] py-[10px]">
                          {p.client}
                        </td>
                        <td className="font-pretendard font-medium text-[#3a343b] text-[13px] md:text-[20px] leading-[1.8] px-[10px] py-[10px]">
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
              <div className="flex w-full overflow-x-auto">
                {ipTabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveIp(i)}
                    className={`flex-1 min-w-[90px] py-[16px] md:py-[30px] font-pretendard text-[14px] md:text-[22px] text-center transition-colors whitespace-nowrap ${
                      activeIp === i
                        ? 'bg-[#5871ed] text-white'
                        : 'border border-[#e9e9e9] text-[#161c2d] hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Cards — 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                {currentIp.map((p, i) => (
                  <div key={i} className="bg-[#f4f7fa] border border-[#e9e9e9] rounded-[8px] px-[28px] py-[20px] flex flex-col gap-[16px]">
                    {/* Badge + check */}
                    <div className="flex items-start justify-between">
                      <span className="border border-[#5871ed] text-[#5871ed] font-pretendard font-semibold text-[14px] px-[16px] rounded-[4px] leading-[1.8]">
                        {p.type}
                      </span>
                      <img src={asset('assets/icon-offer-check.svg')} alt="" className="w-[24px] h-[24px] shrink-0" />
                    </div>
                    {/* Title */}
                    <div className="border-b border-[#e9e9e9] pb-[10px]">
                      <p className="font-pretendard font-medium text-[#3a343b] text-[15px] md:text-[20px] leading-[1.8]">
                        {p.title}
                      </p>
                    </div>
                    {/* Meta */}
                    <div className="flex gap-[40px] md:gap-[80px]">
                      <div className="flex flex-col">
                        <span className="font-pretendard font-medium text-[#6d758f] text-[12px] leading-[1.8]">등록일</span>
                        <span className="font-pretendard font-medium text-[#3a343b] text-[15px] md:text-[20px] leading-[1.4]">{p.date}</span>
                      </div>
                      {p.number && (
                        <div className="flex flex-col">
                          <span className="font-pretendard font-medium text-[#6d758f] text-[12px] leading-[1.8]">
                            {p.type === '특허' ? '특허번호' : '등록번호'}
                          </span>
                          <span className="font-pretendard font-medium text-[#3a343b] text-[15px] md:text-[20px] leading-[1.4]">{p.number}</span>
                        </div>
                      )}
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
