"use client";
import { useEffect, useMemo, useState } from "react";
import { TR_AIRPORTS, ABROAD_AIRPORTS, LOUNGE_COUNTS, inScope } from "../lib/lounges-data";

// ============================================================
// KAPSAM DİZİNİ — Türkiye + yurt dışı   (v0.69.2 · 28 Eylül)
//
// 🔴 NEDEN (Gökberk): "/kartlar ve /rehber yalnız yurt içini anlatıyor
// gibi — sadece yurt içini kapsamadığımızı göstermeliyiz."
// ÖLÇÜLDÜ: katalogda 118 ülke · 222 havalimanı · 284 salon; bunun
// 207 havalimanı / 236 salonu YURT DIŞINDA. Site bunu tek bir cümlede
// ("110+ ülkede 230+ salon") geçip geçiyordu — ziyaretçi Heathrow'u
// arayamıyordu.
//
// DÜRÜSTLÜK SINIRI: kart kart KURAL sayfaları bugün yalnız Türkiye'deki
// 15 havalimanı için. Yurt dışında gösterdiğimiz şey SALON KATALOĞU
// (hangi havalimanında hangi salon, hangi terminalde). Dizin bunu açıkça
// söylüyor; yurt dışında kural cevabı vaat edilmiyor.
//
// Ana sayfa kapsam bölümü = harita + özet (vitrin); burası = tam dizin.
// İçerik HTML'de `hidden` ile durur: arama motoru "Heathrow lounge"
// aramasında da bu sayfayı bulur.
// ============================================================
const ONDE = 10;

