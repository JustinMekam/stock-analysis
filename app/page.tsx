"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const cleanedTicker = ticker.trim().toUpperCase();

    if (!cleanedTicker) return;

    router.push(`/stock/${cleanedTicker}`);
  };

  return (
    <main className="min-h-screen bg-white p-10 text-black">
      <h1 className="mb-4 text-4xl font-bold">Stock Driver Explorer</h1>
      <p className="mb-6 text-lg text-gray-700">
        Understand what affects the stocks you want to buy.
      </p>

      <div className="flex max-w-xl gap-3">
        <input
          type="text"
          placeholder="Enter a ticker, like NKE"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 text-black placeholder:text-gray-400"
        />
        <button
          onClick={handleSearch}
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Search
        </button>
      </div>
    </main>
  );
}