import { useEffect, useRef, useState } from 'react';

// Kakao Maps — 이노팸 본사 + 제주지사
// API key: 90f5dafdbae17caebd268e8fb311edd3
// Design: innopam.com/introduction/ 동일

const BASE = import.meta.env.BASE_URL;
const KAKAO_APP_KEY = '0ba52bd34c4b5acf99b451a8123e3dd7';

const positions = [
  {
    name: '이노팸 본사',
    lat: 37.5341955,
    lng: 126.95934,
    img: `${BASE}assets/map/innopam_ys.jpg`,
    address: '서울시 용산구 원효로 146\n금강프라임빌딩 6층, 13층',
  },
  {
    name: '이노팸 제주지사',
    lat: 33.4976,
    lng: 126.5312,
    img: `${BASE}assets/map/innopam_ys.jpg`,
    address: '제주특별자치도 제주시\n신대로 145. 2층 005호',
  },
];

function initMap(mapContainer) {
  const { maps } = window.kakao;

  const map = new maps.Map(mapContainer, {
    center: new maps.LatLng(36.0, 127.5),
    level: 10,
    scrollwheel: false,
  });

  const zoomControl = new maps.ZoomControl();
  map.addControl(zoomControl, maps.ControlPosition.RIGHT);

  const bounds = new maps.LatLngBounds();

  positions.forEach((pos) => {
    const latlng = new maps.LatLng(pos.lat, pos.lng);
    bounds.extend(latlng);

    new maps.Marker({ map, position: latlng });

    const content = `
      <div class="innopam-overlaybox">
        <div class="innopam-boxtitle">${pos.name}</div>
        <img src="${pos.img}" alt="${pos.name}" />
        <ul>
          <li class="up">
            <a href="http://map.daum.net/link/map/${encodeURIComponent(pos.name)},${pos.lat},${pos.lng}" target="_blank">큰지도로 보기</a>
          </li>
          <li>
            <a href="http://map.daum.net/link/to/${encodeURIComponent(pos.name)},${pos.lat},${pos.lng}" target="_blank">길찾기</a>
          </li>
        </ul>
        <address>${pos.address}</address>
      </div>`;

    new maps.CustomOverlay({
      map,
      position: latlng,
      content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });
  });

  map.setBounds(bounds, 120);
}

export default function KakaoMap() {
  const mapRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => initMap(mapRef.current));
      return;
    }

    // 스크립트 동적 로드
    const existing = document.querySelector('script[src*="dapi.kakao.com"]');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => initMap(mapRef.current));
      } else {
        setError(true);
      }
    };
    script.onerror = () => setError(true);
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <style>{`
        .innopam-overlaybox {
          position: relative;
          width: 280px;
          background: url('${BASE}assets/map/box_movie.png') no-repeat top left;
          background-size: 280px auto;
          padding: 14px 10px 14px 12px;
          cursor: default;
        }
        .innopam-overlaybox .innopam-boxtitle {
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Pretendard Variable', sans-serif;
          margin-bottom: 6px;
        }
        .innopam-overlaybox img {
          width: 195px;
          height: 108px;
          object-fit: cover;
          display: block;
          margin: 6px 0;
        }
        .innopam-overlaybox ul {
          list-style: none;
          margin: 0;
          padding: 0;
          width: 195px;
        }
        .innopam-overlaybox li {
          background: #2b2d36;
          padding: 5px 10px;
          margin-bottom: 2px;
        }
        .innopam-overlaybox li a {
          color: #fff;
          font-size: 12px;
          font-family: 'Pretendard Variable', sans-serif;
          text-decoration: none;
        }
        .innopam-overlaybox li:hover { background-color: #1057C1; }
        .innopam-overlaybox address {
          color: #00E3FF;
          width: 195px;
          white-space: pre-line;
          margin-top: 6px;
          font-size: 11px;
          font-family: 'Pretendard Variable', sans-serif;
          font-style: normal;
          line-height: 1.5;
        }
      `}</style>

      {error ? (
        <div
          className="w-full border border-[#e9e9e9] bg-[#f4f7fa] flex flex-col items-center justify-center gap-3"
          style={{ height: '875px' }}
        >
          <p className="font-pretendard text-[#3a343b] text-[18px] font-medium">
            카카오맵 도메인 등록이 필요합니다
          </p>
          <p className="font-pretendard text-[#6d758f] text-[14px]">
            Kakao Developers에서{' '}
            <code className="bg-white px-2 py-1 rounded border border-[#e9e9e9]">innopamsolution.github.io</code>{' '}
            도메인을 등록해주세요.
          </p>
        </div>
      ) : (
        <div
          ref={mapRef}
          style={{ width: '100%', height: '875px', border: '1px solid #e9e9e9' }}
        />
      )}
    </>
  );
}
