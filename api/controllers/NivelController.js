const database = require('../models');
class NivelController {

    static async pegaTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await database.Niveis.findAll()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async selecionaNivel(req, res) {
        const { id } = req.params

        try {
            const nivel = await database.Niveis.findOne( 
            { 
                where: { 
                    id: Number(id) 
                } 
            } 
            )
            return res.status(200).json(nivel);
        } catch (error) {
           return res.status(500).json(error.message);
        }
    } 

    static async criaNivel(req, res) {
        const novoNivel = req.body
        try {
            const  nivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(nivelCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaNivel(req,res) {
        const novaInfo = req.body;
        const { id } = req.params;

        try {
            await database.Niveis.update(novaInfo, {
                where: {
                    id: Number(id)
                }
            })

            // o método update não retorna os dados atualizados, portanto é necessário 
            // fazer a busca pelo ID para retornar para o Front/usuário.
            const nivelAtualizado = await database.Niveis.findOne( 
                { 
                    where: { 
                        id: Number(id) 
                    } 
                } 
                )
            
            return res.status(200).json(nivelAtualizado);

        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async deletaNivel (req, res) {
        const { id } = req.params;

        try {
            await database.Niveis.destroy( {
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

module.exports = NivelController