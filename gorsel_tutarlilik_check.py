#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gorsel_tutarlilik_check.py

============================================================================
GÖRSEL TUTARLILIĞI — SİTE İLE APP AYNI GÖRSELİ Mİ GÖSTERİYOR?

🔴 NEDEN VAR — 20 EYLÜL

Sitenin paleti `site_paleti.py` ile app'ten TÜRETİLİYOR ve sapma tavanı 0.
Ama GÖRSELLER için böyle bir bağ yoktu. Ölçtüm:

    public/bant.jpg     C* p95 36.6 · hue  41°   ← app'te derecelendirilmiş
                                                   hâli p95 23.3 · hue 76°
    public/og.jpg                    hue **281°** ← menekşe; sistem 45-120°
    public/icon.png     C* p95 48.1              ← eski ikon
    public/lockup.png   C* p95 51.1              ← eski kanat markası

Yani renk jetonları tek kaynaktan gelirken, kullanıcının GÖRDÜĞÜ
görseller iki tur geride kalabiliyordu. Üstelik `og.jpg` bir bağlantı
paylaşıldığında görünen TEK karedir: markayı ilk gören insanların çoğu
ürünü değil onu görür.

🆕 SINIF: "JETONLARI TEK KAYNAĞA BAĞLAYIP GÖRSELLERİ BAĞLAMAZSAN,
MARKA YARIM SENKRON OLUR — VE AYRIŞAN YARI, EN ÇOK PAYLAŞILAN YARIDIR."

NE ÖLÇÜYOR
  1. App ile ORTAK olması gereken dosyalar bayt bayt aynı mı
     (`bant.jpg`, `icon.png`, `favicon.png`).
  2. Siteye özgü görsellerin alfa maskeli hue/kroma değeri markanın
     sıcak bandında mı.

NEYİ ÖLÇMÜYOR
  · `public/screens/*` — onları `ekran_goruntusu_check.py` sürümle
    birlikte denetliyor.
  · `public/arsiv_gorsel/*` — arşiv; dağıtılmıyor, "eski dosya silinmez"
    kuralının çıktısı.

TAVAN 0.
============================================================================
"""
import hashlib
import os
import sys

import numpy as np
from PIL import Image
from skimage import color

SITE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(os.path.dirname(SITE), "rnapp")
TAVAN = 0

MARKA_HUE = 86.0
SICAK_ALT, SICAK_UST = 45.0, 120.0
KROMA_TAVAN = 28.0
NOTR_ESIK = 8.0

# site dosyası → app karşılığı (bayt bayt aynı olmalı)
ORTAK = {
    "bant.jpg":    os.path.join(APP, "assets", "bant.jpg"),
    "icon.png":    os.path.join(APP, "assets", "icon.png"),
    "favicon.png": os.path.join(APP, "assets", "favicon.png"),
}

# ⚠️ MUAF — gerekçesi yazılı olmayan muafiyet yoktur.
#
# 🔴 20 EYLÜL — BU SÖZLÜK BOŞALDI VE BOŞ KALMASI ÖNEMLİ.
# İçinde tek satır vardı: `lockup.png` "eski kanat markası — Kemer'e
# çevirme kararı bekliyor". Karar verildi (`brand/build_lockup.py`,
# varyant A: şampanya Kemer + fildişi kelime), lockup yeniden basıldı
# (C* p95 51.1 → 6.6 · hue 85°) ve satır SİLİNDİ.
#
# Bir muafiyet, sebebi ortadan kalkınca kendiliğinden kalkmaz — elle
# kaldırılır. Kaldırılmazsa dosya "ölçülüyor" görünür, oysa atlanır.
MUAF = {}


def md5(p):
    return hashlib.md5(open(p, "rb").read()).hexdigest()


def olc(p):
    a = np.asarray(Image.open(p).convert("RGBA"), float) / 255.0
    maske = a[:, :, 3] > 0.10
    if maske.sum() < 50:
        return None
    lab = color.rgb2lab(a[:, :, :3])
    C = np.hypot(lab[:, :, 1], lab[:, :, 2])[maske]
    H = ((np.degrees(np.arctan2(lab[:, :, 2], lab[:, :, 1])) + 360) % 360)[maske]
    p95 = float(np.percentile(C, 95))
    hs = float(np.median(H[C > 12])) if (C > 12).any() else None
    return C.mean(), p95, hs


def main():
    pub = os.path.join(SITE, "public")
    bulgular = []

    print("=" * 74)
    print("GÖRSEL TUTARLILIĞI — site ↔ app")
    print("=" * 74)
    print("  ORTAK DOSYALAR (bayt bayt aynı olmalı)")
    for ad, appyol in sorted(ORTAK.items()):
        syol = os.path.join(pub, ad)
        if not os.path.exists(syol):
            bulgular.append((ad, "sitede YOK"))
            print("    ✗ %-16s sitede yok" % ad)
            continue
        if not os.path.exists(appyol):
            print("    · %-16s app karşılığı yok — atlandı" % ad)
            continue
        ayni = md5(syol) == md5(appyol)
        print("    %s %-16s %s" % ("✓" if ayni else "✗", ad,
                                   "aynı" if ayni else "AYRIŞMIŞ — app'ten kopyala"))
        if not ayni:
            bulgular.append((ad, "app ile ayrışmış"))

    print("")
    print("  SİTEYE ÖZGÜ GÖRSELLER (marka bandında olmalı)")
    for ad in sorted(os.listdir(pub)):
        if not ad.lower().endswith((".png", ".jpg", ".jpeg")):
            continue
        if ad in ORTAK:
            continue
        if ad in MUAF:
            print("    · %-16s MUAF — %s" % (ad, MUAF[ad]))
            continue
        m = olc(os.path.join(pub, ad))
        if m is None:
            continue
        ort, p95, hs = m
        if p95 <= NOTR_ESIK:
            print("    · %-16s nötr (p95 %.1f)" % (ad, p95))
            continue
        kusur = []
        if p95 > KROMA_TAVAN:
            kusur.append("kroma %.1f > %.1f" % (p95, KROMA_TAVAN))
        if hs is not None and not (SICAK_ALT <= hs <= SICAK_UST):
            kusur.append("hue %.0f° sıcak bandın dışında" % hs)
        print("    %s %-16s C* p95 %5.1f · hue %-5s %s"
              % ("✗" if kusur else "✓", ad, p95,
                 ("%.0f°" % hs) if hs else "—", " · ".join(kusur)))
        if kusur:
            bulgular.append((ad, " · ".join(kusur)))

    print("")
    if bulgular:
        print("  ✗ %d görsel tutarsız:" % len(bulgular))
        for ad, ne in bulgular:
            print("      %s — %s" % (ad, ne))
        print("")
        print("  ÇÖZÜM: ortak dosyaları app'ten kopyala; siteye özgü olanı")
        print("  `python build_og.py --uygula` gibi bir üreticiden yeniden bas.")
    else:
        print("  ✓ site ile app aynı görselleri gösteriyor")
    print("")
    print("SONUC  bulgu=%d  tavan=%d" % (len(bulgular), TAVAN))
    sys.exit(1 if len(bulgular) > TAVAN else 0)


main()
