// ============================================================
// LoungeLink · site içeriği (v0.1)
//
// 🔴 TÜM METİNLER TEK DOSYADA. Sebep: bir pazarlama sitesinde en
// çok değişen şey metindir, kod değil. Metni bileşenlerin içine
// serpiştirirsem her düzeltme için JSX'e dokunmak gerekir.
//
// 🔴 BAŞLIKLAR SORUNLA BAŞLAR, ÜRÜNLE DEĞİL.
// Lukal'ı incelediğimde her bölüm "Lukal, ..." diye başlıyordu —
// özellik anlatıyor, sorun çözmüyor. Ziyaretçi "bu bana ne yapıyor"
// sorusunun cevabını almadan özellik listesi okuyor.
// Bizim her başlığımız bir SORUNA ya da bir SONUCA işaret eder.
// ============================================================

export const SITE = {
  name: "LoungeLink",
  // 🔴 v0.3 SLOGAN KATMANI (Lounge Surf incelemesinden sonra).
  // Onların formülü: sahne + boş koltuk + davet. Bizim Türkçesi
  // ürünün kendi sesiyle. Kahraman tek cümle; alt metin acıyı
  // adıyla söyler. "Aynı uçuşta, aynı salonda" app açılışıyla
  // birebir aynı — site ile uygulama aynı cümleyle konuşmalı.
  hero: "Senin uçağında, lounge'da yeri olan biri var.",
  heroSub:
    "Her uçuşta biri yalnız uçuyor — ve kartında kullanılmayan bir misafir " +
    "hakkı duruyor. LoungeLink ikisini aynı salonda buluşturur: aynı uçuşta, " +
    "aynı salonda, kalkıştan önce.",
  tagline: "Aktarmada üç saat. Yalnız geçmek zorunda değil.",
  intro:
    "LoungeLink, aynı havalimanında aynı saatlerde bulunan doğrulanmış " +
    "yolcuları buluşturur. Salon hakkı olan biri yanında birini götürebilir; " +
    "olmayan biri de yalnız beklemek zorunda kalmaz.",
  ruleSlogan: "Kartındaki hak, yanındaki insan.",
  footerSlogan: "Aktarma uçuşları bağlar. Biz yolcuları.",
  closing: "Salon zaten senin.",
  closingEm: "Şimdi deneyimi paylaş.",
  email: "merhaba@loungelink.co",
  betaCta: "Beta'ya katıl",
};

// 3 adımda akış — sıra gerçek bir süreç olduğu için numaralı.
export const FLOW = [
  { n: "01", t: "Uçuşunu yaz", d: "Havalimanı, tarih, uçuş numarası. Host'san ilanını aç; misafirsen seyahatini ekle." },
  { n: "02", t: "Eşleşmeni bul", d: "Aynı uçuştakiler en üstte. Her kartta kural rozeti: misafir hakkı var mı, ücretli mi, aynı uçuş şartı var mı — başvurmadan görürsün." },
  { n: "03", t: "Lounge'da buluş", d: "Kredi escrow'da bekler, giriş buluşmadan önce teyit edilir. Kalan her şey iki yolcunun sohbeti." },
];

// Ekran şeritleri — GERÇEK cihaz görüntüleri (12 Ağu beta build'i).
// Çizim/mockup değil; "gerçek ekranlar" ibaresi bilinçli.

// v0.4 — hero rafı: ürünün ANLATISINI taşıyan beş ekran.
// Sıra bilinçli: keşif → kural kararı → sohbet → oturum → profil.
// Ziyaretçi rafı soldan sağa okuyunca akışın tamamını görür.
export const SHELF = [
  { src: "/screens/ss-kesfet.jpg", alt: "Keşfet — kural rozetli ilanlar", tag: "Keşfet" },
  { src: "/screens/ss-n.jpg", alt: "İstek gönder — kural kararı", tag: "Kural kararı" },
  { src: "/screens/ss-m.jpg", alt: "Sohbet — oturum öncesi koordinasyon", tag: "Sohbet" },
  { src: "/screens/ss-home2.jpg", alt: "Ana sayfa — host paneli", tag: "Ana sayfa" },
  { src: "/screens/ss-tanis.jpg", alt: "Tanış — yol arkadaşı ağı", tag: "Tanış" },
];

