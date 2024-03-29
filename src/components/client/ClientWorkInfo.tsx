/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import {
	Button,
	Form,
	Input,
	InputNumber,
	Popconfirm,
	Spin,
	Table,
	Typography,
	message,
} from 'antd';
import DropDown1 from '../adminPanel/table/DropDown';
import {
	createAssignWork,
	deleteWork,
	getAssignWork,
	updateAssignWork,
} from '../../server/workAssign/workAssign';
import { AuthContext } from '../../context/context';
import { CloseCircleOutlined,EditOutlined ,DeleteOutlined  } from '@ant-design/icons';
import UploadF from '../helpers/Upload';
import { deleteItems } from '../../server/allWork/allWork';
import Pending from '../helpers/tags/Pending';
import Completed from '../helpers/tags/Completed';
import Progress from '../helpers/tags/Progress';
import UserTag from '../helpers/tags/UserTag';
import { useLocation } from 'react-router-dom';
import { getSingleClient } from '../../server/client/client';
import Modalf from '../helpers/modal/Modal';
import type { ColumnsType } from 'antd/es/table';
import {
	DownloadOutlined,
	UploadOutlined
} from '@ant-design/icons';

interface Item {
	_id: number;
	item: string;
	script: string;
	voice_over: string;
	video: string;
	thumbnail: string;
	date:string,
	text1:string;
	text2:string;
	text3:string;
	text4:string;
}


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



