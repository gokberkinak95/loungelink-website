"use client";
// ============================================================================
// Olcum.jsx — SİTENİN TEK ÖLÇÜM NOKTASI
//
// 🔴 NEDEN VAR
// Yedi rollü denetimde en düşük puanı alan şey buydu: sitede hiçbir ölçüm
// yoktu. Analitik yok, dönüşüm hedefi yok, huni yok. Sonucu şu: bugün
// alınan her ürün ve pazarlama kararı YANLIŞLANAMAZ. 30 Instagram görseli
// üretmenin bir işe yarayıp yaramadığını ölçemiyorduk.
//
// 🆕 SINIF: "ÖLÇÜLMEYEN BİR HUNİ, HUNİ DEĞİL BİR İNANÇTIR."
//
// ────────────────────────────────────────────────────────────────────────
// NEDEN GOOGLE ANALYTICS DEĞİL — VE NEDEN BU SEÇİLDİ
//
// Uygulamada 26 Ağustos'ta zaten şu karar alınmıştı: "Üçüncü parti
// analitik KULLANILMADI (KVKK gerekçesi)". Sitede farklı davranmak, aynı
// ürünün iki yüzünde iki farklı gizlilik duruşu demek olurdu.
//
// Üç seçenek ölçüldü:
//
//  1 · GOOGLE ANALYTICS — çerez koyar, kişisel veriyi ABD'ye aktarır.
//      Aydınlatma metnimiz ve `/cerez` sayfamız bunu KAPSAMIYOR; kapsasa
//      bile açık rıza penceresi gerekir ve o pencere dönüşümü düşürür.
//      REDDEDİLDİ.
//
//  2 · KENDİ SUNUCUMUZDA SAYAÇ — Supabase'e yazan bir uç nokta.
//      Cazip ama iki bedeli var: (a) bot trafiği veritabanımıza yazar,
//      (b) site statik ihraç edilebilirliğini kaybeder.
//      ERTELENDİ (gerekirse ikinci adım).
//
//  3 · ÇEREZSİZ, KİŞİSEL VERİ TOPLAMAYAN BARINDIRILAN SAYAÇ  ← seçilen
//      Plausible / Umami sınıfı. Çerez koymaz, parmak izi çıkarmaz, IP
//      saklamaz — yani KVKK anlamında kişisel veri işlemez ve açık rıza
//      penceresi GEREKMEZ. Aydınlatma metnine tek cümle yeter.
//
// ⚠️ ALAN ADI ÇEVRE DEĞİŞKENİNDEN. `NEXT_PUBLIC_OLCUM_HOST` tanımlı
// değilse bu bileşen HİÇBİR ŞEY yüklemez — yani sağlayıcı seçilmeden
// site sessizce üçüncü parti bir betik çekmez. Bu bilinçli: bir ölçüm
// aracını "ileride bağlarız" diye boş bırakmak, onu bağlamış gibi
// davranmaktan iyidir.
// ============================================================================
import Script from "next/script";

const HOST = process.env.NEXT_PUBLIC_OLCUM_HOST || "";
const ALAN = process.env.NEXT_PUBLIC_OLCUM_ALAN || "loungelink.co";

export default function Olcum() {
  if (!HOST) return null;
  return (
    <Script
      defer
      data-domain={ALAN}
      src={`${HOST.replace(/\/$/, "")}/js/script.outbound-links.js`}
      strategy="afterInteractive"
    />
  );
}

// ────────────────────────────────────────────────────────────────────────
// OLAY GÖNDERİCİ
//
// 🔴 ÜÇ OLAY, DAHA FAZLASI DEĞİL. Bir huni ancak sayılabildiği kadar
// okunur; on beş olay toplayan bir site, hiçbirine bakılmayan bir site
// olur. Ürünün cevaplaması gereken üç soru var:
//
//   indir        → site ikna etti mi?
//   kural_sorusu → farklılaştırıcımız (kural motoru) ilgi çekiyor mu?
//   host_ol      → arz tarafı için hiç niyet var mı?      ← en kritik
//
// Üçüncüsü en önemlisi: soğuk başlangıç sorununun tek erken göstergesi.
//
// ⚠️ KİŞİSEL VERİ GEÇİRME. `ozellik` yalnız kategorik olabilir
// (örn. "hero", "hesaplayici"); e-posta, uçuş numarası, kart adı ASLA.
export function olay(ad, ozellik) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.plausible === "function") {
      window.plausible(ad, ozellik ? { props: ozellik } : undefined);
    }
  } catch (_) {
    // Ölçüm hiçbir zaman ürünü düşürmez.
  }
}
