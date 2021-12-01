import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Form } from "semantic-ui-react";
import { HealthCareTypes } from "../types";


export type HealthCareTypeOption = {
  value: HealthCareTypes;
  label: string
};

type SelectFieldProps = {
  name: string;
  label: string;
  options: HealthCareTypeOption[];
};

export const SelectField = ({ name, label, options }: SelectFieldProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          );
        })}
      </Field>
    </Form.Field>
  );
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );
};

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field {...field} type='number' min={min} max={max} />

      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );
};

