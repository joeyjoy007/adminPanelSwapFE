import React from 'react';
import {
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Space, Tag } from 'antd';

const Completed: React.FC | any = ({text}) => (
  <>
    <Space size={[0, 8]} wrap>
      <Tag icon={<CheckCircleOutlined />} color="success">
    {text}
      </Tag>
    </Space>
  </>
);

export default Completed;