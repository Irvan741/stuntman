import express from "express"
import {
  getLevelInstansis,
  getByIdLevelInstansis,
  createLevelInstansi,
  updateLevelInstansi,
  deleteLevelInstansi
} from "../controllers/LevelInstansiController.js"
import authJwt from "../middleware/index.js"

const router = express.Router()

router.get("/", getLevelInstansis)
router.get("/:id", getByIdLevelInstansis)
router.post("/", createLevelInstansi)
router.patch("/:id", [authJwt.verifyToken, authJwt.isAuthorized], updateLevelInstansi)
router.delete("/:id", [authJwt.verifyToken, authJwt.isAuthorized], deleteLevelInstansi)

export default router
