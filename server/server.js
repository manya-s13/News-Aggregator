import express from "express";
import axios from "axios";
import cors from "cors"
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"

dotenv.config();

mongoose.connect(process.env.MONGO_URI) 
.then(()=> console.log("connected to database"))
.catch(error => console.log(error));

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use("/api/auth", userRoute);

const API_KEY = process.env.API_KEY;

function fetchNews(url, res){
    axios.get(url)
    .then(response =>{
        if(response.data.totalResults>0){
            res.json({
                status: 200,
                success: true,
                messaage: "successfully fetched data",
                data: response.data
            });
        } else{
            res.json({
                status: 200,
                success: true,
                message: "no more results to show"

            })
        }
    })
    .catch(error => {
        res.json({
            status: 500,
            success: false,
            message: "failed to fetch data",
            error: error.messaage
        });
    });
}


app.get("/all-news", (req, res) =>{
    let pageSize = parseInt(req.query.pageSize) || 40;  
    let page = parseInt(req.query.page) || 1;
    let url =  `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

//top headlines
app.options("/top-headlines", cors());
app.get("/top-headlines", (req, res)=>{
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "business"

    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

//country-specific
app.options("/country/:iso", cors());
app.get("/country/:iso", (req, res)=>{
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let country = req.params.iso;

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
    fetchNews(url, res);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`);
});