import React from 'react';
import { Affix, Col, Row } from 'antd';
import ButtonPrimary from '../helpers/Buttons/Button';
import ButtonNormal from '../helpers/Buttons/ButtonNormal';
import { getEmployeeDetail } from '../../server/employee/employee';

const WorkToComplete: React.FC = () => {
    const u = [1,23,4,5,,6,7,8,6,4,3,,4,5,6,7,6,5,7]

    const [assignedWork, setAssignedWork] = React.useState<any>([])

    React.useEffect(() => {
      const employeeDetail =  getEmployeeDetail({_id:'63fdca7b29e88523c13b8fc8'}).then((response: any)=>{
        console.log("Employee Response=> ",response.payload.assignedWork);
        setAssignedWork(response.payload.assignedWork)
      }).catch((error: any)=>{
        console.log("employee detail error ==>",error)
      })
    }, [])
    

return (
    <Affix offsetTop={10}>
   

   {u?.map((e: any)=>{
    return (
        <Row  style={{display:'flex',alignItems:'center',marginTop:'2%'}}>
        <Col span={6}>Assigned Work</Col>
        {/* <Col span={6}>{e?.assignedItemId.item}</Col> */}
        <Col span={6}>
          <ButtonPrimary name="Accept" onClick={()=>console.log("clicked")}/>
        </Col>
        <Col span={6}>
          <ButtonNormal name="Reject" onClick={()=>console.log("clicked")}/>
        </Col>
      </Row>
    )
   })}

  </Affix>
)
};

export default WorkToComplete;
