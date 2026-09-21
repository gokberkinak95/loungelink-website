#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
palet_check.py — SİTENİN PALET NÖBETÇİSİ

🔴 NEDEN VAR — 13 EYLÜL, GÖKBERK'İN SİTE BRIEF'İ
Brief "fintech sarı/yeşillerini öldür" diyordu. Token'ları değiştirdim,
ekran görüntüsünü aldım ve HİÇBİR ŞEY DEĞİŞMEMİŞTİ. Pikseli ölçtüm:
    rozet (111,217,168) yeşil · düğme (188,149,62) pirinç
Sebep: palet ÜÇ AYRI YERDE yaşıyordu ve ikisinde token yoktu —
  1. `:root` token'ları            (değiştirdim, yetmedi)
  2. `globals.css` kuralları       (50 ham hex · 92 rgba)
  3. Bileşenlerin satır içi stili  (23 ham hex · SectionScene, RuleDemo…)
Üç geçiş sürdü ve her geçişten sonra ekranı YENİDEN ölçmek gerekti.

App tarafında bu sınıfın nöbetçisi VAR (`rnapp/palette_check.py`) —
sitede YOKTU. Borç tam bu yüzden sessizce birikti.

🆕 SINIF: "TOKEN'I OLMAYAN BİR PALET, PALET DEĞİL BİR ÖNERİDİR."

NE DENETLİYOR: yasaklı renk AİLELERİ (fintech yeşili/teal'i/amberi ve
pirinç altın) stil kurallarında ya da bileşenlerde geri gelmiş mi.
Yorumlar MUAF: yorumdaki eski değer tarihtir, kusur değil.

TAVAN: 0 — ratchet değil. Bu borç kapandı, yeniden açılamaz.
"""
import os, re, sys, glob

KOK = os.path.dirname(os.path.abspath(__file__))

# ── Yasaklı aileler — LİSTE DEĞİL, TON AÇISI ─────────────────────────
# 🔴 İLK SÜRÜM BİR LİSTEYDİ VE KAÇIRDI. `.plan-year` rengi `#9FD8D0`
# (ton 172° turkuaz) ekranda duruyordu; listemde o değer yoktu, nöbetçi
# yeşil yandı. Ekranda ölçünce ortaya çıktı: (159,216,208).
# Bir renk AİLESİ sonsuz üyelidir; listeyle kovalanmaz.
# 🆕 SINIF: "YASAKLI RENKLERİ LİSTEYLE KOVALARSAN, LİSTEDE OLMAYAN HER
# TON SERBEST KALIR — AİLEYİ TANIMLA, ÜYELERİ DEĞİL."
#
# Kuşaklar (HSL ton açısı):
#   120–200°  yeşil → turkuaz   (fintech "başarı" ailesi)
#    25–50°   doygun amber/pirinç  (S ≥ %45; şampanya S ≈ %28 ile GEÇER)
# Doygunluğu %12'nin altındaki nötrler muaf: onlar renk değil, gri.
import colorsys

YASAK_KUSAK = [
    ((120, 200), 12, "fintech yeşili / turkuaz",
     "Durum bilgisi yeşille çizilirse kullanıcı onu bir ÖDÜL sanır."),
    ((25, 50), 45, "doygun amber / pirinç",
     "Marka altını MAT ŞAMPANYA (#C9B693, doygunluk ≈ %28) — pirinç app ile ayrışır."),
]


def ton_ailesi(hx):
    """#RRGGBB → (aile adı, neden) ya da None."""
    r, g, b = [int(hx[i:i + 2], 16) for i in (1, 3, 5)]
    h, l, sat = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    H, S = h * 360, sat * 100
    for (a, ust), esik, ad, neden in YASAK_KUSAK:
        if S >= esik and a <= H <= ust:
            return ad, neden, round(H), round(S)
    return None


# rgb/rgba yazımı da aynı süzgeçten geçer.
RGBA = re.compile(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)")
HEX = re.compile(r"#([0-9A-Fa-f]{6})")

# Muaf dosyalar: arşiv ve üreteçler (tarih), bu nöbetçinin kendisi,
# ve `site_paleti.py` (ölçüm çıktısını yorumlarında anlatıyor).
MUAF_AD = ("palet_check.py", "palet_gecis.py", "site_paleti.py", "karsilastir_cek.py")
# 🔴 21 EYLÜL — ARŞİV KLASÖRÜ DENETLENİYORDU.
# Listede "arsiv" yazıyordu ama Gökberk'in diskindeki klasörün adı
# `_arsiv`. Eşleşme tam ad üzerinden olduğu için `_arsiv` muaf
# sayılmadı ve arşivlenmiş `components/_arsiv/Screens.jsx` 14 bulgu
# üretti. O dosya ÖLÜ; kural "eski dosyayı silme, arşivle" olduğu için
# orada duruyor — yani projenin kendi kuralı nöbetçiyi yanlış alarma
# sokuyordu. Benim kopyamda `_arsiv` hiç yoktu, bu yüzden bende hep
# yeşil yandı: kapı yalnız ONUN diskinde kırmızıydı.
#
# 🆕 SINIF: "MUAFİYET LİSTESİ BİR ADI TAM YAZIYORSA, O ADIN GERÇEK
# HAYATTAKİ YAZIMINI DA VARSAYMIŞ OLUR — ÖNEK/SONEK KAÇIRAN LİSTE
# MUAF ETMEZ, YALNIZ MUAF ETTİĞİNİ SANIR."
MUAF_DIZIN = ("_yedek", "node_modules", ".next", "olcum", "public", "scripts")
# Adı `arsiv` ile başlayan ya da `_arsiv` olan HER klasör muaf
# (arsiv, _arsiv, arsiv_20260914, _arsiv_eski …).
MUAF_ONEK = ("arsiv", "_arsiv", "_yedek", "_eski")


