import patientData from '../../data/patients'
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, PublicPatient, Entry, NewHealthEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientEntry> = patientData;

const getNonSensitivePatientEntry = (): Array<NonSensitivePatientEntry> => {
  
  const temp = patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name, 
    dateOfBirth, 
    gender, 
    occupation,
    entries
  }));
  return temp
}

const getPublicPatientEntry = (id: string): PublicPatient => {
  return patients.filter(p => p.id === id)[0]
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: NewHealthEntry): Entry => {
  const patient = patients.find(p => p.id === patientId)
  const newEntry = {
    id: uuid(),
    ...entry
  }
  patient?.entries.push(newEntry)
  return newEntry
}

export default {
  getNonSensitivePatientEntry,
  addPatient,
  getPublicPatientEntry,
  addEntry
};
