import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Stack } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import IconedButton from './IconedButton';

/**
 * Function to have a variable length input for things like interest arrays
 * @param inputArray Array to use as existing information
 * @param placeholder Placeholder value for the array
 * @param name Name of the form field
 * @constructor
 */
export default function MultiInput({ inputArray = [], placeholder, name } : {inputArray?: string[], placeholder: string, name: string,  }) {
  const [inputs, setInputs] = useState(inputArray);

  const addInput = () => {
    const newInputs = [...inputs, ''];
    setInputs(newInputs);
  };

  const removeInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index)
    setInputs(newInputs);
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = inputs.slice();
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <Stack gap={2}>
      {inputs.map((input, index) => (
        <div key={index} className="input-group col-6">
          <FormControl
            type="text"
            value={input}
            placeholder={`${placeholder}`}
            name={`${name}${index}`}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <Button variant={'danger'} onClick={() => removeInput(index)}>
            <i className={"bi bi-trash3"}/>
          </Button>
        </div>
      ))}
      <Button id="add-input" variant={"light"} onClick={addInput}>+</Button>
      </Stack>
  );
}
