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

type StockData = {
  companyName: string;
  description: string;
  keyExposures: string[];
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

// ─── Impact Badge ─────────────────────────────────────────────────────────────

function ImpactBadge({ impact }: { impact: Signal["impact"] }) {
  const styles: Record<Signal["impact"], string> = {
    Positive: "bg-green-100 text-green-800",
    Negative: "bg-red-100 text-red-800",
    Mixed: "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${styles[impact]}`}
    >
      {impact}
    </span>
  );
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
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1f2937", marginTop: "12px" }}>
            Stock Not Found
          </h1>
          <p style={{ color: "#6b7280", marginTop: "8px" }}>
            We don't have data for ticker <strong>{ticker}</strong> yet.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: "24px",
              backgroundColor: "#111827",
              color: "white",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "40px 16px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Back Button */}
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              textDecoration: "none",
            }}
          >
            ← Back to Search
          </Link>
        </div>

        {/* Header Card */}
        <div style={cardStyle}>
          <span style={{
            display: "inline-block",
            backgroundColor: "#f3f4f6",
            padding: "4px 12px",
            borderRadius: "6px",
            fontFamily: "monospace",
            fontSize: "13px",
            fontWeight: 700,
            color: "#374151",
          }}>
            {ticker}
          </span>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", marginTop: "8px", marginBottom: "0" }}>
            {stock.companyName}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6", marginTop: "10px" }}>
            {stock.description}
          </p>
        </div>

        {/* Section 1: Key Exposures */}
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

        {/* Section 2: Business Stages */}
        <div style={cardStyle}>
          <h2 style={sectionHeadingStyle}>🔗 Business Stages</h2>
          <p style={subtitleStyle}>The operating chain from raw inputs to end customer — each stage is a potential point of strength or vulnerability.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {stock.businessStages.map((stage, i) => (
              <div key={i} style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "14px",
                color: "#374151",
              }}>
                {stage}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Recent Signals */}
        <div style={cardStyle}>
          <h2 style={sectionHeadingStyle}>📡 Recent Signals</h2>
          <p style={subtitleStyle}>Illustrative examples of the kind of news events or data points that move this stock.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {stock.recentSignals.map((signal, i) => (
              <div key={i} style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "14px 16px",
              }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{signal.title}</span>
                  <span style={{
                    backgroundColor: "#eff6ff",
                    color: "#1d4ed8",
                    padding: "2px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}>
                    {signal.type}
                  </span>
                  <ImpactBadge impact={signal.impact} />
                </div>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.6", margin: 0 }}>
                  {signal.whyItMatters}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Investor Takeaway */}
        <div style={cardStyle}>
          <h2 style={sectionHeadingStyle}>💡 Investor Takeaway</h2>
          <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7", margin: 0 }}>
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
