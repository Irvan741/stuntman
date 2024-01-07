import db from "../models/index.js"
import {z} from "zod"
import response  from "../utils/response.js"
import bcrypt from 'bcrypt';

const userSchema = z.object({
  nik: z.string().max(16),
  name: z.string().max(255),
  tanggal_lahir: z.string().datetime(),
  jenis_kelamin: z.string().max(255),
  kecamatan: z.string().max(7),
  kelurahan: z.string().max(10),
  email: z.string().max(255),
  password: z.string().max(255),
  role: z.string().max(255),
  instansi: z.string().max(255).optional(),
  petugas: z.string().uuid().optional(),
  last_login: z.string().datetime().optional(),
});

const updateSchema = z.object({
  nik: z.string().max(16).optional(),
  name: z.string().max(255).optional(),
  tanggal_lahir: z.string().datetime().optional(),
  jenis_kelamin: z.string().max(255).optional(),
  kecamatan: z.string().max(7).optional(),
  kelurahan: z.string().max(10).optional(),
  email: z.string().max(255).optional(),
  password: z.string().max(255).optional(),
  role: z.string().max(255).optional(),
  instansi: z.string().max(255).optional(),
  petugas: z.string().uuid().optional(),
  last_login: z.string().datetime().optional(),
});

const fetchSchema = {
  uuid: true,
  email: true,
  name: true,
  nik: true,
  uuid_instansi: true,
  role: true,
  uuid_petugas: true,
  last_login: true,
  password: false,
  createdAt: true,
}


function exclude(user,keys){
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  )
}

