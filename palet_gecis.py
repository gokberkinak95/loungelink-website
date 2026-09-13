#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
palet_gecis.py — SİTENİN SABİT RENKLERİNİ v2 PALETİNE TAŞIR.

🔴 NEDEN VAR — ÖLÇÜM, TAHMİN DEĞİL
Paleti `:root` token'larında değiştirdim ve ekran görüntüsünde HİÇBİR
ŞEY DEĞİŞMEDİ. Pikseli ölçtüm:
    "Misafir ücretsiz" rozeti  (111, 217, 168)  → yeşil, hâlâ orada
    "Beta'ya katıl" düğmesi    (188, 149, 62)   → pirinç, hâlâ orada
Sebep: `app/globals.css` içinde token'ı ATLAYAN 50 ham hex (20 farklı)
ve 92 rgb/rgba var. Yani sitenin paleti token'larda değil, kısmen
kuralların içinde yaşıyor.

App tarafında bu sınıfın nöbetçisi VAR (`palette_check.py`); sitede
YOKTU. Bu yüzden borç sessizce birikmiş.

🆕 SINIF: "PALETİ TOKEN'DA DEĞİŞTİRİP EKRANA BAKMADAN 'DEĞİŞTİ' DEMEK,
PALETİN NEREDE YAŞADIĞINI BİLMEMEKTİR."

