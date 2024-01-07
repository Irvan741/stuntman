import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const kUmumSchema = z.object({
  uuid: z.string().length(36).optional(),
  berat_badan: z.number(),
  tinggi_badan: z.number(),
  indeks_massa_tubuh: z.number(),
  status_indeks_massa_tubuh: z.string().max(255),
  lingkar_lengan_atas: z.number().optional(),
  status_lingkar_lengan_atas: z.string().optional(),
  terpapar_rokok: z.boolean(),
  kadar_hemoglobin: z.number(),
  status_kadar_hemoglobin: z.string().max(255),
  riwayat_penyakit: z.string().nullable(),
  status_riwayat_penyakit: z.string().max(255).nullable(),
  uuid_pemeriksaan: z.string().length(36)
})

export const getKUmum = async(req, res) => {
    try{
        let k_umums = await db.kUmum.findAll({
            where: {
              deletedAt: null
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(k_umums.length == 0) {
        return response.custom(res, {
            code: 400,
            message: "k_umums is empty."
        })
        }
        return response.success(res, {
        code: 200,
        data: k_umums,
        message: "Get all k_umums succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all k_umums."
        })
    }
}

export const getByIdKUmum = async(req, res) => {
    const {id} = req.params;
    try{
        let k_umums = await db.kUmum.findOne({
            where: {
              deletedAt: null,
              uuid: id
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(k_umums.length == 0) {
        return response.custom(res, {
            code: 400,
            message: "k_umums is empty."
        })
        }
        return response.success(res, {
        code: 200,
        data: k_umums,
        message: "Get all k_umums succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all k_umums."
        })
    }
}

export const createKUmum = async (req, res) => {
    
    try{
        const k_umum = kUmumSchema.parse(req.body)
        const create = await  db.kUmum.create(k_umum)
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

export const updateKUmum = async(req, res) => {
    const {id} = req.params
    try{
      const idValid = await db.kUmum.findOne({where: {uuid: id}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data k_Umum. invalid id k_Umum."})
      const KUmum = kUmumSchema.parse(req.body)
      const update = await db.kUmum.update(KUmum, {where: { uuid: id }})
  
      response.success(res, {
        code: 200,
        length: 1,
        data: update,
        message: `Data k_Umum updated succesfully.`
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
          description: "Failed to update data k_Umum."
        });
      }
    }
}
  
export const deleteKUmum = async( req, res ) => {
    const {id} = req.params
    try{
      const idValid = await db.kUmum.findOne({where: {uuid: id, deletedAt: null}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data kUmum. invalid id kUmum."})
      const deleted = await db.kUmum.update({
          deletedAt: new Date().toISOString()
      }, {where: {uuid : id}})
      response.success(res, {
        code: 200,
        length: 1,
        data: deleted,
        message: `Data K_Umum deleted succesfully.`
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
          description: "Failed to delete data K_Umum."
        });
      }
    }
}