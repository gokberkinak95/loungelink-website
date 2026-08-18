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

// v0.17 — vitrindeki sayılar veriden türetilir (bkz. COUNTS/STATS).
import { AIRPORTS, CARDS, ENTRIES } from "./guide";
// v0.18 — kapsam sayıları salon kataloğundan gelir (üretilmiş dosya).
import { LOUNGE_COUNTS } from "./lounges-data";

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
  // 🔴 v0.18 — EN DEĞERLİ CÜMLE, ŞU ANA KADAR HİÇBİR YERDE YOKTU.
  // Aynı uçuş / birlikte varış şartı bir KISIT değil, bir UYUM aracı:
  // kart sahibi zaten orada ve birlikte giriyorlar — programların
  // misafir kuralının tam olarak öngördüğü senaryo. Bu cümle riski
  // satış argümanına çevirir ve ürünü hukuki olarak doğru yere koyar.
  ruleCompliance:
    "Kural motoru sadece \"girebilir misin\"i söylemez — kuralın içinde " +
    "kalmanı sağlar.",
  // Kredi çerçevesi TEK yerde tanımlanır; sayfalar buradan okur.
  // 🔴 Bir "karşılık ilişkisi" beyanı ürünün hukuki konumlandırmasıyla
  // çelişir: FAQ "erişim hakkının devri yasaktır" derken başka yerde
  // kredinin host'a "teşekkür olarak aktarıldığı" anlatılıyordu.
  // Aynı ürünün iki farklı hikâyesi olmaz.
  creditFrame:
    "Kredi bir ödeme değil, bir teminattır. Misafir girişinin ücretli " +
    "olduğu salonlarda host'un cebinden çıkan tutarı dengeler. LoungeLink " +
    "bundan gelir elde etmez.",
  footerSlogan: "Aktarma uçuşları bağlar. Biz yolcuları.",
  closing: "Salon zaten senin.",
  closingEm: "Şimdi deneyimi paylaş.",
  email: "merhaba@loungelink.co",
  betaCta: "Beta'ya katıl",
};

// 3 adımda akış — sıra gerçek bir süreç olduğu için numaralı.
// 🔴 v0.17 — 02. adım ürünün EN TEMEL kuralını söylemiyordu:
// misafirin de aynı taşıyıcıda olması şart (sql/177 md.41-47,
// guest_must_match_carrier). Eşleşmenin ilk süzgeci bu; akış
// anlatısında geçmemesi, ürünün nasıl çalıştığını eksik anlatmaktı.
export const FLOW = [
  { n: "01", t: "Uçuşunu yaz", d: "Havalimanı, tarih, uçuş numarası. Host'san ilanını aç; misafirsen seyahatini ekle." },
  { n: "02", t: "Eşleşmeni bul", d: "Aynı uçuştakiler en üstte. Misafirin de aynı taşıyıcıyla uçuyor olmalı — kural motoru bunu eşleşmeden önce kontrol ediyor. Her kartta kural rozeti: misafir hakkı var mı, ücretli mi, aynı uçuş şartı var mı — başvurmadan görürsün." },
  // 🔴 v0.18 — "kredi escrow'da bekler" cümlesi tek başına bir BEDEL
  // izlenimi veriyordu. Kredinin ne olduğu, ne olmadığından önce gelir.
  { n: "03", t: "Lounge'da buluş", d: "Giriş buluşmadan önce teyit edilir; kredi bir ödeme değil, ücretli girişte host'un cebinden çıkanı dengeleyen teminattır. Kalan her şey iki yolcunun sohbeti." },
];

// Ekran şeritleri — GERÇEK cihaz görüntüleri (12 Ağu beta build'i).
// Çizim/mockup değil; "gerçek ekranlar" ibaresi bilinçli.

// v0.4 — hero rafı: ürünün ANLATISINI taşıyan beş ekran.
// Sıra bilinçli: keşif → kural kararı → sohbet → oturum → profil.
// Ziyaretçi rafı soldan sağa okuyunca akışın tamamını görür.
export const SHELF = [
  { src: "/screens/ss-kesfet.jpg", alt: "Keşfet — kural rozetli ilanlar", tag: "Keşfet", w: 480, h: 1027 },
  { src: "/screens/ss-n.jpg", alt: "İstek gönder — kural kararı", tag: "Kural kararı", w: 460, h: 942 },
  { src: "/screens/ss-m.jpg", alt: "Sohbet — oturum öncesi koordinasyon", tag: "Sohbet", w: 460, h: 942 },
  { src: "/screens/ss-home2.jpg", alt: "Ana sayfa — host paneli", tag: "Ana sayfa", w: 460, h: 942 },
  { src: "/screens/ss-tanis.jpg", alt: "Tanış — yol arkadaşı ağı", tag: "Tanış", w: 480, h: 1027 },
];

