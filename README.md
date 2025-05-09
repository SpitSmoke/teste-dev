# Rick and Morty 

Este repositório contém uma aplicação consome a API pública do Rick and Morty, salva personagens em um banco MySQL usando Laravel e exibe-os em um front-end Next.js.

---

## 📋 Sumário

1. [Clone do Repositório](#1-clone-do-repositório)
2. [Configuração do Back-end (Laravel)](#2-configuração-do-back-end-laravel)
3. [Rodar Migrations e Seeding](#3-rodar-migrations-e-seeding)
4. [Testar Endpoints da API](#4-testar-endpoints-da-api)
5. [Configuração do Front-end (Next.js)](#5-configuração-do-front-end-nextjs)
6. [Executar a Aplicação Completa](#6-executar-a-aplicação-completa)
7. [Estrutura do Projeto](#7-estrutura-do-projeto)
8. [Contato](#8-contato)

---

## 1. Clone do Repositório

```bash
# Em seu terminal, clone o projeto via SSH:

git clone git@github.com:SpitSmoke/teste-dev.git
cd teste-dev
```

> Caso não tenha configurado chaves SSH, use o HTTPS:
>
> ```bash
> git clone https://github.com/SpitSmoke/teste-dev.git
> cd teste-dev
> ```

---

## 2. Configuração do Back-end (Laravel)

1. Acesse a pasta do back-end:

   ```bash
   cd backend
   ```

2. Instale as dependências PHP:

   ```bash
   composer install
   ```

3. Copie o arquivo de ambiente e gere uma nova chave:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Abra o `.env` e configure o MySQL:

   ```dotenv
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=rickmorty_test
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   ```

> **Dica:** crie um banco `rickmorty_test` no seu MySQL antes de prosseguir.

---

## 3. Rodar Migrations e Seeding

1. Execute as migrations para criar as tables:

   ```bash
   php artisan migrate
   ```

2. (Opcional) Popule o banco com dados iniciais:

   ```bash
   php artisan db:seed
   ```

3. (Alternativa) Se houver comando customizado para  utilize sync:

   ```bash
   php artisan app:rick-and-morty-sync
   ```

4. Depois inicie o servidor de desenvolvimento do Laravel:

   ```bash
   php artisan serve --port=8000
   ```

> Depois disso, as tabelas estarão criadas e com os personagens, e o servidor já vai estar no ar.

---

## 4. Testar Endpoints da API(Opcional)

Use **curl**, **Postman** ou **Insomnia**:

* **Listar personagens (página 1):**

  ```bash
  curl "http://localhost:8000/api/characters?page=1"
  ```

* **Filtrar por nome e status:**

  ```bash
  curl "http://localhost:8000/api/characters?name=Rick&status=Alive"
  ```

* **Detalhes de um personagem (ID 1):**

  ```bash
  curl "http://localhost:8000/api/characters/1"
  ```

Se tudo retornar JSON com `info` e `results`, o back-end está OK.

---

## 5. Configuração do Front-end (Next.js)

1. Abra uma nova aba/terminal e vá para a pasta do front-end:

   ```bash
   cd ../frontend
   ```

2. Instale dependências:

   ```bash
   npm install
   # ou yarn install
   ```

3. Copie e configure o ambiente:

   ```bash
   cp .env.local.example .env.local
   ```

4. No `.env.local`, ajuste a URL da API:

   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

---

## 6. Executar a Aplicação Completa

1. **Inicie o back-end** (se ainda não estiver rodando):

   ```bash
   cd ../backend
   php artisan serve --port=8000
   ```

2. **Inicie o front-end**:

   ```bash
   cd ../frontend
   npm run dev
   # ou yarn dev
   ```

3. **Abra no navegador**:

   * Front-end: `http://localhost:3000`
   * Acesse filtros e páginas de detalhes.

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

## 8. Contato

Foi incrível desenvolver este projeto! Esperamos que você tenha curtido tanto quanto nós.

E para quem é curioso, tem uma surpresinha escondida 😉 — explore as rotas e funcionalidades e descubra!
