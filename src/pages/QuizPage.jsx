import { useState } from "react";
import { QUIZ_QUESTIONS } from "../data";

const QuizPage = () => {
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore]       = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers]   = useState([]);

  const q = QUIZ_QUESTIONS[current];

  const handleAnswer = idx => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === q.ans;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(a => [...a, { q: q.q, selected: idx, correct: q.ans, isCorrect }]);
  };

  const next = () => {
    if (current + 1 >= QUIZ_QUESTIONS.length) { setFinished(true); }
    else { setCurrent(c => c + 1); setSelected(null); }
  };

  const restart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]); };

  if (finished) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center", border: "1px solid #f0f0f0" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 80 ? "🏆" : pct >= 50 ? "👏" : "📚"}</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>Quiz Complete!</h2>
          <div style={{ fontSize: 48, fontWeight: 900, color: "#FF6B35", marginBottom: 8 }}>{pct}%</div>
          <p style={{ color: "#888", marginBottom: 24 }}>You got {score} out of {QUIZ_QUESTIONS.length} correct</p>
          <div style={{ marginBottom: 24, textAlign: "left" }}>
            {answers.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 18 }}>{a.isCorrect ? "✅" : "❌"}</span>
                <div>
                  <div style={{ fontSize: 13, color: "#1a1a2e", fontWeight: 500 }}>{a.q}</div>
                  {!a.isCorrect && <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Correct: {QUIZ_QUESTIONS[i].opts[a.correct]}</div>}
                </div>
              </div>
            ))}
          </div>
          <button onClick={restart} style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Heritage Quiz</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Test your knowledge of Indian history, culture, and monuments</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 20, border: "1px solid #f0f0f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#888" }}>Question {current + 1} of {QUIZ_QUESTIONS.length}</span>
          <span style={{ fontSize: 13, color: "#FF6B35", fontWeight: 700 }}>Score: {score}</span>
        </div>
        <div style={{ background: "#f0f0f0", borderRadius: 10, height: 8 }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, #FF6B35, #F7931E)", borderRadius: 10, width: `${(current / QUIZ_QUESTIONS.length) * 100}%`, transition: "width 0.3s" }} />
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #f0f0f0", marginBottom: 20 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: 28, lineHeight: 1.4 }}>{q.q}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {q.opts.map((opt, i) => {
            let bg = "#f9f9f9", border = "#f0f0f0", color = "#333";
            if (selected !== null) {
              if (i === q.ans) { bg = "#E8F5E9"; border = "#4CAF50"; color = "#2E7D32"; }
              else if (i === selected && i !== q.ans) { bg = "#FFEBEE"; border = "#EF5350"; color = "#C62828"; }
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} style={{ background: bg, border: `2px solid ${border}`, borderRadius: 12, padding: "14px 20px", textAlign: "left", cursor: selected !== null ? "default" : "pointer", color, fontSize: 15, fontWeight: 500, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: border === "#f0f0f0" ? "#e5e7eb" : border, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <button onClick={next} style={{ width: "100%", background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {current + 1 >= QUIZ_QUESTIONS.length ? "See Results →" : "Next Question →"}
        </button>
      )}
    </div>
  );
};

export default QuizPage;
