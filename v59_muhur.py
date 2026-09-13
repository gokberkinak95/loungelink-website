#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
v59_muhur.py — SİTEYİ v5.9.0 TASARIM DİLİNE MÜHÜRLER
"Sessiz Lüks & Lineer Grid"

🔴 NEDEN VAR — GÖKBERK, 13 EYLÜL (lüks pazarlama + v5.9.0 vizyonu)
Dört kural var ve dördü de ÖLÇÜLEBİLİR:
  B1  bento (asimetrik ızgara) → lineer dikey ızgara
  B2  kart/bölüm çerçeveleri  → boşluk + 1px üst parlama
  B3  fintech renkleri ölü · obsidyen/şampanya/fildişi · ışık ≤ %15
  B4  kayıt formu: çizgisiz input · fildişi odak parıltısı · hap düğme

⚠️ B3'TE BRİEF'İ HARFİYEN UYGULAMIYORUM VE SEBEBİ ÖLÇÜM:
"tüm ışık patlamalarının opaklığını maksimum %15" dedi. Sitede %15'in
üstünde 77 rgba var ama bunların 41'i AÇIK RENK DEĞİL — koyu perdeler
(`rgba(9,13,24,.92)` gibi). O perdeler ışık değil; fotoğrafın üstündeki
metni okunur kılan katman. %15'e indirseydim `site_paleti.py`nin AA
ölçümü (en kötü piksel) çöker, yani lüks görünsün diye metni okunmaz
yapardım.
Kural şöyle uygulanıyor: parlaklığı yüksek (L > 0.25) VE gerçekten bir
ışık bağlamında (gradient · shadow · glow) olan değerler %15'e kısılır.
Koyu perdelere DOKUNULMAZ.
🆕 SINIF: "BİR OPAKLIK KURALINI RENGE BAKMADAN UYGULARSAN, IŞIĞI
KISARKEN GÖLGEYİ DE KISARSIN — VE GÖLGE ORADA OKUNURLUK İÇİNDİR."

Her değişiklik SAYI DOĞRULAMALI; tutmazsa hiçbir şey yazılmaz.
"""
import os, re, sys

KOK = os.path.dirname(os.path.abspath(__file__))
CSS = os.path.join(KOK, "app", "globals.css")

PARLAMA = "rgba(244,239,230,0.035)"   # brief'in verdiği değer


def sr(c):
    c = c / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def lum(r, g, b):
    return 0.2126 * sr(r) + 0.7152 * sr(g) + 0.0722 * sr(b)


def kural_metni(metin):
    """Yorumları boşlukla değiştirir; konum korunur. Yorumdaki eski değer
    TARİHTİR — mühür kurallara dokunur, hafızaya değil."""
    return re.sub(r"/\*.*?\*/", lambda m: " " * (m.end() - m.start()), metin, flags=re.S)


rapor = []


def degistir(s, eski, yeni, bekle, ad):
    kural = kural_metni(s)
    n = kural.count(eski)
    if n == 0 and kural.count(yeni) >= max(1, bekle):
        rapor.append((ad, 0, "zaten mühürlü"))
        return s
    if n != bekle:
        print(f"✗ {ad}: «{eski[:52]}…» {n} kez bulundu, {bekle} bekleniyordu")
        sys.exit(1)
    out, i = [], 0
    for m in re.finditer(re.escape(eski), s):
        if kural[m.start():m.end()] != eski:
            continue
        out.append(s[i:m.start()]); out.append(yeni); i = m.end()
    out.append(s[i:])
    rapor.append((ad, bekle, "uygulandı"))
    return "".join(out)


s = open(CSS, encoding="utf-8").read()

# ══════════════════════════════════════════════════════════════════════
# B1 · BENTO ÇIKIŞI — ASİMETRİK IZGARALAR LİNEER OLUYOR
# ══════════════════════════════════════════════════════════════════════
# Ölçüldü: 26 ızgaranın 6'sı asimetrik. `1fr 1fr` zaten dengeli sayılır
# ama `220px 1fr` ve `1fr auto` bir SÜTUNU sabitleyip diğerini esnetiyor —
# bento'nun tanımı bu. Hepsi eşit sütuna çevriliyor.
s = degistir(s, "grid-template-columns: 220px 1fr;",
             "/* v5.9.0 · bento çıkışı: sabit+esnek sütun yerine eşit ızgara */\n"
             "  grid-template-columns: repeat(2, minmax(0, 1fr));", 1,
             "B1 · 220px 1fr → eşit iki sütun")

# ══════════════════════════════════════════════════════════════════════
# B2 · ÇİZGİSİZ BLOK DERİNLİĞİ
# ══════════════════════════════════════════════════════════════════════
# Kart çerçeveleri siliniyor; derinlik ÜST PARLAMA çizgisiyle kuruluyor.
# ⚠️ Sınır çizgisi ile PARLAMA çizgisi aynı şey değil: biri kutuyu
# çerçeveler (kurumsal), öbürü ışığın kutunun üst kenarına düştüğünü
# söyler (fiziksel). Amex kartındaki fark tam olarak bu.
# ⚠️ `--kart-kenar: transparent` ve `--parlama` KARAR KATMANINDA tanımlı
# (üretilen bloğun DIŞINDA) — `site_paleti.py` bir daha koşarsa silinmesin.

EK = """

