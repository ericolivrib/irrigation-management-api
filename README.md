<h1 align="center" id="title">Irrigation Management API</h1>

<p align="center"><img src="https://socialify.git.ci/ericolivrib/irrigation-management-api/image?description=1&amp;forks=1&amp;issues=1&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Plus&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

<p id="description">API de gerenciamento e registro de irrigações de usuários.</p>

  
  
<h2>🧐 Funcionalidades</h2>

*   Registro e autenticação de usuários com token JWT e codificação de senhas com BCrypt
*   Validação de dados de requisição com Zod
*   Manipulação global de erros com retorno de códigos de status HTTP
*   CRUD de Irrigações e Pivôs de Irrigação

<h2>🛠️ Execução</h2>

<strong>OBS:</strong> Para executar esta aplicação, é necessário ter o [Docker](https://www.docker.com/) instalado.

<p>1. Construa a imagem Docker do diretório raiz:</p>

```
docker build -t irrigation-management-api .
```

<p>2. Execute o container Docker da imagem construida:</p>

```
docker run -p 3000:3000 -d irrigation-management-api:latest
```

<p>3. A aplicação irá iniciar na URL abaixo:</p>

```
http://localhost:3000/
```
  
  
<h2>💻 Tecnologias</h2>

*   Node.js
*   Express.js
*   Zod
*   JWT
*   TypeScript
