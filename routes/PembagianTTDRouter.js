import express from "express"
import {
  getPembagianTTDs,
  getByIdPembagianTTDs,
  createPembagianTTD,
  updatePembagianTTD,
  deletePembagianTTD
} from "../controllers/PembagianTTDController.js"
import authJwt from "../middleware/index.js"

const router = express.Router()

router.get("/", getPembagianTTDs)
router.get("/:id", getByIdPembagianTTDs)
router.post("/", createPembagianTTD)
router.patch("/:id", updatePembagianTTD)
router.delete("/:id", deletePembagianTTD)

export default router
