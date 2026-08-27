// ============================================================
// SectionScene — HER BÖLÜMÜN KENDİ SAHNESİ
//
// 🔴 GERÇEK SORUN (Gökberk üç kez söyledi, üçünde de yanlış çözdüm):
// "Arka plan çok sade, sadece sayfanın başında bir şey var."
// Doğruydu. Ben global bir `aurora` katmanı koymuştum ve opaklığını
// %13'e ayarlamıştım — yani teknik olarak vardı, görsel olarak yoktu.
// "Ekledim" demek yetmiyor; GÖRÜNMESİ gerekiyor.
//
// Lounge Surf'ün yaptığı şey tek bir global doku değil: her bölümde
// BÜYÜK, NET bir form var ve scroll ettikçe sahne değişiyor. Göz her
// bölümde yeni bir şey buluyor, sayfa "devam ediyor" hissi veriyor.
//
// Bu bileşen aynı işi yapar ama bizim geometrimizle: kanat, jet izi,
// pist, radar, ufuk. Hepsi SVG — 0 KB'a yakın, her ekranda keskin,
// tek vurgu rengi (altın) ve bir yardımcı ton (teal) dışında renk yok.
//
// Opaklıklar BİLEREK yüksek (0.18–0.45): görünmeyen dekor, olmayan
// dekordur. Metin okunabilirliği bölümlerin kendi scrim'leriyle korunur.
// ============================================================
let __sceneSeq = 0;

export default function SectionScene({ kind = "wing", flip = false, id }) {
  // Her örnek kendi gradyan kimliğini taşır; aynı sahne iki kez
  // kullanılsa da gradyanlar karışmaz.
  const uid = id || `${kind}${(__sceneSeq = (__sceneSeq + 1) % 1000)}`;
  const common = {
    className: "sec-scene" + (flip ? " flip" : ""),
    "aria-hidden": "true",
    preserveAspectRatio: "xMidYMid slice",
  };

  if (kind === "contrail") {
    // AKIŞ — üç jet izi, sayfayı çapraz kesiyor: hareket ve yön
    return (
      <svg {...common} viewBox="0 0 1200 700">
        <defs>
          <linearGradient id={`ct-${uid}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#B8943A" stopOpacity="0" />
            <stop offset="55%" stopColor="#B8943A" stopOpacity=".55" />
            <stop offset="100%" stopColor="#F4D79A" stopOpacity=".9" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <g key={i} opacity={0.5 - i * 0.13}>
            <path d={`M-40 ${640 - i * 120} C 300 ${520 - i * 110}, 780 ${330 - i * 90}, 1260 ${120 - i * 70}`}
                  fill="none" stroke={`url(#ct-${uid})`} strokeWidth={3 - i * 0.6} />
            <circle cx={1240 - i * 40} cy={128 - i * 70} r={4 - i} fill="#F4D79A" />
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "runway") {
    // KURAL — perspektifte daralan pist ışıkları: "karar" hissi
    const rows = Array.from({ length: 22 }, (_, i) => i / 21);
    return (
      <svg {...common} viewBox="0 0 1200 700">
        {rows.map((t, i) => {
          const y = 210 + 500 * Math.pow(t, 1.7);
          const sp = 40 + 560 * Math.pow(t, 1.55);
          const r = 2 + t * 7;
          const o = 0.15 + t * 0.5;
          return (
            <g key={i} opacity={o}>
              <circle cx={600 - sp} cy={y} r={r} fill="#F4D79A" />
              <circle cx={600 + sp} cy={y} r={r} fill="#F4D79A" />
            </g>
          );
        })}
        <path d="M594 210 L606 210 L760 700 L440 700 Z" fill="#B8943A" opacity=".07" />
      </svg>
    );
  }

  if (kind === "radar") {
    // GÜVEN — eş merkezli halkalar: kapsama, koruma, ölçüm
    return (
      <svg {...common} viewBox="0 0 1200 700">
        {[120, 220, 330, 450, 580].map((r, i) => (
          <circle key={r} cx="980" cy="350" r={r} fill="none"
                  stroke="#0D9488" strokeOpacity={0.30 - i * 0.045} strokeWidth="1.5" />
        ))}
        {[170, 290, 400].map((r, i) => (
          <circle key={"g" + r} cx="980" cy="350" r={r} fill="none"
                  stroke="#B8943A" strokeOpacity={0.26 - i * 0.06} strokeWidth="1" />
        ))}
        <circle cx="980" cy="350" r="7" fill="#B8943A" opacity=".7" />
      </svg>
    );
  }

  if (kind === "horizon") {
    // BETA / kapanış — ufuk ve şafak: "kalkışa az kaldı"
    return (
      <svg {...common} viewBox="0 0 1200 700">
        <defs>
          <linearGradient id={`hz-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B8943A" stopOpacity="0" />
            <stop offset="80%" stopColor="#B8943A" stopOpacity=".30" />
            <stop offset="100%" stopColor="var(--goldDeep)" stopOpacity=".45" />
          </linearGradient>
        </defs>
        <rect x="0" y="380" width="1200" height="320" fill={`url(#hz-${uid})`} />
        <line x1="0" y1="470" x2="1200" y2="470" stroke="#F4D79A" strokeOpacity=".45" strokeWidth="1.5" />
        {Array.from({ length: 46 }, (_, i) => (
          <circle key={i} cx={(i * 137) % 1200} cy={500 + ((i * 61) % 170)} r={1.6 + (i % 3)}
                  fill="#F4D79A" opacity={0.25 + ((i % 5) / 12)} />
        ))}
      </svg>
    );
  }

  // KANAT (varsayılan) — dev konik kesit, sayfanın karakteri
  return (
    <svg {...common} viewBox="0 0 1200 700">
      <defs>
        <linearGradient id={`wg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8943A" stopOpacity=".34" />
          <stop offset="60%" stopColor="#B8943A" stopOpacity=".12" />
          <stop offset="100%" stopColor="#0D9488" stopOpacity=".10" />
        </linearGradient>
      </defs>
      <path d="M1260 -80 C 900 120, 520 330, 60 760 C 520 380, 880 190, 1300 30 Z" fill={`url(#wg-${uid})`} />
      <path d="M1300 90 C 980 250, 700 420, 340 780 C 700 480, 940 330, 1320 190 Z"
            fill={`url(#wg-${uid})`} opacity=".55" />
      <path d="M1280 -60 C 920 140, 540 350, 80 780" fill="none"
            stroke="#B8943A" strokeOpacity=".38" strokeWidth="1.6" />
      <circle cx="1268" cy="-52" r="6" fill="#F4D79A" opacity=".8" />
    </svg>
  );
}
