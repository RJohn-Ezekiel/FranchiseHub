import React, { useState, useEffect } from "react";

// ─── GOOGLE FONTS INJECTION ──────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0a0f;
    --surface: #13131a;
    --surface2: #1c1c26;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(255,255,255,0.14);
    --text: #f0efe8;
    --text-sub: rgba(240,239,232,0.45);
    --text-dim: rgba(240,239,232,0.2);
    --accent: #e8a020;
    --accent2: #c8442a;
    --accent3: #3d9e6e;
    --glow: rgba(232,160,32,0.12);
    --font-display: 'Bricolage Grotesque', sans-serif;
    --font-body: 'Instrument Sans', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font-body);
    background: radial-gradient(1200px 600px at 70% 0%, rgba(232,160,32,0.08), transparent 60%),
      radial-gradient(900px 500px at 0% 80%, rgba(61,158,110,0.06), transparent 60%),
      var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  button { cursor: pointer; font-family: var(--font-body); }
  input, select, textarea { font-family: var(--font-body); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 var(--glow); }
    50% { box-shadow: 0 0 32px 8px var(--glow); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .fade-up { animation: fadeUp 0.5s ease both; }
  .fade-up-1 { animation: fadeUp 0.5s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.5s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.5s 0.3s ease both; }
  .fade-up-4 { animation: fadeUp 0.5s 0.4s ease both; }
  .app-shell { position: relative; z-index: 1; }
  .ambient { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .orb { position: absolute; border-radius: 50%; opacity: 0.9; mix-blend-mode: screen; animation: float 18s ease-in-out infinite; }
  .orb-1 { width: 520px; height: 520px; top: -140px; right: -120px; background: radial-gradient(circle at 30% 30%, rgba(232,160,32,0.22), transparent 60%); animation-duration: 26s; }
  .orb-2 { width: 420px; height: 420px; bottom: -160px; left: -120px; background: radial-gradient(circle at 30% 30%, rgba(61,158,110,0.18), transparent 62%); animation-duration: 30s; }
  .orb-3 { width: 320px; height: 320px; top: 18%; left: 60%; background: radial-gradient(circle at 30% 30%, rgba(200,68,42,0.18), transparent 62%); animation-duration: 22s; }
  .grid-overlay { position: absolute; inset: -10%; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.2; mask-image: radial-gradient(circle at 50% 20%, black 10%, transparent 70%); animation: gridFloat 30s linear infinite; }
  .vignette { position: absolute; inset: -10%; background: radial-gradient(circle at 50% 40%, transparent 0%, rgba(10,10,15,0.75) 70%); }
  .page-enter { animation: pageIn 0.6s ease both; }
  .live-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); background: rgba(232,160,32,0.08); border: 1px solid rgba(232,160,32,0.25); }
  .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 0 var(--glow); animation: pulseDot 1.6s ease-in-out infinite; }
  @keyframes pageIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-22px,0); } }
  @keyframes gridFloat { 0% { transform: translateY(0); } 100% { transform: translateY(-60px); } }
  @keyframes pulseDot { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 var(--glow); } 50% { transform: scale(1.3); box-shadow: 0 0 12px 4px var(--glow); } }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 5%",
          color: "var(--text)",
          background: "var(--bg)",
        }}>
          <div style={{
            maxWidth: 640,
            width: "100%",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 24,
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, marginBottom: 8 }}>
              UI failed to render
            </div>
            <div style={{ fontSize: "0.9rem", color: "var(--text-sub)" }}>
              {String(this.state.error)}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AmbientBackground() {
  return (
    <div className="ambient">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-overlay" />
      <div className="vignette" />
    </div>
  );
}

