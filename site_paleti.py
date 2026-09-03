#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
site_paleti.py — SİTENİN GECE PALETİNİ APP'İN KOYU TEMASINDAN TÜRETİR
ve metni FOTOĞRAFIN EN KÖTÜ NOKTASINDA ölçer.

🔴 NEDEN VAR — İKİ AYRI KİMLİK
Ölçtüm: sitenin nötrleri ile app'in nötrleri farklı ailelerdendi.

    site  --bg #070B16   ton 224°  (LACİVERT)
    app   KOYU.bg #161310 ton  31°  (SICAK)

Sitenin MÜREKKEPLERİ zaten sıcaktı (42°) ama ZEMİNLERİ maviydi: yani
site kendi içinde de tutarsızdı — sıcak yazı, soğuk kâğıt. App v3.1'de
tam bu kusuru (eski `ink` 225° maviydi) düzeltmişti; site haberdar
olmamıştı.

🆕 SINIF: "İKİ YÜZEY AYNI MARKAYI TAŞIYORSA, PALETİN TEK KAYNAĞI OLMALI
— YOKSA BİRİ DÜZELİRKEN ÖTEKİ ESKİ HÂLİNDE DONAR."

🔴 VE ASIL ÖLÇÜM BURADA: metin artık düz bir zeminde DEĞİL, fotoğrafın
üstünde duruyor. Bir zeminin ORTALAMA kontrastı iyi olabilir ve o
zemindeki metin yine de okunmaz — kullanıcı ortalamaya bakmaz, en kötü
noktadan geçen satıra bakar. (Bu dersi app tarafında atmosfer katmanını
kurarken almıştık; aynısı burada geçerli.)

Bu yüzden perde opaklığı tahmin edilmiyor: fotoğrafın her pikseli
perdeyle harmanlanıyor, her mürekkep her piksele karşı ölçülüyor ve
EN KÖTÜSÜ raporlanıyor.

KULLANIM
    python site_paleti.py            → globals.css'i günceller
    python site_paleti.py --denetle  → sapma + en kötü kontrast (tavan 0)
