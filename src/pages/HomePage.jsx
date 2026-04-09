import { MONUMENTS, FESTIVALS, ART_FORMS } from "../data";
import ImgWithFallback from "../components/ImgWithFallback";

const HomePage = ({ setActive, user }) => {
  const stats = [
    { label: "UNESCO Sites", value: "42",    icon: "🏛️", color: "#FF6B35", bg: "linear-gradient(135deg,#FF6B35,#F7931E)" },
    { label: "Languages",    value: "22+",   icon: "🗣️", color: "#8B5CF6", bg: "linear-gradient(135deg,#8B5CF6,#A78BFA)" },
    { label: "Monuments",    value: "3650+", icon: "🕌", color: "#10B981", bg: "linear-gradient(135deg,#10B981,#34D399)" },
    { label: "Art Forms",    value: "64",    icon: "🎨", color: "#F59E0B", bg: "linear-gradient(135deg,#F59E0B,#FCD34D)" },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#0F1923 0%,#1a2a4a 50%,#0F1923 100%)", borderRadius: 20, padding: "64px 52px", marginBottom: 32, position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg,#FF6B35 0,#FF6B35 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,0.15),transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -40, left: 200, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 620 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,53,0.2)", border: "1px solid rgba(255,107,53,0.4)", borderRadius: 20, padding: "6px 18px", marginBottom: 24 }}>
            <span style={{ fontSize: 16 }}>🇮🇳</span>
            <span style={{ color: "#FF6B35", fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>
              {user ? `Welcome back, ${user.name}!` : "Discover Incredible India"}
            </span>
          </div>
          <h1 style={{ color: "#fff", fontSize: 46, fontWeight: 900, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: -0.5 }}>
            Explore 5000 Years of<br />
            <span style={{ background: "linear-gradient(90deg,#FF6B35,#F7931E,#FCD34D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Indian Heritage</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.8, marginBottom: 36, maxWidth: 500 }}>
            Journey through ancient temples, Mughal marvels, vibrant festivals, and classical arts — a living tapestry of civilization.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => setActive("monuments")} style={{ background: "linear-gradient(135deg,#FF6B35,#F7931E)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,107,53,0.4)" }}>
              Explore Monuments →
            </button>
            <button onClick={() => setActive("tours")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}>
              🌐 Virtual Tours
            </button>
          </div>
        </div>
        <div style={{ position: "absolute", right: 52, top: "50%", transform: "translateY(-50%)", fontSize: 140, opacity: 0.12, filter: "drop-shadow(0 0 40px #FF6B35)" }}>🕌</div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 36 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: s.bg, opacity: 0.08 }} />
            <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 12px", boxShadow: `0 6px 16px ${s.color}40` }}>{s.icon}</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ color: "#888", fontSize: 13, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Monuments */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>✨ Featured Monuments</h2>
          <p style={{ color: "#888", fontSize: 13, margin: "4px 0 0" }}>Iconic sites that define Indian heritage</p>
        </div>
        <button onClick={() => setActive("monuments")} style={{ background: "linear-gradient(135deg,#FF6B35,#F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(255,107,53,0.3)" }}>View All →</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginBottom: 36 }}>
        {MONUMENTS.slice(0, 3).map((m, idx) => (
          <div key={m.id} onClick={() => setActive("monuments")} style={{ borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", cursor: "pointer", transition: "transform 0.25s,box-shadow 0.25s", border: "1px solid #f0f0f0" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}>
            <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
              <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%,rgba(0,0,0,0.6))" }} />
              <div style={{ position: "absolute", top: 12, left: 12, background: ["linear-gradient(135deg,#FF6B35,#F7931E)", "linear-gradient(135deg,#8B5CF6,#A78BFA)", "linear-gradient(135deg,#10B981,#34D399)"][idx], borderRadius: 8, padding: "3px 10px" }}>
                <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{m.era}</span>
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", margin: "0 0 4px" }}>{m.name}</h3>
              <div style={{ color: "#888", fontSize: 12, marginBottom: 10 }}>📍 {m.city}, {m.state}</div>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{m.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Culture & Festivals */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
        <div style={{ background: "linear-gradient(135deg,#1a1a2e,#2d1b69)", borderRadius: 16, padding: 24, border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 8px 32px rgba(139,92,246,0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>🎭 Classical Arts</h2>
            <button onClick={() => setActive("culture")} style={{ background: "rgba(139,92,246,0.3)", border: "1px solid rgba(139,92,246,0.5)", color: "#A78BFA", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Explore →</button>
          </div>
          {ART_FORMS.slice(0, 3).map(a => (
            <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: 10, marginBottom: 8, border: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: 22 }}>{a.type === "Dance" ? "💃" : a.type === "Painting" ? "🎨" : a.type === "Tribal Art" ? "🖼️" : "🎵"}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{a.name}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{a.state} · {a.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg,#1a1a0e,#2d1a00)", borderRadius: 16, padding: 24, border: "1px solid rgba(245,158,11,0.3)", boxShadow: "0 8px 32px rgba(245,158,11,0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>🪔 Festivals</h2>
            <button onClick={() => setActive("festivals")} style={{ background: "rgba(245,158,11,0.3)", border: "1px solid rgba(245,158,11,0.5)", color: "#FCD34D", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Explore →</button>
          </div>
          {FESTIVALS.slice(0, 3).map(f => (
            <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: 10, marginBottom: 8, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: f.color, flexShrink: 0, boxShadow: `0 0 8px ${f.color}` }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{f.name}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{f.month}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>🚀 Quick Access</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {[
          { icon: "🌐", title: "Virtual Tours",  desc: "Immersive guided tours of iconic monuments with expert commentary", page: "tours",  bg: "linear-gradient(135deg,#3B82F6,#60A5FA)", shadow: "rgba(59,130,246,0.3)" },
          { icon: "🧠", title: "Heritage Quiz",  desc: "Test your knowledge of Indian history, art, and culture",           page: "quiz",   bg: "linear-gradient(135deg,#10B981,#34D399)", shadow: "rgba(16,185,129,0.3)" },
        ].map(item => (
          <div key={item.title} onClick={() => setActive(item.page)}
            style={{ background: "#fff", borderRadius: 16, padding: 24, cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 18, transition: "all 0.25s", border: "1px solid #f0f0f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 32px ${item.shadow}`; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, boxShadow: `0 8px 20px ${item.shadow}` }}>{item.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#1a1a2e", marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "#888", fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