function LivePill({ label = "Live" }) {
  return (
    <span className="live-pill">
      <span className="live-dot" />
      {label}
    </span>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LISTINGS = [
  {
    id: 1, name: "PizzaStop India", sector: "QSR · Food & Beverage",
    emoji: "🍕", color: "#2a1a10",
    investment: "₹35–50L", royalty: 6, marketingFee: 2, materialMarkup: 10,
    effectiveRoyalty: 11.2, breakeven: "24–30 mo", outlets: 142, closed: 11,
    fee: "₹6L", area: "600–900 sq ft", staff: 8, tier: "1,2,3",
    training: true, siteHelp: true, marketing: true, supply: true,
    score: 82, scoreLabel: "High",
    city: "Pan India", tags: ["Verified", "Popular"],
  },
  {
    id: 2, name: "BrightMinds Academy", sector: "Education · Pre-school",
    emoji: "📚", color: "#101a2a",
    investment: "₹20–35L", royalty: 12, marketingFee: 0, materialMarkup: 0,
    effectiveRoyalty: 12, breakeven: "18–24 mo", outlets: 67, closed: 4,
    fee: "₹4L", area: "1200–1800 sq ft", staff: 5, tier: "2,3",
    training: true, siteHelp: false, marketing: false, supply: false,
    score: 61, scoreLabel: "Medium",
    city: "Tier 2 & 3", tags: ["New"],
  },
  {
    id: 3, name: "GlowZone Wellness", sector: "Wellness · Salon & Spa",
    emoji: "💆", color: "#0d1a14",
    investment: "₹40–70L", royalty: 8, marketingFee: 1.5, materialMarkup: 6,
    effectiveRoyalty: 9.5, breakeven: "30–42 mo", outlets: 89, closed: 7,
    fee: "₹8L", area: "800–1200 sq ft", staff: 10, tier: "1,2",
    training: true, siteHelp: true, marketing: true, supply: false,
    score: 75, scoreLabel: "High",
    city: "Metro & Tier 1", tags: ["Verified"],
  },
  {
    id: 4, name: "QuickBrew Coffee", sector: "Café · Beverages",
    emoji: "☕", color: "#1a1208",
    investment: "₹15–25L", royalty: 7, marketingFee: 1, materialMarkup: 15,
    effectiveRoyalty: 13.5, breakeven: "18–28 mo", outlets: 210, closed: 28,
    fee: "₹3.5L", area: "300–500 sq ft", staff: 4, tier: "1,2,3",
    training: true, siteHelp: false, marketing: true, supply: true,
    score: 55, scoreLabel: "Medium",
    city: "Pan India", tags: ["Popular"],
  },
  {
    id: 5, name: "FitCore Gym", sector: "Fitness · Health",
    emoji: "🏋️", color: "#1a0a0a",
    investment: "₹60–1.2Cr", royalty: 5, marketingFee: 2, materialMarkup: 0,
    effectiveRoyalty: 7, breakeven: "36–48 mo", outlets: 55, closed: 3,
    fee: "₹12L", area: "3000–5000 sq ft", staff: 15, tier: "1,2",
    training: true, siteHelp: true, marketing: true, supply: false,
    score: 88, scoreLabel: "High",
    city: "Metro", tags: ["Verified", "Premium"],
  },
  {
    id: 6, name: "KidZone Playschool", sector: "Education · Childcare",
    emoji: "🧸", color: "#0a1a1a",
    investment: "₹10–18L", royalty: 10, marketingFee: 2, materialMarkup: 0,
    effectiveRoyalty: 12, breakeven: "12–18 mo", outlets: 320, closed: 42,
    fee: "₹2L", area: "800–1200 sq ft", staff: 6, tier: "2,3",
    training: true, siteHelp: false, marketing: false, supply: false,
    score: 48, scoreLabel: "Low",
    city: "Tier 2 & 3", tags: [],
  },
];

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, role, setRole }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 5%",
      height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,15,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      {/* Logo */}
      <div
        onClick={() => setPage("landing")}
        style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
      >
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "var(--accent)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800,
          color: "#000",
        }}>F</div>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem",
          letterSpacing: "-0.02em", color: "var(--text)",
        }}>
          Franchise<span style={{ color: "var(--accent)" }}>Hub</span>
        </span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {role && (
          <>
            <NavBtn active={page === "discover"} onClick={() => setPage("discover")}>Discover</NavBtn>
            <NavBtn active={page === "compare"} onClick={() => setPage("compare")}>Compare</NavBtn>
            <NavBtn active={page === "dashboard"} onClick={() => setPage("dashboard")}>Dashboard</NavBtn>
          </>
        )}
        {!role ? (
          <button onClick={() => setPage("login")} style={{
            padding: "8px 20px", borderRadius: 6,
            background: "var(--accent)", color: "#000",
            border: "none", fontSize: "0.85rem", fontWeight: 600,
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.target.style.opacity = 0.85}
            onMouseLeave={e => e.target.style.opacity = 1}
          >Get Started</button>
        ) : (
          <button onClick={() => { setRole(null); setPage("landing"); }} style={{
            padding: "7px 16px", borderRadius: 6,
            background: "transparent", color: "var(--text-sub)",
            border: "1px solid var(--border)", fontSize: "0.82rem",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "var(--border-hover)"; e.target.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-sub)"; }}
          >Sign out</button>
        )}
      </div>
    </nav>
  );
}

