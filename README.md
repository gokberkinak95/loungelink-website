# LoungeLink — tanıtım sitesi

## Kurulum
    npm install
    npm run dev          # http://localhost:3000

## Denetim (deploy öncesi)
    npm run check        # palet + ölü bağlantı
    npm run build

## Vercel'e çıkma
    git init
    git add -A
    git commit -m "site v0.1"
    git push
Vercel → New Project → repo'yu seç → Deploy.
Alan adı: Vercel → Settings → Domains → loungelink.co

## Ekran görselleri — PNG DEĞİL, HTML

`components/Screens.jsx` içinde altı ekran **gerçek HTML olarak** yeniden
kuruldu. PNG yok: her çözünürlükte keskin, dosya boyutu sıfır, palet
app değişkenlerinden geliyor.

⚠️ Bunlar yeniden kurulumdur, ekran görüntüsü değil. App arayüzü
değişirse buradaki temsil eskir. **Mağaza listelemesi için yine gerçek
cihaz ekran görüntüsü gerekecek** — orası zorunlu.

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