const ClientWorkInfo: React.FC | any = ({employId}: any) => {
	const location  = useLocation()
	const [form] = Form.useForm();
	const [showM, setShowM] = React.useState<Boolean>(false)
	const [data, setData] = useState([]);
	const [particularData, setParticularData] = React.useState<any>([])
	const [editingKey, setEditingKey] = React.useState<Number>(0);
	const [count, setCount] = React.useState(3);
	const [fetch1, setFetch1] = React.useState(false);
	const [loading, setLoading] = React.useState(false)


	console.log("EMPLOYy",employId);
	const isEditing = (record: Item) => record._id === editingKey;

	const edit = (record: Partial<Item> & { _id: React.Key }) => {
		form.setFieldsValue({
			item: '',
			script: '',
			voice_over: '',
			video: '',
			thumbnail: '',
			date:'',
			text1:'',
			text2:'',
			text3:'',
			text4:'',
			...record,
		});
		setEditingKey(record._id);
	};

	const { fetchAgain } = useContext(AuthContext);

	React.useEffect(() => {
		// const getItems = getAssignWork()
		setLoading(true)
		const getItems = getSingleClient({_id:employId?employId:location.state.id})
			.then((response: any) => {
				setData(response.payload.myWorks);
				setLoading(false)
			})
			.catch((Err) => {
				setLoading(false)
				console.log('error occured==>', Err);
			});
	}, [editingKey, count, fetchAgain, fetch1,showM]);

	const cancel = () => {
		setEditingKey(0);
	};

	const save = async (_id: React.Key, record) => {
		try {
			// console.log("Record",...data)
			setLoading(true)
			const row = (await form.validateFields()) as Item;
			console.log("ROWW",row);
			const work = updateAssignWork({
				itemId: record._id,
				item: row.item,
				date:row.date,
				text1:row.text1,
				text2:row.text2,
				text3:row.text3,
				text4:row.text4
			})
				.then((response: any) => {
					setEditingKey(0);
					setLoading(false)
					messageApi.success({
						type: 'success',
						content: 'Work Saved',
					});

				})
				.catch((err: any) => {
					setLoading(false)
					messageApi.error({
						type: 'error',
						content: 'Work not saved',
					});
				});

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

	const deleteWorkEmployee = async (filtWork) => {
		setLoading(true)
		try {
			const deleteitem = await deleteItems({
				itemId: filtWork?.[0].assignedItemId,
				workId: filtWork?.[0]._id,
				empId: filtWork?.[0].selectedEmployee._id,
			})
				.then(() => {
					setLoading(false)
					messageApi.success({
						type: 'success',
						content: 'Item deleted',
					});
					setFetch1(!fetch1);
				})
				.catch((err) => {
					setLoading(false)
					messageApi.error({
						type: 'error',
						content:"ds",
					});
					setFetch1(!fetch1);
				});
		} catch (error) {
			setLoading(false)
			messageApi.error({
				type: 'error',
				content: error.message,
			});
			setFetch1(!fetch1);
		}
	};

	const columns: ColumnsType<Item> | any = [
		{
			title: 'Item',
			dataIndex: 'item',
			width: '20%',
			editable: true,
			fixed:"left"
		},
		{
			title: 'Employee',
			dataIndex: 'select_employee',
			width: '20%',
			render: (_: any, record: Item) => {
				const editable = isEditing(record);
				return editable ? (
					<Typography.Link
						disabled={editingKey !== 0}
						onClick={() => edit(record)}
					>
						Add
					</Typography.Link>
				) : (
					<DropDown1 record={record}></DropDown1>
				);
			},
		},
		{
			title: 'Date',
			dataIndex: 'date',
			width: '18%',
			editable: true,

		},
		{
			title: 'Script',
			width: '20%',
			dataIndex: 'script',
			backgroundColor:"red",
      
			render: (_: any, record: any) => {
				const filtWork = record?.workBookings?.filter(
					(e: any) => e?.selectedWork?.name === 'Script'
				);
				return (
					<div>
						<div style={{ display:'flex',justifyContent:"space-between"}}>
						
							{filtWork?.[0]?.status === 'pending' ? (
								<Pending text="Pending" />
							) : filtWork?.[0]?.status === 'inProgress' ? (
								<Progress text="Progress" />
							) : filtWork?.[0]?.status === 'completed' ? (
								<Completed text="Completed" />
							) : (
								'Not assigned'
							)}
              	{filtWork?.length === 0 ? null : (
								<a
									onClick={() => deleteWorkEmployee(filtWork)}
									// style={{ float: 'right' }}
								>
									<CloseCircleOutlined />
								</a>
							)}
						</div>

						{filtWork?.[0]?.status ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									// float:"right"
								}}
							>
								<span style={{alignSelf:"center"}}>
                  <UserTag text={filtWork?.[0]?.selectedEmployee.name}/>
								</span>
								{/* <UploadF item={filtWork} /> */}
								<Button style={{fontSize:16}} onClick={()=>openModal(filtWork)} icon={<UploadOutlined/>}/>
							</div>
						) : null}
					</div>
				);
			},
			key: 'script',
		},
		{
			title: 'Voice over',
			width: '20%',
			dataIndex: 'script',
			render: (_: any, record: any) => {
				const filtWork = record?.workBookings?.filter(
					(e: any) => e.selectedWork.name === 'Voice over'
				);
        return (
					<div >
						<div style={{ display:'flex',justifyContent:"space-between" }}>
						
							{filtWork?.[0]?.status === 'pending' ? (
								<Pending text="Pending" />
							) : filtWork?.[0]?.status === 'inProgress' ? (
								<Progress text="Progress" />
							) : filtWork?.[0]?.status === 'completed' ? (
								<Completed text="Completed" />
							) : (
								'Not assigned'
							)}
              	{filtWork?.length === 0 ? null : (
								<a
									onClick={() => deleteWorkEmployee(filtWork)}
									style={{ float: 'right' }}
								>
									<CloseCircleOutlined  />
								</a>
							)}
						</div>

						{filtWork?.[0]?.status ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<span style={{alignSelf:"center"}}>
                  <UserTag text={filtWork?.[0]?.selectedEmployee.name}/>
								</span>
								{/* <UploadF item={filtWork} /> */}
								<Button style={{fontSize:16}} onClick={()=>openModal(filtWork)} icon={<UploadOutlined/>}/>
							</div>
						) : null}
					</div>
				);
			},
			key: 'voice_over',
		},
		{
			title: 'Video',
			width: '20%',
			dataIndex: 'video',
			render: (_: any, record: any) => {
				const filtWork = record?.workBookings?.filter(
					(e: any) => e.selectedWork.name === 'Video'
				);
        return (
					<div >
						<div style={{ display:'flex',justifyContent:"space-between" }}>
						
							{filtWork?.[0]?.status === 'pending' ? (
								<Pending text="Pending" />
							) : filtWork?.[0]?.status === 'inProgress' ? (
								<Progress text="Progress" />
							) : filtWork?.[0]?.status === 'completed' ? (
								<Completed text="Completed" />
							) : (
								'Not assigned'
							)}
              	{filtWork?.length === 0 ? null : (
								<a
									onClick={() => deleteWorkEmployee(filtWork)}
									style={{ float: 'right' }}
								>
									<CloseCircleOutlined />
								</a>
							)}
						</div>

						{filtWork?.[0]?.status ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<span style={{alignSelf:"center"}}>
                  <UserTag text={filtWork?.[0]?.selectedEmployee.name}/>
								</span>
								{/* <UploadF item={filtWork} /> */}
								<Button style={{fontSize:16}} onClick={()=>openModal(filtWork)} icon={<UploadOutlined/>}/>

							</div>
						) : null}
					</div>
				);
			},
			key: 'video',
		},
		{
			title: 'Thumbnail',
			width: '20%',
			dataIndex: 'thumbnail',
			render: (_: any, record: any) => {
				const filtWork = record?.workBookings?.filter(
					(e: any) => e.selectedWork.name === 'Thumbnail'
				);
        return (
					<div >
						<div style={{ display:'flex',justifyContent:"space-between" }}>
						
							{filtWork?.[0]?.status === 'pending' ? (
								<Pending text="Pending" />
							) : filtWork?.[0]?.status === 'inProgress' ? (
								<Progress text="Progress" />
							) : filtWork?.[0]?.status === 'completed' ? (
								<Completed text="Completed" />
							) : (
								'Not assigned'
							)}
              	{filtWork?.length === 0 ? null : (
								<a
									onClick={() => deleteWorkEmployee(filtWork)}
									style={{ float: 'right' }}
								>
									<CloseCircleOutlined />
								</a>
							)}
						</div>

						{filtWork?.[0]?.status ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<span style={{alignSelf:"center"}}>
                  <UserTag text={filtWork?.[0]?.selectedEmployee.name}/>
								</span>
								{/* <UploadF item={filtWork} /> */}
								<Button style={{fontSize:16}} onClick={()=>openModal(filtWork)} icon={<UploadOutlined/>}/>

							</div>
						) : null}
					</div>
				);
			},
			key: 'voice_over',
		},
		{
			title: 'Text',
			dataIndex: 'text1',
			width: '20%',
			editable: true,

		},
		{
			title: 'Text',
			dataIndex: 'text2',
			width: '20%',
			editable: true,

		},
		{
			title: 'Text',
			dataIndex: 'text3',
			width: '20%',
			editable: true,

		},
		{
			title: 'Text',
			dataIndex: 'text4',
			width: '20%',
			editable: true,

		},
		{
			title: 'operation',
			dataIndex: 'operation',
			width:'15%',
			fixed:'right',
			render: (_: any, record: Item) => {
				const editable = isEditing(record);
				return editable ? (
					<span
						style={{
							display: 'flex',
							justifyContent: 'space-around',
						}}
					>
						<Typography.Link
							onClick={() => save(record._id, record)}
							style={{ marginRight: 8 }}
						>
							Save
						</Typography.Link>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<a href="/#">Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
						}}
					>
						<Typography.Link
							disabled={editingKey !== 0}
						>
							<EditOutlined style={{fontSize:19}} onClick={() => edit(record)}/>
						</Typography.Link>
						<Typography.Link
							disabled={editingKey !== 0}
						>
							<DeleteOutlined 	style={{color:"red",fontSize:19}} onClick={() => deleteAllWork(record)}/>
						</Typography.Link>
					</div>
				);
			},
		},


	];

	const deleteAllWork = async (record: Item | any) => {
		setLoading(true)

		try {
			const deleteItem = await deleteWork({ _id: record._id ,client:record.client})
				.then((response: any) => {
					setLoading(false)
					setCount(count - 1);
					messageApi.success({
						type: 'success',
						content: 'Work deleted',
					});
					setFetch1(!fetch1);
				})
				.catch((error) => {
					setLoading(false)
					messageApi.error({
						type: 'error',
						content: 'Internal server error',
					});
				});
			setFetch1(!fetch1);
		} catch (error) {
			setLoading(false)
			messageApi.error({
				type: 'error',
				content: 'Work not deleted ',
			});
			setFetch1(!fetch1);
		}
	};

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

	const handleAdd = () => {
		if(!location?.state?.id && !employId){
			message.error({
				type:"error",
				content:"No client selected"
			})
		}else{
			const createWork = createAssignWork({client:employId?employId:location?.state?.id})
			.then((response: any) => {
				console.log('response add ==>', response);
				messageApi.success({
					type: 'success',
					content: 'Work Added',
				});
				// setData(response.payload)
			})
			.catch((err) => {
				messageApi.error({
					type: 'error',
					content: 'Work not added ',
				});
			});

		const newData: Item = {
			_id: count,
			item: 'Write requirements here',
			script: 'df',
			voice_over: 'sdf',
			video: 'sdf',
			thumbnail: 'sdf',
			date:'date1',
			text1:'text1',
			text2:'text2',
			text3:'text3',
			text4:'text4'
		};
		setData([...data, newData]);
		setCount(count + 1);
		}
	};

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

	const openModal = (record: any)=>{
		setShowM(!showM)
		setParticularData(record)
	}
	

	return (
		<>
			{loading?(
				<div style={{display:"flex",flex:1,height:400,justifyContent:"center",alignItems:"center"}}>
					<Spin/>
				</div>
			):(<>
			{contextHolder}
			<Modalf open={showM} setOpen={setShowM} user={particularData} title={'Your uploaded files'} data={3}/>

			<Form form={form} component={false}>
				<Button
					onClick={handleAdd}
					type="primary"
					style={{ marginBottom: 16 }}
				>
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
					scroll={{x:2000}}
					rowClassName="editable-row"
					pagination={{
						onChange: cancel,
					}}
					//  expandable={{ expandedRowRender: (record: any) => <p>{record.workBookings._id}</p> }}
				/>
			</Form>
			</>)}
		</>
	);
};

export default ClientWorkInfo;
