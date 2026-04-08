import { useState } from "react";
import { FESTIVALS } from "../data";

const FestivalsPage = () => {
  const [hovered, setHovered] = useState(null);
  const festIcons = { "Diwali": "🪔", "Holi": "🎨", "Durga Puja": "🙏", "Navratri": "💃", "Eid ul-Fitr": "🌙", "Pongal": "🌾" };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Indian Festivals</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Celebrate the rich tapestry of India's seasonal and religious festivals</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 32, border: "1px solid #f0f0f0" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#1a1a2e" }}>Festival Calendar</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FESTIVALS.map(f => (
            <div key={f.name} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ minWidth: 80, color: "#888", fontSize: 13, paddingTop: 4 }}>{f.month}</div>
              <div style={{ width: 3, background: f.color, borderRadius: 2, minHeight: 52, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 2 }}>{f.name}</div>
                <div style={{ color: "#555", fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {FESTIVALS.map(f => (
          <div key={f.name} onMouseEnter={() => setHovered(f.name)} onMouseLeave={() => setHovered(null)} style={{ background: "#fff", borderRadius: 14, padding: 24, border: `2px solid ${hovered === f.name ? f.color : "#f0f0f0"}`, boxShadow: hovered === f.name ? `0 8px 24px ${f.color}30` : "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.25s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${f.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{festIcons[f.name]}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1a2e" }}>{f.name}</div>
                <div style={{ color: f.color, fontSize: 12, fontWeight: 600 }}>{f.month}</div>
              </div>
            </div>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FestivalsPage;
