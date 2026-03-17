export default async function handler(req, res) {
  try {
    const markets = {
      oil: 82.4,
      gold: 2188.2,
      sp500: 5128.4,
      interestRate: 4.75,
      shipping: 1460
    };

    const signals = [];

    if (markets.oil > 80) {
      signals.push({
        title: "Energy Pressure",
        severity: "high",
        category: "energy",
        summary: "Energy markets under pressure due to elevated oil prices."
      });
    }

    if (markets.shipping > 1450) {
      signals.push({
        title: "Logistics Stress",
        severity: "medium",
        category: "logistics",
        summary: "Shipping costs remain elevated across key routes."
      });
    }

    if (signals.length === 0) {
      signals.push({
        title: "Stable Conditions",
        severity: "low",
        category: "system",
        summary: "Markets are currently stable."
      });
    }

    const data = {
      system: {
        name: "ZENTRA",
        mode: "LIVE",
        status: "operational"
      },
      markets,
      signals,
      dominantDriver: signals[0].title,
      updatedAt: new Date().toISOString()
    };

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "live data error",
      message: String(error)
    });
  }
}