const sade = (s) =>
  (s || "").toLocaleLowerCase("tr-TR")
    .replace(/[ıi̇]/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c");

function kapsamEtiketi(l) {
  if (l.section) return l.section;
  if (l.scope === "domestic") return "İç hat";
  if (l.scope === "international") return "Dış hat";
  return null;
}

function Salonlar({ a }) {
  return (
    <ul className="dz-salon">
      {a.lounges.map((l, i) => {
        const et = kapsamEtiketi(l);
        return (
          <li key={l.name + i}>
            <b>{l.name}</b>
            {et && <span className="cover-tag">{et}</span>}
            {l.terminal && <span className="cover-term">{l.terminal}</span>}
          </li>
        );
      })}
    </ul>
  );
}

// Yurt dışı: ülkeye göre grup, salon sayısına göre sıralı.
function ulkeler() {
  const m = new Map();
  for (const a of ABROAD_AIRPORTS) {
    if (!m.has(a.country)) m.set(a.country, []);
    m.get(a.country).push(a);
  }
  return [...m.entries()]
    .map(([ulke, list]) => ({
      ulke,
      list: list.sort((x, y) => y.lounges.length - x.lounges.length),
      salon: list.reduce((t, a) => t + a.lounges.length, 0),
    }))
    .sort((x, y) => y.salon - x.salon || x.ulke.localeCompare(y.ulke, "tr"));
}

export default function KapsamDizini() {
  const [sekme, setSekme] = useState("tr");
  const [ara, setAra] = useState("");
  const [hepsi, setHepsi] = useState(false);
  const U = useMemo(ulkeler, []);
  const c = LOUNGE_COUNTS;

  useEffect(() => {
    // /kartlar'daki "Yurt dışı salonlarını gör" buraya iner: sekme açık, dizin ekranda.
    if (window.location.hash === "#yurtdisi") {
      setSekme("yd");
      requestAnimationFrame(() => document.getElementById("dizin")?.scrollIntoView());
    }
  }, []);

  const q = sade(ara.trim());
  const eslesen = (a) =>
    !q || [a.name, a.city, a.country, a.code, ...a.lounges.map((l) => l.name)].some((x) => sade(x).includes(q));

  const gorunen = U.map((g) => ({ ...g, list: g.list.filter(eslesen) })).filter((g) => g.list.length);
  const bulunan = gorunen.reduce((t, g) => t + g.list.length, 0);

  return (
    <div className="dizin" id="dizin">
      <div className="dz-sayilar" aria-label="Katalog kapsamı">
        <div><b>{c.countries}</b><span>ülke</span></div>
        <div><b>{c.airports}</b><span>havalimanı</span></div>
        <div><b>{c.lounges}</b><span>salon</span></div>
      </div>

      <div className="taraf-sec dz-sekme" role="tablist" aria-label="Kapsam">
        <button type="button" role="tab" id="dz-tr" aria-selected={sekme === "tr"} aria-controls="dz-panel-tr"
                className={sekme === "tr" ? "on" : undefined} onClick={() => setSekme("tr")}>
          Türkiye · {c.trAirports}
        </button>
        <button type="button" role="tab" id="dz-yd" aria-selected={sekme === "yd"} aria-controls="dz-panel-yd"
                className={sekme === "yd" ? "on" : undefined} onClick={() => setSekme("yd")}>
          Yurt dışı · {c.abroadAirports}
        </button>
      </div>

      {/* TÜRKİYE — salonlar + kart kart kural sayfaları var */}
      <div id="dz-panel-tr" role="tabpanel" aria-labelledby="dz-tr" hidden={sekme !== "tr"}>
        <p className="dz-not">
          {c.trAirports} havalimanında {c.trLounges} salon. Burada kartının her terminalde ne
          verdiği de hazır: <a href="/kartlar#liste">kart kart kural sayfaları</a>.
        </p>
        {TR_AIRPORTS.map((a) => (
          <details className="acc" key={a.code}>
            <summary>
              <h3>{a.name}</h3>
              <span className="acc-say">{a.code} · {a.lounges.length} salon</span>
              <span className="acc-ok" aria-hidden="true" />
            </summary>
            <div className="acc-ic">
              <div className="dz-alt">{a.city} · iç hat {a.lounges.filter((l) => inScope(l, "domestic")).length} · dış hat {a.lounges.filter((l) => inScope(l, "international")).length}</div>
              <Salonlar a={a} />
            </div>
          </details>
        ))}
      </div>

      {/* YURT DIŞI — salon kataloğu; kural sayfası vaadi YOK */}
      <div id="dz-panel-yd" role="tabpanel" aria-labelledby="dz-yd" hidden={sekme !== "yd"}>
        <p className="dz-not">
          {c.abroadCountries} ülkede {c.abroadAirports} havalimanı, {c.abroadLounges} salon: hangi
          havalimanında hangi salon, hangi terminalde. Kart kart kural sayfaları bugün
          Türkiye&apos;deki {c.trAirports} havalimanı için; uçuşunu uygulamaya yazdığında o
          havalimanının salonları önüne gelir.
        </p>
        <label className="dz-ara">
          <span className="sr-only">Yurt dışında ara</span>
          <input type="search" value={ara} onChange={(e) => setAra(e.target.value)}
                 placeholder="Havalimanı, şehir, ülke ya da salon ara" autoComplete="off" />
        </label>
        {q && <p className="dz-sonuc" role="status">{bulunan ? `${bulunan} havalimanı bulundu` : "Bu aramayla eşleşen havalimanı yok."}</p>}

        {gorunen.map((g, i) => (
          <details className="acc" key={g.ulke} open={!!q && bulunan <= 6}
                   hidden={!q && !hepsi && i >= ONDE}>
            <summary>
              <h3>{g.ulke}</h3>
              <span className="acc-say">{g.list.length} havalimanı · {g.salon} salon</span>
              <span className="acc-ok" aria-hidden="true" />
            </summary>
            <div className="acc-ic">
              {g.list.map((a) => (
                <div className="dz-hava" key={a.code}>
                  <div className="dz-hava-bas"><b>{a.name}</b><span>{a.code} · {a.city}</span></div>
                  <Salonlar a={a} />
                </div>
              ))}
            </div>
          </details>
        ))}

        {!q && !hepsi && U.length > ONDE && (
          <button type="button" className="btn-ghost dz-hepsi" onClick={() => setHepsi(true)}>
            Tüm ülkeleri göster ({U.length})
          </button>
        )}
      </div>
    </div>
  );
}
