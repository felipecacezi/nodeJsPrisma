const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    listarPosts: async function(params) {

        let post = null
        let responseObj = null

        try {

            if (params.id) {
                post = await prisma.post.findUnique({
                    where: { id: parseInt(params.id) }
                })
            } else {
                post = await prisma.post.findMany()
            }

            responseObj = {
                data: [
                    post
                ],
                status: 200,
                msg: 'Sucesso'
            }

        } catch (error) {
            responseObj = {
                data: [],
                status: 500,
                msg: 'Ocorreu algum erro ao encontrar os posts'
            }
        }

        return responseObj
    }

}