function NavBtn({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 14px", borderRadius: 6, border: "none",
      background: active ? "var(--surface2)" : "transparent",
      color: active ? "var(--text)" : "var(--text-sub)",
      fontSize: "0.84rem", fontWeight: active ? 600 : 400,
      transition: "all 0.2s",
    }}
      onMouseEnter={e => { if (!active) e.target.style.color = "var(--text)"; }}
      onMouseLeave={e => { if (!active) e.target.style.color = "var(--text-sub)"; }}
    >{children}</button>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function Landing({ setPage }) {
  const sectors = ["QSR", "Education", "Wellness", "Retail", "Fitness", "Café", "Healthcare", "Fashion"];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{
        minHeight: "100vh",
        padding: "120px 5% 80px",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: 60,
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* BG glow */}
        <div style={{
          position: "absolute", top: "10%", right: "5%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(232,160,32,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "10%",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(200,68,42,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div>
          {/* Tag */}
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(232,160,32,0.08)",
            border: "1px solid rgba(232,160,32,0.2)",
            borderRadius: 100, padding: "5px 14px",
            fontSize: "0.75rem", fontWeight: 600,
            color: "var(--accent)", letterSpacing: "0.06em",
            textTransform: "uppercase", marginBottom: 24,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            India's Transparent Franchise Platform
          </div>

          <h1 className="fade-up-1" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.6rem, 5vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: "-0.04em",
            marginBottom: 20,
          }}>
            Find the right<br />
            franchise.<br />
            <span style={{ color: "var(--accent)" }}>Know the real cost.</span>
          </h1>

          <p className="fade-up-2" style={{
            fontSize: "1rem", color: "var(--text-sub)",
            lineHeight: 1.7, maxWidth: 460, marginBottom: 36,
            fontWeight: 400,
          }}>
            No spam calls. No hidden royalties. No brochure dreams.
            FranchiseHub shows you exactly what every franchise costs —
            the disclosed number <em>and</em> the real number.
          </p>

          <div className="fade-up-3" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <BtnPrimary onClick={() => setPage("login")}>
              Start for free →
            </BtnPrimary>
            <BtnOutline onClick={() => setPage("discover")}>
              Browse franchises
            </BtnOutline>
          </div>

          {/* Stats */}
          <div className="fade-up-4" style={{
            display: "flex", gap: 36,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
          }}>
            {[
              { num: "200+", label: "Verified Brands" },
              { num: "₹10L+", label: "Min Investment" },
              { num: "18", label: "Sectors" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)" }}>
                  {s.num}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Role cards */}
        <div className="fade-up-2" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <RoleCard
            icon="🏢" title="I'm a Franchisor"
            desc="List your brand. Show your real numbers. Attract investors who actually fit your model — not just anyone with a budget."
            cta="Post your brand"
            color="var(--accent2)"
            onClick={() => setPage("login")}
          />
          <RoleCard
            icon="💼" title="I'm an Investor"
            desc="Set your budget, city, risk level. Discover franchises with full financial transparency — royalty, markup, break-even, all of it."
            cta="Find a franchise"
            color="var(--accent)"
            onClick={() => setPage("login")}
          />
        </div>
      </section>

      {/* Ticker */}
      <div style={{
        background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        padding: "12px 0", overflow: "hidden", whiteSpace: "nowrap",
      }}>
        <div style={{ display: "inline-flex", gap: 48, animation: "ticker 22s linear infinite" }}>
          {[...Array(2)].map((_, r) =>
            ["Verified Listings", "Real Royalty Rates", "Break-even Calculator", "Transparency Score", "Side-by-Side Compare", "Tier 2 & 3 Focus", "No Hidden Charges", "Franchisee Reviews"].map((t, i) => (
              <span key={`${r}-${i}`} style={{
                fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--text-sub)",
                display: "inline-flex", alignItems: "center", gap: 16,
              }}>
                {t}
                <span style={{ color: "var(--accent)", fontSize: "0.4rem" }}>●</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* How it works */}
      <section style={{ padding: "100px 5%" }}>
        <SectionLabel>Process</SectionLabel>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12,
        }}>Two sides. One platform.</h2>
        <p style={{ color: "var(--text-sub)", fontSize: "0.95rem", marginBottom: 56, maxWidth: 460 }}>
          Simple flow: sign up, fill your profile, discover or list — then connect.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }}>
          {[
            { num: "01", icon: "✍️", title: "Create your profile", desc: "Sign up as franchisor or investor. Fill your specific profile — capital, preferences, risk appetite, location." },
            { num: "02", icon: "🔍", title: "Discover & compare", desc: "Browse structured listings with real financial data. Use the comparison tool for side-by-side royalty, break-even, and transparency scores." },
            { num: "03", icon: "🤝", title: "Connect directly", desc: "When you're ready, hit contact. No middlemen, no spam calls. Just two serious parties meeting directly." },
          ].map(s => (
            <div key={s.num} style={{
              background: "var(--surface)", padding: "40px 36px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 16, right: 20,
                fontFamily: "var(--font-display)", fontSize: "3.5rem", fontWeight: 800,
                color: "rgba(255,255,255,0.03)", lineHeight: 1,
              }}>{s.num}</div>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.2rem", marginBottom: 18,
              }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em", marginBottom: 10 }}>
                {s.title}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-sub)", lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section style={{ padding: "60px 5% 100px" }}>
        <SectionLabel>Sectors</SectionLabel>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 40 }}>
          Every industry. Structured.
        </h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {sectors.map(s => (
            <div key={s} style={{
              padding: "10px 20px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 100,
              fontSize: "0.85rem", fontWeight: 500, color: "var(--text-sub)",
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sub)"; }}
            >{s}</div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        margin: "0 5% 100px", borderRadius: 16,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "60px 5%",
        position: "relative", overflow: "hidden",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 32, flexWrap: "wrap",
      }}>
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(232,160,32,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 10 }}>
            Ready to see the numbers?
          </h2>
          <p style={{ color: "var(--text-sub)", fontSize: "0.95rem" }}>
            Free to join. No credit card. Just clarity.
          </p>
        </div>
        <BtnPrimary onClick={() => setPage("login")}>Create your account →</BtnPrimary>
      </section>
    </div>
  );
}

