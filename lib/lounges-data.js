// ============================================================
// ⚠️ ÜRETİLMİŞ DOSYA — ELLE DÜZENLENMEZ.
// Kaynak: data/salonlar.csv  ·  Üreteç: scripts/gen-lounges.mjs
// Yeniden üretmek için:  node scripts/gen-lounges.mjs
//
// Ölçüm (bu üretimde): 222 havalimanı · 284 salon ·
// 118 ülke · Türkiye: 15 havalimanı / 48 salon.
// Atlanan satır: 0 (havalimanı kodu çözülemedi) · birleştirilen kopya: 0.
// Aynı isimli iç hat / dış hat salonları AYRI kayıttır; kopya sayılmaz.
//
// Kapsam dağılımı: iç hat 24 · dış hat 15 ·
// ikisi birden 245 · çözülemeyen kapsam 0 (dış hat sayıldı).
// "both" kayıtları HEM iç hat HEM dış hat listesine düşer; v0.21'e kadar
// yalnız dış hatta düşüyorlardı ve iç hat listelerinden sessizce siliniyorlardı.
// ============================================================

export const AIRPORTS_FULL = [
  {
    "code": "IST",
    "name": "İstanbul Havalimanı",
    "city": "İstanbul",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Primeclass Lounge",
        "terminal": "Main T - Gate A",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Turkish Airlines Lounge — İç Hat",
        "terminal": "İç Hat",
        "section": "miles_smiles",
        "scope": "domestic",
        "operator": "THY"
      },
      {
        "name": "Turkish Airlines Lounge — İç Hat (Business)",
        "terminal": "İç Hatlar",
        "section": "business",
        "scope": "domestic",
        "operator": "Turkish Airlines"
      },
      {
        "name": "iGA Lounge — Dış Hat",
        "terminal": "Dış Hat",
        "section": null,
        "scope": "international",
        "operator": "IGA"
      },
      {
        "name": "iGA Lounge — İç Hat",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "IGA"
      },
      {
        "name": "Turkish Airlines Lounge — Dış Hat (Business)",
        "terminal": "Dış Hat",
        "section": "business",
        "scope": "international",
        "operator": "Turkish Airlines"
      },
      {
        "name": "Turkish Airlines Lounge — Dış Hat (Miles&Smiles)",
        "terminal": "Dış Hat",
        "section": "miles_smiles",
        "scope": "international",
        "operator": "Turkish Airlines"
      },
      {
        "name": "iGA Pop-up Lounge — Dış Hat",
        "terminal": "Dış Hat",
        "section": null,
        "scope": "international",
        "operator": "IGA"
      }
    ]
  },
  {
    "code": "SAW",
    "name": "İstanbul Sabiha Gökçen Uluslararası Havalimanı",
    "city": "İstanbul",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Aeroport Lounge",
        "terminal": "Dom. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Kepler Club — Dış Hat",
        "terminal": "Dış Hat",
        "section": null,
        "scope": "international",
        "operator": "Kepler"
      },
      {
        "name": "Plaza Premium Bosphorus Lounge — Dış Hat",
        "terminal": "Dış Hat",
        "section": null,
        "scope": "international",
        "operator": "Plaza Premium"
      },
      {
        "name": "Plaza Premium Lounge — İç Hat",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "Plaza Premium"
      },
      {
        "name": "Primeclass Lounge",
        "terminal": "Int. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Turkish Airlines CIP Lounge — İç Hat",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "ESB",
    "name": "Ankara Esenboğa Havalimanı",
    "city": "Ankara",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Anatolia Lounge",
        "terminal": "Dom. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Primeclass CIP Lounge",
        "terminal": "Int. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Primeclass Lounge — Dış Hat",
        "terminal": "Dış Hat",
        "section": null,
        "scope": "international",
        "operator": "TAV"
      },
      {
        "name": "Primeclass Lounge — İç Hat",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "TAV"
      },
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "ADB",
    "name": "İzmir Adnan Menderes Havalimanı",
    "city": "İzmir",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Primeclass Lounge — Dış Hat",
        "terminal": "Dış Hat",
        "section": null,
        "scope": "international",
        "operator": "TAV"
      },
      {
        "name": "Primeclass Lounge — İç Hat",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "TAV"
      },
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "AYT",
    "name": "Antalya Havalimanı",
    "city": "Antalya",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Antalya Airport CIP Lounge",
        "terminal": "T1 International",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Antalya Havalimanı dış hatlar özel yolcu salonu (FTA CIP Salonları)",
        "terminal": "Uçuş operasyonunun yapıldığı terminaldeki FTA CIP Salonları",
        "section": null,
        "scope": "international",
        "operator": "Fraport TAV Antalya (FTA) CIP"
      },
      {
        "name": "CIP Lounge — Dış Hat (T2)",
        "terminal": "Dış Hat (T2)",
        "section": null,
        "scope": "international",
        "operator": "TAV"
      },
      {
        "name": "CIP Lounge — İç Hat (T3)",
        "terminal": "İç Hat (T3)",
        "section": null,
        "scope": "domestic",
        "operator": "TAV"
      },
      {
        "name": "Comfort Lounge — Dış Hat (T2)",
        "terminal": "Dış Hat (T2)",
        "section": null,
        "scope": "international",
        "operator": "FTA"
      },
      {
        "name": "Elite Lounge — Dış Hat (T1)",
        "terminal": "Dış Hat (T1)",
        "section": null,
        "scope": "international",
        "operator": "-"
      },
      {
        "name": "Primeclass Lounge",
        "terminal": "Dış Hat",
        "section": null,
        "scope": "both",
        "operator": "TAV"
      },
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "DLM",
    "name": "Dalaman Havalimanı",
    "city": "Dalaman",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "CIP Lounge — Dış Hat (T2)",
        "terminal": "Dış Hat (T2)",
        "section": null,
        "scope": "international",
        "operator": "TAV"
      },
      {
        "name": "CIP Lounge — İç Hat (T2)",
        "terminal": "İç Hat (T2)",
        "section": null,
        "scope": "domestic",
        "operator": "TAV"
      },
      {
        "name": "DLM Lounge — Terminal 2",
        "terminal": "Terminal 2",
        "section": null,
        "scope": "both",
        "operator": "—"
      },
      {
        "name": "Turkish Airlines CIP Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "BJV",
    "name": "Milas-Bodrum Havalimanı",
    "city": "Bodrum / Muğla",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Milas-Bodrum Havalimanı iç hatlar özel yolcu salonu",
        "terminal": "İç Hatlar – Gidiş",
        "section": null,
        "scope": "domestic",
        "operator": "Turkish Airlines"
      },
      {
        "name": "Primeclass Lounge — Dış Hat",
        "terminal": "Dış Hat",
        "section": null,
        "scope": "international",
        "operator": "TAV"
      },
      {
        "name": "Primeclass Lounge — İç Hat",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "TAV"
      }
    ]
  },
  {
    "code": "COV",
    "name": "Çukurova Uluslararası Havalimanı",
    "city": "Adana / Mersin",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Turkish Airlines CIP Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      },
      {
        "name": "Çelebi Platinum Lounge — Dış Hat",
        "terminal": "Dış Hat",
        "section": null,
        "scope": "international",
        "operator": "Çelebi"
      },
      {
        "name": "Çelebi Platinum Lounge — İç Hat",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "Çelebi"
      }
    ]
  },
  {
    "code": "DIY",
    "name": "Diyarbakır Havalimanı",
    "city": "Diyarbakır",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "CIP Lounge — Terminal",
        "terminal": "Terminal",
        "section": null,
        "scope": "both",
        "operator": "TAV"
      },
      {
        "name": "Turkish Airlines CIP Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "ADA",
    "name": "Adana Şakirpaşa Havalimanı",
    "city": "Adana",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Turkish Airlines CIP Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "ASR",
    "name": "Kayseri Havalimanı",
    "city": "Kayseri",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Turkish Airlines CIP Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "GZT",
    "name": "Gaziantep Havalimanı",
    "city": "Gaziantep",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Turkish Airlines CIP Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "HTY",
    "name": "Hatay Havalimanı",
    "city": "Hatay",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Turkish Airlines CIP Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "RZV",
    "name": "Rize-Artvin Havalimanı",
    "city": "Rize / Artvin",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Turkish Airlines CIP Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "TZX",
    "name": "Trabzon Uluslararası Havalimanı",
    "city": "Trabzon",
    "country": "Türkiye",
    "tr": true,
    "lounges": [
      {
        "name": "Turkish Airlines CIP Lounge",
        "terminal": "İç Hat",
        "section": null,
        "scope": "domestic",
        "operator": "THY"
      }
    ]
  },
  {
    "code": "LHR",
    "name": "Heathrow Havalimanı",
    "city": "Londra",
    "country": "Birleşik Krallık (İngiltere)",
    "tr": false,
    "lounges": [
      {
        "name": "Air Canada",
        "terminal": "2B Terminali",
        "section": null,
        "scope": "both",
        "operator": "Air Canada"
      },
      {
        "name": "Lufthansa",
        "terminal": "2A Terminali",
        "section": null,
        "scope": "both",
        "operator": "Lufthansa"
      },
      {
        "name": "No1 Lounge",
        "terminal": "T3",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Plaza Premium Lounge",
        "terminal": "T2",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Singapore Airlines",
        "terminal": "2B Terminali",
        "section": null,
        "scope": "both",
        "operator": "Singapore Airlines"
      },
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "T2",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "United Airlines",
        "terminal": "2B Terminali",
        "section": null,
        "scope": "both",
        "operator": "United Airlines"
      }
    ]
  },
  {
    "code": "FRA",
    "name": "Frankfurt Havalimanı",
    "city": "Frankfurt",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "Ac Maple Leaf",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Air Canada"
      },
      {
        "name": "Lufthansa Business B-Ost",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Lufthansa"
      },
      {
        "name": "LuxxLounge",
        "terminal": "T1 - A",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Sky Lounge",
        "terminal": "T2 - D/E",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "OUA",
    "name": "Vagadugu Havalimanı",
    "city": "Vagadugu",
    "country": "Burkina Faso",
    "tr": false,
    "lounges": [
      {
        "name": "Salon CIP",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Servair Lounge",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": "Servair"
      },
      {
        "name": "Yennenga Lounge",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "WAW",
    "name": "Chopin Uluslararası Havalimanı",
    "city": "Varşova",
    "country": "Polonya",
    "tr": false,
    "lounges": [
      {
        "name": "Bolero",
        "terminal": "Schengen Olmayan Bölge",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Mazurek (Star Alliance Lounge)",
        "terminal": "Schengen Olmayan Bölge",
        "section": null,
        "scope": "both",
        "operator": "Star Alliance"
      },
      {
        "name": "PPL",
        "terminal": "Schengen Olmayan Bölge",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "ALG",
    "name": "Houari Boumediene Havalimanı",
    "city": "Dar El Beida",
    "country": "Cezayir",
    "tr": false,
    "lounges": [
      {
        "name": "Air Algerie Catering",
        "terminal": "Terminal 4",
        "section": null,
        "scope": "both",
        "operator": "Air Algerie"
      },
      {
        "name": "Salon Sgsia",
        "terminal": "2. Salon",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "AMS",
    "name": "Amsterdam Schiphol Havalimanı",
    "city": "Amsterdam",
    "country": "Hollanda",
    "tr": false,
    "lounges": [
      {
        "name": "Aspire Lounge",
        "terminal": "Ana Bina Terminali",
        "section": null,
        "scope": "both",
        "operator": "Aspire"
      },
      {
        "name": "Aspire Lounge 26",
        "terminal": "Lounge 26 (Non-Schengen)",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BER",
    "name": "Brandenburg Havalimanı",
    "city": "Berlin",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "Lufthansa Star Alliance Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Lufthansa"
      },
      {
        "name": "Tempelhof",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BOG",
    "name": "El Dorado Uluslararası Havalimanı",
    "city": "Bogota",
    "country": "Kolombiya",
    "tr": false,
    "lounges": [
      {
        "name": "Avianca VIP",
        "terminal": "Uluslararası Terminal",
        "section": null,
        "scope": "both",
        "operator": "Avianca"
      },
      {
        "name": "Copa Club",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Copa Airlines"
      }
    ]
  },
  {
    "code": "BRE",
    "name": "Bremen Havalimanı",
    "city": "Bremen",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "LUFTHANSA",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Lufthansa"
      },
      {
        "name": "The Lounge",
        "terminal": "Terminal 1",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "CDG",
    "name": "Charles de Gaulle Havalimanı",
    "city": "Paris",
    "country": "Fransa",
    "tr": false,
    "lounges": [
      {
        "name": "Extime Lounge",
        "terminal": "T2E",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Star Alliance Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Star Alliance"
      }
    ]
  },
  {
    "code": "DOH",
    "name": "Hamad Uluslararası Havalimanı",
    "city": "Doha",
    "country": "Katar",
    "tr": false,
    "lounges": [
      {
        "name": "Oryx",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": "Qatar Airways"
      },
      {
        "name": "Oryx Lounge",
        "terminal": "North Node",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DXB",
    "name": "Dubai Uluslararası Havalimanı",
    "city": "Dubai",
    "country": "Birleşik Arap Emirlikleri",
    "tr": false,
    "lounges": [
      {
        "name": "Ahlan Lounge",
        "terminal": "T1 - C",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Marhaba Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Marhaba"
      }
    ]
  },
  {
    "code": "GVA",
    "name": "Cenevre Havalimanı",
    "city": "Cenevre",
    "country": "İsviçre",
    "tr": false,
    "lounges": [
      {
        "name": "Aspire Lounge",
        "terminal": "Ana Terminal Binası",
        "section": null,
        "scope": "both",
        "operator": "Aspire"
      },
      {
        "name": "Swiss Star",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Swiss"
      }
    ]
  },
  {
    "code": "HAM",
    "name": "Fhulsbuttel Havalimanı",
    "city": "Hamburg",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "Business Lounge",
        "terminal": "Terminal 1",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Hamburg Airport Lounge",
        "terminal": "Terminal 1 ve Terminal 2 arası",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "JFK",
    "name": "John F. Kennedy Uluslararası Havalimanı",
    "city": "New York",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "Primeclass Lounge",
        "terminal": "T1",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "Terminal 1 (2 ve 3 nolu kapıların arasında)",
        "section": null,
        "scope": "both",
        "operator": "Turkish Airlines"
      }
    ]
  },
  {
    "code": "KTM",
    "name": "Tribhuvan Uluslararası Havalimanı",
    "city": "Katmandu",
    "country": "Nepal",
    "tr": false,
    "lounges": [
      {
        "name": "Horizon Service",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Radisson Service",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MIA",
    "name": "Miami Uluslararası Havalimanı",
    "city": "Miami",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "Concourse E",
        "section": null,
        "scope": "both",
        "operator": "Turkish Airlines"
      },
      {
        "name": "Turkish Airlines Lounge (Concourse H)",
        "terminal": "Central Terminal – Concourse H (güvenlik kontrolünden sonra)",
        "section": null,
        "scope": "both",
        "operator": "Turkish Airlines"
      }
    ]
  },
  {
    "code": "ORD",
    "name": "O'Hare Uluslararası Havalimanı",
    "city": "Şikago",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "LOT Business Lounge",
        "terminal": "5. Terminal",
        "section": null,
        "scope": "both",
        "operator": "LOT"
      },
      {
        "name": "Swissport",
        "terminal": "5. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Swissport"
      }
    ]
  },
  {
    "code": "OTP",
    "name": "Henri Coanda Uluslararası Havalimanı",
    "city": "Bükreş",
    "country": "Romanya",
    "tr": false,
    "lounges": [
      {
        "name": "Satellite Business",
        "terminal": "Uluslararası Gidiş Terminali (9. Kapı Üstü)",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "Tarom Business",
        "terminal": "Uluslararası Gidiş Terminali (3. Kapı Üstü)",
        "section": null,
        "scope": "both",
        "operator": "Tarom"
      }
    ]
  },
  {
    "code": "SFO",
    "name": "San Francisco Uluslararası Havalimanı",
    "city": "San Francisco",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "The Club Lounge",
        "terminal": "Terminal 1",
        "section": null,
        "scope": "both",
        "operator": null
      },
      {
        "name": "United Club",
        "terminal": "Uluslararası G Terminali",
        "section": null,
        "scope": "both",
        "operator": "United Airlines"
      }
    ]
  },
  {
    "code": "ABJ",
    "name": "Felix Houphouet Boigny Uluslararası Havalimanı",
    "city": "Abidjan",
    "country": "Fildişi Sahili",
    "tr": false,
    "lounges": [
      {
        "name": "Aeria VIP",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "ABV",
    "name": "Nnamdi Azikiwe Havalimanı",
    "city": "Abuja",
    "country": "Nijerya",
    "tr": false,
    "lounges": [
      {
        "name": "Lounge Sds",
        "terminal": "International Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "ACC",
    "name": "Kotoka Uluslararası Havalimanı",
    "city": "Akra",
    "country": "Gana",
    "tr": false,
    "lounges": [
      {
        "name": "Sanbra Priority",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "ADD",
    "name": "Bole Uluslararası Havalimanı",
    "city": "Addis Ababa",
    "country": "Etiyopya",
    "tr": false,
    "lounges": [
      {
        "name": "Cloud Nine",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Ethiopian Airlines"
      }
    ]
  },
  {
    "code": "AGP",
    "name": "Malaga-Costa Del Sol Havalimanı",
    "city": "Malaga",
    "country": "İspanya",
    "tr": false,
    "lounges": [
      {
        "name": "Sala VIP T3",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "ALA",
    "name": "Almatı Uluslararası Havalimanı",
    "city": "Almatı",
    "country": "Kazakistan",
    "tr": false,
    "lounges": [
      {
        "name": "Extime Lounge",
        "terminal": "International Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "AMM",
    "name": "Kraliçe Aliye Uluslararası Havalimanı",
    "city": "Amman",
    "country": "Ürdün",
    "tr": false,
    "lounges": [
      {
        "name": "Crown",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Royal Jordanian"
      }
    ]
  },
  {
    "code": "AQJ",
    "name": "Kral Hüseyin Uluslararası Havalimanı",
    "city": "Akabe",
    "country": "Ürdün",
    "tr": false,
    "lounges": [
      {
        "name": "Aqaba Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "ATH",
    "name": "Atina Uluslararası Havalimanı",
    "city": "Atina",
    "country": "Yunanistan",
    "tr": false,
    "lounges": [
      {
        "name": "Goldair Handling",
        "terminal": "A Terminali",
        "section": null,
        "scope": "both",
        "operator": "Goldair Handling"
      }
    ]
  },
  {
    "code": "ATL",
    "name": "Hartsfield-Jackson Havalimanı",
    "city": "Atlanta",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "The Club",
        "terminal": "Concourse F Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "AUH",
    "name": "Abu Dabi Uluslararası Havalimanı",
    "city": "Abu Dabi",
    "country": "Birleşik Arap Emirlikleri",
    "tr": false,
    "lounges": [
      {
        "name": "Pearl Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BAH",
    "name": "Bahreyn Uluslararası Havalimanı",
    "city": "Muharrak",
    "country": "Bahreyn",
    "tr": false,
    "lounges": [
      {
        "name": "Pearl Lounge",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BCN",
    "name": "Barselona El Prat Havalimanı",
    "city": "Barselona",
    "country": "İspanya",
    "tr": false,
    "lounges": [
      {
        "name": "VIP Joan Miró",
        "terminal": "T1 Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BEG",
    "name": "Nikola Tesla Havalimanı",
    "city": "Belgrad",
    "country": "Sırbistan",
    "tr": false,
    "lounges": [
      {
        "name": "Air Serbia Premium Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Air Serbia"
      }
    ]
  },
  {
    "code": "BEY",
    "name": "Refik Hariri Uluslararası Havalimanı",
    "city": "Beyrut",
    "country": "Lübnan",
    "tr": false,
    "lounges": [
      {
        "name": "Ahlein",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BGW",
    "name": "Bağdat International Airport",
    "city": "Bağdat",
    "country": "Irak",
    "tr": false,
    "lounges": [
      {
        "name": "Bağdat Lounge",
        "terminal": "1. Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BHX",
    "name": "Birmingham Havalimanı",
    "city": "Birmingham",
    "country": "Birleşik Krallık (İngiltere)",
    "tr": false,
    "lounges": [
      {
        "name": "Lounges 1",
        "terminal": "Hava Sahası",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BIO",
    "name": "Bilbao Havalimanı",
    "city": "Bilbao",
    "country": "İspanya",
    "tr": false,
    "lounges": [
      {
        "name": "Sala VIP",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BJL",
    "name": "Banjul Uluslararası Havalimanı",
    "city": "Banjul",
    "country": "Gambiya",
    "tr": false,
    "lounges": [
      {
        "name": "Roumieh",
        "terminal": "Uluslararası Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BKK",
    "name": "Bangkok Suvarnabhumi Uluslararası Havalimanı",
    "city": "Bangkok",
    "country": "Tayland",
    "tr": false,
    "lounges": [
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "Concourse D, D8 kapısını geçince sağda / Uluslararası Terminal",
        "section": null,
        "scope": "both",
        "operator": "Turkish Airlines"
      }
    ]
  },
  {
    "code": "BKO",
    "name": "Modibo Keita Uluslararası Havalimanı",
    "city": "Bamako",
    "country": "Mali",
    "tr": false,
    "lounges": [
      {
        "name": "Bravia Platinum",
        "terminal": "1. Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BLL",
    "name": "Billund Havalimanı",
    "city": "Billund",
    "country": "Danimarka",
    "tr": false,
    "lounges": [
      {
        "name": "King Amlet",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BLQ",
    "name": "Guglielmo Marconi Havalimanı",
    "city": "Bolonya",
    "country": "İtalya",
    "tr": false,
    "lounges": [
      {
        "name": "Marconi",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BOD",
    "name": "Bordeaux-Mérignac Havalimanı",
    "city": "Bordo",
    "country": "Fransa",
    "tr": false,
    "lounges": [
      {
        "name": "Myairport Lounge Hall",
        "terminal": "A Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BOM",
    "name": "Chhatrapati Shivaji Uluslararası Havalimanı",
    "city": "Mumbai",
    "country": "Hindistan",
    "tr": false,
    "lounges": [
      {
        "name": "Adani",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Adani"
      }
    ]
  },
  {
    "code": "BOS",
    "name": "Logan Uluslararası Havalimanı",
    "city": "Boston",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "Lufthansa",
        "terminal": "E Terminali",
        "section": null,
        "scope": "both",
        "operator": "Lufthansa"
      }
    ]
  },
  {
    "code": "BRI",
    "name": "Bari Havalimanı",
    "city": "Bari",
    "country": "İtalya",
    "tr": false,
    "lounges": [
      {
        "name": "Executive",
        "terminal": "Hava Sahası / Biniş Alanı",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BRU",
    "name": "Brüksel Havalimanı",
    "city": "Brüksel",
    "country": "Belçika",
    "tr": false,
    "lounges": [
      {
        "name": "Diamond",
        "terminal": "Non schengen Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BSL",
    "name": "Mulhouse Freiburg Havalimanı",
    "city": "Basel",
    "country": "İsviçre",
    "tr": false,
    "lounges": [
      {
        "name": "Skyview",
        "terminal": "Y Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BSR",
    "name": "Basra Uluslararası Havalimanı",
    "city": "Basra",
    "country": "Irak",
    "tr": false,
    "lounges": [
      {
        "name": "Royal",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BUD",
    "name": "Ferenc Liszt Uluslararası Havalimanı",
    "city": "Budapeşte",
    "country": "Macaristan",
    "tr": false,
    "lounges": [
      {
        "name": "Platinum Lounge",
        "terminal": "1. Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "BUS",
    "name": "Batum Uluslararası Havalimanı",
    "city": "Batum",
    "country": "Gürcistan",
    "tr": false,
    "lounges": [
      {
        "name": "Primeclass",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "CAI",
    "name": "Kahire Uluslararası Havalimanı",
    "city": "Kahire",
    "country": "Mısır",
    "tr": false,
    "lounges": [
      {
        "name": "Egyptair",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": "EgyptAir"
      }
    ]
  },
  {
    "code": "CAN",
    "name": "Baiyun Uluslararası Havalimanı",
    "city": "Guanco (Guangzhou)",
    "country": "Çin",
    "tr": false,
    "lounges": [
      {
        "name": "Star Alliance Lounge",
        "terminal": "1. Terminaller",
        "section": null,
        "scope": "both",
        "operator": "Star Alliance"
      }
    ]
  },
  {
    "code": "CCS",
    "name": "Simon Bolivar Uluslararası Havalimanı",
    "city": "Karakas",
    "country": "Venezuela",
    "tr": false,
    "lounges": [
      {
        "name": "Aero VIP",
        "terminal": "Uluslararası Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "CEB",
    "name": "Mactan-Cebu Uluslararası Havalimanı",
    "city": "Cebu",
    "country": "Filipinler",
    "tr": false,
    "lounges": [
      {
        "name": "Plaza Premium",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Plaza Premium"
      }
    ]
  },
  {
    "code": "CGK",
    "name": "Soekarno-Hatta Uluslararası Havalimanı",
    "city": "Cakarta",
    "country": "Endonezya",
    "tr": false,
    "lounges": [
      {
        "name": "PLAZA PREMIUM LOUNGE",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Plaza Premium"
      }
    ]
  },
  {
    "code": "CGN",
    "name": "Bonn Havalimanı",
    "city": "Köln",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "The Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "CKY",
    "name": "Ahmed Sékou Touré Uluslararası Havalimanı",
    "city": "Konakri",
    "country": "Gine",
    "tr": false,
    "lounges": [
      {
        "name": "Salon Nimba",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "CLJ",
    "name": "Cluj Uluslararası Havaalanı",
    "city": "Cluj",
    "country": "Romanya",
    "tr": false,
    "lounges": [
      {
        "name": "Protocol Business Lounge",
        "terminal": "Uluslararası Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "CMB",
    "name": "Bandaranaike Uluslararası Havalimanı",
    "city": "Katunayake (Kolombo)",
    "country": "Sri Lanka",
    "tr": false,
    "lounges": [
      {
        "name": "Araliya",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "CMN",
    "name": "Muhammed V Uluslararası Havalimanı",
    "city": "Kazablanka",
    "country": "Fas",
    "tr": false,
    "lounges": [
      {
        "name": "Le Zénith I",
        "terminal": "Terminal 1",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "COO",
    "name": "Cotonou Havalimanı",
    "city": "Cotonou",
    "country": "Benin",
    "tr": false,
    "lounges": [
      {
        "name": "Lounge Ahs",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "CPH",
    "name": "Kopenhag Kastrup Havalimanı",
    "city": "Kopenhag",
    "country": "Danimarka",
    "tr": false,
    "lounges": [
      {
        "name": "Pearl Lounge",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "CPT",
    "name": "Cape Town Uluslararası Havalimanı",
    "city": "Cape Town",
    "country": "Güney Afrika",
    "tr": false,
    "lounges": [
      {
        "name": "Bidvest Premier",
        "terminal": "Dış Hatlar Terminali",
        "section": null,
        "scope": "both",
        "operator": "Bidvest"
      }
    ]
  },
  {
    "code": "CTA",
    "name": "Katanya Fontanarossa Havalimanı",
    "city": "Katanya",
    "country": "İtalya",
    "tr": false,
    "lounges": [
      {
        "name": "Lounge Sac",
        "terminal": "A Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "CUN",
    "name": "Cancun Havalimanı",
    "city": "Cancun",
    "country": "Meksika",
    "tr": false,
    "lounges": [
      {
        "name": "VIP Lounge by Mera",
        "terminal": "Terminal 4 - 67A Kapısı yanı",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DAC",
    "name": "Hazret Shahjalal Uluslararası Havalimanı",
    "city": "Dakka",
    "country": "Bangladeş",
    "tr": false,
    "lounges": [
      {
        "name": "EBL Sky Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DAR",
    "name": "Dar Es Salaam Uluslararası Havalimanı",
    "city": "Dar Es Selam",
    "country": "Tanzanya",
    "tr": false,
    "lounges": [
      {
        "name": "Twiga Lounge",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DBV",
    "name": "Dubrovnik Havalimanı",
    "city": "Dubrovnik",
    "country": "Hırvatistan",
    "tr": false,
    "lounges": [
      {
        "name": "Business",
        "terminal": "C Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DEL",
    "name": "Indira Gandhi Uluslararası Havalimanı",
    "city": "New Delhi",
    "country": "Hindistan",
    "tr": false,
    "lounges": [
      {
        "name": "Encalm Lounge",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Encalm"
      }
    ]
  },
  {
    "code": "DEN",
    "name": "Denver Uluslararası Havalimanı",
    "city": "Denver",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "United Airlines Lounge",
        "terminal": "5. Terminali",
        "section": null,
        "scope": "both",
        "operator": "United Airlines"
      }
    ]
  },
  {
    "code": "DFW",
    "name": "Dallas/Fort Worth Uluslararası Havalimanı",
    "city": "Dallas",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "Capital One",
        "terminal": "D Terminali (D22 Kapısı Yanı)",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DLA",
    "name": "Douala Uluslararası Havalimanı",
    "city": "Douala",
    "country": "Kamerun",
    "tr": false,
    "lounges": [
      {
        "name": "Mtn Lounge Doualair",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DMM",
    "name": "Kral Fahd Uluslararası Havalimanı",
    "city": "Dammam",
    "country": "Suudi Arabistan",
    "tr": false,
    "lounges": [
      {
        "name": "Plaza Premium",
        "terminal": "Single Terminal",
        "section": null,
        "scope": "both",
        "operator": "Plaza Premium"
      }
    ]
  },
  {
    "code": "DPS",
    "name": "Ngurah Rai Uluslararası Havalimanı",
    "city": "Denpasar",
    "country": "Endonezya",
    "tr": false,
    "lounges": [
      {
        "name": "Tujuwan Lounge",
        "terminal": "Dış Hatlar Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DSS",
    "name": "Blaise Diagne Uluslararası Havalimanı",
    "city": "Dakar",
    "country": "Senegal",
    "tr": false,
    "lounges": [
      {
        "name": "Odyssee - Infinite - Topkapi",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DTW",
    "name": "Detroit Metropolitan Havalimanı",
    "city": "Detroit",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "Lufthansa Lounge",
        "terminal": "Evans Terminali",
        "section": null,
        "scope": "both",
        "operator": "Lufthansa"
      }
    ]
  },
  {
    "code": "DUR",
    "name": "Kral Shaka Uluslararası Havalimanı",
    "city": "Durban",
    "country": "Güney Afrika",
    "tr": false,
    "lounges": [
      {
        "name": "Umphafa",
        "terminal": "International Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "DUS",
    "name": "Rhein Ruhr Uluslararası Havalimanı",
    "city": "Düsseldorf",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "Open Sky",
        "terminal": "A-B-C Terminalleri",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "EBB",
    "name": "Entebbe Uluslararası Havalimanı",
    "city": "Entebbe",
    "country": "Uganda",
    "tr": false,
    "lounges": [
      {
        "name": "Karibu",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "EBL",
    "name": "Erbil Havalimanı",
    "city": "Erbil",
    "country": "Irak",
    "tr": false,
    "lounges": [
      {
        "name": "Newroz Business Class",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "ECN",
    "name": "Ercan Havalimanı",
    "city": "Lefkoşa",
    "country": "Kuzey Kıbrıs Türk Cumhuriyeti",
    "tr": false,
    "lounges": [
      {
        "name": "PARAMARIBO",
        "terminal": "1. Terminal, 2. kat",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "EDI",
    "name": "Edinburgh Uluslararası Havalimanı",
    "city": "Edinburgh",
    "country": "Birleşik Krallık (İskoçya)",
    "tr": false,
    "lounges": [
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "Havalimanı Kat 2, 16 Nolu kapı yanı / Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": "Turkish Airlines"
      }
    ]
  },
  {
    "code": "EWR",
    "name": "Newark Liberty Uluslararası Havalimanı",
    "city": "Newark",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "Air France",
        "terminal": "B Terminali",
        "section": null,
        "scope": "both",
        "operator": "Air France"
      }
    ]
  },
  {
    "code": "EZE",
    "name": "Ezeiza Uluslararası Havalimanı (EZE)",
    "city": "Buenos Aires",
    "country": "Arjantin",
    "tr": false,
    "lounges": [
      {
        "name": "Star Alliance Lounge",
        "terminal": "T1",
        "section": null,
        "scope": "both",
        "operator": "Star Alliance"
      }
    ]
  },
  {
    "code": "FCO",
    "name": "Fiumicino - Leonardo Da Vinci Havalimanı",
    "city": "Roma",
    "country": "İtalya",
    "tr": false,
    "lounges": [
      {
        "name": "Plaza Premium",
        "terminal": "3. Terminal - Gidiş Kısmı",
        "section": null,
        "scope": "both",
        "operator": "Plaza Premium"
      }
    ]
  },
  {
    "code": "FIH",
    "name": "N'Djili Uluslararası Havalimanı",
    "city": "Kinşasa",
    "country": "Demokratik Kongo",
    "tr": false,
    "lounges": [
      {
        "name": "Salon VIP",
        "terminal": "Uluslararası Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "FNA",
    "name": "Lungi Uluslararası Havalimanı",
    "city": "Freetown",
    "country": "Sierra Leone",
    "tr": false,
    "lounges": [
      {
        "name": "Mcleod Airport Lounge",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "FRU",
    "name": "Manas Uluslararası Havalimanı",
    "city": "Bişkek",
    "country": "Kırgızistan",
    "tr": false,
    "lounges": [
      {
        "name": "Business Lounge",
        "terminal": "(SS'te '-' yazıyor)",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "GOT",
    "name": "Landvetter Havalimanı",
    "city": "Göteborg",
    "country": "İsveç",
    "tr": false,
    "lounges": [
      {
        "name": "Menzies",
        "terminal": "Uluslararası Terminal",
        "section": null,
        "scope": "both",
        "operator": "Menzies"
      }
    ]
  },
  {
    "code": "GRU",
    "name": "Guarulhos Havalimanı",
    "city": "Sao Paulo",
    "country": "Brezilya",
    "tr": false,
    "lounges": [
      {
        "name": "Espaco Banco Safra Lounge",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "GYD",
    "name": "Haydar Aliyev Uluslararası Havalimanı",
    "city": "Bakü",
    "country": "Azerbaycan",
    "tr": false,
    "lounges": [
      {
        "name": "Business Class",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "HAJ",
    "name": "Hannover Havalimanı",
    "city": "Hannover",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "Melli Beese",
        "terminal": "C Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "HAN",
    "name": "Noi Bai Uluslararası Havalimanı",
    "city": "Hanoi",
    "country": "Vietnam",
    "tr": false,
    "lounges": [
      {
        "name": "Nia Lounge",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "HAV",
    "name": "Jose Marti Uluslararası Havalimanı",
    "city": "Havana",
    "country": "Küba",
    "tr": false,
    "lounges": [
      {
        "name": "Salon CIP",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "HBE",
    "name": "Borg El Arab Havalimanı",
    "city": "İskenderiye",
    "country": "Mısır",
    "tr": false,
    "lounges": [
      {
        "name": "NATIONAL LOGISTICS SAE.",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "HEL",
    "name": "Helsinki-Vantaa Havalimanı",
    "city": "Helsinki",
    "country": "Finlandiya",
    "tr": false,
    "lounges": [
      {
        "name": "Plaza Premium Lounge",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Plaza Premium"
      }
    ]
  },
  {
    "code": "HKG",
    "name": "Hong Kong Uluslararası Havalimanı",
    "city": "Hong Kong",
    "country": "Hong Kong",
    "tr": false,
    "lounges": [
      {
        "name": "Plaza Premium",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Plaza Premium"
      }
    ]
  },
  {
    "code": "HKT",
    "name": "Puket Uluslararası Havalimanı",
    "city": "Puket",
    "country": "Tayland",
    "tr": false,
    "lounges": [
      {
        "name": "The Coral Executive Loounge",
        "terminal": "Ana Terminal Binası 4. kat",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "HND",
    "name": "Haneda Uluslararası Havalimanı",
    "city": "Tokyo",
    "country": "Japonya",
    "tr": false,
    "lounges": [
      {
        "name": "Lounge ANA",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": "ANA"
      }
    ]
  },
  {
    "code": "HRG",
    "name": "Hurgada Havalimanı",
    "city": "Hurgada",
    "country": "Mısır",
    "tr": false,
    "lounges": [
      {
        "name": "NATIONAL LOGISTICS SAE.",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "IAD",
    "name": "Washington Dulles Uluslararası Havalimanı",
    "city": "Washington",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "B Terminali (B43 numaralı kapının yanı)",
        "section": null,
        "scope": "both",
        "operator": "Turkish Airlines"
      }
    ]
  },
  {
    "code": "IAH",
    "name": "George Bush Kıtalararası Havalimanı",
    "city": "Houston",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "United",
        "terminal": "E Terminali",
        "section": null,
        "scope": "both",
        "operator": "United Airlines"
      }
    ]
  },
  {
    "code": "ICN",
    "name": "Incheon Uluslararası Havalimanı",
    "city": "Incheon (Seul)",
    "country": "Güney Kore",
    "tr": false,
    "lounges": [
      {
        "name": "Asiana",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Asiana Airlines"
      }
    ]
  },
  {
    "code": "ISB",
    "name": "İslamabad Uluslararası Havalimanı",
    "city": "İslamabad",
    "country": "Pakistan",
    "tr": false,
    "lounges": [
      {
        "name": "Airlines",
        "terminal": "Uluslararası Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "JIB",
    "name": "Ambouli Uluslararası Havalimanı",
    "city": "Ambouli (Cibuti)",
    "country": "Cibuti",
    "tr": false,
    "lounges": [
      {
        "name": "Salon CIP",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "JNB",
    "name": "Johannesburg Havalimanı",
    "city": "Johannesburg",
    "country": "Güney Afrika",
    "tr": false,
    "lounges": [
      {
        "name": "Saa Preminium",
        "terminal": "A Terminali",
        "section": null,
        "scope": "both",
        "operator": "South African Airways"
      }
    ]
  },
  {
    "code": "JRO",
    "name": "Kilimanjaro Uluslararası Havalimanı",
    "city": "Kilimanjaro",
    "country": "Tanzanya",
    "tr": false,
    "lounges": [
      {
        "name": "Twiga by Aspire",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": "Aspire"
      }
    ]
  },
  {
    "code": "KBL",
    "name": "Kabil Uluslararası Havalimanı",
    "city": "Kabil",
    "country": "Afganistan",
    "tr": false,
    "lounges": [
      {
        "name": "Business",
        "terminal": "Uluslararası Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "KGL",
    "name": "Kigali Havalimanı",
    "city": "Kigali",
    "country": "Ruanda",
    "tr": false,
    "lounges": [
      {
        "name": "Pearl",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "KHI",
    "name": "Jinnah Uluslararası Havalimanı",
    "city": "Karaçi",
    "country": "Pakistan",
    "tr": false,
    "lounges": [
      {
        "name": "Caa CIP",
        "terminal": "Uluslararası Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "KIX",
    "name": "Kansai Uluslararası Havalimanı",
    "city": "Osaka",
    "country": "Japonya",
    "tr": false,
    "lounges": [
      {
        "name": "KANSAI Airport Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "KRK",
    "name": "John Paul II Uluslararası Havaalanı",
    "city": "Krakow",
    "country": "Polonya",
    "tr": false,
    "lounges": [
      {
        "name": "Balice International Airport",
        "terminal": "Terminal 1",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "KRT",
    "name": "Hartum Havalimanı",
    "city": "Hartum",
    "country": "Sudan",
    "tr": false,
    "lounges": [
      {
        "name": "Sas CIP",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "KUL",
    "name": "Kuala Lumpur Uluslararası Havalimanı",
    "city": "Kuala Lumpur",
    "country": "Malezya",
    "tr": false,
    "lounges": [
      {
        "name": "Global Lounge",
        "terminal": "KLIA 1. Terminali Satellite",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "KWI",
    "name": "Kuveyt Uluslararası Havalimanı",
    "city": "Kuveyt",
    "country": "Kuveyt",
    "tr": false,
    "lounges": [
      {
        "name": "Dasman Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "KZN",
    "name": "Kazan Uluslararası Havalimanı",
    "city": "Kazan",
    "country": "Rusya",
    "tr": false,
    "lounges": [
      {
        "name": "SKY Lounge",
        "terminal": "1A Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "LAD",
    "name": "Quatro de Fevereiro Havalimanı",
    "city": "Luanda",
    "country": "Angola",
    "tr": false,
    "lounges": [
      {
        "name": "MENZIES AIRPORT",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Menzies"
      }
    ]
  },
  {
    "code": "LAX",
    "name": "Los Angeles Uluslararası Havalimanı",
    "city": "Los Angeles",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "Star Alliance",
        "terminal": "Tom Bradley / B Terminali",
        "section": null,
        "scope": "both",
        "operator": "Star Alliance"
      }
    ]
  },
  {
    "code": "LBV",
    "name": "Léon M'ba Uluslararası Havalimanı",
    "city": "Libreville",
    "country": "Gabon",
    "tr": false,
    "lounges": [
      {
        "name": "Salon Samba",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "LED",
    "name": "Pulkovo Havalimanı",
    "city": "St. Petersburg",
    "country": "Rusya",
    "tr": false,
    "lounges": [
      {
        "name": "Business Lounge (International)",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "LGW",
    "name": "Gatwick Havalimanı",
    "city": "Londra",
    "country": "Birleşik Krallık (İngiltere)",
    "tr": false,
    "lounges": [
      {
        "name": "Lounge 1",
        "terminal": "Güney Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "LHE",
    "name": "Allame İkbal Uluslararası Havalimanı",
    "city": "Lahor",
    "country": "Pakistan",
    "tr": false,
    "lounges": [
      {
        "name": "Salon CIP",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "LIS",
    "name": "Lizbon Poertela Havalimanı",
    "city": "Lizbon",
    "country": "Portekiz",
    "tr": false,
    "lounges": [
      {
        "name": "ANA Aeroportos Lounge",
        "terminal": "1. Terminali",
        "section": null,
        "scope": "both",
        "operator": "ANA Aeroportos"
      }
    ]
  },
  {
    "code": "LJU",
    "name": "Joze Pucnik Havalimanı",
    "city": "Lübliyana",
    "country": "Slovenya",
    "tr": false,
    "lounges": [
      {
        "name": "Business",
        "terminal": "Uluslararası Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "LOS",
    "name": "Murtala Muhammed Uluslararası Havalimanı",
    "city": "Lagos",
    "country": "Nijerya",
    "tr": false,
    "lounges": [
      {
        "name": "Sappire Lounge",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "LUN",
    "name": "Kenneth Kaunda Uluslararası Havalimanı",
    "city": "Lusaka",
    "country": "Zambiya",
    "tr": false,
    "lounges": [
      {
        "name": "Pearl Lounge",
        "terminal": "3. Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "LUX",
    "name": "Luxembourg Findel International Airport",
    "city": "Luxembourg",
    "country": "Lüksemburg",
    "tr": false,
    "lounges": [
      {
        "name": "Luxair Lounge",
        "terminal": "A Terminali",
        "section": null,
        "scope": "both",
        "operator": "Luxair"
      }
    ]
  },
  {
    "code": "LYS",
    "name": "Saint Exupery Havalimanı",
    "city": "Lyon",
    "country": "Fransa",
    "tr": false,
    "lounges": [
      {
        "name": "Mont Blanc",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MAD",
    "name": "Barajas Uluslararası Havalimanı",
    "city": "Madrid",
    "country": "İspanya",
    "tr": false,
    "lounges": [
      {
        "name": "Cibeles VIP",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MAN",
    "name": "Manchester Havalimanı",
    "city": "Manchester",
    "country": "Birleşik Krallık (İngiltere)",
    "tr": false,
    "lounges": [
      {
        "name": "Aspire Lounge",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Aspire"
      }
    ]
  },
  {
    "code": "MCT",
    "name": "Maskat Uluslararası Havalimanı",
    "city": "Maskat",
    "country": "Umman",
    "tr": false,
    "lounges": [
      {
        "name": "Primeclass",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "MED",
    "name": "Prens Muhammed Bin Abdülaziz Havalimanı",
    "city": "Medine",
    "country": "Suudi Arabistan",
    "tr": false,
    "lounges": [
      {
        "name": "PrimeClass Lounge",
        "terminal": "Dış Hatlar Terminali",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "MEL",
    "name": "Tullamarine Havalimanı",
    "city": "Melbourne",
    "country": "Avustralya",
    "tr": false,
    "lounges": [
      {
        "name": "Air New Zealand",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Air New Zealand"
      }
    ]
  },
  {
    "code": "MEX",
    "name": "Benito Juarez Uluslararası Havalimanı",
    "city": "Mexico City",
    "country": "Meksika",
    "tr": false,
    "lounges": [
      {
        "name": "United Airlines United club",
        "terminal": "Uluslararası Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": "United Airlines"
      }
    ]
  },
  {
    "code": "MLA",
    "name": "Luqa Havalimanı",
    "city": "Malta",
    "country": "Malta",
    "tr": false,
    "lounges": [
      {
        "name": "Salon CIP",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MLE",
    "name": "Valena (Velana) Uluslararası Havalimanı",
    "city": "Male",
    "country": "Maldivler",
    "tr": false,
    "lounges": [
      {
        "name": "Leeli",
        "terminal": "Uluslararası Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MNL",
    "name": "Ninoy Aquino Uluslararası Havalimanı",
    "city": "Manila",
    "country": "Filipinler",
    "tr": false,
    "lounges": [
      {
        "name": "Paggs",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MPM",
    "name": "Maputo Uluslararası Havalimanı",
    "city": "Maputo",
    "country": "Mozambik",
    "tr": false,
    "lounges": [
      {
        "name": "Fnb by Pearl Assist",
        "terminal": "A Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MRA",
    "name": "Misrata Uluslararası Havalimanı (MRA)",
    "city": "Misrata",
    "country": "Libya",
    "tr": false,
    "lounges": [
      {
        "name": "Altaie Company Lounge",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MRS",
    "name": "Marsilya Provence Havalimanı",
    "city": "Marsilya",
    "country": "Fransa",
    "tr": false,
    "lounges": [
      {
        "name": "Cézanne Lounge",
        "terminal": "Terminal 1B",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MRU",
    "name": "Sir Seewoosagur Ramgoolam Uluslararası Havalimanı",
    "city": "Port Louis",
    "country": "Mauritius",
    "tr": false,
    "lounges": [
      {
        "name": "Les Salons Amedee Maingard",
        "terminal": "Terminal 1 (28 numaralı gate karşısı)",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MUC",
    "name": "Münih Uluslararası Havalimanı",
    "city": "Münih",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "Havalimanı Lounge World",
        "terminal": "1/B Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "MXP",
    "name": "Malpensa Havalimanı",
    "city": "Milano",
    "country": "İtalya",
    "tr": false,
    "lounges": [
      {
        "name": "Montale Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "NAP",
    "name": "Napoli Uluslararası Havalimanı",
    "city": "Napoli",
    "country": "İtalya",
    "tr": false,
    "lounges": [
      {
        "name": "Pearl",
        "terminal": "1. Terminal (C17-C19 Kapıları Yanı)",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "NBO",
    "name": "Nairobi Jomo Kenyatta Uluslararası Havalimanı",
    "city": "Nairobi",
    "country": "Kenya",
    "tr": false,
    "lounges": [
      {
        "name": "Turkish Airlines Lounge (Star Alliance)",
        "terminal": "Terminal 1E (3 numaralı kapının yanı)",
        "section": null,
        "scope": "both",
        "operator": "Turkish Airlines"
      }
    ]
  },
  {
    "code": "NCE",
    "name": "Cote d'Azur Uluslararası Havalimanı",
    "city": "Nice",
    "country": "Fransa",
    "tr": false,
    "lounges": [
      {
        "name": "The Canopy Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "NDJ",
    "name": "Encemine Havalimanı",
    "city": "Encemine (N'Djamena)",
    "country": "Çad",
    "tr": false,
    "lounges": [
      {
        "name": "Tchad Handling Services LTD.",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "NIM",
    "name": "Diori Hamani Uluslararası Havalimanı",
    "city": "Niamey",
    "country": "Nijer",
    "tr": false,
    "lounges": [
      {
        "name": "Salon CIP",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "NKC",
    "name": "Nuakşot Havalimanı",
    "city": "Nuakşot",
    "country": "Moritanya",
    "tr": false,
    "lounges": [
      {
        "name": "Ya Marhaba",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "NRT",
    "name": "Narita Uluslararası Havalimanı",
    "city": "Tokyo (Narita)",
    "country": "Japonya",
    "tr": false,
    "lounges": [
      {
        "name": "Turkish Airlines Lounge",
        "terminal": "Güney Kanadı, Ek Terminal 4, Kapı 47 (anlaşmalı listede: Terminal 1, Uydu 4, Kapı 47)",
        "section": null,
        "scope": "both",
        "operator": "Turkish Airlines"
      }
    ]
  },
  {
    "code": "NSI",
    "name": "Yaunde Uluslararası Havalimanı",
    "city": "Yaunde",
    "country": "Kamerun",
    "tr": false,
    "lounges": [
      {
        "name": "Salon Privatif",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "NUE",
    "name": "Nürnberg Havalimanı",
    "city": "Nürnberg",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "Dürer",
        "terminal": "Güvenlik Sonrası (Pasaport Kontrolü Öncesi)",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "OHD",
    "name": "Ohrid St. Paul the Apostle Airport",
    "city": "Ohri",
    "country": "Kuzey Makedonya",
    "tr": false,
    "lounges": [
      {
        "name": "Primeclass CIP Lounge",
        "terminal": "International Terminal",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "OPO",
    "name": "Francisco Sa Carneiro Havalimanı",
    "city": "Porto",
    "country": "Portekiz",
    "tr": false,
    "lounges": [
      {
        "name": "Lounge Ana",
        "terminal": "1. Terminali",
        "section": null,
        "scope": "both",
        "operator": "ANA Aeroportos"
      }
    ]
  },
  {
    "code": "ORN",
    "name": "Oran Ahmed Ben Bella Havalimanı",
    "city": "Oran",
    "country": "Cezayir",
    "tr": false,
    "lounges": [
      {
        "name": "Air Algerie",
        "terminal": "1. Terminali",
        "section": null,
        "scope": "both",
        "operator": "Air Algerie"
      }
    ]
  },
  {
    "code": "OSL",
    "name": "Gardermoen Havalimanı",
    "city": "Oslo",
    "country": "Norveç",
    "tr": false,
    "lounges": [
      {
        "name": "OSL Lounge",
        "terminal": "Dış Hatlar Gidiş Terminali 2. Kat",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "PEK",
    "name": "Pekin Başkent Uluslararası Havalimanı",
    "city": "Pekin",
    "country": "Çin",
    "tr": false,
    "lounges": [
      {
        "name": "Air China Lounge",
        "terminal": "3E Terminali",
        "section": null,
        "scope": "both",
        "operator": "Air China"
      }
    ]
  },
  {
    "code": "PMO",
    "name": "Falcone Borsellino Havalimanı",
    "city": "Palermo",
    "country": "İtalya",
    "tr": false,
    "lounges": [
      {
        "name": "Prima Vista Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "PNH",
    "name": "Phnom Penh Uluslararası Havalimanı",
    "city": "Phnom Penh",
    "country": "Kamboçya",
    "tr": false,
    "lounges": [
      {
        "name": "Plaza Premium lounge",
        "terminal": "Uluslararası Terminal",
        "section": null,
        "scope": "both",
        "operator": "Plaza Premium"
      }
    ]
  },
  {
    "code": "PNR",
    "name": "Pointe-Noire Havalimanı",
    "city": "Pointe-Noire",
    "country": "Kongo",
    "tr": false,
    "lounges": [
      {
        "name": "Salon Ebene",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "PRG",
    "name": "Vaclac Havel Havalimanı",
    "city": "Prag",
    "country": "Çekya",
    "tr": false,
    "lounges": [
      {
        "name": "Master Card",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "PRN",
    "name": "Priştine Uluslararası Havalimanı",
    "city": "Priştine",
    "country": "Kosova",
    "tr": false,
    "lounges": [
      {
        "name": "Lounge 1702",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "PTY",
    "name": "Tocumen Uluslararası Havalimanı",
    "city": "Panama",
    "country": "Panama",
    "tr": false,
    "lounges": [
      {
        "name": "Copa",
        "terminal": "Terminal 1 / 2",
        "section": null,
        "scope": "both",
        "operator": "Copa Airlines"
      }
    ]
  },
  {
    "code": "PVG",
    "name": "Pudong Uluslararası Havalimanı",
    "city": "Şanghay",
    "country": "Çin",
    "tr": false,
    "lounges": [
      {
        "name": "Air China Business 71",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Air China"
      }
    ]
  },
  {
    "code": "RAK",
    "name": "Marrakech Menara Havalimanı",
    "city": "Marakeş",
    "country": "Fas",
    "tr": false,
    "lounges": [
      {
        "name": "Oasis (RAM) Lounge",
        "terminal": "Terminal 1",
        "section": null,
        "scope": "both",
        "operator": "Royal Air Maroc"
      }
    ]
  },
  {
    "code": "RIX",
    "name": "Riga Uluslararası Havalimanı",
    "city": "Riga",
    "country": "Letonya",
    "tr": false,
    "lounges": [
      {
        "name": "Primeclass Riga Business",
        "terminal": "E Terminali",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "RUH",
    "name": "King Khalid Uluslararası Havalimanı",
    "city": "Riyad",
    "country": "Suudi Arabistan",
    "tr": false,
    "lounges": [
      {
        "name": "Cozaya Lounge",
        "terminal": "Terminal 5",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "SCL",
    "name": "Arturo Merino Benitez Havalimanı",
    "city": "Santiago",
    "country": "Şili",
    "tr": false,
    "lounges": [
      {
        "name": "Primeclass Santiago SPA",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "SEA",
    "name": "Seattle-Tacoma Uluslararası Havalimanı",
    "city": "Seattle",
    "country": "ABD",
    "tr": false,
    "lounges": [
      {
        "name": "Club At Seattle",
        "terminal": "Güney Satellite Concourse Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "SEZ",
    "name": "Seyşeller Uluslararası Havalimanı",
    "city": "Seyşeller",
    "country": "Seyşeller",
    "tr": false,
    "lounges": [
      {
        "name": "Air Seychelles (Salon Vallee De Mai)",
        "terminal": "Ana terminal",
        "section": null,
        "scope": "both",
        "operator": "Air Seychelles"
      }
    ]
  },
  {
    "code": "SGN",
    "name": "Tan Son Nhat Uluslararası Havalimanı",
    "city": "Ho Chi Minh",
    "country": "Vietnam",
    "tr": false,
    "lounges": [
      {
        "name": "Le Saigonnais Business",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "SHJ",
    "name": "Şarika Havalimanı",
    "city": "Şarika",
    "country": "Birleşik Arap Emirlikleri",
    "tr": false,
    "lounges": [
      {
        "name": "The Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "SIN",
    "name": "Singapur Changi Havalimanı",
    "city": "Singapur",
    "country": "Singapur",
    "tr": false,
    "lounges": [
      {
        "name": "Sats Premium Lounge",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "SATS"
      }
    ]
  },
  {
    "code": "SJJ",
    "name": "Saraybosna Uluslararası Havalimanı",
    "city": "Saraybosna",
    "country": "Bosna Hersek",
    "tr": false,
    "lounges": [
      {
        "name": "Business Lounge",
        "terminal": "B Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "SKG",
    "name": "Selanik Makedonya Havalimanı",
    "city": "Selanik",
    "country": "Yunanistan",
    "tr": false,
    "lounges": [
      {
        "name": "Aegean",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Aegean Airlines"
      }
    ]
  },
  {
    "code": "SKP",
    "name": "Üsküp Uluslararası Havalimanı",
    "city": "Üsküp",
    "country": "Kuzey Makedonya",
    "tr": false,
    "lounges": [
      {
        "name": "TAV Primeclass Lounge",
        "terminal": "Tek Terminal",
        "section": null,
        "scope": "both",
        "operator": "TAV Primeclass"
      }
    ]
  },
  {
    "code": "SOF",
    "name": "Sofya Uluslararası Havalimanı",
    "city": "Sofya",
    "country": "Bulgaristan",
    "tr": false,
    "lounges": [
      {
        "name": "PrimeClass Lounge",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "SSH",
    "name": "Şarm El-Şeyh Uluslararası Havalimanı",
    "city": "Şarm El-Şeyh",
    "country": "Mısır",
    "tr": false,
    "lounges": [
      {
        "name": "Pearl Assist",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "STR",
    "name": "Stuttgart Havalimanı",
    "city": "Stuttgart",
    "country": "Almanya",
    "tr": false,
    "lounges": [
      {
        "name": "Airport Lounge",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "SZG",
    "name": "Wolfgang Amadeus Mozart Havalimanı",
    "city": "Salzburg",
    "country": "Avusturya",
    "tr": false,
    "lounges": [
      {
        "name": "Business",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "TAS",
    "name": "İslam Kerimov Taşkent Uluslararası Havalimanı",
    "city": "Taşkent",
    "country": "Özbekistan",
    "tr": false,
    "lounges": [
      {
        "name": "Anjir Business Lounge",
        "terminal": "Terminal 2",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "TBS",
    "name": "Tiflis Havalimanı",
    "city": "Tiflis",
    "country": "Gürcistan",
    "tr": false,
    "lounges": [
      {
        "name": "Primeclass",
        "terminal": "Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "TBZ",
    "name": "Tebriz Havalimanı",
    "city": "Tebriz",
    "country": "İran",
    "tr": false,
    "lounges": [
      {
        "name": "International CIP",
        "terminal": "Yakın Uluslararası Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "TIA",
    "name": "Tiran Uluslararası Havalimanı",
    "city": "Tiran",
    "country": "Arnavutluk",
    "tr": false,
    "lounges": [
      {
        "name": "Business Lounge",
        "terminal": "Terminal 1",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "TIF",
    "name": "Taif Bölgesel Havaalanı",
    "city": "Taif",
    "country": "Suudi Arabistan",
    "tr": false,
    "lounges": [
      {
        "name": "Hayyak Lounge",
        "terminal": "Dış Hatlar Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "TLL",
    "name": "Lennart Meri Tallinn Havalimanı",
    "city": "Tallinn",
    "country": "Estonya",
    "tr": false,
    "lounges": [
      {
        "name": "Airport LHV Lounge",
        "terminal": "Yolcu terminalinin 2. katı (Shengen Bölgesi)",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "TLS",
    "name": "Toulouse-Blagnac Havalimanı",
    "city": "Toulouse",
    "country": "Fransa",
    "tr": false,
    "lounges": [
      {
        "name": "La Croix Du Sud Lounge",
        "terminal": "Salon C",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "TNR",
    "name": "Ivato Uluslararası Havalimanı",
    "city": "Antananarivo",
    "country": "Madagaskar",
    "tr": false,
    "lounges": [
      {
        "name": "Prime Class",
        "terminal": "C Terminali",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "TPE",
    "name": "Taoyuan Uluslararası Havalimanı",
    "city": "Taoyuan (Taipei)",
    "country": "Tayvan",
    "tr": false,
    "lounges": [
      {
        "name": "Plaza Premium",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Plaza Premium"
      }
    ]
  },
  {
    "code": "TRN",
    "name": "Torino Havalimanı",
    "city": "Torino",
    "country": "İtalya",
    "tr": false,
    "lounges": [
      {
        "name": "SAGAT S.p.A Havalimanı",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "SAGAT"
      }
    ]
  },
  {
    "code": "TSR",
    "name": "Timisoara Traian Vuia Uluslararası Havalimanı",
    "city": "Temeşvar",
    "country": "Romanya",
    "tr": false,
    "lounges": [
      {
        "name": "S.N. Aeroportul International Timisoara",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "TUN",
    "name": "Kartaca Havalimanı",
    "city": "Tunus",
    "country": "Tunus",
    "tr": false,
    "lounges": [
      {
        "name": "Salon Privilige",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "UBN",
    "name": "Cengiz Han Uluslararası Havalimanı",
    "city": "Ulanbator",
    "country": "Moğolistan",
    "tr": false,
    "lounges": [
      {
        "name": "Blue Sky Lounge",
        "terminal": "Dış Hatlar Terminali",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "VAR",
    "name": "Varna Havalimanı",
    "city": "Varna",
    "country": "Bulgaristan",
    "tr": false,
    "lounges": [
      {
        "name": "Business",
        "terminal": "2. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "VCE",
    "name": "Marco Polo Havalimanı",
    "city": "Venedik",
    "country": "İtalya",
    "tr": false,
    "lounges": [
      {
        "name": "Marco Polo",
        "terminal": "Ana Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "VIE",
    "name": "Viyana Uluslararası Havalimanı",
    "city": "Viyana",
    "country": "Avusturya",
    "tr": false,
    "lounges": [
      {
        "name": "Viyana Lounge",
        "terminal": "Terminal 1",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "VKO",
    "name": "Moskova Vnukovo Uluslararası Havalimanı",
    "city": "Moskova",
    "country": "Rusya",
    "tr": false,
    "lounges": [
      {
        "name": "Istanbul-Moscow",
        "terminal": "Terminal A",
        "section": null,
        "scope": "both",
        "operator": "Turkish Airlines"
      }
    ]
  },
  {
    "code": "VLC",
    "name": "Valensiya Havalimanı",
    "city": "Valensiya",
    "country": "İspanya",
    "tr": false,
    "lounges": [
      {
        "name": "Joan Olivert",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "VNO",
    "name": "Vilnius Uluslararası Havalimanı",
    "city": "Vilnius",
    "country": "Litvanya",
    "tr": false,
    "lounges": [
      {
        "name": "Narbutas Business",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": null
      }
    ]
  },
  {
    "code": "YUL",
    "name": "Montreal-Pierre Elliot Trudeau Uluslararası Havalimanı",
    "city": "Montreal",
    "country": "Kanada",
    "tr": false,
    "lounges": [
      {
        "name": "Maple Leaf Lounge",
        "terminal": "Uluslararası Terminal",
        "section": null,
        "scope": "both",
        "operator": "Air Canada"
      }
    ]
  },
  {
    "code": "YVR",
    "name": "Vancouver Uluslararası Havalimanı",
    "city": "Vancouver",
    "country": "Kanada",
    "tr": false,
    "lounges": [
      {
        "name": "Skyteam",
        "terminal": "Uluslararası Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": "SkyTeam"
      }
    ]
  },
  {
    "code": "YYZ",
    "name": "Lester B. Pearson Uluslararası Havalimanı",
    "city": "Toronto",
    "country": "Kanada",
    "tr": false,
    "lounges": [
      {
        "name": "Ac Maple Leaf",
        "terminal": "1. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Air Canada"
      }
    ]
  },
  {
    "code": "ZAG",
    "name": "Zagreb Havalimanı",
    "city": "Zagreb",
    "country": "Hırvatistan",
    "tr": false,
    "lounges": [
      {
        "name": "Prime Class",
        "terminal": "Uluslararası Gidiş Terminali",
        "section": null,
        "scope": "both",
        "operator": "Primeclass"
      }
    ]
  },
  {
    "code": "ZNZ",
    "name": "Abeid Amani Karume Uluslararası Havalimanı",
    "city": "Zanzibar",
    "country": "Tanzanya",
    "tr": false,
    "lounges": [
      {
        "name": "Marhaba Lounge",
        "terminal": "3. Terminal",
        "section": null,
        "scope": "both",
        "operator": "Marhaba"
      }
    ]
  },
  {
    "code": "ZRH",
    "name": "Zürih Kloten Havalimanı",
    "city": "Zürih",
    "country": "İsviçre",
    "tr": false,
    "lounges": [
      {
        "name": "Aspire Lounge",
        "terminal": "E Terminali",
        "section": null,
        "scope": "both",
        "operator": "Aspire"
      }
    ]
  }
];

export const TR_AIRPORTS = AIRPORTS_FULL.filter((a) => a.tr);
export const ABROAD_AIRPORTS = AIRPORTS_FULL.filter((a) => !a.tr);

export const LOUNGE_COUNTS = {
  "airports": 222,
  "lounges": 284,
  "countries": 118,
  "trAirports": 15,
  "trLounges": 48,
  "trCities": 14,
  "abroadAirports": 207,
  "abroadLounges": 236,
  "abroadCountries": 117
};

export const findAirport = (code) =>
  AIRPORTS_FULL.find((a) => a.code === String(code).toUpperCase());

// İç hat / dış hat ayrımı: kapsam kolonu bunu taşıyor.
// Kapsam üç değer alır: "domestic" · "international" · "both".
// "both" salonu her iki terminalde de hizmet verir, bu yüzden İKİ
// listede birden görünür — tek listeye sıkıştırmak, o salonu diğer
// terminalde YOK saymak demektir.
export const inScope = (l, scope) => l.scope === scope || l.scope === "both";

export const splitScope = (a) => ({
  domestic: a.lounges.filter((l) => inScope(l, "domestic")),
  international: a.lounges.filter((l) => inScope(l, "international")),
});
