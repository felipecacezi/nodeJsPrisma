const { criarPost, validarDadosInsert } = require('../helpers/postUser/post')
const { listarPosts } = require('../helpers/postUser/get')
const { alterarPost, validarDadosUpdate } = require('../helpers/postUser/put')
const { deletarPost, validarDadosDelete } = require('../helpers/postUser/delete')

exports.post = async function(req, res, next) {
    const { content, userId } = req.body

    const validacao = validarDadosInsert( content, userId)
    if (validacao.status != 200) {
        res.status(validacao.status).send(validacao)
    }

    const response = await criarPost( content, userId);
    res.status(response.status).send(response)
}

exports.get = async function(req,res,next){

    const { query } = req
    const posts = await listarPosts(query)
    res.status(posts.status).send(posts)

}

exports.put = async function(req, res, next) {

    const { id, content, userId } = req.body

    const validacao = validarDadosUpdate(id, content, userId)
    if (validacao.status != 200) {
        res.status(validacao.status).send(validacao)
    }

    const response = await alterarPost(id, content, userId);
    res.status(response.status).send(response)

}

exports.delete = async function(req, res, next) {

    const { id } = req.body

    const validacao = validarDadosDelete(id)
    if (validacao.status != 200) {
        res.status(validacao.status).send(validacao)
    }

    const response = await deletarPost(id);
    res.status(response.status).send(response)

}