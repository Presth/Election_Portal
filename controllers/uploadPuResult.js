import db from "../dbconfig.js";
import IP from 'ip';

export const uploadResult = (req, res) => {
     const {
          party, score, poll_unit
     } = req.body


     let agent = res.userInfo.name
     let clientIp = IP.address()

     const date_entered = new Date().toLocaleString()


     const sql = `INSERT announced_pu_results(polling_unit_uniqueid, party_abbreviation, 
          party_score, entered_by_user, date_entered, user_ip_address) VALUES (?)`;

     const insertValues = [
          poll_unit,
          party,
          score,
          agent,
          date_entered,
          clientIp]

     db.query(sql, [insertValues], (err, result) => {
          if (err) return res.status(200).json({ message: "Unable to submit this result" })
          return res.status(200).json({ type: "success", message: "Score have been successfully uploaded" })
     })
}
