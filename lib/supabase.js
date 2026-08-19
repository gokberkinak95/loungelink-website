// ============================================================
// Supabase — YALNIZ bekleme listesi yazımı için (v0.18)
//
// 🔴 İSTEMCİ KÜTÜPHANESİ KURULMADI. @supabase/supabase-js tek bir
// INSERT için ~40 KB JS demek ve pazarlama sitesinin ilk yüklemesine
// giren her KB dönüşüm kaybıdır. PostgREST zaten HTTP; fetch yeter.
//
// 🔴 ANON ANAHTAR GİZLİ DEĞİLDİR — tarayıcıya inen her anahtar
// halka açıktır. Güvenlik anahtarda değil RLS politikasındadır:
// anon rolü waitlist tablosuna YALNIZ insert edebilir, select
// edemez. SQL raporda; tablo açılmadan form nazikçe hata verir.
// ============================================================
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Dönüş: { ok: true } | { ok: false, kod, mesaj }
// 🔴 SESSİZ YUTMA YOK. Her hata yolu kullanıcıya görünen bir cümleye
// bağlanır; "gönderildi" deyip hiçbir yere yazmamak, mailto'dan da
// kötüdür — kullanıcı listede olduğunu sanır.
export async function joinWaitlist({ email, role, source }) {
  if (!supabaseReady) {
    return { ok: false, kod: "yapılandırma", mesaj: "Form şu an bağlı değil." };
  }
  let res;
  try {
    res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify([{ email, role, source: source || "site", consent: true }]),
    });
  } catch {
    return { ok: false, kod: "ağ", mesaj: "Bağlantı kurulamadı." };
  }
  if (res.ok) return { ok: true };

  let govde = null;
  try { govde = await res.json(); } catch { /* gövdesiz hata */ }
  const pgKod = govde && govde.code;
  // 42P01 = tablo yok · 23505 = zaten kayıtlı · 42501/401 = RLS reddi
  if (pgKod === "23505") return { ok: false, kod: "mükerrer", mesaj: "Bu e-posta zaten listede." };
  if (pgKod === "42P01") return { ok: false, kod: "tablo-yok", mesaj: "Liste tablosu henüz açılmadı." };
  if (res.status === 401 || res.status === 403 || pgKod === "42501") {
    return { ok: false, kod: "izin", mesaj: "Kayıt izni henüz tanımlı değil." };
  }
  // 🔴 v0.24 — HIZ SINIRI HAM KOD OLARAK EKRANA DÜŞÜYORDU.
  // SQL 194 dakikada 20 kayıtta `rate_limited_waitlist` fırlatıyor ve bu
  // satır `govde.message`'ı — yani o kodun kendisini — ziyaretçiye
  // gösteriyordu. Üstelik sınır GLOBAL (tabloya bakıyor, kişiye değil):
  // lansman günü aynı dakikada 20 kişi kaydolursa 21. kişi
  // "rate_limited_waitlist" yazan bir kutu görüyordu.
  // SQL zaten Türkçe bir `hint` gönderiyordu; istemci onu hiç okumuyordu.
  const ham = (govde && govde.message) || "";
  if (/rate_limited_waitlist/i.test(ham) || res.status === 429) {
    return {
      ok: false, kod: "yogunluk",
      mesaj: (govde && govde.hint) ||
             "Şu an çok fazla kayıt geliyor. Bir dakika sonra tekrar dene.",
    };
  }
  // Ham Postgres mesajını ziyaretçiye GÖSTERMİYORUZ: teknik metin hem
  // anlaşılmıyor hem de şema hakkında bilgi sızdırıyor.
  return { ok: false, kod: `http-${res.status}`, mesaj: "Kayıt alınamadı. Birazdan tekrar dene." };
}
