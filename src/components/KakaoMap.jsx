import { useEffect, useRef, useState } from 'react';

// Kakao Maps — 이노팸 본사 + 제주지사
// SDK: index.html에 <script autoload=false> 로 삽입, 여기서 kakao.maps.load() 호출
// Design: innopam.com/introduction/ 동일

const BASE = import.meta.env.BASE_URL;

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

  // 본사 기준 중심 고정 (innopam.com/introduction/ 동일)
  const map = new maps.Map(mapContainer, {
    center: new maps.LatLng(37.583235, 127.010390),
    level: 9,
    scrollwheel: true,
  });

  const zoomControl = new maps.ZoomControl();
  map.addControl(zoomControl, maps.ControlPosition.RIGHT);

  positions.forEach((pos) => {
    const latlng = new maps.LatLng(pos.lat, pos.lng);

    new maps.Marker({ map, position: latlng });

    const content = `
      <div class="innopam-overlaybox">
        <div class="boxtitle">${pos.name}</div>
        <img src="${pos.img}" alt="${pos.name}" />
        <ul>
          <li class="up">
            <a href="http://map.daum.net/link/map/${encodeURIComponent(pos.name)},${pos.lat},${pos.lng}" target="_blank" class="title">큰지도로 보기</a>
          </li>
          <li>
            <a href="http://map.daum.net/link/to/${encodeURIComponent(pos.name)},${pos.lat},${pos.lng}" target="_blank" class="title">길찾기</a>
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
  // setBounds 미사용 — 본사 중심 고정
}

export default function KakaoMap() {
  const mapRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Kakao Maps SDK is loaded via <script> in index.html (autoload=false)
    // kakao.maps.load() triggers lazy initialization then fires the callback
    if (!window.kakao?.maps?.load) {
      setError(true);
      return;
    }
    let cancelled = false;
    window.kakao.maps.load(() => {
      if (!cancelled && mapRef.current) initMap(mapRef.current);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <style>{`
        .innopam-overlaybox {
          position: relative;
          width: 360px;
          height: 350px;
          /* 배경 자연 크기(392×350px) 그대로 — 오른쪽 32px만 클립, 높이 완전 일치 */
          background: url('${BASE}assets/map/box_movie.png') no-repeat top left;
          padding: 15px 10px;
          cursor: default;
          overflow: hidden;
          box-sizing: border-box;
        }
        .innopam-overlaybox .boxtitle {
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          font-family: 'Pretendard Variable', sans-serif;
          background: url('${BASE}assets/map/arrow_white.png') no-repeat right 120px center;
          margin: 0 0 8px 0;
          padding: 0;
        }
        .innopam-overlaybox img {
          position: relative;
          width: 247px;
          height: 136px;
          object-fit: cover;
          display: block;
          margin: 8px 0;
        }
        .innopam-overlaybox ul {
          list-style: none;
          width: 247px;
          margin: 0;
          padding: 0;
        }
        .innopam-overlaybox li {
          position: relative;
          margin-bottom: 2px;
          background: #2b2d36;
          padding: 5px 10px;
          color: #aaabaf;
          line-height: 1;
          list-style: none;
        }
        .innopam-overlaybox li a {
          color: #fff;
          font-size: 13px;
          font-family: 'Pretendard Variable', sans-serif;
          text-decoration: none;
        }
        .innopam-overlaybox li a:hover { color: #fff; }
        .innopam-overlaybox li:hover { color: #fff; background-color: #1057C1; }
        .innopam-overlaybox li:active { background-color: #1057C1; transition: all ease .5s; }
        .innopam-overlaybox address {
          color: #00E3FF;
          width: 247px;
          white-space: pre-line;
          margin-top: 7px;
          font-size: .92em;
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
