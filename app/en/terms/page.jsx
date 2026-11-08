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
        access, and we do not act for any lounge, card issuer or programme.</b> A host
        brings a guest only where their own card or membership terms allow it, and
        never for money or anything of value; the lounge decides at the door. Lounge,
        card and programme names belong to their owners — LoungeLink is not
        affiliated with or endorsed by them.
      </p>

      <h2>Who can use it</h2>
      <p>You must be 18 or older. The app asks you to confirm this.</p>

      <h2>Credits</h2>
      <p>
        A credit is the right to send a host a request — <b>not entry</b>. It is
        refunded if the host declines, if nobody answers within 72 hours, or if you
        are turned away at the door. A credit pays for our matching service and is
        never passed to the host. Credits and LoungePoints are not money, cannot be
        transferred and have no cash value.</p>

      <h2>Purchases and subscriptions</h2>
      <p>
        Bought only through the App Store or Google Play. Subscriptions renew
        automatically unless cancelled at least 24 hours before the period ends, in
        your store account settings. Because digital content is delivered at once, the
        statutory right of withdrawal does not apply once you confirm a purchase; the
        store&rsquo;s own refund process and your other consumer rights are unaffected.
      </p>

      <h2>What is prohibited</h2>
      <p>
        Selling, renting or swapping lounge entry or a guest allowance · offering or
        accepting money, gift cards, miles or points · presenting someone else&rsquo;s card
        or status as your own · harassment · fake profiles · asking a host to break
        their programme&rsquo;s rules. Chat automatically hides contact and payment
        details, and these messages are flagged for review.
      </p>

      <h2>If something goes wrong</h2>
      <p>
        Report the person from their profile or the chat screen. Harassment and fraud
        reports are reviewed on a single report. During a session there is an SOS
        button. <b>If there is danger to life, call 112 first</b> — we are not an
        emergency service. Content you believe is unlawful can be reported in the app
        or to destek@loungelink.co; we review reports within 24 hours and remove
        unlawful content.
      </p>

      <h2>Notifications</h2>
      <p>
        Request, session and safety notifications are part of the service. Offers and
        announcements are sent only if you opted in, and can be turned off in Settings.
      </p>

      <p className="sub" style={{ marginTop: 26 }}>
        <a href="/kosullar">Türkçe (binding)</a> · <a href="/en">English home</a>
      </p>
    </main>
  );
}
