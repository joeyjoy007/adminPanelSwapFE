/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { loginAdmin } from '../server/admin/admin';
// import { userCheck } from '../server/apis/user';
// import { Storage } from '../storage/Storage';
// import { loginUser } from '../server/apis';


export const AuthContext= createContext(null);

export const AuthProvider:any = ({ children }:any) => {


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
            } else if(response.status === 2 ){
                setUserInfo(response);
                console.log("Context Response==>",response);
                setUserToken(response.payload.token);
                setUserRole(response.payload.employee.role);
                setUserInfo(JSON.stringify(response));
                localStorage.setItem('userInfo',JSON.stringify(response))
                localStorage.setItem('userToken',response.payload.token)
                localStorage.setItem('userRole',response.payload.employee.role)
            }else{
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false);
            console.log("LOGIN ERROR=>",error)
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
        alert("logout successfull")
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
            }
            setIsLoading(false);
        } catch (error: any) {
            console.log('ERROR', error.message);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);
    return <AuthContext.Provider 
    value={{ login,userInfo,userRole,userToken,isLoading,logout,setFetchAgain,fetchAgain }}>{children}</AuthContext.Provider>;

};
