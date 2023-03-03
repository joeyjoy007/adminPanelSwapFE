import React from 'react'
import Description1 from './Description'
import Tabs1 from './Tabs'
import { getEmployee } from '../../../server/employee/employee'
import { response } from 'express'
import Avatars from './avatar/Avatars'
import { Divider } from 'antd'

const AdminEmployeePage = () => {

  const [employeeDetails, setEmployeeDetails] = React.useState([])
  const [showDescription, setShowDescription] = React.useState<boolean>(null)

  React.useEffect(() => {
    const employee = getEmployee().then((response: any)=>{
      setEmployeeDetails(response.payload)
    }).catch((err)=>{
      console.log("Employee Response ==> ",err.message);
    })
  }, [])
  

  return (
    <div >
    {/* <Tabs1/>
    <Description1/> */}
    {employeeDetails.map((e)=>{
      console.log(showDescription,e._id)
      return (
        <div >
        <p><Avatars title={e} setShowDescription={setShowDescription} description={showDescription}/></p>
        {showDescription === e._id?(
          <Description1 user={e}/>
        ):(
          null
        )}
        <Divider/>
        </div>
      )
    })}
    </div>
  )
}

export default AdminEmployeePage