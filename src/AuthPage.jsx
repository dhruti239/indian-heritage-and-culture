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

const validate = {
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",
  password: v => v.length >= 6 ? "" : "Password must be at least 6 characters",
  name:     v => v.trim().length >= 2 ? "" : "Name must be at least 2 characters",
  confirm:  (v, pw) => v === pw ? "" : "Passwords do not match",
};

const Field = ({ label, icon, type, value, onChange, error, placeholder, onKeyDown, color }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 6 }}>{label}</label>
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>{icon}</span>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        onKeyDown={onKeyDown}
        style={{
          width: "100%", padding: "11px 14px 11px 40px",
          border: `1px solid ${error ? "#EF4444" : "#e5e7eb"}`,
          borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box",
          background: error ? "#FFF5F5" : "#fafafa", transition: "border 0.2s",
        }}
        onFocus={e => e.target.style.border = `1px solid ${error ? "#EF4444" : (color || "#FF6B35")}`}
        onBlur={e => e.target.style.border = `1px solid ${error ? "#EF4444" : "#e5e7eb"}`}
      />
    </div>
    {error && <div style={{ color: "#EF4444", fontSize: 11, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>⚠ {error}</div>}
  </div>
);

export default function AuthPage({ onLogin, onGuest }) {
  const [mode, setMode]               = useState("login");
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm]               = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors]           = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading]         = useState(false);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
    setServerError("");
  };

  const validateLogin = () => {
    const e = {};
    e.email    = validate.email(form.email);
    e.password = validate.password(form.password);
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const validateSignup = () => {
    const e = {};
    e.name     = validate.name(form.name);
    e.email    = validate.email(form.email);
    e.password = validate.password(form.password);
    e.confirm  = validate.confirm(form.confirm, form.password);
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    setLoading(true);
    try {
      const user = await api.post("/auth/login", { email: form.email, password: form.password });
      onLogin(user);
    } catch (e) {
      setServerError(e.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!selectedRole) { setServerError("Please select a role first."); return; }
    if (!validateSignup()) return;
    setLoading(true);
    try {
      const user = await api.post("/auth/signup", { name: form.name, email: form.email, password: form.password, role: selectedRole });
      onLogin(user);
    } catch (e) {
      setServerError(e.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const color = selectedRole ? roleColors[selectedRole] : "#FF6B35";

  const switchMode = (m) => { setMode(m); setErrors({}); setServerError(""); setForm({ name: "", email: "", password: "", confirm: "" }); };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0F1923 0%, #1a2a3a 60%, #0F1923 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(45deg, #FF6B35 0, #FF6B35 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #FF6B35, #F7931E)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 12 }}>🕌</div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>Bharat Heritage Explorer</div>
          <div style={{ color: "#FF6B35", fontSize: 12, letterSpacing: 2, marginTop: 4 }}>EXPLORE INCREDIBLE INDIA 🇮🇳</div>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 36, boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>

          {/* ROLE SELECT */}
          {mode === "role-select" && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, textAlign: "center" }}>Choose Your Role</h2>
              <p style={{ color: "#888", fontSize: 13, textAlign: "center", marginBottom: 24 }}>Select the role that best describes you</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {ROLES.map(r => (
                  <button key={r} onClick={() => { setSelectedRole(r); setServerError(""); }} style={{
                    padding: "16px 12px", borderRadius: 12,
                    border: `2px solid ${selectedRole === r ? roleColors[r] : "#e5e7eb"}`,
                    background: selectedRole === r ? `${roleColors[r]}12` : "#fafafa",
                    cursor: "pointer", textAlign: "center", transition: "all 0.2s"
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{roleIcons[r]}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: selectedRole === r ? roleColors[r] : "#555" }}>{r}</div>
                  </button>
                ))}
              </div>
              {serverError && <div style={{ color: "#EF4444", fontSize: 13, textAlign: "center", marginBottom: 12, background: "#FFF5F5", padding: "8px 12px", borderRadius: 8 }}>{serverError}</div>}
              <button onClick={() => { if (!selectedRole) { setServerError("Please select a role to continue."); return; } switchMode("signup"); }}
                style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: selectedRole ? `linear-gradient(135deg, ${color}, ${color}cc)` : "#e5e7eb", color: selectedRole ? "#fff" : "#aaa", fontWeight: 700, fontSize: 15, cursor: selectedRole ? "pointer" : "not-allowed" }}>
                Continue →
              </button>
              <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#888" }}>
                Already have an account?{" "}
                <span onClick={() => switchMode("login")} style={{ color: "#FF6B35", fontWeight: 700, cursor: "pointer" }}>Sign In</span>
              </p>
            </>
          )}

          {/* SIGNUP */}
          {mode === "signup" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <button onClick={() => switchMode("role-select")} style={{ background: "#f5f5f5", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Back</button>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Create Account</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <span style={{ fontSize: 14 }}>{roleIcons[selectedRole]}</span>
                    <span style={{ fontSize: 12, color: roleColors[selectedRole], fontWeight: 700 }}>{selectedRole}</span>
                  </div>
                </div>
              </div>

              <Field label="Full Name"         icon="👤" type="text"     value={form.name}     onChange={e => set("name", e.target.value)}     error={errors.name}     placeholder="Your full name"    color={color} />
              <Field label="Email"             icon="✉️" type="email"    value={form.email}    onChange={e => set("email", e.target.value)}    error={errors.email}    placeholder="you@example.com"   color={color} />
              <Field label="Password"          icon="🔒" type="password" value={form.password} onChange={e => set("password", e.target.value)} error={errors.password} placeholder="Min 6 characters"  color={color} />
              <Field label="Confirm Password"  icon="🔒" type="password" value={form.confirm}  onChange={e => set("confirm", e.target.value)}  error={errors.confirm}  placeholder="Repeat password"   color={color} />

              {serverError && <div style={{ color: "#EF4444", fontSize: 13, marginBottom: 12, background: "#FFF5F5", padding: "8px 12px", borderRadius: 8 }}>{serverError}</div>}

              <button onClick={handleSignup} disabled={loading}
                style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: loading ? "#e5e7eb" : `linear-gradient(135deg, ${color}, ${color}cc)`, color: loading ? "#aaa" : "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <><span style={{ width: 16, height: 16, border: "2px solid #aaa", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} /> Creating...</> : "Create Account →"}
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

              <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#888" }}>
                Already have an account?{" "}
                <span onClick={() => switchMode("login")} style={{ color: "#FF6B35", fontWeight: 700, cursor: "pointer" }}>Sign In</span>
              </p>
            </>
          )}

          {/* LOGIN */}
          {mode === "login" && (
            <>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, textAlign: "center" }}>Welcome Back</h2>
              <p style={{ color: "#888", fontSize: 13, textAlign: "center", marginBottom: 24 }}>Sign in to your heritage account</p>

              <Field label="Email"    icon="✉️" type="email"    value={form.email}    onChange={e => set("email", e.target.value)}    error={errors.email}    placeholder="you@example.com" onKeyDown={e => e.key === "Enter" && handleLogin()} />
              <Field label="Password" icon="🔒" type="password" value={form.password} onChange={e => set("password", e.target.value)} error={errors.password} placeholder="Your password"    onKeyDown={e => e.key === "Enter" && handleLogin()} />

              {serverError && <div style={{ color: "#EF4444", fontSize: 13, marginBottom: 12, background: "#FFF5F5", padding: "8px 12px", borderRadius: 8, display: "flex", alignItems: "center", gap: 6 }}>⚠ {serverError}</div>}

              <button onClick={handleLogin} disabled={loading}
                style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: loading ? "#e5e7eb" : "linear-gradient(135deg, #FF6B35, #F7931E)", color: loading ? "#aaa" : "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <><span style={{ width: 16, height: 16, border: "2px solid #aaa", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} /> Signing in...</> : "Sign In →"}
              </button>

              {onGuest && (
                <button onClick={onGuest} style={{ width: "100%", padding: "11px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fafafa", color: "#888", fontWeight: 600, fontSize: 14, cursor: "pointer", marginTop: 10 }}>
                  Continue as Guest 👀
                </button>
              )}

              <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#888" }}>
                New here?{" "}
                <span onClick={() => switchMode("role-select")} style={{ color: "#FF6B35", fontWeight: 700, cursor: "pointer" }}>Create Account</span>
              </p>


            </>
          )}
        </div>
      </div>
    </div>
  );
}
