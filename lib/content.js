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
  // 🔴 v0.28 — SON CÜMLE EKLENDİ. İlk ekran iki tarafa da konuşmalı:
  // eski hâli misafirin kazancını söylüyordu, host'unkini söylemiyordu.
  // Host, sitenin ikna etmesi gereken taraf ve ilk 15 saniyede kendi
  // kazancını görmeden aşağı inmiyor.
  //
  // 🔴 26 AĞUSTOS — BU SAYI BEŞ YERDE YANLIŞTI. SQL 246 (23 Ağustos) ödülü
  // 3 krediden 1 krediye indirdi; `HostEarn.jsx` güncellendi (KREDI_BASINA
  // _AGIRLAMA = 1) ama BU DOSYA güncellenmedi. Sonuç: aynı sayfada, 200
  // piksel arayla, kahraman metni "üç kez misafir ol" derken hesaplayıcı
  // "1 ağırlama = 1 kredi" diyordu. Host'a verilen söz %300 abartılıydı.
  //
  // 🆕 SINIF: "BİR SAYIYI HESAPLAYAN YERDE DÜZELTMEK, ONU ANLATAN YERDE
  // DÜZELTMEK DEĞİLDİR — VE ANLATAN YER DAHA ÇOK OKUNUR." 
  // + 007:52 (istek 1 kredi).
  heroSub:
    "Her uçuşta biri yalnız uçuyor — ve kartında kullanılmayan bir misafir " +
    "hakkı duruyor. LoungeLink ikisini aynı salonda buluşturur: aynı uçuşta, " +
    "aynı salonda, kalkıştan önce. Ağırlayan da kazanır: bir kez ağırla, " +
    "hakkın olmayan bir salonda sen misafir ol.",
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
  // 🔴 26 AĞUSTOS — ÇERÇEVE DEĞİŞTİ. Gökberk krediyi para karşılığı satma
  // kararı verdi. "Teminat" çerçevesi o gün YALAN olur: satılan bir şey
  // teminat değildir ve "gelir elde etmeyiz" cümlesi de doğru kalmaz.
  //
  // Savunmayı ayakta tutan tek çerçeve: KREDİ ERİŞİMİ DEĞİL, İSTEME HAKKINI
  // satın alır. Ve bunun kelime oyunu olmaması için üçünün de GERÇEK olması
  // gerekiyor — üçü de artık gerçek:
  //   1. Host reddedebilir                  → respond_request
  //   2. Yanıtsız kalırsa iade              → SQL 249 (72 saat)
  //   3. KAPIDA ALINMAZSAN İADE             → SQL 256 (bu turda eklendi)
  //
  // 🆕 SINIF: "BİR ŞEYİ 'SATMIYORUZ' DİYE SAVUNMAK, O ŞEY GERÇEKLEŞMEDİĞİNDE
  // PARAYI GERİ VERMEYİ GEREKTİRİR — YOKSA SATMIŞSINDIR."
  creditFrame:
    "Kredi, bir host'a istek gönderme hakkıdır — erişim değil. Host " +
    "reddedebilir; kimse yanıtlamazsa iade edilir; kapıda alınmazsan yine " +
    "iade edilir. Kredi satın alınabilir, ama satın aldığın şey giriş değil " +
    "sorma hakkıdır.",
  footerSlogan: "Aktarma uçuşları bağlar. Biz yolcuları.",
  closing: "Salon zaten senin.",
  closingEm: "Şimdi deneyimi paylaş.",
  email: "merhaba@loungelink.co",
  betaCta: "Beta'ya katıl",
};

