import express from "express"
import {
  getKecamatan,
  getByIdKecamatan,
} from "../controllers/KecamatanController.js"

const router = express.Router()

router.get("/", getKecamatan)
router.get("/:id", getByIdKecamatan)

export default router
