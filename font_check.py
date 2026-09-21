#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
font_check.py

============================================================================
SİTE, APP'İN YAZI AİLELERİNİ GERÇEKTEN KULLANIYOR MU?

🔴 NEDEN VAR — 20 EYLÜL

`app/globals.css` aylardır şunu diyordu:

    --serif: ui-serif, Georgia, "Times New Roman", serif;

Yani Cormorant Garamond sitede YOKTU. Renk jetonları app'ten
türetiliyordu (`site_paleti.py`, sapma tavanı 0), görseller bayt bayt
bağlıydı (`gorsel_tutarlilik_check.py`) — ama tipografi hiçbir şeye
bağlı değildi. Ziyaretçi Georgia görüyordu, kullanıcı Cormorant.

🆕 SINIF: "MARKAYI TEK KAYNAĞA BAĞLARKEN RENGİ VE GÖRSELİ SAYIP
TİPOGRAFİYİ SAYMAMAK, KİMLİĞİN EN ÇOK OKUNAN PARÇASINI SİSTEM
VARSAYILANINA BIRAKMAKTIR."

── BEŞ ÖLÇÜ ────────────────────────────────────────────────────────────

1. `--serif` / `--sans` / `--mono` BİRİNCİ sırada bizim aileyi mi
   çağırıyor? (Sistem yığını yedek olarak kalabilir, ama BAŞTA olamaz —
   başta olursa marka fontu hiç çizilmez ve kimse fark etmez.)

2. `@font-face` ile bildirilen her dosya `public/fonts/` altında VAR mı?
   Eksik dosya 404 döner, tarayıcı sessizce yedeğe düşer: hata vermez,
   sadece marka kaybolur.

3. woff2'ler app'in TTF'lerinden mi türedi? `fontlar.json` makbuzundaki
   `ttf_md5` bugünkü `rnapp/assets/fonts/*.ttf` ile eşleşmeli ve
   `woff2_md5` diskteki dosyayla. Elle kopyalanan/eskimiş font kırmızı
   yanar — `brand/build_brand.py`deki "tek üretici" kuralının aynısı.

4. Sitedeki HER `font-weight` değeri bildirilmiş bir kesite düşüyor mu?
   Düşmüyorsa tarayıcı SAHTE KALINLAŞTIRMA yapar (harfi kendi şişirir);
   sonuç ailenin çizimini bozar ve iki tarayıcıda iki görüntü verir.

5. Türkçe glifleri alt kümede duruyor mu? (ı İ ş Ş ğ Ğ ç Ç ö Ö ü Ü)
   Alt küme almanın en kolay hatası, en çok kullanılan harfleri
   kesmektir — ve Türkçe'de bu harfler her cümlede geçer.

⚠️ ÖLÇÜLDÜ, KUSUR DEĞİL: JetBrains Mono'da ₺ (U+20BA) YOKTUR — ham
TTF'te de yok, alt küme kesmedi. Sitede mono içinde ₺ kullanılmıyor.
Bunu yazıyorum ki biri sonra "alt küme bozdu" sanmasın.

