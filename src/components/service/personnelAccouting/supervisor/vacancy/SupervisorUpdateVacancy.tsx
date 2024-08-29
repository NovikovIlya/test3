import { Button, ConfigProvider, Form, Input, Modal, Select } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../../../store'
import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useRequestUpdateVacancyMutation
} from '../../../../../store/api/serviceApi'
import ArrowIcon from '../../../jobSeeker/ArrowIcon'

export const SupervisorUpdateVacancy = () => {
	const { currentVacancy } = useAppSelector(state => state.currentVacancy)

	const { data: categories = [] } = useGetCategoriesQuery()
	const [categoryTitle, setCategoryTitle] = useState<string>('')
	const { data: directions = [] } = useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [] } = useGetSubdivisionsQuery(categoryTitle)

	const navigate = useNavigate()
	const [requestUpdate] = useRequestUpdateVacancyMutation()

	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isSendRequestButtonActivated, setIsSendRequestButtonActivated] =
		useState<boolean>(false)

	const [post, setPost] = useState<string | undefined>(
		currentVacancy?.title.rendered
	)
	const [experience, setExperience] = useState<string | undefined>(
		currentVacancy?.acf.experience
	)
	const [employment, setEmployment] = useState<string | undefined>(
		currentVacancy?.acf.employment
	)
	const [salary, setSalary] = useState<string | undefined>(
		currentVacancy?.acf.salary
	)
	const [category, setCategory] = useState<string | undefined>(
		currentVacancy?.acf.category
	)
	const [direction, setDirection] = useState<string | undefined>(
		currentVacancy?.acf.direction
	)
	const [subdivision, setSubdivision] = useState<string | undefined>(
		currentVacancy?.acf.subdivision
	)

	const [responsibilities, setResponsibilities] = useState<string | undefined>(
		currentVacancy?.acf.responsibilities
			.replace(/<strong>/g, '')
			.replace(/<\/strong>/g, '')
			.replace(/<u>/g, '')
			.replace(/<\/u>/g, '')
			.replace(/<i>/g, '')
			.replace(/<\/i>/g, '')
			.replace(/<em>/g, '')
			.replace(/<\/em'>/g, '')
			.replace(/<ul>/g, '')
			.replace(/<\/ul>/g, '')
			.replace(/<li>/g, '')
			.replace(/<\/li>/g, '')
	)

	const [skills, setSkills] = useState<string | undefined>(
		currentVacancy?.acf.skills
			.replace(/<strong>/g, '')
			.replace(/<\/strong>/g, '')
			.replace(/<u>/g, '')
			.replace(/<\/u>/g, '')
			.replace(/<i>/g, '')
			.replace(/<\/i>/g, '')
			.replace(/<em>/g, '')
			.replace(/<\/em'>/g, '')
			.replace(/<ul>/g, '')
			.replace(/<\/ul>/g, '')
			.replace(/<li>/g, '')
			.replace(/<\/li>/g, '')
	)

	const [conditions, setConditions] = useState<string | undefined>(
		currentVacancy?.acf.conditions
			.replace(/<strong>/g, '')
			.replace(/<\/strong>/g, '')
			.replace(/<u>/g, '')
			.replace(/<\/u>/g, '')
			.replace(/<i>/g, '')
			.replace(/<\/i>/g, '')
			.replace(/<em>/g, '')
			.replace(/<\/em'>/g, '')
			.replace(/<ul>/g, '')
			.replace(/<\/ul>/g, '')
			.replace(/<li>/g, '')
			.replace(/<\/li>/g, '')
	)

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

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
					}}
					title={null}
					footer={null}
					width={407}
				>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
						Ваша заявка успешно отправлена. Вакансия будет обновлена после
						рассмотрения заявки кадрами.
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto mr-auto"
							type="primary"
							onClick={() => {
								setIsSuccessModalOpen(false)
							}}
						>
							ОК
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<div
				id="wrapper"
				className="pl-[54px] pr-[54px] pt-[60px] mt-[60px] mb-[52px] w-full"
			>
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/supervisor/vacancies')
						}}
						className="bg-inherit h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[32px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{currentVacancy !== null ? currentVacancy.title.rendered : ''}
					</p>
				</div>
				{isEdit ? (
					<Form
						initialValues={{
							post: post,
							salary: salary,
							responsibilities: responsibilities,
							skills: skills,
							conditions: conditions,
							experience: experience,
							employment: employment
						}}
						layout="vertical"
						requiredMark={false}
						className="w-[50%] mt-[52px]"
						onFinish={values => {
							setPost(prev => values.post)
							setExperience(prev => values.experience)
							setEmployment(prev => values.employment)
							setSalary(prev => values.salary)
							setResponsibilities(prev => values.responsibilities)
							setSkills(prev => values.skills)
							setConditions(prev => values.conditions)
							setIsSendRequestButtonActivated(true)
							setIsEdit(false)
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
										{
											value: 'Опыт от 1 до 3 лет',
											label: 'Опыт от 1 до 3 лет'
										},
										{
											value: 'Опыт от 3 до 6 лет',
											label: 'Опыт от 3 до 6 лет'
										},
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
								Сохранить
							</Button>
						</Form.Item>
					</Form>
				) : (
					<div className="w-[50%] mt-[52px] flex flex-col gap-[40px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Должность:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{post && post}
							</p>
						</div>
						<div className="flex gap-[60px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Требуемый опыт работы:
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{experience && experience}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Тип занятости:
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{employment && employment}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Заработная плата:
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{salary && salary}
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Задачи:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{responsibilities && responsibilities}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Требования:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{skills && skills}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Условия:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{conditions && conditions}
							</p>
						</div>
						<div className="flex gap-[40px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Категория сотрудников
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{category && category}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									{direction && direction !== 'false'
										? 'Профобласть'
										: subdivision && 'Подразделение'}
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{direction && direction !== 'false'
										? direction
										: subdivision && subdivision}
								</p>
							</div>
						</div>
						<div className="flex gap-[20px]">
							<Button
								onClick={() => {
									setIsEdit(true)
								}}
								className="w-[151px] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black bg-inherit"
							>
								Редактировать
							</Button>
							{isSendRequestButtonActivated && (
								<Button
									onClick={() => {
										requestUpdate({
											post: post as string,
											experience: experience as string,
											salary: salary as string,
											employment: employment as string,
											responsibilities: responsibilities as string,
											skills: skills as string,
											conditions: conditions as string,
											vacancyId: currentVacancy?.id as number
										})
											.unwrap()
											.then(() => {
												setIsSuccessModalOpen(true)
											})
									}}
									type="primary"
									className="rounded-[54.5px] w-[121px]"
								>
									Отправить
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	)
}
