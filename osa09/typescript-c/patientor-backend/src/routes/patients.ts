import express from 'express';

const patientRouter = express.Router();

import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';


patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntry())
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry)
    res.status(201).json(addedEntry)
  } catch(e) {
    res.status(400).send(e.message);
  }
});

export default patientRouter;