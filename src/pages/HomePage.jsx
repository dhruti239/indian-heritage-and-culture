import { MONUMENTS } from "../data";
import ImgWithFallback from "../components/ImgWithFallback";

const HomePage = ({ setActive, user }) => {
  const stats = [
    { label: "UNESCO Sites", value: "42",    icon: "🏛️" },
    { label: "Languages",    value: "22+",   icon: "🗣️" },
    { label: "Monuments",    value: "3650+", icon: "🕌" },
    { label: "Art Forms",    value: "64",    icon: "🎨" },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0F1923 0%, #1a2a3a 50%, #0F1923 100%)", borderRadius: 16, padding: "60px 48px", marginBottom: 32, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "repeating-linear-gradient(45deg, #FF6B35 0, #FF6B35 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
          <div style={{ display: "inline-block", background: "rgba(255,107,53,0.2)", border: "1px solid rgba(255,107,53,0.4)", borderRadius: 20, padding: "4px 16px", marginBottom: 20 }}>
            <span style={{ color: "#FF6B35", fontSize: 13, fontWeight: 600 }}>🇮🇳 Welcome, {user.name}!</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: 42, fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px" }}>
            Explore 5000 Years of<br />
            <span style={{ background: "linear-gradient(90deg, #FF6B35, #F7931E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Indian Heritage</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
            Journey through ancient temples, Mughal marvels, vibrant festivals, and classical arts.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setActive("monuments")} style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Explore Monuments →</button>
            <button onClick={() => setActive("tours")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Virtual Tours 🌐</button>
          </div>
        </div>
        <div style={{ position: "absolute", right: 48, top: "50%", transform: "translateY(-50%)", fontSize: 120, opacity: 0.15 }}>🕌</div>
      </div>

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

      {/* Featured Monuments */}
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#1a1a2e" }}>Featured Monuments</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
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

      {/* Quick Links */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { icon: "🎭", title: "Classical Arts",  desc: "Dance, music, painting traditions", page: "culture" },
          { icon: "🪔", title: "Indian Festivals", desc: "Celebrations across seasons",       page: "festivals" },
          { icon: "🧠", title: "Heritage Quiz",    desc: "Test your knowledge",               page: "quiz" },
        ].map(item => (
          <div key={item.title} onClick={() => setActive(item.page)} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 12, padding: "24px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 16, transition: "box-shadow 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,107,53,0.15)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ fontSize: 36 }}>{item.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: "#888", fontSize: 13 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
