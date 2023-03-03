import React from 'react';
import { Descriptions } from 'antd';
import Tags from '../../helpers/Tags';
import Progress from '../../helpers/tags/Progress';
import Pending from '../../helpers/tags/Pending';
import Completed from '../../helpers/tags/Completed';

const Description1: React.FC | any = ({user}) => 

{
  console.log("USEr",user)
  return (
    <div>
    <Descriptions
      title={`${user.name} information`}
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
     {user?.assignedWork.length > 0?(
      user?.assignedWork.map((e)=>{
        return (
          <>
           <Descriptions.Item label="Item assigned">{e.assignedItemId.item}</Descriptions.Item>
        <Descriptions.Item label="Work assigned">{e.selectedWork.name}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {e.status === 'inProgress' ? <Progress text = {e.status}/>:e.status === 'pending'?<Pending text={e.status} />:e.status === 'completed'?<Completed text={e.status}/>:null}
        </Descriptions.Item>
      
          </>
        )
       })
     ):(
      <p>Work not assigned</p>
     )}
    </Descriptions>
  </div>
);
  
}

export default Description1;