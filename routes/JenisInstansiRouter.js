import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getJenisInstansis,
  getByIdJenisInstansis,
  createJenisInstansi,
  updateJenisInstansi,
  deleteJenisInstansi
} from "../controllers/JenisInstansiController.js"

const router = express.Router()

router.get("/", getJenisInstansis)
router.get("/:id", getByIdJenisInstansis)
router.post("/", createJenisInstansi)
router.patch("/:id", [authJwt.verifyToken, authJwt.isAuthorized], updateJenisInstansi)
router.delete("/:id", [authJwt.verifyToken, authJwt.isAuthorized], deleteJenisInstansi)


export default router
