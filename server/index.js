import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'
import User from './models/User.js'
import {dataAffiliateStat, dataOverallStat, dataProduct, dataProductStat, dataTransaction, dataUser} from "./data/index.js"
import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js'
import OverallStat from './models/overallStat.js'
import Affiliate from './models/AffiliateStat.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())

// routes

app.use("/client",clientRoutes)
app.use("/general",generalRoutes)
app.use("/management",managementRoutes)
app.use("/sales",salesRoutes)

// mongodb setup

const PORT = process.env.PORT || 9000
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => {
    app.listen(PORT,() => console.log(`Server is running on PORT ${PORT}`))
    // Affiliate.insertMany(dataAffiliateStat)
    // OverallStat.insertMany(dataOverallStat)
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
}).catch((error) => {
    console.log(error)
})