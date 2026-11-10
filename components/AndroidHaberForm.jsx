"use client";
import { olay } from "./Olcum";
import { useState } from "react";
import { joinWaitlist } from "../lib/supabase";
import { SITE } from "../lib/content";

// ============================================================
// ANDROID HABER FORMU — 10 Kasım (iOS yayını)
//
// Eski bekleme listesi formunun (components/_arsiv/WaitlistForm.jsx)
// küçültülmüş hâli. iPhone kullanıcısının artık listeye ihtiyacı yok;
// liste yalnız Android çıkınca tek bir e-posta için duruyor.
//
// Aynı tabloya, aynı fonksiyonla yazar (lib/supabase.js · joinWaitlist),
// kaynak "site-android". Rol sorusu kaldı ama iki kısa seçeneğe indi:
// tablo rolü zorunlu tutuyor (SQL 194 · host | misafir) ve `host_ol`
// olayı arz tarafının tek erken göstergesi.
// Onay kutusu ve yedek mailto eski formdaki gibi.
// ============================================================
const ROLLER = [
  { v: "host", t: "Kartımda misafir hakkı var" },
  { v: "misafir", t: "Kartım yok, misafir olmak istiyorum" },
];

export default function AndroidHaberForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("host");
  const [kvkk, setKvkk] = useState(false);
  const [durum, setDurum] = useState("bos"); // bos | gonderiliyor | oldu | hata
  const [hata, setHata] = useState("");

  async function gonder(e) {
    e.preventDefault();
    if (durum === "gonderiliyor") return;
    setDurum("gonderiliyor");
    setHata("");
    const r = await joinWaitlist({ email: email.trim().toLowerCase(), role, source: "site-android" });
    if (r.ok) {
      olay("listeye_yazildi", { rol: role || "belirsiz", kaynak: "android" });
      setDurum("oldu"); return;
    }
    setDurum("hata");
    setHata(
      r.kod === "mükerrer"
        ? "Bu e-posta zaten kayıtlı; Android çıktığında yazacağız."
        : `${r.mesaj} Aşağıdaki e-postayla bize yazarsan seni elle ekleriz.`
    );
  }

  if (durum === "oldu") {
    return (
      <div className="wl-ok">
        <b>Tamam, haber vereceğiz.</b>
        <p>Android sürümü Google Play&apos;e çıktığı gün tek bir e-posta gelecek. Bu arada kartının ne verdiğini merak ediyorsan:</p>
        <a className="beat" href="/rehber">Kartını sor <span>→</span></a>
      </div>
    );
  }

  return (
    <form className="wl wl-kucuk" onSubmit={gonder}>
      <div>
        <label htmlFor="wl-email">E-posta</label>
        <input
          id="wl-email" type="email" required autoComplete="email"
          placeholder="ad@ornek.com" value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: 6 }}
        />
      </div>

      <fieldset style={{ border: 0, padding: 0 }}>
        <legend className="wl-legend">Hangisi sensin?</legend>
        <div className="wl-roles wl-roles-yan">
          {ROLLER.map((r) => (
            <label key={r.v} className="wl-role">
              <input type="radio" name="wl-role" value={r.v}
                     checked={role === r.v} onChange={() => setRole(r.v)} />
              <span>{r.t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="wl-kvkk">
        <input type="checkbox" checked={kvkk} required
               onChange={(e) => setKvkk(e.target.checked)} />
        <span>
          <a href="/aydinlatma">Aydınlatma metnini</a> okudum; e-posta adresimin
          Android sürümünün yayın duyurusu için işlenmesini kabul ediyorum.
        </span>
      </label>

      {durum === "hata" && <p className="wl-err" role="alert">{hata}</p>}

      <button type="submit" className="btn" disabled={durum === "gonderiliyor"}>
        {durum === "gonderiliyor" ? "Gönderiliyor…" : "Android çıkınca haber ver"}
      </button>

      <p className="wl-fine">
        Yalnız bir e-posta: Android yayına çıktığı gün.
        {" "}Form çalışmazsa <a href={`mailto:${SITE.email}?subject=Android`}
          style={{ textDecoration: "underline" }}>{SITE.email}</a> hep açık.
      </p>
    </form>
  );
}
