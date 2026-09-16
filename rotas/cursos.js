import express from "express";
import dados from "../DB/cursos.js";
const router = express.Router();
  
function verificarCursoExiste(req, res, next) {
  const { id } = req.params;
  const index = dados.findIndex((curso) => curso.id == id);

  if (index < 0) {
    return res.status(404).json({ erro: "Não existe o curso procurado" });
  }

  req.id = id;
  req.index = index;
  return next();
}
router.get("/cursos", (req, res) => {
  if (dados.length === 0) {
    return res.status(404).json({ erro: "Não existe cursos atualmente" });
  }
  res.status(200).send(dados);
});


router.post("/cursos", (req, res) => {
  const { id, curso } = req.body;
  const idNumerico = Number(id);
  const existeCurso = dados.some((curso) => curso.id === idNumerico);

  if (existeCurso) {
    return res.status(400).json({ erro: "Id já existe." });
  }

  const novoCurso = {
    id: idNumerico,
    curso
  };

  dados.push(novoCurso);
  res.status(201).json(dados);
});

// Rota PUT: atualiza um curso
router.put("/cursos/:id", verificarCursoExiste, (req, res) => {
  const { id, index } = req;
  const { curso } = req.body;

  const atualizarCurso = {
    id: parseInt(id, 10),
    curso
  };
  dados[index] = atualizarCurso;

  res.json(curso);
});

// Rota DELETE: apaga um curso
router.delete("/cursos/:id", verificarCursoExiste, (req, res) => {
  const { index } = req;

  dados.splice(index, 1);
  res.json(dados);
});




export default router;

  