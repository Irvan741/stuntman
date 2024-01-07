import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"


const kPascaPersalinanSchema = z.object({
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
    status_kelahiran_bayi: z.boolean(),
    status_ibu: z.boolean(),
    uuid_pemeriksaan: z.string().length(36)
})

export const getKPascaPersalinan = async(req, res) => {
    try{
        let k_pascaPersalinan = await db.kPascaPersalinan.findAll({
            where: {
              deletedAt: null
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(k_pascaPersalinan.length == 0) {
        return response.custom(res, {
            code: 400,
            message: "k_pascaPersalinan is empty."
        })
        }
        return response.success(res, {
        code: 200,
        data: k_pascaPersalinan,
        message: "Get all k_pascaPersalinan succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all k_pascaPersalinan."
        })
    }
}

export const getByIdKPascaPersalinan = async(req, res) => {
    const {id} = req.params;
    try{
        let k_pascaPersalinan = await db.kPascaPersalinan.findOne({
            where: {
              deletedAt: null,
              uuid: id
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(!k_pascaPersalinan) {
        return response.custom(res, {
            code: 400,
            message: "k_pascaPersalinan is empty."
        })
        }
        return response.success(res, {
            code: 200,
            data: k_pascaPersalinan,
            message: "Get k_pascaPersalinan succesfully."
        })
    }catch(e){
        return response.error(res, {
            code: 400,
            message: e.message,
            description: "Error getting k_pascaPersalinan."
        })
    }
}

export const createKPascaPersalinan = async (req, res) => {
    
    try{
        const k_pasca_persalinan = kPascaPersalinanSchema.parse(req.body)
        const create = await  db.kPascaPersalinan.create(k_pasca_persalinan)
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

export const updateKPascaPersalinan = async(req, res) => {
    const {id} = req.params
    try{
      const idValid = await db.kPascaPersalinan.findOne({where: {uuid: id}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data k_pasca_persalinan. invalid id k_pasca_persalinan."})
      const KPascaPersalinan = kPascaPersalinanSchema.parse(req.body)
      const update = await db.kPascaPersalinan.update(KPascaPersalinan, {where: { uuid: id }})
  
      response.success(res, {
        code: 200,
        length: 1,
        data: update,
        message: `Data k_pasca_persalinan updated succesfully.`
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
          description: "Failed to update data k_pasca_persalinan."
        });
      }
    }
}
  
export const deleteKPascaPersalinan = async( req, res ) => {
    const {id} = req.params
    try{
      const idValid = await db.kPascaPersalinan.findOne({where: {uuid: id, deletedAt: null}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data kPascaPersalinan. invalid id kPascaPersalinan."})
      const deleted = await db.kPascaPersalinan.update({
          deletedAt: new Date().toISOString()
      }, {where: {uuid : id}})
      response.success(res, {
        code: 200,
        length: 1,
        data: deleted,
        message: `Data K_Pasca_persalinan deleted succesfully.`
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
          description: "Failed to delete data K_Pasca_persalinan."
        });
      }
    }
}