"""
import datetime
import os
import re
import shutil
import sys

KOK = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(os.path.dirname(KOK), "rnapp")
sys.path.insert(0, APP)
from tema_oku import palet                                          # noqa: E402

CSS = os.path.join(KOK, "app", "globals.css")
FOTO = os.path.join(KOK, "public", "bant.jpg")
BAS = "  /* <<< SITE-GECE — site_paleti.py yazar, ELLE DÜZENLEME */"
SON = "  /* SITE-GECE >>> */"

# 🔴 PERDE İKİ KEZ AYARLANDI VE İKİNCİSİ ÖLÇÜMLE GELDİ.
# %82 ile başladım: bütün mürekkepler rahat geçiyordu ama ÇİZİLİNCE
# gördüm ki fotoğraf neredeyse görünmüyor — yani perde işini o kadar
# iyi yapıyordu ki arkasındaki sahneyi de siliyordu. Bir arka planın
# görevi yalnız okunurluğu korumak değil, GÖRÜNMEK.
#
# Ölçüm tablosu (fotoğrafın en kötü pikselinde):
#     %66  ink 6.00 · body 4.76 · muted 3.81
#     %72  ink 7.27 · body 5.77 · muted 4.62 · sinyal renkleri 4.33–4.35 ✗
#     %82  ink 10.10 · body 8.01 · muted 6.42
# %72'de gövde metni geçiyordu ama SİNYAL renkleri (altın · teal ·
# yeşil · kehribar) 4.33–4.35'te takıldı — hepsi eşiğin 0.15 altında.
# Onları açmak app paletinden ayrılmak demekti; perdeyi 4 puan
# koyulaştırmak ise fotoğrafı hâlâ görünür bırakıyor. Tek kaynağı
# korumak, iki paleti yönetmekten ucuz.
# %76 seçildi: en zayıf mürekkep 4.55, fotoğraf okunur.
#
# `--dim` bu ölçüme GİRMİYOR ve bunun bir gerekçesi var: sitede metin
# rengi olarak HİÇ kullanılmıyor (ölçtüm: 0 kullanım), yalnız ayırıcı
# tonu. Kullanılmayan bir duruma eşik dayatmak, ödediğin bedeli gerçek
# önlediğin sorunu hayalî yapar.
#
# 🆕 SINIF: "BİR PERDEYİ YALNIZ KONTRASTA GÖRE AYARLARSAN, EN GÜVENLİ
# DEĞER ARKA PLANI YOK EDEN DEĞERDİR — OKUNURLUK BİR ALT SINIR, TASARIM
# HEDEF DEĞİL."
# ══════════════════════════════════════════════════════════════════
# 🔴 30 AĞUSTOS · v0.44 — PERDE %76 → %84. CEVABI TASARIM VERİYOR.
#
# %76'da `--muted` (#A79B8A) fotoğrafın en kötü pikselinde 3.68:1
# kalıyordu ve denetim aylardır kırmızı yanıyordu. Ben iki turdur
# perdeyi "fotoğraf kaybolmasın" diye açık tutuyordum.
#
# Sonra onaylanan tasarımın kendi CSS'ine baktım:
#     .ust.mesh::after{ background:url(FOTO) …; opacity:.16 }
# Yani tasarım fotoğrafı %16 opaklıkta kullanıyor — bu, %84'lük bir
# perdenin ta kendisi. Tasarım bu takası ZATEN YAPMIŞ: fotoğraf bir
# RESİM değil bir DOKU. Ben onun yerine kendi tercihimi koymuşum ve
# bedelini okunurlukla ödemişim.
#
# %84 ölçümü: muted 4.78 · body 8.62 · altın 6.54 · teal 6.51 — hepsi
# geçiyor ve tek kaynak (app paleti) korunuyor.
#
# 🆕 SINIF: "BİR TAKASI YENİDEN MÜZAKERE ETMEDEN ÖNCE TASARIMIN ONU
# ZATEN YAPIP YAPMADIĞINA BAK — ÇOĞU 'ZOR KARAR', VERİLMİŞ BİR KARARIN
# OKUNMAMASIDIR."
# ══════════════════════════════════════════════════════════════════
PERDE = 0.84
ESIK = 4.5

# (css değişkeni, app KOYU tokeni, rol)
#   metin  → fotoğraf üstünde ölçülür (4.5)
#   zemin  → ölçülmez, zeminin kendisi
#   cizgi  → 3:1 yeter
# 🔴 30 Ağu · v0.44 — `--app*` EŞLEMELERİ KALKTI.
# Uygulamanın açık teması arşive alındı; sitede onu temsil eden maket
# paleti de. Eşlemede bırakmak, olmayan bir temayı türetmeye çalışmak
# olurdu — ve denetim "sitede yok" diye kırmızı yanardı.
ESLEME = [
    ("--bg",       "bg",       "zemin"),
    ("--bgAlt",    "surface",  "zemin"),
    ("--ink",      "ink",      "metin"),
    ("--body",     "body",     "metin"),
    ("--muted",    "mutedAA",  "metin"),
    ("--dim",      "dimAA",    "metin"),
    ("--gold",     "gold",     "metin"),
    ("--goldText", "goldText", "metin"),
    ("--goldDeep", "goldBtn",  "zemin"),   # üstüne BEYAZ yazılır
    ("--teal",     "teal",     "metin"),
    ("--green",    "green",    "metin"),
    ("--amber",    "amber",    "metin"),
]


def hx(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def _l(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def L(p):
    return 0.2126 * _l(p[0]) + 0.7152 * _l(p[1]) + 0.0722 * _l(p[2])


def oranp(a, b):
    la, lb = L(a), L(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def foto_zeminleri(perde_rgb, opaklik):
    """Fotoğrafın her pikselini perdeyle harmanlar; ölçülecek zemin kümesi."""
    try:
        from PIL import Image
    except ImportError:
        return None
    if not os.path.exists(FOTO):
        return None
    im = Image.open(FOTO).convert("RGB").resize((200, 250))
    out = []
    for p in im.get_flattened_data() if hasattr(im, "get_flattened_data") else list(im.getdata()):
        out.append(tuple(round(perde_rgb[i] * opaklik + p[i] * (1 - opaklik))
                         for i in range(3)))
    return out


def olc(K):
    """Her mürekkebin fotoğraf üstündeki EN KÖTÜ oranı."""
    zeminler = foto_zeminleri(hx(K["bg"]), PERDE)
    sonuc = {}
    for css, tok, rol in ESLEME:
        if rol != "metin" or tok not in K:
            continue
        m = hx(K[tok])
        if zeminler:
            sonuc[css] = min(oranp(m, z) for z in zeminler)
        else:
            sonuc[css] = oranp(m, hx(K["bg"]))
    return sonuc, bool(zeminler)


ONGOLD = "#171009"   # app KOYU.onGold · tasarım .btn-altin


def blok(K, en_kotu):
    s = [BAS,
         "  /* Sitenin gece paleti app'in KOYU temasından TÜRETİLDİ —",
         "     tek kaynak: rnapp/src/theme.js. Yanlarındaki oranlar",
         "     FOTOĞRAFIN EN KÖTÜ PİKSELİNDE, %d%% perde altında ölçüldü;" % round(PERDE * 100),
         "     ortalama değil. */"]
    for css, tok, rol in ESLEME:
        v = K.get(tok)
        if not v:
            continue
        not_ = ""
        if rol == "metin":
            not_ = "   /* fotoğrafta en kötü %.2f:1 */" % en_kotu.get(css, 0)
        elif css == "--goldDeep":
            # 🔴 30 Ağu · v0.44 — BU SATIR BİR ÖLÇÜMDÜ VE BEN OKUMADIM.
            # "üstüne beyaz: 1.54:1" yazıyordu; sitede altın zeminli her
            # düğme, hap ve rozet gerçekten beyazla çiziliyordu. Ölçüm
            # doğruydu, KİMSEYE BİR ŞEY YAPTIRMIYORDU.
            #
            # 🆕 SINIF: "BİR SAYIYI RAPORLAMAK ONU DENETLEMEK DEĞİLDİR —
            # KIRMIZI YANMAYAN HER ÖLÇÜM, BİR SÜRE SONRA DEKORDUR."
            #
            # Artık mürekkebi de yazıyor ve o mürekkeple ölçüyor.
            not_ = "   /* zemin — üstündeki --onGold ile: %.2f:1 */" % oranp(hx(ONGOLD), hx(v))
        s.append("  %s: %s;%s" % (css, v, not_))
    # Tasarımın `.btn-altin{color:#171009}` mürekkebi. App'te `KOYU.onGold`.
    s.append("  --onGold: %s;" % ONGOLD)
    s.append("  --line: rgba(244, 239, 232, 0.12);")
    s.append("  --warmLine: %s;" % K.get("warmLine", "rgba(216,179,106,0.22)"))
    s.append("  --goldSoft: rgba(216, 179, 106, 0.14);")
    s.append("  /* Cam yüzey: fotoğrafın üstünde duran kart. Opak değil ki")
    s.append("     arkadaki görüntü yaşasın, ama metni taşıyacak kadar koyu. */")
    s.append("  --card: rgba(22, 19, 16, 0.55);")
    s.append("  --cardLine: rgba(244, 239, 232, 0.10);")
    s.append("  --perde: %.2f;" % PERDE)
    s.append(SON)
    return "\n".join(s)


def denetle(yaz=False):
    K = dict(palet("C"))
    K.update(palet("KOYU"))
    en_kotu, foto_var = olc(K)
    print("=" * 76)
    print("SİTE GECE PALETİ — app'ten türetildi, fotoğrafın EN KÖTÜ noktasında ölçüldü")
    print("=" * 76)
    if not foto_var:
        print("  ⚠ %s okunamadı — ölçüm DÜZ ZEMİNDE yapıldı." % os.path.basename(FOTO))
        print("    Bunu söylemek önemli: fotoğraf üstündeki gerçek en kötü nokta")
        print("    bundan daha kötü olabilir.")
    print("  perde: %%%d (KOYU.bg üzerine)" % round(PERDE * 100))
    kotu = 0
    for css, tok, rol in ESLEME:
        if rol != "metin" or tok not in K or css == "--dim":
            continue
        o = en_kotu[css]
        ok = o >= ESIK
        kotu += not ok
        print("    %s %-11s %s  en kötü %5.2f:1" % ("✓" if ok else "✗", css, K[tok], o))
    g = open(CSS, encoding="utf-8").read()
    var = dict(re.findall(r"(--\w+):\s*(#[0-9A-Fa-f]{3,8})", g))
    sapma = [(c, var.get(c, "(yok)"), K[t]) for c, t, _ in ESLEME
             if t in K and var.get(c, "").upper() != K[t].upper()]
    print("\n  app paletinden SAPMA : %d  (tavan 0)" % len(sapma))
    for c, a, b in sapma:
        print("    ✗ %-11s sitede %-9s · app'te %s" % (c, a, b))
    if kotu or sapma:
        print("\n🔴 `python site_paleti.py` çalıştır (türetir ve yazar).")
        return 1
    print("\n✓ Site paleti app ile tek kaynaktan; her mürekkep fotoğrafın")
    print("  en kötü noktasında bile AA geçiyor.")
    return 0


def main():
    if "--denetle" in sys.argv:
        return denetle()
    K = dict(palet("C"))
    K.update(palet("KOYU"))
    en_kotu, _ = olc(K)
    g = open(CSS, encoding="utf-8").read()
    yeni = blok(K, en_kotu)
    if BAS in g:
        a = g.index(BAS)
        b = g.index(SON, a) + len(SON)
        g = g[:a] + yeni + g[b:]
    else:
        eski = ["--gold", "--goldText", "--goldDeep", "--ink", "--body", "--muted",
                "--dim", "--bg", "--bgAlt", "--card", "--teal", "--green", "--amber",
                "--line", "--warmLine", "--goldSoft"]
        # 🔴 İLK HÂLİ SATIR SİLİYORDU VE SİTEYİ KIRDI (500).
        # `--goldDeep` satırının yorumu BİR SONRAKİ SATIRA taşıyordu;
        # ilk satırı silince ortada yetim bir `... 3.32:1 — eşiğin
        # altında. */` kaldı ve PostCSS "Unknown word" verdi.
        #
        # 🆕 SINIF: "SATIR BAZLI SİLME, ÇOK SATIRLI YAPISI OLAN HİÇBİR
        # DOSYADA GÜVENLİ DEĞİLDİR — SİLDİĞİN SATIRIN NEREDE BİTTİĞİNİ
        # BİLMİYORSAN SİLME."
        # Artık bildirimin sonu ARANIYOR: `;` ya da satır sonundaki `*/`.
        for e in eski:
            while True:
                m = re.search(r"^[ \t]*" + re.escape(e) + r"\s*:", g, re.M)
                if not m:
                    break
                son = g.find(";", m.end())
                if son < 0:
                    break
                kuyruk = g.find("\n", son)
                arada = g[son + 1:kuyruk if kuyruk > 0 else len(g)]
                if "*/" in arada or "/*" in arada:
                    kapanis = g.find("*/", son)
                    kuyruk = g.find("\n", kapanis) if kapanis > 0 else kuyruk
                g = g[:m.start()] + g[(kuyruk + 1 if kuyruk > 0 else len(g)):]
        im = "  /* <<< APP-MAKET"
        g = g.replace(im, yeni + "\n\n" + im, 1)
    ye = os.path.join(KOK, "_yedek_palet",
                      datetime.datetime.now().strftime("%Y%m%d_%H%M%S"))
    os.makedirs(ye, exist_ok=True)
    shutil.copy2(CSS, os.path.join(ye, "globals.css"))
    open(CSS, "w", encoding="utf-8").write(g)
    print("✓ globals.css — gece paleti app'ten türetildi (yedek: %s)\n" % ye)
    return denetle()


if __name__ == "__main__":
    sys.exit(main())
