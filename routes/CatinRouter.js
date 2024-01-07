import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getCatins,
  getByIdCatins,
  createCatin,
  updateCatin,
  deleteCatin
} from "../controllers/CatinController.js"

const router = express.Router()

router.get("/", getCatins)
router.get("/:id", getByIdCatins)
router.post("/", createCatin)
router.patch("/:id", updateCatin)
router.delete("/:id", deleteCatin)

export default router
