#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_og.py — SOSYAL PAYLAŞIM KARTINI (`public/og.jpg`) ÜRETİR.

🔴 NEDEN VAR — 20 EYLÜL

`public/og.jpg` bir bağlantı WhatsApp'ta, X'te ya da LinkedIn'de
paylaşıldığında görünen tek karedir. Yani markayı ilk gören insanların
çoğu ürünü DEĞİL bu kareyi görür.

Ölçtüm:

    public/og.jpg   C* ort 7.4 · p95 12.2 · baskın hue **281°**   ← MENEKŞE
    marka            C* 20.1                        · hue  86°

281°. Obsidyen sisteminin sıcak bandı 45-120°. Kart, ürünün terk ettiği
LACİVERT dünyadan kalmıştı ve içindeki telefon maketi de AÇIK temanın
eski ekranıydı — yani hem rengi hem içeriği iki tur geride.

🆕 SINIF: "PAYLAŞIM KARTI ÜRÜNÜN DEĞİL, ÜRÜNÜN EN ÇOK GÖRÜLEN KARESİDİR
— TEMAYI ORAYA UYGULAMAZSAN, İNSANLARIN ÇOĞU ESKİ MARKAYI GÖRÜR."

── NE ÇİZİYOR ──────────────────────────────────────────────────────────

Obsidyen zemin + kadife hale · sol üstte Kemer markası ve LOUNGELINK
kelimesi · sitenin KENDİ vaat cümlesi (lib/content.js `hero`) Cormorant
ile · sağda GERÇEK ve GÜNCEL bir ekran (web_sahne çıktısı).

Metin uydurulmuyor: `lib/content.js`ten okunuyor. Ekran uydurulmuyor:
`rnapp/web_sahne/out`tan alınıyor. İkisi de eskiyince kart da eskir ve
`gorsel_tutarlilik_check.py` bunu söyler.

Kullanım:
    python build_og.py            # önizleme /tmp'ye
    python build_og.py --uygula   # public/og.jpg'yi yazar (eskisini arşivler)
