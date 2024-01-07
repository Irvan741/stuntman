import express from "express"
import {
  refreshToken,
  signin,
  signup,
} from "../controllers/AuthController.js"

const router = express.Router()

// router.get("/", sign)
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/refreshtoken", refreshToken)

export default router
