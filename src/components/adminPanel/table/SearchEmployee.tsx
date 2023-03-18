import React, { useContext } from "react"
import { getEmployee } from "../../../server/employee/employee"
import { assignWork, selectEmployeeForWork } from "../../../server/workAssign/workAssign"
import { AuthContext } from "../../../context/context"
import { allworkCreate } from "../../../server/allWork/allWork"
import { Spin, Tag, message } from "antd"
import EmployeUi from "./SearchEmployeeUi"

/* eslint-disable jsx-a11y/anchor-is-valid */
const SearchEmployee:any = ({workName,setOpenModal,record}:any) => {

    const [employeeName, setEmployeeName] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const {setFetchAgain,fetchAgain}: any = useContext(AuthContext);



    const selectForWork = async(e)=>{
      setLoading(true)
      try {
        const work = await allworkCreate({assignedItemId:record._id, selectedEmployee:e._id,
        selectedWork:workName._id,
        status:"pending"}).then((response: any)=>{
          setLoading(false)
          console.log("Response om select work ==> ",response);
          setOpenModal(false)
          setFetchAgain(!fetchAgain)
          messageApi.success({
            type:"success",
            content:"Employee assigned"
           });
        }).catch((err)=>{
          setLoading(false)
          console.log("error occured ==> ",err.message)
          setOpenModal(false)
          setFetchAgain(!fetchAgain)
          messageApi.error({
            type:"error",
            content:err.message
           });

        })
      } catch (error) {
        setLoading(false)
        console.log("Error in select work ==>",error)
        setOpenModal(false)
        setFetchAgain(!fetchAgain)
        messageApi.error({
          type:"error",
          content:"Employee not assigned"
         });
      }
    }

    React.useEffect(() => {
      setLoading(true)
      try {
        const employee = getEmployee().then((res:any)=>{
          setLoading(false)
          setEmployeeName(res.payload)
        }).catch((err)=>{
          setLoading(false)
          console.log("error==> ",err)
        })
      } catch (error) {
        setLoading(false)
        console.log("error occured ==>",error);
      }
    }, [])
    
    const [messageApi, contextHolder] = message.useMessage();


  return (
    <div style={{flexWrap:"wrap",justifyContent:"space-between"}}>
   {loading?(
    <Spin/>
   ):(
    <>
       {contextHolder}
      {employeeName.map((e:any)=>{
        return <a key={e._id} onClick={()=>selectForWork(e)} style={{height:30,borderRadius:1,width:'8rem',marginTop:'3%',alignSelf:'center',justifyContent:'center',alignItems:'center',color:"#222222"}}>
              {/* <p style={{textAlign:'center'}}>{e.name}</p> */}
              <Tag>{e.name}</Tag>
               </a>
      
    })}
      <EmployeUi onClick={selectForWork} employees={employeeName}/>
    </>
   )}
    </div>
  )
}

export default SearchEmployee