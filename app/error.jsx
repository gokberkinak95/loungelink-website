"use client";
import Link from "next/link";

// 🔴 v0.51 — HATA SINIRI. Bir bileşen çalışma anında düşerse Next beyaz
// bir ekran gösteriyordu. Hata mesajı kullanıcıya değil bize lazım;
// kullanıcıya lazım olan tek şey bir çıkış yolu.
export default function Error({ error, reset }) {
  return (
    <main className="legal" style={{ minHeight: "60vh" }}>
      <div className="eyebrow">HATA</div>
      <h1>Bir şey ters gitti.</h1>
      <p className="legal-lead">Sayfa yüklenirken bir sorun oldu. Yeniden denemek çoğu zaman yeter.</p>
      <p>
        <button className="btn" onClick={() => reset()} type="button">Yeniden dene</button>{" "}
        <Link href="/" className="btn ghost">Ana sayfa</Link>
      </p>
      {error?.digest ? <p className="mono" style={{ opacity: .6, fontSize: 12 }}>kod: {error.digest}</p> : null}
    </main>
  );
}
