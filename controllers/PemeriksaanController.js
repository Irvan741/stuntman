import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const pemeriksaanSchema = z.object({
  uuid: z.string().length(36).optional(),
  nik_penduduk: z.string().length(16),
  uuid_petugas: z.string().nullable(),
  nama_petugas: z.string().nullable(),
  jenis_pemeriksaan: z.string().max(255),
  tgl_pemeriksaan: z.string().datetime(),
  catatan_pemeriksaan: z.string(),
  penyuluhan: z.boolean(),
})

export const getPemeriksaan = async(req, res) => {
    const {nik_penduduk} = req.query
    try{
        let pemeriksaans = nik_penduduk? await db.pemeriksaan.findOne({
            where: {
              nik_penduduk,
              deletedAt: null
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        
        
        : await db.pemeriksaan.findAll({
            where: {
              deletedAt: null
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(!pemeriksaans || pemeriksaans.length == 0) {
        return response.custom(res, {
            code: 400,
            message: "pemeriksaans is empty."
        })
        }
        return response.success(res, {
        code: 200,
        data: pemeriksaans,
        message: "Get all pemeriksaans succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all pemeriksaans."
        })
    }
}

export const getPemeriksaanDetail = async(req, res) => {
  const {nik_penduduk} = req.query
  try{
      let pemeriksaans = nik_penduduk? await db.pemeriksaan.findAll({
          where: {
            nik_penduduk,
            deletedAt: null
          }, 
          orderBy: {
            createdAt: 'desc'
          }
      })
      
      
      : await db.pemeriksaan.findAll({
          where: {
            deletedAt: null
          }, 
          orderBy: {
            createdAt: 'desc'
          }
      })
      
      const pemeriksaanWithNik = await Promise.all(
        pemeriksaans.map(async (pemeriksaan) => {
          try {
            // Ensure user is not undefined
            if (!pemeriksaan) {
              return null;
            }
      
            // Fetch instansi only if instansi is not null or undefined
            const penduduk = pemeriksaan.nik_penduduk ? await pemeriksaan.getPenduduk(pemeriksaan.nik_penduduk) : null;
            // console.log(penduduk.kecamatan);
            let kecamatan = null;
            let kelurahan = null;
            let KBumil = null;
            let KPascaPersalinan = null;
            let KPengantin = null;
            let KUmum = null;
      
            // Fetch kecamatan and kelurahan only if instansi is not null
            if (penduduk) {
              // console.log(penduduk.kecamatan + ' + ' + penduduk.kelurahan)

              kecamatan = penduduk.kecamatan ? await penduduk.getKecamatan(penduduk.kecamatan) : null;
              // console.log(kecamatan);
              kelurahan = penduduk.kecamatan ? await penduduk.getKelurahan(penduduk.kelurahan) : null;
              
              KBumil = pemeriksaan.uuid ? await pemeriksaan.getKBumil(pemeriksaan.uuid) : null;
              KPengantin = pemeriksaan.uuid ? await pemeriksaan.getKCatin(pemeriksaan.uuid) : null;
              KUmum = pemeriksaan.uuid ? await pemeriksaan.getKUmum(pemeriksaan.uuid) : null;
              KPascaPersalinan = pemeriksaan.uuid ? await pemeriksaan.getKPascaPersalinan(pemeriksaan.uuid) : null;
            }

            const bumilData = KBumil ? KBumil.concat(KUmum || []) : KUmum || [];
            const flattenedBumilData = bumilData.flatMap(entry => entry);
            const pengantinData = KPengantin ? KPengantin.concat(KUmum || []) : KUmum || [];
            const flattenedPengantinData = pengantinData.flatMap(entry => entry);
            const pascaPersalinanData = KPascaPersalinan ? KPascaPersalinan.concat(KUmum || []) : KUmum || [];
            const flattenedPascaPersalinanData = pascaPersalinanData.flatMap(entry => entry);

      
            return {
              ...pemeriksaan.toJSON(),
              penduduk: penduduk
                ? {
                    ...penduduk.toJSON(),
                    kecamatan,
                    kelurahan,
                  }
                : null,
                kesehatan: pemeriksaan.uuid
                ? {
                    pengantin: KPengantin ? Object.assign({}, ...flattenedPengantinData.map(item => item.dataValues)) : null,
                    bumil: KBumil ? Object.assign({}, ...flattenedBumilData.map(item => item.dataValues)) : null,
                    pascasalin: KPascaPersalinan ? Object.assign({}, ...flattenedPascaPersalinanData.map(item => item.dataValues)) : null,
                    

                  }
                : null,
            };
          } catch (error) {
            // console.error(`Error fetching instansi for user ${user.uuid}:`, error);
            console.log(error.message);
            return null;
          }
        })
      );


      if(!pemeriksaans || pemeriksaans.length == 0) {
      return response.custom(res, {
          code: 400,
          message: "pemeriksaans is empty."
      })
      }
      return response.success(res, {
      code: 200,
      data: pemeriksaanWithNik,
      message: "Get all pemeriksaans succesfully."
      })
  }catch(e){
      return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all pemeriksaans."
      })
  }
}

export const getByIdPemeriksaan = async(req, res) => {
    const {id} = req.params;
    try{
        let pemeriksaans = await db.pemeriksaan.findOne({
            where: {
              deletedAt: null,
              uuid: id
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(pemeriksaans.length == 0) {
        return response.custom(res, {
            code: 400,
            message: "pemeriksaans is empty."
        })
        }
        return response.success(res, {
        code: 200,
        data: pemeriksaans,
        message: "Get all pemeriksaans succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all pemeriksaans."
        })
    }
}

export const createPemeriksaan = async (req, res) => {
    
    try{
        const pemeriksaan = pemeriksaanSchema.parse(req.body)
        // let {tgl_pemeriksaan, ...data } = pemeriksaan
        const create = await  db.pemeriksaan.create(pemeriksaan)

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

export const updatePemeriksaan = async(req, res) => {
    const {id} = req.params
    try{
      const idValid = await db.pemeriksaan.findOne({where: {uuid: id}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data pemeriksaan. invalid id pemeriksaan."})
      const Pemeriksaan = pemeriksaanSchema.parse(req.body)
      const update = await db.pemeriksaan.update(Pemeriksaan, {where: { uuid: id }})
  
      response.success(res, {
        code: 200,
        length: 1,
        data: update,
        message: `Data pemeriksaan updated succesfully.`
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
          description: "Failed to update data pemeriksaan."
        });
      }
    }
}
  
export const deletePemeriksaan = async( req, res ) => {
    const {id} = req.params
    try{
      const idValid = await db.pemeriksaan.findOne({where: {uuid: id, deletedAt: null}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data pemeriksaan. invalid id pemeriksaan."})
      const deleted = await db.pemeriksaan.update({
        deletedAt: new Date().toISOString()
      }, {where: {uuid : id}})
      response.success(res, {
        code: 200,
        length: 1,
        data: deleted,
        message: `Data pemeriksaan deleted succesfully.`
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
          description: "Failed to delete data pemeriksaan."
        });
      }
    }
}