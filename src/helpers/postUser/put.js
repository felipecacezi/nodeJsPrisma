const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    alterarPost: async function(id, content, userId){
        let responseObj = null
        try {

            await prisma.post.update({
                where: { id: parseInt(id) },
                data: {
                    userId,
                    content
                },
            })

            responseObj = {
                data: [
                    {
                        id
                    }
                ],
                status: 200,
                msg: `Post #${id} alterado com sucesso`
            }

        } catch (error) {

            console.log(error)
            responseObj = {
                data: [],
                status: 500,
                msg: `Impossivel alterar o post #${id}, entre em contato com o suporte`
            }
        }

        return responseObj
    },

    validarDadosUpdate: function(id, userId, content){

        validacao = {
            status: 200,
            msg: 'Campos validados com sucesso'
        };

        if (!id) {
            validacao = {
                status: 422,
                msg: 'O campo id não pode ser vazio'
            }
            return validacao
        }

        if (!userId) {
            validacao = {
                status: 422,
                msg: 'O post deve estar vinculado a um usuario'
            }
            return validacao
        }

        if (!content) {
            validacao = {
                status: 422,
                msg: 'É necessário ter algum conteúdo no post'
            }
            return validacao
        }

        return validacao
    }

}