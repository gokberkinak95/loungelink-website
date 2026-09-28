import { KANAT_D } from "../lib/kanat";

// ============================================================
// W4 · ROTA ÜSTÜNDE ÜÇ ADIM (v0.68 · Gökberk onayı)
//
// Üç adım kartının ÜSTÜNDE tek bir uçuş rotası; duraklar kartların
// sütun ortalarına oturur (.flow 3 sütun · 22px aralık → %16 · %50 · %84).
// Markanın kanadı rota boyunca ilerler, vardığı durak altınla yanar.
// Kart metinleri aynen altta. Telefonda rota dikey: kartların solunda
// kesikli bir çizgi ve aşağı süzülen aynı kanat.
// ============================================================
const YOL = "M 160 58 C 280 -4, 380 -4, 500 58 S 720 120, 840 58";

export default function RotaAkis() {
  return (
    <>
      <svg className="rota-yatay" viewBox="0 0 1000 116" aria-hidden="true" focusable="false">
        <path className="rota-cizgi" d={YOL} />
        <circle className="rota-dur a" cx="160" cy="58" r="9" />
        <circle className="rota-dur b" cx="500" cy="58" r="9" />
        <circle className="rota-dur c" cx="840" cy="58" r="9" />
        <g className="rota-kanat" style={{ offsetPath: `path("${YOL}")` }}>
          <path d={KANAT_D} transform="scale(0.5)" />
        </g>
      </svg>
      <span className="rota-dikey" aria-hidden="true">
        <svg viewBox="-4 -34 72 40" focusable="false"><path d={KANAT_D} /></svg>
      </span>
    </>
  );
}