def arsiv_mi(parca):
    return any(parca == o or parca.startswith(o + "_") or parca.startswith(o)
               for o in MUAF_ONEK)


def yorumsuz(metin, js=False):
    """`/* */` (ve JS'te `//`) yorumlarını boşlukla değiştirir; konum korunur.
    ⚠️ Yorumdaki eski renk TARİHTİR — `palet_gecis.py`nin kararını anlatıyor.
    Onu kusur saymak, kaydı silmeye zorlamak olurdu."""
    metin = re.sub(r"/\*.*?\*/", lambda m: " " * (m.end() - m.start()), metin, flags=re.S)
    if js:
        metin = re.sub(r"//[^\n]*", lambda m: " " * (m.end() - m.start()), metin)
    return metin


bulgu = []
# ⚠️ ÜRETİLEN BLOKTAKİ `--teal/--amber` MUAF — VE BU BİR TAVİZ DEĞİL:
# `site_paleti.py` onları app'ten türetiyor, KARAR KATMANI ise hemen
# altında `var(--fil)`/`var(--kil)`e bağlıyor. Yani literal dosyada
# duruyor ama ekranda ASLA çizilmiyor. Nöbetçi bunu VARSAYMIYOR:
# karar katmanının gerçekten orada olduğunu aşağıda DOĞRULUYOR.
KARAR_SART = ("--teal: var(--fil)", "--green: var(--fil)", "--amber: var(--kil)")
css_ham = open(os.path.join(KOK, "app", "globals.css"), encoding="utf-8").read()
for sart in KARAR_SART:
    if sart not in css_ham:
        bulgu.append(("app/globals.css", 0, "karar katmanı eksik", sart,
                      "Üretilen palet bu token'ı fintech tonunda yazıyor; "
                      "karar katmanı onu nötrlemezse ekranda çizilir."))

for desen in ("app/**/*.css", "app/**/*.jsx", "components/**/*.jsx", "lib/**/*.js"):
    for yol in glob.glob(os.path.join(KOK, desen), recursive=True):
        bag = os.path.relpath(yol, KOK)
        if os.path.basename(yol) in MUAF_AD:
            continue
        parcalar = bag.split(os.sep)
        if any(d in parcalar for d in MUAF_DIZIN) or any(arsiv_mi(x) for x in parcalar):
            continue
        ham = open(yol, encoding="utf-8", errors="replace").read()
        s2 = yorumsuz(ham, js=not yol.endswith(".css"))
        for no, satir in enumerate(s2.split("\n"), 1):
            # Karar katmanının nötrlediği token TANIMLARI muaf
            if re.match(r"\s*--(teal|green|amber)\s*:", satir):
                continue
            adaylar = ["#" + m.group(1) for m in HEX.finditer(satir)]
            adaylar += ["#%02X%02X%02X" % (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                        for m in RGBA.finditer(satir)]
            for hx in adaylar:
                r = ton_ailesi(hx)
                if r:
                    ad, neden, H, S = r
                    bulgu.append((bag, no, ad, f"{hx} (ton {H}° · doygunluk %{S})", neden))

TAVAN = 0
print(f"palet_check · yasaklı renk ailesi: {len(bulgu)} (tavan {TAVAN})")
gorulen = set()
for bag, no, ad, deger, neden in bulgu[:14]:
    print(f"   {bag}:{no}  [{ad}]  «{deger}»")
    if ad not in gorulen:
        print(f"      → {neden}")
        gorulen.add(ad)
if len(bulgu) > 14:
    print(f"   … ve {len(bulgu) - 14} tane daha")

if len(bulgu) > TAVAN:
    print("\n✗ ÖLDÜRÜLEN RENK AİLESİ GERİ GELMİŞ.")
    print("  Doğru karşılıklar:")
    print("    olumlu durum  → var(--fil)  #EDE6DA")
    print("    olumsuz/sınır → var(--kil)  #B0A296")
    print("    marka altını  → var(--gold) #C9B693  (mat şampanya)")
    print("  Bir renk ÜÇ yerde yaşayabilir: token · stil kuralı · bileşen içi stil.")
    sys.exit(1)
print("✓ fintech yeşili/teal/amber yok · pirinç altın yok")
