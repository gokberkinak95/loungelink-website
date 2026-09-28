import { KANAT_D } from "../lib/kanat";

// ============================================================
// W1 · UÇUŞ İZİ — kahramanın arkasında (v0.68 · Gökberk onayı)
//
// Markanın KENDİ kanadı (lib/kanat.js ← public/mark-kanat.svg) sol
// alttan sağ üste süzülür, arkasında ince bir iz çizilir. İz ile kanat
// AYNI yolda, AYNI eğriyle ilerler (pathLength=1 + offset-distance):
// iz her karede tam kanadın kuyruğunda biter.
// Açılışta bir kez (1.4 sn sonra, ~4.5 sn), sonra 30 sn'de bir.
// Başlık ve düğmeler yerinde; katman metin kalkanının ALTINDA (z 1).
// 28 Eylül: ilk rota başlığın içinden geçiyordu (kanat "geçir." kelimesinin
// üstünden kayıyordu) — ekran görüntüsünde görüldü, rota yukarı alındı.
// ============================================================
// Rota başlığın ÜSTÜNDEN geçer (menü ile üst etiket arasındaki boşluk):
// kanat hiçbir karede başlık ya da düğme harfinin üstüne binmez.
const YOL = "M -80 620 C 150 300, 380 110, 800 90 S 1380 70, 1700 10";

export default function HeroIz() {
  return (
    <svg className="hero-iz" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="heroIzG" gradientUnits="userSpaceOnUse" x1="-80" y1="620" x2="700" y2="100">
          <stop offset="0" style={{ stopColor: "var(--goldText)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--goldText)", stopOpacity: 0.85 }} />
        </linearGradient>
      </defs>
      <path className="hero-iz-cizgi" d={YOL} pathLength="1" stroke="url(#heroIzG)" />
      <g className="hero-iz-kanat" style={{ offsetPath: `path("${YOL}")` }}>
        <path d={KANAT_D} transform="scale(0.9)" />
      </g>
    </svg>
  );
}
