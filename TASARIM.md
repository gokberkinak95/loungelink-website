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
