import db from "../dbconfig.js"

export const getStates = (req, res) => {
     const get_Sql = `SELECT * FROM states`;
     db.query(get_Sql, [], (err, results) => {
          if (err) {
               console.log(err)
               return res.status(500).json({ type: "error", message: "Server error" })
          }

          return res.status(200).json({ states: results, type: "success" })
     })
}


export const getLocalGovt = (req, res) => {
     const { state } = req.params
     const get_Sql = `SELECT lga_id, lga_name FROM lga WHERE state_id = ? `;

     db.query(get_Sql, [state], (err, results) => {
          if (err) {
               console.log(err)
               return res.status(500).json({ type: "error", message: "Server error" })
          }

          return res.status(200).json({
               type: "success",
               local_govts: results
          })
     })


}



export const getPollUnits = (req, res) => {
     const { lga } = req.query

     const get_Sql = `SELECT uniqueid, polling_unit_id, polling_unit_name FROM polling_unit WHERE lga_id = ? `;

     db.query(get_Sql, [lga], (err, results) => {
          if (err) {
               console.log(err)
               return res.status(500).json({ type: "error", message: "Server error" })
          }

          let resultsTosend = results.map(pu => ({ id: pu.uniqueid, name: pu.polling_unit_name }))
          return res.status(200).json({
               type: "success",
               poll_units: resultsTosend
          })
     })
}

