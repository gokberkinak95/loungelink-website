import { SITE } from "../../lib/content";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "Hesap Silme Talebi — LoungeLink",
  description: "LoungeLink hesabını ve verilerini silme talebini nasıl oluşturursun? Uygulamadan tek dokunuş, giremiyorsan e-postayla.",
  alternates: { canonical: "/hesap-sil" },
};

// ============================================================
// 🔴 BU SAYFA GOOGLE PLAY İÇİN ZORUNLU.
// Mağaza listelemesinde "Account deletion URL" isteniyor ve
// uygulama içi silmenin YANINDA web üzerinden erişilebilir bir
// yol olmalı. Bu olmadan uygulama yayına alınmaz.
//
// 🔴 SİLME OTOMATİK DEĞİL — ve bu bilinçli bir güvenlik kararı.
// Form otomatik silseydi, e-postasını bilen herkes başkasının
// hesabını silebilirdi. Talep alınır, kimlik doğrulanır, sonra işlenir.
// ============================================================
export default function DeleteAccount() {
  return (
    <>
      <SiteHeader />
      <div className="wrap" style={{ maxWidth: 680, padding: "44px 24px 80px" }}>
        <h1 style={{ fontSize: "clamp(26px,4vw,36px)" }}>Hesabınızı silmek</h1>

        <h2 style={{ fontSize: 20, marginTop: 30 }}>Uygulamadan (en hızlı)</h2>
        <p style={{ marginTop: 8 }}>
          Profil → Ayarlar → Hesabı Sil. Onayladığınız anda hesabınız kapanır ve profil
          fotoğrafınız silinir. 14 gün içinde vazgeçerseniz destek@loungelink.co adresine
          yazarak geri açtırabilirsiniz; 14 günün sonunda hesabınız anonimleştirilir.
        </p>
        <p style={{ marginTop: 8 }}>
          App Store veya Google Play üzerinden bir aboneliğiniz varsa, önce mağazanın
          abonelik ayarlarından iptal edin — hesabı silmek mağaza aboneliğini durdurmaz.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 30 }}>Uygulamaya giremiyorsanız</h2>
        <p style={{ marginTop: 8 }}>
          Kayıtlı e-posta adresinizden bize yazın; talebinizi alalım. Kimliğinizi
          doğruladıktan sonra 30 gün içinde işleme alınır.
        </p>
        <a
          href={`mailto:${SITE.email}?subject=Hesap%20silme%20talebi&body=Hesabımın%20silinmesini%20talep%20ediyorum.`}
          className="btn"
          style={{ marginTop: 16 }}
        >
          Silme talebi gönder
        </a>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 12 }}>
          Talebi <b>kayıtlı e-posta adresinizden</b> göndermeniz gerekir. Bu, başkasının
          sizin hesabınızı sildirmesini engelleyen tek adımdır.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 34 }}>Ne siliniyor, ne kalıyor?</h2>
        <ul style={{ marginTop: 10, paddingLeft: 20, fontSize: 15, lineHeight: 1.8 }}>
          <li><b>Silinir:</b> adınız, fotoğrafınız, biyografiniz, iletişim bilgileriniz, cinsiyetiniz, gelecek seyahatleriniz, bildirimleriniz ve tercihleriniz.</li>
          {/* 🔴 NE KALDIĞINI DA SÖYLÜYORUZ. "Her şey silinir" demek
              kolay ama doğru değil: yasal saklama yükümlülükleri ve
              karşı tarafın puanı gibi kalemler var. Yanlış vaat vermek
              yerine gerçeği yazmak, güvenin tek yolu. */}
          <li><b>Adınız olmadan kalır:</b> karşı tarafın sohbet geçmişindeki mesajlarınız (gönderildiği tarihten 24 ay) ve geçmiş oturum kayıtları — karşı tarafın da bir geçmişi var.</li>
          <li><b>Süresi dolana kadar saklanır:</b> şikayet kayıtları (5 yıl), satın alma kayıtları (vergi mevzuatı süresince), onay kayıtları (10 yıl) ve e-posta adresinizin geri döndürülemez özeti (5 yıl; adresin kendisi değil). Süre dolunca otomatik silinir.</li>
        </ul>
      </div>
    </>
  );
}
