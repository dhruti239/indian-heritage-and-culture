import { useState } from "react";
import { ART_FORMS } from "../data";

const CulturePage = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const types = ["All", "Dance", "Painting", "Tribal Art", "Music"];
  const filtered = ART_FORMS.filter(a => filter === "All" || a.type === filter);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Culture & Classical Arts</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Discover India's diverse art forms, music traditions, and cultural expressions</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ padding: "8px 18px", borderRadius: 20, border: "1px solid", borderColor: filter === t ? "#FF6B35" : "#e5e7eb", background: filter === t ? "#FF6B35" : "#fff", color: filter === t ? "#fff" : "#555", fontSize: 13, cursor: "pointer", fontWeight: filter === t ? 600 : 400 }}>{t}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
        {filtered.map(art => (
          <div key={art.name} onClick={() => setSelected(art)} style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #f0f0f0", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,107,53,0.15)"; e.currentTarget.style.borderColor = "#FF6B35"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = "#f0f0f0"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ fontSize: 36 }}>{art.type === "Dance" ? "💃" : art.type === "Painting" ? "🎨" : art.type === "Tribal Art" ? "🖼️" : "🎵"}</div>
              <span style={{ background: "#FFF5F0", color: "#FF6B35", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600 }}>{art.type}</span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 4px" }}>{art.name}</h3>
            <div style={{ color: "#888", fontSize: 12, marginBottom: 10 }}>📍 {art.state}</div>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{art.desc}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: 16 }}>Cultural Regions of India</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {[
          { region: "North India", color: "#FF6B35", desc: "Mughal architecture, Kathak dance, Hindustani music, colorful festivals like Holi and Diwali.", items: ["Delhi", "Agra", "Varanasi", "Jaipur"] },
          { region: "South India", color: "#10B981", desc: "Dravidian temples, Bharatanatyam, Carnatic music, and rich traditions of Pongal and Onam.", items: ["Chennai", "Mysuru", "Hampi", "Madurai"] },
          { region: "East India",  color: "#8B5CF6", desc: "Durga Puja grandeur, Odissi dance, Rabindra Sangeet, and the terracotta temples of Bengal.", items: ["Kolkata", "Puri", "Konark", "Bhubaneswar"] },
          { region: "West India",  color: "#F59E0B", desc: "Garba and Dandiya-Raas, Warli art, Ajanta caves, and the marine heritage of Mumbai.", items: ["Mumbai", "Ahmedabad", "Udaipur", "Aurangabad"] },
        ].map(r => (
          <div key={r.region} style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #f0f0f0", borderLeft: `4px solid ${r.color}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>{r.region}</h3>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, margin: "0 0 12px" }}>{r.desc}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {r.items.map(i => <span key={i} style={{ background: `${r.color}15`, color: r.color, fontSize: 12, padding: "3px 10px", borderRadius: 10, fontWeight: 500 }}>{i}</span>)}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setSelected(null)}>
          <div style={{ background: "#fff", borderRadius: 20, maxWidth: 500, width: "100%", padding: 32 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 48 }}>{selected.type === "Dance" ? "💃" : selected.type === "Painting" ? "🎨" : selected.type === "Tribal Art" ? "🖼️" : "🎵"}</div>
              <button onClick={() => setSelected(null)} style={{ background: "#f5f5f5", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>{selected.name}</h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <span style={{ background: "#FFF5F0", color: "#FF6B35", padding: "3px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600 }}>{selected.type}</span>
              <span style={{ background: "#f5f5f5", color: "#555", padding: "3px 12px", borderRadius: 10, fontSize: 13 }}>📍 {selected.state}</span>
            </div>
            <p style={{ color: "#444", fontSize: 15, lineHeight: 1.8 }}>{selected.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturePage;
