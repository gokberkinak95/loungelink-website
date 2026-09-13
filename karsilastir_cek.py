#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
karsilastir_cek.py — ESKİ ve YENİ tasarımın GERÇEK ekran görüntüsü.

🔴 NEDEN VAR — GÖKBERK, 13 EYLÜL
"loungelink-website.vercel.app'deki gibi uygulanmış bir tasarım
 önizlemesi vermediğin için yorum yapamıyorum."
Haklıydı: jenerik bir maket, ürünün kendi sayfası değildir. Bu betik
İKİ Next.js kopyasını da derleyip sunuyor ve AYNI kadrajları çekiyor —
yan yana konulabilsin diye aynı genişlik, aynı kaydırma noktaları.

🆕 SINIF: "BİR TASARIM ÖNERİSİ, ÜRÜNÜN KENDİ İÇERİĞİYLE ÇİZİLMEDEN
DEĞERLENDİRİLEMEZ — MAKET, ÖNERİNİN DEĞİL ÖNERENİN RESMİDİR."
"""
import os, sys, time, subprocess, socket, signal
from playwright.sync_api import sync_playwright

KOK = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(KOK, "..", "teslim", "site_karsilastirma")
os.makedirs(OUT, exist_ok=True)

# (etiket, klasör, port)
KOPYALAR = [
    ("eski", os.path.join(KOK, "..", "website"), 3211),
    ("yeni", KOK, 3212),
]

# Aynı kadrajlar: tam sayfa + üç kritik bölüm
KADRAJLAR = [
    ("01_kahraman", 0),
    ("02_kural_motoru", "#kural-motoru"),
    ("03_akis", "#akis"),
    ("04_plan", "#plan"),
]


def port_bekle(port, sn=90):
    t0 = time.time()
    while time.time() - t0 < sn:
        with socket.socket() as s:
            s.settimeout(0.6)
            if s.connect_ex(("127.0.0.1", port)) == 0:
                return True
        time.sleep(0.5)
    return False


def cek(etiket, klasor, port):
    print(f"\n── {etiket} · {klasor}")
    # Derle (zaten derliyse hızlı geçer)
    d = subprocess.run(["npm", "run", "build"], cwd=klasor,
                       capture_output=True, text=True, timeout=900)
    if d.returncode != 0:
        print("  ✗ derleme düştü:", d.stderr[-500:])
        return False
    srv = subprocess.Popen(["npx", "next", "start", "-p", str(port)], cwd=klasor,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                           preexec_fn=os.setsid)
    try:
        if not port_bekle(port):
            print("  ✗ sunucu açılmadı")
            return False
        with sync_playwright() as p:
            b = p.chromium.launch(args=["--no-sandbox"])
            # Masaüstü
            ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2,
                                locale="tr-TR")
            pg = ctx.new_page()
            pg.goto(f"http://127.0.0.1:{port}/", wait_until="networkidle")
            pg.wait_for_timeout(1800)
            for ad, hedef in KADRAJLAR:
                if hedef == 0:
                    pg.evaluate("window.scrollTo(0,0)")
                else:
                    try:
                        pg.evaluate(f"""() => {{
                          const e = document.querySelector('{hedef}');
                          if (e) window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - 20);
                        }}""")
                    except Exception:
                        continue
                pg.wait_for_timeout(900)
                pg.screenshot(path=os.path.join(OUT, f"{etiket}_{ad}.png"))
                print(f"  ✓ {etiket}_{ad}.png")
            # Tam sayfa
            pg.evaluate("window.scrollTo(0,0)")
            pg.wait_for_timeout(600)
            pg.screenshot(path=os.path.join(OUT, f"{etiket}_00_tam.png"), full_page=True)
            print(f"  ✓ {etiket}_00_tam.png (tam sayfa)")
            ctx.close()
            # Telefon
            ctx2 = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2,
                                 is_mobile=True, has_touch=True, locale="tr-TR")
            pg2 = ctx2.new_page()
            pg2.goto(f"http://127.0.0.1:{port}/", wait_until="networkidle")
            pg2.wait_for_timeout(1800)
            pg2.screenshot(path=os.path.join(OUT, f"{etiket}_05_telefon.png"))
            print(f"  ✓ {etiket}_05_telefon.png")
            ctx2.close()
            b.close()
        return True
    finally:
        try:
            os.killpg(os.getpgid(srv.pid), signal.SIGTERM)
        except Exception:
            pass
        time.sleep(1)


tamam = True
for etiket, klasor, port in KOPYALAR:
    if not cek(etiket, klasor, port):
        tamam = False

print("\nÇıktı:", os.path.abspath(OUT))
sys.exit(0 if tamam else 1)
