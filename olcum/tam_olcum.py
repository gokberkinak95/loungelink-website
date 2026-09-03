# -*- coding: utf-8 -*-
"""
TAM ÖLÇÜM v2 — 10 sayfa × 7 cihaz, dört ölçüm birden.

v1'e göre düzeltilen üç yanlış alarm (bkz. /tmp/kontrast_dogru.py):
  1) yalnız DOĞRUDAN metin düğümü olan öge ölçülür (çocuğun boyadığı
     metni ataya yazmak yanlış kırmızı üretiyordu),
  2) gradient zeminli öge "ÖLÇÜLEMEDİ" sayılır, arkasındaki renge
     düşülmez,
  3) `div` de taranır (içinde doğrudan metin taşıyan div'ler
     tamamen ölçüm dışı kalıyordu).
"""
from playwright.sync_api import sync_playwright
from collections import Counter
import json, os, sys, urllib.request
CH="/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
BASE="http://localhost:3401"

# ============================================================
# 🔴 SÜRÜM KAPISI — ölçmeden önce "neyi ölçüyorum?"
#
# 21 Ağustos: bu araç 3 taşma + 1407 dokunma ihlali raporladı ve bir
# an yeni bloğun her şeyi kırdığını sandım. Gerçek sebep: 3401
# portunda AYLAR ÖNCEKİ bir derlemeyi sunan eski bir `next-server`
# süreci ayaktaydı. Süreç adı "next-server" olduğu için
# `pkill -f "next start"` onu öldürmemişti; benim başlattığım yeni
# sunucu portu alamadı, eski olan cevap verdi ve ölçüm sessizce
# YANLIŞ SİTEYİ ölçtü.
#
# 🆕 SINIF: **"BİR ÖLÇÜM, NEYİ ÖLÇTÜĞÜNÜ İSPAT EDEMİYORSA ÖLÇÜM
# DEĞİLDİR."**  (scripts/konum.js ile aynı sınıf: doğru işi yanlış
# klasörde yapmak.)
#
# app/layout.jsx artık <meta name="ll-surum"> basıyor. Burada
# package.json ile karşılaştırılıyor; tutmuyorsa TEK ÖLÇÜM
# YAPILMADAN duruyoruz.
# ============================================================
_KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_BEKLENEN_SURUM = json.load(open(os.path.join(_KOK, "package.json"), encoding="utf-8"))["version"]
try:
    _html = urllib.request.urlopen(BASE + "/", timeout=10).read().decode("utf-8", "replace")
except Exception as e:
    print("="*76); print(f"🔴 SUNUCU YOK — {BASE} açılmıyor ({e})")
    print("   npm run build   sonra   npx next start -p 3401"); print("="*76)
    sys.exit(2)
import re as _re
_m = _re.search(r'name="ll-surum"\s+content="([^"]+)"', _html)
_sunulan = _m.group(1) if _m else None
if _sunulan != _BEKLENEN_SURUM:
    print("="*76)
    print("🔴 YANLIŞ SÜRÜM SUNULUYOR — HİÇ ÖLÇÜM YAPILMADI.")
    print(f"   package.json : {_BEKLENEN_SURUM}")
    print(f"   {BASE} : {_sunulan or '(damga yok — çok eski derleme)'}")
    print("   Muhtemel sebep: portu tutan ESKİ bir next-server süreci var.")
    print("   Çözüm:  pkill -f next-server   &&   npm run build   &&   npx next start -p 3401")
    print("="*76)
    sys.exit(2)
print(f"✓ sürüm kapısı: {BASE} → v{_sunulan} (package.json ile aynı)")

SAYFALAR=["/","/kartlar","/rehber","/gizlilik","/kosullar","/cerez","/aydinlatma",
          "/hesap-sil","/kart/elite-plus-ist-ic-hat","/rehber/elite-plus-ist"]
CIHAZLAR=[("iPhone SE",320,568),("iPhone 12",390,844),("Android",412,915),
          ("iPad",768,1024),("Laptop",1280,800),("Masaüstü",1440,900),("Geniş",1920,1080)]

