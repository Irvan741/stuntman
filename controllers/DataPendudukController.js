import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const Op = db.Sequelize.Op;
const dataPendudukSchema = z.object({
  nik: z.string().length(16),
        
        nama_lengkap: z.string().max(255),
        jenis_kelamin: z.string().length(1),
        tempat_lahir: z.string().max(255),
        tanggal_lahir: z.string(),
        kecamatan: z.string().max(255),
        kelurahan: z.string().max(255),
        nomor_kk: z.string().max(255),
        alamat: z.string().max(255),
        rt: z.string().max(255),
        rw: z.string().max(255).nullable(),
        kode_pos: z.string().max(255),
        golongan_darah: z.string().length(4).nullable(),
        agama: z.string().max(255),
        status_perkawinan: z.string().max(255),
        status_hubungan_darah: z.string().max(255),
        pendidikan: z.string().max(255),
        pekerjaan: z.string().max(255),
        nik_ayah: z.string().max(255),
        nik_ibu: z.string().max(255),
        anak_ke: z.number().int(),
})
export const getDataPenduduks = async(req, res) => {
  const {search, nik} = req.query
  try{
    const datapenduduks =
      !search && !nik
        ? await db.dataPenduduk.findAll({
            where: {
              deletedAt: null,
            },
            order: [['createdAt', 'DESC']],
          })
        : search
        ? await db.dataPenduduk.findAll({
            where: {
              [Op.or]: [
                { nik: { [Op.like]: `%${search}%` } },
                { nama_lengkap: { [Op.like]: `%${search}%` } },
              ],
              deletedAt: null,
            },
            order: [['createdAt', 'DESC']],
          })
        : nik
        ? await db.dataPenduduk.findOne({
            where: {
              nik,
              deletedAt: null,
            },
            order: [['createdAt', 'DESC']],
          })
        : null;

    if (!datapenduduks) {
      return response.custom(res, {
        code: 200,
        message: 'datapenduduks is empty.',
      });
    }

    return response.success(res, {
      code: 200,
      length: Array.isArray(datapenduduks) ? datapenduduks.length : 1,
      data: datapenduduks,
      message: 'Get all datapenduduks successfully.',
    });
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all datapenduduks."
    })
  }
}

export const getByIdDataPenduduks = async(req, res) => {
  const {id} = req.params;
  try{
    const dataPenduduks = await db.dataPenduduk.findOne({
      where: {
        deletedAt: null,
        uuid: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!dataPenduduks) {
      return response.custom(res, {
        code: 200,
        message: "no data with that id."
      })
    }
    return response.success(res, {
      code: 200,
      length: dataPenduduks.length,
      data: dataPenduduks,
      message: "Get dataPenduduks succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting dataPenduduks."
    })
  }
}


export const createDataPenduduk = async (req, res) => {
  try{
    const dataPenduduk = dataPendudukSchema.parse(req.body)
    const create = await  db.dataPenduduk.create({
      data: dataPenduduk
    })
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data dataPenduduk created succesfully."
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
        description: "Failed to create data dataPenduduk."
      });
    }
  }
}

export const updateDataPenduduk = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.dataPenduduk.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data dataPenduduk. invalid id dataPenduduk."})
    const dataPenduduk = dataPendudukSchema.parse(req.body)
    const update = await db.dataPenduduk.update({
      where: {uuid : id},
      data: dataPenduduk
    })

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data dataPenduduk updated succesfully.`
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
        description: "Failed to update data dataPenduduk."
      });
    }
  }
}

export const deleteDataPenduduk = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.dataPenduduk.findOne({where: {uuid: id, deletedAt: null}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data dataPenduduk. invalid id dataPenduduk."})
    const deleted = await db.dataPenduduk.update({
      where: {uuid : id},
      data: {
        deletedAt: new Date().toISOString()
      }
    })
    response.success(res, {
      code: 200,
      length: 1,
      data: deleted,
      message: `Data dataPenduduk deleted succesfully.`
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
        description: "Failed to delete data dataPenduduk."
      });
    }
  }
}
