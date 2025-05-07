# Bem Estar Backend

Backend para a plataforma de monitoramento e gestão de saúde mental de jovens, utilizando Node.js, TypeScript, Firebase e Express.

## Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x (ou yarn)
- Conta no [Firebase](https://firebase.google.com/)

## Configuração do Ambiente

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd bem-estar-backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```
   FIREBASE_PROJECT_ID=seu_project_id
   FIREBASE_PRIVATE_KEY="sua_chave_privada" # Use aspas
   FIREBASE_CLIENT_EMAIL=seu_email_do_firebase@seuprojeto.iam.gserviceaccount.com
   ```

   - Para obter essas informações, acesse o console do Firebase > Configurações do Projeto > Contas de Serviço > Gerar nova chave privada.

4. **(Opcional) Ajuste outras configurações no arquivo `src/config/firebase.ts` se necessário.**

## Scripts Disponíveis

- `npm run dev` — Executa o servidor em modo desenvolvimento com recarregamento automático (`ts-node-dev`).
- `npm run build` — Compila o TypeScript para JavaScript na pasta `dist`.
- `npm start` — Executa o servidor a partir da build (`node dist/server.js`).

## Como Rodar

### Em desenvolvimento (recomendado para dev):

```bash
npm run dev
```
O servidor será iniciado a partir dos arquivos TypeScript em `src/`.

### Em produção:

```bash
npm run build
npm start
```
O servidor será iniciado a partir dos arquivos JavaScript compilados em `dist/`.


## Observações Importantes

- **A pasta `dist/` e o arquivo `.env` estão no `.gitignore`** e não devem ser versionados.
- **O cadastro de usuário é feito pelo backend:** envie `email` e `password` no corpo da requisição para `/users` (POST).
- **As rotas protegidas exigem autenticação via Firebase Auth.** Após o cadastro/login, obtenha o ID token no frontend e envie no header `Authorization: Bearer <token>`.

## Testando com Postman

1. Cadastre um usuário via `/users` (POST).
2. Faça login pelo frontend ou via API do Firebase Auth para obter o token JWT.
3. Use o token para acessar as rotas protegidas.

## Documentação da API (Swagger)

A documentação interativa da API está disponível via Swagger.

- Após iniciar o servidor, acesse: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
