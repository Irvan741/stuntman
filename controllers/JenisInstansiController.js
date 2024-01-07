import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const jenisInstansiSchema = z.object({
  name: z.string(),
})

export const getJenisInstansis = async(req, res) => {
  try{
    const jenisInstansi = await db.jenisInstansi.findAll({
      where: {
        deletedAt: null
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(jenisInstansi.length == 0) {
      return response.custom(res, {
        code: 200,
        message: "jenisInstansi is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: jenisInstansi,
      message: "Get all jenisInstansi succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all jenisInstansi."
    })
  }
}

export const getByIdJenisInstansis = async(req, res) => {
  const {id} = req.params;
  try{
    const jenisInstansi = await db.jenisInstansi.findOne({
      where: {
        deletedAt: null,
        uuid: id
      },
      
    })
    if(!jenisInstansi) {
      return response.custom(res, {
        code: 200,
        message: "jenisInstansi is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: jenisInstansi,
      message: "Get jenisInstansi success."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting jenisInstansi."
    })
  }
}

export const createJenisInstansi = async (req, res) => {
  try{
    // console.log(req.body);
    const jenisInstansi = jenisInstansiSchema.parse(req.body)
    // console.log(jenisInstansi);
    
    const create = await  db.jenisInstansi.create(jenisInstansi)
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data jenis instansi created succesfully."
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
        description: "Failed to create data jenis instansi."
      });
    }
  }
}

export const updateJenisInstansi = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.jenisInstansi.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data jenisInstansi. invalid id jenisInstansi."})
    const jenisInstansi = jenisInstansiSchema.parse(req.body)
    const update = await db.jenisInstansi.update(jenisInstansi, {where: { uuid: id }})

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data jenisInstansi updated succesfully.`
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
        description: "Failed to update data jenisInstansi."
      });
    }
  }
}

export const deleteJenisInstansi = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.jenisInstansi.findOne({where: {uuid: id, deletedAt: null}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data jenisInstansi. invalid id jenisInstansi."})
    const deleted = await db.jenisInstansi.update({
      where: {uuid : id},
      data: {
        deletedAt: new Date().toISOString()
      }
    })
    response.success(res, {
      code: 200,
      length: 1,
      data: deleted,
      message: `Data jenis Instansi deleted succesfully.`
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
        description: "Failed to delete data jenis Instansi."
      });
    }
  }
}