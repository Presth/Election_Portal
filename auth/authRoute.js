import express from "express";
import path from 'path'
import db from "../dbconfig.js";
import jwt from "jsonwebtoken"
import { getUserInfo, getUserPollingUnit } from "../controllers/agentsConfig.js";
import { uploadResult } from "../controllers/uploadPuResult.js";

const router = express.Router()

router.get("/upload", (req, res) => {
     if (!req.session.user) {
          return res.sendFile(path.resolve("auth", "login.html"));
     }

     return res.sendFile(path.resolve('auth', "uploadResult.html"));
})

router.post('/login', (req, res) => {
     const { email, password } = req.body;

     if (email == "" || password == "") return res.status(200).json({ message: "Invalid credentials" })

     const checkUSerindb = "SELECT * FROM agentname WHERE email=? AND phone = ? LIMIT 1";

     db.query(checkUSerindb, [email, password], (err, userInfo) => {
          if (err) return res.status(200).json({ message: "Error fetching user info", stack: process.env.NODE_ENV == "production" ? null : err });

          if (userInfo.length == 0) return res.status(200).json({ message: "Invalid login credential", })


          const { firstname, lastname, email, phone, pollingunit_uniqueid } = userInfo[0]
          const userData = { name: `${firstname} ${lastname}`, email, phone, unit_assigned: pollingunit_uniqueid }

          const sessionToken = jwt.sign(userData, process.env.JWT_KEY)
          req.session.user = sessionToken
          req.session.authentication = true;
          return res.status(200).json({ type: "success" })
     })
})

const logoutUser = (req, res) => {
     req.session.destroy()
     return res.status(200).json({ status: true })
}

router.get("/api/agent_poll_units", getUserInfo, getUserPollingUnit)
router.post("/api/upload", getUserInfo, uploadResult)
router.post("/api/logout", logoutUser)


export default router