export const SHOTS_MAIN = [
  { src: "/screens/ss-home.jpg", alt: "LoungeLink ana ekran — host paneli", w: 480, h: 1027 },
  { src: "/screens/ss-kesfet.jpg", alt: "Keşfet — kural rozetli ilan listesi", w: 480, h: 1027 },
  { src: "/screens/ss-tanis.jpg", alt: "Tanış — havalimanı yol arkadaşı ağı", w: 480, h: 1027 },
];
export const SHOTS_TRUST = [
  { src: "/screens/ss-baglanti.jpg", alt: "Bağlantılar — karşılıklı onaylı", w: 480, h: 1027 },
  { src: "/screens/ss-seyahat.jpg", alt: "Seyahatlerim — salon rehberiyle", w: 480, h: 1027 },
  { src: "/screens/ss-splash.jpg", alt: "LoungeLink açılış — önce güven", w: 480, h: 1027 },
];

// Kural motoru program kartları — rakipte 4 genel ittifak kartı var;
// bizde her kart GERÇEK kural verisinden konuşur. Derinlik farkımız.
export const PROGRAMS = [
  { t: "Miles&Smiles", tag: "Kart tipine göre", d: "Elite Plus aile götürür, Classic Plus iç hatta yalnız kendisi girer, Classic ücret öder. Aynı program, dört farklı sonuç — hepsi ayrı ayrı modelli." },
  { t: "Star Alliance", tag: "Aynı uçuş şartı", d: "Gold üyenin misafiri 2021'den beri aynı uçakta olmak zorunda. Başka havayolunda uçarken aile hakkı düşer — çoğu yolcunun kapıda öğrendiği kural." },
  // 🔴 v0.17 — BU KART KURALIN TERSİNİ SÖYLÜYORDU.
  // Eski metin: "Priority Pass · DragonPass — Havayolu şartı yok".
  // Motor (sql/099 md.204,210): DragonPass için guest_flight_coupling
  // = 'same_flight' ve koşul metni "DragonPass md.7.15.7: misafirin
  // uyeyle AYNI UCUSTA olmasi gerekir." İki programı tek cümlede
  // birleştirmek, ikisinin FARKINI siliyordu — hem de en kritik yerde:
  // DragonPass kullanıcısı "havayolu şartı yok" okuyup eşleşme arıyor,
  // kapıda misafiri geri çevriliyor.
  // Ayrıca sabit "30€ / 36€" yazılıydı; sql/107 md.150 "Tutar karti
  // veren kuruma gore degisir" diyor. Uydurulmuş kesinlik, belirsizlikten
  // kötüdür — sayı tutmadığında güven de gider.
  { t: "Priority Pass · DragonPass", tag: "Üyelik", d: "Priority Pass'te havayolu şartı yok — aynı terminaldeysen eşleşirsin. DragonPass'te misafirin seninle AYNI UÇUŞTA olmalı. Misafir ücreti kartını verene göre değişir; ilan kartında hangi tutarın geçerli olduğunu yazıyoruz." },
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
  { i: "◆", t: "Kredi teminattır, ödeme değil",
    d: "İstek gönderirken 1 kredi emanete alınır, host reddederse aynı saniye geri döner. Ücretli girişte host'un cebinden çıkanı dengeler; LoungeLink bundan gelir elde etmez." },
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
    shotW: 480, shotH: 1027,
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
    shotW: 460, shotH: 942,
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
      "Beta boyunca ücretsiz. Kredi bir ödeme değil, bir teminattır: misafir " +
      "girişinin ücretli olduğu salonlarda host'un cebinden çıkan tutarı " +
      "dengeler. LoungeLink bundan gelir elde etmez.",
  },
  // 🔴 v0.18 — SİTE KENDİ KENDİSİYLE ÇELİŞİYORDU: bir yerde "erişim
  // hakkının devri yasaktır", başka yerde kredi host'a "teşekkür"
  // diye anlatılıyordu. Soruyu kendimiz sorup açıkça cevaplıyoruz;
  // sorulmadan cevaplanan itiraz, sorulduğunda cevaplanandan güçlüdür.
  {
    q: "Kredi host'a ödenen bir bedel mi?",
    a:
      "Hayır. Kredi bir ödeme değil, bir teminattır. Misafir girişinin ücretli " +
      "olduğu salonlarda host'un cebinden çıkan tutarı dengeler; LoungeLink " +
      "bundan gelir elde etmez ve lounge erişimi ödül kataloğunda yer almaz. " +
      "Kural motoru sadece \"girebilir misin\"i söylemez — kuralın içinde " +
      "kalmanı sağlar: aynı uçuş ve birlikte varış şartını eşleşmeden önce " +
      "arar, çünkü programların misafir kuralı tam olarak bunu öngörür.",
  },
];

