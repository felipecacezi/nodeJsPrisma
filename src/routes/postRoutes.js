const {Router} = require('express')
const router = Router();
const controller = require('../controllers/postController')

router.post('/', controller.post)
router.get('/:id?', controller.get)
router.put('/', controller.put)
router.delete('/', controller.delete)

module.exports = router