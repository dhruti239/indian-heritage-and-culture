import { useState, useEffect } from "react";
import ImgWithFallback from "../components/ImgWithFallback";
import Spinner from "../components/Spinner";
import { api } from "../api";
import { MONUMENTS, ROLES } from "../data";

const roleColors = {
  "Admin":               { bg: "#EEF2FF", color: "#4F46E5" },
  "Content Creator":     { bg: "#F5F3FF", color: "#7C3AED" },
  "Tour Guide":          { bg: "#F0FDF4", color: "#10B981" },
  "Cultural Enthusiast": { bg: "#FFF7ED", color: "#FF6B35" },
};

const RoleBadge = ({ role }) => {
  const c = roleColors[role] || { bg: "#f5f5f5", color: "#888" };
  return (
    <span style={{ background: c.bg, color: c.color, fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 700 }}>
      {role}
    </span>
  );
};

export default function AdminPanel({ user }) {
  const [tab, setTab]           = useState("dashboard");
  const [users, setUsers]       = useState([]);
  const [monuments, setMonuments] = useState([]);
  const [loadingUsers, setLoadingUsers]     = useState(true);
  const [loadingMonuments, setLoadingMonuments] = useState(true);
  const [expandedUser, setExpandedUser]     = useState(null);
  const [userDetail, setUserDetail]         = useState({});
  const [loadingDetail, setLoadingDetail]   = useState(false);
  const [showAddModal, setShowAddModal]     = useState(false);
  const [newUserForm, setNewUserForm]       = useState({ name: "", email: "", password: "", role: "Cultural Enthusiast" });
  const [addError, setAddError]             = useState("");
  const [addLoading, setAddLoading]         = useState(false);
  const [search, setSearch]                 = useState("");

  useEffect(() => {
    api.get("/users")
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]))
      .finally(() => setLoadingUsers(false));

    api.get("/monuments")
      .then(data => setMonuments(Array.isArray(data) ? data : MONUMENTS))
      .catch(() => setMonuments(MONUMENTS))
      .finally(() => setLoadingMonuments(false));
  }, []);

  const loadUserDetail = async (uid) => {
    if (userDetail[uid]) return;
    setLoadingDetail(true);
    try {
      const detail = await api.get(`/users/${uid}`);
      setUserDetail(prev => ({ ...prev, [uid]: detail }));
    } catch (_) {
      setUserDetail(prev => ({ ...prev, [uid]: null }));
    } finally {
      setLoadingDetail(false);
    }
  };

  const toggleExpand = (uid) => {
    if (expandedUser === uid) { setExpandedUser(null); return; }
    setExpandedUser(uid);
    loadUserDetail(uid);
  };

  const deleteUser = async (id, name) => {
    if (!window.confirm(`Remove ${name} from the platform?`)) return;
    try { await api.delete(`/users/${id}`); } catch (_) {}
    setUsers(u => u.filter(x => x.id !== id));
    if (expandedUser === id) setExpandedUser(null);
  };

  const deleteMonument = async (id) => {
    if (!window.confirm("Delete this monument?")) return;
    try { await api.delete(`/monuments/${id}`); } catch (_) {}
    setMonuments(m => m.filter(x => x.id !== id));
  };

  const addUser = async () => {
    if (!newUserForm.name || !newUserForm.email || !newUserForm.password) {
      setAddError("All fields are required."); return;
    }
    setAddLoading(true); setAddError("");
    try {
      const created = await api.post("/auth/signup", newUserForm);
      setUsers(prev => [...prev, created]);
      setShowAddModal(false);
      setNewUserForm({ name: "", email: "", password: "", role: "Cultural Enthusiast" });
    } catch (e) {
      setAddError(e.message || "Failed to create user.");
    } finally {
      setAddLoading(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
  );

  // Dashboard stats derived from real data
  const roleCounts = users.reduce((acc, u) => { acc[u.role] = (acc[u.role] || 0) + 1; return acc; }, {});

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Admin Panel</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Welcome, {user.name} — manage users, content, and platform settings</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "#f5f5f5", borderRadius: 10, padding: 4, marginBottom: 24, width: "fit-content", flexWrap: "wrap" }}>
        {["dashboard", "users", "content", "settings"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: tab === t ? "#fff" : "transparent", color: tab === t ? "#FF6B35" : "#888", fontWeight: tab === t ? 700 : 400, fontSize: 13, cursor: "pointer", boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none", textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      {/* ── DASHBOARD ── */}
      {tab === "dashboard" && (
        <div>
          {/* Real stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
            {[
              { label: "Total Users",    value: users.length,                                    icon: "👥", color: "#4F46E5" },
              { label: "Monuments",      value: monuments.length,                                icon: "🏛️", color: "#FF6B35" },
              { label: "Admins",         value: roleCounts["Admin"] || 0,                        icon: "⚙️", color: "#3B82F6" },
              { label: "Tour Guides",    value: roleCounts["Tour Guide"] || 0,                   icon: "🎓", color: "#10B981" },
              { label: "Creators",       value: roleCounts["Content Creator"] || 0,              icon: "✍️", color: "#7C3AED" },
              { label: "Enthusiasts",    value: roleCounts["Cultural Enthusiast"] || 0,          icon: "🏛️", color: "#F59E0B" },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "20px", border: "1px solid #f0f0f0", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ color: "#888", fontSize: 12, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Role breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #f0f0f0" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#1a1a2e" }}>👥 Users by Role</h3>
              {Object.entries(roleCounts).map(([role, count]) => {
                const pct = users.length ? Math.round((count / users.length) * 100) : 0;
                const c = roleColors[role] || { color: "#888" };
                return (
                  <div key={role} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#555" }}>{role}</span>
                      <span style={{ fontSize: 13, color: "#888" }}>{count} ({pct}%)</span>
                    </div>
                    <div style={{ background: "#f0f0f0", borderRadius: 10, height: 8 }}>
                      <div style={{ height: "100%", background: c.color, borderRadius: 10, width: `${pct}%`, transition: "width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #f0f0f0" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#1a1a2e" }}>🏛️ Content Overview</h3>
              {[
                { name: "Monuments",     count: monuments.length, total: 10, color: "#FF6B35" },
                { name: "Virtual Tours", count: monuments.length, total: monuments.length, color: "#3B82F6" },
                { name: "Art Forms",     count: 6,                total: 12, color: "#8B5CF6" },
                { name: "Festivals",     count: 6,                total: 8,  color: "#10B981" },
              ].map(c => (
                <div key={c.name} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "#555" }}>{c.name}</span>
                    <span style={{ fontSize: 13, color: "#888" }}>{c.count}/{c.total}</span>
                  </div>
                  <div style={{ background: "#f0f0f0", borderRadius: 10, height: 8 }}>
                    <div style={{ height: "100%", background: c.color, borderRadius: 10, width: `${Math.min((c.count / c.total) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── USERS ── */}
      {tab === "users" && (
        <div>
          {/* Toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users by name, email or role..."
                style={{ width: "100%", padding: "9px 14px 9px 36px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
            <button onClick={() => setShowAddModal(true)}
              style={{ background: "linear-gradient(135deg,#FF6B35,#F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
              + Add User
            </button>
          </div>

          {loadingUsers ? <Spinner text="Loading users..." /> : (
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 2fr 1fr 1fr 80px", gap: 0, background: "#f9f9f9", padding: "10px 20px", borderBottom: "1px solid #f0f0f0" }}>
                {["Name", "Role", "Email", "Tours", "Monuments", ""].map(h => (
                  <div key={h} style={{ fontSize: 11, color: "#888", fontWeight: 700, letterSpacing: 0.5 }}>{h.toUpperCase()}</div>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div style={{ padding: 32, textAlign: "center", color: "#aaa" }}>No users found.</div>
              )}

              {filteredUsers.map(u => (
                <div key={u.id}>
                  {/* Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 2fr 1fr 1fr 80px", gap: 0, padding: "14px 20px", borderBottom: "1px solid #f5f5f5", alignItems: "center", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    onClick={() => toggleExpand(u.id)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${(roleColors[u.role] || { color: "#888" }).color},${(roleColors[u.role] || { color: "#aaa" }).color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                        {u.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: "#aaa" }}>ID: {u.id}</div>
                      </div>
                    </div>
                    <div><RoleBadge role={u.role} /></div>
                    <div style={{ fontSize: 12, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#3B82F6" }}>
                      {typeof u.toursRegistered === "number" ? u.toursRegistered : (u.toursRegistered?.length ?? "—")}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>
                      {typeof u.monumentsVisited === "number" ? u.monumentsVisited : (u.monumentsVisited?.length ?? "—")}
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#aaa" }}>{expandedUser === u.id ? "▲" : "▼"}</span>
                      <button onClick={e => { e.stopPropagation(); deleteUser(u.id, u.name); }}
                        style={{ background: "#FFEBEE", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", color: "#EF5350", fontWeight: 600 }}>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {expandedUser === u.id && (
                    <div style={{ background: "#fafafa", borderBottom: "1px solid #f0f0f0", padding: "16px 20px 20px" }}>
                      {loadingDetail && !userDetail[u.id] ? (
                        <Spinner size={24} text="Loading user activity..." />
                      ) : userDetail[u.id] ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>

                          {/* Page Visits */}
                          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #f0f0f0" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>📊 Page Visits</div>
                            {Object.keys(userDetail[u.id].pageVisits || {}).length === 0 ? (
                              <div style={{ color: "#aaa", fontSize: 12 }}>No page visits yet</div>
                            ) : Object.entries(userDetail[u.id].pageVisits).map(([page, count]) => (
                              <div key={page} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f5f5f5" }}>
                                <span style={{ fontSize: 12, color: "#555", textTransform: "capitalize" }}>{page}</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#FF6B35" }}>{count}x</span>
                              </div>
                            ))}
                          </div>

                          {/* Monuments Visited */}
                          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #f0f0f0" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>🏛️ Monuments Visited ({(userDetail[u.id].monumentsVisited || []).length})</div>
                            {(userDetail[u.id].monumentsVisited || []).length === 0 ? (
                              <div style={{ color: "#aaa", fontSize: 12 }}>No monuments visited yet</div>
                            ) : (userDetail[u.id].monumentsVisited || []).map(m => (
                              <div key={m.id} style={{ padding: "5px 0", borderBottom: "1px solid #f5f5f5" }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a2e" }}>{m.name}</div>
                                <div style={{ fontSize: 11, color: "#aaa" }}>📍 {m.city} · {new Date(m.visitedAt).toLocaleDateString()}</div>
                              </div>
                            ))}
                          </div>

                          {/* Tours Registered */}
                          <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #f0f0f0" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>🌐 Tours Registered ({(userDetail[u.id].toursRegistered || []).length})</div>
                            {(userDetail[u.id].toursRegistered || []).length === 0 ? (
                              <div style={{ color: "#aaa", fontSize: 12 }}>No tours registered yet</div>
                            ) : (userDetail[u.id].toursRegistered || []).map(t => (
                              <div key={t.id} style={{ padding: "5px 0", borderBottom: "1px solid #f5f5f5" }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a2e" }}>{t.name}</div>
                                <div style={{ fontSize: 11, color: "#aaa" }}>📍 {t.city} · {new Date(t.registeredAt).toLocaleDateString()}</div>
                              </div>
                            ))}
                          </div>

                        </div>
                      ) : (
                        <div style={{ color: "#aaa", fontSize: 13 }}>Could not load user details.</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add User Modal */}
          {showAddModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}
              onClick={() => { setShowAddModal(false); setAddError(""); }}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 440 }} onClick={e => e.stopPropagation()}>
                <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>Add New User</h3>
                {[
                  { key: "name",     label: "Full Name", type: "text",     placeholder: "Enter name" },
                  { key: "email",    label: "Email",     type: "email",    placeholder: "user@example.com" },
                  { key: "password", label: "Password",  type: "password", placeholder: "Min 6 characters" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
                    <input type={f.type} value={newUserForm[f.key]} onChange={e => setNewUserForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, boxSizing: "border-box", outline: "none" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 600 }}>Role</label>
                  <select value={newUserForm.role} onChange={e => setNewUserForm(p => ({ ...p, role: e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none" }}>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                {addError && <div style={{ color: "#EF4444", fontSize: 13, marginBottom: 12, background: "#FFF5F5", padding: "8px 12px", borderRadius: 8 }}>⚠ {addError}</div>}
                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button onClick={() => { setShowAddModal(false); setAddError(""); }} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#555", cursor: "pointer" }}>Cancel</button>
                  <button onClick={addUser} disabled={addLoading}
                    style={{ padding: "10px 20px", borderRadius: 8, background: addLoading ? "#e5e7eb" : "linear-gradient(135deg,#FF6B35,#F7931E)", color: addLoading ? "#aaa" : "#fff", border: "none", cursor: addLoading ? "not-allowed" : "pointer", fontWeight: 700 }}>
                    {addLoading ? "Creating..." : "Create User"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CONTENT ── */}
      {tab === "content" && (
        loadingMonuments ? <Spinner text="Loading monuments..." /> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {monuments.map(m => (
              <div key={m.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #f0f0f0", overflow: "hidden" }}>
                <div style={{ height: 120, overflow: "hidden" }}>
                  <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#1a1a2e" }}>{m.name}</div>
                  <div style={{ color: "#888", fontSize: 12, marginBottom: 12 }}>{m.category} · {m.era}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ flex: 1, background: "#f5f5f5", border: "none", borderRadius: 8, padding: "8px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>✎ Edit</button>
                    <button onClick={() => deleteMonument(m.id)} style={{ flex: 1, background: "#FFEBEE", color: "#EF5350", border: "none", borderRadius: 8, padding: "8px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>🗑 Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── SETTINGS ── */}
      {tab === "settings" && (
        <div style={{ maxWidth: 600 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #f0f0f0" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: "#1a1a2e" }}>Platform Settings</h3>
            {[
              { label: "Site Name",        value: "Bharat Heritage Explorer" },
              { label: "Contact Email",    value: "admin@bharatheritage.in" },
              { label: "Default Language", value: "English" },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>{s.label}</label>
                <input defaultValue={s.value} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <button style={{ background: "linear-gradient(135deg,#FF6B35,#F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
}
