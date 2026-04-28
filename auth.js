module.exports = (req, res, next) => {
  if (req.method !== 'POST') return next();

  const { path } = req;
  if (path === '/auth/login') {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user — plain text comparison (dev only)
    const users = req.app.db.get('users').value();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return flat user object with token (matches what AuthPage expects)
    const { password: _pw, ...safeUser } = user;
    res.json({ ...safeUser, token: 'mock-jwt-' + user.id });
  } else if (path === '/auth/signup') {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Check if email exists
    const users = req.app.db.get('users').value();
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Add new user (store plain password, compare plain on login)
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      pageVisits: {},
      toursRegistered: [],
      monumentsVisited: []
    };
    req.app.db.get('users').push(newUser).write();

    const { password: _p, ...safeNew } = newUser;
    res.json({ ...safeNew, token: 'mock-jwt-' + newUser.id });
  } else {
    next();
  }
};

