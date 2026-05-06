import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

// 본사: 서울시 용산구 원효로 146
// 제주지사: 제주특별자치도 제주시 신대로 145
const offices = [
  {
    name: '본사',
    address: '서울시 용산구 원효로 146\n금강프라임빌딩 6층, 13층',
    lat: 37.5387,
    lng: 126.9638,
  },
  {
    name: '제주지사',
    address: '제주특별자치도 제주시\n신대로 145. 2층 005호',
    lat: 33.4996,
    lng: 126.5312,
  },
];

export default function InnopamMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return; // already initialized

    import('leaflet').then((L) => {
      const map = L.map(mapRef.current, {
        center: [36.5, 127.5],
        zoom: 7,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom marker icon
      const markerIcon = L.divIcon({
        className: '',
        html: `
          <div style="
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
          ">
            <div style="
              width: 14px;
              height: 14px;
              background: #5871ed;
              border: 3px solid #fff;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(88,113,237,0.5);
            "></div>
            <div style="
              width: 2px;
              height: 12px;
              background: #5871ed;
            "></div>
          </div>
        `,
        iconSize: [14, 26],
        iconAnchor: [7, 26],
        popupAnchor: [0, -28],
      });

      offices.forEach((office) => {
        const marker = L.marker([office.lat, office.lng], { icon: markerIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: 'Pretendard Variable', sans-serif; min-width: 180px;">
            <p style="font-weight: 700; font-size: 15px; color: #5871ed; margin: 0 0 6px 0;">${office.name}</p>
            <p style="font-size: 13px; color: #3a343b; margin: 0; line-height: 1.6; white-space: pre-line;">${office.address}</p>
          </div>
        `, { maxWidth: 240 });
        marker.openPopup();
      });

      // Fit bounds to show both markers
      const bounds = L.latLngBounds(offices.map((o) => [o.lat, o.lng]));
      map.fitBounds(bounds, { padding: [80, 80] });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '875px', border: '1px solid #e9e9e9' }}
    />
  );
}
