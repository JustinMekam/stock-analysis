// app/stock/[ticker]/page.tsx

import Link from "next/link";

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
          "Vietnam accounts for over 50% of Nike's footwear production. Any labor disputes, export restrictions, or pandemic-style shutdowns can directly reduce product availability and delay seasonal launches.",
      },
      {
        title: "North America Wholesale Inventory Buildup",
        type: "Demand",
        impact: "Negative",
        whyItMatters:
          "When retailers over-order Nike product and sit on excess inventory, they cut future purchase orders. This compresses Nike's revenue and often forces promotional discounting that hurts margins.",
      },
      {
        title: "Strong DTC (Direct-to-Consumer) Revenue Growth",
        type: "Business Mix",
        impact: "Positive",
        whyItMatters:
          "Nike selling directly to consumers — through its app and owned stores — generates higher margins than wholesale. Consistent DTC growth signals the company is reducing its reliance on third-party retailers.",
      },
      {
        title: "USD Strengthening vs. Euro and Yuan",
        type: "Foreign Exchange",
        impact: "Negative",
        whyItMatters:
          "Nike earns a large portion of revenue in euros and Chinese yuan. When the dollar strengthens, those foreign revenues translate into fewer dollars when reported — reducing headline earnings even if local sales are healthy.",
      },
      {
        title: "New Running Category Competitors Gaining Share",
        type: "Competition",
        impact: "Mixed",
        whyItMatters:
          "Brands like On Running, Hoka, and New Balance have gained meaningful market share in the premium running segment. This pressures Nike's pricing power, though Nike's scale and marketing advantage remain significant.",
      },
    ],
    investorTakeaway:
      "Nike's stock is most sensitive to North American consumer health, the trajectory of its direct-to-consumer channel, and foreign exchange movements. A strong dollar and weak consumer spending are the two biggest headwinds in any given quarter. Watch DTC revenue growth and gross margin trends — these are the clearest signals of whether Nike's business model shift is working. Supply chain disruptions in Vietnam can hit results with a 1–2 quarter lag.",
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
          "China is one of Adidas's most important markets. After years of softness due to geopolitical tensions and local brand competition, early recovery signals in Chinese consumer spending are material to Adidas's revenue outlook.",
      },
      {
        title: "Yeezy Inventory Liquidation Strategy",
        type: "Inventory / Brand",
        impact: "Mixed",
        whyItMatters:
          "After ending its Yeezy partnership, Adidas was left with billions in unsold inventory. Selling it off generates cash but requires heavy discounting, weighing on margins. A clean inventory position is a prerequisite for gross margin recovery.",
      },
      {
        title: "Terrace and Lifestyle Silhouette Momentum",
        type: "Product Cycle",
        impact: "Positive",
        whyItMatters:
          "Adidas's retro 'terrace' footwear styles (Samba, Gazelle, Campus) have become culturally dominant. Strong sell-through in lifestyle categories drives full-price revenue and reduces promotional pressure.",
      },
      {
        title: "Euro Appreciation vs. U.S. Dollar",
        type: "Foreign Exchange",
        impact: "Negative",
        whyItMatters:
          "Adidas reports earnings in euros. When the euro strengthens against the dollar, U.S. revenues translate into fewer euros, creating a currency headwind even if the underlying U.S. business is performing well.",
      },
      {
        title: "European Consumer Sentiment Softening",
        type: "Demand",
        impact: "Negative",
        whyItMatters:
          "Germany and Western Europe are Adidas's home market and a significant revenue base. When European consumers pull back on discretionary spending — due to inflation, energy costs, or economic uncertainty — Adidas sees direct pressure on sales volumes.",
      },
    ],
    investorTakeaway:
      "Adidas stock is driven by a combination of brand cycle momentum, Greater China recovery, and the resolution of its Yeezy inventory overhang. The company's gross margin is the key metric to watch — it captures whether Adidas is selling at full price or discounting. A sustained recovery depends on continued lifestyle product strength, stabilizing Chinese demand, and a cleaner balance sheet. Currency is a persistent factor given the euro-reporting structure.",
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
          "The iPhone accounts for roughly half of Apple's total revenue. When premium consumers delay upgrades due to economic uncertainty or lack of compelling new features, Apple's top-line growth stalls and earnings estimates get revised down.",
      },
      {
        title: "India Assembly Capacity Expansion",
        type: "Supply Chain",
        impact: "Positive",
        whyItMatters:
          "Apple has been accelerating iPhone assembly in India as a hedge against China concentration risk. Growing Indian production capacity reduces geopolitical supply risk and could unlock tariff advantages for key markets.",
      },
      {
        title: "U.S.–China Trade Tensions and Tariff Risk",
        type: "Geopolitical / Supply Chain",
        impact: "Negative",
        whyItMatters:
          "The majority of Apple's devices are still assembled in China. Escalating tariffs or export restrictions between the U.S. and China could significantly raise Apple's cost structure or disrupt product availability.",
      },
      {
        title: "Services Revenue Accelerating Above Expectations",
        type: "Business Mix",
        impact: "Positive",
        whyItMatters:
          "Services (App Store, Apple TV+, iCloud, Apple Pay) carry much higher gross margins (~70%+) than hardware. Faster Services growth improves overall company margins and provides more stable recurring revenue, which investors value highly.",
      },
      {
        title: "EU Regulatory Scrutiny of App Store Policies",
        type: "Regulatory",
        impact: "Negative",
        whyItMatters:
          "European regulators have pushed Apple to open iOS to third-party app stores and payment systems. Forced changes to App Store economics could reduce Apple's Services take rate and meaningfully impact a key margin driver.",
      },
    ],
    investorTakeaway:
      "Apple's stock is most sensitive to iPhone cycle expectations, China supply chain stability, and the growth trajectory of its Services business. In periods of weak consumer spending, the premium iPhone's pricing creates demand risk. Geopolitical tension between the U.S. and China is an ever-present tail risk given manufacturing concentration. The Services segment is the long-term margin story — watch its growth rate relative to the installed base for the clearest signal on Apple's earnings power.",
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
      "4. Flight Testing & Certification — Each aircraft type requires FAA sign-off; new variants require extensive approval cycles",
      "5. Aircraft Delivery — Revenue is recognized at delivery, making delivery count a key quarterly metric",
      "6. Airline/Customer Operating Environment — Airline profitability drives decisions to accept deliveries or defer orders",
    ],
    recentSignals: [
      {
        title: "FAA Production Cap on 737 MAX Monthly Output",
        type: "Regulatory",
        impact: "Negative",
        whyItMatters:
          "The FAA has restricted how many 737 MAX aircraft Boeing can produce per month following quality control findings. This directly limits Boeing's ability to generate cash flow, as revenue is only recognized upon delivery.",
      },
      {
        title: "Spirit AeroSystems Fuselage Supply Disruption",
        type: "Supply Chain",
        impact: "Negative",
        whyItMatters:
          "Spirit AeroSystems manufactures the 737 fuselage. Defects or production slowdowns at Spirit create a bottleneck that halts Boeing's final assembly line — even if Boeing's own facilities are operating normally.",
      },
      {
        title: "Strong Airline Forward Order Book",
        type: "Demand",
        impact: "Positive",
        whyItMatters:
          "Boeing maintains a multi-year backlog of aircraft orders from global airlines. A healthy backlog provides long-term revenue visibility and signals that customers remain committed to fleet expansion despite near-term delivery delays.",
      },
      {
        title: "Defense Contract Cost Overruns",
        type: "Defense / Government",
        impact: "Negative",
        whyItMatters:
          "Fixed-price defense contracts (like the KC-46 tanker and Air Force One program) have produced billions in write-downs for Boeing when development costs exceeded contract value. Each charge directly hits earnings and cash flow.",
      },
      {
        title: "International Travel Recovery Driving Widebody Demand",
        type: "Airline Demand",
        impact: "Positive",
        whyItMatters:
          "Long-haul international routes require widebody aircraft like the 787 Dreamliner. As global travel volumes recover toward and beyond pre-pandemic levels, airlines are accelerating their widebody orders — a positive signal for Boeing's higher-margin aircraft programs.",
      },
    ],
    investorTakeaway:
      "Boeing's stock is fundamentally a cash flow story — and that cash flow is directly tied to how many aircraft it can deliver per quarter. Regulatory constraints, supplier defects, and labor disruptions are the three most common causes of delivery shortfalls. The defense segment adds a layer of earnings risk through fixed-price contract exposure. Long-term, Boeing's order backlog is substantial, but the market discounts that backlog heavily until Boeing demonstrates it can produce and deliver at scale without safety or quality setbacks.",
  },
};

