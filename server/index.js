import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'

/* CONFIGURATION */
dotenv.config(); //dotenv.config(); is used to load environment variables from a .env file into process.env in Node.js.
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })) //This line sets a specific Cross-Origin Resource Policy (CORP) header using Helmet, allowing resources from your server to be shared across different origins.  This tells the browser: “Resources (like images, scripts) from this server can be accessed by other origins.”
app.use(morgan("common")) //Logs HTTP requests in Apache-style format
app.use(bodyParser.json()) //It tells your Express app to parse incoming JSON request bodies and make them available on req.body.
app.use(bodyParser.urlencoded({ extended: false })) //for POST req, This middleware parses URL-encoded data (typically from HTML form submissions) and makes it available in req.body.
app.use(cors()); //This allows your backend to accept requests from different origins (domains/ports). By default, browsers block requests from a different origin for security.

/* ROUTES */
app.use("/client", clientRoutes) // It will include all client routes
app.use("/general", generalRoutes) //for grttting users and dashboard
app.use("/management", managementRoutes) // It will include all management routes
app.use("/sales", salesRoutes) // It will include all sales routes


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port ${PORT}`))
}).catch((err)=> console.log(`${err} did not connect.`))