import db from "../models/index.js"
import {z} from "zod"
import config from "../configs/auth.js"
import response  from "../utils/response.js"
import { createToken, verifyExpiration } from "../utils/refreshToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import refreshTokenModel from "../models/refreshToken.model.js";

const authSchema = z.object({
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
});

export const signup = async (req, res) => {
    try{
        const { password, ...user } = authSchema.parse(req.body);
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
            description: "Failed to create data user."
        });
        }
    }    
};

export const signin = async (req, res) => {

    if(req.body.loginAs == "user"){
        const user = await db.users.findOne({
            where: {
              email: req.body.email,
            },
        });
          
        if (!user) {
            // User not found, handle accordingly
            return response.custom(res, {
                code: 401,
                message: "User Not Found."
            })
        }
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        console.log(user)
        
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        
        const token = jwt.sign({ email: user.email, role: "user" }, config.secret, {
            expiresIn: config.jwtExpiration
        });
        // token.accessToken;
        // Set the access token as a cookie
        
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: config.jwtExpiration * 1000, // Convert seconds to milliseconds
            secure: process.env.NODE_ENV === 'production', // Set to true if your app uses HTTPS
        });
    
    
        let refreshToken = await createToken(db,user);
        return response.success(res, {
            code: 200,
            length: 1,
            data: {
                id: user.id,
                    nama: user.nama,
                    email: user.email,
                    accessToken: token,
                    refreshToken: refreshToken,
            },
            message: "Logged in succesfully."
        });
    }else{
        
        const operator = await db.operator.findOne({
            where: {
              email: req.body.email,
            },
        });
        console.log(operator);
          
        if (!operator) {
            // operator not found, handle accordingly
            return response.custom(res, {
                code: 401,
                message: "operator Not Found."
            })
        }
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            operator.password
        );
        
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        
        const token = jwt.sign({ email: operator.email, role: "operator" }, config.secret, {
            expiresIn: config.jwtExpiration
        });
        // token.accessToken;
        // Set the access token as a cookie
        
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: config.jwtExpiration * 1000, // Convert seconds to milliseconds
            secure: process.env.NODE_ENV === 'production', // Set to true if your app uses HTTPS
        });
    
    
        let refreshToken = await createToken(db,operator);
        return response.success(res, {
            code: 200,
            length: 1,
            data: {
                id: operator.id,
                    nama: operator.nama,
                    email: operator.email,
                    accessToken: token,
                    refreshToken: refreshToken,
            },
            message: "Logged in succesfully."
        });
    }
    
};

export const refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    
    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
      let refreshToken = db.refreshToken.findOne({ where: { token: requestToken } });
      
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      const user = await db.refreshToken.getUser();
      let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
        console.log(err)
    }
};


// module.exports = {
//     signupForm,
//     signup,
//     signin
// }