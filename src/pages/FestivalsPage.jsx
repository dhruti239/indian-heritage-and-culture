import { useState } from "react";
import { FESTIVALS } from "../data";

const festIcons = { "Diwali": "🪔", "Holi": "🎨", "Durga Puja": "🙏", "Navratri": "💃", "Eid ul-Fitr": "🌙", "Pongal": "🌾" };

const gradients = {
  "#F59E0B": "linear-gradient(135deg,#F59E0B,#FCD34D)",
  "#EC4899": "linear-gradient(135deg,#EC4899,#F472B6)",
  "#8B5CF6": "linear-gradient(135deg,#8B5CF6,#A78BFA)",
  "#EF4444": "linear-gradient(135deg,#EF4444,#F87171)",
  "#10B981": "linear-gradient(135deg,#10B981,#34D399)",
  "#F97316": "linear-gradient(135deg,#F97316,#FB923C)",
};

const FestivalsPage = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1a0a2e,#2d1a4a)", borderRadius: 20, padding: "40px 40px", marginBottom: 32, position: "relative", overflow: "hidden", boxShadow: "0 16px 48px rgba(139,92,246,0.2)" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.2),transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -30, left: 100, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle,rgba(236,72,153,0.15),transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: -0.5 }}>Indian Festivals</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, margin: 0 }}>Celebrate the rich tapestry of India's seasonal and religious festivals</p>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: "#fff", borderRadius: 20, padding: 28, marginBottom: 32, border: "1px solid #f0f0f0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, color: "#1a1a2e", display: "flex", alignItems: "center", gap: 8 }}>📅 Festival Calendar</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {FESTIVALS.map((f, i) => (
            <div key={f.name} style={{ display: "flex", alignItems: "flex-start", gap: 20, paddingBottom: i < FESTIVALS.length - 1 ? 20 : 0, marginBottom: i < FESTIVALS.length - 1 ? 0 : 0 }}>
              <div style={{ minWidth: 90, textAlign: "right" }}>
                <span style={{ background: `${f.color}20`, color: f.color, fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>{f.month}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: gradients[f.color], boxShadow: `0 0 10px ${f.color}80`, flexShrink: 0, marginTop: 4 }} />
                {i < FESTIVALS.length - 1 && <div style={{ width: 2, height: 36, background: `linear-gradient(${f.color},${FESTIVALS[i+1].color})`, opacity: 0.3 }} />}
              </div>
              <div style={{ paddingBottom: i < FESTIVALS.length - 1 ? 20 : 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 3 }}>{f.name}</div>
                <div style={{ color: "#666", fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
        {FESTIVALS.map(f => (
          <div key={f.name} onMouseEnter={() => setHovered(f.name)} onMouseLeave={() => setHovered(null)}
            style={{ borderRadius: 20, overflow: "hidden", boxShadow: hovered === f.name ? `0 20px 48px ${f.color}40` : "0 4px 16px rgba(0,0,0,0.07)", transition: "all 0.3s", transform: hovered === f.name ? "translateY(-6px)" : "translateY(0)" }}>
            {/* Card top gradient */}
            <div style={{ background: gradients[f.color], padding: "28px 24px 20px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
              <div style={{ fontSize: 44, marginBottom: 8 }}>{festIcons[f.name]}</div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>{f.name}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 2 }}>{f.month}</div>
            </div>
            {/* Card body */}
            <div style={{ background: "#fff", padding: "20px 24px", border: "1px solid #f0f0f0", borderTop: "none" }}>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FestivalsPage;
