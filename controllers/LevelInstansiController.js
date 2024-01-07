import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const levelInstansiSchema = z.object({
  uuid: z.string().length(36).optional(),
  name: z.string(),
})

export const getLevelInstansis = async(req, res) => {
  try{
    const levelInstansis = await db.levelInstansi.findAll({
      where: {
        deletedAt: null
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(levelInstansis.length == 0) {
      return response.custom(res, {
        code: 200,
        message: "levelInstansis is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: levelInstansis,
      message: "Get all levelInstansis succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all levelInstansis."
    })
  }
}

export const getByIdLevelInstansis = async(req, res) => {
  const {id} = req.params;
  try{
    const levelInstansis = await db.levelInstansi.findOne({
      where: {
        deletedAt: null,
        uuid: id
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!levelInstansis) {
      return response.custom(res, {
        code: 200,
        message: "levelInstansis is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: levelInstansis,
      message: "Get levelInstansis succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting levelInstansis."
    })
  }
}

export const createLevelInstansi = async (req, res) => {
  try{
    const levelInstansi = levelInstansiSchema.parse(req.body)
    const create = await  db.levelInstansi.create(levelInstansi)
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data level instansi created succesfully."
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
        description: "Failed to create data level instansi."
      });
    }
  }
}

export const updateLevelInstansi = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.levelInstansi.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data levelInstansi. invalid id levelInstansi."})
    const levelInstansi = levelInstansiSchema.parse(req.body)
    const update = await db.levelInstansi.update(levelInstansi, {where: { uuid: id }})

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data levelInstansi updated succesfully.`
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
        description: "Failed to update data levelInstansi."
      });
    }
  }
}

export const deleteLevelInstansi = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.levelInstansi.findOne({where: {uuid: id, deletedAt: null}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data levelInstansi. invalid id levelInstansi."})
    const deleted = await db.levelInstansi.update({
      deletedAt: new Date().toISOString()
    }, {where: {uuid : id}})
    response.success(res, {
      code: 200,
      length: 1,
      data: deleted,
      message: `Data level instansi deleted succesfully.`
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
        description: "Failed to delete data level Instansi."
      });
    }
  }
}