// 3 adımda akış — sıra gerçek bir süreç olduğu için numaralı.
// 🔴 v0.17 — 02. adım ürünün EN TEMEL kuralını söylemiyordu:
// misafirin de aynı havayolu firmasında olması şart (sql/177 md.41-47,
// guest_must_match_carrier). Eşleşmenin ilk süzgeci bu; akış
// anlatısında geçmemesi, ürünün nasıl çalıştığını eksik anlatmaktı.
export const FLOW = [
  { n: "01", t: "Uçuşunu yaz", d: "Havalimanı, tarih, uçuş numarası. Host'san ilanını aç; misafirsen seyahatini ekle." },
  { n: "02", t: "Eşleşmeni bul", d: "Aynı uçuştakiler en üstte. Misafirin de aynı havayolu firmasıyla uçuyor olmalı — kural motoru bunu eşleşmeden önce kontrol ediyor. Her kartta kural rozeti: misafir hakkı var mı, ücretli mi, aynı uçuş şartı var mı — başvurmadan görürsün." },
  // 🔴 v0.18 — "kredi escrow'da bekler" cümlesi tek başına bir BEDEL
  // izlenimi veriyordu. Kredinin ne olduğu, ne olmadığından önce gelir.
  { n: "03", t: "Lounge'da buluş", d: "Giriş buluşmadan önce teyit edilir. Kapıda alınmazsan kredin iade edilir — bunu bize söyle, kural kaydımızı düzeltelim. Kalan her şey iki yolcunun sohbeti." },
];

// Ekran şeritleri — ÜRÜNÜN KAYNAĞINDAN ÜRETİLMİŞ render'lar (v3.3.2).
//
// 🔴 BURADA ÖNCEDEN "GERÇEK cihaz görüntüleri (12 Ağu beta build'i)"
// yazıyordu ve o cümle 16 Ağustos'tan beri YANLIŞTI: görseller
// gerçekten cihazdandı, ama ürün o günden beri fotoğraflı bant, sıcak
// palet, yeni düğme sistemi ve koyu tema kazandı. "Gerçek" olması
// GÜNCEL olmasını sağlamıyor.
//
// Şimdiki görseller `rnapp/ekran_uret.py` ile ürünün kendi kaynağından
// üretiliyor (renk theme.js · geometri ui.js · metin i18n.js), yani
// ürün değiştiğinde onlar da değişiyor. Cihazın kendisi DEĞİLLER;
// public/screens/SURUM.json bunu `tur: "render"` diye kayda geçiriyor.
//
// ⚠ Ölçüler 480×1039 — 1170×2532 (iPhone 14) oranı. Eskiden 480×1027
// ve 460×942 karışıktı; ikisi de gerçek orana uymuyordu ve tarayıcı
// görselleri hafifçe eziyordu.

// v0.4 — hero rafı: ürünün ANLATISINI taşıyan beş ekran.
// Sıra bilinçli: keşif → kural kararı → sohbet → oturum → profil.
// Ziyaretçi rafı soldan sağa okuyunca akışın tamamını görür.
export const SHELF = [
  { src: "/screens/ss-kesfet.jpg", tag: "Keşfet",
    soz: "Kartına ve seyahatine uyan açık slotlar — her ilanın üstünde kural rozeti.",
    alt: "Keşfet — kural rozetli ilanlar", w: 480, h: 1039 },
  { src: "/screens/ss-n.jpg", tag: "Kural kararı",
    soz: "Motor kartı okur, dört şartı tek tek işaretler. Cevabı kapıda değil burada alırsın.",
    alt: "İstek gönder — kural motorunun kararı", w: 480, h: 1039 },
  { src: "/screens/ss-eslesme.jpg", tag: "Eşleşme",
    soz: "Host kabul ettiği anda sohbet açılır. Buluşmayı siz planlarsınız.",
    alt: "Eşleştiniz — sohbet açıldı", w: 480, h: 1039 },
  { src: "/screens/ss-m.jpg", tag: "Sohbet",
    soz: "Hazır durum çipleriyle koordinasyon: “güvenlikteyim”, “salon girişindeyim”.",
    alt: "Sohbet — oturum öncesi koordinasyon", w: 480, h: 1039 },
  { src: "/screens/ss-oturum.jpg", tag: "Oturum",
    soz: "Salon, uçuş, süre ve kredi tek ekranda. Oturumu ikiniz de görürsünüz.",
    alt: "Oturum · canlı durum", w: 480, h: 1039 },
  { src: "/screens/ss-puanla.jpg", tag: "Puan",
    soz: "Oturum biter, puan verilir, LoungePuan yazılır — güven döngüsü kapanır.",
    alt: "Oturum tamamlandı — puanlama", w: 480, h: 1039 },
  { src: "/screens/ss-home2.jpg", tag: "Host paneli",
    soz: "Kaç kişi ağırladın, kaç hakkın kaldı, sıradaki kademeye ne kadar var.",
    alt: "Ana sayfa — host paneli", w: 480, h: 1039 },
];

