import { useState, useEffect } from "react";
import { api } from "../api";
import { useActivity } from "../useActivity";
import { MONUMENTS } from "../data";
import ImgWithFallback from "../components/ImgWithFallback";
import Spinner from "../components/Spinner";

const empty = { name: "", city: "", state: "", era: "", year: "", category: "", description: "" };
const CATEGORIES = ["Temple", "Mausoleum", "Fort", "Palace", "Ancient City", "Minaret", "Rock-cut Caves", "Arch Monument", "Other"];

// Defined OUTSIDE the component so React never remounts it on re-render
const Field = ({ fkey, label, placeholder, form, errors, setForm, setErrors }) => (
  <div>
    <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 600 }}>
      {label} {["name","city","state","category","description"].includes(fkey) && <span style={{ color: "#EF4444" }}>*</span>}
    </label>
    <input
      value={form[fkey]}
      onChange={e => { setForm(p => ({ ...p, [fkey]: e.target.value })); setErrors(p => ({ ...p, [fkey]: "" })); }}
      placeholder={placeholder}
      style={{ width: "100%", padding: "10px 14px", border: `1px solid ${errors[fkey] ? "#EF4444" : "#e5e7eb"}`, borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", background: errors[fkey] ? "#FFF5F5" : "#fafafa" }}
    />
    {errors[fkey] && <div style={{ color: "#EF4444", fontSize: 11, marginTop: 4 }}>⚠ {errors[fkey]}</div>}
  </div>
);

export default function ContentCreatorPage({ user }) {
  const [tab, setTab]               = useState("dashboard");
  const [form, setForm]             = useState(empty);
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [serverError, setServerError] = useState("");
  const [monuments, setMonuments]   = useState([]);
  const [loadingMonuments, setLoadingMonuments] = useState(true);

  const activity = useActivity(user.id);
  const totalPageVisits = Object.values(activity.pageVisits).reduce((a, b) => a + b, 0);

  useEffect(() => {
    api.get("/monuments")
      .then(data => setMonuments(Array.isArray(data) ? data : MONUMENTS))
      .catch(() => setMonuments(MONUMENTS))
      .finally(() => setLoadingMonuments(false));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name        = "Monument name is required";
    if (!form.city.trim())        e.city        = "City is required";
    if (!form.state.trim())       e.state       = "State is required";
    if (!form.category.trim())    e.category    = "Category is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true); setServerError("");
    try {
      await api.post("/monuments", form);
      setSubmitted(true);
      setForm(empty);
      setErrors({});
      // Refresh monuments list
      const updated = await api.get("/monuments").catch(() => monuments);
      setMonuments(Array.isArray(updated) ? updated : monuments);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (e) {
      setServerError(e.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Content Creator Dashboard</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Welcome, {user.name} — create content and track your contributions</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "#f5f5f5", borderRadius: 10, padding: 4, marginBottom: 24, width: "fit-content", flexWrap: "wrap" }}>
        {["dashboard", "create", "monuments", "my-activity"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: tab === t ? "#fff" : "transparent", color: tab === t ? "#7C3AED" : "#888", fontWeight: tab === t ? 700 : 400, fontSize: 13, cursor: "pointer", boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none", textTransform: "capitalize" }}>
            {t.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* ── DASHBOARD ── */}
      {tab === "dashboard" && (
        <div>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
            {[
              { label: "Monuments Published", value: monuments.length,                    icon: "🏛️", color: "#7C3AED" },
              { label: "Tours Registered",    value: activity.toursRegistered.length,     icon: "🌐", color: "#3B82F6" },
              { label: "Monuments Explored",  value: activity.monumentsVisited.length,    icon: "🗺️", color: "#10B981" },
              { label: "Total Page Visits",   value: totalPageVisits,                     icon: "👁️", color: "#FF6B35" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "20px", border: "1px solid #f0f0f0", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ color: "#888", fontSize: 12, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick overview */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Recent monuments */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>🏛️ Recent Monuments</h3>
                <button onClick={() => setTab("monuments")} style={{ background: "none", border: "none", color: "#7C3AED", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>View All →</button>
              </div>
              {loadingMonuments ? <Spinner size={24} /> : monuments.slice(0, 4).map((m, i) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", borderBottom: i < 3 ? "1px solid #f5f5f5" : "none" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                    <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{m.city}, {m.state}</div>
                  </div>
                  <span style={{ background: "#F5F3FF", color: "#7C3AED", fontSize: 10, padding: "2px 8px", borderRadius: 8, fontWeight: 700, whiteSpace: "nowrap" }}>{m.category}</span>
                </div>
              ))}
            </div>

            {/* Page visits breakdown */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700 }}>📊 My Page Visits</h3>
              {Object.keys(activity.pageVisits).length === 0 ? (
                <div style={{ color: "#aaa", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No visits tracked yet</div>
              ) : Object.entries(activity.pageVisits).sort((a, b) => b[1] - a[1]).map(([page, count]) => {
                const max = Math.max(...Object.values(activity.pageVisits));
                return (
                  <div key={page} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#555", textTransform: "capitalize" }}>{page}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#7C3AED" }}>{count}x</span>
                    </div>
                    <div style={{ background: "#f0f0f0", borderRadius: 10, height: 6 }}>
                      <div style={{ height: "100%", background: "linear-gradient(90deg,#7C3AED,#8B5CF6)", borderRadius: 10, width: `${(count / max) * 100}%`, transition: "width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE ── */}
      {tab === "create" && (
        submitted ? (
          <div style={{ background: "#F0FDF4", border: "1px solid #4CAF50", borderRadius: 16, padding: 40, textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#166534", marginBottom: 8 }}>Monument Submitted!</div>
            <div style={{ color: "#555", fontSize: 14, marginBottom: 20 }}>Your monument has been added to the platform successfully.</div>
            <button onClick={() => { setSubmitted(false); setTab("monuments"); }}
              style={{ background: "linear-gradient(135deg,#7C3AED,#8B5CF6)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              View Monuments →
            </button>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: 32, maxWidth: 760 }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 6, color: "#1a1a2e" }}>Add New Monument</h3>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>Fields marked with <span style={{ color: "#EF4444" }}>*</span> are required</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Field fkey="name"  label="Monument Name" placeholder="e.g. Konark Sun Temple" form={form} errors={errors} setForm={setForm} setErrors={setErrors} />
              <Field fkey="city"  label="City"          placeholder="e.g. Konark"            form={form} errors={errors} setForm={setForm} setErrors={setErrors} />
              <Field fkey="state" label="State"         placeholder="e.g. Odisha"            form={form} errors={errors} setForm={setForm} setErrors={setErrors} />
              <Field fkey="era"   label="Era / Dynasty" placeholder="e.g. Eastern Ganga dynasty" form={form} errors={errors} setForm={setForm} setErrors={setErrors} />
              <Field fkey="year"  label="Year Built"    placeholder="e.g. 1250 CE"           form={form} errors={errors} setForm={setForm} setErrors={setErrors} />
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 600 }}>Category <span style={{ color: "#EF4444" }}>*</span></label>
                <select value={form.category} onChange={e => { setForm(p => ({ ...p, category: e.target.value })); setErrors(p => ({ ...p, category: "" })); }}
                  style={{ width: "100%", padding: "10px 14px", border: `1px solid ${errors.category ? "#EF4444" : "#e5e7eb"}`, borderRadius: 10, fontSize: 14, outline: "none", background: errors.category ? "#FFF5F5" : "#fafafa" }}>
                  <option value="">Select category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <div style={{ color: "#EF4444", fontSize: 11, marginTop: 4 }}>⚠ {errors.category}</div>}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 600 }}>Description <span style={{ color: "#EF4444" }}>*</span></label>
              <textarea value={form.description} onChange={e => { setForm(p => ({ ...p, description: e.target.value })); setErrors(p => ({ ...p, description: "" })); }}
                rows={4} placeholder="Write a detailed description of the monument..."
                style={{ width: "100%", padding: "12px 14px", border: `1px solid ${errors.description ? "#EF4444" : "#e5e7eb"}`, borderRadius: 10, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", background: errors.description ? "#FFF5F5" : "#fafafa" }} />
              {errors.description && <div style={{ color: "#EF4444", fontSize: 11, marginTop: 4 }}>⚠ {errors.description}</div>}
            </div>

            {serverError && <div style={{ color: "#EF4444", fontSize: 13, marginBottom: 16, background: "#FFF5F5", padding: "10px 14px", borderRadius: 8 }}>⚠ {serverError}</div>}

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={handleSubmit} disabled={submitting}
                style={{ background: submitting ? "#e5e7eb" : "linear-gradient(135deg,#7C3AED,#8B5CF6)", color: submitting ? "#aaa" : "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 14, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                {submitting ? <><span style={{ width: 14, height: 14, border: "2px solid #aaa", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} /> Submitting...</> : "Submit Monument →"}
              </button>
              <button onClick={() => { setForm(empty); setErrors({}); setServerError(""); }}
                style={{ background: "#f5f5f5", color: "#555", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, cursor: "pointer" }}>Clear</button>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )
      )}

      {/* ── MONUMENTS ── */}
      {tab === "monuments" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>All Monuments ({monuments.length})</h3>
            <button onClick={() => setTab("create")}
              style={{ background: "linear-gradient(135deg,#7C3AED,#8B5CF6)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              + Add New
            </button>
          </div>
          {loadingMonuments ? <Spinner text="Loading monuments..." /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {monuments.map(m => (
                <div key={m.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #f0f0f0", overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ height: 130, overflow: "hidden" }}>
                    <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 2 }}>{m.name}</div>
                    <div style={{ color: "#888", fontSize: 12, marginBottom: 8 }}>📍 {m.city}, {m.state}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={{ background: "#F5F3FF", color: "#7C3AED", fontSize: 10, padding: "2px 8px", borderRadius: 8, fontWeight: 700 }}>{m.era}</span>
                      <span style={{ background: "#f5f5f5", color: "#888", fontSize: 10, padding: "2px 8px", borderRadius: 8 }}>{m.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── MY ACTIVITY ── */}
      {tab === "my-activity" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Total Page Visits",  value: totalPageVisits,                    icon: "👁️", color: "#FF6B35" },
              { label: "Tours Registered",   value: activity.toursRegistered.length,    icon: "🌐", color: "#3B82F6" },
              { label: "Monuments Explored", value: activity.monumentsVisited.length,   icon: "🏛️", color: "#10B981" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "20px", border: "1px solid #f0f0f0", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700 }}>📊 Page Visits</h3>
              {Object.keys(activity.pageVisits).length === 0 ? (
                <div style={{ color: "#aaa", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No visits tracked yet</div>
              ) : Object.entries(activity.pageVisits).map(([page, count]) => (
                <div key={page} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #f5f5f5" }}>
                  <span style={{ fontSize: 13, color: "#555", textTransform: "capitalize" }}>{page}</span>
                  <span style={{ background: "#F5F3FF", color: "#7C3AED", fontSize: 12, padding: "2px 10px", borderRadius: 10, fontWeight: 700 }}>{count}x</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700 }}>🏛️ Monuments Explored</h3>
              {activity.monumentsVisited.length === 0 ? (
                <div style={{ color: "#aaa", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No monuments visited yet</div>
              ) : activity.monumentsVisited.map((m, i) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: i < activity.monumentsVisited.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                  <span style={{ fontSize: 18 }}>🏛️</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{new Date(m.visitedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", padding: 20, gridColumn: "1 / -1" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700 }}>🌐 Tours Registered</h3>
              {activity.toursRegistered.length === 0 ? (
                <div style={{ color: "#aaa", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No tours registered yet</div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {activity.toursRegistered.map(t => (
                    <div key={t.id} style={{ background: "#F5F3FF", borderRadius: 10, padding: "10px 16px", border: "1px solid #E9D5FF" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "#7C3AED", marginTop: 2 }}>📍 {t.city} · {new Date(t.registeredAt).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
