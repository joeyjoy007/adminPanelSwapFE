import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getEmployee } from '../../../server/employee/employee';
import { getAllClient, getSingleClient } from '../../../server/client/client';
import ClientWorkInfo from '../../client/ClientWorkInfo';

const ExpandableTable: React.FC = () => {
const [employeeDetail, setEmployeeDetail] = React.useState([])
const [data, setData] = React.useState([])
interface DataType {
    _id: React.Key;
    name: string;
  }
  
  const columns: ColumnsType<DataType> = [
    { title: 'Clients', dataIndex: 'name', key: 'name' },
  ]

  React.useEffect(() => {
    try {
        const getEmploye = getAllClient().then((response: any)=>{
            console.log("response",response)
            setData(response.payload)
        })
    } catch (error) {
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
          expandable={{
            expandedRowRender: (record) => <p key={record._id} style={{ margin: 0 }}> <ClientWorkInfo employId={record._id}/></p>,
            // onExpandedRowsChange:(record=>console.log("P",record))
            // rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={data}
        />
      );
}

export default ExpandableTable;