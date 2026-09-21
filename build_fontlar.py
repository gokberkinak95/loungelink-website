#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_fontlar.py — SİTENİN YAZI AİLELERİNİ APP'İN DOSYALARINDAN ÜRETİR.

============================================================================
🔴 NEDEN VAR — 20 EYLÜL

Sitenin `app/globals.css` dosyası aylardır şunu diyordu:

    --serif: ui-serif, Georgia, "Times New Roman", serif;
    --sans:  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --mono:  ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

Yani sitede Cormorant Garamond YOKTU. Plus Jakarta Sans YOKTU. JetBrains
Mono YOKTU. Üçü de app'te gömülü (`rnapp/assets/fonts`, OFL) ve üçü de
ÖLÇÜLMÜŞ kararlar:

  · Cormorant → kuralın sesi; app'te `F.serif`
  · Plus Jakarta Sans → gövde; Archivo'dan buraya geçiş kararı
    x-yüksekliği ölçümüyle alınmıştı (koyu zeminde ince harf "yenir")
  · JetBrains Mono → rakam satırının ZIPLAMAMASI için mekanik zorunluluk

Renk jetonlarını `site_paleti.py` ile app'ten TÜRETİYORUZ ve sapma tavanı
0. Görselleri `gorsel_tutarlilik_check.py` ile bağladık. Ama TİPOGRAFİ
bağlanmamıştı — ve tipografi, bir markanın renkten sonra en çok
tanınan parçasıdır. Ziyaretçi Georgia görüyordu; kullanıcı Cormorant.

🆕 SINIF: "MARKAYI TEK KAYNAĞA BAĞLARKEN RENGİ VE GÖRSELİ SAYIP
TİPOGRAFİYİ SAYMAMAK, KİMLİĞİN EN ÇOK OKUNAN PARÇASINI SİSTEM
VARSAYILANINA BIRAKMAKTIR."

── NE YAPIYOR ──────────────────────────────────────────────────────────

`rnapp/assets/fonts/*.ttf` → alt küme → woff2 → `public/fonts/`.

ALT KÜME ŞART: Cormorant'ın üç kesiti ham hâlde 2.3 MB. Sitenin ihtiyacı
Latin + Latin Genişletilmiş-A (Türkçe ı/İ/ş/ğ/ç/ö/ü) + kullandığımız
noktalama (· — … ‹ › → ₺). Alt küme sonrası toplam ~%90 küçülüyor ve
bu, mobil veriyle açılan bir sayfada ilk boyamanın önünde duran şeydir.

⚠️ ÜRETİCİ TEK: `font_check.py` woff2'lerin bu betikten ve app'in
TTF'lerinden türediğini `fontlar.json` makbuzuyla doğruluyor. Elle
kopyalanan bir font dosyası kapıda kırmızı yanar — `brand/build_brand.py`
ile aynı "tek üretici" kuralı.

Kullanım:
    python build_fontlar.py            # önizleme (public/ DEĞİŞMEZ)
    python build_fontlar.py --uygula   # public/fonts/ + makbuz yazar
