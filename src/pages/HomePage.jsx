import { MONUMENTS, FESTIVALS, ART_FORMS } from "../data";
import ImgWithFallback from "../components/ImgWithFallback";

const HomePage = ({ setActive, user, onLoginClick }) => {
  const stats = [
    { label: "UNESCO Sites", value: "42",    icon: "🏛️" },
    { label: "Languages",    value: "22+",   icon: "🗣️" },
    { label: "Monuments",    value: "3650+", icon: "🕌" },
    { label: "Art Forms",    value: "64",    icon: "🎨" },
  ];

  const gatedClick = (page) => {
    if (!user) { onLoginClick(); return; }
    setActive(page);
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0F1923 0%, #1a2a3a 50%, #0F1923 100%)", borderRadius: 16, padding: "60px 48px", marginBottom: 32, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "repeating-linear-gradient(45deg, #FF6B35 0, #FF6B35 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
          {user ? (
            <div style={{ display: "inline-block", background: "rgba(255,107,53,0.2)", border: "1px solid rgba(255,107,53,0.4)", borderRadius: 20, padding: "4px 16px", marginBottom: 20 }}>
              <span style={{ color: "#FF6B35", fontSize: 13, fontWeight: 600 }}>🇮🇳 Welcome back, {user.name}!</span>
            </div>
          ) : (
            <div style={{ display: "inline-block", background: "rgba(255,107,53,0.2)", border: "1px solid rgba(255,107,53,0.4)", borderRadius: 20, padding: "4px 16px", marginBottom: 20 }}>
              <span style={{ color: "#FF6B35", fontSize: 13, fontWeight: 600 }}>🇮🇳 Discover Incredible India</span>
            </div>
          )}
          <h1 style={{ color: "#fff", fontSize: 42, fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px" }}>
            Explore 5000 Years of<br />
            <span style={{ background: "linear-gradient(90deg, #FF6B35, #F7931E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Indian Heritage</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
            Journey through ancient temples, Mughal marvels, vibrant festivals, and classical arts — free for everyone to explore.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setActive("monuments")} style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Explore Monuments →
            </button>
            <button onClick={() => gatedClick("tours")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              {user ? "Virtual Tours 🌐" : "🔒 Virtual Tours"}
            </button>
          </div>
        </div>
        <div style={{ position: "absolute", right: 48, top: "50%", transform: "translateY(-50%)", fontSize: 120, opacity: 0.15 }}>🕌</div>
      </div>

      {/* Guest CTA banner */}
      {!user && (
        <div style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 14, padding: "20px 28px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, border: "1px solid rgba(255,107,53,0.2)" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Unlock the full experience</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>Sign in to access Virtual Tours, Heritage Quiz, and more</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onLoginClick} style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Sign In / Register
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 12, padding: "20px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#FF6B35" }}>{s.value}</div>
            <div style={{ color: "#666", fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Monuments — public */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Featured Monuments</h2>
        <button onClick={() => setActive("monuments")} style={{ background: "none", border: "1px solid #FF6B35", color: "#FF6B35", borderRadius: 8, padding: "6px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View All →</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
        {MONUMENTS.slice(0, 3).map(m => (
          <div key={m.id} onClick={() => setActive("monuments")} style={{ borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", cursor: "pointer", transition: "transform 0.2s", border: "1px solid #f0f0f0" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ height: 160, overflow: "hidden" }}>
              <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{m.name}</h3>
                <span style={{ background: "#FFF5F0", color: "#FF6B35", fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: 600, flexShrink: 0 }}>{m.era}</span>
              </div>
              <div style={{ color: "#888", fontSize: 12, marginBottom: 8 }}>📍 {m.city}, {m.state}</div>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{m.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Culture & Festivals — public */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
        {/* Culture preview */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>🎭 Classical Arts</h2>
            <button onClick={() => setActive("culture")} style={{ background: "none", border: "1px solid #8B5CF6", color: "#8B5CF6", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Explore →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ART_FORMS.slice(0, 3).map(a => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#fafafa", borderRadius: 10 }}>
                <span style={{ fontSize: 22 }}>{a.type === "Dance" ? "💃" : a.type === "Painting" ? "🎨" : a.type === "Tribal Art" ? "🖼️" : "🎵"}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{a.name}</div>
                  <div style={{ color: "#888", fontSize: 12 }}>{a.state} · {a.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Festivals preview */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>🪔 Festivals</h2>
            <button onClick={() => setActive("festivals")} style={{ background: "none", border: "1px solid #F59E0B", color: "#F59E0B", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Explore →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FESTIVALS.slice(0, 3).map(f => (
              <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#fafafa", borderRadius: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{f.name}</div>
                  <div style={{ color: "#888", fontSize: 12 }}>{f.month}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gated features */}
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: 16 }}>
        {user ? "More to Explore" : "🔒 Members Only Features"}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {[
          { icon: "🌐", title: "Virtual Tours",   desc: "Immersive guided tours of iconic monuments with expert commentary", page: "tours",  color: "#3B82F6" },
          { icon: "🧠", title: "Heritage Quiz",   desc: "Test your knowledge of Indian history, art, and culture",           page: "quiz",   color: "#10B981" },
        ].map(item => (
          <div key={item.title} onClick={() => gatedClick(item.page)}
            style={{ background: "#fff", border: `1px solid ${user ? "#f0f0f0" : "#e5e7eb"}`, borderRadius: 14, padding: 24, cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 16, transition: "box-shadow 0.2s", position: "relative", overflow: "hidden" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 20px ${item.color}25`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            {!user && (
              <div style={{ position: "absolute", top: 12, right: 12, background: "#f5f5f5", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "#999", fontWeight: 600 }}>🔒 Login Required</div>
            )}
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1a2e", marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "#888", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
