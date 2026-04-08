import { useState } from "react";
import { MONUMENTS } from "../data";
import ImgWithFallback from "../components/ImgWithFallback";

const TourGuidePage = ({ user }) => {
  const [tab, setTab] = useState("my-tours");
  const myTours = MONUMENTS.slice(0, 4).map((m, i) => ({
    ...m, bookings: [8, 12, 5, 15][i], rating: [4.8, 4.6, 4.9, 4.7][i], status: i === 3 ? "upcoming" : "active"
  }));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Tour Guide Dashboard</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Welcome, {user.name} — manage your tours and interact with visitors</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Active Tours",    value: "3",   icon: "🌐", color: "#FF6B35" },
          { label: "Total Bookings",  value: "40",  icon: "📅", color: "#10B981" },
          { label: "Avg Rating",      value: "4.8", icon: "⭐", color: "#F59E0B" },
          { label: "Visitors Guided", value: "128", icon: "👥", color: "#8B5CF6" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #f0f0f0", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ color: "#666", fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "#f5f5f5", borderRadius: 10, padding: 4, marginBottom: 24, width: "fit-content" }}>
        {["my-tours", "schedule", "visitors"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: tab === t ? "#fff" : "transparent", color: tab === t ? "#FF6B35" : "#888", fontWeight: tab === t ? 700 : 400, fontSize: 13, cursor: "pointer", boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none", textTransform: "capitalize" }}>{t.replace("-", " ")}</button>
        ))}
      </div>

      {tab === "my-tours" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {myTours.map(m => (
            <div key={m.id} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ position: "relative", height: 160 }}>
                <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: 12, right: 12, background: m.status === "active" ? "#4CAF50" : "#F59E0B", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 700 }}>{m.status}</span>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 4 }}>{m.name}</div>
                <div style={{ color: "#888", fontSize: 12, marginBottom: 12 }}>📍 {m.city}, {m.state}</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#FF6B35" }}>{m.bookings}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>Bookings</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#F59E0B" }}>⭐ {m.rating}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>Rating</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#10B981" }}>{m.tourPoints.length}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>Stops</div>
                  </div>
                </div>
                <button style={{ width: "100%", background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Manage Tour →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "schedule" && (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Upcoming Schedule</h3>
          </div>
          {[
            { time: "10:00 AM", date: "Today",    tour: "Taj Mahal",       visitors: 8,  type: "Group" },
            { time: "2:00 PM",  date: "Today",    tour: "Qutub Minar",     visitors: 5,  type: "Private" },
            { time: "9:00 AM",  date: "Tomorrow", tour: "Hampi Ruins",     visitors: 12, type: "Group" },
            { time: "3:00 PM",  date: "Tomorrow", tour: "Ajanta Caves",    visitors: 6,  type: "Group" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderBottom: "1px solid #f5f5f5" }}>
              <div style={{ textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{s.time}</div>
                <div style={{ fontSize: 11, color: "#888" }}>{s.date}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{s.tour}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{s.visitors} visitors · {s.type}</div>
              </div>
              <span style={{ background: s.type === "Private" ? "#F0F7FF" : "#FFF5F0", color: s.type === "Private" ? "#3B82F6" : "#FF6B35", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600 }}>{s.type}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "visitors" && (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Recent Visitor Reviews</h3>
          </div>
          {[
            { name: "Amit K.",   tour: "Taj Mahal",    rating: 5, comment: "Incredible guide! Very knowledgeable about Mughal history." },
            { name: "Sara M.",   tour: "Hampi Ruins",  rating: 5, comment: "Best tour experience. Loved the detailed explanations." },
            { name: "Raj P.",    tour: "Qutub Minar",  rating: 4, comment: "Great tour, very informative and well-paced." },
            { name: "Meena S.",  tour: "Ajanta Caves", rating: 5, comment: "Absolutely amazing! The guide brought history to life." },
          ].map((v, i) => (
            <div key={i} style={{ padding: "16px 20px", borderBottom: "1px solid #f5f5f5" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{v.name}</div>
                <div style={{ color: "#F59E0B", fontSize: 14 }}>{"★".repeat(v.rating)}{"☆".repeat(5 - v.rating)}</div>
              </div>
              <div style={{ fontSize: 12, color: "#FF6B35", marginBottom: 4 }}>{v.tour}</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{v.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourGuidePage;
