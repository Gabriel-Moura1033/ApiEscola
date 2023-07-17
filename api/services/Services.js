const database = require('../models')


class Services {
    constructor(nomeModelo) {
        this.nomeModelo = nomeModelo
    }

    async todosRegistros() {
        return database[this.nomeModelo].findAll()
    }

    async selecionaRegistro(id) {
        return database[this.nomeDoModelo].findAll({ where: { ...where } })
    }

    async criaRegistro(dados) {
        return database[this.nomeDoModelo].create(dados)
    }

    async atualizaRegistro(dadosNovos, id, transacao = {} ) {
        return database[this.nomeModelo]
            .update(dadosNovos, { where: {id: id}})
    }

    async atualizaRegistros(dadosNovos, where, transacao = {} ) {
        return database[this.nomeModelo]
            .update(dadosNovos, { where: {...where}})
    }

    async deleteRegistro(id) {
        return database[this.nomeDoModelo].destroy({ where: { id: id } })
    }

    async restauraRegistro(id) {
        return database[this.nomeDoModelo].restore({ where: { id: id } })
      }
    
    async consultaRegistroApagado(id) {
        return database[this.nomeDoModelo]
          .findOne({ paranoid: false, where: { id: Number(id) } })
      }
    
    async encontraEContaRegistros(where = {}, agregadores) {
        return database[this.nomeDoModelo]
          .findAndCountAll({ where: { ...where }, ...agregadores })
      }
}

module.exports = Services;