function RoleCard({ icon, title, desc, cta, color, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: hov ? "var(--surface2)" : "var(--surface)",
        border: `1px solid ${hov ? color + "40" : "var(--border)"}`,
        borderRadius: 14, padding: "28px 30px",
        cursor: "pointer",
        transition: "all 0.25s",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 12px 40px ${color}15` : "none",
        position: "relative", overflow: "hidden",
      }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: color,
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.3s ease",
      }} />
      <div style={{ fontSize: "1.5rem", marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em", marginBottom: 8 }}>
        {title}
      </div>
      <p style={{ fontSize: "0.85rem", color: "var(--text-sub)", lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
      <div style={{ fontSize: "0.83rem", fontWeight: 600, color: color, display: "flex", alignItems: "center", gap: 6 }}>
        {cta}
        <span style={{ transition: "transform 0.2s", transform: hov ? "translateX(4px)" : "none" }}>→</span>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ────────────────────────────────────────────────────────────────
function Login({ setPage, setRole }) {
  const [mode, setMode] = useState("signin");
  const [role, setLocalRole] = useState("franchisee");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setRole(role);
      setLoading(false);
      setPage(role === "franchisee" ? "discover" : "dashboard");
    }, 900);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "80px 5%",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 60% 40%, rgba(232,160,32,0.04) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", maxWidth: 960, width: "100%" }}>
        {/* Left info */}
        <div className="fade-up">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(232,160,32,0.08)", border: "1px solid rgba(232,160,32,0.2)",
            borderRadius: 100, padding: "5px 14px",
            fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)",
            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24,
          }}>One login. Two worlds.</div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 800,
            letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16,
          }}>
            Your role,<br />your dashboard.
          </h1>
          <p style={{ color: "var(--text-sub)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 32 }}>
            Like HackerRank's login — same door, different worlds on the inside. Franchisors manage listings. Investors discover and compare.
          </p>
          {[
            { icon: "🏢", label: "Franchisors", desc: "Brand dashboard, listing management, enquiry inbox" },
            { icon: "💼", label: "Investors", desc: "Discovery feed, comparison tool, saved brands" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, background: "var(--surface2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem", flexShrink: 0,
              }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.88rem", marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-sub)" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right card */}
        <div className="fade-up-1" style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "36px 32px",
        }}>
          {/* Mode toggle */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            background: "var(--bg)", borderRadius: 8, padding: 3, gap: 3, marginBottom: 24,
          }}>
            {["signin", "signup"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: "9px", textAlign: "center", borderRadius: 6,
                border: "none", fontWeight: 600, fontSize: "0.84rem",
                background: mode === m ? "var(--surface2)" : "transparent",
                color: mode === m ? "var(--text)" : "var(--text-sub)",
                transition: "all 0.2s",
              }}>{m === "signin" ? "Sign in" : "Create account"}</button>
            ))}
          </div>

          {/* Role toggle */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-sub)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              I am a
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { val: "franchisee", label: "💼 Investor", desc: "Looking to buy" },
                { val: "franchisor", label: "🏢 Franchisor", desc: "Looking to expand" },
              ].map(r => (
                <button key={r.val} onClick={() => setLocalRole(r.val)} style={{
                  padding: "12px 14px", borderRadius: 8, textAlign: "left",
                  border: `1.5px solid ${role === r.val ? "var(--accent)" : "var(--border)"}`,
                  background: role === r.val ? "rgba(232,160,32,0.06)" : "transparent",
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: role === r.val ? "var(--accent)" : "var(--text)", marginBottom: 2 }}>
                    {r.label}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-sub)" }}>{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          {mode === "signup" && (
            <FormField label="Full Name" placeholder="Your full name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
          )}
          <FormField label="Email" placeholder="you@example.com" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
          {mode === "signup" && (
            <FormField label="Phone" placeholder="+91 98765 43210" type="tel" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
          )}
          <FormField label="Password" placeholder="Min 8 characters" type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} />

          <button onClick={submit} style={{
            width: "100%", padding: "13px",
            background: "var(--accent)", color: "#000",
            border: "none", borderRadius: 8,
            fontWeight: 700, fontSize: "0.92rem",
            marginTop: 8,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "opacity 0.2s, transform 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = 0.9; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = "none"; }}
          >
            {loading ? (
              <span style={{ width: 16, height: 16, border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite", display: "inline-block" }} />
            ) : (
              mode === "signup" ? "Create Account →" : "Sign In →"
            )}
          </button>

          <div style={{ textAlign: "center", marginTop: 16, fontSize: "0.8rem", color: "var(--text-sub)" }}>
            {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} style={{
              background: "none", border: "none", color: "var(--accent)", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer",
            }}>
              {mode === "signin" ? "Create one" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, placeholder, type = "text", value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "var(--text-sub)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "11px 14px",
          background: "var(--bg)",
          border: `1.5px solid ${focused ? "var(--accent)" : "var(--border)"}`,
          borderRadius: 7, color: "var(--text)",
          fontSize: "0.88rem", outline: "none", transition: "border-color 0.2s",
        }}
      />
    </div>
  );
}

// ─── DISCOVER PAGE (FRANCHISEE) ───────────────────────────────────────────────
function Discover({ compareList, setCompareList, setPage }) {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [sortBy, setSortBy] = useState("score");
  const [saved, setSaved] = useState([]);

  const sectors = ["All", "QSR", "Education", "Wellness", "Fitness", "Café"];

  const filtered = LISTINGS.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.sector.toLowerCase().includes(search.toLowerCase());
    const matchSector = sectorFilter === "All" || l.sector.toLowerCase().includes(sectorFilter.toLowerCase());
    return matchSearch && matchSector;
  }).sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "breakeven") return parseInt(a.breakeven) - parseInt(b.breakeven);
    if (sortBy === "royalty") return a.effectiveRoyalty - b.effectiveRoyalty;
    return 0;
  });

  const toggleCompare = (id) => {
    setCompareList(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);
  };
  const toggleSave = (id) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ padding: "80px 5% 60px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
          <SectionLabel>Discover</SectionLabel>
          <LivePill label="Live listings" />
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 8 }}>
          Find your franchise
        </h1>
        <p style={{ color: "var(--text-sub)", fontSize: "0.93rem" }}>Every number shown. No brochure fluff.</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search brand or sector…"
          style={{
            padding: "10px 16px", background: "var(--surface)",
            border: "1px solid var(--border)", borderRadius: 8,
            color: "var(--text)", fontSize: "0.87rem", outline: "none",
            width: 240, transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
        <div style={{ display: "flex", gap: 6 }}>
          {sectors.map(s => (
            <button key={s} onClick={() => setSectorFilter(s)} style={{
              padding: "9px 16px", borderRadius: 100,
              border: `1px solid ${sectorFilter === s ? "var(--accent)" : "var(--border)"}`,
              background: sectorFilter === s ? "rgba(232,160,32,0.1)" : "transparent",
              color: sectorFilter === s ? "var(--accent)" : "var(--text-sub)",
              fontSize: "0.8rem", fontWeight: sectorFilter === s ? 600 : 400,
              transition: "all 0.2s",
            }}>{s}</button>
          ))}
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
          padding: "9px 14px", background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 8, color: "var(--text-sub)", fontSize: "0.8rem", outline: "none", marginLeft: "auto",
        }}>
          <option value="score">Sort: Transparency</option>
          <option value="breakeven">Sort: Break-even</option>
          <option value="royalty">Sort: Royalty (Low→High)</option>
        </select>
      </div>

      {/* Compare bar */}
      {compareList.length > 0 && (
        <div style={{
          background: "rgba(232,160,32,0.08)", border: "1px solid rgba(232,160,32,0.2)",
          borderRadius: 10, padding: "12px 20px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
        }}>
          <span style={{ fontSize: "0.82rem", color: "var(--accent)", fontWeight: 600 }}>
            {compareList.length} selected for comparison
          </span>
          {compareList.map(id => {
            const l = LISTINGS.find(x => x.id === id);
            return <span key={id} style={{ fontSize: "0.8rem", color: "var(--text-sub)", background: "var(--surface2)", padding: "4px 10px", borderRadius: 100 }}>{l?.name}</span>;
          })}
          <button onClick={() => setPage("compare")} style={{
            marginLeft: "auto", padding: "7px 16px", background: "var(--accent)", color: "#000",
            border: "none", borderRadius: 6, fontWeight: 700, fontSize: "0.8rem",
          }}>Compare now →</button>
          <button onClick={() => setCompareList([])} style={{ background: "none", border: "none", color: "var(--text-sub)", fontSize: "0.8rem" }}>Clear</button>
        </div>
      )}

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {filtered.map(l => (
          <ListingCard
            key={l.id} listing={l}
            inCompare={compareList.includes(l.id)}
            isSaved={saved.includes(l.id)}
            onCompare={() => toggleCompare(l.id)}
            onSave={() => toggleSave(l.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ListingCard({ listing: l, inCompare, isSaved, onCompare, onSave }) {
  const [hov, setHov] = useState(false);
  const scoreColor = l.score >= 70 ? "var(--accent)" : l.score >= 50 ? "#e8a020" : "var(--accent2)";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "var(--surface2)" : "var(--surface)",
        border: `1px solid ${inCompare ? "rgba(232,160,32,0.4)" : hov ? "var(--border-hover)" : "var(--border)"}`,
        borderRadius: 14, overflow: "hidden",
        transition: "all 0.22s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 16px 40px rgba(0,0,0,0.3)" : "none",
      }}>
      {/* Top */}
      <div style={{
        height: 100, background: l.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2rem", position: "relative",
        borderBottom: "1px solid var(--border)",
      }}>
        {l.emoji}
        <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 6 }}>
          {l.tags.map(t => (
            <span key={t} style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em",
              padding: "3px 8px", borderRadius: 100,
              background: t === "Verified" ? "rgba(61,158,110,0.2)" : t === "Popular" ? "rgba(232,160,32,0.15)" : "rgba(200,68,42,0.15)",
              color: t === "Verified" ? "#3d9e6e" : t === "Popular" ? "var(--accent)" : "var(--accent2)",
            }}>{t}</span>
          ))}
        </div>
        {/* Save button */}
        <button onClick={e => { e.stopPropagation(); onSave(); }} style={{
          position: "absolute", top: 8, left: 10,
          background: "rgba(0,0,0,0.4)", border: "none",
          borderRadius: 100, width: 28, height: 28,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.8rem", cursor: "pointer",
          color: isSaved ? "var(--accent)" : "var(--text-sub)",
        }}>{isSaved ? "★" : "☆"}</button>
      </div>

      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
          {l.sector}
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em", marginBottom: 14 }}>
          {l.name}
        </div>

        {/* Key metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { k: "Investment", v: l.investment },
            { k: "Eff. Royalty", v: `${l.effectiveRoyalty}%` },
            { k: "Break-even", v: l.breakeven },
            { k: "Active Units", v: l.outlets },
          ].map(m => (
            <div key={m.k}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{m.k}</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>{m.v}</div>
            </div>
          ))}
        </div>

        {/* Score bar */}
        <div style={{
          paddingTop: 12, borderTop: "1px solid var(--border)",
          display: "flex", alignItems: "center", gap: 8, marginBottom: 14,
        }}>
          <span style={{ fontSize: "0.68rem", color: "var(--text-sub)", flex: 1 }}>Transparency</span>
          <div style={{ flex: 2, height: 4, background: "var(--surface2)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ width: `${l.score}%`, height: "100%", background: scoreColor, borderRadius: 10 }} />
          </div>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: scoreColor }}>{l.score}</span>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onCompare} style={{
            flex: 1, padding: "9px", borderRadius: 7,
            border: `1px solid ${inCompare ? "var(--accent)" : "var(--border)"}`,
            background: inCompare ? "rgba(232,160,32,0.1)" : "transparent",
            color: inCompare ? "var(--accent)" : "var(--text-sub)",
            fontSize: "0.78rem", fontWeight: 600, transition: "all 0.2s",
          }}>{inCompare ? "✓ Added" : "+ Compare"}</button>
          <button style={{
            flex: 1, padding: "9px", borderRadius: 7,
            border: "none", background: "var(--accent)", color: "#000",
            fontSize: "0.78rem", fontWeight: 700, transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = 0.85}
            onMouseLeave={e => e.currentTarget.style.opacity = 1}
          >Contact →</button>
        </div>
      </div>
    </div>
  );
}

// ─── COMPARE PAGE ─────────────────────────────────────────────────────────────
function Compare({ compareList, setCompareList, setPage }) {
  const items = LISTINGS.filter(l => compareList.includes(l.id));

  if (items.length === 0) return (
    <div style={{ padding: "120px 5%", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: 16 }}>📊</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, marginBottom: 12 }}>No franchises selected</h2>
      <p style={{ color: "var(--text-sub)", marginBottom: 24 }}>Go to Discover and add up to 3 franchises to compare.</p>
      <BtnPrimary onClick={() => setPage("discover")}>Go to Discover →</BtnPrimary>
    </div>
  );

  const rows = [
    { key: "Investment Range", vals: items.map(l => l.investment) },
    { key: "Franchise Fee", vals: items.map(l => l.fee) },
    { key: "Royalty %", vals: items.map(l => `${l.royalty}%`) },
    { key: "Marketing Fee %", vals: items.map(l => l.marketingFee ? `${l.marketingFee}%` : "—") },
    { key: "Material Markup %", vals: items.map(l => l.materialMarkup ? `${l.materialMarkup}%` : "None"), highlight: "low" },
    { key: "Effective Royalty Burden", vals: items.map(l => `${l.effectiveRoyalty}%`), highlight: "low", bold: true },
    { key: "Est. Break-even", vals: items.map(l => l.breakeven) },
    { key: "Active Outlets", vals: items.map(l => String(l.outlets)) },
    { key: "Closed Outlets", vals: items.map(l => String(l.closed)), highlight: "low" },
    { key: "Area Required", vals: items.map(l => l.area) },
    { key: "Staff Required", vals: items.map(l => String(l.staff)) },
    { key: "Training", vals: items.map(l => l.training ? "✓ Yes" : "✗ No") },
    { key: "Site Selection", vals: items.map(l => l.siteHelp ? "✓ Yes" : "✗ No") },
    { key: "Marketing Support", vals: items.map(l => l.marketing ? "✓ Yes" : "✗ No") },
    { key: "Supply Chain", vals: items.map(l => l.supply ? "✓ Yes" : "✗ No") },
    { key: "Transparency Score", vals: items.map(l => `${l.score} / 100 · ${l.scoreLabel}`), highlight: "high", bold: true },
  ];

  return (
    <div style={{ padding: "80px 5% 60px" }}>
      <SectionLabel>Comparison Tool</SectionLabel>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.04em" }}>
          Side by side.<br />No surprises.
        </h1>
        <div style={{ display: "flex", gap: 10 }}>
          <BtnOutline onClick={() => setPage("discover")}>+ Add more</BtnOutline>
          <button onClick={() => setCompareList([])} style={{ padding: "10px 18px", borderRadius: 8, border: "1px solid rgba(200,68,42,0.3)", background: "rgba(200,68,42,0.06)", color: "var(--accent2)", fontSize: "0.84rem", fontWeight: 600 }}>
            Clear all
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ padding: "16px 20px", textAlign: "left", background: "var(--surface)", borderBottom: "1px solid var(--border)", fontFamily: "var(--font-display)", fontSize: "0.75rem", color: "var(--text-sub)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, width: "28%" }}>
                Metric
              </th>
              {items.map(l => (
                <th key={l.id} style={{ padding: "16px 20px", textAlign: "left", background: "var(--surface)", borderBottom: "1px solid var(--border)", fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span>{l.emoji}</span> {l.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-sub)", fontWeight: 400, marginTop: 4 }}>{l.sector}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.key} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                <td style={{ padding: "14px 20px", fontSize: "0.82rem", color: "var(--text-sub)", fontWeight: 500, borderBottom: "1px solid var(--border)" }}>
                  {row.key}
                </td>
                {row.vals.map((v, j) => {
                  const isGood = row.highlight === "high" ? true : row.highlight === "low" ? false : null;
                  const valNum = parseFloat(v);
                  const minVal = Math.min(...row.vals.map(x => parseFloat(x) || 0));
                  const maxVal = Math.max(...row.vals.map(x => parseFloat(x) || 0));
                  let highlight = null;
                  if (row.highlight === "low" && valNum === minVal && minVal !== maxVal) highlight = "var(--accent3)";
                  if (row.highlight === "high" && valNum === maxVal && minVal !== maxVal) highlight = "var(--accent)";
                  if (v.includes("✓")) highlight = "var(--accent3)";
                  if (v.includes("✗")) highlight = "var(--accent2)";
                  return (
                    <td key={j} style={{
                      padding: "14px 20px",
                      fontSize: row.bold ? "0.9rem" : "0.85rem",
                      fontWeight: row.bold ? 700 : 500,
                      color: highlight || "var(--text)",
                      borderBottom: "1px solid var(--border)",
                    }}>{v}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── FRANCHISOR DASHBOARD ──────────────────────────────────────────────────────
function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const mockListing = LISTINGS[0];

  return (
    <div style={{ padding: "80px 0 60px", minHeight: "100vh" }}>
      {/* Sidebar + Main layout */}
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 0, minHeight: "calc(100vh - 80px)" }}>
        {/* Sidebar */}
        <div style={{ background: "var(--surface)", borderRight: "1px solid var(--border)", padding: "24px 0" }}>
          <div style={{ padding: "0 20px 20px", borderBottom: "1px solid var(--border)", marginBottom: 12 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>PizzaStop India</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>Franchisor Account</div>
          </div>
          {[
            { id: "overview", icon: "⬡", label: "Overview" },
            { id: "listing", icon: "📋", label: "My Listing" },
            { id: "enquiries", icon: "📨", label: "Enquiries", count: 3 },
            { id: "profile", icon: "👤", label: "Profile" },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              width: "100%", textAlign: "left",
              padding: "10px 20px",
              display: "flex", alignItems: "center", gap: 10,
              background: activeTab === item.id ? "rgba(232,160,32,0.08)" : "transparent",
              borderLeft: `2px solid ${activeTab === item.id ? "var(--accent)" : "transparent"}`,
              border: "none",
              color: activeTab === item.id ? "var(--text)" : "var(--text-sub)",
              fontSize: "0.85rem", fontWeight: activeTab === item.id ? 600 : 400,
              transition: "all 0.2s", cursor: "pointer",
            }}>
              <span>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.count && (
                <span style={{ background: "var(--accent2)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "1px 7px", borderRadius: 100 }}>{item.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Main */}
        <div style={{ padding: "32px 40px", overflowY: "auto" }}>
          {activeTab === "overview" && <DashOverview />}
          {activeTab === "listing" && <DashListing listing={mockListing} />}
          {activeTab === "enquiries" && <DashEnquiries />}
          {activeTab === "profile" && <DashProfile />}
        </div>
      </div>
    </div>
  );
}

function DashOverview() {
  const stats = [
    { label: "Profile Views (30d)", val: "1,248", delta: "+18%" },
    { label: "Enquiries Received", val: "34", delta: "+7" },
    { label: "Transparency Score", val: "82/100", delta: "High" },
    { label: "Active Saved By", val: "67", delta: "Investors" },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 0 }}>Dashboard</h2>
        <LivePill label="Live metrics" />
      </div>
      <p style={{ color: "var(--text-sub)", fontSize: "0.88rem", marginBottom: 32 }}>Welcome back. Here's how your brand is performing.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: "var(--surface2)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "18px 20px",
          }}>
            <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.04em" }}>{s.val}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--accent)", marginTop: 4 }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "20px 24px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 16 }}>Transparency Score Breakdown</div>
        {[
          { label: "Financial Data Complete", done: true },
          { label: "Royalty Clearly Disclosed", done: true },
          { label: "Outlet Count Verified", done: true },
          { label: "Closure Rate Provided", done: false },
          { label: "Documents Uploaded", done: false },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: item.done ? "rgba(61,158,110,0.15)" : "var(--surface)",
              border: `1.5px solid ${item.done ? "var(--accent3)" : "var(--border)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.65rem", color: item.done ? "var(--accent3)" : "var(--text-dim)",
              flexShrink: 0,
            }}>{item.done ? "✓" : ""}</div>
            <span style={{ fontSize: "0.84rem", color: item.done ? "var(--text)" : "var(--text-sub)" }}>{item.label}</span>
            {!item.done && <span style={{ fontSize: "0.7rem", color: "var(--accent)", marginLeft: "auto" }}>+ Add to increase score</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashListing({ listing: l }) {
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 24 }}>My Listing</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { label: "Brand Name", val: l.name },
          { label: "Sector", val: l.sector },
          { label: "Investment Range", val: l.investment },
          { label: "Franchise Fee", val: l.fee },
          { label: "Royalty %", val: `${l.royalty}%` },
          { label: "Marketing Fee %", val: `${l.marketingFee}%` },
          { label: "Material Markup %", val: `${l.materialMarkup}%` },
          { label: "Effective Royalty", val: `${l.effectiveRoyalty}%` },
          { label: "Break-even", val: l.breakeven },
          { label: "Active Outlets", val: l.outlets },
        ].map(f => (
          <div key={f.label} style={{
            background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "14px 16px",
          }}>
            <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{f.label}</div>
            <div style={{ fontSize: "0.92rem", fontWeight: 600 }}>{f.val}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <BtnPrimary>Edit Listing →</BtnPrimary>
      </div>
    </div>
  );
}

