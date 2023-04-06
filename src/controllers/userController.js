const { criarUsuario, validarDadosInsert } = require('../helpers/user/post')
const { listarUsuario } = require('../helpers/user/get')
const { alterarUsuario, validarDadosUpdate } = require('../helpers/user/update')
const { deletarUsuario, validarDadosDelete } = require('../helpers/user/delete')

exports.post = async function(req, res, next) {
    const { name, email } = req.body

    const validacao = validarDadosInsert(name, email)
    if (validacao.status != 200) {
        res.status(validacao.status).send(validacao)
    }

    const response = await criarUsuario(name, email);
    res.status(response.status).send(response)
}

exports.get = async function(req,res,next){

    const { query } = req
    const usuarios = await listarUsuario(query)
    res.status(usuarios.status).send(usuarios)

}

exports.put = async function(req, res, next) {

    const { id, name, email } = req.body

    const validacao = validarDadosUpdate(id, name, email)
    if (validacao.status != 200) {
        res.status(validacao.status).send(validacao)
    }

    const response = await alterarUsuario(id, name, email);
    res.status(response.status).send(response)

}

exports.delete = async function(req, res, next) {

    const { id } = req.body

    const validacao = validarDadosDelete(id)
    if (validacao.status != 200) {
        res.status(validacao.status).send(validacao)
    }

    const response = await deletarUsuario(id);
    res.status(response.status).send(response)

}