import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Entry, HospitalEntry, OccupationalHealthCareEntry, HealthCheckEntry } from '../types';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

  return (
    <Card color='red' style={{width: "500px"}}>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='user doctor'/>
        </Card.Header>
        <Card.Description>
          <p>Description: {entry.description}</p>
          <p>Specialist: {entry.specialist}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {

  return (
    <Card color='red' style={{width: "500px"}}>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='wheelchair'/>
        </Card.Header>
        <Card.Description>
          <p>Description: {entry.description}</p>
          <p>Emplyer name: {entry.employerName}</p>
        </Card.Description>
      </Card.Content>
    </Card>    
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  return (
    <Card color='red' style={{width: "500px"}}>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='user doctor'/>
        </Card.Header>
        <Card.Description>
          <p>Description: {entry.description}</p>
        </Card.Description>
      </Card.Content>
    </Card>    
  );
};

const assertNever = (errorMsg: string): never => {
  throw new Error(`${errorMsg}`);
};

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever("error");
  }
};

export default EntryDetail;