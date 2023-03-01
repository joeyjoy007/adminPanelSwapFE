import React, { useContext, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography, message } from 'antd';
import DropDown1 from './DropDown';
import { createAssignWork, deleteWork, getAssignWork, updateAssignWork } from '../../../server/workAssign/workAssign';
import { AuthContext } from '../../../context/context';
import UploadF from '../../helpers/Upload';

interface Item {
  _id: number;
  item: string;
  script: string;
  voice_over: string;
  video: string;
  thumbnail: string;
}

const dummyData = [
  {
    _id:1,
    item:"Jerry",
    script:"Done",
    voice_over:"New yourk",
    video:"Done",
    thumbnail:"Done"
  },
  {
    _id:2,
    item:"Tom",
    script:"Dione",
    voice_over:"Australia",
    video:"Done",
    thumbnail:"done"
  }
]

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DataTable: React.FC = () => {
  const [form] = Form.useForm();
  // const [data, setData] = useState(dummyData);
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState<Number>(0);
  const [count, setCount] = React.useState(3)

  const isEditing = (record: Item) => record._id === editingKey;

  const edit = (record: Partial<Item> & { _id: React.Key }) => {
    form.setFieldsValue({ item: '', script: '', voice_over: '',video:'',thumbnail:'' ,...record });
    setEditingKey(record._id);
  
  }
  
const {fetchAgain} = useContext(AuthContext);


  React.useEffect(() => {
    const getItems = getAssignWork().then((response:any)=>{
      setData(response.payload)
    }).catch((Err)=>{
      console.log("error occured==>",Err);
    })
  }, [editingKey,count, fetchAgain])
  


  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (_id: React.Key,record) => {
    try {
      // console.log("Record",...data)


      const row = (await form.validateFields()) as Item;
      const work = updateAssignWork({itemId:record._id,item:row.item}).then((response: any)=>{
        console.log("updated item==> ",response)
        setEditingKey(0)
        messageApi.success({
          type:"success",
          content:"Work Saved"
         });
        

      }).catch((err:any)=>{
        messageApi.error({
          type:"error",
          content:"Work not saved"
         });
      })


      // const newData = [...data];
      // console.log("ND",newData)
      // const index = newData.findIndex((item) => _id === item._id);
      // if (index > -1) {
      //   const item = newData[index];
      //   newData.splice(index, 1, {
      //     ...item,
      //     ...row,
      //   });
      //   setData(newData);
      //   setEditingKey(0);
      // } else {
      //   newData.push(row);
      //   setData(newData);
      //   setEditingKey(0);
      // }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      width: '30%',
      editable: true,
      
      
    },
    {
      title: 'Employee',
      dataIndex: 'select_employee',
      width:'5%',
    render: (_: any, record: Item) => {
      const editable = isEditing(record);
      return editable ? (
        <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record)}>
          Add
        </Typography.Link>
      ) : (
        <DropDown1 record={record}></DropDown1>
      );
    },
      
    },
    {
      title: "Script",
      width:'10%',
      dataIndex: "script",
      render: (_: any, record: any) => {
        const filtWork = record?.workBookings?.filter((e:any)=>e?.selectedWork?.name === "Script");
        return (
          <>
          <p style={{color:filtWork?.[0]?.status === 'pending'?"red":filtWork?.[0]?.status==='inProgress'?'orange':filtWork?.[0]?.status==='completed'?'green':'black'}}>{filtWork?.[0]?filtWork[0].status:'Null'}</p>
          <UploadF/>
          </>
        )
      },
      key: "script"
    },
    {
      title: "Voice over",
      width:'10%',
      dataIndex: "script",
      render: (_: any, record: any) => {
        const filtWork = record?.workBookings?.filter((e:any)=>e.selectedWork.name === "Voice over");
        return <p style={{color:filtWork?.[0]?.status === 'pending'?"red":filtWork?.[0]?.status==='inProgress'?'orange':filtWork?.[0]?.status==='completed'?'green':'black'}}>{filtWork?.[0]?filtWork[0].status:'Null'}</p>
      },
      key: "voice_over"
    },
    {
      title: "Video",
      width:'10%',
      dataIndex: "video",
      render: (_: any, record: any) => {
        const filtWork = record?.workBookings?.filter((e:any)=>e.selectedWork.name === "Video");
        return <p style={{color:filtWork?.[0]?.status === 'pending'?"red":filtWork?.[0]?.status==='inProgress'?'orange':filtWork?.[0]?.status==='completed'?'green':'black'}}>{filtWork?.[0]?filtWork[0].status:'Null'}</p>
      },
      key: "video"
    },
    {
      title: "Thumbnail",
      width:'10%',
      dataIndex: "thumbnail",
      render: (_: any, record: any) => {
        const filtWork = record?.workBookings?.filter((e:any)=>e.selectedWork.name === "Thumbnail");
        return <p style={{color:filtWork?.[0]?.status === 'pending'?"red":filtWork?.[0]?.status==='inProgress'?'orange':filtWork?.[0]?.status==='completed'?'green':'black'}}>{filtWork?.[0]?filtWork[0].status:'Null'}</p>
      },
      key: "voice_over"
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span  style={{display:'flex',justifyContent:"space-around"}}>
            <Typography.Link onClick={() => save(record._id,record)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a href='/#'>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
         <div style={{display:'flex',justifyContent:"space-around"}}>
          <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          <Typography.Link  disabled={editingKey !== 0} onClick={() => deleteAllWork(record)}>
            Delete
          </Typography.Link>
         </div>
        );
      },
    },
   
  ];

  const deleteAllWork =async (record: Item)=>{
    try {
      const deleteItem =await deleteWork({_id:record._id}).then((response: any)=>{
        console.log("Delete Response ==> ",response);
        setCount(count-1)
        messageApi.success({
          type:"success",
          content:"Work deleted"
         });
      }).catch((error)=>{
        messageApi.error({
          type:"error",
          content:"Internal server error"
         });;
      })
    } catch (error) {
      messageApi.error({
        type:"error",
        content:"Work not deleted "
       });;
    }
  }


  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = ()=>{
    const createWork = createAssignWork().then((response: any)=>{
      console.log("response add ==>",response)
      messageApi.success({
        type:"success",
        content:"Work Added"
       });
      // setData(response.payload)
    }).catch((err)=>{
      messageApi.error({
        type:"error",
        content:"Work not added "
       });;
    })

    const newData :Item = {
      _id:count,
      item:"Write requirements here",
      script:'df',
      voice_over:'sdf',
      video:'sdf',
      thumbnail:'sdf'
    }
    setData([...data,newData])
    setCount(count+1)
  }

  // const handleAdd = () => {
  //   const newData: DataType = {
  //     _id: count,
  //     name: `Edward King ${count}`,
  //     age: '32',
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };
  const [messageApi, contextHolder] = message.useMessage();

  return (
<>
{contextHolder}
<Form form={form} component={false}>
      
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
     Add a row
   </Button>
   <Table
     components={{
       body: {
         cell: EditableCell,
       },
     }}
     bordered
     dataSource={data}
     columns={mergedColumns}
     rowClassName="editable-row"
     pagination={{
       onChange: cancel,
     }}
     expandable={{ expandedRowRender: (record: Item) => <p>{record.script}</p> }}
   />
 </Form>
</>
  );
};

export default DataTable;