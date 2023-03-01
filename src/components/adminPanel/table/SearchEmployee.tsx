import React, { useContext } from "react"
import { getEmployee } from "../../../server/employee/employee"
import { assignWork, selectEmployeeForWork } from "../../../server/workAssign/workAssign"
import { AuthContext } from "../../../context/context"
import { allworkCreate } from "../../../server/allWork/allWork"
import { message } from "antd"

/* eslint-disable jsx-a11y/anchor-is-valid */
const SearchEmployee:any = ({workName,setOpenModal,record}:any) => {

    const employee = [1,2,3,4,5,6,7,8,9,0,11,22,33,44,55,66]
    const [employeeName, setEmployeeName] = React.useState([])

    const {setFetchAgain,fetchAgain}: any = useContext(AuthContext);



    const selectForWork = async(e)=>{
      try {
        const work = await allworkCreate({assignedItemId:record._id, selectedEmployee:e._id,
        selectedWork:workName._id,
        status:"pending"}).then((response: any)=>{
          console.log("Response om select work ==> ",response);
          setOpenModal(false)
          setFetchAgain(!fetchAgain)
          messageApi.success({
            type:"success",
            content:"Employee assigned"
           });
        }).catch((err)=>{
          console.log("error occured ==> ",err.message)
          setOpenModal(false)
          setFetchAgain(!fetchAgain)
          messageApi.error({
            type:"error",
            content:err.message
           });

        })
      } catch (error) {
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
      try {
        const employee = getEmployee().then((res:any)=>{
          console.log("Response==>",res.payload);
          setEmployeeName(res.payload)
        }).catch((err)=>{
          console.log("error==> ",err)
        })
      } catch (error) {
        console.log("error occured ==>",error);
      }
    }, [])
    
    const [messageApi, contextHolder] = message.useMessage();


  return (
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
      {contextHolder}
    {employeeName.map((e:any)=>{
        return <a key={e._id} onClick={()=>selectForWork(e)} style={{border:'1px solid black',height:30,borderRadius:1,width:'8rem',marginTop:'3%',alignSelf:'center',justifyContent:'center',alignItems:'center',color:"#222222"}}>
              <p style={{textAlign:'center'}}>{e.name}</p>
               </a>
      
    })}
    </div>
  )
}

export default SearchEmployee