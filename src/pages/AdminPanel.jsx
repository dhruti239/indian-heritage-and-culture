import { useState, useEffect } from "react";
import ImgWithFallback from "../components/ImgWithFallback";
import { api } from "../api";
import { MONUMENTS, ROLES } from "../data";

const AdminPanel = ({ user }) => {
  const [tab, setTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [monuments, setMonuments] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({name: "", email: "", role: "Content Creator"}); 

  const mockUsers = [
    {id: 1, name: "Super Admin", role: "Admin", email: "admin@bharat.in"},
    {id: 2, name: "Priya Sharma", role: "Content Creator", email: "priya@example.com"},
    {id: 3, name: "Rajesh Guide", role: "Tour Guide", email: "raj@tour.in"}
  ];

  useEffect(() => {
    api.get("/users").then(setUsers).catch(() => setUsers(mockUsers));
    api.get("/monuments").then(setMonuments).catch(() => setMonuments(MONUMENTS));
  }, []); 

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
    } catch (e) {
      console.log("Delete failed (no backend?), local update:", e.message);
    }
    setUsers(u => u.filter(x => x.id !== id));
  };

  const deleteMonument = async (id) => {
    try {
      await api.delete(`/monuments/${id}`);
    } catch (e) {
      console.log("Delete failed (no backend?), local update:", e.message);
    }
    setMonuments(m => m.filter(x => x.id !== id));
  };

  const addUser = () => {
    const userData = {...newUserForm, id: Date.now() };
    setUsers(prev => [...prev, userData]);
    setNewUserForm({name: "", email: "", role: "Content Creator"});
    setShowAddUserModal(false);
  };

  const stats = [
    { label: "Total Users",    value: "1,248", change: "+12%", up: true },
    { label: "Active Tours",   value: "86",    change: "+5%",  up: true },
    { label: "Content Pieces", value: "342",   change: "+8%",  up: true },
    { label: "Quiz Attempts",  value: "2,840", change: "-2%",  up: false },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Admin Panel</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Welcome, {user.name} — manage content, users, and platform settings</p>
      </div>

      <div style={{ display: "flex", gap: 4, background: "#f5f5f5", borderRadius: 10, padding: 4, marginBottom: 24, width: "fit-content" }}>
        {["dashboard", "users", "content", "settings"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: tab === t ? "#fff" : "transparent", color: tab === t ? "#FF6B35" : "#888", fontWeight: tab === t ? 700 : 400, fontSize: 13, cursor: "pointer", boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none", textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      {tab === "dashboard" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #f0f0f0" }}>
                <div style={{ color: "#888", fontSize: 12, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: s.up ? "#4CAF50" : "#EF5350", fontWeight: 600 }}>{s.change} this month</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #f0f0f0" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#1a1a2e" }}>Recent Activity</h3>
              {[
                { action: "New tour started",    user: "Priya S.",  time: "2m ago",  icon: "🌐" },
                { action: "Content published",   user: "Rajan M.",  time: "15m ago", icon: "📝" },
                { action: "Quiz completed",      user: "Anita G.",  time: "32m ago", icon: "🧠" },
                { action: "New user registered", user: "Kavita P.", time: "1h ago",  icon: "👤" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid #f5f5f5" : "none" }}>
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>{a.action}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{a.user}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#bbb" }}>{a.time}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #f0f0f0" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#1a1a2e" }}>Content Status</h3>
              {[
                { name: "Monuments",     count: 6, total: 10, color: "#FF6B35" },
                { name: "Virtual Tours", count: 6, total: 8,  color: "#3B82F6" },
                { name: "Art Forms",     count: 6, total: 12, color: "#8B5CF6" },
                { name: "Festivals",     count: 6, total: 8,  color: "#10B981" },
              ].map(c => (
                <div key={c.name} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "#555" }}>{c.name}</span>
                    <span style={{ fontSize: 13, color: "#888" }}>{c.count}/{c.total}</span>
                  </div>
                  <div style={{ background: "#f0f0f0", borderRadius: 10, height: 8 }}>
                    <div style={{ height: "100%", background: c.color, borderRadius: 10, width: `${(c.count / c.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "users" && (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0f0f0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>User Management</h3>
            <button onClick={() => setShowAddUserModal(true)} style={{ background: "#FF6B35", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>+ Add User</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9f9f9" }}>
                {["Name", "Role", "Email", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, color: "#888", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderTop: "1px solid #f5f5f5" }}>
                  <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 500, color: "#1a1a2e" }}>{u.name}</td>
                  <td style={{ padding: "14px 20px" }}><span style={{ background: "#FFF5F0", color: "#FF6B35", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600 }}>{u.role}</span></td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: "#888" }}>{u.email}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { if (window.confirm(`Delete ${u.name}?`)) deleteUser(u.id); }} style={{ background: "#FFEBEE", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer", color: "#EF5350" }}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showAddUserModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }} onClick={() => setShowAddUserModal(false)}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, minWidth: 400, maxWidth: 500 }} onClick={e => e.stopPropagation()}>
                <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>Add New User</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>Name</label>
                  <input value={newUserForm.name} onChange={e => setNewUserForm(p => ({...p, name: e.target.value}))} placeholder="Enter name" style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>Email</label>
                  <input type="email" value={newUserForm.email} onChange={e => setNewUserForm(p => ({...p, email: e.target.value}))} placeholder="user@example.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>Role</label>
                  <select value={newUserForm.role} onChange={e => setNewUserForm(p => ({...p, role: e.target.value}))} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14 }}>
                    {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button onClick={() => setShowAddUserModal(false)} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#555", cursor: "pointer" }}>Cancel</button>
                  <button onClick={addUser} disabled={!newUserForm.name || !newUserForm.email} style={{ padding: "10px 20px", borderRadius: 8, background: "#FF6B35", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>Add User</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "content" && (
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
      )}

      {tab === "settings" && (
        <div style={{ maxWidth: 600 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #f0f0f0", marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: "#1a1a2e" }}>Platform Settings</h3>
            {[
              { label: "Site Name",         value: "Bharat Heritage Explorer" },
              { label: "Contact Email",     value: "admin@bharatheritage.in" },
              { label: "Default Language",  value: "English" },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>{s.label}</label>
                <input defaultValue={s.value} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <button style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
