import {
    Route,
    Routes,
  } from "react-router-dom";
import Panel from "../components/layout/Layout";
import Login from "../authentication/Login";
import { useContext } from "react";
import { AuthContext } from "../context/context";
import ClientPanel from "../components/adminPanel/ClientPanel";


const Navigation = () => {
  const {userToken } = useContext(AuthContext)
  return (
    <>
      <Routes>
        {userToken === null?(
          <>
                   <Route path="*" element={<Login/>} />


          </>
        ):(
          <>
                   <Route path="/*" element={<Panel nav='/adminClientInformation'/>} />
          </>
        )}
      </Routes>
    </>
  )
}

export default Navigation