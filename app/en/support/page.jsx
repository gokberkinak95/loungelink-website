import { SITE } from "../../../lib/content";

export const metadata = {
  title: "Support — LoungeLink",
  description: "How to reach LoungeLink, how fast we answer, and how to report a problem.",
  alternates: { canonical: "/en/support", languages: { tr: "/destek", en: "/en/support" } },
};

const KONULAR = [
  ["I want to delete my account",
   "In the app: Profile → Settings → Delete Account.", "/en/delete-account"],
  ["I want to report someone",
   "There is a Report action on the person's profile and in the chat screen. Harassment and fraud reports are reviewed on a single report.", null],
  ["I am in an emergency",
   "If there is danger to life, call 112 first. We are not an emergency service. The SOS button in a session alerts our team and the other party.", null],
  ["I want to see or correct my data",
   "Write to the address below; we answer within 30 days at the latest.", "/en/privacy"],
  ["The rule engine gave me a wrong answer",
   "Lounge rules can change without notice. Use “Report” in the app and we review the record — we also show you which source the rule came from.", null],
];

export default function Page() {
  return (
    <main className="legal">
      <h1>Support</h1>
      <p className="legal-lead">
        Most answers are below. If yours is not, write to us — we reply within one
        business day on weekdays.
      </p>
      <p className="legal-lead">
        <b>Email:</b> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      {KONULAR.map(([b, m, l]) => (
        <section key={b} style={{ marginTop: 22 }}>
          <h2>{b}</h2>
          <p>{m}</p>
          {l ? <p><a href={l}>More →</a></p> : null}
        </section>
      ))}
      <p className="sub" style={{ marginTop: 26 }}>
        <a href="/destek">Türkçe</a> · <a href="/en">English home</a> ·{" "}
        <a href="/en/privacy">Privacy</a> · <a href="/en/terms">Terms</a>
      </p>
    </main>
  );
}