export const SHOTS_MAIN = [
  { src: "/screens/ss-home.jpg", alt: "LoungeLink ana ekran — host paneli" },
  { src: "/screens/ss-kesfet.jpg", alt: "Keşfet — kural rozetli ilan listesi" },
  { src: "/screens/ss-tanis.jpg", alt: "Tanış — havalimanı yol arkadaşı ağı" },
];
export const SHOTS_TRUST = [
  { src: "/screens/ss-baglanti.jpg", alt: "Bağlantılar — karşılıklı onaylı" },
  { src: "/screens/ss-seyahat.jpg", alt: "Seyahatlerim — salon rehberiyle" },
  { src: "/screens/ss-splash.jpg", alt: "LoungeLink açılış — önce güven" },
];

// Kural motoru program kartları — rakipte 4 genel ittifak kartı var;
// bizde her kart GERÇEK kural verisinden konuşur. Derinlik farkımız.
export const PROGRAMS = [
  { t: "Miles&Smiles", tag: "Kart tipine göre", d: "Elite Plus aile götürür, Classic Plus iç hatta yalnız kendisi girer, Classic ücret öder. Aynı program, dört farklı sonuç — hepsi ayrı ayrı modelli." },
  { t: "Star Alliance", tag: "Aynı uçuş şartı", d: "Gold üyenin misafiri 2021'den beri aynı uçakta olmak zorunda. Başka havayolunda uçarken aile hakkı düşer — çoğu yolcunun kapıda öğrendiği kural." },
  { t: "Priority Pass · DragonPass", tag: "Üyelik", d: "Havayolu şartı yok: aynı terminaldeysen eşleşirsin. Misafir ücreti (30€ / 36€) ilan kartında yazar — sürpriz fatura yok." },
  { t: "Pegasus", tag: "İndirimli ücretli", d: "BolBol dahil ücretsiz hak yok; biniş kartıyla indirimli giriş. Somut tarife (SAW 49–63€, Primeclass 27€+KDV) uygulamada güncel tutulur." },
  // v0.5 — SQL 164 ile motora giren iki davranış sitede de anlatılır.
  // Sitenin kural bölümü motorun aynası olmalı; yoksa "matriste dört
  // program var" izlenimi kalır ve derinlik iddiası zayıflar.
  { t: "Business bileti", tag: "Bilet hakkı", d: "Business bileti sahibini salona sokar ama misafir hakkı vermez — misafir hakkı bilete değil statü kartına bağlıdır. Business bölümünde misafir kabul edilmez; misafirle girecekseniz girişte Miles&Smiles bölümünü isteyin." },
  { t: "Primeclass · iGA · Plaza Premium", tag: "Kapı satışı", d: "Bunlar üyelik değil, salonun kendi kapı satışı. Misafir 'dahil' değildir ama yasak da değildir: aynı tarifeden o da girer. Motor bu ayrımı yapar — 'misafir alamazsın' demek yanlış olurdu." },
  { t: "Banka & Amex kartları", tag: "Doğrulanmadı", d: "Bu kartların misafir hakkı kartı veren kuruma göre değişir ve tarafımızca doğrulanmamıştır. Uydurmak yerine bunu açıkça söylüyoruz: planınız varsa bankanızdan teyit alın." },
];

// Güven kartları — hepsi app'te GERÇEKTEN var olan mekanizmalar.
export const TRUST = [
  { t: "Doğrulanmış profiller", d: "E-posta + telefon doğrulaması zorunlu; güven puanı her kartta görünür." },
  { t: "Escrow kredisi", d: "İstek gönderirken 1 kredi emanette bekler; reddedilirse anında iade. Ciddiyeti sistem kurar." },
  { t: "Buluşmadan önce teyit", d: "Giriş kodu buluşma anında paylaşılır; oturum iki tarafın onayıyla başlar ve biter." },
  { t: "Karşılıklı puanlama", d: "Her oturumdan sonra iki taraf da puanlar. İtibar seninle gezer." },
  { t: "Rapor & engelleme", d: "Her profil ve sohbette tek dokunuş. Topluluk kuralını bozan çıkarılır." },
  { t: "Kadın güvenlik modu", d: "Kadın kullanıcılar yalnız kadın host'ları görme seçeneğine sahip." },
];

