// server.js
// Backend proxy for The Odds API with simple in-memory caching.
// Usage: copy .env.example to .env and set API_KEY, then: npm install && npm start

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.warn('⚠️  Missing API_KEY in .env. Set API_KEY=your-odds-api-key');
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple in-memory cache with TTL
const cache = new Map();
function setCache(key, data, ttlMs = 60_000) {
  cache.set(key, { data, expires: Date.now() + ttlMs });
}
function getCache(key) {
  const entry = cache.get(key);
  if (entry && entry.expires > Date.now()) return entry.data;
  cache.delete(key);
  return null;
}

// Helper: build URL for The Odds API
function buildOddsUrl({ sport, regions, markets, oddsFormat, dateFormat }) {
  const params = new URLSearchParams({
    apiKey: API_KEY || '',
    regions: regions || 'eu',
    markets: markets || 'h2h',
    oddsFormat: oddsFormat || 'decimal',
    dateFormat: dateFormat || 'iso',
  });
  const base = sport && sport !== 'upcoming'
    ? `https://api.the-odds-api.com/v4/sports/${sport}/odds/`
    : `https://api.the-odds-api.com/v4/sports/upcoming/odds/`;
  return `${base}?${params.toString()}`;
}

// GET /api/sports - list available sports
app.get('/api/sports', async (req, res) => {
  try {
    const cacheKey = 'sports';
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`;
    const r = await fetch(url);
    if (!r.ok) {
      const txt = await r.text();
      return res.status(r.status).json({ error: 'odds-api-error', details: txt });
    }
    const data = await r.json();
    setCache(cacheKey, data, 10 * 60_000); // cache 10 min
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server-error' });
  }
});

// GET /api/odds?sport=soccer_brazil_campeonato&regions=eu&markets=h2h
app.get('/api/odds', async (req, res) => {
  try {
    const q = {
      sport: req.query.sport || 'soccer_conmebol_copa_libertadores',
      regions: req.query.regions || 'eu',
      markets: req.query.markets || 'h2h',
      oddsFormat: req.query.oddsFormat || 'decimal',
      dateFormat: req.query.dateFormat || 'iso',
    };

    const cacheKey = JSON.stringify(q);
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    const url = buildOddsUrl(q);
    const r = await fetch(url);
    if (!r.ok) {
      const txt = await r.text();
      return res.status(r.status).json({ error: 'odds-api-error', details: txt });
    }
    const data = await r.json();
    setCache(cacheKey, data, 60_000); // cache 60s
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server-error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Odds MVP running at http://localhost:${PORT}`);
});
