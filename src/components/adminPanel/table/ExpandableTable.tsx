import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getEmployee } from '../../../server/employee/employee';
import { getAllClient, getSingleClient } from '../../../server/client/client';
import ClientWorkInfo from '../../client/ClientWorkInfo';

const ExpandableTable: React.FC = () => {
const [employeeDetail, setEmployeeDetail] = React.useState([])
const [data, setData] = React.useState([])
const [loading, setLoading] = React.useState(false)
interface DataType {
    _id: React.Key;
    name: string;
  }
  
  const columns: ColumnsType<DataType> = [
    { title: 'Clients', dataIndex: 'name', key: 'name' },
  ]

  React.useEffect(() => {
    setLoading(true)
    try {
        const getEmploye = getAllClient().then((response: any)=>{
            console.log("response",response)
            setData(response.payload)
            setLoading(false)

        })
    } catch (error) {
      setLoading(false)
        console.log("Dashboard error ==> ",error.message);
    }
  }, [])

  const singleEmployee = async(clientId: any)=>{
    try {
        const client = await getSingleClient({_id:clientId}).then((response)=>{
            console.log(response.status)
        })
    } catch (error) {
        console.log("Client error ==> ",error.message);
    }
  }
  
    return (
        <Table
          columns={columns}
          rowKey={(record) => record._id}
          style={{width:'100%'}}
          expandable={{
            expandedRowRender: (record) => <p key={record._id} style={{ width:'50%',margin:0}}> <ClientWorkInfo employId={record._id}/></p>,
            // onExpandedRowsChange:(record=>console.log("P",record))
            // rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          scroll={{x:100}}
          dataSource={data}
          loading={loading}
        />
      );
}

export default ExpandableTable;