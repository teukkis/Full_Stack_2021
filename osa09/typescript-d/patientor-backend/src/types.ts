export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}

interface HealthBaseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
  diagnosisCodes?: Array<string>
}

export interface OccupationalHealthCareEntry extends HealthBaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

export interface HospitalEntry extends HealthBaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string
  }
}

export interface HealthCheckEntry extends HealthBaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating;
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;


export interface PatientEntry {
      id: string;
      name: string;
      dateOfBirth: string;
      ssn: string;
      gender: Gender;
      occupation: string;
      entries: Array<Entry>;
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NewHealthEntry = UnionOmit<Entry, 'id'>;