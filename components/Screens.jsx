// ============================================================
// EKRAN YENİDEN KURULUMLARI
//
// 🔴 NEDEN PNG DEĞİL, HTML
// Emülatör olmadan gerçek cihaz ekran görüntüsü alamıyorum. Ama
// bir tanıtım sitesi için HTML yeniden kurulum ZATEN daha iyi:
//   · her çözünürlükte keskin (retina'da bulanık PNG yok)
//   · dosya boyutu ~0
//   · canlandırılabilir, vurgulanabilir
//   · palet birebir aynı, çünkü aynı değişkenlerden geliyor
// Linear ve Stripe da böyle yapıyor.
//
// ⚠️ DÜRÜSTLÜK SINIRI: bunlar yeniden kurulumdur, ekran görüntüsü
// değil. App'in arayüzü değişirse buradaki temsil ESKİR ve kimse
// fark etmez. Bu yüzden metinler app'in kendi sözlüğünden alındı;
// mağaza listelemesi için yine GERÇEK ekran görüntüsü gerekecek.
// ============================================================

// 🔴 v0.26 — MAKET APP PALETİNİ KULLANIR.
// Eskiden site token'larını (--ink, --card...) paylaşıyordu. Site
// paleti geceye dönünce bu maket de kararırdı; oysa uygulamanın
// kendisi AÇIK temalı. Maket app'i temsil ediyorsa app'in renkleriyle
// çizilmeli — paylaşılan token, iki taraftan biri değişince diğerini
// sessizce bozar.
// 🔴 `gold` HÂLÂ SİTE TOKENİNİ KULLANIYORDU (`--gold`, gece zeminine
// göre seçilmiş #B8943A). Maketin zemini ise AÇIK: o altın, beyaz kart
// üstünde 2.86:1 — okunmuyor. Yorumda "maket app'in renkleriyle
// çizilmeli" yazıyordu ve dokuz token'dan sekizi öyleydi; biri
// atlanmıştı. Kural yazmak, kuralın uygulandığını göstermez.
//
// 🆕 SINIF: "BİR KURALI YAZDIĞIN YERDE BİLE İSTİSNASI KALABİLİR —
// KURALI DENETLEYEN BİR ŞEY YOKSA, KURAL BİR NİYETTİR."
const T = {
  ink: "var(--appInk)", gold: "var(--appGold)", body: "var(--appBody)",
  mut: "var(--appMuted)", line: "var(--appLine)", card: "var(--appCard)",
  green: "var(--appGreen)", teal: "var(--appTeal)", amber: "var(--appAmber)",
};

const Bar = () => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 16px 4px", fontSize: 11, color: T.ink, fontWeight: 600 }}>
    <span>09:41</span>
    <span style={{ letterSpacing: 1 }}>▮▮▮ ⌁</span>
  </div>
);

const Wrap = ({ children, pad = 14 }) => (
  <div style={{ background: "var(--appBg)", height: "100%", overflow: "hidden" }}>
    <Bar />
    <div style={{ padding: pad }}>{children}</div>
  </div>
);

/* ---------- 1. Ana ekran ---------- */
export function ScreenHome() {
  return (
    <Wrap pad={0}>
      <div style={{ background: "rgba(184,148,58,.09)", padding: "16px 16px 18px",
                    borderBottom: "1px solid var(--warmLine)" }}>
        <div style={{ fontSize: 8.5, letterSpacing: 2, color: T.gold, marginBottom: 5 }}>İYİ AKŞAMLAR</div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 19, color: T.ink, fontWeight: 700, lineHeight: 1.2 }}>
          Bir sonraki uçuşun<br />yalnız geçmesin
        </div>
        <div style={{ background: T.gold, color: "#fff", borderRadius: 9, padding: "9px 0",
                      textAlign: "center", fontSize: 11.5, fontWeight: 700, marginTop: 12 }}>
          Host bul
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, background: T.card,
                      border: "1px solid var(--warmLine)", borderRadius: 10, padding: 11 }}>
          <span style={{ fontSize: 14 }}>🔎</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: T.ink }}>Salon Rehberi</div>
            <div style={{ fontSize: 9.5, color: T.mut }}>Kartınla nereye girebilirsin?</div>
          </div>
          <span style={{ color: T.gold, fontWeight: 700 }}>›</span>
        </div>
        <div style={{ background: T.card, border: "1px solid var(--appLine)", borderRadius: 10,
                      padding: 11, marginTop: 9 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <b style={{ fontSize: 12, color: T.ink }}>IST → LHR</b>
            <span style={{ fontSize: 8.5, color: T.teal, fontWeight: 700 }}>● AKTİF</span>
          </div>
          <div style={{ fontSize: 9.5, color: T.mut, marginTop: 3 }}>14 Ağustos · 18:20–21:40</div>
          <div style={{ display: "inline-block", background: "rgba(13,148,136,.1)", color: T.teal,
                        fontSize: 9, fontWeight: 700, borderRadius: 8, padding: "3px 8px", marginTop: 6 }}>
            ✈ TK1979
          </div>
        </div>
      </div>
    </Wrap>
  );
}

