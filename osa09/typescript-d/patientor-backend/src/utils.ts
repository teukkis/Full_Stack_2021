import { 
  NewPatientEntry, 
  Gender, 
  Entry, 
} from './types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing social security number: ' + ssn);
  }
  return ssn;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name : unknown, dateOfBirth : unknown, gender : unknown, occupation : unknown, ssn : unknown, entries: Array<Entry>};

const toNewPatientEntry = ({name, dateOfBirth, gender, occupation, ssn, entries} : Fields) : NewPatientEntry => {
  const newEntry : NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSSN(ssn),
    entries: entries
  }
  return newEntry;
};



type EntryFields = { 
  date : unknown, 
  specialist : unknown, 
  description : unknown, 
  type: unknown, 
  employerName: unknown, 
  discharge: unknown,
  healthCheckRating: unknown
};

const validateNewEntry = (entryData: EntryFields) => {
  
  try {
    parseDateOfBirth(entryData.date);
    parseName(entryData.specialist);
    parseName(entryData.description);

    if (!entryData.type || entryData.type === "OccupationalHealthcare") {
      if (!entryData.employerName) {
        throw new Error('EmployerName undefined');
      }
      return true

    } else if (!entryData.type || entryData.type === "Hospital") {
      if (!entryData.discharge) {
        throw new Error('discharge undefined');
      }
      return true

    } else if (!entryData.type || entryData.type === "HealthCheck") {
      if (!entryData.healthCheckRating) {
        throw new Error('healthCheckRating undefined');
      }
      return true
    } else {
      throw new Error('Invalid values');
    }

    return true

  } catch (e) {
    throw new Error(e.message);
  }

}

export default { 
  toNewPatientEntry, 
  validateNewEntry 
};