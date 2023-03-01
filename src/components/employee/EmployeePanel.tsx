import React from 'react';
import { Col, Divider, Row } from 'antd';
import Steps from './Steps';
import { SmoothProvider } from 'react-smooth-scrolling';
import ButtonNormal from '../helpers/Buttons/ButtonNormal';
import { getEmployeeDetail } from '../../server/employee/employee';
import { updateStatus } from '../../server/allWork/allWork';


const EmployeePanel: React.FC = () => {
	const [assignedWork, setAssignedWork] = React.useState([]);
  const [valueForStatus, setValueForStatus] = React.useState<String>('')
  const [fetchAgain, setFetchAgain] = React.useState<Boolean>(false)

	React.useEffect(() => {
		console.log("11")
		const employeeDetail = getEmployeeDetail({
			_id: '63ff4087e2bd62767c25a6c2',
		})
			.then((response: any) => {
				console.log(
					'Employee Response=> ',
					response.payload.assignedWork
				);
				setAssignedWork(response.payload.assignedWork);
			})
			.catch((error: any) => {
				console.log('employee detail error ==>', error);
			});
	}, [fetchAgain]);


  const updateWorkStatus = async(id: any)=>{
    try {
      const update = updateStatus({_id:id,status:valueForStatus}).then((response: any)=>{
        console.log("Update response ==> ",response)
        setFetchAgain(!fetchAgain)
      }).catch((err)=>{
        console.log("error ==>",err.message);
      })
    } catch (error) {
      console.log("Upadte error ==> ",error);
    }
  }
	return (
		<div>
			<Divider orientation="left">Percentage columns</Divider>
			{assignedWork?.map((e: any) => {
				return (
					<Row key={e._id}>
						<Col span={8}>
							<p>{e.assignedItemId.item}</p>
						</Col>
						<Col span={8}>
							<Steps statusValue={setValueForStatus} initialStatus={e.status} />
						</Col>
						<Col
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
							span={8}
						>
							<ButtonNormal name="Submit" onClick={()=>updateWorkStatus(e._id)}/>
						</Col>
					</Row>
				);
			})}
		</div>
	);
};

export default EmployeePanel;
