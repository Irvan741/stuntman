import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getPemeriksaan,
  getPemeriksaanDetail,
  getByIdPemeriksaan,
  createPemeriksaan,
  updatePemeriksaan,
  deletePemeriksaan
} from "../controllers/PemeriksaanController.js"

const router = express.Router()

router.get("/", getPemeriksaan)
router.get("/detail",getPemeriksaanDetail)
router.get("/:id", getByIdPemeriksaan)
router.post("/", createPemeriksaan)
router.patch("/:id", updatePemeriksaan)
router.delete("/:id", deletePemeriksaan)

export default router
