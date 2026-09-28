// ============================================================
// W7 · GÜVEN, ÇİZİLEREK (v0.68 · Gökberk onayı)
//
// 28 Eylül düzeltmesi — önizlemede kalkan ve tikler YARIM kalıyordu:
// kesik uzunluğu (520 / 24) yolların gerçek boyundan (≈570 / 73 / 30)
// kısaydı, çizgi hiç kapanmıyordu. Artık her yol `pathLength="1"`:
// kesik = 1, boy ne olursa olsun çizim TAMAMLANIR.
// Üç satır uygulamadaki üç gerçek doğrulama (e-posta · telefon · kimlik).
// ============================================================
const SATIR = ["E-posta doğrulandı", "Telefon doğrulandı", "Kimlik doğrulandı"];

export default function GuvenKalkan() {
  return (
    <div className="guven-sahne canli isikli" role="img"
         aria-label="Kalkan çiziliyor, içine tik atılıyor; e-posta, telefon ve kimlik sırayla doğrulanıyor">
      <svg viewBox="0 0 560 300" aria-hidden="true" focusable="false">
        <path className="gk-kalkan" pathLength="1"
              d="M 130 34 L 212 64 L 212 146 C 212 204, 172 242, 130 262 C 88 242, 48 204, 48 146 L 48 64 Z" />
        <path className="gk-tik gk-ana" pathLength="1" d="M 102 150 L 122 170 L 160 128" />
        {SATIR.map((s, i) => (
          <g key={s} className={"gk-satir s" + i}>
            <path className="gk-tik" pathLength="1" d={`M 282 ${92 + i * 60} l 8 8 l 16 -17`} />
            <text x="322" y={100 + i * 60}>{s}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
