// public/app.js
const tz = 'America/Sao_Paulo';

function fmtTime(iso) {
  try {
    return new Date(iso).toLocaleString('pt-BR', { timeZone: tz, hour12: false });
  } catch {
    return iso;
  }
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function loadSports() {
  const select = document.getElementById('sportSelect');
  select.innerHTML = '<option value="upcoming">Próximos (todos)</option>';
  try {
    const sports = await fetchJSON('/api/sports');
    // Priorize futebol no topo
    const preferred = ['soccer_brazil_campeonato', 'soccer_conmebol_copa_libertadores', 'soccer_conmebol_copa_sudamericana'];
    const sorted = [
      ...sports.filter(s => preferred.includes(s.key)),
      ...sports.filter(s => !preferred.includes(s.key)),
    ];
    for (const s of sorted) {
      const opt = document.createElement('option');
      opt.value = s.key;
      opt.textContent = `${s.title} — ${s.key}`;
      select.appendChild(opt);
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadOdds() {
  const status = document.getElementById('status');
  const list = document.getElementById('list');
  const sport = document.getElementById('sportSelect').value || 'upcoming';
  status.textContent = 'Carregando...';
  list.innerHTML = '';

  try {
    const data = await fetchJSON(`/api/odds?sport=${encodeURIComponent(sport)}&regions=eu&markets=h2h&oddsFormat=decimal&dateFormat=iso`);
    if (!Array.isArray(data) || data.length === 0) {
      list.innerHTML = '<p>Nenhum evento encontrado.</p>';
      status.textContent = 'OK';
      return;
    }

    const frag = document.createDocumentFragment();
    data.forEach(ev => {
      const card = document.createElement('article');
      card.className = 'card';

      const header = document.createElement('div');
      header.className = 'card-header';
      header.innerHTML = `
        <div class="title">${ev.sport_title || ev.sport_key}</div>
        <div class="time">${fmtTime(ev.commence_time)}</div>
      `;

      const teams = document.createElement('div');
      teams.className = 'teams';
      teams.textContent = `${ev.home_team} vs ${ev.away_team}`;

      // Try to find a bookmaker with h2h market
      let outcomes = [];
      for (const bm of ev.bookmakers || []) {
        const m = (bm.markets || []).find(m => m.key === 'h2h');
        if (m && m.outcomes) {
          outcomes = m.outcomes;
          break;
        }
      }

      const odds = document.createElement('div');
      odds.className = 'odds';
      if (outcomes.length) {
        outcomes.forEach(o => {
          const box = document.createElement('div');
          box.className = 'odd-box';
          box.innerHTML = `<div class="label">${o.name}</div><div class="value">${o.price}</div>`;
          odds.appendChild(box);
        });
      } else {
        odds.innerHTML = '<small>Sem odds h2h disponíveis.</small>';
      }

      card.appendChild(header);
      card.appendChild(teams);
      card.appendChild(odds);
      frag.appendChild(card);
    });

    list.appendChild(frag);
    status.textContent = `OK • ${data.length} eventos`;
  } catch (err) {
    console.error(err);
    status.textContent = 'Erro ao carregar odds';
    list.innerHTML = `<pre class="error">${String(err).slice(0, 500)}</pre>`;
  }
}

document.getElementById('refreshBtn').addEventListener('click', loadOdds);
document.addEventListener('DOMContentLoaded', async () => {
  await loadSports();
  await loadOdds();
});
