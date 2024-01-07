import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getTransaksiTTDs,
  getByIdTransaksiTTDs,
  createTransaksiTTD,
  updateTransaksiTTD,
  deleteTransaksiTTD,
  getByidPembagianTTDs
} from "../controllers/TransaksiTTDController.js"

const router = express.Router()

router.get("/", getTransaksiTTDs)
router.get("/:id", getByIdTransaksiTTDs)
router.post("/", createTransaksiTTD)
router.patch("/:id", updateTransaksiTTD)
router.delete("/:id", deleteTransaksiTTD)
router.get("/pembagian/:id",getByidPembagianTTDs)

export default router
