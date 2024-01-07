import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"
import bcrypt from 'bcrypt';

const operatorSchema = z.object({
    nik: z.string().length(16).refine(value => !!value, { message: "Required field" }),
    name: z.string().max(255).refine(value => !!value, { message: "Required field" }),
    tanggal_lahir: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: "Invalid datetime string! Must be UTC."
    }).refine(value => !!value, { message: "Required field" }),
    jenis_kelamin: z.string().max(255).refine(value => !!value, { message: "Required field" }),
    kecamatan: z.string().length(7).refine(value => !!value, { message: "Required field" }),
    kelurahan: z.string().length(10).refine(value => !!value, { message: "Required field" }),
    email: z.string().max(255).email({ message: "Invalid email address" }).refine(value => !!value, { message: "Required field" }),
    password: z.string().max(255).refine(value => !!value, { message: "Required field" }),
    role: z.string().max(255).refine(value => !!value, { message: "Required field" }),
    instansi: z.string().max(255).optional(),
    petugas: z.string().length(36).optional(),
    last_login: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: "Invalid datetime string! Must be UTC."
    }).optional(),
})

const updateSchema = z.object({
  nik: z.string().length(16).optional(),
  name: z.string().max(255).optional(),
  tanggal_lahir: z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid datetime string! Must be UTC."
  }).optional(),
  jenis_kelamin: z.string().max(255).optional(),
  kecamatan: z.string().length(7).optional(),
  kelurahan: z.string().length(10).optional(),
  email: z.string().max(255).email({ message: "Invalid email address" }).optional(),
  password: z.string().max(255).optional(),
  role: z.string().max(255).optional(),
  instansi: z.string().max(255).optional(),
  petugas: z.string().length(36).optional(),
  last_login: z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid datetime string! Must be UTC."
  }).optional(),
})



export const getOperators = async(req, res) => {
    const {email, nik, name, role} = req.query
    
    try{
      const operator = email ? await db.operator.findOne({
        
        where: {
          email: email,
          deletedAt: null
        }, 
        orderBy: {
          createdAt: 'desc'
        }
      })
      : nik ? await db.operator.findOne({
        
          where: {
            nik,
            deletedAt: null
          }, 
          orderBy: {
            createdAt: 'desc'
          }
      })
      
      : name ? await db.operator.findAll({
        where: {
          name,
          deletedAt: null
        }, 
        
        orderBy: {
          createdAt: 'desc'
        }
      })
  
      : role ? await db.operator.findAll({
        
        where: {
          role,
          deletedAt: null
        }, 
        
        orderBy: {
          createdAt: 'desc'
        }
      })
    
      : await db.operator.findAll({
        
        where: {
          deletedAt: null
        }, 
        orderBy: {
          createdAt: 'desc'
        },
      })
  
      if(!operator|| operator.length == 0) {
        return response.custom(res, {
          code: 400,
          message: "Operator is empty."
        })
      }else if(!operator){
        return response.custom(res, {
            code: 400,
            message: "Operator is empty."
          })
      }
      return response.success(res, {
        code: 200,
        data: operator,
        message: "Get all Operator succesfully."
      })

    }catch(e){
      return response.error(res, {
        code: 400,
        message: e.message,
        description: "Error getting all Operators."
      })
    }
}

export const getByIdOperator = async(req, res) => {
  const {id} = req.params;
  try{
    const Operators = await db.operator.findOne({
      where: {
        deletedAt: null,
        uuid: id
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!Operators) {
      return response.custom(res, {
        code: 400,
        message: "Operators is empty."
      })
    }
    return response.success(res, {
      code: 200,
      data: Operators,
      message: "Get all Operators succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all Operators."
    })
  }
}

export const createOperator = async (req, res) => {
  try{
    
        const { password, ...operator } = operatorSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkEmail = await db.operator.findOne({
            where: { email: operator.email }
        });

        if (checkEmail) {
            return response.custom(res, {
                code: 401,
                message: "operator Already Exists."
            });
        }

        const create = await db.operator.create({
            ...operator,
            password: hashedPassword,
        });
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data Operator created succesfully."
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
          description: "Failed to create data Operator."
        });
      }
  }
}

export const updateOperator = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.operator.findOne({where: {uuid: id}})
    if(!idValid) return response.custom(res, {code: 404, message: "Failed to update data Operator. invalid id Operator."})
    const {password,...OperatorData } = updateSchema.parse(req.body);

    // const Operator = operatorSchema.parse(req.body)
    const update = await db.operator.update({
      where: {uuid : id},
      data: {
        ...OperatorData,
        password: hashedPassword,
      }
    })

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data Operator updated succesfully.`
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
        description: "Failed to update data Operator."
      });
    }
  }
}

export const deleteOperator = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.operator.findOne({where: {uuid: id, deletedAt: null}})
    if(!idValid) return response.custom(res, {code: 400, message: "Failed to delete data Operator. invalid id Operator."})
    const deleted = await db.operator.update({
        deletedAt: new Date().toISOString()
    }, {where: {uuid : id}})
    response.success(res, {
      code: 200,
      length: 1,
      data: deleted,
      message: `Data role deleted succesfully.`
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
        description: "Failed to delete data role."
      });
    }
  }
}

