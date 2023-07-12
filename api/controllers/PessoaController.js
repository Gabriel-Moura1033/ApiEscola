const database = require('../models');
const Sequelize = require('sequelize');

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

    static async selecionaMatriculaAluno (req, res) {
        const { estudanteId } = req.params

        try {
            const pessoa = await database.Pessoas.findOne( { where: { id: Number(estudanteId) } } )
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } 

    static async selecionaMatriculaTurma (req, res) {
        const { turmaId } = req.params

        try {
            const matriculas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        turma_id: Number(turmaId),
                        status: 'confirmado'
                    },
                    limit: 20,
                    order: [['estudante_id', 'desc']]
                })
            return res.status(200).json(matriculas);
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } 

    static async selecionaTurmasLotadas (req, res) {
        const lotacaoTurma = 2;

        try {
            const turmasLotadas = await database.Matriculas
                .findAndCountAll({
                    where : {
                        status: 'confirmado'
                    },
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                })
            return res.status(200).json(turmasLotadas.count);
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } 

    static async desativaEstudante (req, res) {
        const { estudanteId } = req.params;
        try {
            database.sequelize.transaction(async tran => {
                await database.Pessoas
                    .update( { ativo: false }, 
                             { where: { id: Number(estudanteId) } },
                             {transaction: tran}
                           )
                await database.Matriculas
                    .update( { status: 'cancelado' }, 
                             { where: { estudante_id: Number(estudanteId) } },
                             {transaction: tran}
                            )
                return res.status(200).json({ message: `O Estudante ${estudanteId} foi desativado com sucesso.` })
            })
          
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;