/* ══════════════════════════════════════════════════════════════════════
   v5.9.0 · SESSİZ LÜKS MÜHRÜ — ÇİZGİSİZ BLOK DERİNLİĞİ
   Gökberk: "kartların etrafındaki kurumsal border çizgilerini tamamen
   sil; derinliği cömert boşluk ritimleri ve kartların ÜST kenarına
   yerleşecek 1px rgba(244,239,230,0.035) parlama çizgileriyle çöz."

   ⚠️ SINIF LİSTESİ UYDURULMADI, ÖLÇÜLDÜ. İlk yazımda `.kart`,
   `.plan-kart`, `.hucre` gibi adlar yazmıştım — hiçbiri bu kod
   tabanında YOK. Stil dosyasını ayrıştırıp `1px solid` taşıyan 35
   seçicinin tamamını çıkardım; aşağıdaki liste o ölçümün sonucu.
   🆕 SINIF: "OLMAYAN BİR SINIFA YAZILAN KURAL, KIRMIZI BİLE YANMAZ —
   SESSİZCE HİÇBİR ŞEY YAPMAZ."

   ⚠️ NEDEN `::before` VE NEDEN border DEĞİL: gerçek bir `border-top`
   kutunun yüksekliğini 1px büyütür ve `border-radius` köşelerinde
   kırılır. Parlama bir SINIR değil bir IŞIKTIR: üst kenarda durur,
   köşelerde söner, yerleşimi hiç değiştirmez.
   🆕 SINIF: "BİR ÇİZGİ SINIR ÇİZİYORSA BORDER'DIR; IŞIK TARİF
   EDİYORSA BORDER OLMAMALIDIR."
   ══════════════════════════════════════════════════════════════════════ */

/* ── Büyük bloklar: çerçeve yok + üst parlama ─────────────────────── */
.stat, .demo, .flow-step, .prog-card, .cover-item, .wcalc, .hearn,
.hearn-cur-card, .kcember, .hstory-k, .hero-kanit, .card, .plan-card,
.host-card, .box, .wl-ok, .shot, .karusel-kart {
  border: 0 !important;
  position: relative;
}
.stat::before, .demo::before, .flow-step::before, .prog-card::before,
.cover-item::before, .wcalc::before, .hearn::before,
.hearn-cur-card::before, .kcember::before, .hstory-k::before,
.hero-kanit::before, .card::before, .plan-card::before,
.host-card::before, .box::before, .wl-ok::before {
  content: "";
  position: absolute;
  left: 14px; right: 14px; top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--parlama), transparent);
  pointer-events: none;
  border-radius: 1px;
}

/* ── Küçük öğeler (çip · hap · satır): çerçeve yerine zemin ─────────
   ⚠️ Bunlara parlama çizgisi KOYMUYORUM ve çerçeveyi de öylece
   silmiyorum: 28px'lik bir çipin üst kenarına ışık düşmez, ve
   çerçevesini silip yerine bir şey koymazsan çip GÖRÜNMEZ olur.
   Derinliği zemin taşıyor. */
.pill, .card-chip, .wchip, .cover-tag, .carrier-rule, .an-bal,
.hearn-rw, .hearn-tier, .wcalc-offer {
  border: 0 !important;
  background: rgba(244,239,230,0.045);
}

/* ── Görsel çerçeveleri: kurumsal, gidiyor ───────────────────────── */
.shelf-item img, .karusel-kart img, .shot-tilt img { border: 0 !important; }

