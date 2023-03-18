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
import { deleteItems } from '../../server/allWork/allWork';
import Pending from '../helpers/tags/Pending';
import Completed from '../helpers/tags/Completed';
import Progress from '../helpers/tags/Progress';
import UserTag from '../helpers/tags/UserTag';
import { useLocation } from 'react-router-dom';
import { getSingleClient } from '../../server/client/client';
import {
	DownloadOutlined 
} from '@ant-design/icons'
import Modalf from '../helpers/modal/Modal';

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
		_id: 1,
		item: 'Jerry',
		script: 'Done',
		voice_over: 'New yourk',
		video: 'Done',
		thumbnail: 'Done',
	},
	{
		_id: 2,
		item: 'Tom',
		script: 'Dione',
		voice_over: 'Australia',
		video: 'Done',
		thumbnail: 'done',
	},
];

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



const ClientPanel: React.FC | any = ({employId}: any) => {
	const location  = useLocation()
	const [form] = Form.useForm();
	const [showM, setShowM] = useState(false);
	const [data, setData] = useState([]);
	const [editingKey, setEditingKey] = useState<Number>(0);
	const [count, setCount] = React.useState(3);
	const [fetch1, setFetch1] = React.useState(false);
	const [particularData, setParticularData] = useState([])
	const [loading, setLoading] = React.useState(false)

	const isEditing = (record: Item) => record._id === editingKey;

	const edit = (record: Partial<Item> & { _id: React.Key }) => {
		form.setFieldsValue({
			item: '',
			script: '',
			voice_over: '',
			video: '',
			thumbnail: '',
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
				setLoading(false)
				setData(response.payload.myWorks);

			})
			.catch((Err) => {
				setLoading(false)
				console.log('error occured==>', Err);
			});
	}, [editingKey, count, fetchAgain, fetch1]);

	const cancel = () => {
		setEditingKey(0);
	};

	const save = async (_id: React.Key, record) => {
		try {
			// console.log("Record",...data)

			const row = (await form.validateFields()) as Item;
			const work = updateAssignWork({
				itemId: record._id,
				item: row.item,
			})
				.then((response: any) => {
					setEditingKey(0);
					messageApi.success({
						type: 'success',
						content: 'Work Saved',
					});
				})
				.catch((err: any) => {
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
		try {
			const deleteitem = await deleteItems({
				itemId: filtWork?.[0].assignedItemId,
				workId: filtWork?.[0]._id,
				empId: filtWork?.[0].selectedEmployee._id,
			})
				.then(() => {
					messageApi.success({
						type: 'success',
						content: 'Item deleted',
					});
					setFetch1(!fetch1);
				})
				.catch((err) => {
					messageApi.error({
						type: 'error',
						content: err.message,
					});
					setFetch1(!fetch1);
				});
		} catch (error) {
			messageApi.error({
				type: 'error',
				content: error.message,
			});
			setFetch1(!fetch1);
		}
	};

	const columns = [
		{
			title: 'Item',
			dataIndex: 'item',
			width: '20%',
			editable: true,
		},
	
		{
			title: 'Script',
			width: '13%',
			dataIndex: 'script',
      
			render: (_: any, record: any) => {
				const filtWork = record?.workBookings?.filter(
					(e: any) => e?.selectedWork?.name === 'Script'
				);
				return (
					<div >
						<div style={{ display:'flex' }}>
						
							{filtWork?.[0]?.status === 'pending' ? (
								<Pending text="Pending" />
							) : filtWork?.[0]?.status === 'inProgress' ? (
								<Progress text="Progress" />
							) : filtWork?.[0]?.status === 'completed' ? (
								<Completed text="Completed" />
							) : (
								'Not assigned'
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
								<div>
								<Button style={{fontSize:16}} onClick={()=>openModal(filtWork)} icon={<DownloadOutlined/>}/>
						</div>
							</div>
						) : null}
					</div>
				);
			},
			key: 'script',
		},
		{
			title: 'Voice over',
			width: '13%',
			dataIndex: 'script',
			render: (_: any, record: any) => {
				const filtWork = record?.workBookings?.filter(
					(e: any) => e.selectedWork.name === 'Voice over'
				);
        return (
					<div >
						<div style={{ display:'flex' }}>
						
							{filtWork?.[0]?.status === 'pending' ? (
								<Pending text="Pending" />
							) : filtWork?.[0]?.status === 'inProgress' ? (
								<Progress text="Progress" />
							) : filtWork?.[0]?.status === 'completed' ? (
								<Completed text="Completed" />
							) : (
								'Not assigned'
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
								
								<div>
								<Button style={{fontSize:16}} onClick={()=>openModal(filtWork)} icon={<DownloadOutlined/>}/>
						</div>
							</div>
						) : null}
					</div>
				);
			},
			key: 'voice_over',
		},
		{
			title: 'Video',
			width: '13%',
			dataIndex: 'video',
			render: (_: any, record: any) => {
				const filtWork = record?.workBookings?.filter(
					(e: any) => e.selectedWork.name === 'Video'
				);
        return (
					<div  >
						<div style={{ display:'flex' }}>
						
							{filtWork?.[0]?.status === 'pending' ? (
								<Pending text="Pending" />
							) : filtWork?.[0]?.status === 'inProgress' ? (
								<Progress text="Progress" />
							) : filtWork?.[0]?.status === 'completed' ? (
								<Completed text="Completed" />
							) : (
								'Not assigned'
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
								<div>
								<Button style={{fontSize:16}} onClick={()=>openModal(filtWork)} icon={<DownloadOutlined/>}/>
						</div>
							</div>
						) : null}
					
					</div>
				);
			},
			key: 'video',
		},
		{
			title: 'Thumbnail',
			width: '13%',
			dataIndex: 'thumbnail',
			render: (_: any, record: any) => {
				const filtWork = record?.workBookings?.filter(
					(e: any) => e.selectedWork.name === 'Thumbnail'
				);
        return (
					<div >
						<div style={{ display:'flex' }}>
						
							{filtWork?.[0]?.status === 'pending' ? (
								<Pending text="Pending" />
							) : filtWork?.[0]?.status === 'inProgress' ? (
								<Progress text="Progress" />
							) : filtWork?.[0]?.status === 'completed' ? (
								<Completed text="Completed" />
							) : (
								'Not assigned'
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
								<div>
					<Button style={{fontSize:16}} onClick={()=>openModal(filtWork)} icon={<DownloadOutlined/>}/>

						</div>
							</div>
						) : null}
					</div>
				);
			},
			key: 'voice_over',
		},
	
	];

	const openModal = (record: any)=>{
		setShowM(!showM)
		console.log("RECORD",record)
		setParticularData(record)
	}

	const deleteAllWork = async (record: Item | any) => {
		try {
			const deleteItem = await deleteWork({ _id: record._id ,client:record.client})
				.then((response: any) => {
					console.log('Delete Response ==> ', response);
					setCount(count - 1);
					messageApi.success({
						type: 'success',
						content: 'Work deleted',
					});
					setFetch1(!fetch1);
				})
				.catch((error) => {
					messageApi.error({
						type: 'error',
						content: 'Internal server error',
					});
				});
			setFetch1(!fetch1);
		} catch (error) {
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
		if(!location?.state?.id){
			message.error({
				type:"error",
				content:"No client selected"
			})
		}else{
			const createWork = createAssignWork({client:location?.state?.id})
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

	return (
		<>
			{loading?(
				<Spin/>
			):(
				<>
				{contextHolder}
			<Modalf open={showM} setOpen={setShowM} user={particularData[0]} title={'Your Download files'} data={0}/>
			<Form form={form} component={false}>
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
					//  expandable={{ expandedRowRender: (record: any) => <p>{record.workBookings._id}</p> }}
				/>
			</Form>
				</>
			)}
		</>
	);
};

export default ClientPanel;
