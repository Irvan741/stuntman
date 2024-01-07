import express from "express"
import {
  getKPascaPersalinan,
  getByIdKPascaPersalinan,
  createKPascaPersalinan,
  updateKPascaPersalinan,
  deleteKPascaPersalinan
} from "../controllers/KesehatanPascaPersalinanController.js"
import authJwt from "../middleware/index.js"

const router = express.Router()

router.get("/", getKPascaPersalinan)
router.get("/:id", getByIdKPascaPersalinan)
router.post("/", createKPascaPersalinan)
router.patch("/:id", updateKPascaPersalinan)
router.delete("/:id", deleteKPascaPersalinan)

export default router