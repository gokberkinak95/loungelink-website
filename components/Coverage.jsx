import { TR_AIRPORTS, ABROAD_AIRPORTS, LOUNGE_COUNTS, splitScope } from "../lib/lounges-data";

// ============================================================
// KAPSAM — "Kartınla nereye girebilirsin?"
//
// 🔴 GÖKBERK'İN BULGUSU: bu ekranda yalnız IST ve Sabiha Gökçen
// görünüyordu; oysa katalog 219 havalimanı taşıyor. Kapsamı
// göstermemek, olmamakla aynı şey.
//
// 🔴 NEDEN <details>: havalimanı seçilince salonları açılmalı ama
// bu bir pazarlama sitesi — 219 havalimanını JS'e bağlamak, JS
// yüklenene kadar boş bir liste demek (ve arama motoru için hiçbir
// şey). <details> tarayıcının kendi açılır davranışı: klavyeyle
// çalışır, ekran okuyucu okur, JS'siz açılır, HTML'de içerik VAR.
//
// 🔴 İÇ HAT / DIŞ HAT AYRIMI kapsam kolonundan gelir. Aynı isimli
// iki salon (IST Business iç hat + dış hat) İKİ AYRI SALONDUR;
// birleştirmek kullanıcıyı yanlış terminale yollar.
// ============================================================
function Grup({ baslik, list }) {
  if (!list.length) return null;
  return (
    <div className="cover-group">
      <div className="cover-group-t">{baslik}</div>
      <ul>
        {list.map((l, i) => (
          <li key={l.name + i}>
            <b>{l.name}</b>
            {l.section && <span className="cover-tag">{l.section}</span>}
            {l.terminal && <span className="cover-term">{l.terminal}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Coverage({ limit = 12 }) {
  const tr = TR_AIRPORTS.slice(0, limit);
  const c = LOUNGE_COUNTS;

  return (
    <div className="cover">
      <p className="cover-lead">
        Türkiye&apos;de <b>{c.trAirports} havalimanı</b>, <b>{c.trLounges} salon</b>.
        Havalimanını aç, hangi salonun iç hatta hangisinin dış hatta olduğunu gör.
      </p>

      <div className="cover-list">
        {tr.map((a) => {
          const s = splitScope(a);
          return (
            <details key={a.code} className="cover-item">
              <summary>
                <span className="mono cover-code">{a.code}</span>
                <span className="cover-name">{a.name}</span>
                <span className="cover-n">{a.lounges.length} salon</span>
              </summary>
              <div className="cover-body">
                <Grup baslik="İç hat" list={s.domestic} />
                <Grup baslik="Dış hat" list={s.international} />
              </div>
            </details>
          );
        })}
      </div>

      {/* Yurt dışı ÖZETLENİR, sayılmaz: ana pazar Türkiye ve uzun bir
          liste ana pazarı gömer. Ama sayı somut ve doğrulanabilir. */}
      <p className="cover-more">
        ve <b>{c.abroadCountries} ülkede {c.abroadLounges} salon daha</b> —{" "}
        {ABROAD_AIRPORTS.length} havalimanı katalogda. Uçuşunu yazdığın anda
        o havalimanının salonları da önüne gelir.
      </p>
    </div>
  );
}
