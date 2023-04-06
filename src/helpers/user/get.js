const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    listarUsuario: async function(params) {

        let usuarios = null
        let responseObj = null

        try {

            if (params.id) {
                usuarios = await prisma.user.findUnique({
                    where: { id: parseInt(params.id) }
                })
            } else {
                usuarios = await prisma.user.findMany()
            }

            responseObj = {
                data: [
                    usuarios
                ],
                status: 200,
                msg: 'Sucesso'
            }

        } catch (error) {
            responseObj = {
                data: [],
                status: 500,
                msg: 'Ocorreu algum erro ao encontrar os usuários'
            }
        }

        return responseObj
    }

}