// ============================================================
// W8 · BOŞ KOLTUK (v0.68 · Gökberk onayı)
// Host'un derdi tek resimde: senin koltuğun dolu, yanındaki boş; bir
// misafir gelir ve o koltuk altın ışıkla dolar. Cümle hemen üstteki
// paragrafta ("yanındaki koltuk boş gitmesin"), burada tekrar edilmez.
// ============================================================
const KOLTUK = (x) => `M ${x} 200 L ${x} 156 Q ${x} 142 ${x + 14} 142 L ${x + 76} 142 Q ${x + 90} 142 ${x + 90} 156 L ${x + 90} 200 M ${x - 10} 172 L ${x + 100} 172 M ${x + 10} 142 L ${x + 10} 98 Q ${x + 10} 84 ${x + 24} 84 L ${x + 66} 84 Q ${x + 80} 84 ${x + 80} 98 L ${x + 80} 142`;

export default function BosKoltuk() {
  return (
    <div className="host-koltuk canli isikli" role="img"
         aria-label="Salonda iki koltuk: biri dolu, diğeri boş; bir misafir gelince boş koltuk altın ışıkla doluyor">
      <svg viewBox="0 0 520 230" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="koltukIsik">
            <stop offset="0" style={{ stopColor: "var(--goldText)", stopOpacity: 0.5 }} />
            <stop offset="1" style={{ stopColor: "var(--goldText)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <line className="hk-zemin" x1="30" y1="200" x2="490" y2="200" />
        <path className="hk-koltuk" d={KOLTUK(130)} />
        <circle className="hk-sen" cx="175" cy="114" r="13" />
        <ellipse className="hk-isik" cx="345" cy="140" rx="92" ry="80" fill="url(#koltukIsik)" />
        <path className="hk-koltuk hk-bos" d={KOLTUK(300)} />
        <circle className="hk-misafir" cx="345" cy="114" r="13" />
      </svg>
    </div>
  );
}
