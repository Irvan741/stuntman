import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const catinSchema = z.object({
  uuid_user: z.string().optional(),
  nik_pria: z.string().max(16),
  nik_wanita: z.string().max(16),
  tgl_perkiraan_pernikahan: z.string().datetime().optional(),
  tgl_pernikahan: z.string().datetime(),
  di_kua: z.boolean(),
  kecamatan_pernikahan: z.string().max(7),
  kelurahan_pernikahan: z.string().max(10),
  alamat_pernikahan: z.string().max(255),
})

const updateSchema = z.object({
  uuid_user: z.string(),
  nik_pria: z.string().max(16),
  nik_wanita: z.string().max(16),
  tgl_perkiraan_pernikahan: z.string().datetime(),
  tgl_pernikahan: z.string().datetime(),
  di_kua: z.boolean(),
  kecamatan_pernikahan: z.string().max(7),
  kelurahan_pernikahan: z.string().max(10),
  alamat_pernikahan: z.string().max(255),
})

export const getCatins = async(req, res) => {
  const {nik} = req.query
  try{
    const catins = nik ? await db.pengantin.findOne({
      where: {
        nik_wanita: nik,
        deletedAt: null
      }
    })
    : await db.pengantin.findAll({
      where: {
        deletedAt: null
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(catins.length == 0) {
      return response.custom(res, {
        code: 200,
        message: "Catins is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: catins,
      message: "Get all catins succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all catins."
    })
  }
}

export const getByIdCatins = async(req, res) => {
  const {id} = req.params;
  try{
    const catins = await db.catin.findOne({
      where: {
        deletedAt: null,
        uuid: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!catins) {
      return response.custom(res, {
        code: 200,
        message: "no data with that id."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: catins,
      message: "Get catins succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting catins."
    })
  }
}


export const createCatin = async (req, res) => {
  try{
    const catin = catinSchema.parse(req.body)
    const create = await  db.pengantin.create(catin)
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data catin created succesfully."
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
        description: "Failed to create data catin."
      });
    }
  }
}

export const updateCatin = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.catin.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data catin. invalid id catin."})
    const catin = catinSchema.parse(req.body)
    const update = await db.catin.update({
      where: {uuid : id},
      data: catin
    })

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data catin updated succesfully.`
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
        description: "Failed to update data catin."
      });
    }
  }
}

export const deleteCatin = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.catin.findOne({where: {uuid: id, deletedAt: null}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data catin. invalid id catin."})
    const deleted = await db.catin.update({
      where: {uuid : id},
      data: {
        deletedAt: new Date().toISOString()
      }
    })
    response.success(res, {
      code: 200,
      length: 1,
      data: deleted,
      message: `Data catin deleted succesfully.`
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
        description: "Failed to delete data catin."
      });
    }
  }
}
