"use client";
import { useEffect, useState } from "react";
import { hostHikayeleri } from "../lib/supabase";

// ============================================================
// GERÇEK HOST CÜMLELERİ — bugün BOŞ, ve bu bilerek
//
// v0.28'de host bölümünü baştan yazdım: altı kart, bir hesaplayıcı,
// bir basamak şeridi. Hepsini BEN yazdım. Bir tanesi bile bunu
// yaşamış birinden gelmiyor — ve bir yabancının yanına oturmayı
// anlatan bir üründe en ikna edici cümle, benim yazabileceğim hiçbir
// cümle değil.
//
// 🔴 EN KOLAY YOL BURAYA ÜÇ UYDURMA REFERANS YAZMAKTI.
// "Ahmet K., Elite Plus: harika bir deneyimdi." Bu, bu projede
// yaptığımız her şeyin tersi olurdu: uydurma referans, uydurulmuş bir
// ölçümdür — üstelik en pahalısı, çünkü yakalandığında geri kalan
// her sayıyı da şüpheli yapar.
//
// 🆕 SINIF: **"ELİMDE OLMAYAN BİR ŞEYİ YAZMAK YERİNE, ONU ELDE
// EDECEK YOLU KUR — VE O GELENE KADAR YERİ BOŞ KALSIN."**
//
// Makine kuruldu (SQL 230):
//   · host_hikaye_yaz()  — yalnız TAMAMLANMIŞ oturumun host'u yazabilir
//   · rıza + moderasyon olmadan yayın VERİTABANI KISITIYLA imkânsız
//   · dışarı çıkan tek kimlik, kullanıcının kendi seçtiği görünen ad
//
// Bugün 0 hikâye var → bu bileşen `null` dönüyor → bölüm sayfada HİÇ
// YOK. Yer tutucu yok, "yakında" yok, gri kutu yok. İlk gerçek cümle
// geldiği gün kendiliğinden açılacak.
// ============================================================
export default function HostStories() {
  const [h, setH] = useState(null);

  useEffect(() => {
    let iptal = false;
    hostHikayeleri(3).then((x) => { if (!iptal) setH(x); });
    return () => { iptal = true; };
  }, []);

  if (!h || h.length === 0) return null;

  return (
    <div className="hstory">
      <h3 className="hstory-baslik">Ağırlayanlar ne diyor</h3>
      <div className="hstory-grid">
        {h.map((x, i) => (
          <figure className="hstory-k" key={i}>
            <blockquote>{x.metin}</blockquote>
            <figcaption>
              <b>{x.gorunen_ad}</b>
              {x.gorunen_not ? <span>{x.gorunen_not}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
