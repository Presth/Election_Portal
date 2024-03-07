import express from 'express';
import getElectoralResults from './controllers/getElectoralResults.js';
import { getLocalGovt, getPollUnits, getStates } from './controllers/lg_polls.js';
import { getParties } from './controllers/getElectoralParties.js';

const router = express.Router();

router.get("/getElectionResult", getElectoralResults)
router.get("/states", getStates)
router.get("/states/:state/lgs", getLocalGovt)
router.get("/poll_units", getPollUnits)
router.get("/parties", getParties)


export default router