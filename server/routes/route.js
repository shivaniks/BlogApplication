import express from 'express'
import signup from '../controller/user.js'
import { login } from '../controller/user.js'
import { uploadimage } from '../controller/image-controller.js'
import upload from '../utils/upload.js'


const router = express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.post('/file/upload', upload.single('file'),uploadimage)
export default router