import { MONUMENTS, FESTIVALS, ART_FORMS } from "../data";
import ImgWithFallback from "../components/ImgWithFallback";

const HomePage = ({ setActive, user }) => {
  const stats = [
    { label: "UNESCO Sites", value: "42",    icon: "🏛️", bg: "linear-gradient(135deg,#FF6B35,#F7931E)", shadow: "rgba(255,107,53,0.35)" },
    { label: "Languages",    value: "22+",   icon: "🗣️", bg: "linear-gradient(135deg,#7C3AED,#8B5CF6)", shadow: "rgba(124,58,237,0.35)" },
    { label: "Monuments",    value: "3650+", icon: "🕌", bg: "linear-gradient(135deg,#0D9488,#14B8A6)", shadow: "rgba(13,148,136,0.35)" },
    { label: "Art Forms",    value: "64",    icon: "🎨", bg: "linear-gradient(135deg,#F59E0B,#FCD34D)", shadow: "rgba(245,158,11,0.35)" },
  ];

  const cardAccents = [
    "linear-gradient(135deg,#FF6B35,#F7931E)",
    "linear-gradient(135deg,#7C3AED,#8B5CF6)",
    "linear-gradient(135deg,#0D9488,#14B8A6)",
  ];

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg,#0F172A 0%,#1E1B4B 40%,#0F2027 100%)",
        borderRadius: 24, padding: "60px 52px", marginBottom: 28,
        position: "relative", overflow: "hidden",
        boxShadow: "0 24px 64px rgba(15,23,42,0.4)",
        border: "1px solid rgba(255,255,255,0.06)"
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,0.18),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: 160, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.14),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "30%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(13,148,136,0.1),transparent 70%)", pointerEvents: "none" }} />
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
          {/* Pill badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.35)", borderRadius: 99, padding: "6px 18px", marginBottom: 24 }}>
            <span style={{ fontSize: 15 }}>🇮🇳</span>
            <span style={{ color: "#FF6B35", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
              {user ? `Welcome back, ${user.name}!` : "DISCOVER INCREDIBLE INDIA"}
            </span>
          </div>

          <h1 style={{ color: "#fff", fontSize: 48, fontWeight: 900, lineHeight: 1.12, margin: "0 0 20px", letterSpacing: -1 }}>
            Explore 5000 Years of<br />
            <span style={{ background: "linear-gradient(90deg,#FF6B35,#F7931E,#FCD34D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Indian Heritage
            </span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 36, maxWidth: 500 }}>
            Journey through ancient temples, Mughal marvels, vibrant festivals, and classical arts — a living tapestry of civilization.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => setActive("monuments")} className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }}>
              Explore Monuments →
            </button>
            <button onClick={() => setActive("tours")} className="btn-ghost" style={{ fontSize: 15, padding: "14px 32px" }}>
              🌐 Virtual Tours
            </button>
          </div>
        </div>

        {/* Floating monument emoji */}
        <div style={{ position: "absolute", right: 52, top: "50%", transform: "translateY(-50%)", fontSize: 130, opacity: 0.1, filter: "drop-shadow(0 0 40px #FF6B35)", animation: "float 5s ease-in-out infinite", pointerEvents: "none" }}>🕌</div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 18, padding: "22px 20px", textAlign: "center", boxShadow: `0 4px 24px ${s.shadow}`, border: "1px solid #E2E8F0", position: "relative", overflow: "hidden", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ position: "absolute", top: -24, right: -24, width: 90, height: 90, borderRadius: "50%", background: s.bg, opacity: 0.1 }} />
            <div style={{ width: 54, height: 54, borderRadius: 16, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 12px", boxShadow: `0 8px 20px ${s.shadow}` }}>{s.icon}</div>
            <div style={{ fontSize: 30, fontWeight: 900, background: s.bg, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>{s.value}</div>
            <div style={{ color: "#64748B", fontSize: 12, fontWeight: 600, letterSpacing: 0.3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Featured Monuments ───────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#FF6B35", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>✦ Featured</div>
          <h2 className="section-title">Iconic Monuments</h2>
          <div className="divider-saffron" />
        </div>
        <button onClick={() => setActive("monuments")} style={{ background: "linear-gradient(135deg,#FF6B35,#F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(255,107,53,0.35)", fontFamily: "inherit" }}>View All →</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 32 }}>
        {MONUMENTS.slice(0, 3).map((m, idx) => (
          <div key={m.id} onClick={() => setActive("monuments")}
            style={{ borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(15,23,42,0.08)", cursor: "pointer", transition: "transform 0.25s,box-shadow 0.25s", border: "1px solid #E2E8F0" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(15,23,42,0.16)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(15,23,42,0.08)"; }}>
            <div style={{ height: 190, overflow: "hidden", position: "relative" }}>
              <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 35%,rgba(15,23,42,0.75))" }} />
              <div style={{ position: "absolute", top: 12, left: 12, background: cardAccents[idx], borderRadius: 8, padding: "3px 12px" }}>
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>{m.era.toUpperCase()}</span>
              </div>
              <div style={{ position: "absolute", bottom: 12, left: 14 }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{m.name}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 2 }}>📍 {m.city}, {m.state}</div>
              </div>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <p style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{m.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Culture & Festivals ──────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
        {/* Classical Arts */}
        <div style={{ background: "linear-gradient(135deg,#1E1B4B 0%,#312E81 100%)", borderRadius: 20, padding: 24, border: "1px solid rgba(124,58,237,0.3)", boxShadow: "0 8px 32px rgba(124,58,237,0.2)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.3),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, position: "relative" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#A78BFA", letterSpacing: 2, marginBottom: 4 }}>✦ CLASSICAL</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>🎭 Arts & Culture</h2>
            </div>
            <button onClick={() => setActive("culture")} style={{ background: "rgba(139,92,246,0.25)", border: "1px solid rgba(139,92,246,0.4)", color: "#C4B5FD", borderRadius: 10, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Explore →</button>
          </div>
          {ART_FORMS.slice(0, 3).map(a => (
            <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.07)", borderRadius: 12, marginBottom: 8, border: "1px solid rgba(255,255,255,0.08)", transition: "background 0.2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                {a.type === "Dance" ? "💃" : a.type === "Painting" ? "🎨" : a.type === "Tribal Art" ? "🖼️" : "🎵"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{a.name}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>{a.state} · {a.type}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Festivals */}
        <div style={{ background: "linear-gradient(135deg,#1C1400 0%,#2D1A00 100%)", borderRadius: 20, padding: 24, border: "1px solid rgba(245,158,11,0.3)", boxShadow: "0 8px 32px rgba(245,158,11,0.15)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.25),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, position: "relative" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#FCD34D", letterSpacing: 2, marginBottom: 4 }}>✦ CELEBRATIONS</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>🪔 Festivals</h2>
            </div>
            <button onClick={() => setActive("festivals")} style={{ background: "rgba(245,158,11,0.25)", border: "1px solid rgba(245,158,11,0.4)", color: "#FCD34D", borderRadius: 10, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Explore →</button>
          </div>
          {FESTIVALS.slice(0, 3).map(f => (
            <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.07)", borderRadius: 12, marginBottom: 8, border: "1px solid rgba(255,255,255,0.08)", transition: "background 0.2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: f.color, flexShrink: 0, boxShadow: `0 0 10px ${f.color}` }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>{f.name}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>{f.month}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Access ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#0D9488", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>✦ Quick Access</div>
        <h2 className="section-title" style={{ marginBottom: 4 }}>Explore More</h2>
        <div className="divider-saffron" style={{ background: "linear-gradient(90deg,#0D9488,#14B8A6)" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {[
          { icon: "🌐", title: "Virtual Tours",  desc: "Immersive guided tours of iconic monuments with expert commentary", page: "tours", bg: "linear-gradient(135deg,#4F46E5,#6366F1)", shadow: "rgba(79,70,229,0.3)", accent: "#4F46E5" },
          { icon: "🧠", title: "Heritage Quiz",  desc: "Test your knowledge of Indian history, art, and culture",           page: "quiz",  bg: "linear-gradient(135deg,#0D9488,#14B8A6)", shadow: "rgba(13,148,136,0.3)", accent: "#0D9488" },
        ].map(item => (
          <div key={item.title} onClick={() => setActive(item.page)}
            style={{ background: "#fff", borderRadius: 18, padding: 24, cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 18, transition: "all 0.25s", border: "1px solid #E2E8F0", boxShadow: "0 4px 16px rgba(15,23,42,0.06)", position: "relative", overflow: "hidden" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 40px ${item.shadow}`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = item.accent + "44"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(15,23,42,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#E2E8F0"; }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: item.bg, opacity: 0.07 }} />
            <div style={{ width: 56, height: 56, borderRadius: 16, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, boxShadow: `0 8px 20px ${item.shadow}` }}>{item.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#0F172A", marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
