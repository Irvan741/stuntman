import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const transaksiTTDSchema = z.object({
  uuid_pembagian_ttd: z.string().length(36),
  uuid_petugas: z.string().length(36).optional(),
  nik_remaja: z.string().max(255),
  nama_sekolah: z.string(),
  berat_badan: z.number(),
  tinggi_badan: z.number(),
  tgl_pemberian: z.string().datetime(),
})

export const getTransaksiTTDs = async(req, res) => {
  try{
    const transaksiTTD = await db.transaksiTTD.findAll({
      where: {
        deletedAt: null
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(transaksiTTD.length == 0) {
      return response.custom(res, {
        code: 200,
        message: "transaksiTTD is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: transaksiTTD,
      message: "Get all transaksiTTD succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all transaksiTTD."
    })
  }
}

export const getByIdTransaksiTTDs = async(req, res) => {
  const {id} = req.params;
  try{
    const transaksiTTD = await db.transaksiTTD.findOne({
      where: {
        deletedAt: null,
        uuid: id
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!transaksiTTD) {
      return response.custom(res, {
        code: 200,
        message: "transaksiTTD is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: transaksiTTD,
      message: "Get all transaksiTTD succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all transaksiTTD."
    })
  }
}

export const getByidPembagianTTDs = async(req, res) => {
  const {id} = req.params;
  try{
    const transaksiTTD = await db.transaksiTTD.findAll({
      where: {
        deletedAt: null,
        uuid_pembagian_ttd: id
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!transaksiTTD) {
      return response.custom(res, {
        code: 200,
        message: "transaksiTTD is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: transaksiTTD,
      message: "Get all transaksiTTD succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all transaksiTTD."
    })
  }
}

export const getByNikRemajaTTDs = async(req, res) => {
  const {id} = req.params;
  try{
    const transaksiTTD = await db.transaksiTTD.findOne({
      where: {
        deletedAt: null,
        uuid: id
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!transaksiTTD) {
      return response.custom(res, {
        code: 200,
        message: "transaksiTTD is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: transaksiTTD,
      message: "Get all transaksiTTD succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all transaksiTTD."
    })
  }
}

export const createTransaksiTTD = async (req, res) => {
  try{
    const transaksiTTD = transaksiTTDSchema.parse(req.body)
    const create = await  db.transaksiTTD.create(transaksiTTD)
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data transaksi ttd created succesfully."
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
        description: "Failed to create data transaksi ttd."
      });
    }
  }
}

export const updateTransaksiTTD = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.transaksiTTD.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data transaksiTTD. invalid id transaksiTTD."})
    const transaksiTTD = transaksiTTDSchema.parse(req.body)
    const update = await db.transaksiTTD.update(transaksiTTD,{
      where: {uuid : id},
    })

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data transaksiTTD updated succesfully.`
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
        description: "Failed to update data transaksiTTD."
      });
    }
  }
}

export const deleteTransaksiTTD = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.transaksiTTD.findOne({where: {uuid: id, deletedAt: null}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data transaksiTTD. invalid id transaksiTTD."})
    const deleted = await db.transaksiTTD.update({
        deletedAt: new Date().toISOString()
    }, {where: {uuid : id}},)
    response.success(res, {
      code: 200,
      length: 1,
      data: deleted,
      message: `Data transaksi ttd deleted succesfully.`
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
        description: "Failed to delete data transaksi ttd."
      });
    }
  }
}