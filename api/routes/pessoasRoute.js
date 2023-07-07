const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router
    .get('/pessoas', PessoaController.pegaTodasPessoas)
    .get('/pessoas/:id', PessoaController.selecionaPessoa)
    .post('/pessoas', PessoaController.criaPessoa)



module.exports = router;