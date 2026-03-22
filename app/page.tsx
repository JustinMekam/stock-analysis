"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const tickers = [
  { symbol: "NKE", name: "Nike, Inc.", sector: "Consumer / Apparel" },
  { symbol: "ADDYY", name: "Adidas AG", sector: "Consumer / Apparel" },
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "BA", name: "Boeing Company", sector: "Aerospace / Defense" },
];

export default function HomePage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSearch() {
    const ticker = input.trim().toUpperCase();
    if (!ticker) {
      setError("Please enter a ticker symbol.");
      return;
    }
    setError("");
    router.push(`/stock/${ticker}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>

      {/* Header */}
      <div style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <span style={{ fontSize: "20px" }}>📈</span>
        <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
          Stock Driver Explorer
        </span>
        <span style={{
          marginLeft: "8px",
          backgroundColor: "#f0fdf4",
          color: "#15803d",
          fontSize: "11px",
          fontWeight: 600,
          padding: "2px 8px",
          borderRadius: "999px",
          border: "1px solid #bbf7d0",
        }}>
          MVP
        </span>
      </div>

      {/* Hero */}
      <div style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "60px 16px 40px",
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: 800,
          color: "#111827",
          marginBottom: "12px",
          lineHeight: "1.2",
        }}>
          Understand what drives a stock
        </h1>
        <p style={{
          fontSize: "16px",
          color: "#6b7280",
          lineHeight: "1.6",
          marginBottom: "32px",
        }}>
          Enter a ticker to explore key exposures, business stages, recent signals,
          and plain-English investor takeaways.
        </p>

        {/* Search Bar */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter ticker, e.g. NKE"
            style={{
              padding: "12px 16px",
              fontSize: "15px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              width: "260px",
              outline: "none",
              color: "#111827",
              backgroundColor: "white",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "12px 24px",
              backgroundColor: "#111827",
              color: "white",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Explore →
          </button>
        </div>
        {error && (
          <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px" }}>{error}</p>
        )}
      </div>

      {/* Supported Tickers */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 16px 60px" }}>
        <p style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "12px",
          textAlign: "center",
        }}>
          Supported Tickers
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
        }}>
          {tickers.map((t) => (
            <Link
              key={t.symbol}
              href={`/stock/${t.symbol}`}
              style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "16px",
                textDecoration: "none",
                display: "block",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{
                fontFamily: "monospace",
                fontSize: "15px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "4px",
              }}>
                {t.symbol}
              </div>
              <div style={{ fontSize: "13px", color: "#374151", marginBottom: "6px" }}>
                {t.name}
              </div>
              <div style={{
                fontSize: "11px",
                color: "#6b7280",
                backgroundColor: "#f3f4f6",
                padding: "2px 8px",
                borderRadius: "999px",
                display: "inline-block",
              }}>
                {t.sector}
              </div>
            </Link>
          ))}
        </div>

        {/* What you'll find */}
        <div style={{
          marginTop: "40px",
          backgroundColor: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <p style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#374151",
            marginBottom: "16px",
            marginTop: 0,
          }}>
            What you'll find on each stock page:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { icon: "📌", label: "Key Exposures", desc: "External factors that move the stock" },
              { icon: "🔗", label: "Business Stages", desc: "The full operating chain" },
              { icon: "📡", label: "Recent Signals", desc: "News types that matter and why" },
              { icon: "💡", label: "Investor Takeaway", desc: "Plain-English summary" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{item.label}</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
