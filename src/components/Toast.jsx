import { useState, useCallback, useEffect, createContext, useContext } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const colors = { success: "#10B981", error: "#EF4444", info: "#3B82F6", warning: "#F59E0B" };
  const icons  = { success: "✅", error: "❌", info: "ℹ️", warning: "⚠️" };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: "#fff", borderRadius: 12, padding: "12px 18px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)", border: `1px solid ${colors[t.type]}30`,
            display: "flex", alignItems: "center", gap: 10, minWidth: 260, maxWidth: 380,
            animation: "fadeUp 0.3s ease both",
            borderLeft: `4px solid ${colors[t.type]}`
          }}>
            <span style={{ fontSize: 16 }}>{icons[t.type]}</span>
            <span style={{ fontSize: 13, color: "#1a1a2e", fontWeight: 500, flex: 1 }}>{t.message}</span>
            <button onClick={() => setToasts(ts => ts.filter(x => x.id !== t.id))}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 16, padding: 0 }}>×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
