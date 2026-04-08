import { useState } from "react";
import AuthPage         from "./AuthPage";
import Sidebar          from "./components/Sidebar";
import HomePage         from "./pages/HomePage";
import MonumentsPage    from "./pages/MonumentsPage";
import CulturePage      from "./pages/CulturePage";
import FestivalsPage    from "./pages/FestivalsPage";
import QuizPage         from "./pages/QuizPage";
import ToursPage        from "./pages/ToursPage";
import AdminPanel       from "./pages/AdminPanel";
import ContentCreatorPage from "./pages/ContentCreatorPage";
import TourGuidePage    from "./pages/TourGuidePage";

const PAGE_TITLES = {
  home:      "Welcome to Bharat Heritage Explorer 🇮🇳",
  monuments: "Monuments & Historical Sites",
  culture:   "Culture & Classical Arts",
  festivals: "Indian Festivals",
  quiz:      "Heritage Quiz",
  tours:     "Virtual Tours",
  admin:     "Admin Dashboard",
  create:    "Create Content",
  guide:     "Tour Guide Dashboard",
};

const PUBLIC_PAGES = ["home", "monuments", "culture", "festivals"];
const PROTECTED_PAGES = ["quiz", "tours", "admin", "create", "guide"];

export default function App() {
  const [user, setUser]           = useState(null);
  const [active, setActive]       = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [showAuth, setShowAuth]   = useState(false);

  const handleSetActive = (page) => {
    if (PROTECTED_PAGES.includes(page) && !user) {
      setShowAuth(true);
      return;
    }
    setActive(page);
  };

  if (showAuth && !user) {
    return <AuthPage onLogin={u => { setUser(u); setShowAuth(false); setActive("home"); }} onGuest={() => setShowAuth(false)} />;
  }

  const sidebarWidth = collapsed ? 64 : 240;

  const renderPage = () => {
    switch (active) {
      case "home":      return <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "monuments": return <MonumentsPage user={user} onLoginClick={() => setShowAuth(true)} />;
      case "culture":   return <CulturePage />;
      case "festivals": return <FestivalsPage />;
      case "quiz":      return user ? <QuizPage /> : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "tours":     return user ? <ToursPage /> : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "admin":     return user?.role === "Admin"           ? <AdminPanel user={user} />         : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "create":    return user?.role === "Content Creator" ? <ContentCreatorPage user={user} /> : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      case "guide":     return user?.role === "Tour Guide"      ? <TourGuidePage user={user} />      : <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
      default:          return <HomePage setActive={handleSetActive} user={user} onLoginClick={() => setShowAuth(true)} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8f8f8", minHeight: "100vh" }}>
      <Sidebar active={active} setActive={handleSetActive} user={user} onLogout={() => { setUser(null); setActive("home"); }} collapsed={collapsed} setCollapsed={setCollapsed} onLoginClick={() => setShowAuth(true)} />
      <main style={{ marginLeft: sidebarWidth, padding: "28px 32px", minHeight: "100vh", transition: "margin-left 0.3s" }}>
        {/* Topbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, background: "#fff", borderRadius: 12, padding: "12px 24px", border: "1px solid #f0f0f0" }}>
          <h1 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>{PAGE_TITLES[active]}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {user ? (
              <>
                <div style={{ background: "#FFF5F0", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 8, padding: "6px 14px" }}>
                  <span style={{ color: "#FF6B35", fontSize: 12, fontWeight: 700 }}>{user.role}</span>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #FF6B35, #F7931E)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>
                  {user.name[0]}
                </div>
              </>
            ) : (
              <button onClick={() => setShowAuth(true)} style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Sign In / Register
              </button>
            )}
          </div>
        </div>
        {renderPage()}
      </main>
    </div>
  );
}
