import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"

const kecamatanSchema = z.object({
  id: z.string().optional(),
  regency_id: z.string().optional(),
  name: z.string(),
});

export const getKecamatan = async(req, res) => {
  try{
    const Kecamatan = await db.kecamatan.findAll()
    if(Kecamatan.length == 0) {
      return response.custom(res, {
        code: 200,
        message: "Kecamatan is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: Kecamatan,
      message: "Get all Kecamatan succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all Kecamatan."
    })
  }
}

export const getByIdKecamatan = async(req, res) => {
  const {id} = req.params;
  try{
    const Kecamatan = await db.kecamatan.findOne({
      where: {
        id: id
      }
    })
    if(!Kecamatan) {
      return response.custom(res, {
        code: 200,
        message: "Kecamatan is empty."
      })
    }
    return response.success(res, {
      code: 200,
      length: 1,
      data: Kecamatan,
      message: "Get Kecamatan succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting Kecamatan."
    })
  }
}
