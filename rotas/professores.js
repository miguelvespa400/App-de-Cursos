import express from "express";
import dados from "../DB/professores.js";

const router = express.Router();

function validarDadosProfessor({ nomedoProfessor, sobrenomedoProfessor, cursodoProfessor, GestordoProfessor }, parcial = false) {
  const campos = { nomedoProfessor, sobrenomedoProfessor, cursodoProfessor, GestordoProfessor };

  if (parcial && Object.values(campos).every((valor) => valor === undefined)) {
    return "Informe pelo menos um campo para atualizar";
  }

  for (const [campo, valor] of Object.entries(campos)) {
    if ((!parcial || valor !== undefined) && (typeof valor !== "string" || !valor.trim())) {
      return `O campo ${campo} deve ser um texto obrigatorio`;
    }
  }

  return null;
}

router.get("/professores", (req, res) => {
  res.json(dados);
});

router.get("/professores/:id", (req, res) => {
  const professor = dados.find((professor) => professor.id === Number(req.params.id));

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor nao encontrado" });
  }

  res.json(professor);
});

router.post("/professores", (req, res) => {
  const erro = validarDadosProfessor(req.body);

  if (erro) {
    return res.status(400).json({ mensagem: erro });
  }

  const novoProfessor = {
    id: dados.length ? Math.max(...dados.map((professor) => professor.id)) + 1 : 1,
    nomedoProfessor: req.body.nomedoProfessor,
    sobrenomedoProfessor: req.body.sobrenomedoProfessor,
    cursodoProfessor: req.body.cursodoProfessor,
    GestordoProfessor: req.body.GestordoProfessor
  };

  dados.push(novoProfessor);
  res.status(201).json(novoProfessor);
});

router.put("/professores/:id", (req, res) => {
  const professor = dados.find((item) => item.id === Number(req.params.id));

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor nao encontrado" });
  }

  const erro = validarDadosProfessor(req.body, true);

  if (erro) {
    return res.status(400).json({ mensagem: erro });
  }

  professor.nomedoProfessor = req.body.nomedoProfessor ?? professor.nomedoProfessor;
  professor.sobrenomedoProfessor = req.body.sobrenomedoProfessor ?? professor.sobrenomedoProfessor;
  professor.cursodoProfessor = req.body.cursodoProfessor ?? professor.cursodoProfessor;
  professor.GestordoProfessor = req.body.GestordoProfessor ?? professor.GestordoProfessor;

  res.json(professor);
});

router.delete("/professores/:id", (req, res) => {
  const indice = dados.findIndex((professor) => professor.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Professor nao encontrado" });
  }

  const [professorRemovido] = dados.splice(indice, 1);
  res.json(professorRemovido);
});

export default router;