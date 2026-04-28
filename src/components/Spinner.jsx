const Spinner = ({ size = 32, color = "#FF6B35", text = "" }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 32 }}>
    <div style={{
      width: size, height: size, borderRadius: "50%",
      border: `3px solid ${color}22`,
      borderTop: `3px solid ${color}`,
      animation: "spin 0.7s linear infinite"
    }} />
    {text && <span style={{ fontSize: 13, color: "#888" }}>{text}</span>}
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Spinner;