// ============================================================
// 🔴 v0.17 — "22 HAVALİMANI" İDDİASI HİÇBİR KAYNAKLA EŞLEŞMİYORDU.
// Burada 22, RuleDemo'da 22, rehberde ise 12 havalimanı görünüyordu.
// Uydurulmuş bir sayı, tek bir tıkla çürütülüyor: ziyaretçi rehbere
// giriyor ve saymaya başlıyor. Vitrinde yalan söyleyen bir sayı,
// ürünün geri kalanına duyulan güveni de götürür.
//
// Sayılar artık VERİDEN türetiliyor. Veri değişince rakam da değişir;
// elle senkron tutulacak bir yer kalmıyor. Doğrulanabilir olması,
// büyük görünmesinden değerlidir.
//
// 🔴 v0.18 — VİTRİN KAPSAMI YANLIŞ YERDEN OKUYORDU. Sayılar
// lib/guide.js'ten (15 Türkiye havalimanı) geliyordu; oysa salon
// kataloğumuz 219 havalimanı taşıyor. Yani sayı "uydurma" değil ama
// EKSİKTİ — ve eksik bir sayı da yanlış söz verir, sadece ters yönde:
// ziyaretçi kendi havalimanını göremeyip çıkıyordu.
// Kaynak artık lib/lounges-data.js (data/salonlar.csv'den üretilir).
export const COUNTS = {
  airports: LOUNGE_COUNTS.airports,
  lounges: LOUNGE_COUNTS.lounges,
  countries: LOUNGE_COUNTS.countries,
  trAirports: LOUNGE_COUNTS.trAirports,
  trLounges: LOUNGE_COUNTS.trLounges,
  guideAirports: Object.keys(AIRPORTS).length,
  cards: Object.keys(CARDS).length,
  pages: ENTRIES.length,
};

// Vitrindeki dört sayı da tek tek doğrulanabilir: katalogda say, tut.
export const STATS = [
  { n: String(COUNTS.lounges), l: "salon" },
  { n: String(COUNTS.airports), l: "havalimanı" },
  { n: String(COUNTS.countries), l: "ülke" },
  { n: String(COUNTS.pages), l: "kural sayfası" },
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
  // 🔴 v0.18 — ÖDÜL KATALOĞUNDAN LOUNGE ERİŞİMİ ÜRÜNLERİ ÇIKARILDI.
  // Eski metin "Priority Pass misafir kartı" sayıyordu. Zincir şuydu:
  // misafir kredi verir → host'a geçer → host onu lounge erişimine
  // çevirir. Bu, FAQ'nun "programlar erişim hakkının devrini yasaklar"
  // dediği şeyin operasyonel tanımıdır. Lounge hakkını paylaşan kişiye
  // lounge hakkı ödül vermek döngüyü kapatır ve ilişkiyi açık bir
  // takasa çevirir. Kalanlar (eSIM, sigorta, otel kredisi, mil) lounge
  // erişimiyle ilgisiz olduğu için o döngüyü kurmuyor.
  { i: "★", t: "Yolda işine yarar",
    d: "Her tamamlanan oturum LoungePuan kazandırır: eSIM, seyahat sigortası, otel kredisi, THY mili. Lounge erişimi ödül olarak verilmez — hak paylaşımı takasa dönüşmesin diye." },
];

// Host'un aklındaki asıl soru "riski ne?" — cevabı tek tek veriyoruz.
export const HOST_RISK = [
  // 🔴 v0.18 — "kredi sende kalır" cümlesi host'u gelmeyen misafirden
  // KAZANÇLI çıkarıyordu; bu, teminat çerçevesini bozar. Teminat ceza
  // değildir: oturum başlamazsa çözülür, sonuç güven puanına yazılır.
  { q: "Ya gelmezse?", a: "Oturum iki taraflı onayla başlar. Karşı taraf gelmezse oturum hiç başlamaz: teminat çözülür ve gelmeyen tarafın güven puanına yazılır." },
  { q: "Ya kural yanlış çıkarsa?", a: "Kural motoru kartını, salonu ve uçuşunu birlikte okur; resmî tabloların dışına çıkmaz. Emin olmadığı yerde tahmin yürütmez, açıkça söyler." },
  { q: "Ya rahatsız edici biri olursa?", a: "Her profilde rapor ve engelleme var, sohbette acil durum düğmesi. Rahatsız eden topluluktan çıkar; açıklama yapmak zorunda değilsin." },
  { q: "Kaç kişi alabilirim?", a: "Kartının izin verdiği kadar — bunu sen hesaplamıyorsun, motor söylüyor. Aile hakkın varsa onu da ayrıca gösteriyoruz." },
];
