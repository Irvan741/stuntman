import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getOperators,
  getByIdOperator,
  createOperator,
  updateOperator,
  deleteOperator
} from "../controllers/OperatorController.js"

const router = express.Router()

router.get("/", getOperators)
router.get("/:id", getByIdOperator)
router.post("/", createOperator)
router.patch("/:id", [authJwt.verifyToken, authJwt.isAuthorized], updateOperator)
router.delete("/:id", [authJwt.verifyToken, authJwt.isAuthorized], deleteOperator)


export default router