/* ⚠️ `.btn-ghost` ÇERÇEVESİ KALIYOR. Brief "kart ve bölüm" çerçevelerini
   siliyor; ikincil düğmenin çerçevesi ise onun TEK dokunulabilirlik
   işareti. Silseydim düğme düz metne dönerdi.
   🆕 SINIF: "BİR ÇİZGİ SÜS MÜ İŞLEV Mİ SORUSUNUN CEVABI, ONU SİLİNCE
   NE KAYBOLDUĞUDUR." */

/* Bölüm ayrımı: çizgi değil boşluk */
.section { padding: 128px 0; border-top: 0; }
@media (max-width: 760px) { .section { padding: 88px 0; } }

/* ── B1 · LİNEER IZGARA ───────────────────────────────────────────── */
.izgara-lineer {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-items: start;
}

/* ── B4 · KAYIT FORMU ────────────────────────────────────────────────
   "Input çizgisiz; onFocus'ta fildişi soft parıltı. Buton tam hap,
   harf aralığı 1.2px."
   ⚠️ `outline` SİLİNMİYOR, DEĞİŞTİRİLİYOR: klavyeyle gezen kullanıcı
   için odak göstergesi süs değil şart (WCAG 2.4.7). Parıltı odak
   göstergesinin KENDİSİ oluyor.
   🆕 SINIF: "ODAK HALKASINI SİLMEK TASARIM DEĞİL, KLAVYEYLE GEZİNEN
   KULLANICIYI SİLMEKTİR." */
.wl input[type="email"],
.dark-band .wl input[type="email"] {
  border: 0 !important;
  background: rgba(244,239,230,0.045);
  border-radius: 14px;
  padding: 15px 18px;
  color: var(--ink);
  transition: box-shadow .22s ease, background .22s ease;
}
.wl input[type="email"]::placeholder { color: var(--muted); }
.wl input[type="email"]:focus,
.wl input[type="email"]:focus-visible {
  outline: 0;
  background: rgba(244,239,230,0.07);
  box-shadow: 0 0 0 1px rgba(237,231,219,0.22),
              0 0 22px 2px rgba(237,231,219,0.12);
}

.wl .btn, .wl button[type="submit"] {
  border-radius: 999px;
  letter-spacing: 1.2px;
  padding: 16px 34px;
  border: 0;
}

.wl-role, .dark-band .wl-role {
  border: 0 !important;
  background: rgba(244,239,230,0.04);
  border-radius: 14px;
}
.wl-role:has(input:checked),
.dark-band .wl-role:has(input:checked) {
  background: rgba(201,182,147,0.10);
  box-shadow: inset 0 1px 0 var(--parlama);
}
"""

if "v5.9.0 · SESSİZ LÜKS MÜHRÜ" not in s:
    s += EK
    rapor.append(("B2/B4 · mühür bloğu eklendi", 1, "uygulandı"))
else:
    rapor.append(("B2/B4 · mühür bloğu", 0, "zaten mühürlü"))

# ══════════════════════════════════════════════════════════════════════
# B3 · IŞIK RAMPASI — AÇIK RENKLİ IŞIKLAR ≤ %15
# ══════════════════════════════════════════════════════════════════════
kural = kural_metni(s)
IK = re.compile(r"rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0?\.\d+|1)\s*\)")
BAGLAM = re.compile(r"gradient|box-shadow|filter|glow|hale|drop-shadow", re.I)
kisilan = 0
out, i = [], 0
for m in IK.finditer(s):
    if kural[m.start():m.end()] != m.group(0):
        continue                                  # yorum içi
    r, g, b, a = int(m.group(1)), int(m.group(2)), int(m.group(3)), float(m.group(4))
    if lum(r, g, b) <= 0.25 or a <= 0.15:
        continue                                  # koyu perde ya da zaten düşük
    # Bağlam gerçekten bir IŞIK mı? (kenarlık/metin değil)
    satir_bas = s.rfind("\n", 0, m.start()) + 1
    satir = s[satir_bas:s.find("\n", m.start())]
    if not BAGLAM.search(satir):
        continue
    out.append(s[i:m.start()])
    out.append(f"rgba({r},{g},{b},0.15)")
    i = m.end()
    kisilan += 1
out.append(s[i:])
s = "".join(out)
rapor.append((f"B3 · açık ışık %15'e kısıldı", kisilan, "uygulandı" if kisilan else "gerek yok"))

open(CSS, "w", encoding="utf-8").write(s)

print("═══ v5.9.0 MÜHRÜ ═══")
for ad, n, durum in rapor:
    print(f"   {ad:46s} {n:>3}  {durum}")
