import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"
const kBumilSchema = z.object({
    uuid: z.string().length(36).optional(),
    pemeriksaan_ke: z.number().int(),
    jumlah_anak: z.number().int(),
    status_jumlah_anak: z.string().max(255),
    tgl_lahir_anak_terakhir: z.string().nullable(),
    status_terlalu_dekat: z.string().max(255),
    usia_hamil_saat_ini: z.number().int(),
    status_usia_hamil: z.string().max(255),
    tfu: z.number(),
    status_tfu: z.string().max(255),
    berisiko: z.boolean().optional(),
    uuid_pemeriksaan: z.string().length(36)
})

export const getKBumil = async(req, res) => {
    try{
        let k_bumils = await db.kBumil.findAll({
            where: {
              deletedAt: null
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(k_bumils.length == 0) {
        return response.custom(res, {
            code: 400,
            message: "k_bumils is empty."
        })
        }
        return response.success(res, {
        code: 200,
        data: k_bumils,
        message: "Get all k_bumils succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all k_bumils."
        })
    }
}

export const getByIdKBumil = async(req, res) => {
    const {id} = req.params;
    try{
        let k_bumils = await db.kBumil.findOne({
            where: {
              deletedAt: null,
              uuid: id
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(!k_bumils) {
        return response.custom(res, {
            code: 400,
            message: "k_bumils is empty."
        })
        }
        return response.success(res, {
        code: 200,
        data: k_bumils,
        message: "Get k_bumils succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting k_bumils."
        })
    }
}

export const createKBumil = async (req, res) => {
    
    try{
        const k_bumil = kBumilSchema.parse(req.body)
        console.log(k_bumil);
        const create = await  db.kBumil.create(k_bumil)
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

export const updateKBumil = async(req, res) => {
    const {id} = req.params
    try{
        
      const idValid = await db.kBumil.findOne({where: {uuid: id}})

      if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data K_Bumil. invalid id K_Bumil."})
      const kBumil = kBumilSchema.parse(req.body)
      const update = await db.kBumil.update(kBumil, {where: { uuid: id }})
  
      response.success(res, {
        code: 200,
        length: 1,
        data: update,
        message: `Data K_Bumil updated succesfully.`
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
          description: "Failed to update data K_Bumil."
        });
      }
    }
}
  
export const deleteKBumil = async( req, res ) => {
    const {id} = req.params
    try{
      const idValid = await db.kBumil.findOne({where: {uuid: id, deletedAt: null}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data kBumil. invalid id kBumil."})
      const deleted = await db.kBumil.update({
          deletedAt: new Date().toISOString()
      } ,{where: {uuid : id}})
      response.success(res, {
        code: 200,
        length: 1,
        data: deleted,
        message: `Data kBumil deleted succesfully.`
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
          description: "Failed to delete data kBumil."
        });
      }
    }
}