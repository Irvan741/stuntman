import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const kelurahanSchema = z.object({
  id: z.string().optional(),
  district_id: z.string().optional(),
  name: z.string(),
});

export const getKelurahan = async(req, res) => {
  const {kecamatan_id} = req.query
  try{
    const Kelurahan = kecamatan_id ? await db.kelurahan.findAll({where: {district_id: kecamatan_id}}) : await db.kelurahan.findAll()
    
    
    if(Kelurahan.length == 0) {
      return response.custom(res, {
        code: 200,
        message: "Kelurahan is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: Kelurahan,
      message: "Get all Kelurahan succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all Kelurahan."
    })
  }
}

export const getByIdKelurahan = async(req, res) => {
  const {id} = req.params;
  try{
    const Kelurahan = await db.kelurahan.findOne({
      where: {
        id: id
      }
    })
    if(!Kelurahan) {
      return response.custom(res, {
        code: 200,
        message: "Kelurahan is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: Kelurahan,
      message: "Get Kelurahan succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting Kelurahan."
    })
  }
}