function DashEnquiries() {
  const enquiries = [
    { name: "Rahul Mehta", city: "Coimbatore", budget: "₹40–50L", date: "24 Feb", status: "New" },
    { name: "Priya Sharma", city: "Indore", budget: "₹35–45L", date: "22 Feb", status: "New" },
    { name: "Arjun Nair", city: "Lucknow", budget: "₹50–60L", date: "20 Feb", status: "Replied" },
  ];
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 24 }}>Enquiries</h2>
      {enquiries.map((e, i) => (
        <div key={i} style={{
          background: "var(--surface2)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "18px 20px", marginBottom: 12,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700 }}>
              {e.name[0]}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{e.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-sub)" }}>{e.city} · Budget: {e.budget}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{e.date}</span>
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100,
              background: e.status === "New" ? "rgba(200,68,42,0.15)" : "rgba(61,158,110,0.12)",
              color: e.status === "New" ? "var(--accent2)" : "var(--accent3)",
            }}>{e.status}</span>
            <button style={{
              padding: "7px 14px", borderRadius: 6, border: "1px solid var(--border)",
              background: "transparent", color: "var(--text)", fontSize: "0.78rem", fontWeight: 600,
            }}>Reply</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DashProfile() {
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 24 }}>Brand Profile</h2>
      <p style={{ color: "var(--text-sub)", fontSize: "0.88rem" }}>Profile editing coming soon. Your current data is live on the platform.</p>
    </div>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em",
      textTransform: "uppercase", color: "var(--accent)",
      marginBottom: 12,
    }}>
      <span style={{ width: 20, height: 1.5, background: "var(--accent)", display: "inline-block" }} />
      {children}
    </div>
  );
}

