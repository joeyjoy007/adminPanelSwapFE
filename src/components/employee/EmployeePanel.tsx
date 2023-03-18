import React, { useContext } from 'react';
import { Button, Col, Divider, Row, Spin, message } from 'antd';
import Steps from './Steps';
import { SmoothProvider } from 'react-smooth-scrolling';
import ButtonNormal from '../helpers/Buttons/ButtonNormal';
import { getEmployeeDetail } from '../../server/employee/employee';
import { updateStatus } from '../../server/allWork/allWork';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fileDownload from 'js-file-download';
import {
	DownloadOutlined,
	UploadOutlined
} from '@ant-design/icons';
import { AuthContext } from '../../context/context';
import UploadF from '../helpers/Upload';
import UploadF2 from '../helpers/Upload2';
import Modalf from '../helpers/modal/Modal';

const EmployeePanel: React.FC = () => {
	const [assignedWork, setAssignedWork] = React.useState([]);
  const [valueForStatus, setValueForStatus] = React.useState<String>('')
  const [fetchAgain, setFetchAgain] = React.useState<Boolean>(false)
  const [particularData, setParticularData] = React.useState([])
  const [showM, setShowM] = React.useState(false)
  const [particularData1, setParticularData1] = React.useState([])
  const [showM1, setShowM1] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const {userInfo} = useContext(AuthContext);
  const user = JSON.parse(userInfo)
console.log("OP", user.payload.employee._id)

	React.useEffect(() => {
		setLoading(true)
		const employeeDetail = getEmployeeDetail({
			_id: user.payload.employee._id,
		})
			.then((response: any) => {
				setLoading(false)
				console.log(
					'Employee Response=> ',
					response.payload.assignedWork
				);
				setAssignedWork(response.payload.assignedWork);
			})
			.catch((error: any) => {
				setLoading(false)
				console.log('employee detail error ==>', error);
			});
	}, [fetchAgain,showM1,showM]);


  const updateWorkStatus = async(id: any)=>{
	setLoading(true)
    try {
      const update = updateStatus({_id:id,status:valueForStatus}).then((response: any)=>{

		messageApi.success({
            type:"success",
            content:"status updated"
           });
		   setLoading(false)
        setFetchAgain(!fetchAgain)
      }).catch((err)=>{
		setLoading(false)
        console.log("error ==>",err.message);
      })
    } catch (error) {
		setLoading(false)
        messageApi.error({
            type:"error",
            content:error.message
           });
    }
  }
  const [messageApi, contextHolder] = message.useMessage();

  const openModal = (record: any)=>{
	setShowM(!showM)
	setParticularData(record)
}

  const openModal2 = (record: any)=>{
	setShowM1(!showM1)
	console.log("RECord")
	setParticularData(record)
}

	return (
		<div>{
			loading?(
				<div style={{display:"flex",height:400,justifyContent:"center",alignItems:"center"}}>
					<Spin/>
				</div>
			):(
				<>
				
				<Modalf open={showM} setOpen={setShowM} user={particularData} title={'Your Download files'} data={1}/>
					<Modalf open={showM1} setOpen={setShowM1} user={particularData} title={'Your upload files'} data={2}/>

			{contextHolder}
			<Divider orientation="left">Details</Divider>
			{assignedWork?.length > 0?(
				assignedWork?.map((e: any) => {
					return (
						<Row key={e._id}>
							<Col span={5}>
								<p>{e.assignedItemId.item}</p>
							</Col>
							<Col span={7}>
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
									<Button style={{fontSize:16}} onClick={()=>openModal(e)} icon={<DownloadOutlined/>}/>
							
							</Col>
							<Col
								style={{
									display: 'flex',
									flexDirection:'row',
									justifyContent:'center',
									// justifyContent: 'center',
								}}
						
							>
					
								<Button style={{fontSize:16}} onClick={()=>openModal2(e)} icon={<UploadOutlined/>}/>
	
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
		

				</>
			)}		</div>
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
