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

// 🔴 3 EKİM 2026 · v7 AVIATION LIGHT — GEOMETRİ AYNI, MÜREKKEP YENİ.
// Sahneler obsidyen zemin için şampanya %10–45 çiziliyordu; fildişi tuvalde
// şampanya neredeyse görünmez. Gövdedeki sahneler artık BRONZ çizgi + GECE
// mavisi halka (app'in v7 yapısal renkleri); ufuk (kapanış) gece bandında
// durduğu için şampanya/şafak kalır. Değerler app V7'den: gold #8A7247 ·
// gece #1A2B4C · goldBtn #D4C3A3 · goldBtnUst #E6DAC4.
const BRONZ = "#8A7247", GECE = "#1A2B4C", SAMPANYA = "#D4C3A3", SAFAK = "#E6DAC4";

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
            <stop offset="0%" stopColor={BRONZ} stopOpacity="0" />
            <stop offset="55%" stopColor={BRONZ} stopOpacity=".32" />
            <stop offset="100%" stopColor={SAMPANYA} stopOpacity=".75" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <g key={i} opacity={0.5 - i * 0.13}>
            <path d={`M-40 ${640 - i * 120} C 300 ${520 - i * 110}, 780 ${330 - i * 90}, 1260 ${120 - i * 70}`}
                  fill="none" stroke={`url(#ct-${uid})`} strokeWidth={3 - i * 0.6} />
          </g>
        ))}
      </svg>
    );
  }

  // 🔴 25 EYLÜL · v0.66 — PİST IŞIKLARI KALDIRILDI. 44 dolu daire, bölüm
  // perdesinin altında gri "toz lekesi" gibi okunuyordu (ekran görüntüsü:
  // #kural ve #kapsam). Sessiz lükste dekor çizgiyle konuşur, noktayla değil:
  // pist artık iki kenar çizgisi + ince orta hat, aynı perspektif.
  if (kind === "runway") {
    return (
      <svg {...common} viewBox="0 0 1200 700">
        <path d="M596 210 L150 700 M604 210 L1050 700" fill="none"
              stroke={BRONZ} strokeOpacity=".16" strokeWidth="1" />
        <path d="M600 230 L600 700" fill="none" stroke={BRONZ}
              strokeOpacity=".10" strokeWidth="1" strokeDasharray="10 18" />
      </svg>
    );
  }

  if (kind === "radar") {
    // GÜVEN — eş merkezli halkalar: kapsama, koruma, ölçüm
    return (
      <svg {...common} viewBox="0 0 1200 700">
        {[120, 220, 330, 450, 580].map((r, i) => (
          <circle key={r} cx="980" cy="350" r={r} fill="none"
                  stroke={GECE} strokeOpacity={0.12 - i * 0.018} strokeWidth="1.5" />
        ))}
        {[170, 290, 400].map((r, i) => (
          <circle key={"g" + r} cx="980" cy="350" r={r} fill="none"
                  stroke={BRONZ} strokeOpacity={0.24 - i * 0.06} strokeWidth="1" />
        ))}
      </svg>
    );
  }

  if (kind === "horizon") {
    // BETA / kapanış — ufuk ve şafak: "kalkışa az kaldı"
    return (
      <svg {...common} viewBox="0 0 1200 700">
        <defs>
          <linearGradient id={`hz-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SAMPANYA} stopOpacity="0" />
            <stop offset="80%" stopColor={SAMPANYA} stopOpacity=".30" />
            <stop offset="100%" stopColor="var(--goldDeep)" stopOpacity=".45" />
          </linearGradient>
        </defs>
        <rect x="0" y="380" width="1200" height="320" fill={`url(#hz-${uid})`} />
        <line x1="0" y1="470" x2="1200" y2="470" stroke={SAFAK} strokeOpacity=".55" strokeWidth="1.5" />
      </svg>
    );
  }

  // KANAT (varsayılan) — dev konik kesit, sayfanın karakteri
  return (
    <svg {...common} viewBox="0 0 1200 700">
      <defs>
        <linearGradient id={`wg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={BRONZ} stopOpacity=".16" />
          <stop offset="60%" stopColor={BRONZ} stopOpacity=".06" />
          <stop offset="100%" stopColor={GECE} stopOpacity=".05" />
        </linearGradient>
      </defs>
      <path d="M1260 -80 C 900 120, 520 330, 60 760 C 520 380, 880 190, 1300 30 Z" fill={`url(#wg-${uid})`} />
      <path d="M1300 90 C 980 250, 700 420, 340 780 C 700 480, 940 330, 1320 190 Z"
            fill={`url(#wg-${uid})`} opacity=".55" />
      <path d="M1280 -60 C 920 140, 540 350, 80 780" fill="none"
            stroke={BRONZ} strokeOpacity=".24" strokeWidth="1.6" />
    </svg>
  );
}
