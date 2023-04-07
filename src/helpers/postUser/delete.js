const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    deletarPost: async function(id){
        let responseObj = null
        try {

            await prisma.post.delete({
                where: { id: parseInt(id) },
            })

            responseObj = {
                data: [
                    {
                        id
                    }
                ],
                status: 200,
                msg: `Post #${id} deletado com sucesso`
            }

        } catch (error) {
            responseObj = {
                data: [],
                status: 500,
                msg: `Impossivel deletar o post #${id}, entre em contato com o suporte`
            }
        }

        return responseObj
    },

    validarDadosDelete: function(id){

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

        return validacao
    }

}