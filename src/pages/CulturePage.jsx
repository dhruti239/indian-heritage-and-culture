import { useState } from "react";
import { ART_FORMS } from "../data";

const typeConfig = {
  "Dance":     { icon: "💃", color: "#EC4899", bg: "linear-gradient(135deg,#EC4899,#F472B6)" },
  "Painting":  { icon: "🎨", color: "#F59E0B", bg: "linear-gradient(135deg,#F59E0B,#FCD34D)" },
  "Tribal Art":{ icon: "🖼️", color: "#10B981", bg: "linear-gradient(135deg,#10B981,#34D399)" },
  "Music":     { icon: "🎵", color: "#8B5CF6", bg: "linear-gradient(135deg,#8B5CF6,#A78BFA)" },
};

const regions = [
  { region: "North India", color: "#FF6B35", bg: "linear-gradient(135deg,#FF6B35,#F7931E)", desc: "Mughal architecture, Kathak dance, Hindustani music, colorful festivals like Holi and Diwali.", items: ["Delhi","Agra","Varanasi","Jaipur"] },
  { region: "South India", color: "#10B981", bg: "linear-gradient(135deg,#10B981,#34D399)", desc: "Dravidian temples, Bharatanatyam, Carnatic music, and rich traditions of Pongal and Onam.", items: ["Chennai","Mysuru","Hampi","Madurai"] },
  { region: "East India",  color: "#8B5CF6", bg: "linear-gradient(135deg,#8B5CF6,#A78BFA)", desc: "Durga Puja grandeur, Odissi dance, Rabindra Sangeet, and the terracotta temples of Bengal.", items: ["Kolkata","Puri","Konark","Bhubaneswar"] },
  { region: "West India",  color: "#F59E0B", bg: "linear-gradient(135deg,#F59E0B,#FCD34D)", desc: "Garba and Dandiya-Raas, Warli art, Ajanta caves, and the marine heritage of Mumbai.", items: ["Mumbai","Ahmedabad","Udaipur","Aurangabad"] },
];

const CulturePage = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const types = ["All", "Dance", "Painting", "Tribal Art", "Music"];
  const filtered = ART_FORMS.filter(a => filter === "All" || a.type === filter);

  return (
    <div>
      {/* Header banner */}
      <div style={{ background: "linear-gradient(135deg,#0f1a2e,#1a0a2e,#0a1a1a)", borderRadius: 20, padding: "40px 40px", marginBottom: 32, position: "relative", overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }}>
        <div style={{ position: "absolute", top: -50, right: 50, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(236,72,153,0.2),transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -30, left: 80, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.15),transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎭</div>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>Culture & Classical Arts</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, margin: 0 }}>Discover India's diverse art forms, music traditions, and cultural expressions</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        {types.map(t => {
          const cfg = typeConfig[t];
          return (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: "9px 22px", borderRadius: 24, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
              background: filter === t ? (cfg ? cfg.bg : "linear-gradient(135deg,#FF6B35,#F7931E)") : "#fff",
              color: filter === t ? "#fff" : "#666",
              boxShadow: filter === t ? `0 6px 16px ${cfg ? cfg.color + "50" : "rgba(255,107,53,0.3)"}` : "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              {cfg ? cfg.icon + " " : ""}{t}
            </button>
          );
        })}
      </div>

      {/* Art form cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20, marginBottom: 40 }}>
        {filtered.map(art => {
          const cfg = typeConfig[art.type] || typeConfig["Music"];
          return (
            <div key={art.name} onClick={() => setSelected(art)}
              style={{ background: "#fff", borderRadius: 18, overflow: "hidden", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.07)", transition: "all 0.25s", border: "1px solid #f0f0f0" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${cfg.color}30`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"; }}>
              <div style={{ background: cfg.bg, padding: "24px 20px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -15, right: -15, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ fontSize: 40, marginBottom: 8 }}>{cfg.icon}</div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>{art.name}</div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 2 }}>📍 {art.state}</div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <span style={{ background: `${cfg.color}15`, color: cfg.color, fontSize: 11, padding: "3px 10px", borderRadius: 8, fontWeight: 700 }}>{art.type}</span>
                <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: "12px 0 0", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{art.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regions */}
      <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>🗺️ Cultural Regions of India</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {regions.map(r => (
          <div key={r.region} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #f0f0f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ background: r.bg, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{r.region}</div>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: "0 0 14px" }}>{r.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {r.items.map(i => <span key={i} style={{ background: `${r.color}15`, color: r.color, fontSize: 12, padding: "4px 12px", borderRadius: 10, fontWeight: 600 }}>{i}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (() => {
        const cfg = typeConfig[selected.type] || typeConfig["Music"];
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setSelected(null)}>
            <div style={{ background: "#fff", borderRadius: 24, maxWidth: 500, width: "100%", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }} onClick={e => e.stopPropagation()}>
              <div style={{ background: cfg.bg, padding: "32px 28px 28px", position: "relative" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 16, color: "#fff" }}>✕</button>
                <div style={{ fontSize: 52, marginBottom: 12 }}>{cfg.icon}</div>
                <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: "0 0 4px" }}>{selected.name}</h2>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>📍 {selected.state}</div>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <span style={{ background: `${cfg.color}15`, color: cfg.color, padding: "4px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>{selected.type}</span>
                <p style={{ color: "#444", fontSize: 15, lineHeight: 1.8, marginTop: 16 }}>{selected.desc}</p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default CulturePage;
