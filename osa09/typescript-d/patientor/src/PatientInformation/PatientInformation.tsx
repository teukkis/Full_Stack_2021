import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import { List, Button } from 'semantic-ui-react';

import AddEntryModal from '../AddEntryModal';
import EntryDetail from '../components/EntryDetail';
import { EntryFormValues } from '../types';
import { useStateValue, addEntry } from "../state";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";


const PatientInformation = (): JSX.Element => {
  const [{ diagnosis }, dispatch ] = useStateValue();// eslint-disable-line  
  const [patient, setPatient] = React.useState<Patient>();
  const { id } = useParams<{ id: string }>();
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(patientFromApi);
      } catch(e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, []);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch( addEntry(newEntry) );
      closeModal();
    } catch (e) {   
      setError(e.response?.data?.message || 'Unknown error');

      
    }
  };

  const renderPatient = (patient : Patient) => { 
    return (
      <div key={patient.id}>
        <h3>{patient.name}</h3>
        <List>
          <List.Item>ssn: {patient.ssn}</List.Item>
          <List.Item>occupation: {patient.occupation}</List.Item>
          <List.Item>gender: {patient.gender}</List.Item>
        </List>
        <h5>Entries</h5>
        {
          patient.entries.map(( entry: Entry) => <EntryDetail key={entry.id} entry={entry}/>)
        }
      </div>
    );
  };

  return (
    <div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>New Entry</Button>
      {
        patient ? renderPatient(patient) : <p>wait...</p>
      }
    </div>
  );
};


export default PatientInformation;