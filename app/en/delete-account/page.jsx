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
      <p><b>Profile → Settings → Delete Account.</b> You confirm once, and it is done.</p>

      <h2>What is deleted</h2>
      <p>
        Your profile, photo, travel records, chat messages, notifications and device
        tokens. Your account can no longer be signed into.
      </p>

      <h2>What is kept, and why</h2>
      <p>
        Records we are legally required to retain — reports, disputes and financial
        ledger entries — are kept for the period the law requires, <b>anonymised</b>:
        the record survives, your identity does not stay attached to it. Keeping a
        harassment report is how we protect the person who filed it.
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
