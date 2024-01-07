import express from "express"
import authJwt from "../middleware/index.js"
import {
  getPemeriksaanBaduta,
  getByIdPemeriksaanBaduta,
  createPemeriksaanBaduta,
  updatePemeriksaanBaduta,
  deletePemeriksaanBaduta
} from "../controllers/PemeriksaanBadutaController.js"
import authJWT from "../middleware/index.js"

const router = express.Router()

router.get("/", getPemeriksaanBaduta)
router.get("/:id", getByIdPemeriksaanBaduta)
router.post("/", createPemeriksaanBaduta)
router.patch("/:id", updatePemeriksaanBaduta)
router.delete("/:id", deletePemeriksaanBaduta)

export default router
