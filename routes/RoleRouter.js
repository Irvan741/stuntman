import express from "express"
import authJwt from "../middleware/authjwt.js"
import {
  getRoles,
  getByIdRoles,
  createRole,
  updateRole,
  deleteRole
} from "../controllers/RoleController.js"

const router = express.Router()

router.get("/", getRoles)
router.get("/:id", getByIdRoles)
router.post("/", [authJwt.verifyToken, authJwt.isAuthorized], createRole)
router.patch("/:id", [authJwt.verifyToken, authJwt.isAuthorized], updateRole)
router.delete("/:id", [authJwt.verifyToken, authJwt.isAuthorized], deleteRole)

export default router
