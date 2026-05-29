"use client";
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getProducts, MedusaProduct } from "@/lib/medusa";
import ListingCard from "@/components/ListingCard";

/* ── Icons ── */
const SearchIco = ({ w = 17 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const HeartIco = ({ filled = false, w = 14 }: { filled?: boolean; w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={filled ? "#F97316" : "none"} stroke={filled ? "#F97316" : "#64748B"}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const PinIco = ({ w = 11 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const UserIco = ({ w = 15 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const PlusIco = ({ w = 13 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const ChevD = ({ w = 10 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);
const ChevR = ({ w = 14 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);
const HammerIco = ({ w = 15 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9"/>
    <path d="M17.64 15L22 10.64"/>
    <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>
  </svg>
);
const SunIco = ({ w = 16 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIco = ({ w = 16 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/* ── Category icons ── */
const IcoMachine = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="6" width="20" height="14" rx="2"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><circle cx="12" cy="13" r="3"/>
  </svg>
);
const IcoFactory = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 20h20M5 20V8L11 4l6 4v12M9 20v-5h6v5"/><rect x="10" y="9" width="4" height="5"/>
  </svg>
);
const IcoForklift = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 18v-6l3-5h8l2 3v8H3z"/><path d="M16 8h4v10h-4"/><circle cx="6" cy="19.5" r="1.5"/><circle cx="18" cy="19.5" r="1.5"/>
  </svg>
);
const IcoTruck = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IcoLightning = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IcoBox = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IcoWarehouse = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35z"/>
    <path d="M6 18h12M6 14h12"/><rect x="8" y="18" width="8" height="4"/>
  </svg>
);
const IcoGavel = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14.5 12.5l-8 8a2.12 2.12 0 0 1-3-3l8-8"/><path d="M16 3l5 5-1.5 1.5-5-5z"/><path d="M10 9l2-2"/>
  </svg>
);
const IcoGrid = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IcoUsers = ({ w = 22 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IcoList = ({ w = 22 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <circle cx="3" cy="6" r="1" fill="currentColor"/><circle cx="3" cy="12" r="1" fill="currentColor"/><circle cx="3" cy="18" r="1" fill="currentColor"/>
  </svg>
);
const IcoClock = ({ w = 22 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const IcoGlobe = ({ w = 22 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

/* ── Data ── */
const CATS = [
  { id: "machine", label: "Machinery & Equipment", Icon: IcoMachine },
  { id: "industrial", label: "Industrial Equipment", Icon: IcoFactory },
  { id: "forklift", label: "Forklifts & Cranes", Icon: IcoForklift },
  { id: "transport", label: "Transport & Logistics", Icon: IcoTruck },
  { id: "electrical", label: "Electrical Equipment", Icon: IcoLightning },
  { id: "materials", label: "Raw Materials", Icon: IcoBox },
  { id: "warehouse", label: "Warehouse Equipment", Icon: IcoWarehouse },
  { id: "auctions", label: "Auctions", Icon: IcoGavel },
  { id: "all", label: "All Categories", Icon: IcoGrid },
];



/* ── EBLogo ── */
function EBLogo({ theme }: { theme: string }) {
  const suffix = theme === "light" ? "light" : "dark";
  return (
    <>
      <Image className="eb-logo-h" src={`/logo-horizontal-${suffix}.png`} alt="Equipment Balkans" width={160} height={40} style={{ height: 40, width: "auto" }} />
      <Image className="eb-logo-m" src={`/logo-mark-${suffix}.png`} alt="Equipment Balkans" width={40} height={40} style={{ height: 40, width: "auto" }} />
    </>
  );
}

/* ── Main Page ── */
export default function HomePage() {
  const [theme, setTheme] = useState("dark");
  const [active, setActive] = useState("machine");
  const [q, setQ] = useState("");

  useEffect(() => {
    const stored = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(stored);
  }, []);

  const [listings, setListings] = useState<MedusaProduct[]>([]);

  useEffect(() => {
    getProducts({ limit: "6" })
      .then(data => setListings(data.products))
      .catch(() => {
        setListings([]);
      });
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const navLinks = ["Home", "Marketplace", "Auctions", "Categories", "Raw Materials", "Services", "About", "Contact"];

  return (
    <>
      {/* Navbar */}
      <nav className="nav">
        <div className="nav-i">
          <EBLogo theme={theme} />
          <ul className="nav-links">
            {navLinks.map((l, i) => (
              <li key={l}>
                <a href="#" className={i === 0 ? "active" : ""}>
                  {l.toUpperCase()}{i === 3 && <ChevD w={9} />}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-r">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <SunIco /> : <MoonIco />}
            </button>
            <button className="nav-btn"><UserIco />Login</button>
            <a href="/post-an-ad" className="nav-cta"><PlusIco /><span>POST AN AD</span></a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        position: "relative", overflow: "hidden", minHeight: 420,
        display: "flex", alignItems: "center",
        background: `
          linear-gradient(168deg, rgba(10,12,18,0.97) 0%, rgba(14,18,28,0.90) 40%, rgba(18,24,40,0.82) 100%),
          repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.012) 50px, rgba(255,255,255,0.012) 51px),
          repeating-linear-gradient(90deg, transparent, transparent 66px, rgba(255,255,255,0.012) 66px, rgba(255,255,255,0.012) 67px),
          linear-gradient(140deg, #090C12 0%, #0F172A 50%, #1E293B 100%)
        `
      }}>
        <div style={{
          content: "", position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)"
        }} />
        <div className="container">
          <div style={{ padding: "52px 0", maxWidth: 560, position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ignite)", marginBottom: 10 }}>
              Real Equipment. Real Deals.
            </p>
            <h1 style={{
              fontFamily: "var(--ff-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              fontWeight: 900, color: "#fff",
              lineHeight: 1.05, letterSpacing: "0.02em",
              textTransform: "uppercase", marginBottom: 14
            }}>
              One place.<br />All equipment.<br />
              <span style={{ color: "var(--ignite)", textDecoration: "underline", textDecorationColor: "var(--ignite)" }}>
                All Balkans.
              </span>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.52)", lineHeight: 1.7, marginBottom: 24, maxWidth: 460 }}>
              Buy, sell and bid on industrial equipment, raw materials and more — fast, secure and simple.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/marketplace" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--cobalt)", color: "#fff",
                fontSize: 13, fontWeight: 700, padding: "12px 22px", borderRadius: "var(--r)",
                letterSpacing: ".04em", textTransform: "uppercase",
                transition: "background var(--t), transform 120ms ease"
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--cobalt-dk)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--cobalt)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <SearchIco w={15} />BROWSE MARKET
              </a>
              <a href="/auctions" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.08)", color: "#fff",
                fontSize: 13, fontWeight: 700, padding: "11px 22px", borderRadius: "var(--r)",
                border: "1.5px solid rgba(255,255,255,0.2)",
                letterSpacing: ".04em", textTransform: "uppercase",
                transition: "background var(--t), border-color var(--t), transform 120ms ease"
              }}>
                <HammerIco />VIEW AUCTIONS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {[
              { icon: <IcoUsers />, val: "5,280+", lbl: "Registered users" },
              { icon: <IcoList />, val: "18,450+", lbl: "Active listings" },
              { icon: <IcoClock />, val: "320+", lbl: "Monthly auctions" },
              { icon: <IcoGlobe />, val: "Balkan & EU", lbl: "Delivery across Balkans & EU" },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "18px 24px",
                borderRight: i < 3 ? "1px solid var(--border)" : "none"
              }}>
                <div style={{ color: "var(--cobalt)", flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", lineHeight: 1, fontFamily: "var(--ff-mono)" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 3 }}>{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search panel */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 8, padding: "14px 0", alignItems: "center" }}>
            <div style={{
              flex: "1.5", display: "flex", alignItems: "center", gap: 10,
              background: "var(--bg)", border: "1.5px solid var(--border)",
              borderRadius: "var(--r)", padding: "0 14px",
            }}>
              <SearchIco w={17} />
              <input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search equipment, categories, brands..."
                style={{
                  flex: 1, border: "none", background: "none", padding: "11px 0",
                  fontSize: 14, color: "var(--text)", outline: "none"
                }}
              />
            </div>
            {[
              { label: "All categories", opts: CATS.slice(0, 8).map(c => c.label) },
              { label: "All locations", opts: ["Belgrade", "Novi Sad", "Niš", "Subotica", "Čačak", "Kragujevac"] },
              { label: "Condition", opts: ["New", "Like new", "Excellent", "Good", "Used"] },
            ].map((sel, i) => (
              <select key={i} style={{
                border: "1.5px solid var(--border)", borderRadius: "var(--r)",
                padding: "11px 32px 11px 13px", fontSize: "13.5px", fontWeight: 500,
                color: "var(--text)", background: "var(--bg)",
                appearance: "none", outline: "none", cursor: "pointer",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat", backgroundPosition: "right 11px center",
                whiteSpace: "nowrap"
              }}>
                <option>{sel.label}</option>
                {sel.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            ))}
            <button style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "var(--cobalt)", color: "#fff",
              fontSize: "13.5px", fontWeight: 700, padding: "11px 22px", borderRadius: "var(--r)",
              letterSpacing: ".04em", textTransform: "uppercase", whiteSpace: "nowrap",
              border: "none", cursor: "pointer"
            }}>
              <SearchIco w={15} />SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", paddingLeft: "max(24px, calc((100vw - 1280px)/2 + 24px))" }}>
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
                padding: "13px 20px", minWidth: 112, flexShrink: 0,
                borderRight: "1px solid var(--border)",
                borderBottom: `3px solid ${active === c.id ? "var(--cobalt)" : "transparent"}`,
                background: active === c.id ? "rgba(37,99,235,0.08)" : "none",
                cursor: "pointer",
                transition: "background 150ms ease, border-color 150ms ease",
              }}
            >
              <span style={{ color: active === c.id ? "var(--cobalt)" : "var(--text-3)" }}><c.Icon /></span>
              <span style={{ fontSize: 11, fontWeight: 600, color: active === c.id ? "var(--cobalt)" : "var(--text-3)", textAlign: "center", lineHeight: 1.3 }}>
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <section style={{ padding: "28px 0 44px" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h2 style={{ fontSize: 12, fontWeight: 800, color: "var(--text-2)", letterSpacing: ".12em", textTransform: "uppercase" }}>
              Latest listings
            </h2>
            <a href="/marketplace" style={{ fontSize: 13, fontWeight: 600, color: "var(--cobalt)", display: "flex", alignItems: "center", gap: 4 }}>
              View all listings<ChevR />
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {listings.map(p => <ListingCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Card styles via inline style tag */}
      <style>{`
        .l-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow-card);
          transition: box-shadow var(--t), transform var(--t), border-color var(--t);
        }
        .l-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-2px);
          border-color: var(--cobalt);
        }
        .l-card-img {
          position: relative;
          height: 148px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .l-card-badge {
          position: absolute;
          top: 9px; left: 9px;
          font-size: 9px; font-weight: 700;
          padding: 3px 8px; border-radius: 3px;
          text-transform: uppercase; letter-spacing: .06em;
          color: #fff;
        }
        .l-card-save {
          position: absolute;
          top: 8px; right: 8px;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(15,23,42,0.85);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          transition: border-color var(--t);
          cursor: pointer;
        }
        .l-card-save:hover { border-color: var(--cobalt); }
        .l-card-body { padding: 11px 12px 14px; }
        .l-card-title {
          font-size: 13.5px; font-weight: 700; color: var(--text);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 4px;
        }
        .l-card-loc {
          display: flex; align-items: center; gap: 4px;
          font-size: 11.5px; color: var(--text-3); margin-bottom: 9px;
        }
        .l-card-price {
          font-size: 15px; font-weight: 800;
          color: var(--ignite); font-family: var(--ff-mono);
        }
        @media (max-width: 900px) {
          .stats-inner { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .listings-grid { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; }
        }
      `}</style>
    </>
  );
}
