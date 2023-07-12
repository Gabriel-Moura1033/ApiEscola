const database = require('../models');

class PessoaController {
    static async selecionaPessoasAtivas(req, res) {

    try {
        const pessoasAtivas = await database.Pessoas.findAll();
        return res.status(200).json(pessoasAtivas);       
    } catch (error) {
       return res.status(500).json(error.message);
    }
    }

    static async selecionaTodasPessoas(req, res) {

    try {
        const pessoas = await database.Pessoas.scope('todos').findAll();
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

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.restore( {where: { id: Number(id) } } )
            return res.status(200).json({ mensagem: `Id ${id} Restaurado com sucesso`})
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async selecionaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            const matricula = await database.Matriculas.findOne( 
            { 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                } 
            } 
            )
            return res.status(200).json(matricula);
        } catch (error) {
           return res.status(500).json(error.message);
        }
    } 

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const   novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const  matriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(matriculaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaMatricula(req,res) {
        const { estudanteId, matriculaId } = req.params
        const novaInfo = req.body;

        try {
            await database.Matriculas.update(novaInfo, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            // o método update não retorna os dados atualizados, portanto é necessário 
            // fazer a busca pelo ID para retornar para o Front/usuário.
            const matriculaAtualizada = await database.Matriculas.findOne( 
                { 
                    where: {
                        id: Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                } 
                )
            
            return res.status(200).json(matriculaAtualizada);

        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async deletaMatricula (req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            await database.Matriculas.destroy( {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            } )
            return res.status(200).json({ mensagem: `A matrícula ${matriculaId} do estudante ${estudanteId} foi deletada com sucesso.` })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


}

module.exports = PessoaController;