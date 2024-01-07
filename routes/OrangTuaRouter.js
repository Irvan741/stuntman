import express from "express"
import {
  getOrangTua,
  getByIdOrangTua,
  createOrangTua,
  updateOrangTua,
  deleteOrangTua
} from "../controllers/OrangTuaController.js"
import authJwt from "../middleware/index.js"

const router = express.Router()

router.get("/", getOrangTua)
router.get("/:id", getByIdOrangTua)
router.post("/", [authJwt.verifyToken, authJwt.isAuthorized], createOrangTua)
router.patch("/:id", [authJwt.verifyToken, authJwt.isAuthorized], updateOrangTua)
router.delete("/:id", [authJwt.verifyToken, authJwt.isAuthorized], deleteOrangTua)

export default router
