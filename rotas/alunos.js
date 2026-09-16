import express from "express";
import dados from "../DB/alunos.js";

const router = express.Router();

function validarDadosAluno({ nomedoaluno, idadedoaluno, cidadedoaluno }, parcial = false) {
  const campos = { nomedoaluno, idadedoaluno, cidadedoaluno };

  if (parcial && Object.values(campos).every((valor) => valor === undefined)) {
    return "Informe pelo menos um campo para atualizar";
  }

  if (!parcial || nomedoaluno !== undefined) {
    if (typeof nomedoaluno !== "string" || !nomedoaluno.trim()) {
      return "O nome do aluno deve ser um texto obrigatorio";
    }
  }

  if (!parcial || idadedoaluno !== undefined) {
    if (!Number.isInteger(idadedoaluno) || idadedoaluno < 1 || idadedoaluno > 120) {
      return "A idade do aluno deve ser um numero inteiro entre 1 e 120";
    }
  }

  if (!parcial || cidadedoaluno !== undefined) {
    if (typeof cidadedoaluno !== "string" || !cidadedoaluno.trim()) {
      return "A cidade do aluno deve ser um texto obrigatorio";
    }
  }

  return null;
}

router.get("/alunos", (req, res) => {
  res.json(dados);
});

router.get("/alunos/:id", (req, res) => {
  const aluno = dados.find((aluno) => aluno.id === Number(req.params.id));

  if (!aluno) {
    return res.status(404).json({ mensagem: "Aluno nao encontrado" });
  }

  res.json(aluno);
});

router.post("/alunos", (req, res) => {
  const { nomedoaluno, idadedoaluno, cidadedoaluno } = req.body;
  const erro = validarDadosAluno(req.body);

  if (erro) {
    return res.status(400).json({ mensagem: erro });
  }

  const novoAluno = {
    id: dados.length ? Math.max(...dados.map((aluno) => aluno.id)) + 1 : 1,
    nomedoaluno,
    idadedoaluno,
    cidadedoaluno
  };

  dados.push(novoAluno);
  res.status(201).json(novoAluno);
});

router.put("/alunos/:id", (req, res) => {
  const id = Number(req.params.id);
  const aluno = dados.find((aluno) => aluno.id === id);

  if (!aluno) {
    return res.status(404).json({ mensagem: "Aluno nao encontrado" });
  }

  const { nomedoaluno, idadedoaluno, cidadedoaluno } = req.body;
  const erro = validarDadosAluno(req.body, true);

  if (erro) {
    return res.status(400).json({ mensagem: erro });
  }

  aluno.nomedoaluno = nomedoaluno ?? aluno.nomedoaluno;
  aluno.idadedoaluno = idadedoaluno ?? aluno.idadedoaluno;
  aluno.cidadedoaluno = cidadedoaluno ?? aluno.cidadedoaluno;

  res.json(aluno);
});

router.delete("/alunos/:id", (req, res) => {
  const indice = dados.findIndex((aluno) => aluno.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Aluno nao encontrado" });
  }

  const [alunoRemovido] = dados.splice(indice, 1);
  res.json(alunoRemovido);
});

export default router;