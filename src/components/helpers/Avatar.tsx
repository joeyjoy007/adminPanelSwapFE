import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import React from 'react';

const Avatar1: React.FC = () => (
  <Space direction="vertical" size={16}>
    <Space wrap size={16}>
      <Avatar size="large" icon={<UserOutlined />} />
    </Space>
  </Space>
);

export default Avatar1;