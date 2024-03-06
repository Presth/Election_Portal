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
          get_Sql = "SELECT party_score, party_abbreviation, polling_unit_id, polling_unit_name, lga_id FROM announced_pu_results a JOIN polling_unit b ON  b.polling_unit_id=a.polling_unit_uniqueid and b.lga_id = ? ";
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

          // console.log(lga)
          // // filter the specified lga result
          // const filteredResults = results.filter(result => {
          //      // console.log(result.lga_id);
          //      if (result.lga_id == lga) return result
          // })

          // return res.status(200).json({
          //      type: "success",
          //      poll_results: filteredResults
          // })
     })
}

// const getElectionResultsByLg = (req, res) => {
//      const { local_govt } = req.query

//      const get_Sql = `SELECT party_score, party_abbreviation FROM announced_pu_results a JOIN polling_unit b ON b.polling_unit_id=a.polling_unit_uniqueid AND b.lga_id = ? `;
//      db.query(get_Sql, [local_govt], (err, results) => {
//           if (err) res.status(500).json({ type: "error", message: "Server error" })

//           return res.status(200).json({
//                type: "success",
//                poll_results: results
//           })
//      })
// }

export default getElectoralResults