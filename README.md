# Rick and Morty

Este repositório contém uma aplicação que consome a API pública do Rick and Morty, salva personagens em um banco MySQL usando Laravel e exibe-os em um front-end Next.js.

---

## 📋 Sumário

1. [Clone do Repositório](#1-clone-do-repositório)  
2. [Configuração do Back-end (Laravel)](#2-configuração-do-back-end-laravel)  
3. [Rodar Migrations e Seeding](#3-rodar-migrations-e-seeding)  
4. [Testar Endpoints da API](#4-testar-endpoints-da-api-opcional)  
5. [Configuração do Front-end (Next.js)](#5-configuração-do-front-end-nextjs)  
6. [Executar a Aplicação Completa](#6-executar-a-aplicação-completa)  
7. [Estrutura do Projeto](#7-estrutura-do-projeto)  
8. [Experiência](#8-experiência)

---

## 1. Clone do Repositório

Clone via SSH:

```bash
git clone git@github.com:SpitSmoke/teste-dev.git
cd teste-dev
```

Ou, se não tiver chaves SSH:

```bash
git clone https://github.com/SpitSmoke/teste-dev.git
cd teste-dev
```

---

## 2. Configuração do Back-end (Laravel)

Acesse a pasta do back-end:

```bash
cd backend
```

Instale as dependências PHP:

```bash
composer install
```

Copie o arquivo de ambiente e gere uma nova chave:

```bash
cp .env.example .env
php artisan key:generate
```

Configure o MySQL no `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rickmorty_test
DB_USERNAME=root
DB_PASSWORD=sua_senha
```

---

## 3. Rodar Migrations e Seeding

Execute as migrations:

```bash
php artisan migrate
```

Ou use o comando customizado:

```bash
php artisan app:rick-and-morty-sync
```

Inicie o servidor Laravel:

```bash
php artisan serve --port=8000
```

> Depois disso, as tabelas estarão criadas com os personagens e o servidor estará rodando.

---

## 4. Testar Endpoints da API (Opcional)

### Listar personagens (página 1):

```bash
curl "http://localhost:8000/api/characters?page=1"
```

### Filtrar por nome e status:

```bash
curl "http://localhost:8000/api/characters?name=Rick&status=Alive"
```

### Detalhes de um personagem (ID 1):

```bash
curl "http://localhost:8000/api/characters/1"
```

Se tudo retornar JSON com `info` e `results`, o back-end está OK!

---

## 5. Configuração do Front-end (Next.js)

Abra outra aba do terminal e vá até o front-end:

```bash
cd ../frontend
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

Copie o ambiente:

```bash
cp .env.local.example .env.local
```

Ajuste a URL da API no `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 6. Executar a Aplicação Completa

Inicie o back-end (se não estiver rodando):

```bash
cd ../backend
php artisan serve --port=8000
```

Inicie o front-end:

```bash
cd ../frontend
npm run dev
# ou
yarn dev
```

Abra no navegador:

- Front-end: `http://localhost:3000`
- Acesse filtros e páginas de detalhes.

---

### 💡 macOS: atenção ao endereço

No macOS, o `php artisan serve` pode, em algumas configurações, escutar somente em `127.0.0.1` (IPv4) ou em `::1` (IPv6).

Assim que rodar o comando, veja qual URL é exibida no terminal (ex.: `http://127.0.0.1:8000` ou `http://0.0.0.0:8000`).

Caso apareça um IP diferente de `localhost`, atualize a variável no `.env.local` do front-end:

```env
NEXT_PUBLIC_API_URL=http://SEU_IP_RETORNADO:8000/api
```

Depois disso, reinicie o servidor do Next.js para que ele leia o novo `.env.local`.

---

## 7. Estrutura do Projeto

```
teste-dev/
├── backend/              # API Laravel
│   ├── app/
│   ├── database/         # migrations, seeders
│   ├── routes/api.php
│   └── .env.example
└── frontend/             # Next.js App
    ├── app/              # App Router
    ├── components/
    ├── lib/axios.ts
    └── .env.local.example
```

---

## 8. Experiência

Foi incrível desenvolver este projeto!  
Esperamos que você tenha curtido tanto quanto eu.

E para quem é curioso, tem uma **surpresinha escondida** 😉  