============================================================================
"""
import hashlib
import json
import os
import shutil
import sys

SITE = os.path.dirname(os.path.abspath(__file__))
APP_FONT = os.path.join(os.path.dirname(SITE), "rnapp", "assets", "fonts")
HEDEF = os.path.join(SITE, "public", "fonts")
MAKBUZ = os.path.join(SITE, "public", "fonts", "fontlar.json")

# ── ALT KÜME ────────────────────────────────────────────────────────────
# Latin-1 + Latin Genişletilmiş-A (Türkçe için ŞART: U+011E ğ, U+0130 İ,
# U+0131 ı, U+015E ş) + genel noktalama (· — – … ‹ › ' ' " ") + oklar
# (→ ›) + para birimi (₺ €).
UNICODE = ("U+0000-00FF,U+0100-017F,U+0180-024F,"
           "U+2000-206F,U+20A0-20BF,U+2190-21BB,U+2212,U+2713,U+2715,"
           "U+25A0-25FF,U+2022,U+00B7")

# (kaynak ttf, css aile adı, font-weight, font-style)
# ⚠️ AĞIRLIK ARALIĞI — sitede beş yerde `font-weight: 800` var ve Plus
# Jakarta Sans'ta 800 kesiti YOK. Aralık vermezsek tarayıcı 700'ü alıp
# SAHTE KALINLAŞTIRMA yapar (harfleri kendi şişirir) — bu, ailenin
# çizimini bozar ve iki platformda iki farklı görüntü verir. `700 900`
# demek, "800 ve 900 isteyen de bu dosyayı kullansın" demektir.
AILE = [
    ("CormorantGaramond-Light.ttf",    "LL Serif", "300",     "normal"),
    ("CormorantGaramond-SemiBold.ttf", "LL Serif", "600",     "normal"),
    ("CormorantGaramond-Bold.ttf",     "LL Serif", "700 900", "normal"),
    ("PlusJakartaSans-Regular.ttf",    "LL Sans",  "400",     "normal"),
    ("PlusJakartaSans-Medium.ttf",     "LL Sans",  "500",     "normal"),
    ("PlusJakartaSans-SemiBold.ttf",   "LL Sans",  "600",     "normal"),
    ("PlusJakartaSans-Bold.ttf",       "LL Sans",  "700 900", "normal"),
    ("JetBrainsMono-Medium.ttf",       "LL Mono",  "400 500", "normal"),
    ("JetBrainsMono-SemiBold.ttf",     "LL Mono",  "600 900", "normal"),
]


def md5(p):
    return hashlib.md5(open(p, "rb").read()).hexdigest()


def woff2_ad(ttf):
    return ttf.replace(".ttf", "").replace("CormorantGaramond", "cormorant") \
              .replace("PlusJakartaSans", "jakarta") \
              .replace("JetBrainsMono", "jetbrains").lower() + ".woff2"


def uret(cikis):
    from fontTools import subset
    os.makedirs(cikis, exist_ok=True)
    kayit = []
    for ttf, aile, agirlik, stil in AILE:
        kaynak = os.path.join(APP_FONT, ttf)
        if not os.path.exists(kaynak):
            raise SystemExit("🔴 app fontu yok: %s" % kaynak)
        cik = os.path.join(cikis, woff2_ad(ttf))
        subset.main([
            kaynak,
            "--unicodes=" + UNICODE,
            "--layout-features=kern,liga,calt,tnum,onum,locl",
            "--flavor=woff2",
            "--no-hinting",
            "--desubroutinize",
            "--output-file=" + cik,
        ])
        kayit.append({
            "ttf": ttf, "ttf_md5": md5(kaynak),
            "woff2": os.path.basename(cik), "woff2_md5": md5(cik),
            "aile": aile, "agirlik": agirlik, "stil": stil,
            "ham_bayt": os.path.getsize(kaynak), "bayt": os.path.getsize(cik),
        })
    return kayit


def css(kayit):
    satir = ["/* ÜRETİLDİ — build_fontlar.py. ELLE DÜZENLEME.",
             "   Kaynak: rnapp/assets/fonts/*.ttf (OFL) · alt küme + woff2. */"]
    for k in kayit:
        satir.append("@font-face {")
        satir.append('  font-family: "%s";' % k["aile"])
        satir.append("  font-weight: %s;" % k["agirlik"])
        satir.append("  font-style: %s;" % k["stil"])
        # ⚠️ swap: font inerken metin GÖRÜNMEZ kalmasın. `block` yazarsak
        # yavaş bağlantıda sayfa boş açılır ve bu, ölçülen en pahalı
        # algılanan-gecikme hatasıdır.
        satir.append("  font-display: swap;")
        satir.append('  src: url("/fonts/%s") format("woff2");' % k["woff2"])
        satir.append("}")
    return "\n".join(satir)


def main():
    uygula = "--uygula" in sys.argv
    cikis = HEDEF if uygula else "/tmp/ll_fontlar"
    if not uygula and os.path.isdir(cikis):
        shutil.rmtree(cikis)
    kayit = uret(cikis)

    ham = sum(k["ham_bayt"] for k in kayit)
    yeni = sum(k["bayt"] for k in kayit)
    print("")
    print("=" * 74)
    print("SİTE FONTLARI — app'in TTF'lerinden alt küme + woff2")
    print("=" * 74)
    for k in kayit:
        print("  %-34s %7.1f KB → %6.1f KB   %-9s %s"
              % (k["ttf"], k["ham_bayt"] / 1024, k["bayt"] / 1024,
                 k["aile"], k["agirlik"]))
    print("  " + "-" * 70)
    print("  TOPLAM  %.0f KB → %.0f KB  (%%%.0f küçülme)"
          % (ham / 1024, yeni / 1024, 100 * (1 - yeni / ham)))
    print("")

    if not uygula:
        print("  · ÖNİZLEME: %s  (public/ DEĞİŞMEDİ)" % cikis)
        print("  · uygulamak için: python build_fontlar.py --uygula")
        return 0

    json.dump({"uretici": "build_fontlar.py", "fontlar": kayit},
              open(MAKBUZ, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    css_yol = os.path.join(SITE, "app", "fontlar.css")
    open(css_yol, "w", encoding="utf-8").write(css(kayit) + "\n")
    print("  ✓ public/fonts/ yazıldı (%d dosya)" % len(kayit))
    print("  ✓ public/fonts/fontlar.json makbuzu yazıldı")
    print("  ✓ app/fontlar.css yazıldı — globals.css'in EN BAŞINDAN import edilmeli")
    return 0


if __name__ == "__main__":
    sys.exit(main())
