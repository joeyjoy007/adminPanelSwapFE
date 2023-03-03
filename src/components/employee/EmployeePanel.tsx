import React, { useContext } from 'react';
import { Button, Col, Divider, Row, message } from 'antd';
import Steps from './Steps';
import { SmoothProvider } from 'react-smooth-scrolling';
import ButtonNormal from '../helpers/Buttons/ButtonNormal';
import { getEmployeeDetail } from '../../server/employee/employee';
import { updateStatus } from '../../server/allWork/allWork';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fileDownload from 'js-file-download';
import {
	DownloadOutlined
} from '@ant-design/icons';
import { AuthContext } from '../../context/context';

const EmployeePanel: React.FC = () => {
	const [assignedWork, setAssignedWork] = React.useState([]);
  const [valueForStatus, setValueForStatus] = React.useState<String>('')
  const [fetchAgain, setFetchAgain] = React.useState<Boolean>(false)

  const {userInfo} = useContext(AuthContext);
  const user = JSON.parse(userInfo)
console.log("OP", user.payload.employee._id)

	React.useEffect(() => {
		console.log("11")
		const employeeDetail = getEmployeeDetail({
			_id: user.payload.employee._id,
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
		messageApi.success({
            type:"success",
            content:"status updated"
           });
        setFetchAgain(!fetchAgain)
      }).catch((err)=>{
        console.log("error ==>",err.message);
      })
    } catch (error) {
        messageApi.error({
            type:"error",
            content:error.message
           });
    }
  }
  const [messageApi, contextHolder] = message.useMessage();
	return (
		<div>
			{contextHolder}
			<Divider orientation="left">Percentage columns</Divider>
			{assignedWork?.length > 0?(
				assignedWork?.map((e: any) => {
					return (
						<Row key={e._id}>
							<Col span={6}>
								<p>{e.assignedItemId.item}</p>
							</Col>
							<Col span={8}>
								<Steps statusValue={setValueForStatus} initialStatus={e.status} />
							</Col>
							<Col
								style={{
									display: 'flex',
									flexDirection:'row',
									justifyContent:'center',
									// justifyContent: 'center',
								}}
								span={6}
							>
								<Button type="dashed" onClick={()=>updateWorkStatus(e._id)}>Submit</Button>
	
							</Col>
							<Col
								style={{
									// display: 'flex',
									// justifyContent: 'center',
								}}
								span={4}
							>
								{/* <a href={`${e.file}`} download>{e.file}</a> */}
								{/* <Link to={`/${e.file}/`} target="_blank" download>Download</Link> */}
								{/* <ButtonNormal onClick={() =>handleDownload(e.file, 'Blank.pdf') }name="Download"/> */}
								{/* <ButtonNormal onClick={() =>window.open(e.file, '_blank') }name="Download"/> */}
								<div>Total files {e.file.length}</div>
								<div style={{marginTop:'1rem'}}>
								{e?.file?.map((e)=>{
									// return 	<ButtonNormal onClick={() =>window.open(e, '_blank') }name="Download"/>
									return (
										<>
										<div style={{display:'flex',justifyContent:'space-between'}}>
										{e.match(/\.(jpeg|jpg|gif|png)$/) != null ?<p>image </p>:<p>pdf</p>}
										{e.substring(32,47)}
										<DownloadOutlined size={24}  onClick={() =>window.open(e, '_blank') }/>
										</div>
										{/* <p>{e}</p> */}
										</>
									)
								})}
								</div>
							</Col>
							<Divider/>
						</Row>
					);
				})
			):(
				<p>
					No Work assigned
				</p>
			)}
		
		</div>
	);
};
function checkURL(url) {
   if(url.match(/\.(jpeg|jpg|gif|png)$/) != null){
	console.log("OK");
   }else{
	console.log("NO")
   }
}

const handleDownload = (url, filename) => {
	axios.get(url, {
	  responseType: "blob"
	})
	.then((res) => {
	  fileDownload(res.data, filename)
	})
  }
   

export default EmployeePanel;