JS=r"""() => {
  const parse=s=>{const m=s.match(/rgba?\(([^)]+)\)/);if(!m)return null;
    const p=m[1].split(',').map(parseFloat);return {rgb:p.slice(0,3),a:p.length>3?p[3]:1};};
  const lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);};
    return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]);};
  const sel=el=>el.tagName.toLowerCase()+(typeof el.className==='string'&&el.className.trim()
      ? '.'+el.className.trim().split(/\s+/).slice(0,2).join('.') : '');
  // 🔴 21 AĞUSTOS — bgOf ESKİDEN GRADIENT GÖRÜNCE PES EDİYORDU.
  // "belirsiz:true" dönüyor, o metin ÖLÇÜLEMEDİ sayılıp geçiliyordu.
  // Sonuç: .host-band (gradient) içindeki HER metin ölçüm dışıydı ve
  // rapor yine de "kontrast 0" diyordu. Bugün oraya yeni bir blok
  // yazdım, elle hesapladım ve İKİ AA İHLALİ buldum — araç sussaydı
  // canlıya çıkacaklardı.
  // 🆕 SINIF: **"BİR ARACIN ÖLÇEMEDİĞİ YER, SORUNUN OLMADIĞI YER
  // DEĞİL — SORUNUN SAKLANDIĞI YERDİR."**
  //
  // Yeni davranış, elle yaptığım hesabın aynısı:
  //   1) Saydam katmanlar (alpha<1) yukarı doğru TOPLANIR, atılmaz.
  //   2) Gradient bulunursa duraklarının HEPSİ aday zemin olur.
  //   3) Katmanlar her adayın üstüne bindirilir; EN KÖTÜ oran raporlanır.
  // Aday çıkarılamazsa (örn. url() zemin) yine ÖLÇÜLEMEDİ denir —
  // uydurmuyoruz.
  const kar=(ust,alt)=>[0,1,2].map(i=>alt[i]*(1-ust.a)+ust.rgb[i]*ust.a);
  const duraklar=s=>{const out=[];
    const re=/rgba?\(([^)]+)\)|#([0-9a-fA-F]{6})\b/g; let m;
    while((m=re.exec(s))){ if(m[1]){const p=m[1].split(',').map(parseFloat);
        if(p.length<4||p[3]>0.5) out.push(p.slice(0,3)); }
      else {const h=m[2]; out.push([0,2,4].map(i=>parseInt(h.substr(i,2),16)));}}
    return out;};
  const bgOf=el=>{let n=el; const katman=[];
    while(n&&n!==document.documentElement){
      const cs=getComputedStyle(n);
      const bi=cs.backgroundImage||'';
      if(bi.includes('gradient')){
        const ad=duraklar(bi);
        if(ad.length) return {adaylar:ad,katman:katman.slice(),kim:sel(n)+'(gradient)'};
        return {belirsiz:true,kim:sel(n)};
      }
      if(bi&&bi!=='none') return {belirsiz:true,kim:sel(n)+'(görsel zemin)'};
      const b=parse(cs.backgroundColor);
      if(b&&b.a>0.99) return {adaylar:[b.rgb],katman:katman.slice(),kim:sel(n)};
      if(b&&b.a>0.001) katman.unshift(b);       // saydam katman: sakla
      n=n.parentElement;}
    return {adaylar:[[255,255,255]],katman:katman.slice(),kim:'(varsayilan)'};};

  // 1) yatay tasma
  const de=document.documentElement;
  const tasma=Math.max(0,de.scrollWidth-de.clientWidth); const tasanlar=[];
  if(tasma>1) document.querySelectorAll('*').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.right>de.clientWidth+1&&r.width>0) tasanlar.push(sel(el)+' +'+Math.round(r.right-de.clientWidth)+'px');});

  // 2) gorsel orani
  const gorsel=[];
  // 🔴 v0.51 — 3B DÖNMÜŞ GÖRSEL ORAN ÖLÇÜMÜNDEN MUAF. Karuselin komşu
  // kartları rotateY ile duruyor; getBoundingClientRect döndürülmüş
  // kutunun izdüşümünü verir ve oran "bozuk" görünür (2.60 ↔ 2.16).
  // Görsel bozuk değil, ölçüm yanlış soruyu soruyor. Muaf sayısı
  // AYRICA raporlanır — sessizce düşülmez.
  let gorselMuaf=0;
  const donmus=el=>{for(let e=el;e&&e!==document.body;e=e.parentElement){
    const tr=getComputedStyle(e).transform; if(tr&&tr.startsWith('matrix3d')) return true;} return false;};
  document.querySelectorAll('img').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.width<5||!el.naturalWidth) return;
    if(donmus(el)){gorselMuaf++; return;}
    const c=r.height/r.width, d=el.naturalHeight/el.naturalWidth;
    if(Math.abs(c-d)>0.15) gorsel.push((el.getAttribute('src')||'').split('/').pop()+' '+c.toFixed(2)+' yerine '+d.toFixed(2));});

  // 3) kontrast
  let metin=0, olculemedi=0; const dusuk=[];
  document.querySelectorAll('h1,h2,h3,h4,h5,p,li,a,span,div,legend,figcaption,em,b,strong,td,th,label,dd,dt,summary')
   .forEach(el=>{
    let dog=''; el.childNodes.forEach(n=>{if(n.nodeType===3) dog+=n.textContent;}); dog=dog.trim();
    if(dog.length<3) return;
    const r=el.getBoundingClientRect(); if(r.width<12||r.height<6) return;
    const cs=getComputedStyle(el);
    if(cs.visibility==='hidden'||cs.display==='none'||parseFloat(cs.opacity)<0.3) return;
    const fg=parse(cs.color); if(!fg||fg.a<0.3) return;
    const bg=bgOf(el); if(bg.belirsiz){olculemedi++;return;}
    metin++;
    // EN KÖTÜ aday raporlanır: gradient'in bir durağında geçip
    // diğerinde kalan metin, GEÇMİŞ sayılmaz.
    let o=Infinity;
    for(const aday of bg.adaylar){
      let z=aday; for(const k of bg.katman) z=kar(k,z);
      const t=(Math.max(lum(fg.rgb),lum(z))+.05)/(Math.min(lum(fg.rgb),lum(z))+.05);
      if(t<o) o=t;}
    const bo=parseFloat(cs.fontSize), kalin=parseInt(cs.fontWeight)>=700;
    const esik=(bo>=24||(bo>=18.66&&kalin))?3:4.5;
    if(o<esik) dusuk.push(sel(el)+' "'+dog.slice(0,22)+'" '+o.toFixed(2)+'<'+esik+' zemin='+(bg.kim));});

  // 4) dokunma hedefi
  // 🔴 44px kuralı BAĞIMSIZ KONTROLLER için geçerlidir. Bir cümlenin
  // ortasındaki bağlantıyı 44px yapmak mümkün değil (satır yüksekliği
  // kadar olur) ve gerekli de değil — WCAG 2.5.5 "inline" istisnası.
  // Onay kutusu da 13px'tir ama dokunma alanı onu saran <label>'dır.
  // Bu ikisini "ihlal" saymak, ölçümü gürültüye boğar ve gerçek
  // bulguyu (42px'lik kart rozeti) görünmez kılar.
  const kucuk=[], muaf=[];
  document.querySelectorAll('a[href],button,input,select,textarea,[role=button]').forEach(el=>{
    const r=el.getBoundingClientRect(); if(r.width<1||r.height<1) return;
    const cs=getComputedStyle(el); if(cs.visibility==='hidden'||cs.display==='none') return;
    if(r.height>=44 && r.width>=24) return;
    const et=el.closest('label');
    const etH=et?et.getBoundingClientRect().height:0;
    const kayit=sel(el)+' '+Math.round(r.width)+'x'+Math.round(r.height);
    if(etH>=44 || cs.display==='inline') muaf.push(kayit); else kucuk.push(kayit);});

  return {tasma,tasanlar:tasanlar.slice(0,3),gorsel,metin,olculemedi,
          dusuk:dusuk.slice(0,4),dusukN:dusuk.length,dusukHepsi:dusuk,
          kucuk:kucuk.slice(0,4),kucukN:kucuk.length,kucukHepsi:kucuk,muafN:muaf.length,gorselMuaf};
}"""

