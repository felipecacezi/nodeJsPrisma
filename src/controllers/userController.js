const { criarUsuario, validarDados } = require('../helpers/user/post')

exports.post = async function(req, res, next) {
    const { name, email } = req.body

    const validacao = validarDados(name, email)
    if (validacao.status != 200) {
        res.status(validacao.status).send(validacao)
    }

    const response = await criarUsuario(name, email);
    res.status(response.status).send(response)
}

exports.get = async function(req,res,next){

}