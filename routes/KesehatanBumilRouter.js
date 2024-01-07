import express from "express"
import {
  getKBumil,
  getByIdKBumil,
  createKBumil,  
  updateKBumil,
  deleteKBumil,
} from "../controllers/KesehatanBumilController.js"
import authJwt from "../middleware/index.js"

const router = express.Router()

router.get("/", getKBumil)
router.get("/:id", getByIdKBumil)
router.post("/", createKBumil)
router.patch("/:id", updateKBumil)
router.delete("/:id",deleteKBumil)

export default router