with sync_playwright() as p:
    b=p.chromium.launch(executable_path=CH)
    T={"tasma":0,"gorsel":0,"kontrast":0,"dokunma":0,"olcum":0,"bos":0,"olculemedi":0,"muaf":0,"gorselMuaf":0}
    ayrinti=[]; dokunmaGrup=Counter(); kontrastGrup=Counter()
    for yol in SAYFALAR:
        for ad,w,h in CIHAZLAR:
            pg=b.new_page(viewport={"width":w,"height":h})
            try:
                pg.goto(BASE+yol,wait_until="load",timeout=30000); pg.wait_for_timeout(1100)
                pg.evaluate("window.scrollTo(0,document.body.scrollHeight)"); pg.wait_for_timeout(700)
                pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(300)
                r=pg.evaluate(JS)
            except Exception as e:
                ayrinti.append(f"🔴 {yol} @ {ad}: SAYFA AÇILMADI ({str(e)[:50]})"); pg.close(); continue
            T["olcum"]+=1; T["olculemedi"]+=r["olculemedi"]; T["muaf"]+=r["muafN"]; T["gorselMuaf"]+=r.get("gorselMuaf",0)
            if r["metin"]<5:
                T["bos"]+=1; ayrinti.append(f"🔴 {yol} @ {ad}: {r['metin']} metin — ÖLÇÜM GEÇERSİZ"); pg.close(); continue
            if r["tasma"]>1:
                T["tasma"]+=1; ayrinti.append(f"🔴 TAŞMA {yol} @ {ad} ({w}px): +{r['tasma']}px · {r['tasanlar']}")
            if r["gorsel"]:
                T["gorsel"]+=1; ayrinti.append(f"🔴 GÖRSEL {yol} @ {ad}: {r['gorsel'][:2]}")
            if r["dusukN"]:
                T["kontrast"]+=1
                for d in r["dusukHepsi"]: kontrastGrup[d]+=1
                ayrinti.append(f"🔴 KONTRAST {yol} @ {ad}: {r['dusukN']} · {r['dusuk'][:2]}")
            if r["kucukN"]:
                T["dokunma"]+=r["kucukN"]
                for k in r["kucukHepsi"]: dokunmaGrup[k.rsplit(' ',1)[0]]+=1
            pg.close()
    b.close()

