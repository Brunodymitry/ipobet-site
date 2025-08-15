
# Quick Start (GitHub + Render)

## 1) Subir para o GitHub (pelo Android/Termux ou PC)
```bash
# dentro da pasta do projeto
git init
git branch -M main
git add .
git commit -m "MVP odds (The Odds API)"
# troque USER e REPO pelo seu usuário e nome do repositório
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
```

> Observação: esta versão **inclui** o arquivo `.env` com a sua API key (a686083eb33fbf897c72bd47c1ddec9b).

## 2) Deploy grátis no Render
1. Acesse https://render.com e crie conta
2. New + Web Service → Conecte seu GitHub e escolha o repositório
3. Runtime: Node; Build Command: `npm install`; Start Command: `npm start`
4. Aguarde o deploy e abra a URL gerada

## 3) Rodar localmente
```bash
npm install
npm start
# abre http://localhost:3000
```
