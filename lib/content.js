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
  tagline: "Aktarmada üç saat. Yalnız geçmek zorunda değil.",
  // 🔴 Rakibin sloganı "Connecting flights. Connecting travelers."
  // Duygu dilini kullanıyor ve işe yarıyor. Bizimki daha somut:
  // acıyı adıyla söylüyoruz. Salon bir bahane; asıl ürün yalnız
  // seyahat etmemek.
  intro:
    "LoungeLink, aynı havalimanında aynı saatlerde bulunan doğrulanmış " +
    "yolcuları buluşturur. Salon hakkı olan biri yanında birini götürebilir; " +
    "olmayan biri de yalnız beklemek zorunda kalmaz.",
  email: "merhaba@loungelink.co",
  betaCta: "Beta'ya katıl",
};

export const SECTIONS = [
  {
    id: "kural",
    eyebrow: "EN BÜYÜK FARKIMIZ",
    title: "\"Bu kartla misafir götürebilir miyim?\"\nBu sorunun Türkçe cevabı yoktu.",
    body:
      "Miles&Smiles Elite Plus ile Classic Plus, aynı salonda bambaşka sonuç verir. " +
      "THY seferinde ailenizi götürebilirsiniz; Star Alliance üyesi başka bir havayolunda " +
      "yalnız bir misafir. AJet'te İstanbul salon listesinde bile yok. " +
      "Bunları resmî kaynaklardan tek tek çıkardık ve bir kural motoruna dönüştürdük.",
    note:
      "Kaynak: Türk Hava Yolları lounge kuralları, iGA ve Sabiha Gökçen resmî " +
      "salon sayfaları. Doğrulayamadığımız kuralı doğrulanmış gibi göstermiyoruz.",
    screen: "rehber-sonuc",
    accent: "gold",
  },
  {
    id: "kesif",
    eyebrow: "NASIL ÇALIŞIR",
    title: "Uçuşunu gir, seni içeri alabilecek kişileri gör.",
    body:
      "Seyahatini eklediğinde aynı havalimanında aynı saat aralığında bulunan " +
      "host'ları görürsün. Her ilanda hangi hakla girileceği, misafir hakkı olup " +
      "olmadığı ve kuralın ne kadar kesin olduğu yazar.",
    screen: "kesif",
    accent: "teal",
  },
  {
    id: "kurallar",
    eyebrow: "SÜRPRİZ YOK",
    title: "Kapıda öğrenmek yerine, başvurmadan önce bil.",
    body:
      "Başvurmadan önce o salonun kuralını görürsün: misafir kabul ediliyor mu, " +
      "ücretli mi, ücreti kim ödüyor, host ile aynı uçuşta olman gerekiyor mu. " +
      "Kural izin vermiyorsa başvuru açılmaz — ve neden açılmadığı yazar.",
    screen: "istek",
    accent: "amber",
  },
  {
    id: "guven",
    eyebrow: "GÜVEN",
    title: "İki taraf da doğrulanır, iki taraf da onaylar.",
    body:
      "E-posta ve telefon doğrulaması, güven puanı, çift taraflı oturum onayı ve " +
      "çift taraflı puanlama. Oturum yalnız iki taraf da \"başlat\" dediğinde açılır, " +
      "yalnız iki taraf da onayladığında kapanır.",
    screen: "oturum",
    accent: "green",
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
    screen: "profil",
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