/* ---------- 2. Rehber sonucu — SİTENİN EN ÖNEMLİ EKRANI ---------- */
export function ScreenGuide() {
  return (
    <Wrap>
      <div style={{ fontSize: 8.5, letterSpacing: 2, color: T.gold }}>SALON REHBERİ</div>
      <div style={{ display: "flex", gap: 5, marginTop: 9, flexWrap: "wrap" }}>
        {[["IST", 1], ["SAW", 0], ["ESB", 0]].map(([c, on]) => (
          <span key={c} style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: 1,
                                 border: `1px solid ${on ? T.gold : T.line}`,
                                 background: on ? "rgba(184,148,58,.12)" : T.card,
                                 color: on ? T.gold : T.mut,
                                 borderRadius: 14, padding: "4px 10px", fontWeight: on ? 700 : 400 }}>{c}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 7, flexWrap: "wrap" }}>
        {[["Elite Plus", 1], ["Classic Plus", 0]].map(([c, on]) => (
          <span key={c} style={{ fontSize: 9.5, border: `1px solid ${on ? T.gold : T.line}`,
                                 background: on ? "rgba(184,148,58,.12)" : T.card,
                                 color: on ? T.gold : T.mut,
                                 borderRadius: 14, padding: "4px 10px", fontWeight: on ? 700 : 400 }}>{c}</span>
        ))}
      </div>
      {[
        { n: "Turkish Airlines Lounge — Dış Hat", v: "1 misafir götürebilirsin", c: T.green, ok: 1 },
        { n: "Turkish Airlines Lounge — İç Hat", v: "1 misafir götürebilirsin", c: T.green, ok: 1 },
        { n: "iGA Lounge — Dış Hat", v: "Bu kartla girilmiyor", c: T.mut, ok: 0 },
      ].map((r) => (
        <div key={r.n} style={{ background: T.card, borderRadius: 10, padding: 10, marginTop: 8,
                                border: `1px solid ${r.ok ? "rgba(5,150,105,.35)" : "var(--appLine)"}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.ink, lineHeight: 1.3 }}>{r.n}</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 11, color: r.c, marginTop: 3, fontWeight: 700 }}>
            {r.ok ? "✓ " : ""}{r.v}
          </div>
        </div>
      ))}
      <div style={{ background: "rgba(13,148,136,.1)", border: "1px solid rgba(13,148,136,.3)",
                    borderRadius: 10, padding: 10, marginTop: 9 }}>
        <div style={{ fontSize: 10.5, color: T.teal, fontWeight: 700 }}>
          IST'te seni içeri alabilecek 3 kişi var ›
        </div>
      </div>
    </Wrap>
  );
}

/* ---------- 3. Keşif ---------- */
export function ScreenDiscover() {
  return (
    <Wrap>
      <div style={{ fontSize: 8.5, letterSpacing: 2, color: T.gold }}>KEŞFET · IST</div>
      {[
        { n: "Turkish Airlines Lounge", h: "Mehmet A.", b: "Misafir hakkı var", c: T.green, s: 92, f: 1 },
        { n: "iGA Lounge — Dış Hat", h: "Selin K.", b: "Misafir ücretli", c: T.amber, s: 78, f: 0 },
        { n: "Primeclass Lounge", h: "Burak T.", b: "Misafir alınmıyor", c: T.mut, s: 61, f: 0 },
      ].map((r) => (
        <div key={r.n} style={{ background: T.card, border: "1px solid var(--appLine)",
                                borderRadius: 11, padding: 11, marginTop: 9 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, fontSize: 11.5, fontWeight: 700, color: T.ink }}>{r.n}</div>
            <div style={{ width: 26, height: 26, borderRadius: 13, border: `2px solid ${r.s >= 85 ? T.green : T.gold}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 9, fontWeight: 700, color: r.s >= 85 ? T.green : T.gold }}>{r.s}</div>
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: r.c,
                           border: `1px solid ${r.c}55`, borderRadius: 10, padding: "2px 7px" }}>{r.b}</span>
            {r.f === 1 && (
              <span style={{ fontSize: 8.5, fontWeight: 700, color: "#fff", background: T.gold,
                             borderRadius: 10, padding: "2px 7px" }}>✈ AYNI UÇUŞ</span>
            )}
          </div>
          <div style={{ fontSize: 9.5, color: T.mut, marginTop: 5 }}>{r.h} · 18:00–21:00</div>
        </div>
      ))}
    </Wrap>
  );
}

