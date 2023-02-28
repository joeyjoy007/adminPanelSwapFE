import { Dropdown, MenuProps, Space } from 'antd';
import React from 'react'
import Modal1 from './Modal';
import { works } from '../../../server/work/work';

const DropDown1 = ({record}) => {
  const [readWorkData, setWorkData] = React.useState([])

  React.useEffect(() => {
    const work =  works().then((response:any)=>{

      setWorkData(response.payload)

    }).catch((err)=>{
      console.log("Work error==>",err)
    })
  }, [])

  const y =readWorkData?.map((e:any)=>{
    return {
      label:(
        <Modal1 name={e} record={record}/>
      ),
      key:e._id
    }
  })
  console.log("YU",y);
  

  const items: MenuProps['items'] = y
  
  return (
    <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Select 
        {/* <DownOutlined /> */}
      </Space>
    </a>
  </Dropdown>
  )
}

export default DropDown1