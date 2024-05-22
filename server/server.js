import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.get("/api", (res, req) => {
  res.json({"users": ['Userone', 'Usertwo', "userthree"]})
})

app.listen(8001, () => {
 console.log("server started on port 8001. Server is listening")
})