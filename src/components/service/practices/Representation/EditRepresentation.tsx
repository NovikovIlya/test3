import {
	CheckOutlined,
	CloseOutlined,
	VerticalAlignBottomOutlined
} from '@ant-design/icons'
import {
	Button,
	Col,
	Descriptions,
	Form,
	Input,
	Popconfirm,
	Popover,
	Row,
	Select,
	Space,
	Table,
	Typography
} from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { EditSvg } from '../../../../assets/svg/EditSvg'
import { Item } from '../../../../models/representation'
import { useAppDispatch } from '../../../../store'
import {
	useChangeStatusMutation,
	useEditSubmissionMutation,
	useGetDocRepresentationQuery,
	useGetOneSubmissionsQuery
} from '../../../../store/api/practiceApi/representation'
import { changeStatus, showNotification } from '../../../../store/reducers/notificationSlice'

import { EditableCell } from './EditableCell'
import { SkeletonPage } from './Skeleton'
import TableEdit from './tableEdit'
import { Vector } from '../../../../assets/svg/Vector'


const optionMockSelect = [
	{
		value: 'В профильной организации',
		label: 'В профильной организации'
	},
	{
		value: 'На кафедре КФУ',
		label: 'На кафедре КФУ'
	},
	{
		value: 'В структурном подразделении КФУ',
		label: 'В структурном подразделении КФУ'
	}

]

