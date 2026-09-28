// ============================================================
// W9 · KURUCU ÇEMBER ÇİZİMİ (v0.68 · Gökberk onayı)
// Yalnız GEOMETRİ: kaç nokta, kaçı dolu, kaç yer kaldı — hepsi
// KurucuSayac'tan, o da yalnız `kurucu_cember()` RPC'sinden alır.
// (KurucuSayac.jsx'te sabit sayı yasağı var — check.js §8; çizimin
// ölçüleri sayım değil, bu yüzden bu dosyada.)
// ============================================================
export default function KurucuCember({ dolan, kontenjan, kalan }) {
  const adet = Math.max(1, Math.min(200, kontenjan));
  const R = 118;
  return (
    <svg className="kcember-halka" viewBox="0 0 300 300" aria-hidden="true" focusable="false">
      {Array.from({ length: adet }).map((_, i) => {
        const a = (i / adet) * Math.PI * 2 - Math.PI / 2;
        const sinif = i < dolan ? "dolu" : i === dolan ? "sira" : "bos";
        return <circle key={i} className={sinif} cx={150 + Math.cos(a) * R} cy={150 + Math.sin(a) * R}
                       r={sinif === "bos" ? 2.2 : sinif === "sira" ? 3.4 : 3} />;
      })}
      <text className="kh-sayi" x="150" y="152" textAnchor="middle">{kalan}</text>
      <text className="kh-alt" x="150" y="178" textAnchor="middle">YER KALDI</text>
    </svg>
  );
}

