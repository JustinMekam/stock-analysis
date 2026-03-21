const stockData: Record<
  string,
  {
    companyName: string;
    description: string;
    drivers: string[];
  }
> = {
  NKE: {
    companyName: "Nike",
    description:
      "Nike is affected by consumer demand, overseas manufacturing, foreign exchange, and competition in athletic apparel and footwear.",
    drivers: [
      "Consumer demand",
      "Asian manufacturing exposure",
      "Foreign exchange",
      "Input and freight costs",
      "Competitor performance",
    ],
  },
  ADDYY: {
    companyName: "Adidas",
    description:
      "Adidas is affected by global consumer demand, brand momentum, supply chain conditions, foreign exchange, and competition in sportswear.",
    drivers: [
      "Consumer demand",
      "Brand sentiment and product cycles",
      "Supply chain disruptions",
      "Foreign exchange",
      "Competition from Nike and others",
    ],
  },
  AAPL: {
    companyName: "Apple",
    description:
      "Apple is affected by iPhone demand, China-related production exposure, chip supply, foreign exchange, and major product launches.",
    drivers: [
      "iPhone and device demand",
      "China manufacturing exposure",
      "Chip supply constraints",
      "Foreign exchange",
      "Product launch cycles",
    ],
  },
  BA: {
    companyName: "Boeing",
    description:
      "Boeing is affected by aircraft delivery timing, supply chain reliability, airline demand, regulation, and defense contract performance.",
    drivers: [
      "Aircraft delivery schedules",
      "Supply chain reliability",
      "Airline industry demand",
      "Regulatory and safety issues",
      "Defense and government contracts",
    ],
  },
};

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const upperTicker = ticker.toUpperCase();

  const stock = stockData[upperTicker];

  if (!stock) {
    return (
      <main className="min-h-screen bg-white p-10 text-black">
        <h1 className="mb-4 text-4xl font-bold">Stock Not Found</h1>
        <p className="text-lg text-gray-700">
          We do not have data for {upperTicker} yet.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-10 text-black">
      <h1 className="mb-2 text-4xl font-bold">
        {stock.companyName} ({upperTicker})
      </h1>

      <p className="mb-6 text-lg text-gray-700">{stock.description}</p>

      <div className="rounded-lg border border-gray-300 p-5">
        <h2 className="mb-3 text-2xl font-semibold">Key Drivers</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {stock.drivers.map((driver) => (
            <li key={driver}>{driver}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}