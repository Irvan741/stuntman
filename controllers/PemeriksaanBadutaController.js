import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"
import grow from "jsgrowup"
import { parseISO, differenceInMonths, differenceInYears } from "date-fns";


const pemeriksaanBadutaSchema = z.object({
  uuid: z.string().length(36).optional(),
  uuid_baduta: z.string().max(255),
  tgl_pengukuran: z.string().datetime(),
  berat_badan: z.number(),
  status_berat_badan_usia: z.string().optional(),
  panjang_badan: z.number(),
  status_panjang_badan_usia: z.string().optional(),
  status_berat_badan_panjang_badan: z.string().optional(),
  zindex: z.number().optional(),
  uuid_petugas: z.string().max(255),
})

export const getPemeriksaanBaduta = async(req, res) => {
    try{
        let pemeriksaanBaduta = await db.dataPemeriksaanBaduta.findAll({
            where: {
              deletedAt: null
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(pemeriksaanBaduta.length == 0) {
        return response.custom(res, {
            code: 400,
            message: "pemeriksaanBaduta is empty."
        })
        }
        return response.success(res, {
        code: 200,
        data: pemeriksaanBaduta,
        message: "Get all pemeriksaanBaduta succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all pemeriksaanBaduta."
        })
    }
}

export const getByIdPemeriksaanBaduta = async(req, res) => {
    const {id} = req.params;
    try{
        let pemeriksaanBaduta = await db.dataPemeriksaanBaduta.findOne({
            where: {
              deletedAt: null,
              uuid: id
            }, 
            orderBy: {
              createdAt: 'desc'
            }
        })
        if(pemeriksaanBaduta.length == 0) {
        return response.custom(res, {
            code: 400,
            message: "pemeriksaanBaduta is empty."
        })
        }
        return response.success(res, {
        code: 200,
        data: pemeriksaanBaduta,
        message: "Get all pemeriksaanBaduta succesfully."
        })
    }catch(e){
        return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all pemeriksaanBaduta."
        })
    }
}

export const createPemeriksaanBaduta = async (req, res) => {
    try{
        const baduta = await db.baduta.findOne({
            where: {uuid: req.body.uuid_baduta}
          })
          if(!baduta){
            return res.sendStatus(404).send({
              message: "Baduta tidak terdaftar"
            })
        }
        // grow.
        const tgl_lahir = baduta.tanggal_lahir;
        const birthDateString = tgl_lahir.toISOString();
        const birthDate = parseISO(birthDateString);
        // Calculate the differences
        const monthsDifference = differenceInMonths(new Date(), birthDate);
        const yearsDifference = differenceInYears(new Date(), birthDate);
        
        // Build the formatted string
        const formattedString = `${yearsDifference} years ${monthsDifference % 12} months (${monthsDifference} months)`;
        const pemeriksaanBaduta = pemeriksaanBadutaSchema.parse(req.body)

        let zIndexWFA = null;
        let zIndexLHFA = null;

        let zIndexWFH = null;
          
        // console.log(yearsDifference + ' yo ' + monthsDifference % 12 + ' months' );
        // const adjustHeightData = true;
        // const adjustWeightScores = true;
        // const calc = new grow.Calculator(adjustHeightData, adjustWeightScores, data);
        const jenis_kelamin = baduta.jenis_kelamin == 'l' ? 'M' : 'F';
        const beratBadan = req.body.berat_badan;
        const panjangBadan = req.body.panjang_badan;
        grow.buildTablesObject().then((data) =>  {
          const adjustHeightData = true;
          const adjustWeightScores = true;
          const calc = new grow.Calculator(adjustHeightData, adjustWeightScores, data);
        
          const indicator = grow.WEIGHT_FOR_AGE;
          const measurement = beratBadan;
          const ageInMonths = monthsDifference;
          const gender = jenis_kelamin;
          const height = panjangBadan;
          const american = false;
          // console.log(`given ${ageInMonths}-month-old ${gender}, ${height} cm tall, ` +
          //   `${measurement} measurement (linked to indicator, e.g. weight) | ${indicator} zscore = ` +
          //   `${calc.zscoreForMeasurement(indicator, measurement, ageInMonths, gender, height, american)}`);
          zIndexWFA = calc.zscoreForMeasurement(indicator, measurement, ageInMonths, gender, height, american);
          console.log(zIndexWFA);
          

        }).then(()=>{
          grow.buildTablesObject().then((data) =>  {
            const adjustHeightData = true;
            const adjustWeightScores = true;
            const calc = new grow.Calculator(adjustHeightData, adjustWeightScores, data);
          
            const indicator = grow.LENGTH_HEIGHT_FOR_AGE;
            const measurement = beratBadan;
            const ageInMonths = monthsDifference;
            const gender = jenis_kelamin;
            const height = panjangBadan;
            const american = false;
            // console.log(`given ${ageInMonths}-month-old ${gender}, ${height} cm tall, ` +
            //   `${measurement} measurement (linked to indicator, e.g. weight) | ${indicator} zscore = ` +
            //   `${calc.zscoreForMeasurement(indicator, measurement, ageInMonths, gender, height, american)}`);
            zIndexLHFA = String(calc.zscoreForMeasurement(indicator, measurement, ageInMonths, gender, height, american));
            
            console.log(String(zIndexLHFA));
            

          });
        }).then(() => {
          grow.buildTablesObject().then((data) =>  {
            const adjustHeightData = true;
            const adjustWeightScores = true;
            const calc = new grow.Calculator(adjustHeightData, adjustWeightScores, data);
          
            const indicator = grow.WEIGHT_FOR_HEIGHT;
            const measurement = beratBadan;
            const ageInMonths = monthsDifference;
            const gender = jenis_kelamin;
            const height = panjangBadan;
            const american = false;
            // console.log(`given ${ageInMonths}-month-old ${gender}, ${height} cm tall, ` +
            //   `${measurement} measurement (linked to indicator, e.g. weight) | ${indicator} zscore = ` +
            //   `${calc.zscoreForMeasurement(indicator, measurement, ageInMonths, gender, height, american)}`);
            zIndexWFH = calc.zscoreForMeasurement(indicator, measurement, ageInMonths, gender, height, american);
            // console.log(zIndexLHFA);
            

          }).then( ()=> {
            const create =  db.dataPemeriksaanBaduta.create({
              uuid_baduta: req.body.uuid_baduta,
              tgl_pengukuran: new Date(),
              berat_badan: req.body.berat_badan,
              status_berat_badan_usia: zIndexWFA,
              panjang_badan: req.body.panjang_badan,
              status_panjang_badan_usia: zIndexLHFA,
              status_berat_badan_panjang_badan: zIndexWFH,
              uuid_petugas: req.body.uuid_petugas

            })
            response.success(res, {
              code: 201,
              length: 1,
              data: create,
              message: "Data pemeriksaan Baduta created succesfully."
          })
          });
        });
        
        // console.log(zIndexLHFA);
        
        // let zIndexWFH= null;
        // grow.buildTablesObject().then((data) =>  {
        //   const adjustHeightData = true;
        //   const adjustWeightScores = true;
        //   const calc = new grow.Calculator(adjustHeightData, adjustWeightScores, data);
        
        //   const indicator = grow.WEIGHT_FOR_HEIGHT;
        //   const measurement = beratBadan;
        //   const ageInMonths = monthsDifference;
        //   const gender = jenis_kelamin;
        //   const height = panjangBadan;
        //   const american = false;
        //   // console.log(`given ${ageInMonths}-month-old ${gender}, ${height} cm tall, ` +
        //   //   `${measurement} measurement (linked to indicator, e.g. weight) | ${indicator} zscore = ` +
        //   //   `${calc.zscoreForMeasurement(indicator, measurement, ageInMonths, gender, height, american)}`);
        //   zIndexWFH = calc.zscoreForMeasurement(indicator, measurement, ageInMonths, gender, height, american);
        //   // console.log(zIndex);
          

        // });
        // console.log(zIndexWFH);
        // const create = await  db.dataPemeriksaanBaduta.create({
        //   uuid_baduta: req.body.uuid_baduta,
        //   tgl_pengukuran: new Date(),
        //   berat_badan: req.body.berat_badan,
        //   status_berat_badan_usia: zIndexWFA,
        //   panjang_badan: req.body.panjang_badan,
        //   status_berat_badan_usia: zIndexLHFA,
        //   status_berat_badan_panjang_badan: zIndexWFH,
        //   uuid_petugas: req.body.uuid_petugas

        // })

        
        // console.log(`given ${ageInMonths}-month-old ${gender}, ${height} cm tall, ` +
        //   `${measurement} measurement (linked to indicator, e.g. weight) | ${indicator} zscore = ` +
        //   `${calc.zscoreForMeasurement(indicator, measurement, ageInMonths, gender, height, american)}`);


        



        
        // if(grow.Calculator){}
        // const create = await  db.dataPemeriksaanBaduta.create(pemeriksaanBaduta)
        
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
            description: "Failed to create data pemeriksaan Baduta."
            });
        }
    }
}

