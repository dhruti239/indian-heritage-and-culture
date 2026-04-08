import { useState } from "react";
import { ROLES } from "./data";
import { api } from "./api";

const roleColors = {
  "Cultural Enthusiast": "#FF6B35",
  "Content Creator":     "#8B5CF6",
  "Tour Guide":          "#10B981",
  "Admin":               "#3B82F6",
};

const roleIcons = {
  "Cultural Enthusiast": "🏛️",
  "Content Creator":     "✍️",
  "Tour Guide":          "🎓",
  "Admin":               "⚙️",
};

const inp = {
  width: "100%", padding: "11px 14px 11px 40px", border: "1px solid #e5e7eb",
  borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box",
  background: "#fafafa", transition: "border 0.2s",
};

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" | "signup" | "role-select"
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");


  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(""); };

  const handleLogin = async () => {
    try {
      const user = await api.post("/auth/login", { email: form.email, password: form.password });
      onLogin(user);
    } catch (e) { setError(e.message); }
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password || !form.confirm) { setError("All fields are required."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    try {
      const user = await api.post("/auth/register", { name: form.name, email: form.email, password: form.password, role: selectedRole });
      onLogin(user);
    } catch (e) { setError(e.message); }
  };

  const color = selectedRole ? roleColors[selectedRole] : "#FF6B35";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0F1923 0%, #1a2a3a 60%, #0F1923 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Background pattern */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(45deg, #FF6B35 0, #FF6B35 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, #FF6B35, #F7931E)`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 12 }}>🕌</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>Bharat Heritage Explorer</div>
          <div style={{ color: "#FF6B35", fontSize: 12, letterSpacing: 2, marginTop: 4 }}>EXPLORE INCREDIBLE INDIA 🇮🇳</div>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 36, boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>

          {/* ── ROLE SELECT (signup step 1) ── */}
          {mode === "role-select" && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, textAlign: "center" }}>Choose Your Role</h2>
              <p style={{ color: "#888", fontSize: 13, textAlign: "center", marginBottom: 24 }}>Select the role that best describes you</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {ROLES.map(r => (
                  <button key={r} onClick={() => setSelectedRole(r)} style={{
                    padding: "16px 12px", borderRadius: 12, border: `2px solid ${selectedRole === r ? roleColors[r] : "#e5e7eb"}`,
                    background: selectedRole === r ? `${roleColors[r]}12` : "#fafafa",
                    cursor: "pointer", textAlign: "center", transition: "all 0.2s"
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{roleIcons[r]}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: selectedRole === r ? roleColors[r] : "#555" }}>{r}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => { if (!selectedRole) { setError("Please select a role."); return; } setMode("signup"); setError(""); }}
                style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: selectedRole ? `linear-gradient(135deg, ${color}, ${color}cc)` : "#e5e7eb", color: selectedRole ? "#fff" : "#aaa", fontWeight: 700, fontSize: 15, cursor: selectedRole ? "pointer" : "not-allowed" }}>
                Continue →
              </button>
              {error && <div style={{ color: "#EF5350", fontSize: 13, textAlign: "center", marginTop: 12 }}>{error}</div>}
              <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#888" }}>
                Already have an account?{" "}
                <span onClick={() => { setMode("login"); setError(""); }} style={{ color: "#FF6B35", fontWeight: 700, cursor: "pointer" }}>Sign In</span>
              </p>
            </>
          )}

          {/* ── SIGNUP FORM (step 2) ── */}
          {mode === "signup" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <button onClick={() => { setMode("role-select"); setError(""); }} style={{ background: "#f5f5f5", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Back</button>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Create Account</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <span style={{ fontSize: 14 }}>{roleIcons[selectedRole]}</span>
                    <span style={{ fontSize: 12, color: roleColors[selectedRole], fontWeight: 700 }}>{selectedRole}</span>
                  </div>
                </div>
              </div>

              {[
                { key: "name", label: "Full Name", icon: "👤", type: "text", placeholder: "Your full name" },
                { key: "email", label: "Email", icon: "✉️", type: "email", placeholder: "you@example.com" },
                { key: "password", label: "Password", icon: "🔒", type: "password", placeholder: "Min 6 characters" },
                { key: "confirm", label: "Confirm Password", icon: "🔒", type: "password", placeholder: "Repeat password" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 6 }}>{f.label}</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>{f.icon}</span>
                    <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                      placeholder={f.placeholder} style={inp}
                      onFocus={e => e.target.style.border = `1px solid ${color}`}
                      onBlur={e => e.target.style.border = "1px solid #e5e7eb"} />
                  </div>
                </div>
              ))}

              {error && <div style={{ color: "#EF5350", fontSize: 13, marginBottom: 12, background: "#FFEBEE", padding: "8px 12px", borderRadius: 8 }}>{error}</div>}

              <button onClick={handleSignup} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${color}, ${color}cc)`, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4 }}>
                Create Account →
              </button>

              <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#888" }}>
                Already have an account?{" "}
                <span onClick={() => { setMode("login"); setError(""); }} style={{ color: "#FF6B35", fontWeight: 700, cursor: "pointer" }}>Sign In</span>
              </p>
            </>
          )}

          {/* ── LOGIN FORM ── */}
          {mode === "login" && (
            <>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, textAlign: "center" }}>Welcome Back</h2>
              <p style={{ color: "#888", fontSize: 13, textAlign: "center", marginBottom: 24 }}>Sign in to your heritage account</p>

              {[
                { key: "email", label: "Email", icon: "✉️", type: "email", placeholder: "you@example.com" },
                { key: "password", label: "Password", icon: "🔒", type: "password", placeholder: "Your password" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 6 }}>{f.label}</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>{f.icon}</span>
                    <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                      placeholder={f.placeholder} style={inp}
                      onKeyDown={e => e.key === "Enter" && handleLogin()}
                      onFocus={e => e.target.style.border = "1px solid #FF6B35"}
                      onBlur={e => e.target.style.border = "1px solid #e5e7eb"} />
                  </div>
                </div>
              ))}

              {error && <div style={{ color: "#EF5350", fontSize: 13, marginBottom: 12, background: "#FFEBEE", padding: "8px 12px", borderRadius: 8 }}>{error}</div>}

              <button onClick={handleLogin} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                Sign In →
              </button>

              <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#888" }}>
                New here?{" "}
                <span onClick={() => { setMode("role-select"); setError(""); setForm({ name: "", email: "", password: "", confirm: "" }); }} style={{ color: "#FF6B35", fontWeight: 700, cursor: "pointer" }}>Create Account</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
