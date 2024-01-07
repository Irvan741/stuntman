import express from "express"
import cors from "cors"
import "dotenv/config"
import AllRoutes from "./routes/index.js"
import bodyParser from "body-parser"
import swaggerjsdoc from "swagger-jsdoc"
import swaggerui from "swagger-ui-express"
import options from './public/json/swagger.json' assert { type: 'json' };
import db from "./models/index.js";

const app = express()
const port = process.env.API_PORT || 3000
const accepted_client = process.env.API_ACCEPTED_CLIENT
// console.log(accepted_client);
app.use(cors({
  origin: function(origin, callback){
    if (!origin) {
      return callback(null, true);
    }

    // if (allowedOrigins.includes(origin)) {
    //   const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    //   return callback(new Error(msg), false);
    // }
    return callback(null, true);
  }
}))

// db.sequelize.sync({force: false})
//     .then(() => {
//         console.log('synced db');
//     })
//     .catch((err) => {
//         console.log(`Failed to sync db: ${err.message}`);
//     });

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



const spacs = swaggerjsdoc(options);
app.use('/api-docs',
    swaggerui.serve,
    swaggerui.setup(spacs)
);
app.use("/api", AllRoutes)
app.get("*", (req, res)=>{res.status(404).json({
  error : "Not Found"
})})

app.listen(3005, '172.16.10.171', ()=>{
  console.log(`API Running on 172.16.10.171:3005`)
})