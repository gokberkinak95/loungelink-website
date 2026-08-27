// 🔵 ÖZET + BAĞLAYICI SÜRÜM BEYANI. Gerekçe `app/en/page.jsx` başlığında.
export const metadata = {
  title: "Privacy — LoungeLink",
  description: "What data LoungeLink collects, why, for how long, and how to have it deleted.",
  alternates: { canonical: "/en/privacy", languages: { tr: "/gizlilik", en: "/en/privacy" } },
};

const TOPLANAN = [
  ["Account", "Email, name. Needed to have an account at all."],
  ["Verification", "Phone number, email confirmation. Used to make the other person a known person."],
  ["Profile", "Photo, profession, bio, languages, travel style. You choose what is visible."],
  ["Gender", "Only to operate women's safety mode. Declared once."],
  ["Travel", "Flight number, airport, date, time window. Used to match you and to check the lounge rule."],
  ["Chat", "Messages between matched people. Contact and payment details are automatically hidden."],
  ["Reputation", "Sessions, ratings, reports. This is what makes the next stranger safer."],
  ["Notifications", "Device push token. Without it, a time-bound match cannot reach you."],
];

export default function Page() {
  return (
    <main className="legal">
      <h1>Privacy</h1>
      <p className="legal-lead">
        This is an English summary. <b>The Turkish version is the binding text</b> —{" "}
        <a href="/gizlilik">read it here</a>. If the two ever differ, the Turkish
        one governs.
      </p>

      <h2>What we collect</h2>
      {TOPLANAN.map(([k, v]) => (<p key={k}><b>{k}</b> — {v}</p>))}

      <h2>What we do not collect</h2>
      <p>
        <b>No GPS location.</b> &ldquo;Location sharing&rdquo; in the app means the
        airport and time window you declare — not your device&rsquo;s position.
        <b> No payment card data</b> — payments, when they exist, are handled by the
        app store. <b>No advertising identifier</b>, and no third-party analytics SDK.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Chat messages 24 months · reports and disputes 5 years (legal retention) ·
        error logs 12 months. Deleting your account removes your personal data;
        records under a legal retention obligation are anonymised rather than kept
        with your name.
      </p>

      <h2>Your rights</h2>
      <p>
        Under Turkish data protection law (KVKK) you can ask what we hold, ask for
        corrections, and ask for deletion. Write to us and we respond within 30 days
        at the latest. You can delete your account yourself: in the app,
        Profile → Settings → Delete Account, or see <a href="/en/delete-account">this page</a>.
      </p>

      <h2>Where the data lives</h2>
      <p>
        Our database is hosted by Supabase in the European Union. Push notifications
        pass through Expo and the platform services (Apple APNs, Google FCM). Flight
        verification queries a third-party flight data provider with the flight
        number you enter — not with your identity.
      </p>

      <p className="sub" style={{ marginTop: 26 }}>
        <a href="/gizlilik">Türkçe (binding)</a> · <a href="/en">English home</a> ·{" "}
        <a href="/en/support">Support</a>
      </p>
    </main>
  );
}