export const SHOTS_MAIN = [
  { src: "/screens/ss-home.jpg", alt: "LoungeLink ana ekran — host paneli", w: 480, h: 1039 },
  { src: "/screens/ss-kesfet.jpg", alt: "Keşfet — kural rozetli ilan listesi", w: 480, h: 1039 },
  { src: "/screens/ss-tanis.jpg", alt: "Tanış — havalimanı yol arkadaşı ağı", w: 480, h: 1039 },
];
export const SHOTS_TRUST = [
  { src: "/screens/ss-baglanti.jpg", alt: "Bağlantılar — karşılıklı onaylı", w: 480, h: 1039 },
  { src: "/screens/ss-seyahat.jpg", alt: "Seyahatlerim — salon rehberiyle", w: 480, h: 1039 },
  { src: "/screens/ss-splash.jpg", alt: "LoungeLink açılış — önce güven", w: 480, h: 1039 },
  { src: "/screens/ss-koyu.jpg", alt: "Keşfet — koyu tema", w: 480, h: 1039 },
];

// Kural motoru program kartları — rakipte 4 genel ittifak kartı var;
// bizde her kart GERÇEK kural verisinden konuşur. Derinlik farkımız.
// ════════════════════════════════════════════════════════════════════
// KURAL MOTORU KARTLARI — v0.38
//
// 🔴 ESKİ HÂLİ DOĞRUYDU AMA OKUNMUYORDU. Her kart 40–60 kelimelik tek
// bir paragraftı; içinde madde numarası, istisna ve gerekçe iç içeydi.
// Doğru bilgi, okunmadığı sürece bilgi değil.
//
// Rakibin (Lounge Surf) kartları üç parçalı: AD · italik tek cümlelik
// karakter · iki kısa cümle · etiket çipi. Biçim iyi. İÇERİĞİ ise
// yanlış — üç üyeliği "no airline restrictions" diye tek kutuya
// koyuyor, oysa DragonPass misafirin AYNI UÇUŞTA olmasını şart koşuyor
// (md.7.15.7). Biçimi alıyoruz, hatayı almıyoruz.
//
// 🔴 EN ÖNEMLİ DEĞİŞİKLİK: "Priority Pass · DragonPass" TEK KARTTI,
// ARTIK İKİ AYRI KART. Farkı anlatan bir cümle yazmak yetmiyordu;
// ikisini yan yana AYRI kutularda göstermek, farkı okumadan da
// gösteriyor. Rakibin sildiği ayrım, bizim vitrinimizin şekli oluyor.
//
// 🆕 SINIF: "BİR FARKI CÜMLEYLE ANLATABİLİRSİN AMA DÜZENLE
// GÖSTEREBİLİRSİN — İKİNCİSİ OKUNMADAN ÇALIŞIR."
//
// `alt`: italik tek cümle — kartın karakteri.
// `d`  : iki kısa cümle, en fazla. Madde numarası yalnız gerçekten
//        ayırt edici olduğunda (DragonPass) kalıyor.
// ════════════════════════════════════════════════════════════════════
export const PROGRAMS = [
  { t: "Miles&Smiles", tag: "Kart tipi", alt: "Kart tipine göre değişir.",
    d: "Elite ve Elite Plus, her uçuşta ailesini ya da bir misafirini yanına alabilir. Classic Plus iç hatta yalnız kendisi girer." },

  { t: "Star Alliance Gold", tag: "Aynı uçuş", alt: "Aynı uçakta olmanız gerekiyor.",
    d: "Gold üyesinin misafiri 2021'den beri aynı uçakta olmak zorunda. Başka bir havayoluyla uçuyorsan aile hakkı düşüyor — çoğu yolcu bunu kapıda öğreniyor." },

  { t: "Priority Pass", tag: "Her havayolu", alt: "Havayolu şartı yok.",
    d: "Priority Pass'te havayolu şartı yok — aynı terminaldeysen eşleşirsin. Misafir ücretlidir; tutar kartını verene göre değişir." },

  // Bu kartın komşusu Priority Pass olmalı: fark ancak yan yana görünür.
  { t: "DragonPass", tag: "Aynı uçuş", alt: "Priority Pass'e benzemez.",
    d: "DragonPass'te misafirin seninle AYNI UÇUŞTA olmalı (md. 7.15.7). Üçünü tek kutuya koyan siteler var; biz koymuyoruz — çünkü kapıda tek kutu yok." },

  { t: "LoungeKey", tag: "Her havayolu", alt: "Priority Pass ile aynı aile.",
    d: "Havayolu ve kabin fark etmez. Misafirin kendi biniş kartı gerekiyor; ücret kartını verene göre değişir." },

  { t: "Business bileti", tag: "Misafir yok", alt: "Seni sokar, misafirini sokmaz.",
    d: "Business bileti seni salona sokar ama misafir hakkı vermez — o hak bilete değil, statü kartına bağlı." },

  { t: "Primeclass · iGA · Plaza Premium", tag: "Kapı satışı", alt: "Kapalı değil, ücretli.",
    d: "Bunlar üyelik değil, salonun kendi kapı satışı. Misafirin de tıpkı senin gibi girebilir — aynı tarifeden." },

  { t: "Pegasus", tag: "Ücretli giriş", alt: "Statüyle gelen ücretsiz hak yok.",
    d: "Biniş kartıyla indirimli giriş var; kartının programı da (Priority Pass, DragonPass, banka kartı) o salonu açabiliyor. Hangi yolun açık olduğunu uygulamada görürsün." },

  { t: "Banka & Amex kartları", tag: "Kartına özel", alt: "Cevap kartını verene bağlı.",
    d: "Banka ve Amex kartlarının lounge hakkı kartı verene göre değişir. Uygulamada kendi kartını seçiyorsun, cevabı ona göre veriyoruz." },
];


