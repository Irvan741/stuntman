import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"


const kCatinSchema = z.object({
    uuid: z.string().length(36).optional(),
    uuid_pemeriksaan: z.string().length(36),
    berisiko: z.boolean().optional(),
})

export const getKCatin = async(req, res) => {
    try{
        let k_Catin = await db.kPengantin.findAll({
            where: {
              deletedAt: null
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(k_Catin.length == 0) {
        return response.custom(res, {
            code: 400,
            message: "k_Catin is empty."
        })
        }
        return response.success(res, {
            code: 200,
            data: k_Catin,
            message: "Get all k_Catin succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all k_Catin."
        })
    }
}

export const getByIdKCatin = async(req, res) => {
    const {id} = req.params;
    try{
        let k_Catin = await db.kPengantin.findOne({
            where: {
              deletedAt: null,
              uuid: id
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(!k_Catin) {
        return response.custom(res, {
            code: 400,
            message: "k_Catin is empty."
        })
        }
        return response.success(res, {
            code: 200,
            data: k_Catin,
            message: "Get k_Catin succesfully."
        })
    }catch(e){
        return response.error(res, {
            code: 400,
            message: e.message,
            description: "Error getting k_Catin."
        })
    }
}

export const createKCatin = async (req, res) => {
    
    try{
        const k_catin = kCatinSchema.parse(req.body)
        const create = await db.kPengantin.create(k_catin)
        response.success(res, {
            code: 201,
            length: 1,
            data: create,
            message: "Data pemeriksaan created succesfully."
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
            description: "Failed to create data pemeriksaan."
            });
        }
    }
}

export const updateKCatin = async(req, res) => {
    const {id} = req.params
    try{
      const idValid = await db.kPengantin.findOne({where: {uuid: id}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data k_pengantin. invalid id k_pengantin."})
      const kPengantin = kCatinSchema.parse(req.body)
      const update = await db.kPengantin.update(kPengantin, {where: { uuid: id }})
  
      response.success(res, {
        code: 200,
        length: 1,
        data: update,
        message: `Data k_pengantin updated succesfully.`
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
          description: "Failed to update data k_pengantin."
        });
      }
    }
}
  
export const deleteKCatin = async( req, res ) => {
    const {id} = req.params
    try{
      const idValid = await db.kPengantin.findOne({where: {uuid: id, deletedAt: null}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data kPengantin. invalid id kPengantin."})
      const deleted = await db.kPengantin.update({
        deletedAt: new Date().toISOString()
        },{where: {uuid : id}})
      response.success(res, {
        code: 200,
        length: 1,
        data: deleted,
        message: `Data K_Pengantin deleted succesfully.`
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
          description: "Failed to delete data K_Pengantin."
        });
      }
    }
}