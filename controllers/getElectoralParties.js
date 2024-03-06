import db from "../dbconfig.js";

export const getParties = (req, res) => {

     const get_Sql = `SELECT partyid, partyname FROM party`;

     db.query(get_Sql, [], (err, partyQueryResults) => {
          if (err) {
               console.log(err)
               return res.status(500).json({ type: "error", message: "Server error" })
          }

          const parties = partyQueryResults.map((party) => ({ id: party.partyid, name: party.partyname }))
          return res.status(200).json({
               type: "success",
               parties: parties
          })
     })
}