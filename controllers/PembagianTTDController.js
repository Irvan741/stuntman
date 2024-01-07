import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"
import grow from "jsgrowup"

const pembagianTTDSchema = z.object({
  uuid_petugas: z.string().max(36),
  tgl_pelaksanaan: z.string().datetime(),
  jml_tablet: z.number().int(),
})

export const getPembagianTTDs = async(req, res) => {
  // try{

    const {search} = req.query
    try{
      const pembagianTTD = !search ? await db.pembagianTTD.findAll({
        where: {
          deletedAt: null
        }, 
        orderBy: {
          createdAt: 'desc'
        }
      }) 
      : await db.pembagianTTD.findAll({
        where: {
          nik: {contains : search},
          deletedAt: null
        }, 
        orderBy: {
          createdAt: 'desc'
        }
      }) 
      
      if(pembagianTTD.length == 0) {
        return response.custom(res, {
          code: 200,
          message: "pembagianTTD is empty."
        })
      }
      return response.success(res, {
        code: 200,
        length: pembagianTTD.length,
        data: pembagianTTD,
        message: "Get all pembagianTTD succesfully."
      })
    }catch(e){
      return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all pembagianTTD."
      })
    }
}

export const getByIdPembagianTTDs = async(req, res) => {
  const {id} = req.params;
  try{
    const pembagianTTD = await db.pembagianTTD.findOne({
      where: {
        deletedAt: null,
        uuid: id
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!pembagianTTD) {
      return response.custom(res, {
        code: 200,
        message: "pembagianTTD is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: pembagianTTD,
      message: "Get all pembagianTTD succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all pembagianTTD."
    })
  }
}

export const createPembagianTTD = async (req, res) => {
  try{
    const pembagianTTD = pembagianTTDSchema.parse(req.body)
    const create = await  db.pembagianTTD.create(pembagianTTD)
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data pembagian ttd created succesfully."
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
        description: "Failed to create data pembagian ttd."
      });
    }
  }
}

export const updatePembagianTTD = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.pembagianTTD.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data pembagianTTD. invalid id pembagianTTD."})
    const pembagianTTD = pembagianTTDSchema.parse(req.body)
    const update = await db.pembagianTTD.update(pembagianTTD, {where: { uuid: id }})

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data pembagianTTD updated succesfully.`
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
        description: "Failed to update data pembagianTTD."
      });
    }
  }
}

export const deletePembagianTTD = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.pembagianTTD.findOne({where: {uuid: id, deletedAt: null}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data pembagianTTD. invalid id pembagianTTD."})
    const deleted = await db.pembagianTTD.update({
      deletedAt: new Date().toISOString()
    }, {where: {uuid : id}})
    response.success(res, {
      code: 200,
      length: 1,
      data: deleted,
      message: `Data pembagian ttd deleted succesfully.`
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
        description: "Failed to delete data pembagian ttd."
      });
    }
  }
}