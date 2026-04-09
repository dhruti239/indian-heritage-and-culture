import Icon from "./Icon";

const roleColors = {
  "Cultural Enthusiast": "#FF6B35",
  "Content Creator":     "#8B5CF6",
  "Tour Guide":          "#10B981",
  "Admin":               "#3B82F6",
};

const Sidebar = ({ active, setActive, user, onLogout, collapsed, setCollapsed }) => {
  const role = user?.role;
  const navItems = [
    { id: "home",      label: "Home",           icon: "home",  color: "#FF6B35" },
    { id: "monuments", label: "Monuments",       icon: "map",   color: "#F59E0B" },
    { id: "culture",   label: "Culture & Arts",  icon: "art",   color: "#EC4899" },
    { id: "festivals", label: "Festivals",        icon: "gift",  color: "#8B5CF6" },
    { id: "quiz",      label: "Heritage Quiz",   icon: "quiz",  color: "#10B981" },
    { id: "tours",     label: "Virtual Tours",   icon: "globe", color: "#3B82F6" },
    ...(role === "Admin"           ? [{ id: "admin",  label: "Admin Panel",     icon: "admin", color: "#3B82F6" }] : []),
    ...(role === "Content Creator" ? [{ id: "create", label: "Create Content",  icon: "edit",  color: "#8B5CF6" }] : []),
    ...(role === "Tour Guide"      ? [{ id: "guide",  label: "Guide Dashboard", icon: "globe", color: "#10B981" }] : []),
  ];

  const rc = role ? roleColors[role] : "#FF6B35";

  return (
    <aside style={{
      width: collapsed ? 64 : 240, minHeight: "100vh",
      background: "linear-gradient(180deg,#0d1117 0%,#0F1923 60%,#0d1117 100%)",
      display: "flex", flexDirection: "column", transition: "width 0.3s", overflow: "hidden",
      position: "fixed", top: 0, left: 0, zIndex: 100,
      boxShadow: "4px 0 32px rgba(0,0,0,0.4)", borderRight: "1px solid rgba(255,255,255,0.05)"
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        onClick={() => setCollapsed(!collapsed)}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#FF6B35,#F7931E)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 17, boxShadow: "0 4px 12px rgba(255,107,53,0.4)" }}>🕌</div>
        {!collapsed && (
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: 0.3 }}>Bharat Heritage</div>
            <div style={{ color: "#FF6B35", fontSize: 10, letterSpacing: 2, fontWeight: 700 }}>EXPLORE INDIA</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 0", overflowY: "auto" }}>
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12,
              padding: collapsed ? "13px 0" : "11px 16px",
              background: isActive ? `${item.color}18` : "transparent",
              borderLeft: isActive ? `3px solid ${item.color}` : "3px solid transparent",
              border: "none", cursor: "pointer",
              color: isActive ? item.color : "rgba(255,255,255,0.5)",
              transition: "all 0.2s", textAlign: "left",
              justifyContent: collapsed ? "center" : "flex-start",
            }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: isActive ? `${item.color}25` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                <Icon name={item.icon} size={17} color={isActive ? item.color : "rgba(255,255,255,0.5)"} />
              </div>
              {!collapsed && <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 400, flex: 1 }}>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User */}
      {!collapsed && user && (
        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ background: `${rc}15`, border: `1px solid ${rc}30`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${rc},${rc}99)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{user.name[0]}</div>
              <div>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{user.name}</div>
                <div style={{ color: rc, fontSize: 11, fontWeight: 600 }}>{role}</div>
              </div>
            </div>
          </div>
          <button onClick={onLogout} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "9px 12px", background: "rgba(239,83,80,0.1)", border: "1px solid rgba(239,83,80,0.2)", borderRadius: 10, cursor: "pointer", color: "#EF5350", fontSize: 13, fontWeight: 700 }}>
            <Icon name="logout" size={15} color="#EF5350" /> Sign Out
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
