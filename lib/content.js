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
  // 🔴 v0.7: "Doğrulanmadı" rozeti kaldırıldı. Dürüstlük iyi bir değer ama
  // vitrinde kendi eksiğini etiketlemek başka bir şey: ziyaretçi ürünün
  // zayıf olduğunu okur. Aynı gerçek, güç veren cümleyle söylenir.
  { t: "Banka & Amex kartları", tag: "Kartına özel", d: "Banka ve Amex kartlarının lounge hakkı kartı verene göre değişir. Uygulama bu kartları tanır, koşulları kapıda sürpriz olmasın diye açıkça yazar ve emin olmadığı yerde tahmin yürütmez." },
];

// Güven kartları — hepsi app'te GERÇEKTEN var olan mekanizmalar.
// 🔴 v0.8 — LS KART GRAMERİ: ikon çipi + SORU/vaat başlığı (3-5 kelime)
// + iki satır gövde ve gövdede MUTLAKA bir somut insani ayrıntı.
// LS'in en güçlü hamlesi buydu: "I'm at gate B12, blue jacket." Bir
// cümlelik detay soyut özelliği yaşanmış ana çeviriyor. Genel cümle yasak.
export const TRUST = [
  { i: "✓", t: "Kiminle buluştuğunu bil",
    d: "Profil, güven puanı ve geçmiş oturumlar başvurmadan önce açık. \"Elif K. · doğrulanmış · 12 oturum\" — sürpriz yok." },
  { i: "◆", t: "Kredi neden emanette?",
    d: "İstek gönderirken 1 kredi emanete alınır, host reddederse aynı saniye geri döner. Ciddiyeti kural kurar, insanlar değil." },
  { i: "⬡", t: "Kapıda ne olacağını bilerek git",
    d: "Giriş kodu buluşma anında sohbette paylaşılır: \"4821\". Oturum iki taraf da onaylayınca başlar, iki taraf da onaylayınca biter." },
  { i: "★", t: "İtibar seninle geziyor",
    d: "Her oturumdan sonra iki taraf birbirini puanlar. Bir sonraki havalimanında bu puan senden önce varır." },
  { i: "⏻", t: "Tek dokunuşla çık",
    d: "Her profil ve sohbette rapor ve engelleme var. Rahatsız eden biri topluluktan çıkar; açıklama yapmak zorunda değilsin." },
  { i: "◐", t: "Kadın yolcular için ayrı mod",
    d: "İstersen yalnız kadın host'ları gör. Bunu açtığında profilin de yalnız onlara görünür — tek yönlü değil, karşılıklı." },
];

export const SECTIONS = [
  {
    id: "kesif",
    // 🔴 v0.7 METİN REVİZYONU (Gokberk: "çok mekanik, app'ten kopyalanmış
    // gibi; marketing açısından ilgi çekici olmalı, olumsuzluktan kaçınalım").
    // İki kural benimsendi: (1) başlık bir SAHNE kurar, özellik saymaz
    // (2) cümle "giremezsin" değil "şunu yapabilirsin" der. Aynı bilgi,
    // başka bir ses.
    eyebrow: "OTUZ SANİYE",
    title: "Uçuşunu yaz. Kapıyı kimin açabileceğini gör.",
    body:
      "Kalkışa üç saat var, kapıda kalabalık, sen ayaktasın. Oysa aynı terminalde " +
      "kartında boş misafir hakkı olan biri oturuyor. Seyahatini eklediğin anda o " +
      "kişiyi görürsün — hangi salon, hangi saat, hangi hakla. Kural motoru cevabı " +
      "sen başvurmadan önce verir; sürpriz kapıda değil, ekranda biter.",
    cta: { label: "Uçuşunu yaz, kimin açabileceğini gör →", href: "#beta" },
    shot: "/screens/ss-kesfet.jpg",
    shotAlt: "Keşfet ekranı — kural rozetli ilan listesi",
    accent: "teal",
  },
  {
    id: "host",
    eyebrow: "KARTINDA DURAN HAK",
    title: "O misafir hakkı yıl sonunda siliniyor. Ya da bir tanışmaya dönüşüyor.",
    body:
      "Elite Plus kartında her yıl kullanılmayan misafir hakları var. Havayolu onları " +
      "geri almıyor, sen de kullanmıyorsun — sessizce kayboluyorlar. LoungeLink o hakkı " +
      "yanındaki koltuğa çevirir: kiminle, hangi saatte ve kime görünür şekilde " +
      "paylaşacağına tamamen sen karar verirsin.",
    note: "İlk 100 host'a kalıcı \"Kurucu Host\" rozeti. Sonradan alınamaz.",
    cta: { label: "Kurucu çembere katıl →", href: "#beta" },
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

// ============================================================
// 🔴 HOST TARAFI — sitenin en zayıf noktasıydı
// Gökberk: "site çok guest'e yönelik ama bizim ana ihtiyacımız host
// bulmak." Doğru teşhis: iki taraflı bir pazarda ARZ tarafı önce gelir.
// Misafir, host olmadan hiçbir şey göremez; host ise misafir olmadan da
// kartını kullanmaya devam eder. Yani ikna edilmesi gereken taraf host.
//
// Host'un itirazları sırayla: (1) neden paylaşayım (2) yanıma kimi
// alacağım (3) başıma iş açar mı (4) bana ne kazandırır. Bölüm bu dört
// soruyu bu sırayla cevaplar — özellik saymaz.
// ============================================================
export const HOST_WHY = [
  { i: "◆", t: "Hakkın zaten var, kullanılmıyor",
    d: "Elite Plus kartında yıl boyunca misafir hakkın var ve çoğu yıl sonunda siliniyor. Havayolu geri almıyor, devretmiyor, para etmiyor. Yanındaki koltuk boş gidiyor." },
  { i: "✓", t: "Yanına kimi alacağını sen seçersin",
    d: "İstek gelir, sen bakarsın: doğrulanmış profil, güven puanı, kaç oturum yapmış, hangi uçuşta. Beğenmezsen reddedersin, kimse sebebini sormaz." },
  { i: "⬡", t: "Numaran, adresin, planın sende kalır",
    d: "Sohbet uygulamanın içinde. Buluşma saatini sen belirlersin, giriş kodu kapıda ikinizin ekranında. İstediğin an bitirirsin." },
  { i: "★", t: "Verdiğin şey geri döner",
    d: "Her tamamlanan oturum LoungePuan kazandırır: Priority Pass misafir kartı, THY mili, eSIM, seyahat sigortası. Kartındaki boş hak, yolda işine yarayan bir şeye dönüşür." },
];

// Host'un aklındaki asıl soru "riski ne?" — cevabı tek tek veriyoruz.
export const HOST_RISK = [
  { q: "Ya gelmezse?", a: "Oturum iki taraflı onayla başlar. Karşı taraf gelmezse oturum başlamaz, kredi sende kalır ve güven puanı ona yazılır." },
  { q: "Ya kural yanlış çıkarsa?", a: "Kural motoru kartını, salonu ve uçuşunu birlikte okur; resmî tabloların dışına çıkmaz. Emin olmadığı yerde tahmin yürütmez, açıkça söyler." },
  { q: "Ya rahatsız edici biri olursa?", a: "Her profilde rapor ve engelleme var, sohbette acil durum düğmesi. Rahatsız eden topluluktan çıkar; açıklama yapmak zorunda değilsin." },
  { q: "Kaç kişi alabilirim?", a: "Kartının izin verdiği kadar — bunu sen hesaplamıyorsun, motor söylüyor. Aile hakkın varsa onu da ayrıca gösteriyoruz." },
];