"""
import io
import os
import re
import shutil
import sys
from datetime import date

import cairosvg
import numpy as np
from PIL import Image, ImageDraw, ImageFont

SITE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(os.path.dirname(SITE), "rnapp")
sys.path.insert(0, os.path.join(APP, "brand"))

W, H = 1200, 630
OBS = (11, 10, 11)
IVORY = (244, 239, 230)
SAMP = (201, 182, 147)          # app KOYU.gold — CANLI değer (#C9B693)
MUTED = (169, 157, 140)

SERIF = os.path.join(APP, "assets", "fonts", "CormorantGaramond-SemiBold.ttf")
# 🔴 20 EYLÜL — ARCHIVO EMEKLİ AİLE. 30 Ağustos'ta gövde ailesi Plus
# Jakarta Sans'a geçti (x-yüksekliği ölçümüyle); kart hâlâ Archivo
# basıyordu. İki yerde iki aile, markanın olmadığının işaretidir.
SANS = os.path.join(APP, "assets", "fonts", "PlusJakartaSans-Bold.ttf")


def hero_cumlesi():
    """Metni UYDURMUYORUZ — sitenin kendi içerik dosyasından okunuyor."""
    g = open(os.path.join(SITE, "lib", "content.js"), encoding="utf-8").read()
    m = re.search(r'\n\s*hero:\s*"([^"]+)"', g)
    if not m:
        raise SystemExit("🔴 lib/content.js içinde `hero:` bulunamadı — kart metni uydurulamaz.")
    return m.group(1)


def alan_adi():
    """
    🔴 20 EYLÜL — KART, KİMSENİN KULLANMADIĞI BİR ALAN ADI YAZIYORDU.

    Burada `"loungelink.app"` SABİT yazılıydı. Sitenin tamamını taradım:
    layout.jsx, sitemap.js, robots.js, content.js, legal-source.js,
    Olcum.jsx — on dört yerde `loungelink.co`. Tek istisna bu dosyaydı.

    Ve bu dosya, bağlantı paylaşıldığında görünen TEK karedir: markayı
    ilk gören insanların çoğu yanlış alan adını görüyordu.

    🆕 SINIF: "EN ÇOK GÖRÜLEN KAREYE SABİT YAZILAN HER DEĞER, SESSİZCE
    ESKİYEN BİR DEĞERDİR — AYNI BİLGİYİ ÜRETEN KAYNAKTAN OKU."

    Artık metin gibi alan adı da UYDURULMUYOR: layout.jsx'in
    `metadataBase`inden okunuyor.
    """
    g = open(os.path.join(SITE, "app", "layout.jsx"), encoding="utf-8").read()
    m = re.search(r'metadataBase:\s*new URL\("https?://([^"/]+)', g)
    if not m:
        raise SystemExit("🔴 layout.jsx içinde `metadataBase` bulunamadı — alan adı uydurulamaz.")
    return m.group(1)


def kemer(boy):
    import build_kemer as K
    P = np.load(K.IZ)
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" '
           'width="%d" height="%d">%s</svg>' % (boy, boy, K.DEFS + K._ic(P)))
    return Image.open(io.BytesIO(cairosvg.svg2png(
        bytestring=svg.encode(), output_width=boy, output_height=boy))).convert("RGBA")


def kadife(im):
    """Obsidyen düz değil — mikroskobik sıcaklık (app `--kadife` ile aynı fikir)."""
    a = np.asarray(im, float)
    y, x = np.mgrid[0:H, 0:W]
    r = np.sqrt(((x - W * 0.30) / (W * 0.85)) ** 2 + ((y - H * 0.05) / (H * 1.1)) ** 2)
    k = np.clip(1 - r, 0, 1) ** 2 * 0.055
    for i, c in enumerate((214, 195, 160)):
        a[:, :, i] = np.clip(a[:, :, i] + k * c, 0, 255)
    return Image.fromarray(a.astype(np.uint8))


def sar(d, metin, font, gen):
    kelimeler, satir, cik = metin.split(), "", []
    for k in kelimeler:
        dene = (satir + " " + k).strip()
        if d.textlength(dene, font=font) <= gen:
            satir = dene
        else:
            cik.append(satir)
            satir = k
    if satir:
        cik.append(satir)
    return cik


def uret():
    im = kadife(Image.new("RGB", (W, H), OBS))
    d = ImageDraw.Draw(im)

    # ── marka satırı ──
    k = kemer(92)
    im.paste(k, (72, 64), k)
    fs = ImageFont.truetype(SANS, 25)
    d.text((72 + 92 + 22, 64 + 32), "L O U N G E L I N K", font=fs, fill=IVORY)

    # ── vaat cümlesi (sitenin kendi metni) ──
    f1 = ImageFont.truetype(SERIF, 66)
    satirlar = sar(d, hero_cumlesi(), f1, 620)
    y = 224
    for s in satirlar[:3]:
        d.text((72, y), s, font=f1, fill=IVORY)
        y += 82

    fk = ImageFont.truetype(SANS, 19)
    d.text((72, y + 22), alan_adi(), font=fk, fill=SAMP)

    # ── sağda GERÇEK ekran ──
    sahne = os.path.join(APP, "web_sahne", "out", "11_ana_misafir.png")
    if os.path.exists(sahne):
        t = Image.open(sahne).convert("RGB")
        yuk = 520
        t = t.resize((int(t.width * yuk / t.height), yuk), Image.LANCZOS)
        maske = Image.new("L", t.size, 0)
        ImageDraw.Draw(maske).rounded_rectangle([0, 0, t.size[0] - 1, t.size[1] - 1],
                                                radius=34, fill=255)
        t.putalpha(maske)
        x = W - t.width - 74
        golge = Image.new("RGBA", (t.width + 40, t.height + 40), (0, 0, 0, 0))
        ImageDraw.Draw(golge).rounded_rectangle([20, 24, t.width + 20, t.height + 32],
                                                radius=40, fill=(0, 0, 0, 150))
        im.paste(Image.alpha_composite(
            Image.new("RGBA", golge.size, (0, 0, 0, 0)), golge).convert("RGB"),
            (x - 20, 74), golge)
        im.paste(t, (x, 78), t)
    else:
        print("  ⚠ 11_ana_misafir.png yok — kart telefonsuz çizildi.")

    # ── 1px kılcal ışık: üst kenar ──
    d.line([(0, 0), (W, 0)], fill=(244, 239, 230), width=1)
    return im


def main():
    im = uret()
    if "--uygula" not in sys.argv:
        im.save("/tmp/og_onizleme.jpg", quality=90, optimize=True)
        print("  · ÖNİZLEME: /tmp/og_onizleme.jpg  (public/ DEĞİŞMEDİ)")
        return 0
    hedef = os.path.join(SITE, "public", "og.jpg")
    ars = os.path.join(SITE, "public", "arsiv_gorsel")
    os.makedirs(ars, exist_ok=True)
    yedek = os.path.join(ars, "og_%s.jpg" % date.today().isoformat())
    if os.path.exists(hedef) and not os.path.exists(yedek):
        shutil.copy2(hedef, yedek)
        print("  ✓ eski kart arşivlendi: public/arsiv_gorsel/%s" % os.path.basename(yedek))
    im.save(hedef, quality=90, optimize=True)
    print("  ✓ public/og.jpg yazıldı")
    return 0


if __name__ == "__main__":
    sys.exit(main())
