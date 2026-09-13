#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tasarim_check.py — v5.9.0 "SESSİZ LÜKS & LİNEER GRID" MÜHRÜNÜN NÖBETÇİSİ

🔴 NEDEN VAR — GÖKBERK, 13 EYLÜL
Dört kural mühürlendi. Bir mühür, onu koruyan bir nöbetçi yoksa bir
sonraki turda sessizce açılır — bu kod tabanında tam olarak böyle oldu:
`check.js`in palet denetimi VARDI, kırmızı yanıyordu ve görmezden
geliniyordu; borç o yüzden birikti.

NE DENETLİYOR (hepsi tavan 0):
  1. BENTO YOK      — sabit+esnek sütun karışımı (`220px 1fr`, `1fr auto`)
  2. ÇERÇEVE YOK    — kart ailesinde `1px solid` görünür renk
  3. IŞIK ≤ %15     — AÇIK renkli gradient/shadow değerleri
  4. FORM MÜHRÜ     — input çizgisiz · odak parıltılı · düğme hap + 1.2px
  5. PAZAR YERİ DİLİ— "al-sat · ticaret · para kazan · ucuz lounge" yasak

⚠️ 3'ÜNCÜ KURAL RENGE BAKAR: koyu perdeler (`rgba(9,13,24,.92)`) ışık
değil, fotoğraf üstündeki metni okunur kılan katmandır. Onları %15'e
indirmek "lüks görünsün" diye metni okunmaz yapmak olurdu.
🆕 SINIF: "BİR OPAKLIK KURALINI RENGE BAKMADAN UYGULARSAN, IŞIĞI
KISARKEN GÖLGEYİ DE KISARSIN."
"""
import os, re, sys, glob, colorsys

KOK = os.path.dirname(os.path.abspath(__file__))
CSS = os.path.join(KOK, "app", "globals.css")
MUAF_AD = ("tasarim_check.py", "palet_check.py", "palet_gecis.py",
           "v59_muhur.py", "site_paleti.py", "karsilastir_cek.py")
MUAF_DIZIN = ("_yedek", "node_modules", ".next", "arsiv", "olcum", "public", "scripts")


def yorumsuz(metin, js=False):
    metin = re.sub(r"/\*.*?\*/", lambda m: " " * (m.end() - m.start()), metin, flags=re.S)
    if js:
        metin = re.sub(r"//[^\n]*", lambda m: " " * (m.end() - m.start()), metin)
    return metin


def sr(c):
    c = c / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def lum(r, g, b):
    return 0.2126 * sr(r) + 0.7152 * sr(g) + 0.0722 * sr(b)


css = yorumsuz(open(CSS, encoding="utf-8").read())
bulgu = []

# ── 1 · BENTO YOK ─────────────────────────────────────────────────────
# Asimetri, kutu genişliğinden değil SABİT bir sütunun yanına esnek sütun
# koymaktan doğar. `repeat(n, 1fr)` ve `auto-fit minmax` eşit sütun üretir.
for m in re.finditer(r"grid-template-columns\s*:\s*([^;]+);", css):
    d = m.group(1).strip()
    # ⚠️ `1fr 1fr` BENTO DEĞİL: iki EŞİT sütun, `repeat(2, 1fr)` ile
    # birebir aynı. İlk sürümde onu da işaretledim ve 4 yanlış bulgu
    # ürettim. Asimetri eşit sütunlardan değil, SABİT bir sütunun
    # (`220px`, `auto`) yanına esnek sütun koymaktan doğar.
    # 🆕 SINIF: "BİR KURALI DENETİME ÇEVİRİRKEN ÖNCE KURALIN TANIMINI
    # YAZ — 'ASİMETRİK' BİR HİS DEĞİL, SABİT+ESNEK KARIŞIMIDIR."
    if re.match(r"^(repeat\(\s*(auto-fit|auto-fill|\d+)\s*,\s*(1fr|minmax\([^)]*\))\s*\)|(1fr\s+)+1fr|1fr|none|subgrid)$", d):
        continue
    no = css[:m.start()].count("\n") + 1
    bulgu.append(("1 · bento", f"globals.css:{no}", d,
                  "Sabit + esnek sütun karışımı bento'dur; eşit ızgara kullan."))

# ── 2 · ÇERÇEVE YOK (kart ailesi) ────────────────────────────────────
KART = ("stat", "demo", "flow-step", "prog-card", "cover-item", "wcalc",
        "hearn", "hearn-cur-card", "kcember", "hstory-k", "hero-kanit",
        "card", "plan-card", "host-card", "box", "wl-ok")
for m in re.finditer(r"([^{}]+)\{([^}]*)\}", css):
    sec, gov = m.group(1).strip(), m.group(2)
    mm = re.search(r"border\s*:\s*1(?:\.\d+)?px\s+solid\s*([^;!]+)", gov)
    if not mm:
        continue
    renk = mm.group(1).strip()
    if renk in ("transparent", "var(--kart-kenar)"):
        continue
    if any(re.search(r"\.%s\b" % re.escape(k), sec) for k in KART):
        no = css[:m.start()].count("\n") + 1
        bulgu.append(("2 · çerçeve", f"globals.css:{no}", sec.replace("\n", " ")[:46],
                      f"Kart ailesinde görünür çerçeve ({renk}); derinlik boşluk + üst parlama."))

# Parlama çizgisi gerçekten kurulu mu?
if "--parlama" not in css:
    bulgu.append(("2 · parlama", "globals.css", "--parlama yok",
                  "Çerçeveyi silip yerine bir şey koymazsan derinlik de gider."))
if "rgba(244,239,230,0.035)" not in css:
    bulgu.append(("2 · parlama", "globals.css", "brief'in değeri yok",
                  "Parlama 1px rgba(244,239,230,0.035) olmalı."))

# ── 3 · IŞIK ≤ %15 (yalnız AÇIK renkler) ─────────────────────────────
# 🔴 İLK SÜRÜM SATIR BAZLIYDI VE KAÇIRDI. `box-shadow`u iki satıra
# yazarsan ikinci satırda o kelime GEÇMEZ:
#     box-shadow: 0 0 0 1px rgba(...,0.15),
#                 0 0 22px 2px rgba(...,0.55);      ← bağlamsız görünür
# Mutasyonla kanıtladım: α=0.55 soktum, nöbetçi yeşil yandı.
# Artık SATIR değil BİLDİRİM okunuyor (`;` ile ayrılan parça).
# 🆕 SINIF: "BİR DENETİMİ SATIRA BAĞLARSAN, BİÇİMLENDİRMEYİ DEĞİŞTİREN
# HERKES ONU SESSİZCE KÖRLEŞTİREBİLİR — DİLİN BİRİMİ SATIR DEĞİLDİR."
IK = re.compile(r"rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0?\.\d+|1)\s*\)")
BAGLAM = re.compile(r"gradient|box-shadow|filter|drop-shadow", re.I)
for yol in [CSS] + sorted(glob.glob(os.path.join(KOK, "components", "*.jsx"))) \
        + sorted(glob.glob(os.path.join(KOK, "app", "**", "*.jsx"), recursive=True)):
    if os.path.basename(yol) in MUAF_AD:
        continue
    ham = yorumsuz(open(yol, encoding="utf-8").read(), js=not yol.endswith(".css"))
    # Bildirimlere böl; her bildirimin kendi satır numarasını koru.
    # ⚠️ JSX'te `;` YETMEZ: satır içi stil nesnesinin özellikleri virgülle
    # ayrılır, yani `;` ile bölünce dosyanın yarısı TEK bildirim olur ve
    # uzaktaki bir `gradient` kelimesi alakasız bir kenarlığı "ışık"
    # sanmama yol açar (ölçtüm: `page.jsx:72`de tam bunu yaptı).
    # 🆕 SINIF: "BİR AYIRICI SEÇERKEN DOSYANIN DİLİNE BAK — CSS'İN
    # NOKTALI VİRGÜLÜ JSX'TE HİÇBİR ŞEYİ AYIRMAZ."
    ayirici = ";" if yol.endswith(".css") else r"[;,]"
    yer = 0
    for bildirim in re.split(ayirici, ham):
        satir_no = ham[:yer].count("\n") + 1
        yer += len(bildirim) + 1
        if not BAGLAM.search(bildirim):
            continue
        for m in IK.finditer(bildirim):
            r, g, b, a = int(m.group(1)), int(m.group(2)), int(m.group(3)), float(m.group(4))
            if lum(r, g, b) > 0.25 and a > 0.15:
                bulgu.append(("3 · ışık", f"{os.path.basename(yol)}:{satir_no}", m.group(0),
                              f"Açık renkli ışık α={a:.2f} — tavan %15."))

# ── 4 · FORM MÜHRÜ ───────────────────────────────────────────────────
SART = [
    (r"\.wl input\[type=\"email\"\][^{]*\{[^}]*border\s*:\s*0", "input çizgisiz değil"),
    (r"\.wl input\[type=\"email\"\]:focus[^{]*\{[^}]*box-shadow", "odak parıltısı yok"),
    (r"\.wl \.btn[^{]*\{[^}]*border-radius\s*:\s*999px", "düğme tam hap değil"),
    (r"\.wl \.btn[^{]*\{[^}]*letter-spacing\s*:\s*1\.2px", "harf aralığı 1.2px değil"),
]
for kal, ad in SART:
    if not re.search(kal, css, re.S):
        bulgu.append(("4 · form", "globals.css", ad,
                      "Kayıt formu mührü eksik (çizgisiz · parıltılı · hap · 1.2px)."))

# ── 5 · PAZAR YERİ DİLİ ──────────────────────────────────────────────
# 🔴 Gökberk: "al-sat, ticaret, para kazan, ucuz lounge gibi pazar yeri
# kelimelerini kesinlikle reddedeceksin."
# ⚠️ "satın al" YASAK DEĞİL: kredi paketi gerçekten satın alınıyor ve
# ürünün hukuki savunması tam olarak buna dayanıyor ("satın aldığın şey
# giriş değil sorma hakkı"). Yasak olan, HAKKIN kendisini ticarileştiren
# dil. Bu ayrımı yapmayan bir nöbetçi, ürünün en dürüst cümlesini siler.
# 🆕 SINIF: "BİR KELİMEYİ YASAKLARKEN HANGİ NESNEYE BAĞLANDIĞINA BAK —
# YASAK KELİMEDE DEĞİL, KURDUĞU İLİŞKİDEDİR."
YASAK_SOZ = [
    (r"\bal[- ]?sat\b", "al-sat"),
    (r"\bticaret\b", "ticaret"),
    (r"\bpara kazan", "para kazan"),
    (r"\bucuz\s+(lounge|salon)", "ucuz lounge"),
    (r"\bpazarlık\b", "pazarlık"),
    (r"\bkâr\s+et\b|\bkar\s+et\b", "kâr et"),
]
for yol in sorted(glob.glob(os.path.join(KOK, "app", "**", "*.jsx"), recursive=True)) \
        + sorted(glob.glob(os.path.join(KOK, "components", "*.jsx"))) \
        + sorted(glob.glob(os.path.join(KOK, "lib", "*.js"))):
    bag = os.path.relpath(yol, KOK)
    if any(d in bag.split(os.sep) for d in MUAF_DIZIN):
        continue
    s = yorumsuz(open(yol, encoding="utf-8", errors="replace").read(), js=True)
    for no, satir in enumerate(s.split("\n"), 1):
        for kal, ad in YASAK_SOZ:
            if re.search(kal, satir, re.I):
                bulgu.append(("5 · dil", f"{bag}:{no}", ad,
                              "Pazar yeri dili. Karşılığı: hak paylaşımı · ağırlamak · "
                              "misafir olmak · kredi."))

print(f"tasarim_check · v5.9.0 mühür bulgusu: {len(bulgu)} (tavan 0)")
gorulen = set()
for kural, yer, deger, neden in bulgu[:16]:
    print(f"   [{kural}] {yer}  «{deger}»")
    if kural not in gorulen:
        print(f"      → {neden}")
        gorulen.add(kural)
if len(bulgu) > 16:
    print(f"   … ve {len(bulgu) - 16} tane daha")

if bulgu:
    print("\n✗ v5.9.0 MÜHRÜ AÇILMIŞ.")
    sys.exit(1)
print("✓ bento yok · çerçeve yok · ışık ≤%15 · form mühürlü · pazar yeri dili yok")
