import React from 'react';
import {
  SyncOutlined,
} from '@ant-design/icons';
import { Space, Tag } from 'antd';

const Progress: React.FC | any = ({text}) => (
  <>
    <Space size={[0, 8]} wrap>
      <Tag icon={<SyncOutlined spin />} color="processing">
        {text}
      </Tag>
    </Space>
  </>
);

export default Progress;