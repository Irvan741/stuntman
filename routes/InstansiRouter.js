import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getInstansi,
  getByIdInstansi,
  createInstansi,
  updateInstansi,
  deleteInstansi
} from "../controllers/InstansiController.js"

const router = express.Router()

router.get("/", getInstansi)
router.get("/:id", getByIdInstansi)
router.post("/", createInstansi)
router.patch("/:id", [authJwt.verifyToken, authJwt.isAuthorized], updateInstansi)
router.delete("/:id", [authJwt.verifyToken, authJwt.isAuthorized], deleteInstansi)


export default router
