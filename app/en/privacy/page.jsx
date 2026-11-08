// 🔵 ÖZET + BAĞLAYICI SÜRÜM BEYANI. Gerekçe `app/en/page.jsx` başlığında.
export const metadata = {
  title: "Privacy — LoungeLink",
  description: "What data LoungeLink collects, why, for how long, and how to have it deleted.",
  alternates: { canonical: "/en/privacy", languages: { tr: "/gizlilik", en: "/en/privacy" } },
};

const TOPLANAN = [
  ["Account", "Email, name. Needed to have an account at all."],
  ["Verification", "Phone number (confirmed by SMS through Google Firebase) and email confirmation. A \"Verified profile\" badge is derived automatically from email, phone, photo and profession. We do not ask for ID documents, selfies or biometric data."],
  ["Profile", "Photo, profession, bio, languages, travel style. You choose what is visible."],
  ["Gender", "Only for the women-only safety options (\"Only women can see me\" and the women-host filter). If you turn the option on, your profile shows \"Woman traveller\"."],
  ["Travel", "Flight number, airport, date, time window. Used to match you and to check the lounge rule. If you tap \"Airport I'm at\", your approximate location is read once on your device to find the nearest airport; it is never sent to us or stored."],
  ["Chat", "Messages between matched people. Contact and payment details are automatically hidden."],
  ["Reputation", "Sessions, ratings, reports. This is what makes the next stranger safer."],
  ["Notifications", "Device push token. Without it, a time-bound match cannot reach you."],
  ["Marketing permission", "Optional and off by default. Only if you tick it do we send offers and announcements, as in-app notifications only (never SMS, calls or email). Turn it off any time in Settings › Notifications."],
  ["Consent records", "Which terms you accepted, your 18+ statement and your marketing choice, with date and text version."],
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
        <b>No ID documents, selfies or biometric data.</b> <b>No stored location</b> —
        your approximate position is only read on your device, once, when you ask for
        the nearest airport.
        <b> No payment card data</b> — payments, when they exist, are handled by the
        app store. <b>No advertising identifier</b>, and no third-party analytics SDK.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Chat messages 24 months · notifications, error logs and flight lookups 12
        months · reports and disputes 5 years · purchase records as tax law requires
        (up to 10 years) · consent records 10 years after account deletion. A nightly
        job deletes expired records. Deleting your account removes your photo at
        once and anonymises the account after 14 days.
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
        All our service providers are outside Turkey. Our database and files are
        hosted by Supabase in the European Union (Frankfurt). Phone verification uses
        Google Firebase. Push notifications pass through Expo and the platform
        services (Apple APNs, Google FCM). Purchases are verified by RevenueCat (account
        ID and purchase record only). Flight verification queries aviationstack with
        the flight number you enter — not with your identity. Account emails are sent
        by Resend; the website runs on Vercel and Cloudflare. We share no personal data
        with lounge operators.
      </p>

      <p className="sub" style={{ marginTop: 26 }}>
        <a href="/gizlilik">Türkçe (binding)</a> · <a href="/en">English home</a> ·{" "}
        <a href="/en/support">Support</a>
      </p>
    </main>
  );
}
