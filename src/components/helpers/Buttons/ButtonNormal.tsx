import React from 'react';
import { Button, Space } from 'antd';

const ButtonNormal: React.FC | any = ({name,onClick}) => (
  <Space wrap>
    <Button type="primary" onClick={onClick} >
      {name}
    </Button>
  </Space>
);

export default ButtonNormal;