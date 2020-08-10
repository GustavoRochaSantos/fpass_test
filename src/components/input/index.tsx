import React, { FormEvent } from 'react';
import { Container } from './style';

interface AddedProps {
  field?: string;
  id: string;
  type: string;
  label?: string;
  defaultValue: string;
  required?: boolean;
  maxLength?: number;
  readonly?: boolean;
  placeholder?: string;
  InputChange?: (event: FormEvent<HTMLInputElement>) => void;
  TextAreaChange?: (event: FormEvent<HTMLTextAreaElement>) => void;
}

const Field: React.FC<AddedProps> = props => {
  return (
    <Container>
      <label>{`${props.label || ''}`}</label>
      {props.field === 'textarea' ? (
        <textarea
          id="obs"
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          onChange={props.TextAreaChange}
          maxLength={300}
        />
      ) : (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={props.InputChange}
        />
      )}

      <br />
    </Container>
  );
};

export default Field;
