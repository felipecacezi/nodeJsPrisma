const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    alterarUsuario: async function(id, name, email){
        let responseObj = null
        try {

            await prisma.user.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    email
                },
            })

            responseObj = {
                data: [
                    {
                        id
                    }
                ],
                status: 200,
                msg: `Usuário #${id} alterado com sucesso`
            }

        } catch (error) {
            switch (error.code) {
                case 'P2002':
                    responseObj = {
                        data: [],
                        status: 400,
                        msg: 'O e-mail informado ja foi cadastrado'
                    }
                break;
                default:
                    responseObj = {
                        data: [],
                        status: 500,
                        msg: `Impossivel alterar o usuário #${id}, entre em contato com o suporte`
                    }
                break;
            }

        }

        return responseObj
    },

    validarDadosUpdate: function(id){

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