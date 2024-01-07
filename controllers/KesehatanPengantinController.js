import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"


const kPengantinSchema = z.object({
    uuid: z.string().length(36).optional(),
    tanggal_melahirkan: z.string(),
    anak_ke: z.number().int(),
    kunjungan_ke: z.number().int(),
    tempat_persalinan: z.string().max(255),
    nama_tempat_persalinan: z.string().max(255),
    usia_hamil_saat_ini: z.number().int(),
    status_usia_hamil: z.string().max(255),
    tfu: z.number(),
    status_tfu: z.string().max(255),
})

export const getKPengantin = async(req, res) => {
    try{
        let k_catin = await db.kPengantin.findAll({
            where: {
              deletedAt: null
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(k_catin.length == 0) {
            return response.custom(res, {
                code: 400,
                message: "k_catin is empty."
            })
        }
        return response.success(res, {
        code: 200,
        data: k_catin,
        message: "Get all k_catin succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all k_catin."
        })
    }
}

export const getByIdKPengantin = async(req, res) => {
    const {id} = req.params;
    try{
        let k_catin = await db.kPengantin.findOne({
            where: {
              deletedAt: null,
              uuid: id
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(!k_catin) {
        return response.custom(res, {
            code: 400,
            message: "k_catin is empty."
        })
        }
        return response.success(res, {
            code: 200,
            data: k_catin,
            message: "Get k_catin succesfully."
        })
    }catch(e){
        return response.error(res, {
            code: 400,
            message: e.message,
            description: "Error getting k_catin."
        })
    }
}

export const createKPengantin = async (req, res) => {
    
    try{
        const k_bumil = kPengantinSchema.parse(req.body)
        const create = await  db.kPengantin.create({
            data: k_bumil
        })
        response.success(res, {
            code: 201,
            length: 1,
            data: create,
            message: "Data Kes Pengantin created succesfully."
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
            description: "Failed to create data Kes Pengantin."
            });
        }
    }
}

export const updateKPengantin = async(req, res) => {
    const {id} = req.params
    try{
      const idValid = await db.kPengantin.findOne({where: {uuid: id}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data k_Umum. invalid id k_Umum."})
      const KPengantin = kPengantinSchema.parse(req.body)
      const update = await db.kPengantin.update(KPengantin, {where: { uuid: id }})
  
      response.success(res, {
        code: 200,
        length: 1,
        data: update,
        message: `Data k_Pengantin updated succesfully.`
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
          description: "Failed to update data k_Pengantin."
        });
      }
    }
}
  
export const deleteKPengantin = async( req, res ) => {
    const {id} = req.params
    try{
      const idValid = await db.kPengantin.findOne({where: {uuid: id, deletedAt: null}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data kPengantin. invalid id kPengantin."})
      const deleted = await db.kPengantin.update({
          deletedAt: new Date().toISOString()
      }, {where: {uuid : id}})
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