# ============================================================
# 🔴 21 AĞUSTOS — BU ARAÇ SESSİZCE "TEMİZ" DİYORDU.
# Sunucuyu başlatmadan çalıştırdım. 70 sayfanın 70'i
# ERR_CONNECTION_REFUSED verdi ve özet şunu yazdı:
#     yatay taşma 0 · görsel 0 · kontrast 0 · 44px 0
# Yani HİÇBİR ŞEY ölçülmemişken rapor mükemmel görünüyordu.
# Ayrıntı satırları hatayı yazıyordu ama özet üstteydi ve yeşildi.
#
# 🆕 SINIF: **"HİÇ ÖLÇMEMEK, SIFIR SORUN BULMAKLA AYNI ŞEY DEĞİLDİR —
# ARAÇ İKİSİNİ AYNI EKRANDA GÖSTERİYORSA YALAN SÖYLÜYOR DEMEKTİR."**
# (Kardeş sınıf: "gürültülü bir arıza, sessiz bir gerilemeden iyidir".)
#
# Artık ölçüm sayısı beklenenden azsa özet KIRMIZI başlıyor ve süreç
# çıkış kodu 2 ile ölüyor.
BEKLENEN = len(SAYFALAR) * len(CIHAZLAR)
if T["olcum"] < BEKLENEN:
    print("="*76)
    print(f"🔴 ÖLÇÜM YAPILAMADI — {BEKLENEN} kombinasyondan yalnız {T['olcum']} tanesi ölçüldü.")
    print("   AŞAĞIDAKİ SIFIRLAR 'SORUN YOK' DEMEK DEĞİL, 'BAKILMADI' DEMEK.")
    print("   Muhtemel sebep: sunucu ayakta değil.  →  npm run build && npx next start -p 3401")
    print("="*76)

print("="*76)
print(f"KAPSAM: {len(SAYFALAR)} sayfa × {len(CIHAZLAR)} cihaz = {len(SAYFALAR)*len(CIHAZLAR)} kombinasyon")
print(f"        gerçekten ölçülen: {T['olcum']} · geçersiz: {T['bos']}")
print(f"        gradient zemin yüzünden ölçülemeyen metin: {T['olculemedi']}")
print("="*76)
print(f"  yatay taşma          : {T['tasma']} kombinasyon")
print(f"  bozuk görsel oranı   : {T['gorsel']} kombinasyon  (3B dönmüş, muaf: {T['gorselMuaf']} görsel)")
print(f"  WCAG AA kontrast     : {T['kontrast']} kombinasyon")
print(f"  44px altı dokunma    : {T['dokunma']} öge (bağımsız kontrol)")
print(f"     · muaf tutulan     : {T['muaf']} öge (cümle içi bağlantı + 44px etiketle sarılı onay kutusu)")
print("="*76)
for a in ayrinti[:20]: print(a)
if len(ayrinti)>20: print(f"... ve {len(ayrinti)-20} satır daha")
if kontrastGrup:
    print("\n--- KONTRAST İHLALLERİ (grup) ---")
    for k,v in kontrastGrup.most_common(15): print(f"  {v:4}×  {k}")
print("\n--- 44px ALTI DOKUNMA HEDEFLERİ (grup) ---")
for k,v in dokunmaGrup.most_common(15): print(f"  {v:4}×  {k}")

# Çıkış kodu: ölçüm eksikse 2, bulgu varsa 1, temizse 0.
# 🔴 Önceden HER durumda 0 dönüyordu; bir CI adımı bu aracı
# çağırsaydı hiçbir zaman kırmızıya düşmezdi.
import sys as _sys
if T["olcum"] < BEKLENEN:
    _sys.exit(2)
if T["tasma"] or T["gorsel"] or T["kontrast"] or T["dokunma"]:
    _sys.exit(1)
_sys.exit(0)
