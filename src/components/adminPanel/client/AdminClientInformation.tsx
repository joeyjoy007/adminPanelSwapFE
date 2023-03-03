import React from 'react'
import { getAllClient } from '../../../server/client/client'
import { Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import Avatars from '../employeePage/avatar/Avatars'
import Description1 from '../employeePage/Description'

const AdminClientInformation = () => {

    const [clients, setClients] = React.useState([])
    const [showDescription, setShowDescription] = React.useState<boolean>(null)


    React.useEffect(() => {
      const client = getAllClient().then((response: any)=>{
    setClients(response.payload)
      }).catch((err)=>console.log("Err",err.message))
    }, [])
    const navigate = useNavigate()
  return (
   <>
   {clients.map((e: any)=>{
    const navigateToDashboard = ()=>{
      navigate('/adminClientInfo',{
        state:{id:e._id}
      })
    }
    return (
      <div >
      <p><Avatars title={e} onNaviagte={navigate} setShowDescription={navigateToDashboard} buttonName={'Show Work'}/></p>
      <Divider/>
      </div>
    )
   })}
  
   </>
  )
}

export default AdminClientInformation