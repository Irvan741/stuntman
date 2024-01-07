import express from "express"
import {
  getKCatin,
  getByIdKCatin,
  createKCatin,
  updateKCatin,
  deleteKCatin
} from "../controllers/KesehatanCatinController.js"
import authJwt from "../middleware/index.js"

const router = express.Router()

router.get("/", getKCatin)
router.get("/:id", getByIdKCatin)
router.post("/", createKCatin)
router.patch("/:id", updateKCatin)
router.delete("/:id", deleteKCatin)
// router.patch("/:id", [authJwt.verifyToken, authJwt.isAuthorized], updateKUmum)
// router.delete("/:id", [authJwt.verifyToken, authJwt.isAuthorized], deleteKUmum)

export default router
