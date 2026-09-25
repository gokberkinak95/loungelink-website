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
            <stop offset="0%" stopColor="#C9B693" stopOpacity="0" />
            <stop offset="55%" stopColor="#C9B693" stopOpacity=".55" />
            <stop offset="100%" stopColor="#E4D6BC" stopOpacity=".9" />
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
              stroke="#C9B693" strokeOpacity=".16" strokeWidth="1" />
        <path d="M600 230 L600 700" fill="none" stroke="#C9B693"
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
                  stroke="#6E6A72" strokeOpacity={0.30 - i * 0.045} strokeWidth="1.5" />
        ))}
        {[170, 290, 400].map((r, i) => (
          <circle key={"g" + r} cx="980" cy="350" r={r} fill="none"
                  stroke="#C9B693" strokeOpacity={0.26 - i * 0.06} strokeWidth="1" />
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
            <stop offset="0%" stopColor="#C9B693" stopOpacity="0" />
            <stop offset="80%" stopColor="#C9B693" stopOpacity=".30" />
            <stop offset="100%" stopColor="var(--goldDeep)" stopOpacity=".45" />
          </linearGradient>
        </defs>
        <rect x="0" y="380" width="1200" height="320" fill={`url(#hz-${uid})`} />
        <line x1="0" y1="470" x2="1200" y2="470" stroke="#E4D6BC" strokeOpacity=".45" strokeWidth="1.5" />
      </svg>
    );
  }

  // KANAT (varsayılan) — dev konik kesit, sayfanın karakteri
  return (
    <svg {...common} viewBox="0 0 1200 700">
      <defs>
        <linearGradient id={`wg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C9B693" stopOpacity=".34" />
          <stop offset="60%" stopColor="#C9B693" stopOpacity=".12" />
          <stop offset="100%" stopColor="#6E6A72" stopOpacity=".10" />
        </linearGradient>
      </defs>
      <path d="M1260 -80 C 900 120, 520 330, 60 760 C 520 380, 880 190, 1300 30 Z" fill={`url(#wg-${uid})`} />
      <path d="M1300 90 C 980 250, 700 420, 340 780 C 700 480, 940 330, 1320 190 Z"
            fill={`url(#wg-${uid})`} opacity=".55" />
      <path d="M1280 -60 C 920 140, 540 350, 80 780" fill="none"
            stroke="#C9B693" strokeOpacity=".38" strokeWidth="1.6" />
    </svg>
  );
}
