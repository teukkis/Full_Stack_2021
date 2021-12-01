export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum HealthCareTypes {
  "OccupationalHealthcare" = "OccupationalHealthcare",
  "Hospital" = "Hospital",
  "HealthCheck" = "HealthCheck"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>
}

interface HealthBaseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
  diagnosisCodes?: Array<string>
}

export interface OccupationalHealthCareEntry extends HealthBaseEntry {
  type: HealthCareTypes,
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

export interface HospitalEntry extends HealthBaseEntry {
  type: HealthCareTypes,
  discharge: {
    date: string,
    criteria: string
  }
}

export interface HealthCheckEntry extends HealthBaseEntry {
  type: HealthCareTypes,
  healthCheckRating: HealthCheckRating;
}


export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = UnionOmit<Entry, "id" >;
