import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

const optionsWithDisabled = [
  { label: 'Pending', value: 'pending'},
  { label: 'InProgress', value: 'inProgress' },
  { label: 'Completed', value: 'completed', },
  // { label: 'Orange', value: 'Orange', disabled: true },
];

const Steps: React.FC | any = ({statusValue,initialStatus}) => {
  // const [value1, setValue1] = useState('Apple');

  const [value2, setValue2] = useState(initialStatus);

  const onChange2 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio2 checked', value);
    setValue2(value);
    statusValue(value)
  };

  return (
    <>
      <Radio.Group defaultValue={1}  style={{display:"flex",justifyContent:"flex-start"}} options={optionsWithDisabled} onChange={onChange2} value={value2} />
      <br />
    </>
  );
};

export default Steps;