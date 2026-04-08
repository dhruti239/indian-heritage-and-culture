import { useState } from "react";

const API_BASE = "http://localhost:8080/api";
const api = {
  post: async (endpoint, body) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      return res.ok ? res.json() : null;
    } catch { return null; }
  }
};

const empty = { name: "", city: "", state: "", era: "", year: "", category: "", description: "" };

const ContentCreatorPage = ({ user }) => {
  const [form, setForm]           = useState(empty);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.city) return;
    await api.post("/monuments", form);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm(empty); }, 3000);
  };

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Create Content</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Welcome, {user.name} — add new monuments and manage virtual tour stops</p>
      </div>

      {submitted ? (
        <div style={{ background: "#E8F5E9", border: "1px solid #4CAF50", borderRadius: 14, padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#2E7D32", marginBottom: 8 }}>Content Submitted!</div>
          <div style={{ color: "#555", fontSize: 14 }}>Your monument has been submitted for review via POST /api/monuments</div>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#1a1a2e" }}>Add New Monument</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[
              { key: "name",     label: "Monument Name", placeholder: "e.g. Konark Sun Temple" },
              { key: "city",     label: "City",          placeholder: "e.g. Konark" },
              { key: "state",    label: "State",         placeholder: "e.g. Odisha" },
              { key: "era",      label: "Era / Dynasty", placeholder: "e.g. Eastern Ganga dynasty" },
              { key: "year",     label: "Year Built",    placeholder: "e.g. 1250 CE" },
              { key: "category", label: "Category",      placeholder: "e.g. Temple" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 600 }}>Description</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={4} placeholder="Write a detailed description..."
              style={{ width: "100%", padding: "12px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={handleSubmit} style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Submit Monument →</button>
            <button onClick={() => setForm(empty)} style={{ background: "#f5f5f5", color: "#555", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, cursor: "pointer" }}>Clear</button>
          </div>
        </div>
      )}

      <div style={{ background: "#1a1a2e", borderRadius: 14, padding: 24, marginTop: 24 }}>
        <h3 style={{ color: "#FF6B35", fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Spring Boot API Integration</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Monuments API", endpoint: "GET/POST /api/monuments" },
            { label: "Tours API",     endpoint: "GET/POST /api/tours" },
            { label: "Auth Service",  endpoint: "POST /api/auth/login" },
            { label: "Content Review",endpoint: "PUT /api/content/{id}/review" },
          ].map(e => (
            <div key={e.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 14 }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 4 }}>{e.label}</div>
              <code style={{ color: "#FF6B35", fontSize: 12 }}>{e.endpoint}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCreatorPage;
