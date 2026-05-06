const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src-6UEcfBGS.js","assets/chunk-CaILmz35.js"])))=>i.map(i=>d[i]);
import{n as e}from"./chunk-CaILmz35.js";import{n as t,r as n,t as r}from"./index-BQPepAC0.js";var i=e(n(),1),a=r(),o=[{name:`본사`,address:`서울시 용산구 원효로 146
금강프라임빌딩 6층, 13층`,lat:37.5387,lng:126.9638},{name:`제주지사`,address:`제주특별자치도 제주시
신대로 145. 2층 005호`,lat:33.4996,lng:126.5312}];function s(){let n=(0,i.useRef)(null),r=(0,i.useRef)(null);return(0,i.useEffect)(()=>{if(!r.current)return t(()=>import(`./leaflet-src-6UEcfBGS.js`).then(t=>e(t.default,1)).then(e=>{let t=e.map(n.current,{center:[36.5,127.5],zoom:7,scrollWheelZoom:!1});e.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`,maxZoom:19}).addTo(t);let i=e.divIcon({className:``,html:`
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
        `,iconSize:[14,26],iconAnchor:[7,26],popupAnchor:[0,-28]});o.forEach(n=>{let r=e.marker([n.lat,n.lng],{icon:i}).addTo(t);r.bindPopup(`
          <div style="font-family: 'Pretendard Variable', sans-serif; min-width: 180px;">
            <p style="font-weight: 700; font-size: 15px; color: #5871ed; margin: 0 0 6px 0;">${n.name}</p>
            <p style="font-size: 13px; color: #3a343b; margin: 0; line-height: 1.6; white-space: pre-line;">${n.address}</p>
          </div>
        `,{maxWidth:240}),r.openPopup()});let a=e.latLngBounds(o.map(e=>[e.lat,e.lng]));t.fitBounds(a,{padding:[80,80]}),r.current=t}),__vite__mapDeps([0,1])),()=>{r.current&&=(r.current.remove(),null)}},[]),(0,a.jsx)(`div`,{ref:n,style:{width:`100%`,height:`875px`,border:`1px solid #e9e9e9`}})}export{s as default};