# Odds MVP (The Odds API)

MVP para listar **jogos com odds reais** usando The Odds API, com backend Express (Node.js) e **cache** para economizar créditos.

## ⚙️ Requisitos
- Node.js 18+
- Uma API Key da The Odds API (pode usar a gratuita para testes)

## 🚀 Como rodar (local)
1. Descompacte este projeto
2. Dentro da pasta, instale dependências:
   ```bash
   npm install
   ```
3. Copie `.env.example` para `.env` e edite:
   ```bash
   cp .env.example .env
   # Abra .env e coloque sua API_KEY=....
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Abra no navegador: http://localhost:3000

## 🔌 Endpoints
- `GET /api/sports` → lista de esportes disponíveis
- `GET /api/odds?sport=<sport_key>&regions=eu&markets=h2h&oddsFormat=decimal&dateFormat=iso`
  - Exemplo de `sport_key`: `soccer_brazil_campeonato`, `soccer_conmebol_copa_libertadores`, `upcoming`

## 🧠 Dicas
- O backend faz **cache (60s)** das odds para evitar gastar créditos à toa.
- Você pode mudar o TTL no código (`setCache(..., 60_000)`).

## 📦 Deploy rápido (VPS barata)
- Suba os arquivos numa VPS (Contabo/Hostinger/DigitalOcean)
- `npm install && npm start`
- Use um **reverse proxy** (Nginx) para domínio com HTTPS (opcional).

## 🛡️ Segurança
- **Nunca** coloque sua API Key no JavaScript do navegador.
- Mantenha a chave apenas no `.env` do **servidor**.