export const EditRepresentation = () => {
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const originData: any[] = []
	const nav = useNavigate()
	const [tableData, setTableData] = useState<any>([])
	const [form] = Form.useForm()
	const [data, setData] = useState(originData)
	const [editingKey, setEditingKey] = useState('')
	const isEditing = (record: Item) => record.key === editingKey
	const {data: dataOneSubmissions,isSuccess,isLoading: isLoadingOneSubmission} = useGetOneSubmissionsQuery(id, { skip: !id })
	const {data: dataGetDocRepresentation,isLoading: isLoadingDocRepesentation,refetch} = useGetDocRepresentationQuery(dataOneSubmissions ? dataOneSubmissions?.id : null,{ skip: !dataOneSubmissions })
	const [changeStatusSubmissions, {}] = useChangeStatusMutation()
	const [editSumbissions, {}] = useEditSubmissionMutation({})
	const [fullTable, setFullTable] = useState<any>([])
	const [editTheme, setEditTheme] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [selectedPlace,setSelecectedPlace] = useState<any>(null)
	const dispatch = useAppDispatch()
	console.log('selectedPlace',selectedPlace)

	useEffect(()=>{
	
			const x = dataOneSubmissions?.students[0].place ==='На кафедре КФУ' ? 'На кафедре КФУ' : dataOneSubmissions?.students[0].place === 'В структурном подразделении КФУ' ? 'В структурном подразделении КФУ' : 'В профильной организации'
			setSelecectedPlace(x)
			form.setFieldValue('selectPlace',x)
		
	},[isSuccess])

	useEffect(()=>{
		if(isSuccess){
			if(dataOneSubmissions.status === '123'){
				dispatch(changeStatus())
			}
			
		}
	},[isSuccess])

	useEffect(() => {
		if (isSuccess) {
			setEditTheme(dataOneSubmissions?.theme)
		}
	}, [isSuccess, dataOneSubmissions?.theme])

	useEffect(() => {
		if (isSuccess) {
			const array = dataOneSubmissions.students.map((item: any) => {
				return {
					...item,
					groupNumbers: dataOneSubmissions.practice.groupNumber,
					departmentDirector: dataOneSubmissions.practice.departmentDirector
				}
			})
			setFullTable(array.map((item: any) => ({ ...item, key: item.name })))
		}
	}, [dataOneSubmissions, isSuccess])

	const columns = [
		{
			key: 'number',
			dataIndex: 'number',
			title: '№',
			className: 'text-xs !p-2',
			render: (text: any, record: any, index: any) => <div>{index + 1}</div>
		},
		{
			key: 'student',
			dataIndex: 'student',
			title: 'ФИО обучающегося',
			name: 'ФИО обучающегося',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => (
				<div>{record?.name || 'Нет челибаса...'}</div>
			)
		},

		{
			key: 'groupNumbers',
			dataIndex: 'groupNumbers',
			title: 'Номер группы',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => (
				<div>{record?.groupNumbers || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'place',
			dataIndex: 'place',
			title: 'Место прохождения практики',
			className: 'text-xs !p-2',
			editable: true,
			render: (text: any, record: any) => (
				<div>{''}</div>
			)
		},
		{
			key: 'FIO',
			dataIndex: 'FIO',
			title: 'ФИО руководителя от кафедры',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => (
				<div>{record?.departmentDirector || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'A',
			dataIndex: 'A',
			title: 'Категория',
			className: `text-xs !p-2 ${
				isSuccess
					? dataOneSubmissions.isWithDeparture
						? ''
						: 'hidden'
					: 'hidden'
			}`,
			render: (text: any, record: any) => (
				<div>{record?.category || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'costForDay',
			dataIndex: 'costForDay',
			title: 'Суточные (50 руб/сут)',
			className: `text-xs !p-2 ${
				isSuccess
					? dataOneSubmissions.isWithDeparture
						? ''
						: 'hidden'
					: 'hidden'
			}`,
			editable: true,
			render: (text: any, record: any) => (
				<div>{record?.costForDay || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'arrivingCost',
			dataIndex: 'arrivingCost',
			title: 'Проезд (руб)',
			className: `text-xs !p-2 ${
				isSuccess
					? dataOneSubmissions.isWithDeparture
						? ''
						: 'hidden'
					: 'hidden'
			}`,
			editable: true,
			render: (text: any, record: any) => (
				<div>{record?.arrivingCost || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'livingCost',
			dataIndex: 'livingCost',
			title: 'Оплата проживания (руб)',
			className: `text-xs !p-2 ${
				isSuccess
					? dataOneSubmissions.isWithDeparture
						? ''
						: 'hidden'
					: 'hidden'
			}`,
			editable: true,
			render: (text: any, record: any) => (
				<div>{record?.livingCost || 'Нет челибаса...'}</div>
			)
		},

		{
			title: '',
			dataIndex: 'operation',
			className: `text-xs !p-2 ${
				isSuccess
					? dataOneSubmissions.status === 'На рассмотрении'
						? ''
						: 'hidden'
					: ''
			}`,
			key: 'operation',
			render: (_: any, record: Item) => {
				const editable = isEditing(record)
				return editable ? (
					<div className="flex justify-around items-center w-[60px]">
						<Typography.Link
							onClick={() => save(record.key)}
							style={{ marginRight: 8 }}
						>
							<CheckOutlined style={{ color: '#75a4d3' }} />
						</Typography.Link>
						<Popconfirm
							title="Вы действительно хотите отменить действие?"
							onConfirm={cancel}
						>
							<CloseOutlined style={{ color: '#75a4d3' }} />
						</Popconfirm>
					</div>
				) : (
					<div className="flex justify-around items-center  w-[60px]">
						<Typography.Link
							disabled={editingKey !== ''}
							onClick={() => edit(record)}
						>
							<EditSvg />
						</Typography.Link>
						{/* <Popconfirm title="Вы действительно хотите удалить?" onConfirm={deleteRow}>
                  <a><DeleteRedSvg/></a>
              </Popconfirm> */}
					</div>
				)
			}
		}
	]

	const items: any = [
		{
			key: '3',
			label: 'Вид',
			children: isSuccess ? dataOneSubmissions.practice.practiceKind : ''
		},
		{
			key: '5',
			label: 'Курс',
			children: isSuccess ? dataOneSubmissions.practice.courseNumber : ''
		},
		{
			key: '5',
			label: 'Тип',
			children: isSuccess ? dataOneSubmissions.practice.practiceType : ''
		},
		...(isSuccess && dataOneSubmissions.isWithDeparture
			? [
					{
						key: '6',
						label: 'Тема',
						children: (
							<div className="flex">
								<Col span={19}>
									{dataOneSubmissions?.status === 'На рассмотрении' ? (
										<Input
											size="small"
											id="topic"
											placeholder="тема"
											value={editTheme}
											onChange={e => {
												setEditTheme(e.target.value)
												setIsEdit(true)
											}}
										/>
									) : (
										<div>{dataOneSubmissions?.theme}</div>
									)}
								</Col>
							</div>
						)
					}
			  ]
			: []),
		{
			key: '66',
			label: 'Форма',
			children: isSuccess
				? dataOneSubmissions.isWithDeparture
					? 'Выездная'
					: 'Невыездная'
				: ''
		},
		{
			key: '7',
			label: 'Статус',
			children: isSuccess ? dataOneSubmissions.status : '',
			render: (text: any) => (
				<Popover
					content={
						<div>
							Редактировать представление можно только в статусе "Ожидание"
						</div>
					}
					title=""
				>
					<span>{text}</span>
				</Popover>
			)
		}
	]

	// const mergedColumns: TableProps['columns'] = columns.map(col => {
	// 	// @ts-ignore
	// 	if (!col.editable) {
	// 		return col
	// 	}
	// 	return {
	// 		...col,
	// 		onCell: (record: Item) => ({
	// 			record,
	// 			inputType:
	// 				col.dataIndex === 'selectCourse'
	// 					? 'select'
	// 					: col.dataIndex === 'costForDay'
	// 					? 'number'
	// 					: col.dataIndex === 'livingCost'
	// 					? 'number'
	// 					: col.dataIndex === 'livingCost'
	// 					? 'number'
	// 					: col.dataIndex === 'course'
	// 					? 'number'
	// 					: 'text',
	// 			dataIndex: col.dataIndex,
	// 			title: col.title,
	// 			editing: isEditing(record),
	// 			options:
	// 				col.dataIndex === 'selectCourse'
	// 					? optionMock
	// 					: col.dataIndex === 'selectType'
	// 					? optionMockType
	// 					: col.dataIndex === 'selectKind'
	// 					? optionMockKind
	// 					: undefined,
	// 			rules:
	// 				dataOneSubmissions.isWithDeparture === false
	// 					? col.dataIndex === 'place'
	// 						? [
	// 								{
	// 									required: true,
	// 									message: 'Поле обязательно для заполнения'
	// 								}
	// 						  ]
	// 						: []
	// 					: col.dataIndex === 'place' ||
	// 					  col.dataIndex === 'costForDay' ||
	// 					  col.dataIndex === 'arrivingCost' ||
	// 					  col.dataIndex === 'livingCost'
	// 					? [
	// 							{
	// 								required: true,
	// 								message: 'Поле обязательно для заполнения'
	// 							}
	// 					  ]
	// 					: []
	// 		})
	// 	}
	// })

	const downloadFile = () => {
		
		if (dataGetDocRepresentation) {
			const link = document.createElement('a')
			link.href = dataGetDocRepresentation
			link.setAttribute('download', `Представление в приказ.docx`)
			document.body.appendChild(link)
			link.click()

			// window.URL.revokeObjectURL(dataBlob)
		}
	}

	const edit = (record: Partial<Item> & { key: React.Key }) => {
		form.setFieldsValue({ name: '', age: '', address: '', ...record })
		setEditingKey(record.key)
		// setCurrentRowValues(record);
	}

	const cancel = () => {
		setEditingKey('')
	}

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as Item
			const newData = [...fullTable]
			const index = newData.findIndex(item => key === item.key)
			setIsEdit(true)
			if (index > -1) {
				const item = newData[index]
				newData.splice(index, 1, {
					...item,
					...row
				})
				setData(newData)
				setTableData(newData)
				setFullTable(newData)
				setEditingKey('')
				console.log('1', newData[index])
			} else {
				// если новая запись
				newData.push(row)
				setData(newData)
				setTableData(newData)
				setFullTable(newData)
				setEditingKey('')
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo)
		}
	}

	const editData = () => {
		if(selectedPlace==='В профильной организации'){
			if(fullTable.some((item:any)=>item.place===null)){ 
				return dispatch(showNotification({ message: `Для сохранения необходимо заполнить "Место прохождение практики" ${dataOneSubmissions.isWithDeparture ? `,  "Суточные", "Проезд" и "Оплата проживания"`:''}`, type: 'warning' }));
			}
			if(dataOneSubmissions.isWithDeparture){
				if(fullTable.some((item:any)=>item.costForDay===null || item.arrivingCost===null || item.livingCost===null)){ 
					return dispatch(showNotification({ message: `Для сохранения необходимо заполнить "Место прохождение практики" ${dataOneSubmissions.isWithDeparture ? `,  "Суточные", "Проезд" и "Оплата проживания"`:''}`, type: 'warning' }));
				}
			}
		}
		const arrayT: any = [{}]
		const obj = arrayT.map((item: any) => {
			return {
				...item,
				students: fullTable.map(({ key, ...rest }: any) => rest).map((item:any)=>{
					if(selectedPlace==='В профильной организации'){
						return { ...item, place: item.place }
					}else{
						return { ...item, place: selectedPlace }
					}
				}),
				id: dataOneSubmissions.id,
				theme: editTheme
			}
		})
		console.log('-s-s-s',obj)
		editSumbissions(obj[0])
			.unwrap()
			.then(() =>{
				dispatch(
					showNotification({
						message: 'Представление успешно отредактировано',
						type: 'success'
					})
				)
				refetch()
			}
				
			)
		
	}

	const handleChangeStatus = ()=>{
		changeStatusSubmissions(dataOneSubmissions.id)
	}

	if (isLoadingOneSubmission) return <SkeletonPage />

	return (
		<section className="container animate-fade-in">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Button
						size="large"
						style={{width:'48px'}}
						className="mt-1 mr-6 w-[48px] rounded-full border border-black"
						icon={<Vector />}
						type="text"
						onClick={() => {
							nav('/services/practices/representation')
						}}
					/>
					<Typography.Text className=" text-[28px] mb-14">
						Представление в приказ группы "
						{dataOneSubmissions?.practice.groupNumber}" подразделения "
						{dataOneSubmissions?.practice.subdivision}" на{' '}
						{dataOneSubmissions?.practice.academicYear} учебный год
					</Typography.Text>
				</Col>
			</Row>
			<Descriptions className="mt-12" items={items} />

			<Row className='items-center flex gap-2'>
				<Col>
					<span>Где будет проходить практика</span>
				</Col>
				<Col span={3}>
				
					<Select 
					value={selectedPlace}
					onChange={(value) => {
						
						setSelecectedPlace(value)
						if(value==='В профильной организации'){
							const x = fullTable.map((item:any)=>{
								return {
									...item,
									place:''
								}
							})
							setFullTable(x)
						}
					}} options={optionMockSelect}/>
		
			</Col>
			</Row>

			<Row className="mt-4 mb-6 flex  justify-between">
				<Col span={12}>
					<div>
						<Space>
							{!isEdit ? (
								<Button
									onClick={downloadFile}
									loading={isLoadingDocRepesentation}
									disabled={isLoadingDocRepesentation || isEdit}
								>
									<VerticalAlignBottomOutlined /> Скачать
								</Button>
							) : (
								<Popover
									content={
										'Прежде чем скачать, сохраните измененное представление'
									}
								>
									<Button
										onClick={downloadFile}
										loading={isLoadingDocRepesentation}
										disabled={isLoadingDocRepesentation || isEdit}
									>
										<VerticalAlignBottomOutlined /> Скачать
									</Button>
								</Popover>
							)}
						</Space>
					</div>
				</Col>
				<Col span={12} className="flex justify-end">
							
							<Button onClick={handleChangeStatus}>Согласовать представление</Button>
	
				</Col>
			</Row>

			<Row className="mt-4">
				<Col flex={'auto'}>
					<Form form={form} component={false}>

						<TableEdit selectedPlace={selectedPlace} status={dataOneSubmissions?.status} active={true} visiting={dataOneSubmissions?.isWithDeparture} fullTable={fullTable} setFullTable={setFullTable} />
					</Form>
				</Col>
			</Row>

			<Row className='mt-[-68px]'>
				{isSuccess && dataOneSubmissions.status === 'На рассмотрении' ? (
					<Col span={2} className="mt-5">
						<Space className="w-full ">
							<Popover
								content={
									<div>
										{dataOneSubmissions.status === 'На рассмотрении'
											? 'Статус "На рассмотрении" позволяет редактировать представление'
											: 'Редактировать представление можно только в статусе "На рассмотрении'}
									</div>
								}
								title=""
							>
								<Button
									disabled={dataOneSubmissions.status !== 'На рассмотрении'}
									type="primary"
									className="!rounded-full"
									onClick={() => {
										setIsEdit(false)
										editData()
									}}
								>
									Сохранить
								</Button>
							</Popover>
						</Space>
					</Col>
				) : (
					''
				)}
			</Row>
		</section>
	)
}

export default EditRepresentation
