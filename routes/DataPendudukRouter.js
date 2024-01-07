import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getDataPenduduks,
  getByIdDataPenduduks,
  createDataPenduduk,
  updateDataPenduduk,
  deleteDataPenduduk
} from "../controllers/DataPendudukController.js"

const router = express.Router()

router.get("/", getDataPenduduks)
router.get("/:id", getByIdDataPenduduks)
router.post("/", [authJwt.verifyToken, authJwt.isAuthorized], createDataPenduduk)
router.patch("/:id", [authJwt.verifyToken, authJwt.isAuthorized], updateDataPenduduk)
router.delete("/:id", [authJwt.verifyToken, authJwt.isAuthorized], deleteDataPenduduk)

export default router
