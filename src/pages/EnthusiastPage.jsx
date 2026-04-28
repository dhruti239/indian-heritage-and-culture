import { useActivity } from "../useActivity";

const EnthusiastPage = ({ user }) => {
  const data = useActivity(user.id);
  const totalVisits = Object.values(data.pageVisits).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>My Dashboard</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Welcome, {user.name} — your heritage exploration journey</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Pages Visited",      value: totalVisits,                   icon: "👁️", color: "#FF6B35" },
          { label: "Tours Registered",   value: data.toursRegistered.length,   icon: "🌐", color: "#3B82F6" },
          { label: "Monuments Explored", value: data.monumentsVisited.length,  icon: "🏛️", color: "#10B981" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "24px", border: "1px solid #f0f0f0", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ color: "#888", fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Monuments Visited */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>🏛️ Monuments Explored</h3>
          </div>
          {data.monumentsVisited.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#aaa", fontSize: 13 }}>No monuments explored yet. Visit the Monuments page!</div>
          ) : data.monumentsVisited.map((m, i) => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < data.monumentsVisited.length - 1 ? "1px solid #f5f5f5" : "none" }}>
              <span style={{ fontSize: 20 }}>🏛️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{m.name}</div>
                <div style={{ fontSize: 11, color: "#888" }}>📍 {m.city}</div>
              </div>
              <div style={{ fontSize: 11, color: "#bbb" }}>{new Date(m.visitedAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>

        {/* Tours Registered */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>🌐 Tours Registered</h3>
          </div>
          {data.toursRegistered.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#aaa", fontSize: 13 }}>No tours registered yet. Start a Virtual Tour!</div>
          ) : data.toursRegistered.map((t, i) => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < data.toursRegistered.length - 1 ? "1px solid #f5f5f5" : "none" }}>
              <span style={{ fontSize: 20 }}>🌐</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "#888" }}>📍 {t.city}</div>
              </div>
              <div style={{ fontSize: 11, color: "#bbb" }}>{new Date(t.registeredAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>

        {/* Page Visit Breakdown */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", padding: 20, gridColumn: "1 / -1" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>📊 Page Visit Breakdown</h3>
          {Object.keys(data.pageVisits).length === 0 ? (
            <div style={{ textAlign: "center", color: "#aaa", fontSize: 13 }}>No page visits tracked yet.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
              {Object.entries(data.pageVisits).map(([page, count]) => (
                <div key={page} style={{ background: "#f9f9f9", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#FF6B35" }}>{count}</div>
                  <div style={{ fontSize: 12, color: "#888", textTransform: "capitalize", marginTop: 4 }}>{page}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnthusiastPage;
