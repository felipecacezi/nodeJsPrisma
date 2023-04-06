const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    deletarUsuario: async function(id){
        let responseObj = null
        try {

            await prisma.user.delete({
                where: { id: parseInt(id) },
            })

            responseObj = {
                data: [
                    {
                        id
                    }
                ],
                status: 200,
                msg: `Usuário #${id} deletado com sucesso`
            }

        } catch (error) {
            responseObj = {
                data: [],
                status: 500,
                msg: `Impossivel deletar o usuário #${id}, entre em contato com o suporte`
            }
        }

        return responseObj
    },

    validarDadosDelete: function(id, name, email){

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