#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
app_paleti.py — SİTEDEKİ TELEFON MAKETİNİN RENKLERİNİ UYGULAMANIN
GERÇEK PALETİNDEN TÜRETİR.

🔴 NEDEN VAR — SİTE, OLMAYAN BİR UYGULAMAYI GÖSTERİYORDU
Ana sayfadaki telefon maketi (`components/Screens.jsx`) uygulamanın
açık temasını temsil ediyor ve renklerini `--app*` token'larından
alıyor. O token'lar en son v0.7 civarında yazılmıştı:

    --appInk    #1A1F2E   ton 225°  (LACİVERT)
    --appBody   #374151   ton 217°  (LACİVERT)
    --appMuted  #4B5563   ton 215°  (LACİVERT)

Uygulama ise v3.1'de bu aileyi TAMAMEN bıraktı; nötrleri sıcak amber
tarafına taşıdı (30–31°) çünkü mavi nötrler yeni zeminle uyuşmuyordu.

Yani site, altı ay önce var olan bir ürünün ekran görüntüsünü
gösteriyordu. Kimse yalan söylemedi — iki palet iki dosyada durdu ve
biri değişti.

🆕 SINIF: "AYNI ÜRÜNÜ İKİ YERDE TARİF EDİYORSAN, BİRİ DEĞİŞTİĞİNDE
ÖTEKİ YANLIŞ OLUR — VE YANLIŞ OLAN GENELDE PAZARLAMA YÜZÜ, YANİ
İNSANLARIN İLK GÖRDÜĞÜ TARAFTIR."

Çözüm iki parçalı:
  · TÜRET  — `--app*` değerleri artık `rnapp/src/theme.js`ten okunuyor
             (tek kaynak: `tema_oku`), elle yazılmıyor.
  · NÖBET  — `--denetle` modu, türetilen değerle dosyadakini karşılaştırır.
             Uygulama paleti değişip site güncellenmezse denetim kırmızı.

KULLANIM
    python app_paleti.py            → globals.css'i günceller
    python app_paleti.py --denetle  → sapma var mı (tavan 0)
"""
import datetime
import os
import re
import shutil
import sys

KOK = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(os.path.dirname(KOK), "rnapp")
sys.path.insert(0, APP)
from tema_oku import oran, palet                                   # noqa: E402

CSS = os.path.join(KOK, "app", "globals.css")
BAS = "  /* <<< APP-MAKET — app_paleti.py yazar, ELLE DÜZENLEME */"
SON = "  /* APP-MAKET >>> */"

# (css değişkeni, app tokeni, üstünde ölçülecek zemin tokeni, eşik)
ESLEME = [
    ("--appBg",    "bg",        None,      None),
    ("--appAlt",   "surfaceAlt", None,     None),
    ("--appCard",  "surface",   None,      None),
    ("--appInk",   "ink",       "surface", 4.5),
    ("--appBody",  "body",      "surfaceAlt", 4.5),
    ("--appMuted", "mutedAA",   "surfaceAlt", 4.5),
    ("--appGreen", "greenInk",  "surface", 4.5),
    ("--appAmber", "amberInk",  "amberBg", 4.5),
    ("--appTeal",  "tealInk",   "surface", 4.5),
    ("--appGold",  "goldText",  "surface", 4.5),
]


def blok():
    P = palet("C")
    s = [BAS,
         "  /* Uygulamanın AÇIK teması — değerler rnapp/src/theme.js'ten",
         "     TÜRETİLDİ. Site gece, app gündüz: ayrı token'lar ama TEK",
         "     kaynak. Yanlarındaki oranlar burada, üretim anında ölçüldü. */"]
    for css, tok, zem, esik in ESLEME:
        v = P.get(tok)
        if not v:
            s.append("  %s: /* app'te `%s` yok */;" % (css, tok))
            continue
        not_ = ""
        if zem and P.get(zem):
            not_ = "   /* %s üstünde %.2f:1 */" % (zem, oran(v, P[zem]))
        s.append("  %s: %s;%s" % (css, v, not_))
    s.append("  --appLine: rgba(0, 0, 0, 0.08);")
    s.append(SON)
    return "\n".join(s)


def mevcut(g):
    """Dosyadaki `--app*` değerleri."""
    d = {}
    for m in re.finditer(r"(--app\w+):\s*(#[0-9A-Fa-f]{3,8})", g):
        d[m.group(1)] = m.group(2).upper()
    return d


def denetle():
    g = open(CSS, encoding="utf-8").read()
    P = palet("C")
    var = mevcut(g)
    sapma = []
    for css, tok, _, _ in ESLEME:
        v = P.get(tok)
        if not v:
            continue
        if var.get(css, "").upper() != v.upper():
            sapma.append((css, var.get(css, "(yok)"), v, tok))
    print("=" * 74)
    print("SİTE ↔ APP PALET UYUMU — telefon maketi gerçek uygulamayı mı gösteriyor?")
    print("=" * 74)
    print("  eşlenen token : %d" % len(ESLEME))
    print("  SAPMA         : %d  (tavan 0)" % len(sapma))
    for css, eski, yeni, tok in sapma:
        print("    ✗ %-11s sitede %-9s · app'te %s (C.%s)" % (css, eski, yeni, tok))
    if sapma:
        print("\n🔴 Site, uygulamanın ARTIK OLMAYAN bir sürümünü gösteriyor.")
        print("   `python app_paleti.py` çalıştır — değerleri theme.js'ten türetir.")
        return 1
    print("\n✓ Maket paleti uygulamanın gerçek paletiyle birebir.")
    return 0


def main():
    if "--denetle" in sys.argv:
        return denetle()
    g = open(CSS, encoding="utf-8").read()
    yeni = blok()
    if BAS in g:
        a = g.index(BAS)
        b = g.index(SON, a) + len(SON)
        g = g[:a] + yeni + g[b:]
    else:
        # ilk kurulum: eski elle yazılmış satırları kaldır, blok koy
        satirlar = [s for s in g.split("\n")
                    if not re.match(r"\s*--app\w+:", s)]
        g = "\n".join(satirlar)
        im = "  --serif:"
        g = g.replace(im, yeni + "\n\n" + im, 1)
    ye = os.path.join(KOK, "_yedek_palet",
                      datetime.datetime.now().strftime("%Y%m%d_%H%M%S"))
    os.makedirs(ye, exist_ok=True)
    shutil.copy2(CSS, os.path.join(ye, "globals.css"))
    open(CSS, "w", encoding="utf-8").write(g)
    print("✓ globals.css güncellendi — maket paleti app'ten türetildi")
    print("  yedek: %s" % ye)
    return denetle()


if __name__ == "__main__":
    sys.exit(main())
