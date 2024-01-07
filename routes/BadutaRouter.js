import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getbaduta,
  getByIdBadutas,
  createBaduta,
  updateBaduta,
  deleteBaduta
} from "../controllers/BadutaController.js"

const router = express.Router()

router.get("/", getbaduta)
router.get("/:id", getByIdBadutas)
router.post("/", createBaduta)
router.patch("/:id", updateBaduta)
router.delete("/:id", deleteBaduta)

export default router
