const database = require('../models');

class PessoaController {
    static async pegaTodasPessoas(req, res) {

    try {
        const pessoas = await database.Pessoas.findAll();
        return res.status(200).json(pessoas);       
    } catch (error) {
       return res.status(500).json(error.message);
    }
    }

    static async selecionaPessoa(req, res) {
        const { id } = req.params

        try {
            const pessoa = await database.Pessoas.findOne( 
            { 
                where: { 
                    id: Number(id) 
                } 
            } 
            )
            return res.status(200).json(pessoa);
        } catch (error) {
           return res.status(500).json(error.message);
        }
    } 

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const  pessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(pessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req,res) {
        const novaInfo = req.body;
        const { id } = req.params;

        try {
            await database.Pessoas.update(novaInfo, {
                where: {
                    id: Number(id)
                }
            })

            // o método update não retorna os dados atualizados, portanto é necessário 
            // fazer a busca pelo ID para retornar para o Front/usuário.
            const pessoaAtualizada = await database.Pessoas.findOne( 
                { 
                    where: { 
                        id: Number(id) 
                    } 
                } 
                )
            
            return res.status(200).json(pessoaAtualizada);

        } catch (error) {
            return res.status(500).json(error.message);
        }

    }
    
    static async deletePessoa (req, res) {
        const { id } = req.params;

        try {
            await database.Pessoas.destroy( {
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

module.exports = PessoaController;