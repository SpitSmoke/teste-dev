Rick and Morty

Este repositório contém uma aplicação que consome a API pública do Rick and Morty, salva personagens em um banco MySQL usando Laravel e exibe-os em um front-end Next.js.
📋 Sumário

    Clone do Repositório

    Configuração do Back-end (Laravel)

    Rodar Migrations e Seeding

    Testar Endpoints da API

    Configuração do Front-end (Next.js)

    Executar a Aplicação Completa

    Estrutura do Projeto

    Experiência

1. Clone do Repositório

# Em seu terminal, clone o projeto via SSH:

git clone git@github.com:SpitSmoke/teste-dev.git
cd teste-dev

    Caso não tenha configurado chaves SSH, use o HTTPS:

    git clone https://github.com/SpitSmoke/teste-dev.git
    cd teste-dev

2. Configuração do Back-end (Laravel)

    Acesse a pasta do back-end:

cd backend

Instale as dependências PHP:

composer install

Copie o arquivo de ambiente e gere uma nova chave:

cp .env.example .env
php artisan key:generate

Abra o .env e configure o MySQL:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=rickmorty_test
    DB_USERNAME=root
    DB_PASSWORD=sua_senha

3. Rodar Migrations e Seeding

    Execute as migrations para criar as tables:

php artisan migrate

(Alternativa) Utilize o sync customizado:

php artisan app:rick-and-morty-sync

Depois inicie o servidor de desenvolvimento do Laravel:

    php artisan serve --port=8000

    Depois disso, as tabelas estarão criadas e com os personagens, e o servidor já vai estar no ar.

4. Testar Endpoints da API (Opcional)

Use curl, Postman ou Insomnia:

    Listar personagens (página 1):

curl "http://localhost:8000/api/characters?page=1"

Filtrar por nome e status:

curl "http://localhost:8000/api/characters?name=Rick&status=Alive"

Detalhes de um personagem (ID 1):

    curl "http://localhost:8000/api/characters/1"

Se tudo retornar JSON com info e results, o back-end está OK.
5. Configuração do Front-end (Next.js)

    Abra uma nova aba/terminal e vá para a pasta do front-end:

cd ../frontend

Instale dependências:

npm install
# ou yarn install

Copie e configure o ambiente:

cp .env.local.example .env.local

No .env.local, ajuste a URL da API:

    NEXT_PUBLIC_API_URL=http://localhost:8000/api

6. Executar a Aplicação Completa

    Inicie o back-end (se ainda não estiver rodando):

cd ../backend
php artisan serve --port=8000

Inicie o front-end:

    cd ../frontend
    npm run dev
    # ou yarn dev

    Abra no navegador:

        Front-end: http://localhost:3000

        Acesse filtros e páginas de detalhes.

    💡 macOS: atenção ao endereço

    No macOS, o php artisan serve pode, em algumas configurações, escutar somente em 127.0.0.1 (IPv4) ou em um IPv6 padrão (::1).

    Assim que rodar o comando acima, veja no console qual URL ele fornece (ex.: http://127.0.0.1:8000 ou http://0.0.0.0:8000).

    Caso apareça um IP diferente de localhost ou 127.0.0.1, copie esse valor e, se necessário, atualize no seu front-end (arquivo .env.local) a variável de ambiente que aponta para a API, por exemplo:

    NEXT_PUBLIC_API_URL=http://SEU_IP_RETORNADO:8000/api

    Depois disso, reinicie o servidor do Next.js para que ele leia o novo .env.local.

7. Estrutura do Projeto

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

8. Experiência

Foi incrível desenvolver este projeto! Esperamos que você tenha curtido tanto quanto eu.

E para quem é curioso, tem uma surpresinha escondida 😉 — explore as rotas e funcionalidades e descubra!

