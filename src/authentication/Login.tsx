
import { Button, Form, Input, Row } from 'antd'
import React, { useContext } from 'react'
import { AuthContext } from '../context/context';
import blu from './assets/bluee.jpg'


const Login = () => {


  const {login, isLoading} = useContext(AuthContext);
  
  const onFinish = (values: any) => {
    return login(values)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }; 
  return (
    <>
    <Row justify="center" align="middle" style={{minHeight: '100vh',backgroundColor:"#FEFCF3",  backgroundImage: "url(" + blu + ")" 
}}>

<Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 ,border:'2px solid #F5EBE0',padding:"16px",backgroundColor:"rgba(255,255,255,0.33)",boxShadow:"0px 8px 24px 0 rgba(0,0,255,0.33",backdropFilter:"blur(3px)",borderRadius:"16px"}}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
      <h2 style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
    Arceditz
  </h2>
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
      <Button type="primary" htmlType="submit" block loading={isLoading}>
        Login
      </Button>
    </Form.Item>
  </Form>
</Row>
    </>
  )
}

export default Login