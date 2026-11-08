export const metadata = {
  title: "Delete your account — LoungeLink",
  description: "How to delete your LoungeLink account and what happens to your data.",
  alternates: { canonical: "/en/delete-account", languages: { tr: "/hesap-sil", en: "/en/delete-account" } },
};

export default function Page() {
  return (
    <main className="legal">
      <h1>Delete your account</h1>
      <p className="legal-lead">You can do this yourself, inside the app, without asking us.</p>

      <h2>In the app</h2>
      <p><b>Profile → Settings → Delete Account.</b> You confirm once: the account closes and
        your profile photo is deleted right away. Changed your mind? Write to
        destek@loungelink.co within 14 days. After 14 days the account is anonymised.</p>

      <h2>What is deleted</h2>
      <p>
        Your name, photo, bio, contact details, gender, upcoming trips, notifications,
        preferences and device tokens. Your account can no longer be signed into.
      </p>

      <h2>What is kept, and why</h2>
      <p>
        Without your name: messages in the other person's chat history (24 months from
        sending) and past session records. Until their period ends: reports (5 years),
        purchase records (as tax law requires), consent records (10 years) and a one-way
        hash of your email address (5 years; not the address itself). Expired records
        are deleted automatically. Keeping a harassment report is how we protect the
        person who filed it.
      </p>

      <h2>If you cannot reach the app</h2>
      <p>
        Write to us from the email address on the account and we will delete it for
        you. See <a href="/en/support">Support</a>.
      </p>

      <p className="sub" style={{ marginTop: 26 }}>
        <a href="/hesap-sil">Türkçe</a> · <a href="/en">English home</a>
      </p>
    </main>
  );
}
