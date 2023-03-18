import React from 'react'
import { getAllClient } from '../../../server/client/client'
import { Button, Divider, Row, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import Avatars from '../employeePage/avatar/Avatars'
import Description1 from '../employeePage/Description'

const AdminClientInformation = () => {

    const [clients, setClients] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [showDescription, setShowDescription] = React.useState<boolean>(null)


    React.useEffect(() => {
      setLoading(true)
      const client = getAllClient().then((response: any)=>{
        setLoading(false)
    setClients(response.payload)
      }).catch((err)=>{ setLoading(false) 
        console.log("Err",err.message)})
    }, [])
    const navigate = useNavigate()
  return (
   <>
   
   {loading?(
        <div style={{height:400,justifyContent:"center",alignItems:"center",display:"flex"}}>
    <Spin/>
    </div>
   ):(
    <>
    <h3>
    Clients Information
   </h3>
    {clients.map((e: any)=>{
    const navigateToDashboard = ()=>{
      navigate('/adminClientInfo',{
        state:{id:e._id}
      })
    }
    return (
      <div style={{marginTop:"3%"}}>
      <p><Avatars title={e} onNaviagte={navigate} setShowDescription={navigateToDashboard} buttonName={'Show Work'}/></p>
      <Divider/>
      </div>
    )
   })}
    </>
   )}
  
   </>
  )
}

export default AdminClientInformation