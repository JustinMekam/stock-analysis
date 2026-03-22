"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ─── Signal preview data per ticker ───────────────────────────────────────────

const tickerPreviews = [
  {
    symbol: "NKE",
    name: "Nike, Inc.",
    sector: "Consumer / Apparel",
    signalPreview: {
      title: "Vietnam Factory Output Disruption",
      impact: "Negative" as const,
    },
    signalCounts: { negative: 3, positive: 1, mixed: 1 },
  },
  {
    symbol: "ADDYY",
    name: "Adidas AG",
    sector: "Consumer / Apparel",
    signalPreview: {
      title: "Terrace & Lifestyle Silhouette Momentum",
      impact: "Positive" as const,
    },
    signalCounts: { negative: 2, positive: 2, mixed: 1 },
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    signalPreview: {
      title: "U.S.–China Trade Tensions and Tariff Risk",
      impact: "Negative" as const,
    },
    signalCounts: { negative: 3, positive: 2, mixed: 0 },
  },
  {
    symbol: "BA",
    name: "Boeing Company",
    sector: "Aerospace / Defense",
    signalPreview: {
      title: "FAA Production Cap on 737 MAX Output",
      impact: "Negative" as const,
    },
    signalCounts: { negative: 3, positive: 2, mixed: 0 },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getImpactDotColor(impact: "Positive" | "Negative" | "Mixed"): string {
  if (impact === "Positive") return "#22c55e";
  if (impact === "Negative") return "#ef4444";
  return "#f59e0b";
}

function getImpactTextColor(impact: "Positive" | "Negative" | "Mixed"): string {
  if (impact === "Positive") return "#15803d";
  if (impact === "Negative") return "#b91c1c";
  return "#b45309";
}

function getImpactBg(impact: "Positive" | "Negative" | "Mixed"): string {
  if (impact === "Positive") return "#f0fdf4";
  if (impact === "Negative") return "#fef2f2";
  return "#fffbeb";
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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

      {/* ── Nav ── */}
      <div style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "14px 24px",
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
          backgroundColor: "#f0fdf4", color: "#15803d",
          fontSize: "11px", fontWeight: 600,
          padding: "2px 8px", borderRadius: "999px",
          border: "1px solid #bbf7d0",
        }}>
          MVP
        </span>
      </div>

      {/* ── Hero ── */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "56px 16px 36px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", marginBottom: "12px", lineHeight: "1.2" }}>
          Understand what drives a stock
        </h1>
        <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: "1.6", marginBottom: "32px" }}>
          Structured company intelligence built around active signals, key exposures,
          and plain-English investor takeaways.
        </p>

        {/* Search */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter ticker, e.g. NKE"
            style={{
              padding: "12px 16px", fontSize: "15px",
              border: "1px solid #d1d5db", borderRadius: "10px",
              width: "260px", outline: "none",
              color: "#111827", backgroundColor: "white",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "12px 24px", backgroundColor: "#111827",
              color: "white", fontSize: "15px", fontWeight: 600,
              border: "none", borderRadius: "10px", cursor: "pointer",
            }}
          >
            Explore →
          </button>
        </div>
        {error && <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px" }}>{error}</p>}
      </div>

      {/* ── Ticker Cards with Signal Preview ── */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px 60px" }}>
        <p style={{
          fontSize: "12px", fontWeight: 600, color: "#9ca3af",
          textTransform: "uppercase", letterSpacing: "0.08em",
          marginBottom: "14px", textAlign: "center",
        }}>
          Supported Tickers
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
          {tickerPreviews.map((t) => (
            <Link key={t.symbol} href={`/stock/${t.symbol}`} style={{ textDecoration: "none" }}>
              <div style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "18px 20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                cursor: "pointer",
              }}>
                {/* Ticker + name */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <span style={{
                      fontFamily: "monospace", fontSize: "14px",
                      fontWeight: 700, color: "#111827",
                      backgroundColor: "#f3f4f6",
                      padding: "3px 10px", borderRadius: "6px",
                      display: "inline-block", marginBottom: "6px",
                    }}>
                      {t.symbol}
                    </span>
                    <div style={{ fontSize: "14px", color: "#374151", fontWeight: 600 }}>{t.name}</div>
                    <div style={{
                      fontSize: "11px", color: "#6b7280",
                      backgroundColor: "#f3f4f6",
                      padding: "2px 8px", borderRadius: "999px",
                      display: "inline-block", marginTop: "4px",
                    }}>
                      {t.sector}
                    </div>
                  </div>

                  {/* Signal count summary */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    {t.signalCounts.negative > 0 && (
                      <div style={{
                        backgroundColor: "#fef2f2", border: "1px solid #fecaca",
                        borderRadius: "6px", padding: "4px 8px", textAlign: "center", minWidth: "32px",
                      }}>
                        <div style={{ fontSize: "14px", fontWeight: 800, color: "#b91c1c", lineHeight: 1 }}>{t.signalCounts.negative}</div>
                        <div style={{ fontSize: "9px", color: "#b91c1c", fontWeight: 600 }}>NEG</div>
                      </div>
                    )}
                    {t.signalCounts.positive > 0 && (
                      <div style={{
                        backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0",
                        borderRadius: "6px", padding: "4px 8px", textAlign: "center", minWidth: "32px",
                      }}>
                        <div style={{ fontSize: "14px", fontWeight: 800, color: "#15803d", lineHeight: 1 }}>{t.signalCounts.positive}</div>
                        <div style={{ fontSize: "9px", color: "#15803d", fontWeight: 600 }}>POS</div>
                      </div>
                    )}
                    {t.signalCounts.mixed > 0 && (
                      <div style={{
                        backgroundColor: "#fffbeb", border: "1px solid #fde68a",
                        borderRadius: "6px", padding: "4px 8px", textAlign: "center", minWidth: "32px",
                      }}>
                        <div style={{ fontSize: "14px", fontWeight: 800, color: "#b45309", lineHeight: 1 }}>{t.signalCounts.mixed}</div>
                        <div style={{ fontSize: "9px", color: "#b45309", fontWeight: 600 }}>MIX</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Signal preview */}
                <div style={{
                  backgroundColor: getImpactBg(t.signalPreview.impact),
                  borderRadius: "8px",
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <span style={{
                    width: "8px", height: "8px", minWidth: "8px",
                    borderRadius: "50%",
                    backgroundColor: getImpactDotColor(t.signalPreview.impact),
                    display: "inline-block",
                  }} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: getImpactTextColor(t.signalPreview.impact) }}>
                    {t.signalPreview.title}
                  </span>
                </div>

                <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "10px", textAlign: "right" }}>
                  View full signal breakdown →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* What you'll find */}
        <div style={{
          marginTop: "32px",
          backgroundColor: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#374151", marginBottom: "16px", marginTop: 0 }}>
            What you'll find on each stock page:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {[
              { icon: "📡", label: "Active Signals", desc: "What's moving the stock right now" },
              { icon: "📌", label: "Key Exposures", desc: "External factors that matter" },
              { icon: "🔗", label: "Business Stages", desc: "The full operating chain" },
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
