/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { loginAdmin } from '../server/admin/admin';
import { message } from 'antd';

// import { userCheck } from '../server/apis/user';
// import { Storage } from '../storage/Storage';
// import { loginUser } from '../server/apis';


export const AuthContext= createContext(null);


export const AuthProvider:any = ({ children }:any) => {

        // {contextHolder}

        const [messageApi, contextHolder] = message.useMessage();

        
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [userInfo, setUserInfo] = useState<any>('');
    const [fetchAgain, setFetchAgain] = useState(false);



    const login:any = async (data: any) => {
        console.log("Data==>",data);
        setIsLoading(true);
        try {
            
            const response:any = await loginAdmin(data);
            console.log("RE",response);
            if (response.status === 1) {

                setUserInfo(response);
                console.log("Context Response==>",response);
                setUserToken(response.payload.token);
                setUserRole(response.payload.admin.role);
                setUserInfo(JSON.stringify(response));
                localStorage.setItem('userInfo',JSON.stringify(response))
                localStorage.setItem('userToken',response.payload.token)
                localStorage.setItem('userRole',response.payload.admin.role)
                setIsLoading(false);
                messageApi.success({
                    type:"success",
                    content:"Login success"
                   });
            } else if(response.status === 2 ){
                setUserInfo(response);
                console.log("Context Response==>",response);
                setUserToken(response.payload.token);
                setUserRole(response.payload.employee.role);
                setUserInfo(JSON.stringify(response));
                localStorage.setItem('userInfo',JSON.stringify(response))
                localStorage.setItem('userToken',response.payload.token)
                localStorage.setItem('userRole',response.payload.employee.role)
                setIsLoading(false);
                messageApi.success({
                    type:"success",
                    content:"Login success"
                   });
            } else if(response.status === 3 ){
                setUserInfo(response);
                console.log("Context Response==>",response);
                setUserToken(response.payload.token);
                setUserRole(response.payload.client.role);
                setUserInfo(JSON.stringify(response));
                localStorage.setItem('userInfo',JSON.stringify(response))
                localStorage.setItem('userToken',response.payload.token)
                localStorage.setItem('userRole',response.payload.client.role)
                setIsLoading(false);
                messageApi.success({
                    type:"success",
                    content:"Login success"
                   });
            }
            
            else{
                setIsLoading(false)
                messageApi.error({
                    type:"error",
                    content:"Login unsuccess"
                   });
            }
        } catch (error) {
            setIsLoading(false);messageApi.error({
                type:"error",
                content:error.message
               });
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        setUserRole(null)
         localStorage.removeItem('userToken');
         localStorage.removeItem('userRole');
         localStorage.removeItem('userInfo');
        setIsLoading(false);
        messageApi.success({
            type:"success",
            content:"Logout success"
           });
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            const userToken = localStorage.getItem('userToken');
            const userRole = localStorage.getItem('userRole');
            const userInfo = localStorage.getItem('userInfo');
            if (userToken !== undefined) {
                setUserToken(userToken);
                setUserRole(userRole);
                setUserInfo(userInfo);
                
                // messageApi.info({
                //     type:"info",
                //     content:"Welcome"
                //    });
            }
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            messageApi.error({
                type:"error",
                content:error.message
               });
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);
    return (
      <>
        {contextHolder}
        <AuthContext.Provider 
        value={{ login,userInfo,userRole,userToken,isLoading,logout,setFetchAgain,fetchAgain }}>{children}</AuthContext.Provider>;
      </>
    )
    
   

};
