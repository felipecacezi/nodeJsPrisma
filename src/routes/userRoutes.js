const {Router} = require('express')
const router = Router();
const controller = require('../controllers/userController')

router.post('/', controller.post)

module.exports = router