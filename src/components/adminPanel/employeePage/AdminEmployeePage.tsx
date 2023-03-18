import React from 'react'
import Description1 from './Description'
import Tabs1 from './Tabs'
import { getEmployee } from '../../../server/employee/employee'
import { response } from 'express'
import Avatars from './avatar/Avatars'
import { Divider, Spin } from 'antd'

const AdminEmployeePage = () => {

  const [employeeDetails, setEmployeeDetails] = React.useState([])
  const [showDescription, setShowDescription] = React.useState<boolean>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    const employee = getEmployee().then((response: any)=>{
      setEmployeeDetails(response.payload)
      setLoading(false)
    }).catch((err)=>{
      setLoading(false)
      console.log("Employee Response ==> ",err.message);
    })
  }, [])
  

  return (
    <div >
    {/* <Tabs1/>
    <Description1/> */}
     {loading?(
    <div style={{height:400,justifyContent:"center",alignItems:"center",display:"flex"}}>
        <Spin/>
    </div>
     ):(
      <>
        <h3>
    Employee Information
   </h3>
    {employeeDetails.map((e)=>{
      console.log(showDescription,e._id)
      const setId = ()=>{
        setShowDescription(e._id)
      }
      return (
        <div style={{marginTop:"3%"}} >
        <p><Avatars title={e} setShowDescription={setId} buttonName={'Get Information'}/></p>
        {showDescription === e._id?(
          <Description1 user={e}/>
        ):(
          null
        )}
        <Divider/>
        </div>
      )
    })}
      </>
     )}
    </div>
  )
}

export default AdminEmployeePage