// ─── Impact Badge ─────────────────────────────────────────────────────────────

function ImpactBadge({ impact }: { impact: Signal["impact"] }) {
  const styles: Record<Signal["impact"], string> = {
    Positive: "bg-emerald-100 text-emerald-800",
    Negative: "bg-red-100 text-red-800",
    Mixed: "bg-amber-100 text-amber-800",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[impact]}`}
    >
      {impact}
    </span>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker: rawTicker } = await params;
  const ticker = rawTicker.toUpperCase();
  const stock = stocks[ticker];

  // Stock not found
  if (!stock) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-5xl font-extrabold text-gray-300">404</p>
          <h1 className="mt-3 text-2xl font-bold text-gray-800">
            Stock Not Found
          </h1>
          <p className="mt-2 text-gray-500">
            We don't have data for ticker{" "}
            <span className="font-mono font-semibold text-gray-700">
              {ticker}
            </span>{" "}
            yet.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700"
          >
            ← Back to Search
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Back link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50"
          >
            ← Back to Search
          </Link>
        </div>

        {/* Header */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-lg bg-gray-100 px-3 py-1 font-mono text-sm font-bold text-gray-700">
                {ticker}
              </span>
              <h1 className="mt-2 text-2xl font-extrabold text-gray-900">
                {stock.companyName}
              </h1>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {stock.description}
          </p>
        </div>

        {/* Section 1: Key Exposures */}
        <SectionCard title="📌 Key Exposures">
          <p className="mb-3 text-sm text-gray-500">
            The main external factors that influence this company's revenue and
            profitability.
          </p>
          <ul className="space-y-2">
            {stock.keyExposures.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Section 2: Business Stages */}
        <SectionCard title="🔗 Business Stages">
          <p className="mb-3 text-sm text-gray-500">
            The operating chain from raw inputs to end customer — each stage is
            a potential point of strength or vulnerability.
          </p>
          <ol className="space-y-2">
            {stock.businessStages.map((stage, i) => (
              <li
                key={i}
                className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700"
              >
                {stage}
              </li>
            ))}
          </ol>
        </SectionCard>

        {/* Section 3: Recent Signals */}
        <SectionCard title="📡 Recent Signals">
          <p className="mb-4 text-sm text-gray-500">
            Illustrative examples of the kind of news events or data points
            that move this stock.
          </p>
          <div className="space-y-4">
            {stock.recentSignals.map((signal, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {signal.title}
                  </span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                    {signal.type}
                  </span>
                  <ImpactBadge impact={signal.impact} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {signal.whyItMatters}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Section 4: Investor Takeaway */}
        <SectionCard title="💡 Investor Takeaway">
          <p className="text-sm leading-relaxed text-gray-700">
            {stock.investorTakeaway}
          </p>
        </SectionCard>

        {/* Footer spacing */}
        <div className="pb-8" />
      </div>
    </main>
  );
}
