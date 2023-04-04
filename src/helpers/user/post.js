const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {

    criarUsuario: async function(name, email){
        let responseObj = null
        try {

            const { id } = await prisma.user.create({
                data: {
                    name,
                    email
                }
            })

            responseObj = {
                data: [
                    {
                        id
                    }
                ],
                status: 200,
                msg: 'Usuário cadastrado com sucesso'
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
                        msg: 'Impossivel cadastrar um novo usuário, entre em contato com o suporte'
                    }
                break;
            }

        }

        return responseObj
    },

    validarDados: function(name, email){

        validacao = {
            status: 200,
            msg: 'Campos validados com sucesso'
        };

        if (!name) {
            validacao = {
                status: 422,
                msg: 'O campo name não pode ser vazio'
            }
            return validacao
        }

        if (!email) {
            validacao = {
                status: 422,
                msg: 'O campo email não pode ser vazio'
            }
            return validacao
        }
        return validacao
    }

}