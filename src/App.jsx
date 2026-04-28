import { useState, useEffect } from "react";
import AuthPage           from "./AuthPage";
import Sidebar            from "./components/Sidebar";
import { ToastProvider }  from "./components/Toast";
import HomePage           from "./pages/HomePage";
import MonumentsPage      from "./pages/MonumentsPage";
import CulturePage        from "./pages/CulturePage";
import FestivalsPage      from "./pages/FestivalsPage";
import QuizPage           from "./pages/QuizPage";
import ToursPage          from "./pages/ToursPage";
import AdminPanel         from "./pages/AdminPanel";
import ContentCreatorPage from "./pages/ContentCreatorPage";
import TourGuidePage      from "./pages/TourGuidePage";
import EnthusiastPage     from "./pages/EnthusiastPage";
import store              from "./store";

const PAGE_TITLES = {
  home:       "Welcome to Bharat Heritage Explorer 🇮🇳",
  monuments:  "Monuments & Historical Sites",
  culture:    "Culture & Classical Arts",
  festivals:  "Indian Festivals",
  quiz:       "Heritage Quiz",
  tours:      "Virtual Tours",
  admin:      "Admin Dashboard",
  create:     "Create Content",
  guide:      "Tour Guide Dashboard",
  enthusiast: "My Dashboard",
};

const PROTECTED_PAGES = ["quiz", "tours", "admin", "create", "guide", "enthusiast"];

const roleColors = {
  "Cultural Enthusiast": "#FF6B35",
  "Content Creator":     "#8B5CF6",
  "Tour Guide":          "#10B981",
  "Admin":               "#3B82F6",
};

export default function App() {
  const [user, setUser]           = useState(() => {
    // Restore user from localStorage on page refresh
    try {
      const saved = localStorage.getItem("heritage_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [active, setActive]       = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [showAuth, setShowAuth]   = useState(false);
  const [isMobile, setIsMobile]   = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Re-init store when user is restored from localStorage
  useEffect(() => {
    if (user) store.initUser(user);
  }, []); // eslint-disable-line

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (user) store.trackPageVisit(user.id, active);
  }, [active, user]);

  const handleLogin = (u) => {
    if (u.token) localStorage.setItem("heritage_token", u.token);
    localStorage.setItem("heritage_user", JSON.stringify(u));
    store.initUser(u);
    setUser(u);
    setShowAuth(false);
    setActive("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("heritage_token");
    localStorage.removeItem("heritage_user");
    setUser(null);
    setActive("home");
    store.users = {};
  };

  const handleSetActive = (page) => {
    if (PROTECTED_PAGES.includes(page) && !user) { setShowAuth(true); return; }
    setActive(page);
    if (isMobile) setSidebarOpen(false);
  };

  if (showAuth && !user) {
    return <ToastProvider><AuthPage onLogin={handleLogin} onGuest={() => setShowAuth(false)} /></ToastProvider>;
  }

  const sidebarWidth = isMobile ? 0 : (collapsed ? 68 : 248);
  const rc = user ? (roleColors[user.role] || "#FF6B35") : "#FF6B35";

  const renderPage = () => {
    switch (active) {
      case "home":       return <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "monuments":  return <MonumentsPage user={user} onLoginClick={() => setShowAuth(true)} />;
      case "culture":    return <CulturePage />;
      case "festivals":  return <FestivalsPage />;
      case "quiz":       return user ? <QuizPage /> : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "tours":      return user ? <ToursPage user={user} /> : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "admin":      return user?.role === "Admin"               ? <AdminPanel user={user} />         : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "create":     return user?.role === "Content Creator"     ? <ContentCreatorPage user={user} /> : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "guide":      return user?.role === "Tour Guide"          ? <TourGuidePage user={user} />      : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "enthusiast": return user?.role === "Cultural Enthusiast" ? <EnthusiastPage user={user} />    : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      default:           return <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
    }
  };

  return (
    <ToastProvider>
      <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "linear-gradient(135deg,#F1F5F9 0%,#E8EDF5 100%)", minHeight: "100vh" }}>

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 99 }} />
        )}

        <Sidebar
          active={active} setActive={handleSetActive}
          user={user} onLogout={handleLogout}
          collapsed={isMobile ? false : collapsed}
          setCollapsed={isMobile ? () => setSidebarOpen(false) : setCollapsed}
          isMobile={isMobile}
          mobileOpen={sidebarOpen}
        />

        <main style={{
          marginLeft: sidebarWidth,
          padding: isMobile ? "16px" : "28px 32px",
          minHeight: "100vh",
          transition: "margin-left 0.3s"
        }}>
          {/* Topbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, background: "#fff", borderRadius: 16, padding: isMobile ? "10px 14px" : "12px 24px", border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.06)", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Mobile hamburger */}
              {isMobile && (
                <button onClick={() => setSidebarOpen(true)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, padding: "2px 6px", color: "#0F172A" }}>☰</button>
              )}
              <div style={{ width: 6, height: 28, borderRadius: 99, background: "linear-gradient(180deg,#FF6B35,#F7931E)", flexShrink: 0 }} />
              <h1 style={{ fontSize: isMobile ? 13 : 15, fontWeight: 800, color: "#0F172A", margin: 0, letterSpacing: -0.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: isMobile ? 160 : "none" }}>
                {PAGE_TITLES[active]}
              </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              {user ? (
                <>
                  {!isMobile && (
                    <div style={{ background: "linear-gradient(135deg,#FFF5F0,#FFF0E8)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: 99, padding: "4px 14px" }}>
                      <span style={{ color: rc, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{user.role.toUpperCase()}</span>
                    </div>
                  )}
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${rc},${rc}cc)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15, boxShadow: `0 4px 12px ${rc}55`, border: "2px solid #fff", flexShrink: 0 }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <button onClick={handleLogout}
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: isMobile ? "6px 10px" : "7px 16px", fontSize: 12, fontWeight: 700, color: "#EF4444", cursor: "pointer", whiteSpace: "nowrap" }}>
                    {isMobile ? "⏻" : "Sign Out"}
                  </button>
                </>
              ) : (
                <button onClick={() => setShowAuth(true)}
                  style={{ background: "linear-gradient(135deg,#FF6B35,#F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: isMobile ? "8px 14px" : "9px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(255,107,53,0.35)", whiteSpace: "nowrap" }}>
                  {isMobile ? "Sign In" : "Sign In / Register"}
                </button>
              )}
            </div>
          </div>

          {renderPage()}
        </main>
      </div>
    </ToastProvider>
  );
}
