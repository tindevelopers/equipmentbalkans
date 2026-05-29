import { getProductByHandle } from "@/lib/medusa";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const cheapestVariant = product.variants?.[0];
  const price = cheapestVariant?.prices?.[0];
  const priceStr = price
    ? `${price.amount.toLocaleString()}`
    : "—";
  const currency = price?.currency_code?.toUpperCase() || "EUR";

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface, #0F172A)" }}>
      <div className="container" style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 40px" }}>
        {/* Back link */}
        <Link href="/marketplace" style={{
          fontSize: 13, fontWeight: 600, color: "var(--cobalt, #2563EB)",
          display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 24,
          textDecoration: "none",
        }}>
          ← Back to Marketplace
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Images */}
          <div>
            <div style={{
              borderRadius: 8, overflow: "hidden", background: "var(--card-bg, #1E293B)",
              border: "1px solid var(--border, #334155)", height: 400,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {product.images?.[0] ? (
                <img src={product.images[0].url} alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ fontSize: 80, opacity: 0.15 }}>🏗️</div>
              )}
            </div>

            {/* Thumbnail gallery */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {product.images.slice(1, 5).map((img) => (
                  <div key={img.id} style={{
                    width: 72, height: 72, borderRadius: 6, overflow: "hidden",
                    border: "1px solid var(--border, #334155)", cursor: "pointer",
                  }}>
                    <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
              color: "var(--cobalt, #2563EB)", textTransform: "uppercase", marginBottom: 8,
            }}>
              {product.status === "published" ? "Available" : product.status}
            </div>
            <h1 style={{
              fontFamily: "var(--ff-display, 'Barlow Condensed', sans-serif)", fontSize: "2rem",
              fontWeight: 800, color: "var(--text, #F8FAFC)", lineHeight: 1.1,
              textTransform: "uppercase", marginBottom: 12, margin: "0 0 12px 0",
            }}>
              {product.title}
            </h1>
            {product.description && (
              <p style={{ fontSize: 14, color: "var(--text-3, #64748B)", lineHeight: 1.7, marginBottom: 20 }}>
                {product.description}
              </p>
            )}

            {/* Price */}
            <div style={{ marginBottom: 24, padding: "16px", background: "var(--card-bg, #1E293B)", border: "1px solid var(--border, #334155)", borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text-3, #64748B)", marginBottom: 4 }}>Price</div>
              <div style={{
                fontSize: "2rem", fontWeight: 800, color: "var(--ignite, #F97316)",
                fontFamily: "var(--ff-mono, monospace)",
              }}>
                € {priceStr} <span style={{ fontSize: 14, color: "var(--text-3, #64748B)", fontWeight: 400 }}>{currency}</span>
              </div>
            </div>

            {/* Specs */}
            {product.options?.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-2, #94A3B8)", marginBottom: 10, letterSpacing: ".06em", textTransform: "uppercase" }}>
                  Specifications
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {product.options.map((opt) => (
                    <div key={opt.id} style={{
                      background: "var(--card-bg, #1E293B)", border: "1px solid var(--border, #334155)",
                      borderRadius: 6, padding: "8px 12px",
                    }}>
                      <div style={{ fontSize: 10, color: "var(--text-3, #64748B)", textTransform: "uppercase", marginBottom: 2 }}>
                        {opt.title}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text, #F8FAFC)" }}>
                        {opt.values?.map((v) => v.value).join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--cobalt, #2563EB)", color: "#fff",
              fontSize: 14, fontWeight: 700, padding: "13px 28px",
              borderRadius: "6px", letterSpacing: ".04em",
              textTransform: "uppercase", textDecoration: "none",
              transition: "background 0.2s, transform 0.12s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--cobalt, #2563EB)"; e.currentTarget.style.transform = ""; }}
            >
              Contact Seller
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
