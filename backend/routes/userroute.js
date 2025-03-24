import {Router} from 'express'

import usercontroller from '../controller/usercontroller.js'

let router = Router()

router.get('/', usercontroller.getAllUser)
router.get('/:id', usercontroller.getUserById)


router.post('/login', usercontroller.loginUser)
router.post('/signup', usercontroller.createUser)


router.put('/:id', usercontroller.updatedUser)
router.delete('/:id', usercontroller.deletedUser)

export default router;


