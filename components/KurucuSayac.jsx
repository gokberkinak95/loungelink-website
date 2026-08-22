"use client";
import { useEffect, useState } from "react";
import { kurucuCember } from "../lib/supabase";

// ============================================================
// KURUCU ÇEMBER SAYACI — canlı sosyal kanıt, uydurmadan
//
// 🔴 GEÇEN TUR YANLIŞ TEKLİF ETTİM. Gökberk'e "beta listesinde kaç
// kişi olduğunu söyle, siteye koyayım" dedim. Bu, ölçümü ona
// yaptırmak ve sonucu KODA GÖMMEK demekti — yarın eskiyecek bir sayı.
//
// Doğrusu: sayı veritabanından gelsin, kimse bir şey söylemesin.
//
// ⚠️ AMA SAYAÇ HER ZAMAN GÖSTERİLEMEZ. Liste 3 kişiyken "100'den 3'ü
// doldu" yazmak sosyal kanıtın TERSİNİ yapar: ziyaretçiye "burada
// kimse yok" der. Yani bir "gösterme eşiği" gerekiyor.
//
// 🔴 O EŞİK BURADA DEĞİL, VERİTABANINDA. `kurucu_cember()` eşik
// altındayken ham sayıyı HİÇ döndürmüyor (SQL 231). Bu bileşen
// isteseydi bile sızdıramaz — eline geçmiyor.
// 🆕 SINIF: **"BİR SAYIYI GÖSTERİP GÖSTERMEME KARARI, SAYININ KENDİSİ
// KADAR VERİDİR — KARARI DA VERİYİ VEREN YER VERSİN."**
//
// ÜÇ DURUM, ÜÇÜ DE DÜRÜST:
//   · cevap yok / ağ hatası  → HİÇBİR ŞEY çizilmez (yanlış sayı yok)
//   · eşik altı              → HİÇBİR ŞEY çizilmez (moral bozan sayı yok)
//   · eşik üstü              → gerçek sayı + gerçek kalan kontenjan
//
// Bu dosyada HİÇBİR sabit sayı yok ve olmamalı; check.js §8 bunu
// denetliyor.
// ============================================================
export default function KurucuSayac() {
  const [c, setC] = useState(null);

  useEffect(() => {
    let iptal = false;
    kurucuCember().then((x) => { if (!iptal) setC(x); });
    return () => { iptal = true; };
  }, []);

  // 🔴 İSKELET/YÜKLENİYOR DA YOK. "Yükleniyor…" yazan bir kutu, sayı
  // hiç gelmeyecekse ziyaretçiye boş bir söz vermiş olur ve düzen
  // zıplar. Yer, sayı gerçekten varsa açılır.
  if (!c) return null;

  const yuzde = Math.min(100, Math.round((c.dolan / c.kontenjan) * 100));

  return (
    <div className="kcember" role="status">
      <div className="kcember-ust">
        <b>{c.dolan}</b>
        <span>/ {c.kontenjan} kurucu host</span>
      </div>
      <div className="kcember-bar" aria-hidden="true">
        <span style={{ width: `${yuzde}%` }} />
      </div>
      <p className="kcember-alt">
        {c.kalan > 0
          ? <>Kalan {c.kalan} kişilik yer için başvuru açık. Rozet sonradan alınamıyor.</>
          : <>Kurucu çember doldu — sıradaki dönem için listeye yazılabilirsin.</>}
      </p>
    </div>
  );
}
