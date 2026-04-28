import { useState, useEffect } from "react";
import ImgWithFallback from "../components/ImgWithFallback";
import { MONUMENTS } from "../data";
import store from "../store";

const MonumentsPage = ({ user, onLoginClick }) => {
  const [monuments, setMonuments]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState(null);
  const [filter, setFilter]         = useState("All");
  const [search, setSearch]         = useState("");
  const [favorites, setFavorites]   = useState([]);
  const [tourStep, setTourStep]     = useState(0);
  const [activeTab, setActiveTab]   = useState("details");
  const [comments, setComments]     = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setLoading(true);
    import('../api').then(({ api }) =>
      api.get('/monuments')
        .then(data => setMonuments(Array.isArray(data) ? data : MONUMENTS))
        .catch(() => setMonuments(MONUMENTS))
        .finally(() => setLoading(false))
    );
  }, []);

  // Reload comments when selected monument changes (fetch from backend)
  useEffect(() => {
    if (selected) {
      store.getDiscussionsAsync(selected.id).then(setComments);
    }
  }, [selected]);

  const categories = ["All", ...new Set(monuments.map(m => m.category))];
  const filtered = monuments.filter(m =>
    (filter === "All" || m.category === filter) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.state.toLowerCase().includes(search.toLowerCase()))
  );
  const toggleFav = id => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const openDetails = (m) => {
    if (!user) { onLoginClick(); return; }
    store.trackMonumentVisit(user.id, m);
    setSelected(m);
    setTourStep(0);
    setActiveTab("details");
  };

  const submitComment = async () => {
    if (!commentText.trim() || !user || !selected) return;
    const c = await store.addComment(selected.id, user.id, user.name, commentText.trim());
    setComments(prev => [...prev, c]);
    setCommentText("");
  };

  const deleteComment = async (commentId) => {
    await store.deleteComment(selected.id, commentId, user.id, user.role === "Admin");
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 }}>Famous Monuments</h2>
        <p style={{ color: "#888", fontSize: 14 }}>Explore India's most iconic historical sites</p>
      </div>

      {/* Search & Filter */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search monuments..."
            style={{ width: "100%", padding: "10px 16px 10px 40px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fff" }} />
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 16px", borderRadius: 20, border: "1px solid", borderColor: filter === c ? "#FF6B35" : "#e5e7eb", background: filter === c ? "#FF6B35" : "#fff", color: filter === c ? "#fff" : "#555", fontSize: 13, cursor: "pointer", fontWeight: filter === c ? 600 : 400 }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Guest notice */}
      {!user && (
        <div style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 12, padding: "14px 20px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>🔒 Sign in to view full details, key facts, virtual tour stops, and join discussions</span>
          <button onClick={onLoginClick} style={{ background: "linear-gradient(135deg, #FF6B35, #F7931E)", color: "#fff", border: "none", borderRadius: 8, padding: "7px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Sign In</button>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #f0f0f0" }}>
              <div className="skeleton" style={{ height: 200 }} />
              <div style={{ padding: 16 }}>
                <div className="skeleton" style={{ height: 16, marginBottom: 8, width: "60%" }} />
                <div className="skeleton" style={{ height: 12, marginBottom: 12, width: "40%" }} />
                <div className="skeleton" style={{ height: 36 }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {filtered.length === 0 && <p style={{ color: "#888" }}>No monuments found.</p>}
        {filtered.map(m => (
          <div key={m.id} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{ position: "relative", height: 200 }}>
              <ImgWithFallback src={m.thumbnail} alt={m.name} category={m.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button onClick={() => toggleFav(m.id)} style={{ position: "absolute", top: 12, right: 12, background: favorites.includes(m.id) ? "#FF6B35" : "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 14 }}>
                {favorites.includes(m.id) ? "★" : "☆"}
              </button>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "16px 16px 12px" }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{m.name}</div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>📍 {m.city}, {m.state}</div>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ background: "#FFF5F0", color: "#FF6B35", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600 }}>{m.era}</span>
                <span style={{ background: "#F0F7FF", color: "#3B82F6", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600 }}>{m.category}</span>
                <span style={{ background: "#f5f5f5", color: "#888", fontSize: 11, padding: "3px 10px", borderRadius: 10 }}>💬 {store.getDiscussions(m.id).length}</span>
              </div>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.5, margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{m.description}</p>
              <button onClick={() => openDetails(m)} style={{ width: "100%", background: user ? "linear-gradient(135deg, #FF6B35, #F7931E)" : "#1a1a2e", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {user ? "View Details & Tour →" : "🔒 Sign In to View Details"}
              </button>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setSelected(null)}>
          <div style={{ background: "#fff", borderRadius: 20, maxWidth: 860, width: "100%", maxHeight: "90vh", overflow: "auto" }} onClick={e => e.stopPropagation()}>

            {/* Hero image */}
            <div style={{ position: "relative", height: 300 }}>
              <ImgWithFallback src={selected.image} alt={selected.name} category={selected.category} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "#fff", fontSize: 18 }}>✕</button>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "40px 28px 20px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ background: "rgba(255,107,53,0.9)", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600 }}>{selected.era}</span>
                  <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 10 }}>{selected.category}</span>
                </div>
                <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>{selected.name}</h2>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>📍 {selected.city}, {selected.state} &nbsp;·&nbsp; 🗓️ {selected.year}</div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #f0f0f0", padding: "0 28px" }}>
              {["details", "facts", "tour", "discussion"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "14px 20px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: activeTab === tab ? 700 : 400, color: activeTab === tab ? "#FF6B35" : "#888", borderBottom: activeTab === tab ? "2px solid #FF6B35" : "2px solid transparent", marginBottom: -1 }}>
                  {tab === "details" ? "📖 Overview" : tab === "facts" ? "✅ Key Facts" : tab === "tour" ? "🗺️ Virtual Tour" : `💬 Discussion (${comments.length})`}
                </button>
              ))}
            </div>

            <div style={{ padding: 28 }}>

              {/* Overview tab */}
              {activeTab === "details" && (
                <div>
                  <p style={{ color: "#444", fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>{selected.description}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                    {[
                      { label: "Location",   value: `${selected.city}, ${selected.state}`, icon: "📍" },
                      { label: "Built",      value: selected.year,                          icon: "🗓️" },
                      { label: "Era",        value: selected.era,                           icon: "🏛️" },
                      { label: "Category",   value: selected.category,                      icon: "🏷️" },
                      { label: "Tour Stops", value: `${selected.tourPoints.length} stops`,  icon: "🗺️" },
                      { label: "Key Facts",  value: `${selected.facts.length} facts`,       icon: "✅" },
                    ].map(item => (
                      <div key={item.label} style={{ background: "#f9f9f9", borderRadius: 12, padding: "14px 16px" }}>
                        <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                        <div style={{ fontSize: 11, color: "#aaa", fontWeight: 600, marginBottom: 2 }}>{item.label.toUpperCase()}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Facts tab */}
              {activeTab === "facts" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                  {selected.facts.map((f, i) => (
                    <div key={f} style={{ display: "flex", gap: 14, background: "#f9f9f9", padding: "16px", borderRadius: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #FF6B35, #F7931E)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontSize: 14, color: "#333", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tour tab */}
              {activeTab === "tour" && (
                <div>
                  <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 20, position: "relative", height: 220, background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ImgWithFallback src={selected.image} alt={selected.tourPoints[tourStep]} category={selected.category} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
                    <div style={{ position: "absolute", textAlign: "center" }}>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 6 }}>Stop {tourStep + 1} of {selected.tourPoints.length}</div>
                      <div style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>{selected.tourPoints[tourStep]}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    {selected.tourPoints.map((pt, i) => (
                      <button key={pt} onClick={() => setTourStep(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, border: i === tourStep ? "2px solid #FF6B35" : "1px solid #f0f0f0", background: i === tourStep ? "#FFF5F0" : "#fff", cursor: "pointer", textAlign: "left" }}>
                        <span style={{ width: 28, height: 28, borderRadius: "50%", background: i === tourStep ? "#FF6B35" : i < tourStep ? "#10B981" : "#e5e7eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i < tourStep ? "✓" : i + 1}</span>
                        <span style={{ fontSize: 14, color: i === tourStep ? "#FF6B35" : "#333", fontWeight: i === tourStep ? 600 : 400 }}>{pt}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setTourStep(s => Math.max(0, s - 1))} disabled={tourStep === 0} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "1px solid #e5e7eb", background: tourStep === 0 ? "#f9f9f9" : "#fff", color: tourStep === 0 ? "#ccc" : "#333", fontSize: 14, fontWeight: 600, cursor: tourStep === 0 ? "not-allowed" : "pointer" }}>← Previous</button>
                    <button onClick={() => setTourStep(s => Math.min(selected.tourPoints.length - 1, s + 1))} disabled={tourStep === selected.tourPoints.length - 1} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: tourStep === selected.tourPoints.length - 1 ? "#f9f9f9" : "linear-gradient(135deg, #FF6B35, #F7931E)", color: tourStep === selected.tourPoints.length - 1 ? "#ccc" : "#fff", fontSize: 14, fontWeight: 600, cursor: tourStep === selected.tourPoints.length - 1 ? "not-allowed" : "pointer" }}>Next →</button>
                  </div>
                </div>
              )}

              {/* Discussion tab */}
              {activeTab === "discussion" && (
                <div>
                  {/* Post comment */}
                  <div style={{ background: "#f9f9f9", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                    <textarea
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder={`Share your thoughts about ${selected.name}...`}
                      rows={3}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 10 }}
                    />
                    <button onClick={submitComment} disabled={!commentText.trim()} style={{ background: commentText.trim() ? "linear-gradient(135deg, #FF6B35, #F7931E)" : "#e5e7eb", color: commentText.trim() ? "#fff" : "#aaa", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: commentText.trim() ? "pointer" : "not-allowed" }}>
                      Post Comment
                    </button>
                  </div>

                  {/* Comments list */}
                  {comments.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#aaa", fontSize: 14, padding: "32px 0" }}>
                      No comments yet. Be the first to start the discussion! 💬
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {comments.map(c => (
                        <div key={c.id} style={{ background: "#f9f9f9", borderRadius: 12, padding: 16 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #FF6B35, #F7931E)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>{c.userName[0]}</div>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{c.userName}</div>
                                <div style={{ fontSize: 11, color: "#aaa" }}>{new Date(c.timestamp).toLocaleString()}</div>
                              </div>
                            </div>
                            {(user?.id === c.userId || user?.role === "Admin") && (
                              <button onClick={() => deleteComment(c.id)} style={{ background: "#FFEBEE", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", color: "#EF5350" }}>Delete</button>
                            )}
                          </div>
                          <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.6 }}>{c.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonumentsPage;
