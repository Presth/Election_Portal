import db from "../dbconfig.js";

const getElectoralResults = (req, res) => {
     const { poll_unit, local_govt } = req.query
     // console.log({ poll_unit, local_govt, lga })

     let get_Sql = "";
     let queryConditionParam = [];

     if (poll_unit) {
          get_Sql = `SELECT party_score, party_abbreviation FROM announced_pu_results WHERE polling_unit_uniqueid = ? `;
          queryConditionParam = [poll_unit];
     } else if (local_govt) {
          get_Sql = "SELECT party_score, party_abbreviation, polling_unit_id, polling_unit_name, lga_id FROM announced_pu_results a JOIN polling_unit b ON b.lga_id = ? and b.uniqueid=a.polling_unit_uniqueid ";
          queryConditionParam = [local_govt];
     } else {
          return res.status(403).json({ type: "failure", message: "Specification for fetch not met" })
     }
     db.query(get_Sql, queryConditionParam, (err, results) => {
          if (err) return res.status(500).json({ type: "error", message: "Server error" })

          // if (poll_unit) 
          return res.status(200).json({
               type: "success",
               poll_results: results
          })
     })
}

export default getElectoralResults