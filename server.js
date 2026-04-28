const express = require('express');
const mysql = require('mysql2/promise');
const { MONUMENTS } = require('./src/data');

const app = express();
app.use(express.json());

// ── CORS ──────────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── DB POOL ───────────────────────────────────────────────────────────────
require('dotenv').config();
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME     || 'heritage_db',
  waitForConnections: true,
  connectionLimit: 10,
});

// ── AUTH ──────────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (!rows.length)
      return res.status(401).json({ error: 'Invalid email or password' });
    const { password: _pw, ...user } = rows[0];
    res.json({ ...user, token: 'mock-jwt-' + user.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ error: 'All fields are required' });
  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length)
      return res.status(409).json({ error: 'Email already registered' });

    const id = Date.now();
    await pool.query(
      'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, password, role]
    );
    res.status(201).json({ id, name, email, role, token: 'mock-jwt-' + id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── USERS ─────────────────────────────────────────────────────────────────
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, joined_at FROM users');
    // Add counts for each user
    const enriched = await Promise.all(rows.map(async u => {
      const [[{ tours }]]     = await pool.query('SELECT COUNT(*) as tours FROM tour_registrations WHERE user_id = ?', [u.id]);
      const [[{ monuments }]] = await pool.query('SELECT COUNT(*) as monuments FROM monument_visits WHERE user_id = ?', [u.id]);
      return { ...u, toursRegistered: tours, monumentsVisited: monuments };
    }));
    res.json(enriched);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, joined_at FROM users WHERE id = ?', [req.params.id]);
    if (!users.length) return res.status(404).json({ error: 'User not found' });
    const u = users[0];
    const [pvRows] = await pool.query('SELECT page, visits FROM page_visits WHERE user_id = ?', [u.id]);
    const [mvRows] = await pool.query('SELECT monument_id as id, monument_name as name, monument_city as city, visited_at as visitedAt FROM monument_visits WHERE user_id = ?', [u.id]);
    const [trRows] = await pool.query('SELECT monument_id as id, monument_name as name, monument_city as city, registered_at as registeredAt FROM tour_registrations WHERE user_id = ?', [u.id]);
    const pageVisits = {};
    pvRows.forEach(r => { pageVisits[r.page] = r.visits; });
    res.json({ ...u, pageVisits, monumentsVisited: mvRows, toursRegistered: trRows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── MONUMENTS ─────────────────────────────────────────────────────────────
app.get('/api/monuments', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM monuments');
    if (rows.length) {
      const parsed = rows.map(m => ({
        ...m,
        facts: typeof m.facts === 'string' ? m.facts.split('|') : (m.facts || []),
        tourPoints: typeof m.tour_points === 'string' ? m.tour_points.split('|') : (m.tourPoints || []),
      }));
      return res.json(parsed);
    }
    res.json(MONUMENTS);
  } catch (e) {
    res.json(MONUMENTS);
  }
});

app.post('/api/monuments', async (req, res) => {
  const { name, city, state, era, year, category, description, image, thumbnail, facts, tourPoints } = req.body;
  if (!name || !city || !category)
    return res.status(400).json({ error: 'Name, city and category are required' });
  try {
    const factsStr      = Array.isArray(facts)      ? facts.join('|')      : (facts || '');
    const tourPointsStr = Array.isArray(tourPoints) ? tourPoints.join('|') : (tourPoints || '');
    const [result] = await pool.query(
      'INSERT INTO monuments (name, city, state, era, year, category, description, image, thumbnail, facts, tour_points) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [name, city || '', state || '', era || '', year || '', category, description || '', image || '', thumbnail || '', factsStr, tourPointsStr]
    );
    const [rows] = await pool.query('SELECT * FROM monuments WHERE id = ?', [result.insertId]);
    const m = rows[0];
    res.status(201).json({
      ...m,
      facts: m.facts ? m.facts.split('|') : [],
      tourPoints: m.tour_points ? m.tour_points.split('|') : [],
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/monuments/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM monuments WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── ACTIVITY ──────────────────────────────────────────────────────────────
app.get('/api/activity/summary/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const [pvRows] = await pool.query('SELECT page, visits FROM page_visits WHERE user_id = ?', [userId]);
    const [mvRows] = await pool.query('SELECT monument_id as id, monument_name as name, monument_city as city, visited_at as visitedAt FROM monument_visits WHERE user_id = ?', [userId]);
    const [trRows] = await pool.query('SELECT monument_id as id, monument_name as name, monument_city as city, registered_at as registeredAt FROM tour_registrations WHERE user_id = ?', [userId]);

    const pageVisits = {};
    pvRows.forEach(r => { pageVisits[r.page] = r.visits; });

    res.json({ pageVisits, monumentsVisited: mvRows, toursRegistered: trRows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/activity/page-visit', async (req, res) => {
  const { userId, page } = req.body;
  try {
    await pool.query(
      'INSERT INTO page_visits (user_id, page, visits) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE visits = visits + 1',
      [userId, page]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/activity/monument-visit', async (req, res) => {
  const { userId, monumentId, monumentName, monumentCity } = req.body;
  try {
    await pool.query(
      'INSERT IGNORE INTO monument_visits (user_id, monument_id, monument_name, monument_city) VALUES (?, ?, ?, ?)',
      [userId, monumentId, monumentName, monumentCity]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/activity/tour-registration', async (req, res) => {
  const { userId, monumentId, monumentName, monumentCity } = req.body;
  try {
    await pool.query(
      'INSERT IGNORE INTO tour_registrations (user_id, monument_id, monument_name, monument_city) VALUES (?, ?, ?, ?)',
      [userId, monumentId, monumentName, monumentCity]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── DISCUSSIONS ───────────────────────────────────────────────────────────
app.get('/api/discussions/monument/:monumentId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM discussions WHERE monument_id = ? ORDER BY timestamp ASC',
      [req.params.monumentId]
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/discussions', async (req, res) => {
  const { monumentId, userId, text } = req.body;
  if (!monumentId || !userId || !text)
    return res.status(400).json({ error: 'Missing fields' });
  try {
    const [userRows] = await pool.query('SELECT name FROM users WHERE id = ?', [userId]);
    const userName = userRows.length ? userRows[0].name : 'Unknown';
    const id = Date.now();
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await pool.query(
      'INSERT INTO discussions (id, monument_id, user_id, user_name, text, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
      [id, monumentId, userId, userName, text, timestamp]
    );
    res.status(201).json({ id, monumentId, userId, userName, text, timestamp });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/discussions/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM discussions WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── START ─────────────────────────────────────────────────────────────────
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n✅ Backend running at http://localhost:${PORT}`);
  console.log(`   Database: heritage_db (MySQL)\n`);
});
