const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router
    .get('/pessoas', PessoaController.selecionaPessoasAtivas)
    .get('/pessoas/all', PessoaController.selecionaTodasPessoas)
    .get('/pessoas/:id', PessoaController.selecionaPessoa)
    .post('/pessoas', PessoaController.criaPessoa)
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
    .put('/pessoas/:id', PessoaController.atualizaPessoa)
    .delete('/pessoas/:id', PessoaController.deletePessoa)
    .get('/pessoas/:estudanteId/matricula', PessoaController.selecionaMatriculaAluno)
    .get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.selecionaMatriculaTurma)
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.selecionaMatricula)
    .get('/pessoas/matricula/lotadas', PessoaController.selecionaTurmasLotadas)
    .post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
    .put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
    .delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletaMatricula)

module.exports = router;