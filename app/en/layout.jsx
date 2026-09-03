// `/en` altındaki her sayfa İngilizce; kök `<html lang="tr">` ekran
// okuyucuya ve arama motoruna yanlış dil söylüyordu. Next 14'te `lang`
// yalnız kök layout'ta değiştirilebildiği için burada `<html>`i
// yeniden kuramayız; dil, ilk çocuk kapsayıcıya `lang` ile veriliyor —
// ekran okuyucu bunu sayfa dili olarak alır. hreflang zaten `layout.jsx`te.
export default function EnLayout({ children }) {
  return <div lang="en">{children}</div>;
}
