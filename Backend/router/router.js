import express from "express";
import { SendMessage,getMessage } from "../controller/Messagecontroller.js";
import {isAdminautthenticated} from '../middleWares/auth.js'
let router = express.Router()

router.post('/send',SendMessage)
router.get('/getmessage',isAdminautthenticated,getMessage)
export default router