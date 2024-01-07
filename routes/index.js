import express from "express"
import AuthRouter from "./AuthRouter.js"
import DataPendudukRoute from "./DataPendudukRouter.js"
import CatinRoute from "./CatinRouter.js"
import UserRoute from "./UserRouter.js"
import PemeriksaanRoute from "./PemeriksaanRouter.js"
import KesehatanCatinRoute from "./KesehatanCatinRouter.js"
import KesehatanUmumRoute from "./KesehatanUmumRouter.js"
import KesehatanBumilRoute from "./KesehatanBumilRouter.js"
import KesehatanPascaPersalinanRoute from "./KesehatanPascaPersalinanRouter.js"
import JenisInstansiRouter from "./JenisInstansiRouter.js"
import InstansiRouter from "./InstansiRouter.js"
import LevelInstansiRouter from "./LevelInstansiRouter.js"
import BadutaRouter from "./BadutaRouter.js"
import PemeriksaanBadutaRouter from "./PemeriksaanBadutaRouter.js"
import PembagianTTDRouter from "./PembagianTTDRouter.js"
import TransaksiTTDRouter from "./TransaksiTTDRouter.js"
import KecamatanRouter from "./KecamatanRouter.js"
import KelurahanRouter from "./KelurahanRouter.js"
import OperatorRouter from "./OperatorRouter.js"

const router = express.Router()

router.use("/data-kependudukan", DataPendudukRoute)
// Manage Auth
router.use("/auth", AuthRouter)

// Manage User
router.use("/catins", CatinRoute)
router.use("/jenis-instansi", JenisInstansiRouter)
router.use("/instansi", InstansiRouter)
router.use("/level-instansi", LevelInstansiRouter)
router.use("/users", UserRoute)
router.use("/operator", OperatorRouter)


// Manage TTD
router.use("/pembagian-ttd", PembagianTTDRouter)
router.use("/transaksi-ttd", TransaksiTTDRouter)


// Manage Pemeriksaan
router.use("/pemeriksaan", PemeriksaanRoute)
router.use("/kesehatan-catin", KesehatanCatinRoute)
router.use("/kesehatan-umum", KesehatanUmumRoute)
router.use("/kesehatan-bumil", KesehatanBumilRoute)
router.use("/kesehatan-pasca-persalinan", KesehatanPascaPersalinanRoute)

// Manage OrangTua
// router.use("/orang-tua", OrangTuaRouter)
router.use("/baduta", BadutaRouter)
router.use("/pemeriksaan-baduta", PemeriksaanBadutaRouter)

router.use("/kecamatan", KecamatanRouter)
router.use("/kelurahan", KelurahanRouter)

export default router