export const getUsers = async(req, res) => {
  const {email, nik, name, role} = req.query
  try{
    const users = email ? await db.users.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email,
        deletedAt: null
      }, 
      select: {
        ...fetchSchema,
        updatedAt: false,
        deletedAt: false,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    : nik ? await db.users.findOne({
        attributes: { exclude: ['password'] },
        where: {
          nik,
          deletedAt: null
        }, 
        
        select: {
          ...fetchSchema,
          updatedAt: false,
          deletedAt: false,
        },
        orderBy: {
          createdAt: 'desc'
        }
    })
    
    : name ? await db.users.findAll({
      attributes: { exclude: ['password'] },
      where: {
        name,
        deletedAt: null
      }, 
      select: {
        ...fetchSchema,
        updatedAt: false,
        deletedAt: false,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    : role ? await db.users.findAll({
      attributes: { exclude: ['password'] },
      where: {
        role,
        deletedAt: null
      }, 
      select: {
        ...fetchSchema,
        updatedAt: false,
        deletedAt: false,
      },
      
      orderBy: {
        createdAt: 'desc'
      }
    })
  
    : await db.users.findAll({
      attributes: { exclude: ['password'] },
      where: {
        deletedAt: null
      }, 
      select: {
        ...fetchSchema,
        updatedAt: false,
        deletedAt: false,
      },
      orderBy: {
        createdAt: 'desc'
      },
    })

    if(!users || users.length == 0) {
      return response.custom(res, {
        code: 400,
        data: null,
        message: "Users is empty."
      })
    }
    const excludedUsers = exclude(users, ['password'])
    return response.success(res, {
      code: 200,
      data: users,
      message: "Get all users succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all users."
    })
  }
}

export const getUsersDetail = async(req, res) => {
  const {email, nik, name, role} = req.query
  try{
    const users = email ? [await db.users.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email,
        deletedAt: null
      }, 
      select: {
        ...fetchSchema,
        updatedAt: false,
        deletedAt: false,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })]
    : nik ? [await db.users.findOne({
        attributes: { exclude: ['password'] },
        where: {
          nik,
          deletedAt: null
        }, 
        
        select: {
          ...fetchSchema,
          updatedAt: false,
          deletedAt: false,
        },
        orderBy: {
          createdAt: 'desc'
        }
    })]
    
    : name ? await db.users.findAll({
      attributes: { exclude: ['password'] },
      where: {
        name,
        deletedAt: null
      }, 
      select: {
        ...fetchSchema,
        updatedAt: false,
        deletedAt: false,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    : role ? await db.users.findAll({
      attributes: { exclude: ['password'] },
      where: {
        role,
        deletedAt: null
      }, 
      select: {
        ...fetchSchema,
        updatedAt: false,
        deletedAt: false,
      },

      orderBy: {
        createdAt: 'desc'
      }
    })
  
    : await db.users.findAll({
      attributes: { exclude: ['password'] },
      where: {
        deletedAt: null
      }, 
      select: {
        ...fetchSchema,
        updatedAt: false,
        deletedAt: false,
      },
      orderBy: {
        createdAt: 'desc'
      },
    });
    const usersWithInstansi = await Promise.all(
      users.map(async (user) => {
        try {
          // Ensure user is not undefined
          if (!user) {
            return null;
          }
    
          // Fetch instansi only if instansi is not null or undefined
          const instansi = user.instansi ? await user.getInstansi(user.instansi) : null;
    
          let kecamatan = null;
          let kelurahan = null;
    
          // Fetch kecamatan and kelurahan only if instansi is not null
          if (instansi) {
            const kecamatan = instansi.kecamatan ? await instansi.getKecamatan(instansi.kecamatan) : null;
            const kelurahan = instansi.kelurahan ? await instansi.getKelurahan(instansi.kelurahan) : null;
          }
    
          return {
            ...user.toJSON(),
            instansi: instansi
              ? {
                  ...instansi.toJSON(),
                  kecamatan,
                  kelurahan,
                }
              : null,
          };
        } catch (error) {
          console.error(`Error fetching instansi for user ${user.uuid}:`, error);
          return null;
        }
      })
    );
    
    const validUsersWithInstansi = usersWithInstansi.filter((user) => user !== null);
    
    if(!users || users.length == 0) {
      return response.custom(res, {
        code: 400,
        data: null,
        message: "Users is empty."
      })
    }
    return response.success(res, {
      code: 200,
      data: validUsersWithInstansi,
      message: "Get all users succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all users."
    })
  }
}

export const getByIdUsers = async(req, res) => {
  const {id} = req.params;
  try{
    const users = await db.users.findOne({
      where: {
        deletedAt: null,
        uuid: id
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    })
    if(!users) {
      return response.custom(res, {
        code: 400,
        message: "Users is empty."
      })
    }
    return response.success(res, {
      code: 200,
      data: users?.petugasA,
      message: "Get all users succesfully."
    })
  }catch(e){
    return response.error(res, {
      code: 400,
      message: e.message,
      description: "Error getting all users."
    })
  }
}

export const createUser = async (req, res) => {
  try{
    const { password, ...user } = userSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkEmail = await db.users.findOne({
            where: { email: user.email }
        });

        if (checkEmail) {
            return response.custom(res, {
                code: 401,
                message: "User Already Exists."
            });
        }

        const create = await db.users.create({
            ...user,
            password: hashedPassword,
        });
    response.success(res, {
      code: 201,
      length: 1,
      data: create,
      message: "Data user created succesfully."
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
          description: "Failed to create data User."
        });
      }
  }
}

export const updateUser = async(req, res) => {
  const {id} = req.params
  try{
    const idValid = await db.users.findOne({ where: { uuid: id } });
    if (!idValid) return response.custom(res, { code: 404, message: "Failed to update data user. invalid id user." });

    const { password, ...UserData } = updateSchema.parse(req.body);
    const passwordValid = req.body.password ? password : null;
    const hashPassword = passwordValid != null ? await bcrypt.hash(password, 10) : null;
    const update = req.body.password ? 
        await db.users.update({
          ...UserData,
          password: hashPassword,
        }, {
          where: { uuid: id },
        })
        : await db.users.update({
          ...UserData
        }, {
          where: { uuid: id },
        });

    response.success(res, {
      code: 200,
      length: 1,
      data: update,
      message: `Data user updated successfully.`
    });

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
        description: "Failed to update data user."
      });
    }
  }
}

export const deleteUser = async( req, res ) => {
  const {id} = req.params
  try{
    const idValid = await db.users.findOne({where: {uuid: id, deletedAt: null}})
    if(!idValid) return response.custom(res, {code: 400, message: "Failed to delete data users. invalid id users."})
    const deleted = await db.users.update({
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

