"use client";
import { useState } from "react";
import { joinWaitlist } from "../lib/supabase";
import { SITE } from "../lib/content";

// ============================================================
// BEKLEME LİSTESİ — mailto yerine gerçek form  (v0.18)
//
// 🔴 mailto ÜÇ ŞEYİ BİRDEN ÖLDÜRÜYORDU:
//   1. Posta uygulaması tanımsız olan telefonda tıklama boşa gider —
//      dönüşüm sessizce sıfırlanır, hata bile görünmez.
//   2. Hangi kanaldan geldiği ölçülemez.
//   3. Sonradan yazılacak liste birikmez; gelen kutusu liste değildir.
//
// 🔴 mailto SİLİNMEDİ, KÜÇÜK PUNTOYA İNDİ. Form bir gün bağlı
// olmazsa (tablo yok, RLS reddi, ağ) kullanıcının elinde yine bir
// yol kalmalı. Yedek yolu olmayan tek yol, yol değildir.
// ============================================================
// 🔴 v0.25 — "YOL ARKADAŞI ARIYORUM" NE İSTEDİĞİNİ SÖYLEMİYORDU.
// Gökberk: "yol arkadaşı arıyorum ifadesi tam olarak anlaşılmıyor;
// guest olarak kayıt olacağı daha açık olmalı."
//
// Haklı ve sebebi şu: iki seçenek AYNI SORUYU cevaplamıyordu.
// Birincisi ELİNDE NE OLDUĞUNU söylüyor (kart hakkı), ikincisi
// NE HİSSETTİĞİNİ. Kullanıcı ikisini kıyaslayamıyor.
//
// Yeni hâlde ikisi de aynı soruyu cevaplıyor: "kart hakkın var mı,
// yok mu" — ve her birinin altında o seçimin NE ANLAMA GELDİĞİ
// yazıyor. "Misafir olmak istiyorum" gibi ürün jargonu kullanmıyoruz;
// kullanıcının kendi diliyle: salona giriyorsun ama kart senin değil.
const ROLLER = [
  { v: "host",
    t: "Kartımda misafir hakkı var",
    alt: "Salona kendi kartımla giriyorum, yanımda bir kişilik yer olabiliyor." },
  { v: "misafir",
    t: "Kartım yok — birinin yanında girmek istiyorum",
    alt: "Lounge hakkım yok ya da bitti; kart sahibi biriyle eşleşmek istiyorum." },
];

export default function WaitlistForm() {
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
    const r = await joinWaitlist({ email: email.trim().toLowerCase(), role, source: "site-beta" });
    if (r.ok) { setDurum("oldu"); return; }
    setDurum("hata");
    // Kullanıcıya teknik kod değil, YAPABİLECEĞİ ŞEY söylenir.
    setHata(
      r.kod === "mükerrer"
        ? "Bu e-posta zaten listede — sıran geldiğinde yazacağız."
        : `${r.mesaj} Aşağıdaki e-postayla bize yazarsan seni elle ekleriz.`
    );
  }

  if (durum === "oldu") {
    return (
      <div className="wl-ok">
        <b>Listedesin.</b>
        <p>
          Sıran geldiğinde ilk sen duyacaksın — bu arada kartının ne verdiğini
          merak ediyorsan:
        </p>
        {/* 🔴 ONAY EKRANI BOŞ BIRAKILMAZ. Kural motoru kayıt gerektirmeden
            çalışan tek varlığımız; ilk temasta değeri hemen teslim eder. */}
        <a className="beat" href="/rehber">Kartını sor <span>→</span></a>
      </div>
    );
  }

  return (
    <form className="wl" onSubmit={gonder} noValidate={false}>
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
        <legend style={{ fontSize: 14.5, marginBottom: 8 }}>Hangisi sensin?</legend>
        <div className="wl-roles">
          {ROLLER.map((r) => (
            <label key={r.v} className="wl-role">
              <input type="radio" name="wl-role" value={r.v}
                     checked={role === r.v} onChange={() => setRole(r.v)} />
              <span>
                {r.t}
                {/* Alt satır seçimin karşılığını yazar: kullanıcı
                    "hangisi benim" sorusunu tahminle değil okuyarak
                    cevaplasın. */}
                {!!r.alt && <em className="wl-role-alt">{r.alt}</em>}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="wl-kvkk">
        <input type="checkbox" checked={kvkk} required
               onChange={(e) => setKvkk(e.target.checked)} />
        <span>
          <a href="/aydinlatma">Aydınlatma metnini</a> okudum; e-posta adresimin
          beta daveti için işlenmesini kabul ediyorum.
        </span>
      </label>

      {durum === "hata" && <p className="wl-err" role="alert">{hata}</p>}

      <button type="submit" className="btn" disabled={durum === "gonderiliyor"}>
        {durum === "gonderiliyor" ? "Gönderiliyor…" : "Listeye yazıl"}
      </button>

      <p className="wl-fine">
        Sıra sana geldiğinde yazacağız. Spam yok, haftada birden fazla e-posta yok.
        {" "}Form çalışmazsa <a href={`mailto:${SITE.email}?subject=Beta%20listesi`}
          style={{ textDecoration: "underline" }}>{SITE.email}</a> hep açık.
      </p>
    </form>
  );
}
