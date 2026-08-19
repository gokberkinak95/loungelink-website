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
CH="/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
BASE="http://localhost:3401"
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
  const bgOf=el=>{let n=el;while(n&&n!==document.documentElement){
      const cs=getComputedStyle(n);
      if(cs.backgroundImage&&cs.backgroundImage.includes('gradient')) return {belirsiz:true,kim:sel(n)};
      const b=parse(cs.backgroundColor); if(b&&b.a>0.5) return {rgb:b.rgb,kim:sel(n)};
      n=n.parentElement;} return {rgb:[255,255,255],kim:'(varsayilan)'};};

  // 1) yatay tasma
  const de=document.documentElement;
  const tasma=Math.max(0,de.scrollWidth-de.clientWidth); const tasanlar=[];
  if(tasma>1) document.querySelectorAll('*').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.right>de.clientWidth+1&&r.width>0) tasanlar.push(sel(el)+' +'+Math.round(r.right-de.clientWidth)+'px');});

  // 2) gorsel orani
  const gorsel=[];
  document.querySelectorAll('img').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.width<5||!el.naturalWidth) return;
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
    const o=(Math.max(lum(fg.rgb),lum(bg.rgb))+.05)/(Math.min(lum(fg.rgb),lum(bg.rgb))+.05);
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
          kucuk:kucuk.slice(0,4),kucukN:kucuk.length,kucukHepsi:kucuk,muafN:muaf.length};
}"""

with sync_playwright() as p:
    b=p.chromium.launch(executable_path=CH)
    T={"tasma":0,"gorsel":0,"kontrast":0,"dokunma":0,"olcum":0,"bos":0,"olculemedi":0,"muaf":0}
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
            T["olcum"]+=1; T["olculemedi"]+=r["olculemedi"]; T["muaf"]+=r["muafN"]
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

print("="*76)
print(f"KAPSAM: {len(SAYFALAR)} sayfa × {len(CIHAZLAR)} cihaz = {len(SAYFALAR)*len(CIHAZLAR)} kombinasyon")
print(f"        gerçekten ölçülen: {T['olcum']} · geçersiz: {T['bos']}")
print(f"        gradient zemin yüzünden ölçülemeyen metin: {T['olculemedi']}")
print("="*76)
print(f"  yatay taşma          : {T['tasma']} kombinasyon")
print(f"  bozuk görsel oranı   : {T['gorsel']} kombinasyon")
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
