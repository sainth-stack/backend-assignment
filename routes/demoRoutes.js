import express from 'express'
const router = express.Router()
import { demoRequest, sendResetLink } from '../controllers/demo.js'
router.post('/demo-request', demoRequest)
router.post('/send-reset-link', sendResetLink)
export default router