TAVAN 0.
============================================================================
"""
import hashlib
import json
import os
import re
import sys

SITE = os.path.dirname(os.path.abspath(__file__))
APP_FONT = os.path.join(os.path.dirname(SITE), "rnapp", "assets", "fonts")
CSS = os.path.join(SITE, "app", "globals.css")
FACE_CSS = os.path.join(SITE, "app", "fontlar.css")
MAKBUZ = os.path.join(SITE, "public", "fonts", "fontlar.json")
TAVAN = 0

BEKLENEN = {"--serif": "LL Serif", "--sans": "LL Sans", "--mono": "LL Mono"}
TR = "ıİşŞğĞçÇöÖüÜ"


def md5(p):
    return hashlib.md5(open(p, "rb").read()).hexdigest()


def main():
    bulgular = []
    print("=" * 74)
    print("FONT TUTARLILIĞI — site app'in yazı ailelerini kullanıyor mu?")
    print("=" * 74)

    css = open(CSS, encoding="utf-8").read()
    # Yorumları sil: bu dosyanın kendi açıklamaları eski değerleri ÖRNEK
    # olarak taşıyor; silmezsek kapı kendi belgesini ihlal sanar.
    cssx = re.sub(r"/\*.*?\*/", "", css, flags=re.S)

    # ── 1) değişkenler + ÖLÜ ATAMA ─────────────────────────────────────
    print("  1 · --serif / --sans / --mono birinci sırada bizim aile mi")
    for jeton, aile in BEKLENEN.items():
        atamalar = re.findall(re.escape(jeton) + r"\s*:\s*([^;]+);", cssx)
        if not atamalar:
            bulgular.append("%s hiç tanımlı değil" % jeton)
            print("    ✗ %-8s TANIMSIZ" % jeton)
            continue
        if len(atamalar) > 1:
            # app'teki `KOYU.gold` dersi: son yazan kazanır, öncekiler
            # okuyanı İKNA EDER. Tek atama olmalı.
            bulgular.append("%s %d kez atanmış — ölü atama (son yazan kazanır)"
                            % (jeton, len(atamalar)))
            print("    ✗ %-8s %d kez atanmış" % (jeton, len(atamalar)))
            continue
        ilk = atamalar[0].split(",")[0].strip().strip('"\'')
        ok = ilk == aile
        print("    %s %-8s ilk sıra: %s" % ("✓" if ok else "✗", jeton, ilk))
        if not ok:
            bulgular.append("%s birinci sırada '%s' — '%s' olmalı" % (jeton, ilk, aile))

    # ── 2) @font-face dosyaları var mı ─────────────────────────────────
    print("")
    print("  2 · @font-face dosyaları diskte var mı")
    if not os.path.exists(FACE_CSS):
        bulgular.append("app/fontlar.css yok — `python build_fontlar.py --uygula` koş")
        print("    ✗ app/fontlar.css YOK")
        faces = []
    else:
        face_css = open(FACE_CSS, encoding="utf-8").read()
        faces = re.findall(r'url\("(/fonts/[^"]+)"\)', face_css)
        if "@import" not in css.split("{")[0] and './fontlar.css' not in css:
            bulgular.append("globals.css fontlar.css'i import etmiyor")
            print("    ✗ globals.css fontlar.css'i import ETMİYOR — hiçbiri yüklenmez")
        for u in faces:
            p = os.path.join(SITE, "public", u.lstrip("/"))
            var = os.path.exists(p)
            print("    %s %s%s" % ("✓" if var else "✗", u,
                                   "" if var else "   404 → sessizce yedeğe düşer"))
            if not var:
                bulgular.append("%s yok" % u)

    # ── 3) makbuz: app'in TTF'inden mi türedi ──────────────────────────
    print("")
    print("  3 · woff2'ler app'in TTF'lerinden mi türedi (tek üretici)")
    if not os.path.exists(MAKBUZ):
        bulgular.append("public/fonts/fontlar.json makbuzu yok")
        print("    ✗ makbuz YOK — fontlar elle kopyalanmış olabilir")
    else:
        m = json.load(open(MAKBUZ, encoding="utf-8"))
        for k in m["fontlar"]:
            ttf = os.path.join(APP_FONT, k["ttf"])
            w = os.path.join(SITE, "public", "fonts", k["woff2"])
            kusur = []
            if not os.path.exists(ttf):
                kusur.append("app TTF'i yok")
            elif md5(ttf) != k["ttf_md5"]:
                kusur.append("app TTF'i DEĞİŞTİ — build_fontlar.py yeniden koşmalı")
            if not os.path.exists(w):
                kusur.append("woff2 yok")
            elif md5(w) != k["woff2_md5"]:
                kusur.append("woff2 makbuzla uyuşmuyor — elle mi değişti")
            print("    %s %-26s %s" % ("✓" if not kusur else "✗", k["woff2"],
                                       " · ".join(kusur)))
            if kusur:
                bulgular.append("%s: %s" % (k["woff2"], " · ".join(kusur)))

        # ── 4) her font-weight bir kesite düşüyor mu ────────────────────
        #
        # ⚠️ İLK YAZDIĞIMDA BU ÖLÇÜ YANLIŞ ALARM VERDİ: her ağırlığı HER
        # aileye karşı sınıyordum ve `.kanit-yer { font-weight: 500 }`
        # için "LL Serif'te 500 yok" dedi. Oysa o kural serif DEĞİL;
        # gövdeden sans devralıyor. Bir kapının yanlış alarmı, kapının
        # kendisinden daha pahalıdır: susturulur.
        #
        # 🆕 SINIF: "BİR ÖLÇÜYÜ TÜM KOMBİNASYONLARA UYGULAMAK TİTİZLİK
        # DEĞİL GÜRÜLTÜDÜR — KURALIN GERÇEKTEN HANGİ AİLEYE DÜŞTÜĞÜNÜ
        # ÇÖZMEDEN AĞIRLIK ÖLÇÜLMEZ."
        #
        # Çözüm: kural gövdesinde `var(--serif)`/`.serif` varsa serif,
        # `var(--mono)`/`.mono` varsa mono, yoksa GÖVDE ailesi (sans).
        print("")
        print("  4 · her font-weight, kuralın DÜŞTÜĞÜ ailede kesit buluyor mu")
        araliklar = {}
        for k in m["fontlar"]:
            p = [int(x) for x in str(k["agirlik"]).split()]
            araliklar.setdefault(k["aile"], []).append((p[0], p[-1]))

        def aile_coz(secici, govde):
            if "var(--serif)" in govde or re.search(r"(^|[\s,]).*\.serif\b", secici):
                return "LL Serif"
            if "var(--mono)" in govde or re.search(r"(^|[\s,]).*\.mono\b", secici):
                return "LL Mono"
            return "LL Sans"

        gorulen = {}
        for m2 in re.finditer(r"([^{}]+)\{([^{}]*)\}", cssx):
            secici, govde = m2.group(1).strip(), m2.group(2)
            for w in re.findall(r"font-weight:\s*(\d+)", govde):
                gorulen.setdefault((aile_coz(secici, govde), int(w)), secici[:46])

        for (aile, a), ornek in sorted(gorulen.items()):
            ar = araliklar.get(aile, [])
            ok = any(lo <= a <= hi for lo, hi in ar)
            tam = any(lo == a for lo, hi in ar)
            not_ = "" if tam else ("aralıktan karşılanıyor" if ok
                                   else "SAHTE KALINLAŞTIRMA olur")
            print("    %s %-9s %-4d %-46s %s"
                  % ("✓" if ok else "✗", aile, a, ornek, not_))
            if not ok:
                bulgular.append("%s ailesinde %d kesiti yok (%s)" % (aile, a, ornek))

    # ── 5) Türkçe glifleri ─────────────────────────────────────────────
    print("")
    print("  5 · Türkçe glifleri alt kümede duruyor mu (%s)" % TR)
    try:
        from fontTools.ttLib import TTFont
        for u in faces:
            p = os.path.join(SITE, "public", u.lstrip("/"))
            if not os.path.exists(p):
                continue
            cm = TTFont(p).getBestCmap()
            eksik = [c for c in TR if ord(c) not in cm]
            print("    %s %-26s %s" % ("✓" if not eksik else "✗",
                                       os.path.basename(p),
                                       "" if not eksik else "EKSİK: " + "".join(eksik)))
            if eksik:
                bulgular.append("%s Türkçe glifi eksik: %s"
                                % (os.path.basename(p), "".join(eksik)))
    except ImportError:
        print("    ⚠ fontTools yok — 5. ölçü koşmadı (pip install fonttools brotli)")
        bulgular.append("fontTools yok — glif ölçümü yapılamadı")

    print("")
    if bulgular:
        print("  ✗ %d bulgu:" % len(bulgular))
        for b in bulgular:
            print("      %s" % b)
        print("")
        print("  ÇÖZÜM: python build_fontlar.py --uygula")
    else:
        print("  ✓ site app'in yazı ailelerini kullanıyor · makbuz güncel")
    print("")
    print("SONUC  bulgu=%d  tavan=%d" % (len(bulgular), TAVAN))
    return 1 if len(bulgular) > TAVAN else 0


if __name__ == "__main__":
    sys.exit(main())
