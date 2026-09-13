// ============================================================
// NightScene — hero'nun arkasındaki "gece uçuşu" sahnesi
//
// 🔴 TASARIM KARARI: Lounge Surf'ün gücü karanlık tema DEĞİL, sahnenin
// kendisi — uçak kanadı, dalga, gün batımı. Duyguyu fotoğraf taşıyor.
// Bizim elimizde lisanslı fotoğraf YOK ve stok görsel indirmek hem
// hukuken hem marka olarak zayıf bir çözüm. Bu yüzden sahneyi KODLA
// kuruyoruz: SVG + gradyan + grain. Avantajı sadece lisans değil —
// her ekran boyutunda keskin, 0 KB ağ maliyeti, ve rengi markanın
// altınına birebir kilitli. Rakibin fotoğrafını taklit etmiyoruz;
// aynı duyguyu kendi malzememizle kuruyoruz.
//
// Sahne katmanları (arkadan öne):
//   1. Gece gradyanı (ufuk çizgisine doğru açılan lacivert)
//   2. Şehir ışıkları — aşağıda dağınık altın noktalar
//   3. Uçak kanadı silueti — sağ alttan çapraz giren gerçek kanat formu
//   4. Kanat ucu ışığı (yavaş yanıp sönen) + motor parıltısı
//   5. Grain + vinyet: dijital düzlüğü kırar, "fotoğraf" hissi verir
// ============================================================
export default function NightScene() {
  // Şehir ışıkları deterministik üretilir — her build'de aynı sahne
  // (rastgele olsaydı görsel regresyon denetimi anlamsızlaşırdı).
  const lights = [];
  let seed = 20260813;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  for (let i = 0; i < 90; i++) {
    lights.push({
      x: rnd() * 100,
      y: 66 + rnd() * 30,
      r: 0.6 + rnd() * 1.6,
      o: 0.15 + rnd() * 0.65,
    });
  }

  return (
    <div className="scene" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="scene-svg">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070B16" />
            <stop offset="46%" stopColor="#0D1526" />
            <stop offset="72%" stopColor="#16203A" />
            <stop offset="100%" stopColor="#241E1B" />
          </linearGradient>
          <radialGradient id="dawn" cx="78%" cy="74%" r="55%">
            <stop offset="0%" stopColor="#B8943A" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#8A5A2B" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#070B16" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A0F1C" />
            <stop offset="70%" stopColor="#141B2E" />
            <stop offset="100%" stopColor="#1E2740" />
          </linearGradient>
          <radialGradient id="tipglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE9B0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B8943A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100" height="100" fill="url(#sky)" />
        <rect width="100" height="100" fill="url(#dawn)" />

        {/* şehir ışıkları */}
        {lights.map((l, i) => (
          <circle key={i} cx={l.x} cy={l.y} r={l.r * 0.16} fill="#F4D79A" opacity={l.o} />
        ))}

        {/* ufuk */}
        <rect x="0" y="66" width="100" height="0.18" fill="#7C6A4A" opacity="0.35" />

        {/* uçak kanadı — sağ alttan çapraz giren gerçek kanat formu */}
        <g className="wing">
          <path
            d="M118 104 L34 78 L22 74.4 Q18.5 73.2 20.6 71.6 L27 69.2 L96 84 Z"
            fill="url(#wing)"
          />
          {/* kanat üstü ışık kırılması */}
          <path
            d="M27 69.2 L96 84 L118 104 L34 78 Z"
            fill="none"
            stroke="#B8943A"
            strokeOpacity="0.28"
            strokeWidth="0.22"
          />
          {/* winglet */}
          <path d="M27 69.2 L20.6 71.6 L19.2 67.4 L25.4 66.2 Z" fill="#101728" />
          {/* kanat ucu ışığı */}
          <circle className="tip" cx="21.5" cy="67" r="2.4" fill="url(#tipglow)" />
          <circle className="tip" cx="21.5" cy="67" r="0.42" fill="#FFF3D2" />
        </g>
      </svg>
      <div className="grain" />
      <div className="vignette" />
    </div>
  );
}
