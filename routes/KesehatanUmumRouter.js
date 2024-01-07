import express from "express"
import {
  getKUmum,
  getByIdKUmum,
  createKUmum,
  updateKUmum,
  deleteKUmum
} from "../controllers/KesehatanUmumController.js"
import authJwt from "../middleware/index.js"

const router = express.Router()

router.get("/", getKUmum)
router.get("/:id", getByIdKUmum)
router.post("/", createKUmum)
router.patch("/:id", updateKUmum)
router.delete("/:id", deleteKUmum)

export default router
