export const metadata = {
  title: "Terms — LoungeLink",
  description: "The rules of using LoungeLink, in plain English.",
  alternates: { canonical: "/en/terms", languages: { tr: "/kosullar", en: "/en/terms" } },
};

export default function Page() {
  return (
    <main className="legal">
      <h1>Terms</h1>
      <p className="legal-lead">
        This is an English summary. <b>The Turkish version is the binding text</b> —{" "}
        <a href="/kosullar">read it here</a>.
      </p>

      <h2>What LoungeLink is</h2>
      <p>
        An introduction service between two travellers. <b>We do not sell lounge
        access and we cannot.</b> Card programme rules prohibit transferring an access
        right; we introduce verified people and the lounge decides at the door.
      </p>

      <h2>Who can use it</h2>
      <p>You must be 18 or older. The app asks you to confirm this.</p>

      <h2>Credits</h2>
      <p>
        A credit is the right to send a host a request — <b>not entry</b>. It is
        refunded if the host declines, if nobody answers within 72 hours, or if you
        are turned away at the door. Credits are not money, cannot be transferred for
        payment, and have no cash value.
      </p>

      <h2>What is prohibited</h2>
      <p>
        Paying or being paid outside the platform · presenting someone else&rsquo;s card
        or status as your own · harassment · fake profiles · asking a host to break
        their programme&rsquo;s rules. Chat automatically hides contact and payment
        details, and these messages are flagged for review.
      </p>

      <h2>If something goes wrong</h2>
      <p>
        Report the person from their profile or the chat screen. Harassment and fraud
        reports are reviewed on a single report. During a session there is an SOS
        button. <b>If there is danger to life, call 112 first</b> — we are not an
        emergency service.
      </p>

      <p className="sub" style={{ marginTop: 26 }}>
        <a href="/kosullar">Türkçe (binding)</a> · <a href="/en">English home</a>
      </p>
    </main>
  );
}
