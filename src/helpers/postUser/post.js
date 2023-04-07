const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    criarPost: async function(content, userId){
        let responseObj = null
        try {

            const { id } = await prisma.post.create({
                data: {
                    content,
                    userId
                }
            })

            responseObj = {
                data: [
                    {
                        id
                    }
                ],
                status: 200,
                msg: 'Post criado com sucesso'
            }

        } catch (error) {
            console.log(error)
            responseObj = {
                data: [],
                status: 500,
                msg: 'Impossivel cadastrar um novo post, entre em contato com o suporte'
            }
        }

        return responseObj
    },

    validarDadosInsert: function(userId, content){

        validacao = {
            status: 200,
            msg: 'Campos validados com sucesso'
        };

        if (!userId) {
            validacao = {
                status: 422,
                msg: 'O post precisa estar vinculado a um usuario'
            }
            return validacao
        }

        if (!content) {
            validacao = {
                status: 422,
                msg: 'O post precisa ter um conteudo valido'
            }
            return validacao
        }
        return validacao
    }

}