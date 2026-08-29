# LoungeLink — tanıtım sitesi

## Kurulum
    npm install
    npm run dev          # http://localhost:3000

## Denetim (deploy öncesi)
    npm run check        # palet + ölü bağlantı
    npm run build

## Vercel'e çıkma

🔴 **ZIP KLASÖRÜNDEN DEPLOY EDİLEMEZ.** Paketlerken `.git` bilerek dışarıda
bırakılıyor (bir zip'in içine başkasının depo geçmişini koymak yanlış olur).
Yani `website_vX.Y.Z.zip`i açtığın klasörde depo YOKTUR ve `git push` yapamazsın.

Buradaki eski talimat `git init` diyordu ve bu **yanlıştı**: zip klasöründe
`git init` yapmak, GitHub'daki depoyla hiçbir ilgisi olmayan YENİ ve BOŞ bir
depo yaratır. Commit atarsın, push edecek uzak depo yoktur, ve "yaptım"
sanırsın.

🆕 SINIF: **"BİR TALİMAT, YANLIŞ KLASÖRDE ÇALIŞTIRILDIĞINDA SESSİZCE
BAŞARILI OLUYORSA, O TALİMAT EKSİKTİR — HANGİ KLASÖRDE OLDUĞUNU SÖYLEMEK
KOMUTUN KENDİSİ KADAR ÖNEMLİ."**

Gerçek zincir:

    C:\website-git  →  GitHub  →  Vercel

    # 1) yeni sürümü DEPO klasörüne kopyala (.git'e dokunma)
    cd C:\website-git
    robocopy C:\website C:\website-git /MIR /XD .git node_modules .next

    # 2) neyin değiştiğini GÖR, sonra gönder
    git status
    git add -A
    git commit -m "site v0.42.0"
    git push

Vercel depoyu izliyor; push'tan sonra kendi kabında `npm ci` + `npm run build`
koşar. `.env.local` push EDİLMEZ — iki değişkeni Vercel → Project → Settings →
Environment Variables altına ayrıca gir.

Depon yoksa / bağlamak istemiyorsan, klasörden doğrudan da çıkabilirsin:

    cd C:\website
    npx vercel --prod

Alan adı: Vercel → Settings → Domains → loungelink.co

`npm run build` her çalıştığında ilk çıktı hangi klasörde olduğunu ve depo
bulunup bulunmadığını yazar (`scripts/konum.js`). Depo yoksa büyük harflerle
"BU KLASÖRDEN DEPLOY EDİLEMEZ" der.

## Ekran görselleri — ARTIK KAYNAKTAN ÜRETİLEN RENDER

🔴 Bu bölüm v0.42'ye kadar `components/Screens.jsx`i anlatıyordu: altı ekran
elle HTML olarak yeniden kurulmuştu. O bileşen **artık hiçbir yerden
çağrılmıyor** (ölü koddu, `components/_arsiv/`e taşındı) ve bu metin uzun
süredir siteyi değil, siteyi bir zamanlar anlatan bir cümleyi anlatıyordu.

Bugün `public/screens/*.jpg` görselleri `rnapp/ekran_uret.py` ile ÜRÜNÜN
KENDİ KAYNAĞINDAN üretiliyor: renk `theme.js`, geometri `ui.js`, metin
`i18n.js`. Ürün değişince görsel de değişiyor.

⚠️ Bunlar **gerçek cihaz görüntüsü değil**. Bayat bir cihaz görüntüsünden
daha doğru, ama cihazın kendisi değil: font hinting, durum çubuğu, güvenli
alan ve platform bileşenleri yok. `public/screens/SURUM.json` bunu
`tur: "render"` diye kayda geçiriyor ve `ekran_goruntusu_check.py` her
denetimde ⚠ veriyor. **Mağaza listelemesi için yine gerçek cihaz ekran
görüntüsü gerekecek** — orası zorunlu.

## (Eski not — artık geçersiz)
`public/screens/` klasörüne şu 5 dosya (PNG, 1080×2400 civarı):

| dosya | ekran |
|---|---|
| `ana-ekran.png`    | Ana ekran (kahraman + Salon Rehberi girişi görünsün) |
| `rehber-sonuc.png` | Salon Rehberi sonucu — Elite Plus / IST, yeşil kart |
| `kesif.png`        | Keşif listesi, 2-3 ilan rozetleriyle |
| `istek.png`        | İstek ekranı, kural uyarı kutusu açık |
| `oturum.png`       | Oturum tamamlama (çift onay) |
| `profil.png`       | Profil — Kurucu Host + kullanılmayan hak kartı |

Sonra `components/Phone.jsx` içindeki yorum satırını aç:
    <img src={`/screens/${id}.png`} alt={label} />
ve yer tutucu `<div className="placeholder">` bloğunu sil.

## Güncelleme kuralları
- **Metin** → `lib/content.js` (tek dosya, JSX'e dokunma)
- **Rehber verisi** → `lib/guide.js` — kaynağı SQL 146/147. Tek yönlü: kural motoru → site
- **Yasal metin** → `lib/legal-source.js`, app'ten KOPYALA. Elle yazma
- **Renk** → sadece `app/globals.css`, app paletiyle aynı olmalı
