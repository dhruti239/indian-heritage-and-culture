import { useState } from "react";
import { QUIZ_QUESTIONS } from "../data";

const QuizPage = () => {
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers]   = useState([]);

  const q = QUIZ_QUESTIONS[current];
  const progress = ((current) / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = idx => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === q.ans;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(a => [...a, { q: q.q, selected: idx, correct: q.ans, isCorrect }]);
  };

  const next = () => {
    if (current + 1 >= QUIZ_QUESTIONS.length) setFinished(true);
    else { setCurrent(c => c + 1); setSelected(null); }
  };

  const restart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]); };

  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  if (finished) return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      <div style={{ background: "linear-gradient(135deg,#0f1a2e,#1a0a2e)", borderRadius: 24, padding: "48px 40px", textAlign: "center", boxShadow: "0 24px 64px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,0.2),transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.2),transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>{pct >= 80 ? "🏆" : pct >= 50 ? "👏" : "📚"}</div>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Quiz Complete!</h2>
          <div style={{ fontSize: 64, fontWeight: 900, background: "linear-gradient(90deg,#FF6B35,#F7931E,#FCD34D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>{pct}%</div>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 32, fontSize: 15 }}>You got {score} out of {QUIZ_QUESTIONS.length} correct</p>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 20, marginBottom: 28, textAlign: "left" }}>
            {answers.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < answers.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <span style={{ fontSize: 18 }}>{a.isCorrect ? "✅" : "❌"}</span>
                <div>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{a.q}</div>
                  {!a.isCorrect && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Correct: {QUIZ_QUESTIONS[i].opts[a.correct]}</div>}
                </div>
              </div>
            ))}
          </div>
          <button onClick={restart} style={{ background: "linear-gradient(135deg,#FF6B35,#F7931E)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,107,53,0.4)" }}>Try Again 🔄</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 660, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#0f1a2e)", borderRadius: 20, padding: "28px 32px", marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: 0 }}>🧠 Heritage Quiz</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "4px 0 0" }}>Question {current + 1} of {QUIZ_QUESTIONS.length}</p>
          </div>
          <div style={{ background: "linear-gradient(135deg,#FF6B35,#F7931E)", borderRadius: 12, padding: "8px 18px", boxShadow: "0 4px 12px rgba(255,107,53,0.4)" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>⭐ {score}</span>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, height: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg,#FF6B35,#F7931E,#FCD34D)", borderRadius: 10, width: `${progress}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ background: "#fff", borderRadius: 20, padding: "32px 32px 28px", border: "1px solid #f0f0f0", marginBottom: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: 28, lineHeight: 1.5 }}>{q.q}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {q.opts.map((opt, i) => {
            const isCorrect = i === q.ans;
            const isSelected = i === selected;
            let bg = "#f9f9f9", border = "2px solid #f0f0f0", color = "#333", shadow = "none";
            if (selected !== null) {
              if (isCorrect) { bg = "linear-gradient(135deg,#E8F5E9,#F1F8E9)"; border = "2px solid #4CAF50"; color = "#2E7D32"; shadow = "0 4px 16px rgba(76,175,80,0.2)"; }
              else if (isSelected) { bg = "linear-gradient(135deg,#FFEBEE,#FFF3F3)"; border = "2px solid #EF5350"; color = "#C62828"; shadow = "0 4px 16px rgba(239,83,80,0.2)"; }
            }
            const optColors = ["#FF6B35","#8B5CF6","#10B981","#F59E0B"];
            return (
              <button key={i} onClick={() => handleAnswer(i)} style={{ background: bg, border, borderRadius: 14, padding: "14px 20px", textAlign: "left", cursor: selected !== null ? "default" : "pointer", color, fontSize: 15, fontWeight: 500, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 14, boxShadow: shadow }}>
                <span style={{ width: 32, height: 32, borderRadius: "50%", background: selected !== null ? (isCorrect ? "#4CAF50" : isSelected ? "#EF5350" : "#e5e7eb") : optColors[i], color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                  {selected !== null && isCorrect ? "✓" : selected !== null && isSelected && !isCorrect ? "✗" : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <button onClick={next} style={{ width: "100%", background: "linear-gradient(135deg,#FF6B35,#F7931E)", color: "#fff", border: "none", borderRadius: 14, padding: "16px", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(255,107,53,0.35)" }}>
          {current + 1 >= QUIZ_QUESTIONS.length ? "See Results 🏆" : "Next Question →"}
        </button>
      )}
    </div>
  );
};

export default QuizPage;
