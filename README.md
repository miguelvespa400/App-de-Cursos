# App-de-Cursos

API para gerenciamento de alunos, cursos e professores.

## Como executar

Entre na pasta `rotas` e instale as dependencias:

```powershell
cd rotas
npm install
npm start
```

O servidor sera iniciado em:

```text
http://localhost:8000
```

## Rotas principais

- `GET /alunos`
- `GET /cursos`
- `GET /professores`
- `POST /alunos`
- `POST /cursos`
- `POST /professores`
- `PUT /cursos/:id`
- `PUT /professores/:id`
- `DELETE /cursos/:id`
- `DELETE /professores/:id`
