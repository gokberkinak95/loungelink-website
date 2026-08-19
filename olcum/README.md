# olcum/ — tarayıcıda gerçek ölçüm

`tam_olcum.py` **10 sayfa × 7 cihaz = 70 kombinasyonu** gerçek Chromium'da
açar ve dört şeyi ölçer:

| Ölçüm | Ne arar |
|---|---|
| yatay taşma | `scrollWidth > clientWidth` — sayfa yana kayıyor mu |
| görsel oranı | `getBoundingClientRect` oranı ile `naturalWidth/Height` oranı |
| WCAG AA kontrast | metin rengi ile GERÇEK zemin arasındaki oran |
| dokunma hedefi | 44px altındaki bağımsız kontroller (Apple HIG / WCAG 2.5.5) |

## Bu dosya neden var

Bu projede "düzelttim" denen üç şey ölçülmediği için düzelmemişti:
kontrast v0.7'de, v0.18'de ve v0.25'te ayrı ayrı "düzeltildi" ve her
seferinde başka bir yerden geri geldi. Gözle bakmak yetmiyor çünkü
kusur **yalnız belirli genişliklerde** ya da **sayfanın altında**
görünüyor.

## Yanlış alarm vermemek için yapılan üç şey

1. **Yalnız doğrudan metin düğümü olan öge ölçülür.** `<a><b>X</b></a>`
   yapısında metni `<b>` boyar; `<a>`'nın rengini ölçmek yanlış kırmızı
   üretir. (v1'de bu hata vardı; 1078 sahte bulgu.)
2. **Gradient zeminli öge "ÖLÇÜLEMEDİ" sayılır**, arkasındaki renge
   düşülmez. Altın gradyanlı buton böyle 1.04:1 görünüyordu.
3. **44px kuralı bağımsız kontrollere uygulanır.** Cümle içi bağlantı
   (`display:inline`) ve 44px'lik etiketle sarılı onay kutusu muaf —
   ama muaf sayısı ayrıca RAPORLANIR, sessizce düşülmez.

Ayrıca bir kombinasyonda 5'ten az metin bulunursa **ÖLÇÜM GEÇERSİZ**
sayılır: hiçbir şey ölçmeyen bir ölçüm yeşil yanmamalı.

## Çalıştırmak

Bu dosya **geliştirme ortamında** koşar (Playwright + Chromium gerekir);
Windows'ta build almak için gerekmez. Gerekirse:

```
npm run build
npx next start -p 3401
python3 olcum/tam_olcum.py
```

Sonuçlar 19 Ağustos 2026 sürümünde: taşma 0 · görsel 0 · kontrast 0.
