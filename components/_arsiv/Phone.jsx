import { SCREENS } from "./Screens";

// ============================================================
// 3 BOYUTLU TELEFON
//
// 🔴 EĞİM YÖN DEĞİŞTİRİR: bölüm soldaysa telefon sağa, sağdaysa
// sola bakar — yani cihaz her zaman METNE DÖNÜK durur. Hepsini
// aynı yöne eğmek, sayfayı tek yana kaydırıyormuş gibi gösterir.
//
// Gölge de eğimle aynı yöne düşer; ışık kaynağı sabit kalmalı,
// yoksa üç boyut hissi yerine "filtre uygulanmış" hissi verir.
// ============================================================
export default function Phone({ id, tilt = "right", float = true }) {
  const Screen = SCREENS[id];
  const dir = tilt === "left" ? -1 : 1;

  return (
    <div className={"phone-stage" + (float ? " floating" : "")}>
      <div
        className="phone"
        style={{
          transform: `perspective(1400px) rotateY(${-9 * dir}deg) rotateX(4deg) rotateZ(${-1.2 * dir}deg)`,
          boxShadow: `${26 * dir}px 40px 80px rgba(26,31,46,.20), ${8 * dir}px 12px 26px rgba(26,31,46,.10)`,
        }}
      >
        <div className="phone-screen">{Screen ? <Screen /> : null}</div>
        {/* Cam yansıması: tek ve zayıf. İki yansıma koymak
            plastik görünüm yaratır — bir tane, düşük opaklıkta. */}
        <div className="phone-glare" />
      </div>
    </div>
  );
}
