import Icon from "./Icon";

const ROLES = ["Cultural Enthusiast", "Content Creator", "Tour Guide", "Admin"];

const Sidebar = ({ active, setActive, user, onLogout, collapsed, setCollapsed }) => {
  const { role } = user;
  const navItems = [
    { id: "home",      label: "Home",          icon: "home" },
    { id: "monuments", label: "Monuments",      icon: "map" },
    { id: "culture",   label: "Culture & Arts", icon: "art" },
    { id: "festivals", label: "Festivals",      icon: "gift" },
    { id: "quiz",      label: "Heritage Quiz",  icon: "quiz" },
    { id: "tours",     label: "Virtual Tours",  icon: "globe" },
    ...(role === "Admin"           ? [{ id: "admin",  label: "Admin Panel",    icon: "admin" }] : []),
    ...(role === "Content Creator" ? [{ id: "create", label: "Create Content", icon: "edit"  }] : []),
    ...(role === "Tour Guide"      ? [{ id: "guide",  label: "Guide Dashboard",icon: "globe" }] : []),
  ];

  return (
    <aside style={{
      width: collapsed ? 64 : 240, minHeight: "100vh", background: "#0F1923",
      display: "flex", flexDirection: "column", transition: "width 0.3s", overflow: "hidden",
      position: "fixed", top: 0, left: 0, zIndex: 100, boxShadow: "4px 0 20px rgba(0,0,0,0.3)"
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        onClick={() => setCollapsed(!collapsed)}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #FF6B35, #F7931E)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>🕌</div>
        {!collapsed && <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Bharat Heritage</div>
          <div style={{ color: "#FF6B35", fontSize: 11, letterSpacing: 1 }}>EXPLORE INDIA</div>
        </div>}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 12,
            padding: "12px 20px",
            background: active === item.id ? "rgba(255,107,53,0.15)" : "transparent",
            borderLeft: active === item.id ? "3px solid #FF6B35" : "3px solid transparent",
            border: "none", cursor: "pointer",
            color: active === item.id ? "#FF6B35" : "rgba(255,255,255,0.6)",
            transition: "all 0.2s", textAlign: "left",
            justifyContent: collapsed ? "center" : "flex-start"
          }}>
            <Icon name={item.icon} size={18} color={active === item.id ? "#FF6B35" : "rgba(255,255,255,0.6)"} />
            {!collapsed && <span style={{ fontSize: 13, fontWeight: active === item.id ? 600 : 400 }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* User + Logout */}
      {!collapsed && (
        <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 8, padding: "10px 12px", marginBottom: 10 }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginBottom: 2 }}>LOGGED IN AS</div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{user.name}</div>
            <div style={{ color: "#FF6B35", fontSize: 11 }}>{role}</div>
          </div>
          <button onClick={onLogout} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 12px",
            background: "rgba(239,83,80,0.1)", border: "1px solid rgba(239,83,80,0.2)",
            borderRadius: 8, cursor: "pointer", color: "#EF5350", fontSize: 13, fontWeight: 600
          }}>
            <Icon name="logout" size={15} color="#EF5350" /> Sign Out
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
