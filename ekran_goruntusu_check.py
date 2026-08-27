#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ekran_goruntusu_check.py — SİTEDEKİ EKRAN GÖRÜNTÜLERİ HÂLÂ ÜRÜNÜ MÜ
GÖSTERİYOR?

🔴 NEDEN VAR — SİTENİN EN GÖRÜNÜR YERİ, ÜRÜNÜN EN ESKİ HÂLİ
Ana sayfanın kahraman alanındaki telefon rafı (`PhoneShelf`) mockup
değil, uygulamanın GERÇEK ekran görüntüleri: `public/screens/*.jpg`.
Dosya tarihleri 16 Ağustos. O günden bu yana ürün fotoğraflı bant,
sıcak palet, yeni düğme sistemi ve ortalı logo filigranı kazandı.

Yani siteye gelen biri, uygulamayı indirdiğinde GÖRDÜĞÜNDEN BAŞKA
bir şey görüyor. Bu, bir CSS token'ının eskimesinden daha ciddi:
kullanıcı "beklediğim uygulama bu değil" hissini indirdiği ilk
saniyede yaşıyor.

Ve hiçbir denetim bunu göremiyordu, çünkü hepsi METNE ve KODA bakıyor;
bir JPG'nin içinde ne olduğunu kimse sormuyordu.

🆕 SINIF: "KOD DENETİMLERİ, ÜRÜNÜN GÖRÜNTÜSÜNÜ TAŞIYAN VARLIKLARI
GÖRMEZ — BİR JPG'NİN BAYATLADIĞINI ANCAK ONA BİR SÜRÜM İLİŞTİRİRSEN
ANLAYABİLİRSİN."

NASIL ÇALIŞIR
`public/screens/SURUM.json` her görselin HANGİ APP SÜRÜMÜNDEN
alındığını tutar. Bu denetim onu `rnapp/app.json`daki güncel sürümle
karşılaştırır. Ana sürüm (major.minor) ilerlemişse 🔴.

Tazeleme kısa yol yok — gerçek cihazdan/emülatörden yeni görüntü
almak gerekir. Denetimin işi o borcu GÖRÜNÜR tutmak, kapatmak değil.
"""
import json
import os
import sys

KOK = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(os.path.dirname(KOK), "rnapp")
MANIFEST = os.path.join(KOK, "public", "screens", "SURUM.json")


def app_surumu():
    with open(os.path.join(APP, "app.json"), encoding="utf-8") as f:
        return json.load(f)["expo"]["version"]


def anahat(v):
    p = str(v).split(".")
    return ".".join(p[:2])


def main():
    guncel = app_surumu()
    print("=" * 74)
    print("EKRAN GÖRÜNTÜSÜ TAZELİK DENETİMİ — site ürünün hangi sürümünü gösteriyor?")
    print("=" * 74)
    if not os.path.exists(MANIFEST):
        print("  🔴 public/screens/SURUM.json yok — görsellerin hangi sürümden")
        print("     geldiği HİÇ kayıtlı değil. Bir görselin bayatladığını")
        print("     ancak ona bir sürüm iliştirirsen anlayabilirsin.")
        return 1
    m = json.load(open(MANIFEST, encoding="utf-8"))
    kayitli = m.get("app_surumu", "")
    tarih = m.get("alindi", "?")
    kabul = m.get("kabul_edildi", False)
    # 🔴 v3.3 — GÖRSELLER ARTIK CİHAZDAN DEĞİL, ÜRÜNÜN KAYNAĞINDAN
    # ÜRETİLİYOR (`rnapp/ekran_uret.py`). Bu, bayat bir cihaz
    # görüntüsünden daha DOĞRU ama cihazın kendisi DEĞİL.
    #
    # Manifest'e `tur` alanı eklendi ve bu denetim onu okumak ZORUNDA:
    # aksi hâlde sürüm numarası tazelenip yeşil yandığında, kimse
    # görsellerin cihazdan gelmediğini bir daha hatırlamayacaktı.
    #
    # 🆕 SINIF: "BİR NÖBETÇİYİ VEKİL BİR ÇIKTIYLA GEÇİYORSAN, NÖBETÇİYE
    # VEKİLİ TANIMAYI ÖĞRET — YOKSA ONU KAPATMIŞ OLURSUN."
    tur = m.get("tur")
    if tur not in ("cihaz", "render"):
        print()
        print("  🔴 SURUM.json'da `tur` alanı yok (cihaz | render).")
        print("     Görsellerin NASIL üretildiği kayıtlı değilse, tazelik")
        print("     numarası tek başına bir şey söylemez.")
        return 1
    dosyalar = m.get("gorseller", [])
    eksik = [d for d in dosyalar
             if not os.path.exists(os.path.join(KOK, "public", "screens", d))]

    print("  app güncel sürüm  : %s" % guncel)
    print("  görseller sürümü  : %s  (alındı: %s)" % (kayitli or "?", tarih))
    print("  kayıtlı görsel    : %d · diskte olmayan: %d" % (len(dosyalar), len(eksik)))
    for d in eksik:
        print("    ✗ %s — manifestte var, diskte yok" % d)

    bayat = anahat(kayitli) != anahat(guncel)
    if bayat and not kabul:
        print()
        print("  🔴 SİTE, ÜRÜNÜN %s SÜRÜMÜNÜ GÖSTERİYOR — güncel sürüm %s."
              % (kayitli or "?", guncel))
        print("     Arada değişenler kullanıcının İLK gördüğü şeyler:")
        for s in m.get("aradaki_degisiklikler", []):
            print("       · %s" % s)
        print()
        print("     Tazeleme: cihazda/emülatörde yeni görüntüleri al, ")
        print("     public/screens/ altına aynı adlarla koy, SURUM.json'da")
        print("     `app_surumu` ve `alindi` alanlarını güncelle.")
        print("     Bilerek eski görselle yayına çıkıyorsan `kabul_edildi: true`")
        print("     yaz — o zaman bu denetim ⚠ verir, kırmızı yanmaz.")
        return 1
    if eksik:
        return 1
    if bayat and kabul:
        print()
        print("  ⚠ KABUL EDİLDİ: görseller %s sürümünden, ürün %s. Bilinen borç."
              % (kayitli, guncel))
        return 0
    if tur == "render":
        print()
        print("  ⚠ GÖRSELLER CİHAZDAN DEĞİL, KAYNAKTAN RENDER (%s)."
              % m.get("uretici", "?"))
        print("     Sürüm güncel (%s) ve renk/geometri/metin ürünün kendi" % kayitli)
        print("     kaynağından geliyor — bayat cihaz görüntüsünden daha doğru.")
        print("     EKSİK OLAN: font hinting, durum çubuğu, güvenli alan ve")
        print("     platform bileşenleri (klavye, seçici). Cihaz görüntüsü")
        print("     alındığında `tur` alanını 'cihaz' yap.")
        return 0
    print("\n✓ Ekran görüntüleri ürünün güncel sürümünden (cihaz).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
