import { useState } from "react";

const FALLBACK_ICONS = {
  "Mausoleum":      "🕌",
  "Ancient City":   "🏛️",
  "Minaret":        "🗼",
  "Rock-cut Caves": "🪨",
  "Royal Palace":   "🏯",
  "Arch Monument":  "🌉",
};

const ImgWithFallback = ({ src, alt, style, category }) => {
  const [status, setStatus] = useState("loading"); // loading | loaded | error

  const h = style?.height || 200;
  const iconSize = Math.min(Number(h), 200) * 0.35;

  if (status === "error") {
    return (
      <div style={{
        ...style,
        background: "linear-gradient(135deg, #1a2a3a, #0F1923)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        <span style={{ fontSize: iconSize }}>{FALLBACK_ICONS[category] || "🏛️"}</span>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textAlign: "center", padding: "0 12px" }}>{alt}</span>
      </div>
    );
  }

  return (
    <div style={{ ...style, position: "relative" }}>
      {status === "loading" && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }} />
      )}
      <img
        src={src}
        alt={alt}
        style={{ ...style, display: status === "loading" ? "none" : "block" }}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
};

export default ImgWithFallback;
