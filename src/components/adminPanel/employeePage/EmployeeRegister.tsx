import React from 'react';
import { Button, Checkbox, Form, FormInstance, Input, message } from 'antd';
import { createEmployee } from '../../../server/employee/employee';







const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};





const AdminEmployeeRegister: React.FC = () => {
    const formRef:any = React.useRef<FormInstance>(null);

    const onFinish = async(values: any) => {
        try {
          console.log(1);
          const employee = await createEmployee({...values,role:"employee"}).then((response: any)=>{
           messageApi.success({
            type:"success",
            content:"Registration success"
           });
            formRef.current?.resetFields();
          }).catch((err)=>{
            messageApi.error({
                type:"error",
                content:"Registration unsuccessfull "
               });
          })
        } catch (error) {
          console.log("Error occured ==> ",error)
        }
      };

      const [messageApi, contextHolder] = message.useMessage();
return (


 <>
 {contextHolder}
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 ,display:"flex",flexDirection:'column'}}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    ref={formRef}

  >
     
    <Form.Item
      label="Employee Name"
      name="name"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Phone Number"
      name="phoneNumber"
      
      rules={[{ required: true, message: 'Please input your phonenumber!',min:10,max:10}]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!',type:'email' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!',min:3 }]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
 </>
)
}

export default AdminEmployeeRegister;