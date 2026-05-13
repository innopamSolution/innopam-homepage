import { asset } from '../utils/asset';

export const newsItems = [
  // 이노팸 소식
  {
    id: 101,
    date: '2025-04-15',
    category: '이노팸 소식',
    title: '이노팸, 2025 스마트시티 엑스포 참가 및 GeoX 솔루션 시연',
    image: asset('assets/news/20241028.jpg'),
    link: null,
    content: [
      {
        type: 'text',
        value: '이노팸은 2025년 4월 15일부터 17일까지 개최된 2025 스마트시티 엑스포에 참가하여 자사의 GeoX 플랫폼 솔루션 시리즈를 선보였습니다.',
      },
      {
        type: 'text',
        value: '이번 엑스포에서 이노팸은 GeoXRealMap, GeoX CityVision, CrackEyeX 등 주요 제품군을 전시하였으며, 공간정보 기반 AI 기술을 활용한 도시 문제 해결 사례를 발표하였습니다.',
      },
      {
        type: 'image',
        src: asset('assets/news/20241028.jpg'),
        alt: '2025 스마트시티 엑스포 이노팸 부스',
        caption: '2025 스마트시티 엑스포 이노팸 부스 전경',
      },
      {
        type: 'text',
        value: '이노팸 대표는 "GeoAI 기술을 통해 도시·농업·재난·시설물 관리 등 다양한 분야의 문제를 해결할 수 있는 차세대 플랫폼을 계속 발전시켜 나가겠다"고 밝혔습니다.',
      },
      {
        type: 'text',
        value: '이번 행사에는 국내외 스마트시티 관련 기업 및 기관 200여 곳이 참가하였으며, 이노팸은 특히 변화탐지 AI 기술 시연으로 높은 관심을 받았습니다.',
      },
    ],
  },
  {
    id: 102,
    date: '2025-03-10',
    category: '이노팸 소식',
    title: '이노팸, 국토교통부 공간정보 활용 촉진사업 최종 선정',
    image: asset('assets/news/20230209.jpeg'),
    link: null,
    content: [
      {
        type: 'text',
        value: '이노팸이 국토교통부 주관 2025년 공간정보 활용 촉진사업에 최종 선정되었습니다. 이번 사업은 공간정보 기반 AI 기술 개발 및 실증을 목적으로 하며, 이노팸은 총 10개 선정 기업 중 하나로 이름을 올렸습니다.',
      },
      {
        type: 'text',
        value: '이노팸은 이번 사업을 통해 위성·항공·드론 영상 기반의 변화탐지 AI 모델 고도화 및 실증 서비스 개발을 진행할 예정입니다.',
      },
      {
        type: 'image',
        src: asset('assets/news/20230209.jpeg'),
        alt: '국토교통부 공간정보 활용 촉진사업 선정',
        caption: '국토교통부 공간정보 활용 촉진사업 선정 기념',
      },
      {
        type: 'text',
        value: '이노팸 관계자는 "이번 사업 선정을 계기로 GeoAI 기반 공간정보 서비스의 실용화를 더욱 가속화할 수 있을 것으로 기대한다"고 전했습니다.',
      },
    ],
  },
  {
    id: 103,
    date: '2025-01-20',
    category: '이노팸 소식',
    title: '이노팸-제주특별자치도, 스마트 농업 드론 데이터 분석 MOU 체결',
    image: asset('assets/news/20210215.jpeg'),
    link: null,
    content: [
      {
        type: 'text',
        value: '이노팸은 2025년 1월 20일 제주특별자치도와 스마트 농업 드론 데이터 분석 업무협약(MOU)을 체결하였습니다.',
      },
      {
        type: 'text',
        value: '이번 협약을 통해 이노팸은 제주도 내 농업용 드론 영상 데이터를 수집·분석하여 작물 생육 모니터링, 병해충 탐지, 수확량 예측 등 정밀 농업 서비스를 제공할 예정입니다.',
      },
      {
        type: 'image',
        src: asset('assets/news/20210215.jpeg'),
        alt: 'MOU 체결 현장',
        caption: '이노팸-제주특별자치도 MOU 체결 현장',
      },
      {
        type: 'text',
        value: '제주특별자치도 관계자는 "드론과 AI 기술을 접목한 스마트 농업 체계 구축을 통해 농업 생산성 향상과 농가 소득 증대에 기여할 것으로 기대한다"고 말했습니다.',
      },
      {
        type: 'text',
        value: '이노팸은 이번 협약을 시작으로 제주 지역 농업 분야 디지털 전환을 위한 다양한 사업을 추진해 나갈 계획입니다.',
      },
    ],
  },

  // 언론보도
  {
    id: 1,
    date: '2024-10-28',
    category: '언론보도',
    title: "[건설기술] 도시계획 재난·안전 개발제한구역 '모니터링' 신속 정확한 공간정보 분석 기대",
    image: asset('assets/news/20241028.jpg'),
    link: 'https://www.ctman.kr/31971',
    content: null,
  },
  {
    id: 2,
    date: '2023-02-09',
    category: '언론보도',
    title: "[매일건설신문] AI 분석으로 문제 해결… '플랫폼 솔루션 서비스 기업' 될 것",
    image: asset('assets/news/20230209.jpeg'),
    link: 'https://mcnews.co.kr/77976',
    content: null,
  },
  {
    id: 3,
    date: '2023-02-15',
    category: '언론보도',
    title: "[공학저널] 12시간 비행하는 '태양광 드론', 인공지능 더해 산불까지 예방",
    image: asset('assets/news/20210215.jpeg'),
    link: 'http://www.engjournal.co.kr/news/articleView.html?idxno=1310',
    content: null,
  },
  {
    id: 4,
    date: '2020-09-10',
    category: '언론보도',
    title: '[한겨레] 제주 해양은 드론이 지킨다…제주 해안선 147㎞ 비행 성공',
    image: asset('assets/news/20200910.jpeg'),
    link: 'https://www.hani.co.kr/arti/area/jeju/961625.html',
    content: null,
  },
  {
    id: 5,
    date: '2020-09-10',
    category: '언론보도',
    title: "[뉴시스] 제주 '드론'이 괭생이 모자반 위치도 분석시대 돌입",
    image: asset('assets/news/202009102.jpeg'),
    link: 'https://newsis.com/view/?id=NISX20200910_0001161175',
    content: null,
  },
  {
    id: 6,
    date: '2020-12-16',
    category: '언론보도',
    title: '[중앙일보] [미래를 선도하는 제주] 수소드론·자율주행차 가속 … 제주, 신산업의 메카로 뜬다',
    image: asset('assets/news/20201216.jpeg'),
    link: 'https://www.joongang.co.kr/article/23946581',
    content: null,
  },
  {
    id: 7,
    date: '2018-12-09',
    category: '언론보도',
    title: '[연합뉴스] LG유플러스, 드론 활용해 사회기반시설 정밀점검 시연',
    image: asset('assets/news/20181209.jpeg'),
    link: 'https://www.yna.co.kr/view/AKR20181207152600017',
    content: null,
  },
  {
    id: 8,
    date: '2018-10-07',
    category: '언론보도',
    title: '[아시아경제] 서울시, 1인칭 시점 동영상지도·드론맵핑 개발 지원…중소기업 돕는다',
    image: asset('assets/news/20181007.jpeg'),
    link: 'https://www.asiae.co.kr/article/2018100707572000522',
    content: null,
  },
];
