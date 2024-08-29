import { Button, ConfigProvider, Form, Input, Modal, Select } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useRequestCreateVacancyMutation
} from '../../../../../store/api/serviceApi'

export const SupervisorCreateVacancyForm = () => {
	const { data: categories = [] } = useGetCategoriesQuery()
	const [categoryTitle, setCategoryTitle] = useState<string>('')
	const { data: directions = [] } = useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [] } = useGetSubdivisionsQuery(categoryTitle)

	const [requestCreateVacancy] = useRequestCreateVacancyMutation()

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

	const navigate = useNavigate()

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					bodyStyle={{ padding: 53 }}
					centered
					open={isSuccessModalOpen}
					onCancel={() => {
						setIsSuccessModalOpen(false)
						navigate('/services/personnelaccounting/supervisor/vacancies')
					}}
					title={null}
					footer={null}
					width={407}
				>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
						Ваша заявка успешно отправлена. Вакансия будет добавлена после
						рассмотрения заявки кадрами.
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto mr-auto"
							type="primary"
							onClick={() => {
								setIsSuccessModalOpen(false)
								navigate('/services/personnelaccounting/supervisor/vacancies')
							}}
						>
							ОК
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="pl-[54px] pr-[54px] pb-[52px] pt-[120px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Создать вакансию
				</h1>
				<Form
					layout="vertical"
					requiredMark={false}
					className="w-[52%] mt-[52px]"
					onFinish={values => {
						requestCreateVacancy(values)
							.unwrap()
							.then(() => {
								setIsSuccessModalOpen(true)
							})
					}}
				>
					<Form.Item
						name={'post'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Должность
							</label>
						}
						rules={[{ required: true, message: 'Не указана должность' }]}
					>
						<Input placeholder="Ввести название"></Input>
					</Form.Item>
					<div className="flex gap-[20px] w-full">
						<Form.Item
							name={'experience'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Требуемый опыт работы
								</label>
							}
							rules={[{ required: true, message: 'Не указана опыт' }]}
						>
							<Select
								placeholder="Выбрать"
								options={[
									{ value: 'Нет опыта', label: 'Нет опыта' },
									{ value: 'Опыт от 1 до 3 лет', label: 'Опыт от 1 до 3 лет' },
									{ value: 'Опыт от 3 до 6 лет', label: 'Опыт от 3 до 6 лет' },
									{ value: 'Опыт более 6 лет', label: 'Опыт более 6 лет' }
								]}
							></Select>
						</Form.Item>
						<Form.Item
							name={'employment'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Тип занятости
								</label>
							}
							rules={[{ required: true, message: 'Не указан тип' }]}
						>
							<Select
								placeholder="Выбрать"
								options={[
									{ value: 'Полный график', label: 'Полный график' },
									{ value: 'Гибкий график', label: 'Гибкий график' },
									{ value: 'Сменный график', label: 'Сменный график' },
									{ value: 'Удалённая работа', label: 'Удалённая работа' }
								]}
							></Select>
						</Form.Item>
						<Form.Item
							name={'salary'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Заработная плата
								</label>
							}
							rules={[{ required: true, message: 'Не указана зарплата' }]}
						>
							<Input placeholder="Ввести"></Input>
						</Form.Item>
					</div>
					<Form.Item
						name={'responsibilities'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Задачи
							</label>
						}
						rules={[{ required: true, message: 'Не указаны задачи' }]}
					>
						<Input.TextArea
							autoSize
							className="!h-[107px]"
							placeholder="Ввести текст..."
						></Input.TextArea>
					</Form.Item>
					<Form.Item
						name={'skills'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Требования
							</label>
						}
						rules={[{ required: true, message: 'Не указаны требования' }]}
					>
						<Input.TextArea
							autoSize
							className="!h-[107px]"
							placeholder="Ввести текст..."
						></Input.TextArea>
					</Form.Item>
					<Form.Item
						name={'conditions'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Условия
							</label>
						}
						rules={[{ required: true, message: 'Не указаны условия' }]}
					>
						<Input.TextArea
							autoSize
							className="!h-[107px]"
							placeholder="Ввести текст..."
						></Input.TextArea>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Отправить
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}
