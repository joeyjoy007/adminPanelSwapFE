import {
    Route,
    Routes,
  } from "react-router-dom";
import Panel from "../components/layout/Layout";
import Login from "../authentication/Login";
import { useContext } from "react";
import { AuthContext } from "../context/context";


const Navigation = () => {
  const {userToken} = useContext(AuthContext)
  return (
    <>
      <Routes>
        {userToken === null?(
          <>
                   <Route path="*" element={<Login/>} />

          </>
        ):(
          <>
                   <Route path="/*" element={<Panel/>} />
          </>
        )}
      </Routes>
    </>
  )
}

export default Navigation