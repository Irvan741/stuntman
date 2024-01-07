import express from "express"
import {
  getKPengantin,
  getByIdKPengantin,
  createKPengantin,
  updateKPengantin,
  deleteKPengantin
} from "../controllers/KesehatanPengantinController.js"
import authJwt from "../middleware/index.js"

const router = express.Router()

router.get("/", getKPengantin)
router.get("/:id", getByIdKPengantin)
router.post("/", createKPengantin)
router.patch("/:id", updateKPengantin)
router.delete("/:id", deleteKPengantin)

export default router
