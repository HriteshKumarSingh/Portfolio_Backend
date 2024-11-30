import Router from "express"
import { sendMail } from "../controllers/get_in_touch.controller.js"

const router = Router()

router.route("/contactus").post(sendMail)

export default router