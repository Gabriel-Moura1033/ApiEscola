const Services = require('./Services.js');
const database = require('../models')

class PessoasServices extends Services {
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async selecionaRegistrosAtivos(where = {}) {
        return database[this.nomeModelo].findAll( { where: { ...where } } )
    }

    async pegaTodosRegistros(where = {}) {
        return database[this.nomeModelo]
            .scope('todos')
            .findAll( { where: { ...where } } )
    }

    async cancelaPessoaeMatricula(estudanteId) {
        return database.sequelize.transaction(async tran => {
            await super.atualizaRegistro( { ativo: false }, estudanteId, { transaction: tran } )
            await this.matriculas.atualizaRegistros( { status: 'cancelado' }, 
                                                     { estudante_id: estudanteId },
                                                     { transaction: tran } )
        })

    }
    

}

module.exports = PessoasServices;