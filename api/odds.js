export default async function handler(req, res) {
  const response = await fetch('https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=a686083eb33fbf897c72bd47c1ddec9b&regions=eu&markets=h2h');

  if (!response.ok) {
    return res.status(500).json({ error: 'Erro ao buscar odds' });
  }

  const data = await response.json();
  res.status(200).json(data);
}