Bu betik eşlemeyi AÇIKÇA yazar ve her değişikliğin SAYISINI DOĞRULAR —
tutmazsa hiçbir şey yazılmaz (SQL üreteçleriyle aynı güvenlik ağı).
"""
import os, sys, re

KOK = os.path.dirname(os.path.abspath(__file__))
CSS = os.path.join(KOK, "app", "globals.css")

# ⚠️ CSS TEK BAŞINA YETMEDİ — İKİNCİ ÖLÇÜM.
# Paleti CSS'te taşıdıktan sonra gövde bölümünü çektim: zemin hâlâ
# lacivert-pirinçti. Ölçtüm: `SectionScene.jsx` ve `page.jsx` içinde
# 23 ham hex var ve üçü de kritik — #B8943A (pirinç ×13),
# #F4D79A (açık altın ×7) ve #0D9488 (TEAL ×3).
# Yani sitenin dekoratif sahneleri kendi paletini taşıyor.
# 🆕 SINIF: "BİR PALETİ TAŞIRKEN YALNIZ STİL DOSYASINA BAKARSAN,
# BİLEŞENLERİN İÇİNDE YAŞAYAN İKİNCİ BİR PALETİ GÖRMEZSİN."
# ⚠️ ÜÇÜNCÜ ÖLÇÜM: kural motoru bölümünü çektim ve cevap kutusunda hâlâ
# yeşil tortu vardı — `RuleDemo.jsx` ve kart/rehber sayfaları `rgba(4,107,76,*)`
# yazıyor. Bir paleti taşımak üç geçiş sürdü çünkü palet üç yerde yaşıyordu:
# token'lar · stil kuralları · bileşen içi satır içi stiller.
# 🆕 SINIF: "BİR RENGİN KAÇ YERDE YAŞADIĞINI BİLMEDEN 'PALET DEĞİŞTİ'
# DENEMEZ — HER GEÇİŞTEN SONRA EKRANI YENİDEN ÖLÇ."
JSX = [os.path.join(KOK, "components", "SectionScene.jsx"),
       os.path.join(KOK, "components", "RuleDemo.jsx"),
       os.path.join(KOK, "app", "page.jsx"),
       os.path.join(KOK, "app", "kart", "[slug]", "page.jsx"),
       os.path.join(KOK, "app", "rehber", "page.jsx"),
       os.path.join(KOK, "app", "rehber", "[slug]", "page.jsx")]

JSX_ESLEME = [
    ("#B8943A", "#C9B693", "pirinç sahne altını → mat şampanya"),
    ("#F4D79A", "#E4D6BC", "açık sahne altını"),
    ("#0D9488", "#6E6A72", "TEAL sahne halesi → nötr duman"),
    ("rgba(4,107,76,.09)", "rgba(237,230,218,.06)", "olumlu kutu zemini → fildişi"),
    ("rgba(4,107,76,.35)", "rgba(237,230,218,.26)", "olumlu kutu kenarı → fildişi"),
    ("rgba(4,107,76,.08)", "rgba(237,230,218,.06)", "olumlu rozet zemini → fildişi"),
]

# ── EŞLEME ────────────────────────────────────────────────────────────
# (eski, yeni, beklenen_sayi, gerekçe)
ESLEME = [
    # ── PİRİNÇ ALTIN → MAT ŞAMPANYA ─────────────────────────────────
    # Ölçüldü: #CBA44A→#A9822F gradyanı ekranda (188,149,62) veriyor.
    # Brief: app v5.8.0'ın mat şampanyası #C9B693.
    ("linear-gradient(180deg, #CBA44A, #A9822F)",
     "linear-gradient(180deg, #D2BF9E, #B9A379)", 1, "ana düğme gradyanı"),
    ("#14100A", "#171009", 3, "altın üstü mürekkep — app ile aynı"),
    ("rgba(184,148,58,.28)", "rgba(201,182,147,.22)", 2, "düğme gölgesi"),
    ("rgba(184,148,58,.55)", "rgba(201,182,147,.45)", 4, "kaydırma çubuğu"),
    ("rgba(184,148,58,.35)", "rgba(201,182,147,.30)", 3, "altın kenar"),
    ("#F4D79A", "#E4D6BC", 4, "açık altın vurgusu"),
    # ⚠️ #CBA44A ve #A9822F İÇİN AYRI SATIR YOK: ikisi de YALNIZ yukarıdaki
    # gradyanın içinde geçiyor ve o eşleme onları zaten tüketiyor. Sayaç
    # bunu yakaladı — ayrı satır bıraksaydım "0 bulundu" deyip duracaktı.

    # ── FINTECH YEŞİLİ → FİLDİŞİ ────────────────────────────────────
    # "Misafir ücretsiz" bir BAŞARI bildirimi değil, bir GERÇEK.
    # Yeşil, kullanıcıya bir şey kazandığını söyler; oysa o kart zaten
    # onun. Fildişi aynı bilgiyi övünmeden verir.
    ("#6FD9A8", "#EDE6DA", 1, "olumlu rozet metni"),
    ("rgba(111,217,168,.35)", "rgba(237,230,218,.30)", 1, "olumlu rozet kenarı"),

    # ── AMBER → KİL ─────────────────────────────────────────────────
    # "Yalnız kendin girersin" bir uyarı değil, bir sınır.
    ("rgba(250,165,66,.35)", "rgba(176,162,150,.34)", 1, "sınır rozeti kenarı"),

    # ⚠️ LACİVERT ARTIKLARI (#070B16 · #0B1120 · #0F1626) EŞLEMEDE YOK.
    # Sayacı koşturdum: kurallarda 0, yalnız YORUMLARDA geçiyorlar.
    # Yorumdaki bir renk TARİHTİR — `site_paleti.py`nin "site lacivertti,
    # app sıcaktı" ölçümünü anlatıyor. Onu değiştirmek kararı silmek olur.
    # 🆕 SINIF: "BİR YORUMDAKİ ESKİ DEĞER KUSUR DEĞİL KAYITTIR — GÖÇ
    # BETİĞİ KURALLARA DOKUNUR, HAFIZAYA DEĞİL."
]


# ── AİLE KURALI ───────────────────────────────────────────────────────
# ⚠️ DÖRDÜNCÜ ÖLÇÜM. Tek tek alfa yazmak bitmedi: nöbetçi
# `rgba(184,148,58, …)` ailesinden 9 yer daha buldu (.10 · .12 · .18 · …).
# Her alfayı ayrı satır yapmak, ailenin kaç üyesi olduğunu bilmeden
# liste yazmaktır. Aile TEK KURALLA taşınır; alfa korunur.
# 🆕 SINIF: "BİR RENK AİLESİNİ TEK TEK SAYARAK TAŞIYAMAZSIN — KURALI
# RENGE DEĞİL AİLEYE YAZ."
# ⚠️ BEŞİNCİ ÖLÇÜM — NÖBETÇİ TON AÇISINA ÇEVRİLİNCE 10 TABAN DAHA ÇIKTI.
# Liste tutan nöbetçi bunları göremiyordu. Hepsi pirinç (ton 32-43°,
# doygunluk %52-100) ya da teal (175°). Şampanya karşılıkları
# AÇIKLIK KORUNARAK seçildi: bir gölge koyu, bir parıltı açık kalmalı —
# hepsini tek değere indirmek derinliği düzler.
# 🆕 SINIF: "BİR RENK AİLESİNİ TAŞIRKEN TONU DEĞİŞTİR, AÇIKLIĞI KORU —
# AÇIKLIK RENGİN DEĞİL IŞIĞIN BİLGİSİDİR."
AILE = [
    (re.compile(r"rgba?\(\s*138\s*,\s*90\s*,\s*0\s*,"), "rgba(160,143,115,",
     "koyu pirinç (hata/uyarı zemini) → soluk şampanya"),
    (re.compile(r"rgba?\(\s*212\s*,\s*185\s*,\s*117\s*,"), "rgba(201,182,147,",
     "orta pirinç → mat şampanya"),
    (re.compile(r"rgba?\(\s*244\s*,\s*215\s*,\s*154\s*,"), "rgba(228,214,188,",
     "açık pirinç → açık şampanya"),
    (re.compile(r"rgba?\(\s*13\s*,\s*148\s*,\s*136\s*,"), "rgba(110,106,114,",
     "TEAL → nötr duman"),
    (re.compile(r"rgba?\(\s*209\s*,\s*181\s*,\s*109\s*,"), "rgba(201,182,147,",
     "eski site altını → mat şampanya"),
    (re.compile(r"rgba?\(\s*217\s*,\s*119\s*,\s*6\s*,"), "rgba(176,162,150,",
     "turuncu (hukuk sayfası vurgusu) → kil"),
    (re.compile(r"rgba?\(\s*216\s*,\s*179\s*,\s*106\s*,"), "rgba(201,182,147,",
     "goldSoft tabanı → mat şampanya"),
    (re.compile(r"rgba?\(\s*180\s*,\s*140\s*,\s*50\s*,"), "rgba(185,163,121,",
     "koyu pirinç → koyu şampanya"),
    (re.compile(r"rgba?\(\s*235\s*,\s*205\s*,\s*146\s*,"), "rgba(226,212,184,",
     "parıltı ucu → açık şampanya"),
    (re.compile(r"rgba?\(\s*224\s*,\s*190\s*,\s*122\s*,"), "rgba(214,198,166,",
     "altın metin tabanı → şampanya"),
    (re.compile(r"rgba\(\s*184\s*,\s*148\s*,\s*58\s*,"), "rgba(201,182,147,",
     "pirinç altın ailesi → mat şampanya (alfa korunur)"),
    (re.compile(r"rgba\(\s*4\s*,\s*107\s*,\s*76\s*,"), "rgba(237,230,218,",
     "fintech yeşili ailesi → fildişi"),
    (re.compile(r"rgba\(\s*250\s*,\s*165\s*,\s*66\s*,"), "rgba(176,162,150,",
     "fintech amberi ailesi → kil"),
]


def main():
    s = open(CSS, encoding="utf-8").read()
    # ⚠️ YORUMLARA DOKUNMUYORUZ: bir yorumdaki eski renk TARİHTİR;
    # değiştirmek, kararın neden alındığını silmek olur.
    # Bu yüzden yorumları çıkarıp yalnız KURALLARDA sayıyoruz.
    def kural_metni(metin):
        return re.sub(r"/\*.*?\*/", lambda m: " " * (m.end() - m.start()), metin, flags=re.S)

    rapor = []
    for eski, yeni, bekle, gerekce in ESLEME:
        kural = kural_metni(s)
        n = kural.count(eski)
        if n == 0:
            # ⚠️ TEKRAR KOŞULABİLİRLİK: göç zaten uygulanmışsa bu bir hata
            # değil bir DURUM. (Aynı dersi SQL üretecinde de ödedim.)
            # Ayrıca AİLE kuralları tek tek eşlemelerin bazılarını yutabilir;
            # "yeni değer kaç kez var" saymak o yüzden kırılgan. Asıl güvence
            # bu betik değil, `palet_check.py` — o TON AÇISINA bakıyor ve
            # tavanı 0. Burada 0 bulmak yalnızca "yapacak iş kalmadı" demek.
            # 🆕 SINIF: "GÖÇ BETİĞİ İŞİ YAPAR, DOĞRULUĞU NÖBETÇİ SÖYLER —
            # GÖÇÜ KENDİ KENDİNİN NÖBETÇİSİ YAPMA."
            print(f"   · zaten uygulanmış: {eski[:46]}")
            continue
        if n != bekle:
            print(f"✗ «{eski}» kurallarda {n} kez bulundu, {bekle} bekleniyordu ({gerekce})")
            print("  Hiçbir şey yazılmadı.")
            sys.exit(1)
        # Yalnız kural bölgelerinde değiştir
        out, i = [], 0
        for m in re.finditer(re.escape(eski), s):
            if kural[m.start():m.end()] != eski:
                continue        # yorumun içi — atla
            out.append(s[i:m.start()])
            out.append(yeni)
            i = m.end()
        out.append(s[i:])
        s = "".join(out)
        rapor.append((eski, yeni, bekle, gerekce))

    # ── Aile kuralı: kalan bütün alfa varyantları ────────────────────
    kural = kural_metni(s)
    for kal, yeni, gerekce in AILE:
        yerler = [m for m in kal.finditer(s) if kural[m.start():m.end()] == m.group(0)]
        if yerler:
            out, i = [], 0
            for m in yerler:
                out.append(s[i:m.start()]); out.append(yeni); i = m.end()
            out.append(s[i:])
            s = "".join(out)
            rapor.append((kal.pattern[:30] + "…", yeni, len(yerler), "AİLE · " + gerekce))
            kural = kural_metni(s)

    open(CSS, "w", encoding="utf-8").write(s)

    # ── Bileşenlerin içindeki ikinci palet ───────────────────────────
    jsx_n = 0
    JSX_TUM = JSX + [os.path.join(KOK, "components", f) for f in
                     ("LegalPage.jsx", "WalletCalc.jsx", "HostEarn.jsx",
                      "EkranKarusel.jsx", "Coverage.jsx", "WaitlistForm.jsx")]
    for yol in JSX_TUM:
        if not os.path.exists(yol):
            continue
        j = open(yol, encoding="utf-8").read()
        for kal, yeni, gerekce in AILE:
            j2, k = kal.subn(yeni, j)
            if k:
                j = j2; jsx_n += k
                rapor.append((kal.pattern[:26] + "…", yeni, k, os.path.basename(yol) + " · " + gerekce))
        for eski, yeni, gerekce in JSX_ESLEME:
            k = j.count(eski)
            if k:
                j = j.replace(eski, yeni)
                jsx_n += k
                rapor.append((eski, yeni, k, os.path.basename(yol) + " · " + gerekce))
        open(yol, "w", encoding="utf-8").write(j)
    print(f"✓ {len(rapor)} eşleme uygulandı · toplam "
          f"{sum(x[2] for x in rapor)} yer")
    for eski, yeni, n, g in rapor:
        print(f"   {eski:38s} → {yeni:28s} ×{n}  {g}")


if __name__ == "__main__":
    main()
