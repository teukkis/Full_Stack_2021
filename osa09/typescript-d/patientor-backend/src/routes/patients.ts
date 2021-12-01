import express from 'express';

const patientRouter = express.Router();

import patientService from '../services/patientService';
import utils from '../utils';


patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntry())
});

patientRouter.get('/:id', (req, res) => {
  res.send(patientService.getPublicPatientEntry(req.params.id))
})

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry)
    res.status(201).json(addedEntry)
  } catch(e) {
    res.status(400).send(e.message);
  }
});

patientRouter.post('/:id/entries', (req, res) => {
  try {
    utils.validateNewEntry(req.body)
    const addedPatientEntry = patientService.addEntry(req.params.id, req.body)
    res.status(201).json(addedPatientEntry)
  } catch (e) {
    console.log(e.message)
    res.status(400).json({message: e.message});
  }
})

export default patientRouter;