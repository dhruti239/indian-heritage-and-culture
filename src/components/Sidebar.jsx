import Icon from "./Icon";

const roleColors = {
  "Cultural Enthusiast": "#FF6B35",
  "Content Creator":     "#7C3AED",
  "Tour Guide":          "#0D9488",
  "Admin":               "#4F46E5",
};

const roleBgs = {
  "Cultural Enthusiast": "linear-gradient(135deg,#FF6B35,#F7931E)",
  "Content Creator":     "linear-gradient(135deg,#7C3AED,#8B5CF6)",
  "Tour Guide":          "linear-gradient(135deg,#0D9488,#14B8A6)",
  "Admin":               "linear-gradient(135deg,#4F46E5,#6366F1)",
};

const Sidebar = ({ active, setActive, user, onLogout, collapsed, setCollapsed, isMobile, mobileOpen }) => {
  const role = user?.role;
  const navItems = [
    { id: "home",      label: "Home",           icon: "home",  color: "#FF6B35", glow: "rgba(255,107,53,0.4)" },
    { id: "monuments", label: "Monuments",       icon: "map",   color: "#F59E0B", glow: "rgba(245,158,11,0.4)" },
    { id: "culture",   label: "Culture & Arts",  icon: "art",   color: "#EC4899", glow: "rgba(236,72,153,0.4)" },
    { id: "festivals", label: "Festivals",        icon: "gift",  color: "#7C3AED", glow: "rgba(124,58,237,0.4)" },
    { id: "quiz",      label: "Heritage Quiz",   icon: "quiz",  color: "#0D9488", glow: "rgba(13,148,136,0.4)" },
    { id: "tours",     label: "Virtual Tours",   icon: "globe", color: "#4F46E5", glow: "rgba(79,70,229,0.4)" },
    ...(role === "Admin"                ? [{ id: "admin",      label: "Admin Panel",     icon: "admin", color: "#4F46E5", glow: "rgba(79,70,229,0.4)" }] : []),
    ...(role === "Content Creator"      ? [{ id: "create",     label: "Create Content",  icon: "edit",  color: "#7C3AED", glow: "rgba(124,58,237,0.4)" }] : []),
    ...(role === "Tour Guide"           ? [{ id: "guide",      label: "Guide Dashboard", icon: "globe", color: "#0D9488", glow: "rgba(13,148,136,0.4)" }] : []),
    ...(role === "Cultural Enthusiast"  ? [{ id: "enthusiast", label: "My Dashboard",    icon: "home",  color: "#FF6B35", glow: "rgba(255,107,53,0.4)" }] : []),
  ];

  const rc  = role ? roleColors[role] : "#FF6B35";
  const rbg = role ? roleBgs[role]    : "linear-gradient(135deg,#FF6B35,#F7931E)";

  return (
    <aside style={{
      width: isMobile ? 260 : (collapsed ? 68 : 248),
      minHeight: "100vh",
      background: "linear-gradient(180deg,#0F172A 0%,#1E293B 50%,#0F172A 100%)",
      display: "flex", flexDirection: "column",
      transition: "width 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1)",
      overflow: "hidden",
      position: "fixed", top: 0, left: 0, zIndex: 100,
      boxShadow: "4px 0 40px rgba(0,0,0,0.5)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      transform: isMobile ? (mobileOpen ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
    }}>

      {/* Decorative top accent */}
      <div style={{ height: 3, background: "linear-gradient(90deg,#FF6B35,#F7931E,#F59E0B,#0D9488,#4F46E5)", flexShrink: 0 }} />

      {/* Logo */}
      <div style={{ padding: "18px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", flexShrink: 0 }}
        onClick={() => setCollapsed(!collapsed)}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#FF6B35,#F7931E)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 19, boxShadow: "0 4px 16px rgba(255,107,53,0.5)" }}>🕌</div>
        {!collapsed && (
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: 0.2 }}>Bharat Heritage</div>
            <div style={{ fontSize: 9, letterSpacing: 3, fontWeight: 700, background: "linear-gradient(90deg,#FF6B35,#F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>EXPLORE INDIA 🇮🇳</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {!collapsed && (
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: 2, padding: "4px 10px 10px", textTransform: "uppercase" }}>Navigation</div>
        )}
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)}
              title={collapsed ? item.label : ""}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: collapsed ? "11px 0" : "10px 12px",
                marginBottom: 2,
                borderRadius: 12,
                background: isActive
                  ? `linear-gradient(135deg,${item.color}22,${item.color}11)`
                  : "transparent",
                border: isActive ? `1px solid ${item.color}33` : "1px solid transparent",
                cursor: "pointer",
                color: isActive ? item.color : "rgba(255,255,255,0.45)",
                transition: "all 0.2s", textAlign: "left",
                justifyContent: collapsed ? "center" : "flex-start",
                boxShadow: isActive ? `0 0 20px ${item.glow}` : "none",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; } }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: isActive ? `${item.color}22` : "rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: isActive ? `0 0 12px ${item.glow}` : "none",
                transition: "all 0.2s",
              }}>
                <Icon name={item.icon} size={16} color={isActive ? item.color : "rgba(255,255,255,0.45)"} />
              </div>
              {!collapsed && (
                <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, flex: 1, letterSpacing: 0.1 }}>{item.label}</span>
              )}
              {!collapsed && isActive && (
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, boxShadow: `0 0 8px ${item.color}`, flexShrink: 0 }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* User card */}
      {user && (
        <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          {!collapsed ? (
            <>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "12px", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: rbg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15, flexShrink: 0, boxShadow: `0 4px 12px ${rc}55`, border: "2px solid rgba(255,255,255,0.15)" }}>{user.name[0]}</div>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, background: rbg, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{role}</div>
                  </div>
                </div>
              </div>
              <button onClick={onLogout} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "9px 12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, cursor: "pointer", color: "#F87171", fontSize: 12, fontWeight: 700, fontFamily: "inherit", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}>
                <Icon name="logout" size={14} color="#F87171" /> Sign Out
              </button>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div title={user.name} style={{ width: 36, height: 36, borderRadius: "50%", background: rbg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15, boxShadow: `0 4px 12px ${rc}55` }}>{user.name[0]}</div>
              <button onClick={onLogout} title="Sign Out" style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🚪</button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
