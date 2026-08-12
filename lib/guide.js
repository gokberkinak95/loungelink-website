// ============================================================
// LoungeLink · Salon Rehberi verisi (site sürümü)
//
// 🔴 NEDEN SİTEDE AYRI BİR KOPYA
// Site tanıtım amaçlı; canlı veritabanına bağlanmıyor ve
// bağlanmamalı (anahtar sızdırmak, ücret ödemek, çökme riski).
// Buradaki veri app'in kural motorundan ÜRETİLİR ve statik yayınlanır.
//
// 🔴 BU SAYFALAR SİTENİN ASIL DEĞERİ.
// "IST Elite Plus misafir" araması ayda yüzlerce kez yapılıyor ve
// doğru cevabı veren Türkçe sayfa YOK. Rakibin sitesinde tek bir
// aranabilir sayfa bile yok — hepsi tek sayfada gömülü.
// Her kart × havalimanı kombinasyonu bir URL demek.
//
// ⚠️ Değerler 146/147 numaralı SQL dosyalarındaki resmî matristen
// alınmıştır. Kural değişirse ORASI güncellenir, sonra buraya taşınır.
// Tek yönlü akış: kural motoru → site. Asla tersi.
// ============================================================

export const AIRPORTS = {
  IST: { name: "İstanbul Havalimanı", city: "İstanbul" },
  SAW: { name: "Sabiha Gökçen Havalimanı", city: "İstanbul" },
};

export const CARDS = {
  "elite-plus": {
    label: "Miles&Smiles Elite Plus",
    short: "Elite Plus",
    program: "Turkish Airlines Miles&Smiles",
  },
  elite: { label: "Miles&Smiles Elite", short: "Elite", program: "Turkish Airlines Miles&Smiles" },
  "classic-plus": { label: "Miles&Smiles Classic Plus", short: "Classic Plus", program: "Turkish Airlines Miles&Smiles" },
  classic: { label: "Miles&Smiles Classic", short: "Classic", program: "Turkish Airlines Miles&Smiles" },
  "star-alliance-gold": { label: "Star Alliance Gold", short: "Star Gold", program: "Star Alliance" },
  "priority-pass": { label: "Priority Pass", short: "Priority Pass", program: "Priority Pass" },
};

// verdict: yes | self_only | paid | no
export const ENTRIES = [
  {
    card: "elite-plus", airport: "IST",
    verdict: "yes",
    headline: "Ailenizi veya bir misafirinizi götürebilirsiniz",
    detail:
      "THY seferinde seyahat ediyorsanız Turkish Airlines Lounge'a aileniz " +
      "(eş ve 25 yaşından gün almamış çocuklar) veya bir misafirle girebilirsiniz.",
    warning:
      "Star Alliance üyesi BAŞKA bir havayoluyla uçuyorsanız aile hakkınız yoktur — " +
      "yalnız bir misafir. Bu ayrım çok sık atlanıyor.",
    extra:
      "İstanbul dış hatlarda salon iki bölümdür. Business bölümünde kimsenin misafir " +
      "hakkı yoktur; misafirinizle girmek istiyorsanız Miles&Smiles bölümüne gitmelisiniz.",
  },
  {
    card: "elite", airport: "IST",
    verdict: "yes",
    headline: "Elite, Elite Plus ile aynı haktadır",
    detail:
      "Resmî tabloda Elite ve Elite Plus aynı satırdadır: THY seferinde aile veya bir misafir. " +
      "Aradaki fark misafir hakkında değil, diğer ayrıcalıklardadır.",
    warning:
      "Star Alliance üyesi başka bir havayolunda aile hakkı düşer, yalnız bir misafir kalır.",
  },
  {
    card: "classic-plus", airport: "IST",
    verdict: "self_only",
    headline: "İç hatta girersiniz; dış hatta hakkınız tanımlı değil",
    detail:
      "Classic Plus İÇ HAT salonlarına ücretsiz girer; misafir ve aile hakkı YOKTUR. " +
      "Yanınızdaki 3-12 yaş aile çocuğu için ücretin %50'si alınır. " +
      "DIŞ HAT salonlarında ise Classic Plus resmî kart listelerinde (Tablo-2 ve " +
      "İstanbul dış hat Miles&Smiles bölümü) yer almaz — tanımlı bir giriş hakkı yoktur.",
    warning:
      "AJet seferinde Classic Plus ÜCRET ÖDER — THY seferinden farklıdır. " +
      "Ayrıca AJet'in salon listesinde İstanbul yoktur.",
  },
  {
    card: "classic", airport: "IST",
    verdict: "paid",
    headline: "Ücret ödeyerek girersiniz, misafir hakkınız yok",
    detail:
      "Classic kartın ücretsiz giriş hakkı yoktur. İstanbul Havalimanı iç hat " +
      "salonunda ücretli giriş mümkündür. 0-2 yaş bebekten ücret alınmaz.",
  },
  {
    card: "star-alliance-gold", airport: "IST",
    verdict: "yes",
    headline: "Bir misafir götürebilirsiniz",
    detail: "Star Alliance Gold statüsü bir misafir hakkı verir. Aile hakkı yoktur.",
    warning:
      "3 Mayıs 2021'den beri misafirin SİZİNLE AYNI UÇAKTA olması zorunludur. " +
      "Eskiden aynı gün aynı salon yeterliydi; bu kural değişti.",
  },
  {
    card: "priority-pass", airport: "IST",
    verdict: "paid",
    headline: "Kendiniz girersiniz, misafir genelde ücretlidir",
    detail:
      "Priority Pass İstanbul'da iGA Lounge gibi salonlarda geçerlidir. " +
      "Misafir hakkı üyelik seviyenize bağlıdır ve çoğu seviyede ücretlidir; " +
      "ücret sizin kartınızdan çekilir.",
    warning:
      "Priority Pass Turkish Airlines Lounge'da GEÇMEZ. İki farklı salon, iki farklı kural.",
  },
  {
    card: "priority-pass", airport: "SAW",
    verdict: "paid",
    headline: "Sabiha Gökçen'de birkaç salonda geçerlidir",
    detail:
      "Plaza Premium ve Kepler Club gibi salonlarda kabul edilir. " +
      "İç hat ve dış hat listeleri FARKLIDIR — gideceğiniz terminale göre kontrol edin.",
  },
];

export const slugOf = (e) => `${e.card}-${e.airport.toLowerCase()}`;
export const allSlugs = () => ENTRIES.map(slugOf);
export const findEntry = (slug) => ENTRIES.find((e) => slugOf(e) === slug);
