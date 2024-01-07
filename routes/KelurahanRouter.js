import express from "express"
import {
  getKelurahan,
  getByIdKelurahan,
} from "../controllers/KelurahanController.js"

const router = express.Router()

router.get("/", getKelurahan)
router.get("/:id", getByIdKelurahan)

export default router