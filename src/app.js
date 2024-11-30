import "dotenv/config"
import cors from "cors"
import cookieParse from "cookie-parser"
import express from "express"
import getInTouchRouter from "./routers/get_in_touch.routes.js"


const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParse())


app.use("/api" , getInTouchRouter)


export {app}