import { useState } from "react";
import { MONUMENTS } from "../data";
import ImgWithFallback from "../components/ImgWithFallback";

const MonumentsPage = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]     = useState("All");
  const [search, setSearch]     = useState("");
  const [favorites, setFavorites] = useState([]);

  const categories = ["All", ...new Set(MONUMENTS.map(m => m.category))];
  const filtered = MONUMENTS.filter(m =>
    (filter === "All" || m.category === filter) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.state.toLowerCase().includes(search.toLowerCase()))
  );
  const toggleFav = id => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Famous Monuments</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Explore India's most iconic historical sites</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search monuments..." style={{ width: "100%", padding: "10px 16px 10px 40px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fff" }} />
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 16px", borderRadius: 20, border: "1px solid", borderColor: filter === c ? "#FF6B35" : "#e5e7eb", background: filter === c ? "#FF6B35" : "#fff", color: filter === c ? "#fff" : "#555", fontSize: 13, cursor: "pointer", fontWeight: filter === c ? 600 : 400 }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {filtered.map(m => (
          <div key={m.id} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ position: "relative", height: 200 }}>
              <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button onClick={() => toggleFav(m.id)} style={{ position: "absolute", top: 12, right: 12, background: favorites.includes(m.id) ? "#FF6B35" : "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 14 }}>
                {favorites.includes(m.id) ? "★" : "☆"}
              </button>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "16px 16px 12px" }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{m.name}</div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>📍 {m.city}, {m.state}</div>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ background: "#FFF5F0", color: "#FF6B35", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600 }}>{m.era}</span>
                <span style={{ background: "#F0F7FF", color: "#3B82F6", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600 }}>{m.category}</span>
              </div>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.5, margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{m.description}</p>
              <button onClick={() => setSelected(m)} style={{ width: "100%", background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View Details & Tour →</button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setSelected(null)}>
          <div style={{ background: "#fff", borderRadius: 20, maxWidth: 800, width: "100%", maxHeight: "90vh", overflow: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ position: "relative", height: 300 }}>
              <ImgWithFallback src={selected.image} alt={selected.name} category={selected.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "#fff", fontSize: 18 }}>✕</button>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", padding: "32px 24px 20px" }}>
                <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: 0 }}>{selected.name}</h2>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4 }}>📍 {selected.city}, {selected.state} · {selected.year}</div>
              </div>
            </div>
            <div style={{ padding: 28 }}>
              <p style={{ color: "#444", fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>{selected.description}</p>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#1a1a2e" }}>Key Facts</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 24 }}>
                {selected.facts.map(f => (
                  <div key={f} style={{ display: "flex", gap: 10, background: "#f9f9f9", padding: "10px 14px", borderRadius: 10 }}>
                    <span style={{ color: "#FF6B35", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#444" }}>{f}</span>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#1a1a2e" }}>Virtual Tour Stops</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {selected.tourPoints.map((p, i) => (
                  <span key={p} style={{ background: "#1a1a2e", color: "#fff", padding: "6px 14px", borderRadius: 20, fontSize: 13 }}>{i + 1}. {p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonumentsPage;
