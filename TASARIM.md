# LoungeLink sitesi — tasarım planı

## Konu
Sık uçan, statü kartı olan iş insanı. Sayfanın TEK işi: "bu ekip lounge
kurallarını herkesten iyi biliyor" dedirtmek ve beta'ya kaydettirmek.

## Palet — SABİT, seçilmedi
App'ten birebir: krem #F8F6F1 · altın #B8943A · mürekkep #1A1F2E.
🔴 Not: "krem zemin + serif + sıcak vurgu" bugün yapay zekâ tasarımının
en bilinen kalıbı. Normalde kaçınırdım — ama bu palet zaten var olan bir
markanın kimliği. Marka tutarlılığı, özgünlük arayışından önce gelir.
Özgünlüğü BAŞKA eksenlerde arayacağım: tipografi rolü, imza öğe, düzen.

## Tipografi — beklenenin tersi
Kalıp: her başlık serif. Bunun yerine ROL AYRIMI yapıyorum:
  · Sans (sıkı harf aralığı) → BİZİM sesimiz: başlıklar, açıklamalar
  · Serif                     → KURALIN sesi: yalnız hüküm cümleleri
  · Monospace                 → kodlar: IST, TK1826, ELPL
Tipografi böylece dekorasyon değil, ANLAM taşır: serif gördüğünüz yer,
havayolunun kuralının konuştuğu yerdir.

## Vernaküler — biniş kartı
Konunun kendi malzemesi: biniş kartı, kapı, terminal, perfore koçan.
Bölüm ayıracı olarak KESİK ÇİZGİ (koçan yırtma hattı) kullanıyorum.
Havalimanı kodları monospace ve harf aralıklı — biniş kartındaki gibi.

## 🔴 İMZA ÖĞE — kahramanda CANLI KURAL MATRİSİ
Kahraman alanda ekran görüntüsü değil, ÜRÜNÜN KENDİSİ var:
ziyaretçi kartını seçer, cevap anında değişir.

Sebebi stratejik: tek gerçek farkımız kural motoru ve o motor BAŞKA
KULLANICI GEREKTİRMİYOR. Sitede de aynı şey geçerli — ziyaretçi
kaydolmadan, 3 saniyede değeri görüyor. Bir ekran görüntüsü "böyle
görünüyor" der; canlı matris "işe yarıyor" dedirtir.

Cesaretin tamamı buraya harcanıyor. Gerisi sessiz kalacak.

## Telefonlar — 3 boyut
Perspektif + hafif döndürme, bölümlere göre yön değiştiriyor.
Ekranlar PNG değil GERÇEK HTML: her çözünürlükte keskin, canlanabilir.
`prefers-reduced-motion` açıksa tüm hareket kapanır.

---

## v0.66 — Sessiz Lüks II (25 Eylül 2026 denetimi)

**Karar: başlık sesi serif'e geçti.** Rol ayrımı kalıyor ama sınırları yeniden
çizildi:

| ses | aile | nerede |
|---|---|---|
| sahne & hüküm | Cormorant Garamond 300/400/500 + **gerçek italik** | h1, h2, ifade satırı, kart başlığı, kuralın cevabı, büyük rakamlar |
| bilgi | Plus Jakarta Sans 400/500 | gövde, arayüz, etiket, düğme |
| kod | JetBrains Mono | IST, TK1979, saat, sıra numarası |

Neden: 800 ağırlıklı, −0.03em sıkıştırılmış sans başlıklar "fintech lansmanı"
gibi bağırıyordu; sessiz lüks yüksek sesle değil **ölçek ve boşlukla** konuşur.
Vurgu (`em`) bugüne kadar tarayıcının sahte italiğiydi — artık Cormorant'ın
kendi italik kesiti var (`build_fontlar.py`, kaynak `rnapp/assets/fonts`) ve
`font-synthesis: none` sahte kesiti yasaklıyor. Alt kümeye `lnum` eklendi:
Cormorant varsayılan olarak eski stil rakam çizer (284 → "2" aşağı sarkar).

**Tek sıcaklık.** Bölüm perdeleri lacivertti (`rgba(9,13,24)`); obsidyen
zeminin üstünde soğuk bantlar çıkıyordu. Perde artık `--bg` ile aynı ton.
Kahraman halesindeki leylak ikinci bir renk ailesiydi → sıcak gri.

**Dekor inceltildi.** Hayalet kelimeler, bölüm başı nokta, pist/ufuk "bokeh"
noktaları, unicode ikon çipleri (✓ ◆ ⬡ ★ ⏻ ◐) ve düğme parıltısı kaldırıldı.
Yerlerine: kıl çizgi (`--hair`), mono sıra numarası (`.idx`), düz şampanya
düğme. Kural: bir dekor ya bilgi taşır ya da çıkar.

**Dürüstlük.** Ücretsiz betada "EN ÇOK SEÇİLEN" etiketi doğrulanamaz bir iddia
→ "ÖNERİLEN".

Tüm katman `app/globals.css` sonunda "v0.66 · SESSİZ LÜKS II" başlığı altında;
jetonlar: `--hair`, `--hair-gold`, `--surface`, `--surface-2`, `--r-card`,
`--ease-lux`.
