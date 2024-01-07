import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getUsers,
  getUsersDetail,
  getByIdUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/UserController.js"

const router = express.Router()

router.get("/", getUsers)
router.get("/detail", getUsersDetail)
router.get("/:id", getByIdUsers)
router.post("/", createUser)
router.patch("/:id", updateUser)
router.delete("/:id", [authJwt.verifyToken, authJwt.isAuthorized], deleteUser)

export default router