export const updatePemeriksaanBaduta = async(req, res) => {
    const {id} = req.params
    try{
      const idValid = await db.dataPemeriksaanBaduta.findOne({where: {uuid: id}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data pemeriksaan. invalid id pemeriksaan."})
      const PemeriksaanBaduta = pemeriksaanBadutaSchema.parse(req.body)
      const update = await db.dataPemeriksaanBaduta.update(PemeriksaanBaduta, {where: { uuid: id }})
  
      response.success(res, {
        code: 200,
        length: 1,
        data: update,
        message: `Data pemeriksaan baduta updated succesfully.`
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
          description: "Failed to update data pemeriksaan baduta."
        });
      }
    }
}
  
export const deletePemeriksaanBaduta = async( req, res ) => {
    const {id} = req.params
    try{
      const idValid = await db.dataPemeriksaanBaduta.findOne({where: {uuid: id, deletedAt: null}})
      if(!idValid) return response.custom(res, {code: 404, message: "Failed to delete data PemeriksaanBaduta. invalid id PemeriksaanBaduta."})
      const deleted = await db.dataPemeriksaanBaduta.update({
          deletedAt: new Date().toISOString()
      }, {where: {uuid : id}})
      response.success(res, {
        code: 200,
        length: 1,
        data: deleted,
        message: `Data PemeriksaanBaduta deleted succesfully.`
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
          description: "Failed to delete data PemeriksaanBaduta."
        });
      }
    }
}