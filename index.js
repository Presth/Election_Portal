import express from 'express';
import path from 'path';
import { existsSync } from 'fs';
import dotenv from 'dotenv';

import expressSession from "express-session";

import AppRoutes from './routesConfig.js';
import AuthRoute from './auth/authRoute.js';

const app = express();

dotenv.config();


const PORT = process.env.PORT || 5000;

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(expressSession({ secret: process.env.SESSION_KEY, saveUninitialized: false }))

// Api routes
app.use('/api', AppRoutes)
app.use("/", AuthRoute)


app.listen(PORT, () => {
     console.log(`Server listening on port ${PORT}`)
})
