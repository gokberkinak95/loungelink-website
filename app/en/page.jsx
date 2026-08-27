import { SITE } from "../../lib/content";

// ============================================================================
// 🔴 26 AĞUSTOS — SİTE TEK DİLLİYDİ, UYGULAMA TAM ÇİFT DİLLİ (1352/1352).
//
// Havalimanı ürününde ziyaretçinin önemli kısmı Türkçe okumuyor; ayrıca
// App Store'a İngilizce listeleme yapılırken destek ve gizlilik URL'leri
// Türkçe bir sayfaya çıkıyordu.
//
// ⚠️ KAPSAM KARARI VE GEREKÇESİ: 273 kural sayfası ÇEVRİLMEDİ. Ürünün
// hukuki metinleri henüz AVUKAT ONAYINDAN GEÇMEDİ; onaylanmamış bir hukuki
// metni makineyle çevirip ikinci bir dilde yayınlamak, tek bir metnin
// riskini ikiye katlamaktır. İngilizce yasal sayfalar bu yüzden ÖZET +
// "Türkçe sürüm bağlayıcıdır" beyanı olarak duruyor — bu, uluslararası
// uygulamada standart ve savunulabilir olan yol.
//
// 🆕 SINIF: "BİR METNİ ÇEVİRMEK ONU İKİ KEZ YAYINLAMAKTIR — ONAYLANMAMIŞ
// BİR METNİ ÇEVİRMEK, RİSKİ DE İKİ KEZ YAYINLAMAKTIR."
// ============================================================================
export const metadata = {
  title: "LoungeLink — your card's unused lounge guest right, shared",
  description:
    "Your credit card or airline status includes a lounge guest right that " +
    "expires. LoungeLink introduces you to a traveller at the same airport " +
    "who cannot get in — and tells you, before the door, whether the rule holds.",
  alternates: { canonical: "/en", languages: { tr: "/", en: "/en" } },
};

const ADIMLAR = [
  ["01", "Add your flight",
   "Which airport, which day, which time window. Nothing is public until you choose."],
  ["02", "Let the rule engine answer",
   "Your card's programme, its tier, the airline you fly, your cabin, and the rule that lounge applies that day. Where we are not sure, we say we are not sure."],
  ["03", "Match — both sides must agree",
   "The host picks their guest; the guest sends a request. Nobody has to accept anyone."],
  ["04", "Meet at the lounge",
   "If you are turned away at the door, your credit is refunded and you tell us what happened."],
];

export default function Page() {
  return (
    <main className="legal">
      <h1>Your card&rsquo;s unused lounge right, shared well</h1>
      <p className="legal-lead">
        Your credit card or airline status includes a guest right, and it expires
        at the end of the year. At the same airport, at the same hour, there is a
        traveller who cannot get into that lounge. LoungeLink introduces you.
      </p>

      <section style={{ marginTop: 26 }}>
        <h2>How it works</h2>
        {ADIMLAR.map(([n, t, d]) => (
          <p key={n}><b>{n} · {t}</b><br />{d}</p>
        ))}
      </section>

      <section style={{ marginTop: 26 }}>
        <h2>The rule engine</h2>
        <p>
          This is what makes the product different. We do not say &ldquo;you have
          Priority Pass, go in.&rdquo; A Turkish Airlines passenger cannot bring an
          AJet guest into every lounge — you learn that in the app, not at the door.
        </p>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2>What we do not sell</h2>
        <p>
          <b>LoungeLink does not and cannot sell lounge access.</b> Card programme
          rules prohibit transferring an access right. We introduce verified
          travellers; the final decision at the door always belongs to the lounge.
          Off-platform payment is prohibited.
        </p>
        <p>
          Credits can be purchased, but what you buy is <b>the right to ask a host</b>,
          not entry. If the host declines, if nobody answers, or if you are turned
          away at the door, your credit is refunded.
        </p>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2>Safety</h2>
        <p>
          Phone and email verification · mutual consent · trust score and reviews ·
          women&rsquo;s safety mode · SOS during a session · reporting and blocking.
          Contact and payment details are hidden in chat.
        </p>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2>More</h2>
        <p>
          <a href="/en/privacy">Privacy</a> · <a href="/en/terms">Terms</a> ·{" "}
          <a href="/en/delete-account">Delete your account</a> ·{" "}
          <a href="/en/support">Support</a> · <a href="/">Türkçe</a>
        </p>
        <p className="sub">
          Contact: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </section>
    </main>
  );
}
