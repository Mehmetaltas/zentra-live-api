export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // 🔹 MOCK + REAL MIX (V2 başlangıç)
    const markets = {
      oil: await getOil(),
      gold: await getGold(),
      sp500: await getSP(),
      interestRate: 4.75,
      shipping: 1460
    };

    const signals = [];

    if (markets.oil > 80) {
      signals.push({
        title: "Energy Pressure",
        severity: "high",
        summary: "Oil above threshold"
      });
    }

    if (markets.shipping > 1450) {
      signals.push({
        title: "Logistics Stress",
        severity: "medium",
        summary: "Shipping pressure"
      });
    }

    return res.status(200).json({
      system: { name: "ZENTRA", mode: "LIVE", status: "operational" },
      markets,
      signals,
      dominantDriver: signals[0]?.title || "None",
      source: "live-data-engine",
      updatedAt: new Date().toISOString()
    });

  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}

// 🔹 GEÇİCİ DATA (sonra gerçek API bağlanacak)
async function getOil(){ return 82.4 }
async function getGold(){ return 2188.2 }
async function getSP(){ return 5128.4 }
