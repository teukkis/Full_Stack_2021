import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from "semantic-ui-react";
import { EntryFormValues, HealthCareTypes } from "../types";
import { HealthCareTypeOption, TextField, SelectField } from "./FormField";
import { useStateValue } from '../state';
import { DiagnosisSelection } from '../AddPatientModal/FormField';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCareTypeOption: HealthCareTypeOption[] = [
  { value: HealthCareTypes.OccupationalHealthcare, label: "Occupational healthcare" },
  { value: HealthCareTypes.Hospital, label: "Hospital" },
  { value: HealthCareTypes.HealthCheck, label: "HealthCheck" }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: (new Date).toString(),
        specialist: "",
        description: "",
        type: HealthCareTypes.Hospital,
        healthCheckRating: 2,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >

      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          /> 

            <SelectField
            label="Healhtcare option"
            name="type"
            options={healthCareTypeOption}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
