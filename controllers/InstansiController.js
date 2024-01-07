import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const instansiSchema = z.object({
  name: z.string().max(255),
  alamat: z.string().max(255),
  kecamatan: z.string().length(7),
  kelurahan: z.string().length(10),
  jenis_instansi: z.string(),
  level_instansi: z.string(),
})

export const getInstansi = async(req, res) => {
  try{
    const instansi = await db.instansi.findAll({
      where: {
        deletedAt: null
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(instansi.length == 0) {
      return response.custom(res, {
        code: 200,
        message: "instansi is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: instansi,
      message: "Get all instansi succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all instansi."
    })
  }
}

export const getByIdInstansi = async(req, res) => {
  const {id} = req.params;
  try{
    const instansi = await db.instansi.findOne({
      where: {
        deletedAt: null
      }, 
      where: {
        uuid: id
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!instansi) {
      return response.custom(res, {
        code: 200,
        message: "no data with that id."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: instansi,
      message: "Get instansi succes."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting instansi."
    })
  }
}

export const createInstansi = async (req, res) => {
  try{
    const instansi = instansiSchema.parse(req.body)
    const create = await  db.instansi.create(instansi)
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data instansi created succesfully."
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
        description: "Failed to create data instansi."
      });
    }
  }
}

export const updateInstansi = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.instansi.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data instansi. invalid id instansi."})
    const instansi = instansiSchema.parse(req.body)
    const update = await db.instansi.update({
      where: {uuid : id},
      data: instansi
    })

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data instansi updated succesfully.`
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
        description: "Failed to update data instansi."
      });
    }
  }
}

export const deleteInstansi = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.instansi.findOne({where: {uuid: id , deletedAt: null}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data instansi. invalid id instansi."})
    const deleted = await db.instansi.update({
      where: {uuid : id},
      data: {
        deletedAt: new Date().toISOString()
      }
    })
    response.success(res, {
      code: 200,
      length: 1,
      data: deleted,
      message: `Data Instansi deleted succesfully.`
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
        description: "Failed to delete data Instansi."
      });
    }
  }
}