function BtnPrimary({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      padding: "12px 28px",
      background: hov ? "#f5ad35" : "var(--accent)",
      color: "#000",
      border: "none", borderRadius: 8,
      fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 700,
      display: "inline-flex", alignItems: "center", gap: 8,
      transform: hov ? "translateY(-2px)" : "none",
      boxShadow: hov ? "0 8px 24px rgba(232,160,32,0.25)" : "none",
      transition: "all 0.2s",
    }}>{children}</button>
  );
}

function BtnOutline({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      padding: "12px 28px",
      background: hov ? "var(--surface2)" : "transparent",
      color: hov ? "var(--text)" : "var(--text-sub)",
      border: `1.5px solid ${hov ? "var(--border-hover)" : "var(--border)"}`,
      borderRadius: 8,
      fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500,
      transform: hov ? "translateY(-2px)" : "none",
      transition: "all 0.2s",
    }}>{children}</button>
  );
}

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [role, setRole] = useState(null);
  const [compareList, setCompareList] = useState([]);

  // inject global styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "landing": return <Landing setPage={setPage} />;
      case "login": return <Login setPage={setPage} setRole={setRole} />;
      case "discover": return <Discover compareList={compareList} setCompareList={setCompareList} setPage={setPage} />;
      case "compare": return <Compare compareList={compareList} setCompareList={setCompareList} setPage={setPage} />;
      case "dashboard": return <Dashboard />;
      default: return <Landing setPage={setPage} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="app-shell">
        <FontLoader />
        <AmbientBackground />
        <Nav page={page} setPage={setPage} role={role} setRole={setRole} />
        <div key={page} className="page-enter">
          {renderPage()}
        </div>
      </div>
    </ErrorBoundary>
  );
}
