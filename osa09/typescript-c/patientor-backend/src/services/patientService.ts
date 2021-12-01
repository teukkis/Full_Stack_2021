import patientData from '../../data/patients'
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientEntry> = patientData;

const getNonSensitivePatientEntry = (): Array<NonSensitivePatientEntry> => {
  
  const temp = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
  return temp
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }
  patients.push(newPatientEntry);
  return newPatientEntry;
};


export default {
  getNonSensitivePatientEntry,
  addPatient
};
