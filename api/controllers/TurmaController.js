const database = require('../models');
class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
      try {
        const todasAsTurmas = await database.Turmas.findAll()
        return res.status(200).json(todasAsTurmas)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async selecionaTurma(req, res) {
      const { id } = req.params

      try {
          const turma = await database.Turmas.findOne( 
          { 
              where: { 
                  id: Number(id) 
              } 
          } 
          )
          return res.status(200).json(turma);
      } catch (error) {
         return res.status(500).json(error.message);
      }
    } 

    static async criaTurma(req, res) {
      const novaTurma = req.body
      try {
          const  turmaCriada = await database.Turmas.create(novaTurma)
          return res.status(200).json(turmaCriada);
      } catch (error) {
          return res.status(500).json(error.message);
      }
    }

  static async atualizaTurma(req,res) {
      const novaInfo = req.body;
      const { id } = req.params;

      try {
          await database.Turmas.update(novaInfo, {
              where: {
                  id: Number(id)
              }
          })

          // o método update não retorna os dados atualizados, portanto é necessário 
          // fazer a busca pelo ID para retornar para o Front/usuário.
          const turmaAtualizada = await database.Turmas.findOne( 
              { 
                  where: { 
                      id: Number(id) 
                  } 
              } 
              )
          
          return res.status(200).json(turmaAtualizada);

      } catch (error) {
          return res.status(500).json(error.message);
      }

  }

  static async deletaTurma (req, res) {
      const { id } = req.params;

      try {
          await database.Turmas.destroy( {
              where: {
                  id: Number(id)
              }
          } )
          return res.status(200).json({ mensagem: `O registro do id ${id} foi deletado com sucesso.` })
      } catch (error) {
          return res.status(500).json(error.message);
      }
  }
}

module.exports = TurmaController;