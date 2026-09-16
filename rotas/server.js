import express from "express";
const app = express();
const PORT = 8000;

app.use(express.json());
import cursos from "./cursos.js";
import alunos from "./alunos.js";
import professores from "./professores.js";
app.use(cursos);
app.use(alunos);
app.use(professores);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
