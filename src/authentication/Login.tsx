
import { Button, Form, Input, Row } from 'antd'
import React, { useContext } from 'react'
import { AuthContext } from '../context/context';


const Login = () => {


  const {login} = useContext(AuthContext);
  
  const onFinish = (values: any) => {
    return login(values)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }; 
  return (
    <>
    <Row justify="center" align="middle" style={{minHeight: '100vh',backgroundColor:"#FEFCF3"}}>
<Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 ,border:'2px solid #F5EBE0',padding:20}}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
  </Form>
</Row>
    </>
  )
}

export default Login