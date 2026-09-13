"use client";
// ============================================================================
// OlayLink — ÖLÇÜLEN BAĞLANTI
//
// `app/page.jsx` bir SUNUCU bileşeni; `onClick` alamaz. Üç dönüşüm
// bağlantısını ölçebilmek için tek işi olay göndermek olan bu ince
// istemci sarmalayıcısı var.
//
// ⚠️ Görsel olarak SIFIR fark: aynı `<a>`, aynı `className`. Ölçüm
// eklemek tasarımı değiştirmemeli — değiştirirse ölçtüğün şey artık
// ölçmeye başladığın ürün değildir.
// ============================================================================
import { olay } from "./Olcum";

export default function OlayLink({ ad, ozellik, children, ...rest }) {
  return (
    <a {...rest} onClick={() => olay(ad, ozellik)}>
      {children}
    </a>
  );
}
