import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLabel from '../components/SectionLabel';
import { asset } from '../utils/asset';
import { useFadeUp } from '../utils/useFadeUp';
import { useLanguage } from '../i18n/LanguageContext';

// ── 체크 아이콘 ────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className="shrink-0">
      <circle cx="12" cy="12.5" r="12" fill="#5871ed" fillOpacity="0.12"/>
      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#5871ed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── 인터랙티브 원형 이미지 ─────────────────────────────────────────
function InteractiveCircle({ image, alt, markers, analyzingLabel }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] shrink-0 mx-auto lg:mx-0">
      {/* 원형 이미지 */}
      <div className="w-full h-full rounded-full overflow-hidden" style={{ boxShadow: '0px 4px 32px rgba(0,0,0,0.18)' }}>
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </div>

      {/* 스캔 라인 */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="scan-line" />
      </div>

      {/* 그리드 오버레이 */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(88,113,237,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(88,113,237,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* AI 마커들 */}
      {markers.map((m) => (
        <div
          key={m.id}
          className="absolute"
          style={{ top: m.top, left: m.left, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setHoveredId(m.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* 감지 박스 */}
          {m.box && (
            <div
              className="absolute border border-dashed pointer-events-none"
              style={{
                width: m.box.w,
                height: m.box.h,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderColor: m.color || '#5871ed',
                opacity: 0.85,
              }}
            >
              <span
                className="absolute -top-5 left-0 text-[9px] font-bold px-1 py-0.5 whitespace-nowrap"
                style={{ background: m.color || '#5871ed', color: '#fff' }}
              >
                {m.label}
              </span>
            </div>
          )}

          {/* 펄스 도트 */}
          <div className="relative cursor-pointer">
            <span className="absolute inline-flex rounded-full opacity-60 animate-ping"
              style={{ width: 20, height: 20, top: -10, left: -10, background: m.color || '#5871ed' }} />
            <span className="relative flex items-center justify-center w-5 h-5 rounded-full border-2 border-white"
              style={{ background: m.color || '#5871ed', boxShadow: `0 0 0 3px ${m.color || '#5871ed'}40` }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
          </div>

          {/* 툴팁 */}
          {hoveredId === m.id && (
            <div
              className="absolute z-20 bg-white rounded-xl px-3 py-2 shadow-xl border border-gray-100 whitespace-nowrap animate-fadeIn"
              style={{
                bottom: 28,
                left: '50%',
                transform: 'translateX(-50%)',
                minWidth: 130,
              }}
            >
              <p className="text-[11px] font-bold text-[#5871ed] mb-0.5">{m.label}</p>
              <p className="text-[11px] text-gray-600 leading-tight">{m.desc}</p>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45" />
            </div>
          )}
        </div>
      ))}

      {/* AI 분석 중 뱃지 */}
      <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5 bg-[#5871ed] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        {analyzingLabel}
      </div>
    </div>
  );
}

// ── 메인 페이지 ────────────────────────────────────────────────────
export default function IndustriesPage() {
  const { t } = useLanguage();

  // ── 산업별 데이터 ──────────────────────────────────────────────────
  const industries = [
    {
      id: 'urban',
      tabLabel: t('도시변화 모니터링', 'Urban Change Monitoring'),
      title: t('도시변화 모니터링', 'Urban Change Monitoring'),
      description: [
        t(
          '위성, 항공, 드론 데이터를 AI로 분석해 도시 변화를 실시간으로 탐지하고 관리합니다.',
          'AI analyzes satellite, aerial, and drone data to detect and manage urban changes in real time.'
        ),
        t(
          '도시계획·개발제한구역 관리, 불법건축·개발 감시, 수치지형도 고도화 등 행정 효율화에 활용됩니다.',
          'Applied to urban planning, greenbelt management, illegal construction monitoring, and digital map enhancement.'
        ),
      ],
      circleImage: asset('assets/solution-city.jpg'),
      markers: [
        { id: 1, top: '30%', left: '38%', color: '#ef4444', label: t('불법 건축 의심', 'Illegal Build Suspected'), desc: t('신규 구조물 탐지 · 신뢰도 94%', 'New structure · 94% confidence'), box: { w: 52, h: 44 } },
        { id: 2, top: '55%', left: '62%', color: '#5871ed', label: t('도로 변화 탐지', 'Road Change Detected'), desc: t('도로 신설 / 확장 감지', 'New road / expansion detected'), box: { w: 64, h: 28 } },
        { id: 3, top: '72%', left: '35%', color: '#f59e0b', label: t('건물 변화', 'Building Change'), desc: t('증축 탐지 · 면적 +128㎡', 'Extension detected · +128㎡'), box: { w: 44, h: 40 } },
      ],
      cases: [
        {
          id: 'cityvision',
          label: 'GeoX CityVision',
          title: 'GeoX CityVision',
          subtitle: t('드론·항공 영상 기반 도시 변화 탐지 및 3D 도시 모델링 서비스', 'Urban change detection and 3D city modeling service based on drone and aerial imagery'),
          features: [
            { title: t('변화 자동 탐지', 'Automatic Change Detection'), desc: t('다시기 영상 비교를 통해 건물·도로 등 도시 구조물 변화를 자동으로 감지', 'Automatically detects changes in urban structures such as buildings and roads through multi-temporal image comparison') },
            { title: t('3D 도시 모델', '3D City Model'), desc: t('항공·드론 영상으로부터 고정밀 3D 도시 모델을 자동 생성', 'Automatically generates high-precision 3D city models from aerial and drone imagery') },
            { title: t('행정 연계', 'Administrative Integration'), desc: t('지자체 공간정보시스템과 연동하여 변화 이력을 자동 반영', 'Automatically reflects change history by linking with local government spatial information systems') },
            { title: t('이상 감지 알림', 'Anomaly Detection Alert'), desc: t('불법 건축·개발 등 이상 변화 발생 시 실시간 알림 제공', 'Provides real-time alerts when abnormal changes such as illegal construction or development are detected') },
          ],
          caseImage: asset('assets/cityvision-service.png'),
        },
        {
          id: 'seoul-urban',
          label: t('서울시 도시변화탐지', 'Seoul Urban Change Detection'),
          title: t('서울시 도시변화탐지', 'Seoul Urban Change Detection'),
          subtitle: t('서울시 전역 위성·항공 영상 기반 도시 변화 자동 탐지 서비스', 'Automatic urban change detection service based on satellite and aerial imagery across Seoul'),
          features: [
            { title: t('건물 변화 탐지', 'Building Change Detection'), desc: t('서울시 전역의 신축·증축·멸실 건물을 위성 영상으로 자동 탐지', 'Automatically detects new, expanded, and demolished buildings across Seoul using satellite imagery') },
            { title: t('개발제한구역 감시', 'Greenbelt Monitoring'), desc: t('그린벨트 내 불법 개발 행위를 AI로 실시간 모니터링', 'AI-powered real-time monitoring of illegal development within greenbelt areas') },
            { title: t('도로·인프라 변화', 'Road & Infrastructure Change'), desc: t('도로 신설·확장 및 도시 기반시설 변화를 자동으로 감지', 'Automatically detects new roads, expansions, and changes in urban infrastructure') },
            { title: t('이력 관리', 'History Management'), desc: t('탐지된 변화 이력을 시계열로 관리하고 행정 보고서 자동 생성', 'Manages detected change history as time series and automatically generates administrative reports') },
          ],
          caseImage: asset('assets/seoul-change-detection.png'),
        },
        {
          id: 'geoai',
          label: t('GEO-AI 영상분석 서비스', 'GEO-AI Image Analysis Service'),
          title: t('GEO-AI 영상분석 서비스', 'GEO-AI Image Analysis Service'),
          subtitle: t('멀티센서(위성, 항공, 드론)영상 기반의 GeoAI 분석 플랫폼 서비스', 'GeoAI analysis platform service based on multi-sensor (satellite, aerial, drone) imagery'),
          features: [
            { title: t('데이터 수집 · 관리', 'Data Collection & Management'), desc: t('위성, 드론, 항공 영상 데이터를 한 곳에 모아 쉽게 저장하고 관리', 'Consolidate satellite, drone, and aerial imagery into a single platform for easy storage and management') },
            { title: t('GEO-AI 모델 개발', 'GEO-AI Model Development'), desc: t('모델 앙상블 적용을 통한 AI모델 객체 탐지 정확도 제고', 'Improved object detection accuracy through AI model ensemble techniques') },
            { title: t('One-Stop AI 서비스', 'One-Stop AI Service'), desc: t('학습데이터 수집, 전처리, 구축, 관리를 위한 One-Stop 서비스', 'One-stop service for training data collection, preprocessing, construction, and management') },
            { title: t('모델 학습 갱신', 'Model Training Update'), desc: t('플랫폼에서 구축된 학습데이터를 이용해 직접 모델 학습 갱신', 'Directly update model training using training data built within the platform') },
          ],
          caseImage: asset('assets/industries-case-screen.jpg'),
        },
      ],
    },
    {
      id: 'agriculture',
      tabLabel: t('농업분석', 'Agricultural Analysis'),
      title: t('농업 분석', 'Agricultural Analysis'),
      description: [
        t(
          '드론으로 촬영한 영상을 AI가 분석하여 농작물의 종류를 자동으로 식별하고 작물의 재배면적을 산출합니다.',
          'AI analyzes drone footage to automatically identify crop types and calculate cultivated areas.'
        ),
        t(
          '분석된 데이터를 기반으로 직불금 관리, 휴경지 관리, 통계 관리 등 농업 행정 전반에 활용됩니다.',
          'Analyzed data is applied across agricultural administration including direct payments, fallow land management, and statistical reporting.'
        ),
      ],
      circleImage: asset('assets/solution-farm.jpg'),
      markers: [
        { id: 1, top: '35%', left: '40%', color: '#16a34a', label: t('생산량예측', 'Yield Forecast'), desc: t('재배면적 2.4ha · 수확량 예측', 'Cultivated area 2.4ha · yield forecast'), box: { w: 60, h: 50 } },
        { id: 2, top: '60%', left: '65%', color: '#f59e0b', label: t('휴경지 탐지', 'Fallow Land Detected'), desc: t('미경작 확인 · 직불금 제외', 'Uncultivated confirmed · excluded from payment'), box: { w: 54, h: 42 } },
        { id: 3, top: '45%', left: '25%', color: '#5871ed', label: t('작물탐지', 'Crop Detected'), desc: t('고추 재배 추정 · 0.8ha', 'Pepper cultivation estimated · 0.8ha'), box: { w: 46, h: 38 } },
      ],
      cases: [
        {
          id: 'crop-management',
          label: t('재배면적 관리 서비스', 'Cultivation Area Management'),
          title: t('재배면적 관리 서비스', 'Cultivation Area Management Service'),
          subtitle: t('드론·위성 영상 기반 농작물 재배면적 AI 자동 분석 및 관리 서비스', 'AI-based automatic analysis and management of crop cultivation areas using drone and satellite imagery'),
          features: [
            { title: t('작물 자동 탐지 및 분류', 'Automatic Crop Detection & Classification'), desc: t('드론·위성 영상으로 월동무·감귤·양배추 등 작물 종류를 AI가 자동 식별', 'AI automatically identifies crop types such as winter radish, citrus, and cabbage from drone/satellite imagery') },
            { title: t('재배면적 산출', 'Cultivation Area Calculation'), desc: t('필지별 작물 재배면적을 자동 계산하여 지역별 통계 데이터 제공', 'Automatically calculates crop cultivation area per parcel and provides regional statistical data') },
            { title: t('생산량 예측', 'Yield Forecasting'), desc: t('AI 분석 기반 작물별 예측 생산량 및 검출면적·건수 정보 제공', 'Provides AI-based yield predictions and detected area and count information per crop') },
            { title: t('데이터 기반 행정 업무 지원', 'Data-Driven Administrative Support'), desc: t('재배 현황 데이터를 직불금 지급·휴경지 관리 등 농업 행정에 연계', 'Links cultivation data to agricultural administration including direct payments and fallow land management') },
          ],
          caseImage: asset('assets/crop-management-service.png'),
        },
        {
          id: 'drone-mgmt',
          label: t('드론영상관리 시스템', 'Drone Imagery Management System'),
          title: t('드론영상관리 시스템', 'Drone Imagery Management System'),
          subtitle: t('농업 드론 영상 데이터의 수집·저장·분석을 통합하는 관리 플랫폼', 'Integrated management platform for collection, storage, and analysis of agricultural drone imagery'),
          features: [
            { title: t('드론 기체 운영 관리', 'Drone Fleet Management'), desc: t('등록된 드론 기체의 비행 이력, 상태, 스케줄을 통합 관리', 'Integrated management of registered drone flight history, status, and schedules') },
            { title: t('영상 데이터 업로드 및 전처리', 'Image Upload & Preprocessing'), desc: t('업로드된 영상의 정합·보정·AI 분석을 자동화하여 데이터 품질 향상', 'Automates alignment, correction, and AI analysis of uploaded imagery to improve data quality') },
            { title: t('분석결과 시각화', 'Analysis Result Visualization'), desc: t('GIS 기반 지도에서 AI 분석 결과와 공간정보를 직관적으로 조회', 'Intuitively view AI analysis results and spatial data on a GIS-based map') },
            { title: t('보고서 자동생성', 'Automatic Report Generation'), desc: t('분석 결과를 기반으로 행정용 보고서를 자동으로 생성', 'Automatically generates administrative reports based on analysis results') },
          ],
          caseImage: asset('assets/drone-mgmt-service.png'),
        },
      ],
    },
    {
      id: 'environment',
      tabLabel: t('산림, 해양', 'Forest & Ocean'),
      title: t('산림 · 해양', 'Forest & Ocean'),
      description: [
        t(
          '위성, 항공, 드론 영상을 AI가 분석하여 산림 훼손 지역을 자동으로 탐지하고 변화 현황을 지속적으로 모니터링합니다.',
          'AI analyzes satellite, aerial, and drone imagery to automatically detect forest damage and continuously monitor changes.'
        ),
        t(
          '불법 산림 훼손 감시, 복구지 관리, 해양 쓰레기 탐지 등 환경 행정 전반에 활용됩니다.',
          'Applied across environmental administration including illegal deforestation monitoring, recovery management, and marine debris detection.'
        ),
      ],
      circleImage: asset('assets/solution-eco.jpg'),
      markers: [
        { id: 1, top: '32%', left: '55%', color: '#ef4444', label: t('산림 훼손 탐지', 'Forest Damage Detected'), desc: t('훼손 면적 0.6ha · 신규 감지', 'Damaged area 0.6ha · newly detected'), box: { w: 56, h: 48 } },
        { id: 2, top: '62%', left: '38%', color: '#f59e0b', label: t('해양쓰레기 탐지', 'Marine Debris Detected'), desc: t('해안선 쓰레기 분포 감지', 'Coastal debris distribution detected'), box: { w: 56, h: 44 } },
        { id: 3, top: '48%', left: '70%', color: '#06b6d4', label: t('해안선 변화', 'Coastline Change'), desc: t('침식 2.1m 후퇴 감지', 'Erosion 2.1m retreat detected'), box: { w: 44, h: 36 } },
      ],
      cases: [
        {
          id: 'forest',
          label: t('불법 산림훼손 관리 서비스', 'Illegal Deforestation Management'),
          title: t('불법 산림훼손 관리 서비스', 'Illegal Deforestation Management Service'),
          subtitle: t('위성·드론 영상 기반 산림 변화 탐지 및 훼손지 관리 서비스', 'Forest change detection and damage site management using satellite and drone imagery'),
          features: [
            { title: t('산림 훼손 자동 탐지', 'Automatic Forest Damage Detection'), desc: t('다시기 영상 분석으로 산림 훼손 지역을 자동으로 감지', 'Automatically detects forest damage areas through multi-temporal image analysis') },
            { title: t('복구지 관리', 'Recovery Site Management'), desc: t('훼손 지역의 복구 진행 현황을 주기적으로 모니터링', 'Periodically monitors the restoration progress of damaged areas') },
            { title: t('불법 훼손 감시', 'Illegal Damage Surveillance'), desc: t('항공·위성 영상 분석으로 불법 산림 훼손 모니터링', 'Monitors illegal forest damage through aerial and satellite image analysis') },
            { title: t('변화 이력 관리', 'Change History Management'), desc: t('산림 변화 이력을 체계적으로 기록하고 리포트 자동 생성', 'Systematically records forest change history and automatically generates reports') },
          ],
          caseImage: asset('assets/forest-aerial.png'),
        },
        {
          id: 'ocean',
          label: t('해양쓰레기 관리 서비스', 'Marine Debris Management'),
          title: t('해양쓰레기 관리 서비스', 'Marine Debris Management Service'),
          subtitle: t('위성·드론 영상 기반 해양환경 변화 탐지 및 해양 쓰레기 관리 서비스', 'Marine environment change detection and debris management using satellite and drone imagery'),
          features: [
            { title: t('해양 쓰레기 탐지', 'Marine Debris Detection'), desc: t('드론 영상으로 해안선 및 해양 쓰레기 분포를 자동 탐지', 'Automatically detects coastline and marine debris distribution from drone imagery') },
            { title: t('해안선 퇴적물 및 쓰레기 모니터링', 'Coastline Sediment & Debris Monitoring'), desc: t('시기별 위성영상으로 해안선 퇴적물 및 쓰레기 분포 변화를 모니터링', 'Monitors changes in coastline sediment and debris distribution using time-series satellite imagery') },
            { title: t('탐지 이력 관리', 'Detection History Management'), desc: t('쓰레기 탐지 이력 데이터베이스 구축 및 통계 제공', 'Builds a detection history database and provides statistical information') },
            { title: t('현장 업무 지원', 'Field Operations Support'), desc: t('수거 및 관리 업무에 지원할 수 있는 데이터 제공', 'Provides data to support collection and management operations') },
          ],
          caseImage: asset('assets/ocean-waste-service.png'),
        },
      ],
    },
    {
      id: 'safety',
      tabLabel: t('재난 안전', 'Disaster Safety'),
      title: t('재난 · 안전', 'Disaster & Safety'),
      description: [
        t(
          '시설물 영상 데이터를 AI가 분석해 균열, 파손 등 손상 상태를 자동으로 탐지합니다.',
          'AI analyzes facility imagery to automatically detect damage such as cracks and deterioration.'
        ),
        t(
          '분석 결과를 기반으로 외관조사망도를 자동 생성하고 시설물 안전 점검·유지보수 계획 수립에 활용됩니다.',
          'Results enable automatic generation of inspection diagrams and support facility safety inspection and maintenance planning.'
        ),
      ],
      circleImage: asset('assets/solution-disaster.jpg'),
      markers: [
        { id: 1, top: '38%', left: '45%', color: '#ef4444', label: t('균열 탐지 (D등급)', 'Crack Detected (Grade D)'), desc: t('폭 0.8mm · 즉시 보수 필요', 'Width 0.8mm · immediate repair needed'), box: { w: 50, h: 30 } },
        { id: 2, top: '58%', left: '30%', color: '#f59e0b', label: t('손상 탐지 (C등급)', 'Damage Detected (Grade C)'), desc: t('박리 면적 0.12㎡ 감지', 'Spalling 0.12㎡ detected'), box: { w: 46, h: 36 } },
        { id: 3, top: '30%', left: '65%', color: '#5871ed', label: t('정상 구간', 'Normal Section'), desc: t('이상 없음 · A등급', 'No issues · Grade A'), box: { w: 42, h: 32 } },
      ],
      cases: [
        {
          id: 'crackeye',
          label: 'CrackEye X',
          title: 'CrackEye X',
          subtitle: t('AI 기반 시설물 균열·손상 자동 탐지 및 안전점검 관리 서비스', 'AI-based automatic facility crack and damage detection and safety inspection management service'),
          features: [
            { title: t('균열 자동 탐지', 'Automatic Crack Detection'), desc: t('영상 데이터에서 AI가 균열·박리·파손 등 손상을 자동으로 식별', 'AI automatically identifies damage such as cracks, spalling, and breakage from imagery data') },
            { title: t('외관조사망도 생성', 'Inspection Diagram Generation'), desc: t('점검 결과를 기반으로 외관조사망도를 자동으로 생성', 'Automatically generates inspection diagrams based on inspection results') },
            { title: t('안전 등급 산정', 'Safety Grade Assessment'), desc: t('AI 분석 결과를 기반으로 시설물 안전 등급을 자동 산정', 'Automatically calculates facility safety grades based on AI analysis results') },
            { title: t('이력 관리', 'History Management'), desc: t('시설물별 점검 이력 데이터베이스 구축 및 유지보수 계획 지원', 'Builds an inspection history database per facility and supports maintenance planning') },
          ],
          caseImage: asset('assets/crackeye-service.png'),
        },
        {
          id: 'totalcare',
          label: t('정사영상생성 솔루션', 'Orthophoto Generation Solution'),
          title: t('정사영상생성 솔루션', 'Orthophoto Generation Solution'),
          subtitle: t('드론 영상 업로드부터 정사영상 생성까지 자동화된 3D 공간정보 처리 솔루션', 'Automated 3D spatial information processing solution from drone image upload to orthophoto generation'),
          features: [
            { title: t('이미지 점검 (Tie Points)', 'Image Inspection (Tie Points)'), desc: t('드론 촬영 영상을 업로드하면 AI가 특징점(Tie Points)을 자동 추출하고 정확도를 검증', 'Upload drone imagery and AI automatically extracts tie points and verifies accuracy') },
            { title: t('포인트 클라우드 생성', 'Point Cloud Generation'), desc: t('검증된 영상으로부터 3D 포인트 클라우드를 자동 생성하여 공간 구조 정보 구축', 'Automatically generates 3D point clouds from verified imagery to build spatial structure information') },
            { title: t('3D 모델 생성', '3D Model Generation'), desc: t('포인트 클라우드 기반으로 교량·터널 등 시설물의 고정밀 3D 메시 모델 자동 생성', 'Automatically generates high-precision 3D mesh models of facilities such as bridges and tunnels based on point clouds') },
            { title: t('정사영상 생성', 'Orthophoto Generation'), desc: t('3D 모델을 기반으로 왜곡 보정된 정사영상을 자동 생성하여 GIS 활용 가능 형태로 제공', 'Automatically generates distortion-corrected orthophotos based on 3D models in GIS-compatible format') },
          ],
          caseImage: asset('assets/ortho-3d-model.png'),
        },
      ],
    },
  ];

  const [activeIndustryId, setActiveIndustryId] = useState(industries[0].id);
  const [activeCaseId, setActiveCaseId] = useState(industries[0].cases[0].id);

  const tabsRef    = useFadeUp(0.1, 'up');
  const contentRef = useFadeUp(0.05, 'up');
  const casesRef   = useFadeUp(0.05, 'up');

  const activeIndustry = industries.find(i => i.id === activeIndustryId);
  const activeCase = activeIndustry?.cases.find(c => c.id === activeCaseId);

  const handleIndustryChange = (id) => {
    setActiveIndustryId(id);
    const ind = industries.find(i => i.id === id);
    if (ind) setActiveCaseId(ind.cases[0].id);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="pt-[84px]">

        {/* 히어로 */}
        <div className="relative w-full h-[400px] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <img
              alt=""
              className="absolute w-full h-full object-cover object-center blur-[5px] scale-110"
              src={asset('assets/industries-hero-main.jpg')}
            />
            <div className="absolute inset-0" style={{ background: 'rgba(41,42,105,0.6)' }} />
          </div>
          <div className="hero-content absolute inset-0 flex flex-col items-center justify-center gap-[38px] px-4">
            <SectionLabel text="Industries" light />
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="font-pretendard font-bold text-[40px] md:text-[48px] text-white tracking-[-2px] leading-[1.35]">
                {t('GEO AI 산업 분야', 'GEO AI Industry Fields')}
              </h1>
              <p className="font-pretendard text-[18px] md:text-[20px] text-white leading-[1.4]">
                {t('산업별 문제를 AI로 해결합니다.', 'Solving industry challenges with AI.')}
              </p>
            </div>
          </div>
        </div>

        {/* 탭 내비게이션 */}
        <div
          ref={tabsRef.ref}
          className={`w-full px-4 md:px-[88px] py-[28px] flex justify-center ${tabsRef.className}`}
        >
          <div className="flex w-full max-w-[1264px]">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => handleIndustryChange(ind.id)}
                className={`flex-1 py-[22px] md:py-[30px] text-[16px] md:text-[22px] font-pretendard text-center transition-colors ${
                  activeIndustryId === ind.id
                    ? 'bg-[#5871ed] text-white'
                    : 'bg-white text-[#161c2d] border border-[#e9e9e9] hover:bg-gray-50'
                }`}
              >
                {ind.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* 콘텐츠 */}
        {activeIndustry && (
          <div
            key={activeIndustryId}
            className="w-full px-4 md:px-[88px] pt-[80px] pb-[120px] flex flex-col gap-[80px] items-center animate-fadeIn"
          >
            <div className="w-full max-w-[1264px] flex flex-col gap-[80px]">

              {/* 산업 개요 */}
              <div
                ref={contentRef.ref}
                className={`flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-0 ${contentRef.className}`}
              >
                <div className="flex flex-col gap-[80px] lg:w-[640px]" style={{ animationDelay: '0.1s' }}>
                  <h2 className="font-pretendard font-black text-[36px] md:text-[48px] text-[#3a343b] tracking-[-1.2px] leading-[48px]">
                    {activeIndustry.title}
                  </h2>
                  <div className="flex flex-col gap-[20px]">
                    {activeIndustry.description.map((p, i) => (
                      <p key={i} className="font-pretendard text-[20px] md:text-[28px] text-[#161c2d] leading-[48px] tracking-[-1.2px]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
                <div style={{ animation: 'fadeUpIn 0.7s ease 0.25s both' }}>
                  <InteractiveCircle
                    image={activeIndustry.circleImage}
                    alt={activeIndustry.title}
                    markers={activeIndustry.markers}
                    analyzingLabel={t('AI 분석 중', 'AI Analyzing')}
                  />
                </div>
              </div>

              {/* 실제 도입 사례 */}
              <div
                ref={casesRef.ref}
                className={`flex flex-col gap-[40px] ${casesRef.className}`}
              >
                <h3 className="font-pretendard font-medium text-[36px] md:text-[48px] text-[#3a343b] tracking-[-1.2px] leading-[48px]">
                  {t('실제 도입 사례', 'Real-World Case Studies')}
                </h3>

                {/* 프로젝트 필터 탭 */}
                <div className="flex flex-wrap gap-2">
                  {activeIndustry.cases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCaseId(c.id)}
                      className={`px-[24px] md:px-[36px] py-[12px] md:py-[16px] rounded-full text-[14px] md:text-[18px] font-pretendard transition-colors ${
                        activeCaseId === c.id
                          ? 'bg-[#f1f3fd] border border-[#5871ed] text-[#161c2d] font-bold'
                          : 'bg-white border border-[#d4d4d4] text-[#3a343b] font-semibold hover:border-[#5871ed]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* 도입사례 상세 */}
                {activeCase && (
                  <div key={activeCase.id} className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-[40px] animate-fadeIn">
                    <div className="flex flex-col gap-[30px] lg:flex-1 min-w-0">
                      <div className="flex flex-col gap-1">
                        <h4 className="font-pretendard font-bold text-[24px] md:text-[32px] text-black tracking-[-2px] leading-[65px]">
                          {activeCase.title}
                        </h4>
                        <p className="font-pretendard font-medium text-[14px] md:text-[16px] text-[#444] leading-[1.4]">
                          {activeCase.subtitle}
                        </p>
                      </div>
                      <div className="flex flex-col gap-[20px] md:gap-[26px]">
                        {activeCase.features.map((f, i) => (
                          <div key={i} className="flex gap-[14px] items-start"
                            style={{ animation: `fadeUpIn 0.5s ease ${0.1 + i * 0.08}s both` }}>
                            <CheckIcon />
                            <div className="flex flex-col">
                              <p className="font-pretendard text-[16px] md:text-[18px] font-bold text-[#050038] leading-[24px]">
                                {f.title}
                              </p>
                              <p className="font-pretendard text-[14px] md:text-[16px] text-[#050038] leading-[24px]">
                                {f.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`w-full lg:w-[580px] xl:w-[613px] h-[240px] md:h-[380px] lg:h-[447px] rounded-xl shrink-0 ${['crackeye','cityvision','totalcare'].includes(activeCase.id) ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'}`}
                      style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.15)', animation: 'fadeUpIn 0.6s ease 0.2s both' }}
                    >
                      <img
                        src={activeCase.caseImage}
                        alt={activeCase.title}
                        className={['crackeye','cityvision','totalcare'].includes(activeCase.id) ? 'h-full w-auto max-w-none' : 'w-full h-full object-cover object-left-top'}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
