import {
	CheckOutlined,
	CloseOutlined,
	VerticalAlignBottomOutlined
} from '@ant-design/icons'
import {
	Button,
	Col,
	Descriptions,
	Divider,
	Form,
	Popconfirm,
	Popover,
	Row,
	Select,
	Space,
	Typography
} from 'antd'
import type { TableProps } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { EditSvg } from '../../../../assets/svg/EditSvg'
import { Item } from '../../../../models/representation'
import { useAppDispatch } from '../../../../store'
import {
	useChangeStatusMutation,
	useEditApplicationMutation,
	useEditSubmissionMutation,
	useGetDocApplicationQuery,
	useGetOneApplicationQuery} from '../../../../store/api/practiceApi/representation'
import { showNotification } from '../../../../store/reducers/notificationSlice'

import { SkeletonPage } from './Skeleton'
import TableEditView from './tableEditView'
import { useGetContractsAllQuery } from '../../../../store/api/practiceApi/roster'


export const EditAppendix = () => {
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const tableRef = useRef(null)
	const originData: any[] = []
	const nav = useNavigate()
	const [form] = Form.useForm()
	const [data, setData] = useState(originData)
	const [editingKey, setEditingKey] = useState('')
	const isEditing = (record: Item) => record.key === editingKey
	const {data: dataOneSubmissions,isSuccess,isLoading: isLoadingOneSubmission} = useGetOneApplicationQuery(id, { skip: !id })
	const {data: dataGetDocApplication,isLoading: isLoadingDocApplication,refetch} = useGetDocApplicationQuery(dataOneSubmissions ? dataOneSubmissions?.id : null,{ skip: !dataOneSubmissions })
	const { data: dataGetContracts, isSuccess: isSuccessGetContracts } = useGetContractsAllQuery()
	const [editApplication,{}] = useEditApplicationMutation()
	const [changeStatusSubmissions, {}] = useChangeStatusMutation()
	const [editSumbissions, {}] = useEditSubmissionMutation({})
	const [fullTable, setFullTable] = useState<any>([])
	const [editTheme, setEditTheme] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [selectContract, setSelectContract] = useState<string | null>(null)
	const [contracts, setContracts] = useState<any>([])
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (isSuccessGetContracts) {
			const newArray = dataGetContracts.map(item => {
				return {
					value: item.id,
					label: `${item.contractFacility} ${item.contractNumber} ${item.conclusionDate}`
				}
			})
			setContracts(newArray)
		}
	}, [isSuccessGetContracts])

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
					profileDirector: item.profileDirector,
					name: item.name,
					departmentDirector:dataOneSubmissions.practice.departmentDirector,
					practicePeriod: dataOneSubmissions.practice.practicePeriod,
					specialtyName: dataOneSubmissions.practice.specialtyName,
					other: `${dataOneSubmissions.practice.courseNumber} курс, ${dataOneSubmissions.practice.practiceKind}, ${dataOneSubmissions.practice.practiceType}`,

				}
			})
			setFullTable(array.map((item: any) => ({ ...item, key: item.name })))
		}
	}, [dataOneSubmissions, isSuccess])


	const items: any = [
		// {
		// 	key: '3',
		// 	label: 'Вид',
		// 	children: isSuccess ? dataOneSubmissions.practice.practiceKind : ''
		// },
		// {
		// 	key: '5',
		// 	label: 'Курс',
		// 	children: isSuccess ? dataOneSubmissions.practice.courseNumber : ''
		// },
		// {
		// 	key: '5',
		// 	label: 'Тип',
		// 	children: isSuccess ? dataOneSubmissions.practice.practiceType : ''
		// },
		// ...(isSuccess && dataOneSubmissions.isWithDeparture
		// 	? [
		// 			{
		// 				key: '6',
		// 				label: 'Тема',
		// 				children: (
		// 					<div className="flex">
		// 						<Col span={19}>
		// 							{dataOneSubmissions?.status === 'На рассмотрении' ? (
		// 								<Input
		// 									size="small"
		// 									id="topic"
		// 									placeholder="тема"
		// 									value={editTheme}
		// 									onChange={e => {
		// 										setEditTheme(e.target.value)
		// 										setIsEdit(true)
		// 									}}
		// 								/>
		// 							) : (
		// 								<div>{dataOneSubmissions?.theme}</div>
		// 							)}
		// 						</Col>
		// 					</div>
		// 				)
		// 			}
		// 	  ]
		// 	: []),
		
		{
			key: '7',
			label: 'Статус',
			children: isSuccess ? dataOneSubmissions.applicationStatus : '',
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

	const downloadFile = () => {
		
		if (dataGetDocApplication) {
			const link = document.createElement('a')
			link.href = dataGetDocApplication
			link.setAttribute('download', 'downloaded-file.docx')
			document.body.appendChild(link)
			link.click()

			// window.URL.revokeObjectURL(dataBlob)
		}
	}

	const editData = () => {
		const arrayT: any = [{}]
		const obj = 
			 {
	
				students: fullTable.map(({ key, ...rest }: any) => rest),
				contractId: selectContract,
				
			}
		
		console.log('obj', {id:dataOneSubmissions.id,
			body:obj})
		editApplication({id:dataOneSubmissions.id,
			body:obj})
			.unwrap()
			.then(() =>{
				dispatch(
					showNotification({
						message: 'Приложение успешно отредактировано',
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

	const handleChange = (value: string) => {
		console.log('Выбранный ID:', value)
		setSelectContract(value)
	}

	if (isLoadingOneSubmission) return <SkeletonPage />

	return (
		<section className="container">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Button
						size="large"
						className="mt-1"
						icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
						type="text"
						onClick={() => {
							nav('/services/practices/representation')
						}}
					/>
					<Typography.Text className=" text-[28px] mb-14">
          				Приложение к договору группы "
						{dataOneSubmissions?.practice.groupNumber}" подразделения "
						{dataOneSubmissions?.practice.subdivision}" на{' '}
						{dataOneSubmissions?.practice.academicYear} учебный год
					</Typography.Text>
				</Col>
			</Row>
			<Descriptions className="mt-8" items={items} />
			<Divider />
			<Row>
					<Col span={24}>
						<Typography.Text>Договор</Typography.Text>
					</Col>
					<Col className="mt-2" span={12}>
						<Select
							style={{ width: '100%' }}
							showSearch
							placeholder="Выберите договор"
							onChange={handleChange}
							filterOption={(input, option) =>
								(option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
							}
							options={contracts}
						/>
					</Col>
				</Row>
			<Row className="mt-4 mb-6 flex  justify-between">
				<Col span={12}>
					<div>
						<Space>
							{!isEdit ? (
								<Button
									onClick={downloadFile}
									loading={isLoadingDocApplication}
									disabled={isLoadingDocApplication || isEdit}
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
										loading={isLoadingDocApplication}
										disabled={isLoadingDocApplication || isEdit}
									>
										<VerticalAlignBottomOutlined /> Скачать
									</Button>
								</Popover>
							)}
						</Space>
					</div>
				</Col>
				{/* <Col span={12} className="flex justify-end">
							
							<Button onClick={handleChangeStatus}>Согласовать приложение</Button>
	
				</Col> */}
			</Row>

			<Row className="mt-4">
				<Col flex={'auto'}>
					<Form form={form} component={false}>

						<TableEditView visiting={dataOneSubmissions?.isWithDeparture} fullTable={fullTable} setFullTable={setFullTable} />
					</Form>
				</Col>
			</Row>

			<Row className='mt-[-68px]'>
				{isSuccess && dataOneSubmissions.orderStatus !== 'Согласован1' ? (
					<Col span={2} className="mt-5">
						<Space className="w-full ">
							<Popover
								content={
									<div>
										{dataOneSubmissions.status === 'На рассмотрении'
											? 'Статус "На рассмотрении" позволяет редактировать представление'
											: 'Редактировать приложение можно только в статусе "На рассмотрении'}
									</div>
								}
								title=""
							>
								<Button
								
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

export default EditAppendix