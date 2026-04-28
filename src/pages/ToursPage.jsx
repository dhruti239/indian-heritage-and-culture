import { useState } from "react";
import { MONUMENTS } from "../data";
import ImgWithFallback from "../components/ImgWithFallback";
import store from "../store";

const ToursPage = ({ user }) => {
  const [activeTour, setActiveTour] = useState(null);
  const [step, setStep]             = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput]   = useState("");

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg  = { from: "user",  text: chatInput };
    const guideMsg = { from: "guide", text: `Great question about ${activeTour?.name}! ${chatInput.toLowerCase().includes("year") ? `Construction began in ${activeTour?.year}.` : `The architectural style here is ${activeTour?.era}, featuring unique design elements.`}` };
    setChatMessages(m => [...m, userMsg, guideMsg]);
    setChatInput("");
  };

  const startTour = (m) => {
    if (user) store.trackTourRegistration(user.id, m);
    setActiveTour(m);
    setStep(0);
    setChatMessages([{ from: "guide", text: `Welcome to the virtual tour of ${m.name}! I'm your expert guide. Feel free to ask me anything.` }]);
  };

  if (!activeTour) return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Virtual Tours</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Take immersive virtual tours of India's most iconic monuments</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {MONUMENTS.map(m => (
          <div key={m.id} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ position: "relative", height: 180 }}>
              <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 50%, rgba(0,0,0,0.7))" }} />
              <div style={{ position: "absolute", bottom: 12, left: 16 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{m.name}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{m.tourPoints.length} stops</div>
              </div>
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <span style={{ background: "#FFF5F0", color: "#FF6B35", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600 }}>{m.era}</span>
                <span style={{ background: "#f5f5f5", color: "#666", fontSize: 11, padding: "3px 10px", borderRadius: 10 }}>{m.year}</span>
              </div>
              <button onClick={() => startTour(m)}
                style={{ width: "100%", background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                ▶ Start Virtual Tour
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <button onClick={() => setActiveTour(null)} style={{ background: "#f5f5f5", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 14 }}>← Back</button>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Virtual Tour: {activeTour.name}</h2>
          <div style={{ color: "#888", fontSize: 13 }}>📍 {activeTour.city}, {activeTour.state}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        <div>
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 20, position: "relative", height: 380 }}>
            <ImgWithFallback src={activeTour.image} alt={activeTour.name} category={activeTour.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "40px 24px 24px" }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 4 }}>Stop {step + 1} of {activeTour.tourPoints.length}</div>
              <div style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>{activeTour.tourPoints[step]}</div>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #f0f0f0", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: "#1a1a2e" }}>Tour Stops</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {activeTour.tourPoints.map((pt, i) => (
                <button key={pt} onClick={() => setStep(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: i === step ? "2px solid #FF6B35" : "1px solid #f0f0f0", background: i === step ? "#FFF5F0" : "#fff", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: i === step ? "#FF6B35" : i < step ? "#4CAF50" : "#e5e7eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i < step ? "✓" : i + 1}</span>
                  <span style={{ fontSize: 14, color: i === step ? "#FF6B35" : "#333", fontWeight: i === step ? 600 : 400 }}>{pt}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1px solid #e5e7eb", background: step === 0 ? "#f9f9f9" : "#fff", color: step === 0 ? "#ccc" : "#333", fontSize: 14, fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer" }}>← Previous Stop</button>
            <button onClick={() => setStep(s => Math.min(activeTour.tourPoints.length - 1, s + 1))} disabled={step === activeTour.tourPoints.length - 1} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: step === activeTour.tourPoints.length - 1 ? "#f9f9f9" : "linear-gradient(135deg, #FF6B35, #F7931E)", color: step === activeTour.tourPoints.length - 1 ? "#ccc" : "#fff", fontSize: 14, fontWeight: 600, cursor: step === activeTour.tourPoints.length - 1 ? "not-allowed" : "pointer" }}>Next Stop →</button>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", display: "flex", flexDirection: "column", maxHeight: 600 }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #FF6B35, #F7931E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎓</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>Expert Tour Guide</div>
              <div style={{ color: "#4CAF50", fontSize: 12 }}>● Online</div>
            </div>
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: msg.from === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px", background: msg.from === "user" ? "linear-gradient(135deg, #FF6B35, #F7931E)" : "#f5f5f5", color: msg.from === "user" ? "#fff" : "#333", fontSize: 13, lineHeight: 1.5 }}>{msg.text}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: 16, borderTop: "1px solid #f0f0f0", display: "flex", gap: 8 }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Ask the guide..." style={{ flex: 1, padding: "8px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, outline: "none" }} />
            <button onClick={sendMessage} style={{ background: "#FF6B35", color: "#fff", border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 16 }}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
