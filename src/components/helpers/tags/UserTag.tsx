import React from 'react';
import {
    UserOutlined 
} from '@ant-design/icons';
import { Space, Tag } from 'antd';

const UserTag: React.FC | any = ({text}) => (
  <Space size={[0, 8]} wrap>
    <Tag icon={<UserOutlined />} color="#55acee">
      {text}
    </Tag>
  </Space>
);

export default UserTag;