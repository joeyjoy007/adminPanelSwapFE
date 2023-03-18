/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Avatar, List, Tag, message } from 'antd';
import VirtualList from 'rc-virtual-list';

interface UserItem {
  name: string;
  _id:React.Key
  
}


const ContainerHeight = 300;

const EmployeUi: React.FC | any= ({employees,onClick}) => {
  const [data, setData] = useState<UserItem[]>([]);

//   const appendData = () => {
//     fetch(fakeDataUrl)
//       .then((res) => res.json())
//       .then((body) => {
//         setData(employees);
//         message.success(`${employees.length} more items loaded!`);
//       });
//   };

//   useEffect(() => {
//     appendData();
//   }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {

    }
  };

  return (
    <List>
      <VirtualList
        data={employees}
        height={ContainerHeight}
        // itemHeight={0}
        itemKey="_id"
        onScroll={onScroll}
        style={{flex:1}}
      >
        {(item: UserItem) => (
          <List.Item key={item._id}>
            <List.Item.Meta
            //   avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design"></a>}
              description={ <a onClick={()=>onClick(item)}><Tag>{item.name}</Tag></a>}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default EmployeUi;