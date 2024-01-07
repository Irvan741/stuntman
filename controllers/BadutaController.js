import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"


const badutaSchema = z.object({
    nik: z.string().max(255).refine(value => !!value),
    nama: z.string().max(255).refine(value => !!value),
    tempat_lahir: z.string().max(255).refine(value => !!value),
    tanggal_lahir: z.string().refine((value) => !isNaN(Date.parse(value))).refine(value => !!value),
    jenis_kelamin: z.string().length(1),
    urutan_anak_ke: z.number().int().refine(value => value !== undefined),
    status_urutan: z.number().int().refine(value => value !== undefined),
    tempat_persalinan: z.string().max(255).optional(),
    nama_tempat_persalinan: z.string().max(255).refine(value => !!value),
    umur_kehamilan_saat_lahir: z.number().int().refine(value => value !== undefined),
    panjang_badan_saat_lahir: z.number().refine(value => value !== undefined),
    berat_badan_saat_lahir: z.number().refine(value => value !== undefined),
    pemberian_asi_exclusive: z.boolean().refine(value => value !== undefined),
    nik_orang_tua: z.string().max(255).refine(value => !!value),
    uuid_petugas: z.string().max(255).refine(value => !!value)
});

const updateSchema = z.object({
  nik: z.string().max(255).optional(),
  nama: z.string().max(255).optional(),
  tempat_lahir: z.string().max(255).optional(),
  tanggal_lahir: z.string().refine((value) => !isNaN(Date.parse(value))).optional(),
  jenis_kelamin: z.string().length(1).optional(),
  urutan_anak_ke: z.number().int().optional(),
  status_urutan: z.number().int().optional(),
  tempat_persalinan: z.string().max(255).optional(),
  nama_tempat_persalinan: z.string().max(255).optional(),
  umur_kehamilan_saat_lahir: z.number().int().optional(),
  panjang_badan_saat_lahir: z.number().optional(),
  berat_badan_saat_lahir: z.number().optional(),
  pemberian_asi_exclusive: z.boolean().optional(),
  nik_orang_tua: z.string().max(255).optional(),
  uuid_petugas: z.string().max(255).optional(),
});

export const getbaduta = async(req, res) => {
  try{
    const badutas = await db.baduta.findAll({where: {deletedAt: null}})
    // console.log(badutas);
    if(badutas) {
      return response.success(res, {
        code: 200,
        data: badutas,
        message: "Get all badutas succesfully."
      })      
    }
    return response.custom(res, {
      code: 200,
      message: "badutas is empty."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: "Error getting all batutas.",
      error: e
    })
  }
}

export const getByIdBadutas = async(req, res) => {
  const {id} = req.params;
  try{
    const badutas = await db.baduta.findOne({
      where: {
        deletedAt: null,
        uuid: id,
      },
      orderBy: {
        createdAt: 'desc',
      }
    })
    if(!badutas) {
      return response.custom(res, {
        code: 200,
        message: "no data with that id."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: badutas,
      message: "Get badutas succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting badutas."
    })
  }
}

export const createBaduta = async (req, res) => {
  try{
    const checkNik = await db.dataPenduduk.findOne({
      where: {nik: req.body.nik_orang_tua}
    })
    if(!checkNik){
      return res.sendStatus(404).send({
        message: "NIK tidak terdaftar"
      })
    }
    const baduta = badutaSchema.parse(req.body)
    const create = await  db.baduta.create(baduta)
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data baduta created succesfully."
    })
  }catch(e){
    if (e instanceof z.ZodError) {
      response.error(res, {
        code: 406,
        message: e.errors,
        description: "Input tidak valid."
      });
    } else {
      response.error(res, {
        code: 400,
        message: e.message,
        description: "Failed to create data baduta."
      });
    }
  }
}

export const updateBaduta = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.baduta.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data baduta. invalid id baduta."})
    const baduta = badutaSchema.parse(req.body)
    const update = await db.baduta.update({
      where: {uuid : id},
      data: baduta
    })

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data baduta updated succesfully.`
    })
  }catch(e){
    if (e instanceof z.ZodError) {
      response.error(res, {
        code: 406,
        message: e.errors,
        description: `Input tidak valid.`,
        detail: `${e.errors[0].path[0]} -> ${e.errors[0].message}.`
      });
    } else {
      response.error(res, {
        code: 400,
        message: e.message,
        description: "Failed to update data baduta."
      });
    }
  }
}

export const deleteBaduta = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.baduta.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data baduta. invalid id baduta."})
    const deleted = await db.baduta.update({
      where: {uuid : id},
      data: {
        deletedAt: new Date().toISOString()
      }
    })
    response.success(res, {
      code: 200,
      length: 1,
      data: deleted,
      message: `Data baduta deleted succesfully.`
    })
  }catch(e){
    if (e instanceof z.ZodError) {
      response.error(res, {
        code: 406,
        message: e.errors,
        description: `Input tidak valid.`,
        detail: `${e.errors[0].path[0]} -> ${e.errors[0].message}.`
      });
    } else {
      response.error(res, {
        code: 400,
        message: e.message,
        description: "Failed to delete data baduta."
      });
    }
  }
}
