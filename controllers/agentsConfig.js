import db from "../dbconfig.js";
import jwt from "jsonwebtoken"

export const getUserInfo = (req, res, next) => {
     if (!req.session.user) return res.status(403).json({ message: "Unauthorized request" })

     let sessionToken = req.session.user
     jwt.verify(sessionToken, process.env.JWT_KEY, (err, userInfo) => {
          res.userInfo = userInfo
          next()
     })
}

export const getUserPollingUnit = (req, res) => {
     let userAssignPu = res.userInfo.unit_assigned
     const getPUname = "SELECT a.uniqueid, polling_unit_id, a.polling_unit_name, lga_name FROM polling_unit a JOIN lga b ON a.uniqueid = ? and a.lga_id = b.lga_id "
     db.query(getPUname, [userAssignPu], (err, results) => {
          if (err) return res.status(500).json({ message: "Error fetching user polling units" })

          let puResults = results.map(pu => ({ id: pu.uniqueid, name: pu.polling_unit_name, lga: pu.lga_name }))
          return res.json(puResults)

     })
}