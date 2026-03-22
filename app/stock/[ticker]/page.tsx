"use client";

import Link from "next/link";
import { use } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Signal = {
  title: string;
  type: string;
  impact: "Positive" | "Negative" | "Mixed";
  whyItMatters: string;
};

type Supplier = {
  name: string;
  provides: string;
  riskLevel: "High" | "Medium" | "Low";
  disruptionNote: string;
};

type StockData = {
  companyName: string;
  description: string;
  keyExposures: string[];
  keySuppliers: Supplier[];
  businessStages: string[];
  recentSignals: Signal[];
  investorTakeaway: string;
};

type StockDatabase = {
  [ticker: string]: StockData;
};

// ─── Hardcoded Data ───────────────────────────────────────────────────────────

const stocks: StockDatabase = {
  NKE: {
    companyName: "Nike, Inc.",
    description:
      "Nike is the world's largest athletic footwear and apparel company, selling products in over 190 countries. It operates through wholesale partners and its own direct-to-consumer channels, including Nike.com and owned retail stores.",
    keyExposures: [
      "Overseas manufacturing concentration (primarily Vietnam, Indonesia, China)",
      "Consumer discretionary spending cycles in North America and Europe",
      "Foreign exchange fluctuations, especially USD vs. EUR, CNY, and GBP",
      "Raw material and freight input costs (cotton, rubber, ocean shipping)",
      "Competitive pressure from Adidas, On Running, Hoka, and New Balance",
      "Direct-to-consumer mix shift and its effect on margins",
    ],
    keySuppliers: [
      {
        name: "Pou Chen Group",
        provides: "Footwear manufacturing — largest Nike factory partner globally",
        riskLevel: "High",
        disruptionNote:
          "Pou Chen operates massive facilities in Vietnam and Indonesia. A labor strike, factory fire, or regional lockdown at Pou Chen directly reduces Nike's footwear output and can delay seasonal product launches.",
      },
      {
        name: "Eclat Textile",
        provides: "Performance apparel fabrics and finished garments",
        riskLevel: "Medium",
        disruptionNote:
          "Eclat supplies high-performance knit fabrics used in Nike's Dri-FIT and premium apparel lines. Disruption affects the higher-margin apparel segment more than footwear.",
      },
      {
        name: "Feng Tay Enterprises",
        provides: "Footwear manufacturing (Vietnam-based)",
        riskLevel: "High",
        disruptionNote:
          "Feng Tay is one of Nike's top three footwear manufacturers and is concentrated in Vietnam. Any Vietnam-wide supply shock — tariffs, flooding, or labor unrest — hits Feng Tay directly.",
      },
      {
        name: "Makalot Industrial",
        provides: "Apparel manufacturing across Southeast Asia",
        riskLevel: "Low",
        disruptionNote:
          "Makalot produces lower-complexity apparel items. Disruption would affect volume but Nike has more flexibility to shift apparel orders than footwear given lower switching costs.",
      },
      {
        name: "YuPoong / Headwear Suppliers",
        provides: "Caps, headwear, and accessories",
        riskLevel: "Low",
        disruptionNote:
          "Accessories are a small revenue contributor. Disruption here has minimal impact on Nike's core financials.",
      },
    ],
    businessStages: [
      "1. Raw Materials — Cotton, rubber, and synthetic inputs sourced globally",
      "2. Outsourced Manufacturing — ~95% of footwear made by third-party factories in Vietnam and Indonesia",
      "3. Logistics & Freight — Ocean shipping to regional distribution hubs; sensitive to freight rates",
      "4. Wholesale Distribution — Products sold through retail partners (Foot Locker, Dick's Sporting Goods, etc.)",
      "5. Direct-to-Consumer — Nike.com and owned stores; higher-margin channel growing in share",
      "6. End Consumer Demand — Influenced by brand strength, athlete sponsorships, and discretionary spending",
    ],
    recentSignals: [
      {
        title: "Vietnam Factory Output Disruption",
        type: "Supply Chain",
        impact: "Negative",
        whyItMatters:
          "Vietnam accounts for over 50% of Nike's footwear production. Any labor disputes, export restrictions, or shutdowns can directly reduce product availability and delay seasonal launches.",
      },
      {
        title: "North America Wholesale Inventory Buildup",
        type: "Demand",
        impact: "Negative",
        whyItMatters:
          "When retailers over-order Nike product and sit on excess inventory, they cut future purchase orders. This compresses Nike's revenue and often forces promotional discounting that hurts margins.",
      },
      {
        title: "Strong DTC Revenue Growth",
        type: "Business Mix",
        impact: "Positive",
        whyItMatters:
          "Nike selling directly to consumers generates higher margins than wholesale. Consistent DTC growth signals the company is reducing its reliance on third-party retailers.",
      },
      {
        title: "USD Strengthening vs. Euro and Yuan",
        type: "Foreign Exchange",
        impact: "Negative",
        whyItMatters:
          "Nike earns a large portion of revenue in euros and Chinese yuan. When the dollar strengthens, those foreign revenues translate into fewer dollars when reported.",
      },
      {
        title: "New Running Category Competitors Gaining Share",
        type: "Competition",
        impact: "Mixed",
        whyItMatters:
          "Brands like On Running, Hoka, and New Balance have gained meaningful market share in the premium running segment. This pressures Nike's pricing power, though Nike's scale advantage remains significant.",
      },
    ],
    investorTakeaway:
      "Nike's stock is most sensitive to North American consumer health, the trajectory of its direct-to-consumer channel, and foreign exchange movements. A strong dollar and weak consumer spending are the two biggest headwinds in any given quarter. Watch DTC revenue growth and gross margin trends — these are the clearest signals of whether Nike's business model shift is working.",
  },

  ADDYY: {
    companyName: "Adidas AG",
    description:
      "Adidas is a German multinational sportswear company and the largest European maker of athletic footwear and apparel. It competes globally across performance sports and lifestyle segments, with major exposure to soccer, running, and street fashion.",
    keyExposures: [
      "Global sportswear demand cycles, especially in North America and Greater China",
      "Brand and product cycle momentum (key silhouettes, collaborations, and franchise performance)",
      "Foreign exchange risk — Adidas reports in euros but earns heavily in USD and CNY",
      "Supply chain concentration in Asia (Vietnam, Cambodia, China)",
      "Competitive pressure from Nike, New Balance, and emerging performance brands",
      "Inventory overhang risk from excess Yeezy stock following brand partnership termination",
    ],
    keySuppliers: [
      {
        name: "Pou Chen Group",
        provides: "Footwear manufacturing — shared major supplier with Nike",
        riskLevel: "High",
        disruptionNote:
          "Pou Chen is also one of Adidas's largest footwear manufacturers, primarily in Vietnam. A single supply shock at Pou Chen can hurt both Adidas and Nike simultaneously, limiting the industry's ability to absorb production elsewhere.",
      },
      {
        name: "Yue Yuen Industrial",
        provides: "Footwear manufacturing (subsidiary of Pou Chen)",
        riskLevel: "High",
        disruptionNote:
          "Yue Yuen is the world's largest branded athletic and casual footwear manufacturer. It produces a significant share of Adidas's footwear volume. Labor strikes at Yue Yuen — which have occurred historically — directly impact delivery timelines.",
      },
      {
        name: "Eclat Textile",
        provides: "Performance fabrics for apparel",
        riskLevel: "Medium",
        disruptionNote:
          "Eclat supplies technical fabrics across Adidas's performance apparel lines. A disruption would affect premium product availability more than core basics.",
      },
      {
        name: "Tex-Ray Industrial",
        provides: "Apparel and sportswear manufacturing",
        riskLevel: "Low",
        disruptionNote:
          "Tex-Ray handles mid-tier apparel production. Adidas has more flexibility to reallocate apparel orders compared to footwear given lower complexity.",
      },
      {
        name: "Regional Cambodia Factories",
        provides: "Low-cost apparel and basics manufacturing",
        riskLevel: "Medium",
        disruptionNote:
          "Adidas has shifted some production to Cambodia to reduce Vietnam concentration. Political instability or labor disruption in Cambodia is a growing watch item given increased reliance.",
      },
    ],
    businessStages: [
      "1. Raw Materials — Polyester, rubber, and leather inputs sourced via suppliers",
      "2. Third-Party Manufacturing — Primarily in Vietnam, Cambodia, and China",
      "3. Logistics — Shipped to regional distribution centers in Germany, U.S., and Asia",
      "4. Wholesale Retail Partners — Sold through Foot Locker, JD Sports, and sporting goods chains",
      "5. Own-Retail & E-commerce — Adidas.com and flagship stores; growing margin contributor",
      "6. End Consumer Demand — Driven by brand heat, franchise performance, and lifestyle trends",
    ],
    recentSignals: [
      {
        title: "Greater China Market Recovery Gaining Momentum",
        type: "Regional Demand",
        impact: "Positive",
        whyItMatters:
          "China is one of Adidas's most important markets. Early recovery signals in Chinese consumer spending are material to Adidas's revenue outlook.",
      },
      {
        title: "Yeezy Inventory Liquidation Strategy",
        type: "Inventory / Brand",
        impact: "Mixed",
        whyItMatters:
          "After ending its Yeezy partnership, Adidas was left with billions in unsold inventory. Selling it off generates cash but requires heavy discounting, weighing on margins.",
      },
      {
        title: "Terrace and Lifestyle Silhouette Momentum",
        type: "Product Cycle",
        impact: "Positive",
        whyItMatters:
          "Adidas's retro styles (Samba, Gazelle, Campus) have become culturally dominant. Strong sell-through in lifestyle categories drives full-price revenue and reduces promotional pressure.",
      },
      {
        title: "Euro Appreciation vs. U.S. Dollar",
        type: "Foreign Exchange",
        impact: "Negative",
        whyItMatters:
          "Adidas reports earnings in euros. When the euro strengthens against the dollar, U.S. revenues translate into fewer euros, creating a currency headwind.",
      },
      {
        title: "European Consumer Sentiment Softening",
        type: "Demand",
        impact: "Negative",
        whyItMatters:
          "Germany and Western Europe are Adidas's home market. When European consumers pull back on discretionary spending, Adidas sees direct pressure on sales volumes.",
      },
    ],
    investorTakeaway:
      "Adidas stock is driven by brand cycle momentum, Greater China recovery, and the resolution of its Yeezy inventory overhang. The company's gross margin is the key metric to watch — it captures whether Adidas is selling at full price or discounting. Currency is a persistent factor given the euro-reporting structure.",
  },

  AAPL: {
    companyName: "Apple Inc.",
    description:
      "Apple designs and sells consumer electronics, software, and services. Its product lineup is anchored by the iPhone, supplemented by Mac, iPad, Apple Watch, and AirPods, with a fast-growing Services segment including the App Store, Apple Music, and iCloud.",
    keyExposures: [
      "iPhone upgrade cycle timing and consumer demand for premium smartphones",
      "China manufacturing concentration — primarily through Foxconn and Pegatron",
      "Greater China consumer demand as both a production and revenue market",
      "Advanced semiconductor supply (Apple Silicon, TSMC relationship)",
      "Foreign exchange exposure across major markets (EUR, CNY, JPY)",
      "Services revenue growth rate and regulatory risk to App Store business model",
    ],
    keySuppliers: [
      {
        name: "TSMC (Taiwan Semiconductor)",
        provides: "Apple Silicon chips — A-series and M-series processors",
        riskLevel: "High",
        disruptionNote:
          "TSMC fabricates virtually all of Apple's custom chips in Taiwan. A geopolitical escalation between China and Taiwan, a natural disaster, or a production yield problem at TSMC would halt Apple's ability to build iPhones, Macs, and iPads. This is Apple's single highest-concentration supply risk.",
      },
      {
        name: "Foxconn (Hon Hai Precision)",
        provides: "iPhone and iPad final assembly — largest Apple manufacturer",
        riskLevel: "High",
        disruptionNote:
          "Foxconn assembles the majority of iPhones at its massive Zhengzhou facility in China. COVID-era lockdowns at Foxconn directly caused Apple to miss iPhone 14 Pro shipment targets in late 2022, demonstrating the real revenue impact of disruption here.",
      },
      {
        name: "Samsung Display / LG Display",
        provides: "OLED and LCD screens for iPhone, iPad, and MacBook",
        riskLevel: "Medium",
        disruptionNote:
          "Apple sources premium OLED panels from Samsung and LG. A display supply shortage would constrain Pro iPhone production specifically, as OLED panels are harder to substitute than LCD. Apple has been developing its own display tech to reduce this dependency.",
      },
      {
        name: "Pegatron",
        provides: "iPhone assembly — secondary manufacturer to Foxconn",
        riskLevel: "Medium",
        disruptionNote:
          "Pegatron handles a portion of iPhone assembly, primarily for older or mid-tier models. It provides some manufacturing redundancy against Foxconn disruption, though it cannot absorb Foxconn's full volume.",
      },
      {
        name: "Murata Manufacturing",
        provides: "Capacitors, filters, and wireless components",
        riskLevel: "Medium",
        disruptionNote:
          "Murata supplies critical passive components and wireless chips used across Apple's device lineup. A shortage of these components — as seen during the broader semiconductor shortage — can create production bottlenecks even when chip supply is stable.",
      },
      {
        name: "Luxshare Precision",
        provides: "AirPods and Apple Watch assembly",
        riskLevel: "Low",
        disruptionNote:
          "Luxshare assembles AirPods and Apple Watch, which are important but smaller revenue contributors relative to iPhone. Disruption here would not materially affect Apple's top line.",
      },
    ],
    businessStages: [
      "1. Components & Chips — Apple Silicon designed in-house; fabricated by TSMC in Taiwan",
      "2. Component Sourcing — Displays (Samsung/LG), cameras, memory, and sensors from global suppliers",
      "3. Assembly — Final device assembly concentrated in China (Foxconn) with some shift to India/Vietnam",
      "4. Shipping & Distribution — Air freight for launches; sea freight for steady-state supply",
      "5. Product Launch & Retail — September iPhone cycle drives ~50% of annual product revenue",
      "6. Upgrade Cycle & Services — Installed base drives App Store, iCloud, Apple Music recurring revenue",
    ],
    recentSignals: [
      {
        title: "iPhone Demand Slowdown in Premium Segment",
        type: "Product Demand",
        impact: "Negative",
        whyItMatters:
          "The iPhone accounts for roughly half of Apple's total revenue. When premium consumers delay upgrades, Apple's top-line growth stalls and earnings estimates get revised down.",
      },
      {
        title: "India Assembly Capacity Expansion",
        type: "Supply Chain",
        impact: "Positive",
        whyItMatters:
          "Apple has been accelerating iPhone assembly in India as a hedge against China concentration risk. Growing Indian production capacity reduces geopolitical supply risk.",
      },
      {
        title: "U.S.–China Trade Tensions and Tariff Risk",
        type: "Geopolitical / Supply Chain",
        impact: "Negative",
        whyItMatters:
          "The majority of Apple's devices are still assembled in China. Escalating tariffs or export restrictions could significantly raise Apple's cost structure or disrupt product availability.",
      },
      {
        title: "Services Revenue Accelerating Above Expectations",
        type: "Business Mix",
        impact: "Positive",
        whyItMatters:
          "Services carry much higher gross margins (~70%+) than hardware. Faster Services growth improves overall company margins and provides stable recurring revenue.",
      },
      {
        title: "EU Regulatory Scrutiny of App Store Policies",
        type: "Regulatory",
        impact: "Negative",
        whyItMatters:
          "European regulators have pushed Apple to open iOS to third-party app stores. Forced changes could reduce Apple's Services take rate and impact a key margin driver.",
      },
    ],
    investorTakeaway:
      "Apple's stock is most sensitive to iPhone cycle expectations, China supply chain stability, and the growth trajectory of its Services business. Geopolitical tension between the U.S. and China is an ever-present tail risk. The Services segment is the long-term margin story — watch its growth rate relative to the installed base for the clearest signal on Apple's earnings power.",
  },

  BA: {
    companyName: "Boeing Company",
    description:
      "Boeing is one of the world's largest aerospace and defense manufacturers, producing commercial aircraft (737, 787, 777), defense systems, satellites, and space vehicles. It serves both commercial airlines and the U.S. government and allied militaries.",
    keyExposures: [
      "Commercial aircraft delivery pace — a primary driver of quarterly cash flow recognition",
      "Supplier bottlenecks (fuselages, engines, fasteners) that can halt final assembly",
      "FAA and international regulatory approval timelines for new or modified aircraft",
      "Airline industry health and travel demand, which drives orders and delivery appetite",
      "Defense and government contract performance and U.S. defense budget cycles",
      "Labor relations — strikes or slowdowns in manufacturing workforce",
    ],
    keySuppliers: [
      {
        name: "Spirit AeroSystems",
        provides: "737 fuselages and 787 composite structures",
        riskLevel: "High",
        disruptionNote:
          "Spirit AeroSystems is Boeing's most critical external supplier. It manufactures the 737 MAX fuselage at its Wichita, Kansas facility. Quality defects found in Spirit-produced fuselages in 2024 directly triggered FAA production caps on Boeing, causing delivery shortfalls and revenue misses. Boeing announced plans to reacquire Spirit to regain control of this bottleneck.",
      },
      {
        name: "GE Aerospace / CFM International",
        provides: "LEAP-1B engines for the 737 MAX",
        riskLevel: "High",
        disruptionNote:
          "CFM International (a GE-Safran joint venture) is the sole engine supplier for the 737 MAX. Any production shortfall or quality issue with LEAP engines halts 737 deliveries, as Boeing cannot ship aircraft without certified engines installed.",
      },
      {
        name: "Rolls-Royce",
        provides: "Trent 1000 engines for the 787 Dreamliner",
        riskLevel: "High",
        disruptionNote:
          "Rolls-Royce supplies Trent 1000 engines for a portion of 787 orders. Historical durability issues with Trent 1000 blades grounded in-service 787s and caused delivery delays, directly impacting Boeing's widebody program revenue.",
      },
      {
        name: "Safran",
        provides: "Landing gear systems and nacelles for multiple Boeing programs",
        riskLevel: "Medium",
        disruptionNote:
          "Safran provides landing gear and nacelle components across Boeing's commercial fleet. A production delay at Safran creates a line-stoppage risk at Boeing's final assembly facilities.",
      },
      {
        name: "Ducommun",
        provides: "Structural components, titanium parts, and electronics",
        riskLevel: "Medium",
        disruptionNote:
          "Ducommun supplies structural parts used in multiple Boeing programs. Titanium supply constraints — particularly following Russia sanctions, as Russia was a major titanium source — have elevated risk at tier-2 suppliers like Ducommun.",
      },
      {
        name: "TransDigm Group",
        provides: "Proprietary aerospace components across Boeing's fleet",
        riskLevel: "Medium",
        disruptionNote:
          "TransDigm manufactures highly specialized, sole-source components with limited substitutes. If TransDigm raises prices or faces production issues, Boeing has few alternatives, making this a pricing and availability risk.",
      },
    ],
    businessStages: [
      "1. Raw Materials & Parts — Titanium, aluminum, composites sourced from global suppliers",
      "2. Major Component Manufacturing — Fuselages (Spirit AeroSystems), wings, and engine nacelles built by suppliers",
      "3. Final Aircraft Assembly — Completed at Boeing's facilities in Renton (737) and Everett (787/777), WA",
      "4. Flight Testing & Certification — Each aircraft type requires FAA sign-off before delivery",
      "5. Aircraft Delivery — Revenue is recognized at delivery, making delivery count a key quarterly metric",
      "6. Airline Operating Environment — Airline profitability drives decisions to accept deliveries or defer orders",
    ],
    recentSignals: [
      {
        title: "FAA Production Cap on 737 MAX Monthly Output",
        type: "Regulatory",
        impact: "Negative",
        whyItMatters:
          "The FAA has restricted how many 737 MAX aircraft Boeing can produce per month following quality control findings. This directly limits Boeing's ability to generate cash flow.",
      },
      {
        title: "Spirit AeroSystems Fuselage Supply Disruption",
        type: "Supply Chain",
        impact: "Negative",
        whyItMatters:
          "Spirit AeroSystems manufactures the 737 fuselage. Defects or production slowdowns at Spirit create a bottleneck that halts Boeing's final assembly line.",
      },
      {
        title: "Strong Airline Forward Order Book",
        type: "Demand",
        impact: "Positive",
        whyItMatters:
          "Boeing maintains a multi-year backlog of aircraft orders from global airlines. A healthy backlog provides long-term revenue visibility and signals customer commitment despite near-term delays.",
      },
      {
        title: "Defense Contract Cost Overruns",
        type: "Defense / Government",
        impact: "Negative",
        whyItMatters:
          "Fixed-price defense contracts have produced billions in write-downs for Boeing when development costs exceeded contract value. Each charge directly hits earnings and cash flow.",
      },
      {
        title: "International Travel Recovery Driving Widebody Demand",
        type: "Airline Demand",
        impact: "Positive",
        whyItMatters:
          "Long-haul international routes require widebody aircraft like the 787 Dreamliner. As global travel volumes recover, airlines are accelerating widebody orders — a positive for Boeing's higher-margin programs.",
      },
    ],
    investorTakeaway:
      "Boeing's stock is fundamentally a cash flow story tied directly to how many aircraft it can deliver per quarter. Regulatory constraints, supplier defects, and labor disruptions are the three most common causes of delivery shortfalls. Long-term, Boeing's order backlog is substantial, but the market discounts that backlog until Boeing demonstrates it can produce and deliver at scale without safety or quality setbacks.",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getImpactStyle(impact: Signal["impact"]): React.CSSProperties {
  if (impact === "Positive") return { backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" };
  if (impact === "Negative") return { backgroundColor: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" };
  return { backgroundColor: "#fffbeb", color: "#b45309", border: "1px solid #fde68a" };
}

function getBorderColor(impact: Signal["impact"]): string {
  if (impact === "Positive") return "#22c55e";
  if (impact === "Negative") return "#ef4444";
  return "#f59e0b";
}

function getRiskStyle(risk: Supplier["riskLevel"]): React.CSSProperties {
  if (risk === "High") return { backgroundColor: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" };
  if (risk === "Medium") return { backgroundColor: "#fffbeb", color: "#b45309", border: "1px solid #fde68a" };
  return { backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" };
}

function getSupplierBorderColor(risk: Supplier["riskLevel"]): string {
  if (risk === "High") return "#ef4444";
  if (risk === "Medium") return "#f59e0b";
  return "#22c55e";
}

function getSignalCounts(signals: Signal[]) {
  return {
    positive: signals.filter((s) => s.impact === "Positive").length,
    negative: signals.filter((s) => s.impact === "Negative").length,
    mixed: signals.filter((s) => s.impact === "Mixed").length,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker: rawTicker } = use(params);
  const ticker = rawTicker.toUpperCase();
  const stock = stocks[ticker];

  if (!stock) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "64px 16px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "48px", fontWeight: 800, color: "#d1d5db" }}>404</p>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1f2937", marginTop: "12px" }}>Stock Not Found</h1>
          <p style={{ color: "#6b7280", marginTop: "8px" }}>
            We don't have data for ticker <strong>{ticker}</strong> yet.
          </p>
          <Link href="/" style={{
            display: "inline-block", marginTop: "24px", backgroundColor: "#111827",
            color: "white", padding: "12px 24px", borderRadius: "12px",
            fontWeight: 600, textDecoration: "none", fontSize: "14px",
          }}>
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const { positive, negative, mixed } = getSignalCounts(stock.recentSignals);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "40px 16px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Back Button */}
        <div style={{ marginBottom: "24px" }}>
          <Link href="/" style={{
            display: "inline-block", backgroundColor: "white", border: "1px solid #e5e7eb",
            padding: "8px 16px", borderRadius: "8px", fontSize: "14px",
            fontWeight: 500, color: "#374151", textDecoration: "none",
          }}>
            ← Back to Search
          </Link>
        </div>

        {/* ── Header Card ── */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <span style={{
                display: "inline-block", backgroundColor: "#f3f4f6",
                padding: "4px 12px", borderRadius: "6px",
                fontFamily: "monospace", fontSize: "13px", fontWeight: 700, color: "#374151",
              }}>
                {ticker}
              </span>
              <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", marginTop: "8px", marginBottom: 0 }}>
                {stock.companyName}
              </h1>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {negative > 0 && (
                <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "6px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#b91c1c", lineHeight: 1 }}>{negative}</div>
                  <div style={{ fontSize: "11px", color: "#b91c1c", fontWeight: 600, marginTop: "2px" }}>Negative</div>
                </div>
              )}
              {positive > 0 && (
                <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "6px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#15803d", lineHeight: 1 }}>{positive}</div>
                  <div style={{ fontSize: "11px", color: "#15803d", fontWeight: 600, marginTop: "2px" }}>Positive</div>
                </div>
              )}
              {mixed > 0 && (
                <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "8px", padding: "6px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#b45309", lineHeight: 1 }}>{mixed}</div>
                  <div style={{ fontSize: "11px", color: "#b45309", fontWeight: 600, marginTop: "2px" }}>Mixed</div>
                </div>
              )}
            </div>
          </div>
          <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6", marginTop: "12px", marginBottom: 0 }}>
            {stock.description}
          </p>
        </div>

        {/* ── ACTIVE SIGNALS ── */}
        <div style={{ ...cardStyle, backgroundColor: "#fafafa" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <h2 style={{ ...sectionHeadingStyle, marginBottom: 0, fontSize: "18px" }}>📡 Active Signals</h2>
            <span style={{
              backgroundColor: "#111827", color: "white",
              fontSize: "11px", fontWeight: 700,
              padding: "2px 9px", borderRadius: "999px",
            }}>
              {stock.recentSignals.length}
            </span>
          </div>
          <p style={subtitleStyle}>The news events and data points most likely to move this stock right now.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {stock.recentSignals.map((signal, i) => (
              <div key={i} style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderLeft: `4px solid ${getBorderColor(signal.impact)}`,
                borderRadius: "10px",
                padding: "16px 18px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{signal.title}</span>
                  <span style={{ backgroundColor: "#f3f4f6", color: "#374151", padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 500 }}>
                    {signal.type}
                  </span>
                  <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, ...getImpactStyle(signal.impact) }}>
                    {signal.impact}
                  </span>
                </div>
                <div style={{ backgroundColor: "#f9fafb", borderRadius: "8px", padding: "10px 14px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    Why it matters
                  </div>
                  <p style={{ fontSize: "13px", color: "#374151", lineHeight: "1.6", margin: 0 }}>
                    {signal.whyItMatters}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── KEY SUPPLIERS & PRODUCER RISK ── */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <h2 style={{ ...sectionHeadingStyle, marginBottom: 0 }}>🏭 Key Suppliers & Producer Risk</h2>
          </div>
          <p style={subtitleStyle}>
            The companies that produce materials, parts, and finished goods for this stock.
            A disruption at any high-risk supplier is a direct negative supply shock.
          </p>

          {/* Risk legend */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
            {(["High", "Medium", "Low"] as const).map((r) => (
              <span key={r} style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, ...getRiskStyle(r) }}>
                {r} Risk
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {stock.keySuppliers.map((supplier, i) => (
              <div key={i} style={{
                backgroundColor: "#fafafa",
                border: "1px solid #e5e7eb",
                borderLeft: `4px solid ${getSupplierBorderColor(supplier.riskLevel)}`,
                borderRadius: "10px",
                padding: "16px 18px",
              }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{supplier.name}</span>
                  <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, ...getRiskStyle(supplier.riskLevel) }}>
                    {supplier.riskLevel} Risk
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 10px 0", fontStyle: "italic" }}>
                  {supplier.provides}
                </p>
                <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "10px 14px", border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    If disrupted
                  </div>
                  <p style={{ fontSize: "13px", color: "#374151", lineHeight: "1.6", margin: 0 }}>
                    {supplier.disruptionNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── KEY EXPOSURES ── */}
        <div style={cardStyle}>
          <h2 style={sectionHeadingStyle}>📌 Key Exposures</h2>
          <p style={subtitleStyle}>The main external factors that influence this company's revenue and profitability.</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {stock.keyExposures.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                <span style={{ marginTop: "6px", width: "8px", height: "8px", minWidth: "8px", borderRadius: "50%", backgroundColor: "#60a5fa", display: "inline-block" }} />
                <span style={{ fontSize: "14px", color: "#374151" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── BUSINESS STAGES ── */}
        <div style={cardStyle}>
          <h2 style={sectionHeadingStyle}>🔗 Business Stages</h2>
          <p style={subtitleStyle}>The operating chain from raw inputs to end customer — each stage is a potential point of strength or vulnerability.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {stock.businessStages.map((stage, i) => (
              <div key={i} style={{
                backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
                borderRadius: "8px", padding: "12px 16px",
                fontSize: "14px", color: "#374151",
              }}>
                {stage}
              </div>
            ))}
          </div>
        </div>

        {/* ── INVESTOR TAKEAWAY ── */}
        <div style={{ ...cardStyle, backgroundColor: "#111827", border: "none" }}>
          <h2 style={{ ...sectionHeadingStyle, color: "white" }}>💡 Investor Takeaway</h2>
          <p style={{ fontSize: "14px", color: "#d1d5db", lineHeight: "1.8", margin: 0 }}>
            {stock.investorTakeaway}
          </p>
        </div>

        <div style={{ height: "40px" }} />
      </div>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "16px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "17px",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "8px",
  marginTop: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#9ca3af",
  marginBottom: "16px",
  marginTop: 0,
};