export const SECTIONS = [
  {
    id: "kesif",
    eyebrow: "NASIL ÇALIŞIR",
    title: "Uçuşunu gir, seni içeri alabilecek kişileri gör.",
    body:
      "Seyahatini eklediğinde aynı havalimanında aynı saat aralığında bulunan " +
      "host'ları görürsün. Her ilanda hangi hakla girileceği, misafir hakkı olup " +
      "olmadığı ve kuralın ne kadar kesin olduğu yazar.",
    shot: "/screens/ss-kesfet.jpg",
    shotAlt: "Keşfet ekranı — kural rozetli ilan listesi",
    accent: "teal",
  },
  {
    id: "host",
    eyebrow: "HOST'LARA",
    title: "Bu yıl kaç misafir hakkınız kullanılmadan duruyor?",
    body:
      "Elite Plus kartında yılda onlarca misafir hakkı var ve çoğu kullanılmadan " +
      "siliniyor. LoungeLink o hakkı bir tanışmaya çevirir. Kimin başvurabileceğine, " +
      "hangi saatlerde müsait olduğunuza ve ilanın kime görüneceğine siz karar verirsiniz.",
    note: "İlk 100 host'a kalıcı \"Kurucu Host\" rozeti. Sonradan alınamaz.",
    shot: "/screens/ss-home2.jpg",
    shotAlt: "Host ana sayfası — ilan, bekleyen istek ve bağlantılar",
    accent: "gold",
  },
];

// 🔴 SSS pazarlama metni değil, İTİRAZ KARŞILAMADIR.
// Buraya "en sık sorulan" soruları değil, "kaydolmayı engelleyen"
// soruları yazıyoruz. İkisi aynı şey değil.
export const FAQ = [
  {
    q: "Bu bir lounge erişimi satan uygulama mı?",
    a:
      "Hayır. LoungeLink lounge erişimi satmaz ve satamaz. Kart programlarının " +
      "kuralları erişim hakkının devredilmesini yasaklar. Biz yalnız aynı yerde " +
      "bulunan iki kişiyi tanıştırırız; kimin nereye girebileceğine salon karar verir.",
  },
  {
    q: "Host neden birini içeri alsın?",
    a:
      "Çoğu host için asıl sebep kullanılmayan hak. Yılda 12 misafir hakkınız varsa " +
      "ve 3'ünü kullandıysanız, kalan 9'u yıl sonunda siliniyor. Bir de tanışma var: " +
      "aktarma beklerken aynı sektörden biriyle sohbet etmek çoğu kişi için değerli.",
  },
  {
    q: "Kural bilgileriniz güvenilir mi?",
    a:
      "Her kuralın bir kaynağı ve bir kesinlik derecesi var: doğrulandı, ikincil kaynak, " +
      "ya da bilinmiyor. Doğrulayamadığımızı doğrulanmış gibi göstermiyoruz. " +
      "Kapıdaki son karar her zaman salona aittir ve bunu uygulamada da yazıyoruz.",
  },
  {
    q: "Güvenli mi?",
    a:
      "E-posta ve telefon doğrulaması zorunlu. Güven puanı, çift taraflı onay, " +
      "puanlama, engelleme ve bildirim mekanizmaları var. Kadın kullanıcılar için " +
      "yalnız kadın host'ları görme seçeneği bulunuyor.",
  },
  {
    q: "Ücretli mi?",
    a:
      "Beta boyunca ücretsiz. Kredi sistemi, misafir girişinin ücretli olduğu " +
      "salonlarda host'un cebinden çıkan tutarı dengelemek için var — bizim " +
      "kazancımız değil.",
  },
];

export const STATS = [
  { n: "22", l: "havalimanı" },
  { n: "35+", l: "kart ve program" },
  { n: "6", l: "İstanbul salonu, kuralıyla" },
];