/* ---------- 4. İstek — kural uyarısı ---------- */
export function ScreenRequest() {
  return (
    <Wrap>
      <div style={{ fontSize: 8.5, letterSpacing: 2, color: T.gold }}>BAŞVURU</div>
      <div style={{ background: T.card, border: "1px solid var(--appLine)", borderRadius: 11,
                    padding: 11, marginTop: 9 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: T.ink }}>Mehmet A.</div>
        <div style={{ fontSize: 9.5, color: T.teal, marginTop: 2 }}>● Doğrulanmış Host · 78</div>
      </div>
      <div style={{ background: "rgba(217,119,6,.08)", border: "1px solid rgba(217,119,6,.4)",
                    borderRadius: 11, padding: 11, marginTop: 9 }}>
        <div style={{ fontSize: 8.5, letterSpacing: 1.4, color: T.mut, fontWeight: 700 }}>
          TURKISH AIRLINES MILES&SMILES
        </div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 12.5, fontWeight: 700,
                      color: "#8A5A00", marginTop: 5, lineHeight: 1.35 }}>
          Classic Plus kartında misafir hakkı yok
        </div>
        <div style={{ fontSize: 10, color: T.body, marginTop: 5, lineHeight: 1.5 }}>
          Host girebiliyor ama yanında misafir götüremiyor.
        </div>
        <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, marginTop: 7 }}>
          Detayları göster ›
        </div>
      </div>
      <div style={{ background: T.card, border: "1px solid var(--appLine)", borderRadius: 10,
                    padding: 10, marginTop: 9 }}>
        <div style={{ fontSize: 10, color: T.teal, fontWeight: 700 }}>
          Bu salonda 2 alternatif host var ›
        </div>
      </div>
      <div style={{ background: "var(--appAlt)", borderRadius: 9, padding: "10px 0",
                    textAlign: "center", fontSize: 11, fontWeight: 700, color: T.mut, marginTop: 10 }}>
        Başvuru kapalı
      </div>
    </Wrap>
  );
}

/* ---------- 5. Oturum — çift onay ---------- */
export function ScreenSession() {
  return (
    <Wrap>
      <div style={{ textAlign: "center", marginTop: 6 }}>
        <div style={{ display: "inline-block", border: `2px solid ${T.green}`,
                      background: "rgba(5,150,105,.08)", borderRadius: 22, padding: "6px 18px" }}>
          <div style={{ fontSize: 8, letterSpacing: 1.5, color: T.green, fontWeight: 700 }}>AKTİF</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 17, color: T.green, fontWeight: 700 }}>01:12</div>
        </div>
      </div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 13, color: T.ink, fontWeight: 700,
                    textAlign: "center", marginTop: 10 }}>Oturum sürüyor</div>
      <div style={{ background: "var(--appAlt)", borderRadius: 10, padding: 11, marginTop: 12 }}>
        <div style={{ fontSize: 8, letterSpacing: 1.2, color: T.mut, fontWeight: 700, marginBottom: 7 }}>
          ÇİFT TARAFLI ONAY
        </div>
        {[["Sen", 1], ["Mehmet A.", 0]].map(([n, ok]) => (
          <div key={n} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10.5, color: T.ink }}>{n}</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: ok ? T.green : T.amber }}>
              {ok ? "✓ Onayladı" : "⏳ Bekleniyor"}
            </span>
          </div>
        ))}
      </div>
      <div style={{ background: T.gold, color: "#fff", borderRadius: 9, padding: "10px 0",
                    textAlign: "center", fontSize: 11, fontWeight: 700, marginTop: 10 }}>
        Tamamlandı ✓
      </div>
    </Wrap>
  );
}

/* ---------- 6. Profil — host motivasyonu ---------- */
export function ScreenProfile() {
  return (
    <Wrap>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 42, height: 42, borderRadius: 21, background: "rgba(184,148,58,.15)",
                      border: "1px solid rgba(184,148,58,.35)", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--serif)", fontSize: 17, color: T.gold, fontWeight: 700 }}>M</div>
        <div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: T.ink, fontWeight: 700 }}>Mehmet A.</div>
          <div style={{ fontSize: 9.5, color: T.mut }}>Yazılım · Elite Plus</div>
        </div>
      </div>
      <div style={{ background: "rgba(184,148,58,.09)", border: "1px solid var(--warmLine)",
                    borderRadius: 11, padding: 11, marginTop: 12 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 12, fontWeight: 700, color: "#6B5518", lineHeight: 1.35 }}>
          Bu yıl 8 misafir hakkın kullanılmadan duruyor.
        </div>
        <div style={{ fontSize: 9.5, color: T.body, marginTop: 4, lineHeight: 1.5 }}>
          Kullanılmayan haklar yıl sonunda siliniyor.
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "rgba(184,148,58,.12)",
                    border: `1px solid ${T.gold}`, borderRadius: 11, padding: 11, marginTop: 9 }}>
        {/* v0.17 — eski metin sembolü yerine gerçek marka işareti.
            Aynı sitede iki işaret olmaz; check.js §5 bekçili. */}
        <img src="/mark.svg" alt="" width={14} height={14} style={{ display: "block" }} />
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: T.gold }}>Kurucu Host #12</div>
          <div style={{ fontSize: 9.5, color: T.mut }}>Bu rozet kalıcı; sonradan alınamaz.</div>
        </div>
      </div>
    </Wrap>
  );
}

export const SCREENS = {
  "ana-ekran": ScreenHome,
  "rehber-sonuc": ScreenGuide,
  kesif: ScreenDiscover,
  istek: ScreenRequest,
  oturum: ScreenSession,
  profil: ScreenProfile,
};
