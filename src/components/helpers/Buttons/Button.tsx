import React from 'react';
import { Button, Space } from 'antd';

const ButtonPrimary: React.FC | any = ({name,onClick}) => (
  <Space wrap>
    <Button type="primary" danger onClick={onClick}>
      {name}
    </Button>
  </Space>
);

export default ButtonPrimary;