/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import {
	Form,
	Input,
	InputNumber,
	Table,
	message,
} from 'antd';
import DropDown1 from './table/DropDown';
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

const ClientPanel: React.FC = () => {
	const [form] = Form.useForm();
	const [data, setData] = useState([]);
	const [editingKey, setEditingKey] = useState<Number>(0);
	const [count, setCount] = React.useState(3);
	const [fetch1, setFetch1] = React.useState(false);

	const isEditing = (record: Item) => record._id === editingKey;


	const { fetchAgain } = useContext(AuthContext);

	React.useEffect(() => {
		const getItems = getAssignWork()
			.then((response: any) => {
				setData(response.payload);
			})
			.catch((Err) => {
				console.log('error occured==>', Err);
			});
	}, [editingKey, count, fetchAgain, fetch1]);

	const cancel = () => {
		setEditingKey(0);
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
				// console.log("FIlttee",filtWork?.[0].length);
        return (
					<div>
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

						<div>
            {filtWork?.[0]?.status ? (
							<div
								style={{
									// display: 'flex',
									// justifyContent: 'space-between',
								}}
							>
								<span style={{alignSelf:"center"}}>
                  <UserTag text={filtWork?.[0]?.selectedEmployee.name}/>
								</span>
							</div>
						) : null}
            </div>
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
							</div>
						) : null}
					</div>
				);
			},
			key: 'voice_over',
		},

	];



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



	return (
		<>
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
	);
};

export default ClientPanel;
