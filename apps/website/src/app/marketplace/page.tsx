import { getProducts } from "@/lib/medusa";
import ListingCard from "@/components/ListingCard";
import Link from "next/link";

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const page = parseInt(sp.page || "1");
  const limit = 12;
  const offset = (page - 1) * limit;

  const { products, count } = await getProducts({
    limit: String(limit),
    offset: String(offset),
    ...(sp.q && { q: sp.q }),
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface, #0F172A)" }}>
      {/* Header bar */}
      <div style={{ borderBottom: "1px solid var(--border, #334155)", paddingTop: "80px" }}>
        <div className="container" style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px" }}>
          <h1 style={{
            fontFamily: "var(--ff-display, 'Barlow Condensed', sans-serif)",
            fontSize: "1.8rem", fontWeight: 800, color: "var(--text, #F8FAFC)",
            textTransform: "uppercase", margin: 0,
          }}>
            Marketplace ({count})
          </h1>
        </div>
      </div>

      {/* Product grid */}
      <div className="container" style={{ maxWidth: 1280, margin: "0 auto", padding: "24px" }}>
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-3, #64748B)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 8 }}>No listings found</h2>
            <p>Try adjusting your search or browse all categories.</p>
          </div>
        ) : (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}>
              {products.map((p) => (
                <ListingCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            {count > limit && (
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                gap: 16, marginTop: 40, paddingBottom: 40,
              }}>
                {page > 1 && (
                  <Link href={`/marketplace?page=${page - 1}`} style={{
                    padding: "8px 16px", background: "var(--card-bg, #1E293B)",
                    border: "1px solid var(--border, #334155)", borderRadius: 6,
                    color: "var(--text, #F8FAFC)", fontSize: 13, fontWeight: 600,
                    textDecoration: "none",
                  }}>
                    ← Previous
                  </Link>
                )}
                <span style={{ fontSize: 13, color: "var(--text-3, #64748B)" }}>
                  Page {page} of {Math.ceil(count / limit)}
                </span>
                {page * limit < count && (
                  <Link href={`/marketplace?page=${page + 1}`} style={{
                    padding: "8px 16px", background: "var(--card-bg, #1E293B)",
                    border: "1px solid var(--border, #334155)", borderRadius: 6,
                    color: "var(--text, #F8FAFC)", fontSize: 13, fontWeight: 600,
                    textDecoration: "none",
                  }}>
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
