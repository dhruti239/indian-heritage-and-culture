// Activity store — syncs with Spring Boot backend, falls back to in-memory
import { api } from "./api";

const store = {
  users: {},        // { [userId]: { pageVisits, toursRegistered, monumentsVisited, ... } }
  discussions: {},  // { [monumentId]: [...comments] }
  _listeners: {},   // { [userId]: [callback, ...] }

  // ── Subscription (lets React components re-render after async load) ──────
  subscribe(userId, cb) {
    if (!this._listeners[userId]) this._listeners[userId] = [];
    this._listeners[userId].push(cb);
    return () => {
      this._listeners[userId] = this._listeners[userId].filter(f => f !== cb);
    };
  },

  _notify(userId) {
    (this._listeners[userId] || []).forEach(cb => cb(this.users[userId]));
  },

  // ── Init user on login ────────────────────────────────────────────────────
  initUser(user) {
    if (!this.users[user.id]) {
      this.users[user.id] = {
        id: user.id, name: user.name, role: user.role, email: user.email,
        pageVisits: {}, toursRegistered: [], monumentsVisited: [],
        joinedAt: new Date().toISOString(),
      };
    }
    this._loadActivity(user.id);
  },

  async _loadActivity(userId) {
    try {
      const summary = await api.get(`/activity/summary/${userId}`);
      const u = this.users[userId];
      if (!u) return;
      u.pageVisits       = summary.pageVisits      || {};
      u.toursRegistered  = summary.toursRegistered  || [];
      u.monumentsVisited = summary.monumentsVisited || [];
      this._notify(userId);
    } catch (_) { /* backend offline — keep in-memory */ }
  },

  // ── Page visits ───────────────────────────────────────────────────────────
  async trackPageVisit(userId, page) {
    if (!userId || !this.users[userId]) return;
    const u = this.users[userId];
    u.pageVisits[page] = (u.pageVisits[page] || 0) + 1;
    this._notify(userId);
    try {
      await api.post("/activity/page-visit", { userId, page });
    } catch (_) {}
  },

  // ── Monument visits ───────────────────────────────────────────────────────
  async trackMonumentVisit(userId, monument) {
    if (!userId || !this.users[userId]) return;
    const u = this.users[userId];
    if (u.monumentsVisited.find(m => m.id === monument.id)) return;
    const entry = { id: monument.id, name: monument.name, city: monument.city, visitedAt: new Date().toISOString() };
    u.monumentsVisited.push(entry);
    this._notify(userId);
    try {
      await api.post("/activity/monument-visit", {
        userId, monumentId: monument.id, monumentName: monument.name, monumentCity: monument.city,
      });
    } catch (_) {}
  },

  // ── Tour registrations ────────────────────────────────────────────────────
  async trackTourRegistration(userId, monument) {
    if (!userId || !this.users[userId]) return;
    const u = this.users[userId];
    if (u.toursRegistered.find(t => t.id === monument.id)) return;
    const entry = { id: monument.id, name: monument.name, city: monument.city, registeredAt: new Date().toISOString() };
    u.toursRegistered.push(entry);
    this._notify(userId);
    try {
      await api.post("/activity/tour-registration", {
        userId, monumentId: monument.id, monumentName: monument.name, monumentCity: monument.city,
      });
    } catch (_) {}
  },

  getUser(userId) { return this.users[userId] || null; },
  getAllUsers()    { return Object.values(this.users); },

  // ── Discussions ───────────────────────────────────────────────────────────
  async getDiscussionsAsync(monumentId) {
    try {
      const data = await api.get(`/discussions/monument/${monumentId}`);
      this.discussions[monumentId] = data;
      return data;
    } catch (_) {
      return this.discussions[monumentId] || [];
    }
  },

  getDiscussions(monumentId) {
    return this.discussions[monumentId] || [];
  },

  async addComment(monumentId, userId, userName, text) {
    const temp = { id: Date.now(), userId, userName, text, timestamp: new Date().toISOString() };
    if (!this.discussions[monumentId]) this.discussions[monumentId] = [];
    this.discussions[monumentId].push(temp);
    try {
      const saved = await api.post("/discussions", { monumentId, userId, text });
      const idx = this.discussions[monumentId].findIndex(c => c.id === temp.id);
      if (idx !== -1) this.discussions[monumentId][idx] = { ...saved, userName };
      return { ...saved, userName };
    } catch (_) {
      return temp;
    }
  },

  async deleteComment(monumentId, commentId, userId, isAdmin = false) {
    if (this.discussions[monumentId]) {
      this.discussions[monumentId] = this.discussions[monumentId].filter(c => c.id !== commentId);
    }
    try {
      await api.delete(`/discussions/${commentId}?userId=${userId}&isAdmin=${isAdmin}`);
    } catch (_) {}
  },
};

export default store;