// Güven kartları — hepsi app'te GERÇEKTEN var olan mekanizmalar.
// 🔴 v0.8 — LS KART GRAMERİ: ikon çipi + SORU/vaat başlığı (3-5 kelime)
// + iki satır gövde ve gövdede MUTLAKA bir somut insani ayrıntı.
// LS'in en güçlü hamlesi buydu: "I'm at gate B12, blue jacket." Bir
// cümlelik detay soyut özelliği yaşanmış ana çeviriyor. Genel cümle yasak.
export const TRUST = [
  { i: "✓", t: "Kiminle buluştuğunu bil",
    d: "Profil, güven puanı ve geçmiş oturumlar başvurmadan önce açık. \"Elif K. · doğrulanmış · 12 oturum\" — sürpriz yok." },
  { i: "◆", t: "Kredi erişimi değil, sormayı satın alır",
    d: "İstek gönderirken 1 kredi ayrılır. Host reddederse aynı saniye geri döner; kimse yanıtlamazsa 72 saat içinde geri döner; kapıda alınmazsan yine geri döner. Ödediğin şey giriş değil, sorma hakkı — ve sorman karşılıksız kalırsa parası sende kalır." },
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
    // 🔴 v0.28 — BAŞLIK BİR KAYIP ANLATIYORDU, KAZANÇ ANLATMIYORDU.
    // "Siliniyor ya da bir tanışmaya dönüşüyor" — ikinci yarısı zayıf:
    // tanışmak bir vaat değil, bir temenni. Ürünün gerçekten verdiği
    // şey ölçülebilir ve çok daha güçlü: 1 ağırlama = 1 kredi (SQL 246)
    // (SQL 206:81 + 007:52).
    title: "O misafir hakkı yıl sonunda siliniyor. Ya da sana bir kapı açıyor.",
    body:
      "Elite Plus kartında her yıl kullanılmayan misafir hakları var. Havayolu onları " +
      "geri almıyor, sen de kullanmıyorsun — sessizce kayboluyorlar. LoungeLink o hakkı " +
      "yanındaki koltuğa çevirir: kiminle, hangi saatte ve kime görünür şekilde " +
      "paylaşacağına tamamen sen karar verirsin. Karşılığında bu yıl kullandığın " +
      "bir hak, hakkın olmayan bir salonda bir misafir isteğine dönüşür.",
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
  // 🔴 v0.28 — BU CEVAP SİTENİN EN ZAYIF CÜMLESİYDİ.
  // Eski hâli iki şey sayıyordu: "kullanılmayan hak" ve "tanışmak".
  // İkisi de host'a HİÇBİR ŞEY VERMİYOR — biri kaybı hatırlatıyor,
  // diğeri bir temenni. Oysa ürün ağırlayana üç somut şey ödüyor ve
  // üçü de kodda yazılı (SQL 206, 007, i18n 677). Site onları hiç
  // söylememişti. Gökberk'in cümlesiyle: "ben bir host olsam tek
  // işlevim içeri birini almak mı olacak diye düşünürüm."
  {
    q: "Host neden birini içeri alsın?",
    a:
      "Üç sebep var ve üçü de somut. Bir: kullanılmayan hak yıl sonunda siliniyor — " +
      "yılda 12 hakkınız varsa ve 3'ünü kullandıysanız 9'u yanıyor. İki: her " +
      "tamamlanan oturum size 1 kredi bırakıyor ve bir misafir isteği 1 kredi; " +
      "yani bir kez ağırladığınızda, hakkınızın olmadığı bir salonda bir kez siz " +
      "misafir olabiliyorsunuz. Üç: oturum başına 500 LoungePuan — mağazada eSIM, " +
      "seyahat sigortası, otel kredisi ve mile dönüşüyor. Üstüne ağırladıkça " +
      "basamak çıkıyorsunuz: Konsiyerj seviyesinde kendi isteklerinizin kredisi de " +
      "kalkıyor.",
  },
  {
    q: "Puanlarla ne alabiliyorum?",
    a:
      "Mağazada dokuz ödül var ve hepsi seyahatte işinize yarayan şeyler: Airalo " +
      "eSIM, Booking.com ve Marriott Bonvoy otel kredisi, Türk Hava Yolları mili, " +
      "Amazon hediye kartı, havalimanı kahvesi. En düşüğü 500 puan — yani bir " +
      "ağırlama. Bu markalarla imzalanmış bir ortaklığımız yok; ödüller bizim " +
      "satın alıp size verdiğimiz kalemler.",
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
      "Planlar beta boyunca ücretsiz. Kredi paketleri ücretlidir ve satın " +
      "aldığın şey ERİŞİM DEĞİL, bir host'a istek gönderme hakkıdır. Host " +
      "reddederse, kimse yanıtlamazsa ya da kapıda alınmazsan kredin iade " +
      "edilir — yani karşılıksız kalan bir istek için para ödemezsin.",
  },
  // 🔴 v0.18 — SİTE KENDİ KENDİSİYLE ÇELİŞİYORDU: bir yerde "erişim
  // hakkının devri yasaktır", başka yerde kredi host'a "teşekkür"
  // diye anlatılıyordu. Soruyu kendimiz sorup açıkça cevaplıyoruz;
  // sorulmadan cevaplanan itiraz, sorulduğunda cevaplanandan güçlüdür.
  {
    q: "Kredi host'a ödenen bir bedel mi?",
    a:
      "Hayır. Kredi host'a gitmez — host krediden tek kuruş almaz. Kredi, " +
      "LoungeLink'e bir istek gönderme hakkı için ödenir; erişim için değil. " +
      "Lounge erişimi ödül kataloğunda da yer almaz. " +
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
  // 🔴 21 AĞUSTOS — BU KART SİTENİN EN ZAYIF CÜMLESİYDİ.
  // Gökberk: "ben bir host olsam tek işlevim içeri birini almak mı
  // olacak diye düşünürüm." Haklıydı: dört kartın üçü SAVUNMAYDI
  // (hakkın var / seçersin / riskin yok) ve dördüncüsü kazancı
  // "LoungePuan kazandırır" diye geçiştiriyordu. Bir sayı yoktu.
  //
  // Sayılar kodda vardı, sitede yoktu — ölçüldü:
  //   SQL 206:81  host_credit_per_session = 3
  //   SQL 007:52  request_hold            = -1
  //   → BİR KEZ AĞIRLA, ÜÇ KEZ MİSAFİR OL.
  // 🆕 SINIF: "ÜRÜNÜN EN İYİ CÜMLESİ ÇOĞU ZAMAN PAZARLAMA
  // TOPLANTISINDA DEĞİL, VERİTABANINDA YAZILIDIR."
  { i: "⬡", t: "Bir kez ağırla, bir kez misafir ol",
    d: "Tamamlanan her oturum 1 kredi bırakıyor; bir misafir isteği 1 kredi. İstanbul'da paylaştığın koltuk, hakkın olmayan bir salonda sana bir kapı açıyor. Ağırlamak tek yönlü bir iyilik değil — cüzdanına giren bir şey." },
  { i: "★", t: "Yolda işine yarayan ödüller",
    d: "Oturum başına 500 LoungePuan (misafirin 200'ünü alıyor, ağırlayan iki buçuk katını). Mağazada eSIM, otel kredisi ve mil oluyor — 500 puandan başlıyor. Lounge erişimi ödül olarak verilmez: hak paylaşımı takasa dönüşmesin diye." },
  // Basamaklar UYDURULMADI: SQL 206_host_motoru.sql:393 `host_tiers`
  // tablosu + 207:415-420 güncellemeleri. Sıralama artışı (+5/+12/+25),
  // 24 saat öne çıkma ve "istek bedava" gerçek kolonlar.
  // 🔴 207'nin kendi yorumu "ekstra slot sözünü tutmamalıydım" diyor ve
  // o sözü geri çekmiş; siteye de o yüzden yazılmıyor. Söz verilen tek
  // şey, kodun verebildiği şey.
  // ⚠️ İlk yazımda buraya "◈" koydum ve sitenin kendi nöbetçisi
  // yakaladı: U+25C8 marka sembolü, metinde kullanılamaz (/mark.svg
  // var). Nöbetçi işliyor — düzeltildi.
  { i: "▲", t: "Ağırladıkça basamak çıkıyorsun",
    d: "Yolcu → Ev Sahibi (1 ağırlama) → Kâhya (5) → Konsiyerj (15). Her basamak keşifte üst sıra, Kâhya'dan itibaren her yeni ilanın 24 saat öne çıkma. Konsiyerj'de kendi misafir isteklerin artık kredi harcamıyor — yani sınırsız misafir olma hakkı." },
];

// Host'un aklındaki asıl soru "riski ne?" — cevabı tek tek veriyoruz.
export const HOST_RISK = [
  // 🔴 v0.18 — "kredi sende kalır" cümlesi host'u gelmeyen misafirden
  // KAZANÇLI çıkarıyordu; bu, çerçeveyi bozar. Kredi ceza değildir:
  // oturum başlamazsa iade edilir, sonuç güven puanına yazılır.
  //
  // 🔴 26 AĞUSTOS — "TEMİNAT" KELİMESİ BURADA KALMIŞTI. Sayfanın geri
  // kalanı v0.35'te yeni çerçeveye geçti ("kredi erişim değil, SORMA
  // HAKKI satın alır") ama bu tek cevap eski kelimeyi taşıyordu.
  // Kredi para karşılığı satıldığı andan itibaren "teminat" demek
  // hukuken de yanlış: teminat geri verilmek üzere alınır, kredi ise
  // tamamlanan oturumda harcanır. Aynı sayfada iki farklı hukuki
  // niteleme bulunması, sözleşme metinlerini de tartışmalı hale getirir.
  // 🆕 SINIF: "BİR ÇERÇEVEYİ DEĞİŞTİRİRKEN EN KOLAY UNUTULAN YER,
  // O ÇERÇEVEYİ ANLATAN BAŞLIKLAR DEĞİL, SORU-CEVAPLARDIR."
  { q: "Ya gelmezse?", a: "Oturum iki taraflı onayla başlar. Karşı taraf gelmezse oturum hiç başlamaz: kredin iade edilir ve gelmeyen tarafın güven puanına yazılır." },
  { q: "Ya kural yanlış çıkarsa?", a: "Kural motoru kartını, salonu ve uçuşunu birlikte okur; resmî tabloların dışına çıkmaz. Emin olmadığı yerde tahmin yürütmez, açıkça söyler." },
  { q: "Ya rahatsız edici biri olursa?", a: "Her profilde rapor ve engelleme var, sohbette acil durum düğmesi. Rahatsız eden topluluktan çıkar; açıklama yapmak zorunda değilsin." },
  { q: "Kaç kişi alabilirim?", a: "Kartının izin verdiği kadar — bunu sen hesaplamıyorsun, motor söylüyor. Aile hakkın varsa onu da ayrıca gösteriyoruz." },
];
