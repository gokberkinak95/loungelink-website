"use client";
import { useEffect, useState } from "react";

// ============================================================
// W5 · KAPSAM TAKIMYILDIZI (v0.68 · Gökberk onayı)
//
// Havalimanı listesinin üstünde, gerçek koordinatlara göre bir nokta
// haritası. Harita çizgisi yok, yalnız ışık: İstanbul'dan yaylar,
// salonu çok olan nokta daha sık nabız atar. Listedeki havalimanına
// gelince (fare ya da klavye) haritadaki noktası parlar; noktaya
// gelince listedeki satır vurgulanır.
//
// 28 Eylül düzeltmesi — önizlemede IST/SAW ve ADA/COV ETİKETLERİ ÜST
// ÜSTEYDİ (iki havalimanı ~25–40 km arayla; haritada 8–16 px). Her
// etiketin yönü artık elle ve ölçüyle: YER tablosu. Yeni havalimanı
// varsayılan yöne (sağ üst) düşer.
// ============================================================
const KOOR = {
  IST: [28.75, 41.26], SAW: [29.31, 40.90], ESB: [32.99, 40.13], ADB: [27.16, 38.29],
  AYT: [30.80, 36.90], DLM: [28.79, 36.71], BJV: [27.66, 37.25], COV: [34.99, 36.88],
  DIY: [40.20, 37.89], ADA: [35.28, 36.98], ASR: [35.49, 38.77], GZT: [37.48, 36.95],
  HTY: [36.28, 36.36], RZV: [40.83, 41.17], TZX: [39.79, 40.99],
};
// [dx, dy, yön] — yön "s" = etiket noktanın SOLUNDA biter
const YER = { IST: [-9, -5, "s"], SAW: [9, 13], ADA: [7, -8], COV: [-8, 13, "s"], BJV: [-8, -6, "s"], DLM: [-8, 13, "s"] };
const KAT = 0.777;             // cos(39°) — boylam daralması
const OL = 48;                 // derece başına px
function xy([lon, lat]) { return [36 + (lon - 26) * KAT * OL, 312 - (lat - 36) * OL]; }

export default function KapsamHaritasi({ havalimanlari }) {
  const [aktif, setAktif] = useState(null);
  const liste = havalimanlari.filter((h) => KOOR[h.code]);
  const ist = xy(KOOR.IST);

  // liste → harita
  useEffect(() => {
    const satirlar = Array.from(document.querySelectorAll(".cover-item[data-kod]"));
    const temiz = satirlar.map((el) => {
      const gir = () => setAktif(el.dataset.kod);
      const cik = () => setAktif((a) => (a === el.dataset.kod ? null : a));
      el.addEventListener("pointerenter", gir); el.addEventListener("pointerleave", cik);
      el.addEventListener("focusin", gir); el.addEventListener("focusout", cik);
      return () => {
        el.removeEventListener("pointerenter", gir); el.removeEventListener("pointerleave", cik);
        el.removeEventListener("focusin", gir); el.removeEventListener("focusout", cik);
      };
    });
    return () => temiz.forEach((f) => f());
  }, []);
  // harita → liste
  useEffect(() => {
    document.querySelectorAll(".cover-item[data-kod]").forEach((el) =>
      el.classList.toggle("vurgu", el.dataset.kod === aktif));
  }, [aktif]);

  return (
    <div className="kapsam-harita canli isikli" role="img"
         aria-label="Türkiye havalimanları: İstanbul'dan diğer havalimanlarına ışık yaylar, salonu çok olanlar daha sık nabız atıyor">
      <svg viewBox="0 0 640 330" aria-hidden="true" focusable="false">
        <text className="kh-baslik" x="30" y="34">KAPSAM · TÜRKİYE</text>
        <g>
          {liste.filter((h) => h.code !== "IST").map((h, i) => {
            const p = xy(KOOR[h.code]);
            const dx = p[0] - ist[0], dy = p[1] - ist[1], uz = Math.hypot(dx, dy);
            const mx = (ist[0] + p[0]) / 2 + dy * 0.12, my = (ist[1] + p[1]) / 2 - uz * 0.16;
            return <path key={h.code} className={"kh-yay" + (aktif === h.code ? " on" : "")} pathLength="1"
                         style={{ animationDelay: `${i * 0.35}s` }}
                         d={`M ${ist[0]} ${ist[1]} Q ${mx} ${my} ${p[0]} ${p[1]}`} />;
          })}
        </g>
        {liste.map((h, i) => {
          const [x, y] = xy(KOOR[h.code]);
          const [ox, oy, yon] = YER[h.code] || [7, -7];
          const ana = h.code === "IST";
          return (
            <g key={h.code} className={"kh-nokta" + (aktif === h.code ? " on" : "")}
               onPointerEnter={() => setAktif(h.code)} onPointerLeave={() => setAktif(null)}>
              <circle className="kh-nabiz" cx={x} cy={y} r="3"
                      style={{ animationDuration: `${(4.4 - Math.min(3, h.n * 0.32)).toFixed(2)}s`, animationDelay: `${i * 0.2}s` }} />
              <circle className={ana ? "kh-cekirdek ana" : "kh-cekirdek"} cx={x} cy={y} r={ana ? 4.5 : 3} />
              <circle cx={x} cy={y} r="11" fill="transparent" />
              <text className="kh-etiket" x={x + ox} y={y + oy} textAnchor={yon === "s" ? "end" : "start"}>{h.code}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
