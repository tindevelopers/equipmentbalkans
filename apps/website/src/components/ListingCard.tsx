"use client";

import { useState } from "react";
import { MedusaProduct } from "@/lib/medusa";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";

const BADGE_CFG: Record<string, string> = {
  published: "#15803D",
  draft: "#B45309",
};

export default function ListingCard({ product }: { product: MedusaProduct }) {
  const [saved, setSaved] = useState(false);

  const cheapestVariant = product.variants?.[0];
  const price = cheapestVariant?.prices?.[0];
  const priceStr = price ? `${price.amount.toLocaleString()}` : "—";
  const badge = BADGE_CFG[product.status] || "#475569";

  return (
    <Link href={`/products/${product.handle}`} style={{ display: "block", textDecoration: "none" }}>
      <div style={{
        background: "var(--card-bg, #1E293B)",
        border: "1px solid var(--border, #334155)",
        borderRadius: "6px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
      }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.borderColor = "var(--cobalt, #2563EB)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.transform = "";
          e.currentTarget.style.borderColor = "var(--border, #334155)";
        }}
      >
        {/* Image */}
        <div style={{
          position: "relative", height: 180, display: "flex",
          alignItems: "center", justifyContent: "center", overflow: "hidden",
          background: "linear-gradient(135deg, #0F172A, #1E293B)",
        }}>
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.title}
              style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          ) : (
            <div style={{ fontSize: 48, opacity: 0.12 }}>🏗️</div>
          )}
          {/* Status badge */}
          <div style={{
            position: "absolute", top: 9, left: 9, fontSize: 9, fontWeight: 700,
            padding: "3px 8px", borderRadius: 3, textTransform: "uppercase",
            letterSpacing: ".06em", color: "#fff", background: badge,
          }}>
            {product.status === "published" ? "AVAILABLE" : "DRAFT"}
          </div>
          {/* Save/bookmark */}
          <button
            style={{
              position: "absolute", top: 8, right: 8, width: 28, height: 28,
              borderRadius: "50%", background: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
          >
            <Heart size={14} fill={saved ? "#F97316" : "none"} stroke={saved ? "#F97316" : "#64748B"} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "11px 12px 14px" }}>
          <div style={{
            fontSize: "13.5px", fontWeight: 700, color: "var(--text, #F8FAFC)",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            marginBottom: 4,
          }}>
            {product.title}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            fontSize: "11.5px", color: "var(--text-3, #64748B)", marginBottom: 9,
          }}>
            <MapPin size={11} />Europe
          </div>
          <div style={{
            fontSize: 15, fontWeight: 800, color: "var(--ignite, #F97316)",
            fontFamily: "var(--ff-mono, monospace)",
          }}>
            € {priceStr}
          </div>
        </div>
      </div>
    </Link>
  );
}
