import React from 'react';
import {
  ClockCircleOutlined
} from '@ant-design/icons';
import { Space, Tag } from 'antd';

const Pending: React.FC | any = ({text}) => (
  <>
    <Space size={[0, 8]} wrap>
    <Tag icon={<ClockCircleOutlined />} color="default">
        {text}
      </Tag>
    </Space>
  </>
);

export default Pending;