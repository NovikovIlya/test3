import {
	Button,
	Checkbox,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Modal,
	Radio,
	Select,
	Tag,
	Upload
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'

import { ArrowToTheRight } from '../../../assets/svg/ArrowToTheRight'
import { DeleteSvg } from '../../../assets/svg/DeleteSvg'
import { EditSvg } from '../../../assets/svg/EditSvg'
import { useAppSelector } from '../../../store'
import { usePostVacancyRespondMutation } from '../../../store/api/serviceApi'
import {
	useGetCountriesQuery,
	useGetEducationLevelQuery
} from '../../../store/api/utilsApi'
import { allData } from '../../../store/reducers/SeekerFormReducers/AboutMeReducer'
import {
	addExperience,
	alterExperience,
	deleteExperience,
	experienceItemType,
	lowerNoExperienceFlag,
	raiseNoExperienceFlag
} from '../../../store/reducers/SeekerFormReducers/ExperienceReducer'
import {
	completeAboutMe,
	completeEducation,
	completeSkills
} from '../../../store/reducers/SeekerFormReducers/FormCompletionReducer'
import {
	addEducation,
	alterEducation,
	deleteEducation,
	educationResponceItemType
} from '../../../store/reducers/SeekerFormReducers/RespondEducationReducer'
import { allSkillsData } from '../../../store/reducers/SeekerFormReducers/SkillsReducer'

import ArrowIcon from './ArrowIcon'
import { AttachIcon } from './AttachIcon'
import { ButtonPlusIcon } from './ButtonPlusIcon'
import { CheckedIcon } from './CheckedIcon'

export const ResponseForm = () => {
	const { t, i18n } = useTranslation()
	const { data: countries, isLoading: isLoadingCountry } = useGetCountriesQuery(
		i18n.language
	)
	const { data: levels } = useGetEducationLevelQuery(i18n.language)
	const [isFormOpen, setIsFormOpen] = useState(false)
	const dispatch = useDispatch()

	const aboutMeData = useAppSelector(state => state.seekerAboutMe)
	const { currentVacancy } = useAppSelector(state => state.currentVacancy)
	const {
		aboutMeCompleted,
		skillsCompleted,
		educationCompleted,
		experienceCompleted
	} = useAppSelector(state => state.formCompletion)
	const skillsData = useAppSelector(state => state.skills)
	const educationData = useAppSelector(state => state.RespondEducation)
	const experienceData = useAppSelector(state => state.Experience)

	const [currentFormskills, setcurrentFormSkills] = useState<string[]>(
		skillsData.skills
	)
	const [haveNoExprience, setHaveNoExperience] = useState(
		experienceData.noExperienceFlag
	)
	const [skillInputValue, setSkillInputValue] = useState<string>('')
	const [coverLetter, setCoverLetter] = useState('')
	const date = new Date()

	const { pathname } = useLocation()
	const navigate = useNavigate()
	const [getVacancy, result] = usePostVacancyRespondMutation()

	const [experienceToEdit, setExperienceToEdit] = useState<
		experienceItemType | undefined
	>({
		id: '',
		experience: {
			workplace: '',
			beginWork: '',
			endWork: '',
			seat: '',
			duties: ''
		}
	})

	const [educationToEdit, setEducationToEdit] = useState<
		educationResponceItemType | undefined
	>({
		id: '',
		education: {
			nameofInstitute: '',
			graduateYear: '',
			countryId: 184,
			educationLevelId: 4,
			specialization: ''
		}
	})

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

	return (
		<>
			<Button
				className="rounded-[54.5px]"
				type="primary"
				onMouseDown={e => {
					e.preventDefault()
				}}
				onClick={e => {
					navigate('/services/jobseeker/vacancyview/respond/main')
					setIsFormOpen(true)
				}}
			>
				Откликнуться
			</Button>

			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					centered
					open={isSuccessModalOpen}
					bodyStyle={{
						padding: '26px'
					}}
					width={407}
					className="pr-[52px] pl-[52px] pb-[52px]"
					footer={null}
					title={null}
					onCancel={() => {
						setIsSuccessModalOpen(false)
					}}
				>
					<div className="text-center">
						<p className="font-content-font font-normal text-black text-[16px]/[20px] mb-[40px]">
							Спасибо, ваш отклик успешно отправлен
						</p>
						<Button
							type="primary"
							className="w-full rounded-[55.5px]"
							onClick={() => {
								setIsSuccessModalOpen(false)
							}}
						>
							Ок
						</Button>
					</div>
				</Modal>
			</ConfigProvider>

			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					bodyStyle={{
						padding: '26px'
					}}
					width={622}
					className="pr-[52px] pl-[52px] pb-[52px]"
					open={isFormOpen}
					title={null}
					footer={null}
					onCancel={() => {
						setIsFormOpen(false)
						navigate('/services/jobseeker/vacancyview')
					}}
				>
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/main'
					) && (
						<>
							<p className="font-content-font text-black text-[18px]/[21.6px] font-normal">
								Откликнуться на вакансию
							</p>
							<p className="font-content-font text-black text-[18px]/[21.6px] font-bold">
								{currentVacancy?.title.rendered}
							</p>
							<p className="mt-[36px] font-content-font text-black text-[18px]/[21.px] font-normal">
								Чтобы отправить отклик, необходимо заполнить следующие данные:
							</p>
							<div className="mt-[36px] flex flex-col gap-[12px]">
								<div
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/aboutme')
									}}
									className="h-[43px] pl-[16px] pr-[16px] flex justify-between items-center border-[1px] border-dashed border-blue1f5 rounded-[5px] cursor-pointer"
								>
									<p className="font-content-font text-black text-[16px]/[19.2px] font-bold select-none">
										Личные данные
									</p>
									{aboutMeCompleted ? <CheckedIcon /> : <EditSvg />}
								</div>
								<div
									onClick={() => {
										navigate(
											'/services/jobseeker/vacancyview/respond/education/main'
										)
									}}
									className="h-[43px] pl-[16px] pr-[16px] flex justify-between items-center border-[1px] border-dashed border-blue1f5 rounded-[5px] cursor-pointer"
								>
									<p className="font-content-font text-black text-[16px]/[19.2px] font-bold select-none">
										Образование
									</p>
									{educationData.educations.length !== 0 ? (
										<CheckedIcon />
									) : (
										<EditSvg />
									)}
								</div>
								<div
									onClick={() => {
										navigate(
											'/services/jobseeker/vacancyview/respond/experience/main'
										)
									}}
									className="h-[43px] pl-[16px] pr-[16px] flex justify-between items-center border-[1px] border-dashed border-blue1f5 rounded-[5px] cursor-pointer"
								>
									<p className="font-content-font text-black text-[16px]/[19.2px] font-bold select-none">
										Опыт работы
									</p>
									{experienceData.noExperienceFlag ||
									experienceData.experiences.length !== 0 ? (
										<CheckedIcon />
									) : (
										<EditSvg />
									)}
								</div>
								<div
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/skills')
									}}
									className="h-[43px] pl-[16px] pr-[16px] flex justify-between items-center border-[1px] border-dashed border-blue1f5 rounded-[5px] cursor-pointer"
								>
									<p className="font-content-font text-black text-[16px]/[19.2px] font-bold select-none">
										Профессиональные навыки
									</p>
									{skillsCompleted ? <CheckedIcon /> : <EditSvg />}
								</div>
								<Button
									className="ml-auto mt-[40px] rounded-[54.5px]"
									type="primary"
									onClick={
										!aboutMeCompleted
											? () => {
													navigate(
														'/services/jobseeker/vacancyview/respond/aboutme'
													)
											  }
											: educationData.educations.length === 0
											? () => {
													navigate(
														'services/jobseeker/vacancyview/respond/education/main'
													)
											  }
											: !(
													experienceData.noExperienceFlag ||
													experienceData.experiences.length !== 0
											  )
											? () => {
													navigate(
														'services/jobseeker/vacancyview/respond/experience/main'
													)
											  }
											: !skillsCompleted
											? () => {
													navigate(
														'services/jobseeker/vacancyview/respond/skills'
													)
											  }
											: () => {
													// currentVacancy !== null &&
													// 	getVacancy({
													// 		id: currentVacancy?.id,
													// 		aboutMe: {
													// 			gender: aboutMeData.gender,
													// 			lastname: aboutMeData.surName,
													// 			firstname: aboutMeData.name,
													// 			patronymic: aboutMeData.patronymic,
													// 			birthday: aboutMeData.birthDay
													// 				.split('-')
													// 				.reverse()
													// 				.join('-'),
													// 			citizenship: 'Российская федерация (РФ)',
													// 			phone: aboutMeData.phone,
													// 			email: aboutMeData.email
													// 		},
													// 		educations: educationData.educations.map(edu => ({
													// 			institution: edu.education.nameofInstitute,
													// 			endYear: parseInt(edu.education.graduateYear),
													// 			country: 'РФ',
													// 			educationLevel: 'Высшее',
													// 			speciality: edu.education.specialization
													// 		})),
													// 		portfolio: {
													// 			url: '',
													// 			workExperiences: experienceData.experiences.map(
													// 				exp => ({
													// 					workPlace: exp.experience.workplace,
													// 					beginWork: exp.experience.beginWork
													// 						.split('-')
													// 						.reverse()
													// 						.join('-'),
													// 					endWork: exp.experience.endWork
													// 						.split('-')
													// 						.reverse()
													// 						.join('-'),
													// 					position: exp.experience.seat,
													// 					duties: exp.experience.duties
													// 				})
													// 			)
													// 		},
													// 		skills: {
													// 			keySkills: skillsData.skills,
													// 			aboutMe: skillsData.details
													// 		}
													// 	})
													// 		.unwrap()
													// 		.then(() => {
													// 			!result.isSuccess && setIsFormOpen(false)
													// 		})
													// 		.then(() => {
													// 			!result.isSuccess && setIsSuccessModalOpen(true)
													// 		})
													navigate(
														'/services/jobseeker/vacancyview/respond/coverletter'
													)
											  }
									}
								>
									{aboutMeCompleted &&
									educationData.educations.length !== 0 &&
									(experienceData.noExperienceFlag ||
										experienceData.experiences.length !== 0) &&
									skillsCompleted
										? 'Откликнуться'
										: 'Дальше'}
								</Button>
							</div>
						</>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/coverletter'
					) && (
						<>
							<p className="mb-[36px] font-content-font text-black text-[18px]/[18px] font-normal">
								Откликнуться
							</p>
							<div className="mb-[20px] rounded-[8px] bg-[#E5EBFB] py-[12px] px-[20px] relative">
								<p className="font-content-font text-black text-[16px]/[19.2px] font-normal opacity-40">
									Вакансия
								</p>
								<p className="font-content-font text-black text-[16px]/[19.2px] font-normal w-[90%]">
									{currentVacancy?.title.rendered}
								</p>
								<div
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/main')
									}}
									className="absolute top-[50%] bottom-[50%] right-[29px] cursor-pointer"
								>
									<ArrowToTheRight />
								</div>
							</div>
							<p className="mb-[16px] font-content-font text-black text-[16px]/[16px] font-normal">
								Сопроводительное письмо
							</p>
							<Input.TextArea
								autoSize={true}
								className="!h-[185px] !px-[16px] !py-[11px]"
								placeholder="Введите сообщение"
								value={coverLetter}
								onChange={e => {
									setCoverLetter(e.target.value)
								}}
							/>
							<Button
								className="mr-auto mt-[40px] rounded-[54.5px]"
								type="primary"
								onClick={() => {
									currentVacancy !== null &&
										getVacancy({
											id: currentVacancy?.id,
											coverLetter: coverLetter,
											aboutMe: {
												gender: aboutMeData.gender,
												lastname: aboutMeData.surName,
												firstname: aboutMeData.name,
												patronymic: aboutMeData.patronymic,
												birthday: aboutMeData.birthDay
													.split('-')
													.reverse()
													.join('-'),
												citizenship: 'Российская федерация (РФ)',
												phone: aboutMeData.phone,
												email: aboutMeData.email
											},
											educations: educationData.educations.map(edu => ({
												institution: edu.education.nameofInstitute,
												endYear: parseInt(edu.education.graduateYear),
												country: countries?.find(
													cou => cou.id === edu.education.countryId
												)?.shortName!,
												educationLevel: levels?.find(
													educ => educ.id === edu.education.educationLevelId
												)?.name!,
												speciality: edu.education.specialization
											})),
											portfolio: {
												url: '',
												workExperiences: experienceData.experiences.map(
													exp => ({
														workPlace: exp.experience.workplace,
														beginWork: exp.experience.beginWork
															.split('-')
															.reverse()
															.join('-'),
														endWork: exp.experience.endWork
															.split('-')
															.reverse()
															.join('-'),
														position: exp.experience.seat,
														duties: exp.experience.duties
													})
												)
											},
											skills: {
												keySkills: skillsData.skills,
												aboutMe: skillsData.details
											}
										})
											.unwrap()
											.then(() => {
												!result.isSuccess && setIsFormOpen(false)
											})
											.then(() => {
												!result.isSuccess && setIsSuccessModalOpen(true)
											})
								}}
							>
								Отправить
							</Button>
						</>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/aboutme'
					) && (
						<Form
							layout="vertical"
							requiredMark={false}
							initialValues={{
								gender: aboutMeData.gender,
								name: aboutMeData.name,
								surname: aboutMeData.surName,
								patronymic: aboutMeData.patronymic,
								birthDay: dayjs(
									aboutMeData.birthDay.split('.').join('-'),
									'DD.MM.YYYY'
								),
								country: aboutMeData.countryId,
								phoneNumber: aboutMeData.phone,
								email: aboutMeData.email
							}}
							onFinish={values => {
								dispatch(
									allData({
										...values,
										birthDay: values.birthDay.$d
											.toLocaleDateString()
											.split('.')
											.join('-'),
										surName: values.surname,
										phone: values.phoneNumber,
										countryId: values.country
									})
								)
								dispatch(completeAboutMe())
								console.log(values.birthDay)
								console.log(
									values.birthDay.$d.toLocaleDateString().split('.').join('-')
								)
								navigate('/services/jobseeker/vacancyview/respond/main')
							}}
						>
							<div className="flex items-center mb-[38px]">
								<button
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/main')
									}}
									className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
								>
									<ArrowIcon />
								</button>
								<p className="ml-[15px] font-content-font font-bold text-black text-[18px]/[21.6px]">
									Личные данные
								</p>
							</div>
							<Form.Item
								name={'gender'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Пол
									</label>
								}
								rules={[{ required: true, message: 'Не выбран пол' }]}
							>
								<Radio.Group
									value={aboutMeData.gender}
									// onChange={e => dispatch(gender(e.target.value))}
								>
									<Radio value={'M'}>Мужской</Radio>
									<Radio value={'W'}>Женский</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item
								name={'surname'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Фамилия
									</label>
								}
								rules={[
									{ required: true, message: 'Поле фамилии не заполнено' }
								]}
							>
								<Input
									value={aboutMeData.surName}
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'name'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Имя
									</label>
								}
								rules={[{ required: true, message: 'Поле имени не заполнено' }]}
							>
								<Input
									value={aboutMeData.name}
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'patronymic'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Отчество
									</label>
								}
								rules={[
									{ required: true, message: 'Поле отчества не заполнено' }
								]}
							>
								<Input
									value={aboutMeData.patronymic}
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'birthDay'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Дата рождения
									</label>
								}
								rules={[
									{ required: true, message: 'Не введена дата рождения' }
								]}
							>
								<DatePicker
									format={'DD-MM-YYYY'}
									value={dayjs(aboutMeData.birthDay, 'DD.MM.YYYY')}
									className="w-full"
									onChange={(e, date) => {
										// dispatch(birthDay(date))
										// setBirthDayDate(date)
									}}
								></DatePicker>
							</Form.Item>
							<Form.Item
								name={'country'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Страна гражданства
									</label>
								}
								rules={[{ required: true, message: 'Не выбрана страна' }]}
							>
								<Select
									className="w-full rounded-lg"
									value={aboutMeData.countryId}
									// onChange={e => dispatch(country(e))}
									options={
										countries === undefined
											? []
											: countries.map(el => ({
													value: el.id,
													label: el.shortName
											  }))
									}
								/>
							</Form.Item>
							<Form.Item
								name={'phoneNumber'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Телефон
									</label>
								}
								rules={[
									{
										required: true,
										message: 'Поле номера телефона не заполнено'
									}
								]}
							>
								<Input
									value={aboutMeData.phone}
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'email'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Электронная почта
									</label>
								}
								rules={[
									{
										required: true,
										message: 'Поле электронной почты не заполнено'
									}
								]}
							>
								<Input
									value={aboutMeData.email}
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<div style={{ textAlign: 'right', marginTop: 40 }}>
								<Button type="primary" htmlType="submit">
									Сохранить
								</Button>
							</div>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/education/main'
					) && (
						<Form layout="vertical" requiredMark={false}>
							<div className="flex items-center mb-[38px]">
								<button
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/main')
									}}
									className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
								>
									<ArrowIcon />
								</button>
								<p className="ml-[15px] font-content-font font-bold text-black text-[18px]/[21.6px]">
									Образование
								</p>
							</div>
							<div className="mt-[40px]">
								{educationData.educations.map(edu => (
									<div
										key={edu.id}
										className="h-[90px] pl-[16px] pr-[16px] pb-[20px] mb-[20px] border-solid flex justify-between items-center border-0 border-b-[1px] border-black border-opacity-20 cursor-pointer"
									>
										<div className="flex flex-col gap-[12px]">
											<p className="font-content-font text-black text-[16px]/[16px] font-bold select-none">
												{edu.education.nameofInstitute}
											</p>
											<p className="font-content-font text-black text-[16px]/[16px] font-normal select-none">
												{edu.education.specialization},{' '}
												{
													levels?.find(
														educ => educ.id === edu.education.educationLevelId
													)?.name
												}
											</p>
											<p className="font-content-font text-black text-[14px]/[14px] font-normal select-none opacity-60">
												{edu.education.graduateYear}
											</p>
										</div>
										<div className="flex gap-[12px]">
											<Button
												type="text"
												icon={<EditSvg />}
												onClick={() => {
													setEducationToEdit(
														educationData.educations.find(
															educa => educa.id === edu.id
														)
													)
													navigate(
														'/services/jobseeker/vacancyview/respond/education/edit'
													)
												}}
											/>
											<Button
												type="text"
												icon={<DeleteSvg />}
												onClick={() => {
													dispatch(deleteEducation(edu.id))
												}}
											/>
										</div>
									</div>
								))}
							</div>
							<div
								style={{ textAlign: 'center' }}
								className={`flex flex-col items-center ${
									haveNoExprience && 'opacity-50 pointer-events-none'
								}`}
							>
								<ConfigProvider
									theme={{
										components: {
											Button: {
												colorBgTextHover: '#ffffff',
												colorBgTextActive: '#ffffff'
											}
										}
									}}
								>
									<Button
										onClick={() => {
											navigate(
												'/services/jobseeker/vacancyview/respond/education/add'
											)
										}}
										icon={<ButtonPlusIcon />}
										type="text"
									></Button>
								</ConfigProvider>
								<p className="mt-[5px] w-[94px] font-main-font font-normal text-[14px]/[18px] opacity-40">
									добавить образование
								</p>
							</div>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/education/add'
					) && (
						<Form
							layout="vertical"
							requiredMark={false}
							onFinish={values => {
								dispatch(
									addEducation({
										id: uuid(),
										education: {
											graduateYear: values.graduateYear,
											specialization: values.specialization,
											nameofInstitute: values.instituteName,
											countryId: values.country,
											educationLevelId: values.educationLevel
										}
									})
								)
								dispatch(completeEducation())
								navigate(
									'/services/jobseeker/vacancyview/respond/education/main'
								)
							}}
						>
							<div className="flex items-center mb-[38px]">
								<button
									onClick={() => {
										navigate(
											'/services/jobseeker/vacancyview/respond/education/main'
										)
									}}
									className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
								>
									<ArrowIcon />
								</button>
								<p className="ml-[15px] font-content-font font-bold text-black text-[18px]/[21.6px]">
									Добавить образование
								</p>
							</div>
							<Form.Item
								name={'educationLevel'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Уровень образования
									</label>
								}
								rules={[
									{ required: true, message: 'Не выбран уровень образования' }
								]}
							>
								<Select
									className="w-full rounded-lg"
									options={
										levels === undefined
											? []
											: levels.map(el => ({
													value: el.id,
													label: el.name
											  }))
									}
								/>
							</Form.Item>
							<Form.Item
								name={'country'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Страна получения образования
									</label>
								}
								rules={[{ required: true, message: 'Не выбрана страна' }]}
							>
								<Select
									className="w-full rounded-lg"
									options={
										countries === undefined
											? []
											: countries.map(el => ({
													value: el.id,
													label: el.shortName
											  }))
									}
								/>
							</Form.Item>
							<Form.Item
								name={'instituteName'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Учебное заведение
									</label>
								}
								rules={[
									{ required: true, message: 'Не введено учебное заведение' }
								]}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'specialization'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Специальность
									</label>
								}
								rules={[
									{ required: true, message: 'Не введена специальность' }
								]}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'graduateYear'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Год окончания
									</label>
								}
								rules={[{ required: true, message: 'Не выбран год' }]}
							>
								<Select
									className="w-full rounded-lg"
									options={Array.from(
										{
											length:
												date.getMonth() >= 6
													? date.getFullYear() - 1969
													: date.getFullYear() - 1970
										},
										(_, i) => i + 1970
									).map(year => ({
										value: year.toString(),
										label: year.toString()
									}))}
								/>
							</Form.Item>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/education/edit'
					) && (
						<Form
							layout="vertical"
							requiredMark={false}
							onFinish={values => {
								educationToEdit !== undefined &&
									dispatch(
										alterEducation({
											id: educationToEdit?.id,
											nameofInstitute: values.instituteName,
											countryId: values.country,
											educationLevelId: values.educationLevel,
											graduateYear: values.graduateYear,
											specialization: values.specialization
										})
									)
								dispatch(completeEducation())
								navigate(
									'/services/jobseeker/vacancyview/respond/education/main'
								)
							}}
							initialValues={{
								specialization: educationToEdit?.education.specialization,
								instituteName: educationToEdit?.education.nameofInstitute,
								country: educationToEdit?.education.countryId,
								educationLevel: educationToEdit?.education.educationLevelId,
								graduateYear: educationToEdit?.education.graduateYear
							}}
						>
							<div className="flex items-center mb-[38px]">
								<button
									onClick={() => {
										navigate(
											'/services/jobseeker/vacancyview/respond/education/main'
										)
									}}
									className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
								>
									<ArrowIcon />
								</button>
								<p className="ml-[15px] font-content-font font-bold text-black text-[18px]/[21.6px]">
									Изменить образование
								</p>
							</div>
							<Form.Item
								name={'educationLevel'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Уровень образования
									</label>
								}
								rules={[
									{ required: true, message: 'Не выбран уровень образования' }
								]}
							>
								<Select
									className="w-full rounded-lg"
									options={
										levels === undefined
											? []
											: levels.map(el => ({
													value: el.id,
													label: el.name
											  }))
									}
								/>
							</Form.Item>
							<Form.Item
								name={'country'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Страна получения образования
									</label>
								}
								rules={[{ required: true, message: 'Не выбрана страна' }]}
							>
								<Select
									className="w-full rounded-lg"
									options={
										countries === undefined
											? []
											: countries.map(el => ({
													value: el.id,
													label: el.shortName
											  }))
									}
								/>
							</Form.Item>
							<Form.Item
								name={'instituteName'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Учебное заведение
									</label>
								}
								rules={[
									{ required: true, message: 'Не введено учебное заведение' }
								]}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'specialization'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Специальность
									</label>
								}
								rules={[
									{ required: true, message: 'Не введена специальность' }
								]}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
								></Input>
							</Form.Item>
							<Form.Item
								name={'graduateYear'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Год окончания
									</label>
								}
								rules={[{ required: true, message: 'Не выбран год' }]}
							>
								<Select
									className="w-full rounded-lg"
									options={Array.from(
										{
											length:
												date.getMonth() >= 6
													? date.getFullYear() - 1969
													: date.getFullYear() - 1970
										},
										(_, i) => i + 1970
									).map(year => ({
										value: year.toString(),
										label: year.toString()
									}))}
								/>
							</Form.Item>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/experience/main'
					) && (
						<Form layout="vertical" requiredMark={false}>
							<div className="flex items-center mb-[38px]">
								<button
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/main')
									}}
									className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
								>
									<ArrowIcon />
								</button>
								<p className="ml-[15px] font-content-font font-bold text-black text-[18px]/[21.6px]">
									Опыт работы
								</p>
							</div>
							<p className="font-content-font text-black text-[18px]/[18px]">
								<b>Портфолио</b> (не обязательно)
							</p>
							<p className="mt-[24px] font-content-font text-black text-[16px]/[16px]">
								Ссылка
							</p>
							<Form.Item className="mt-[18px]">
								<Input placeholder="https://disk.yandex.ru"></Input>
							</Form.Item>
							<Upload>
								<div className="flex items-center gap-[12px] cursor-pointer">
									<AttachIcon />
									<p className="font-content-font font-normal text-[16px]/[16px] text-black underline select-none">
										Прикрепить файл
									</p>
								</div>
							</Upload>
							<Form.Item
								name={'haveExperienceFlag'}
								className={`mt-[40px] ${
									experienceData.experiences.length !== 0 && 'hidden'
								}`}
							>
								<Checkbox
									checked={haveNoExprience}
									onChange={e => {
										setHaveNoExperience(prev => !prev)
										!haveNoExprience
											? dispatch(raiseNoExperienceFlag())
											: dispatch(lowerNoExperienceFlag())
									}}
								>
									Я не имею опыта работы
								</Checkbox>
							</Form.Item>
							<div className="mt-[40px]">
								{experienceData.experiences.map(exp => (
									<div
										key={exp.id}
										className="h-[90px] pl-[16px] pr-[16px] pb-[20px] mb-[20px] border-solid flex justify-between items-center border-0 border-b-[1px] border-black border-opacity-20 cursor-pointer"
									>
										<div className="flex flex-col gap-[12px]">
											<p className="font-content-font text-black text-[16px]/[16px] font-bold select-none">
												{exp.experience.seat}
											</p>
											<p className="font-content-font text-black text-[16px]/[16px] font-normal select-none">
												{exp.experience.workplace}
											</p>
											<p className="font-content-font text-black text-[14px]/[14px] font-normal select-none opacity-60">
												{dayjs(exp.experience.beginWork, 'DD.MM.YYYY')
													.toDate()
													.getMonth() +
													1 <
												10
													? '0' +
													  (dayjs(exp.experience.beginWork, 'DD.MM.YYYY')
															.toDate()
															.getMonth() +
															1)
													: dayjs(exp.experience.beginWork, 'DD.MM.YYYY')
															.toDate()
															.getMonth() + 1}
												.
												{dayjs(exp.experience.beginWork, 'DD.MM.YYYY')
													.toDate()
													.getFullYear()}{' '}
												-{' '}
												{dayjs(exp.experience.endWork, 'DD.MM.YYYY')
													.toDate()
													.getFullYear() === date.getFullYear() &&
												dayjs(exp.experience.endWork, 'DD.MM.YYYY')
													.toDate()
													.getMonth() === date.getMonth()
													? 'по наст.время'
													: dayjs(exp.experience.endWork, 'DD.MM.YYYY')
															.toDate()
															.getMonth() +
													  1 +
													  '.' +
													  dayjs(exp.experience.endWork, 'DD.MM.YYYY')
															.toDate()
															.getFullYear()}{' '}
												{/* {dayjs(exp.experience.endWork, 'DD.MM.YYYY')
													.toDate()
													.getFullYear() -
													dayjs(exp.experience.beginWork, 'DD.MM.YYYY')
														.toDate()
														.getFullYear() ===
												0
													? ''
													: dayjs(exp.experience.endWork, 'DD.MM.YYYY')
															.toDate()
															.getFullYear() -
															(dayjs(exp.experience.beginWork, 'DD.MM.YYYY')
																.toDate()
																.getFullYear() %
																10) ===
													  1
													? '1 год'
													: dayjs(exp.experience.endWork, 'DD.MM.YYYY')
															.toDate()
															.getFullYear() -
															(dayjs(exp.experience.beginWork, 'DD.MM.YYYY')
																.toDate()
																.getFullYear() %
																10) <=
													  4
													? `${
															dayjs(exp.experience.endWork, 'DD.MM.YYYY')
																.toDate()
																.getFullYear() -
															dayjs(exp.experience.beginWork, 'DD.MM.YYYY')
																.toDate()
																.getFullYear()
													  } года`
													: `${
															dayjs(exp.experience.endWork, 'DD.MM.YYYY')
																.toDate()
																.getFullYear() -
															dayjs(exp.experience.beginWork, 'DD.MM.YYYY')
																.toDate()
																.getFullYear()
													  } лет`} */}
											</p>
										</div>
										<div className="flex gap-[12px]">
											<Button
												type="text"
												icon={<EditSvg />}
												onClick={() => {
													setExperienceToEdit(
														experienceData.experiences.find(
															expa => expa.id === exp.id
														)
													)
													navigate(
														'/services/jobseeker/vacancyview/respond/experience/edit'
													)
												}}
											/>
											<Button
												type="text"
												icon={<DeleteSvg />}
												onClick={() => {
													dispatch(deleteExperience(exp.id))
												}}
											/>
										</div>
									</div>
								))}
							</div>
							<div
								style={{ textAlign: 'center' }}
								className={`flex flex-col items-center ${
									haveNoExprience && 'opacity-50 pointer-events-none'
								}`}
							>
								<ConfigProvider
									theme={{
										components: {
											Button: {
												colorBgTextHover: '#ffffff',
												colorBgTextActive: '#ffffff'
											}
										}
									}}
								>
									<Button
										onClick={() => {
											navigate(
												'/services/jobseeker/vacancyview/respond/experience/add'
											)
										}}
										icon={<ButtonPlusIcon />}
										type="text"
									></Button>
								</ConfigProvider>
								<p className="mt-[5px] w-[94px] font-main-font font-normal text-[14px]/[18px] opacity-40">
									добавить место работы
								</p>
							</div>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/experience/add'
					) && (
						<Form
							layout="vertical"
							requiredMark={false}
							onFinish={values => {
								console.log(
									values.beginWork.$d.toLocaleDateString().split('.').join('-')
								)
								dispatch(
									addExperience({
										id: uuid(),
										experience: {
											workplace: values.workplace,
											seat: values.seat,
											duties: values.duties,
											beginWork: values.beginWork.$d
												.toLocaleDateString()
												.split('.')
												.join('-'),
											endWork: values.endWork.$d
												.toLocaleDateString()
												.split('.')
												.join('-')
										}
									})
								)
								navigate(
									'/services/jobseeker/vacancyview/respond/experience/main'
								)
							}}
						>
							<div className="flex items-center mb-[38px]">
								<button
									onClick={() => {
										navigate(
											'/services/jobseeker/vacancyview/respond/experience/main'
										)
									}}
									className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
								>
									<ArrowIcon />
								</button>
								<p className="ml-[15px] font-content-font font-bold text-black text-[18px]/[21.6px]">
									Добавить место работы
								</p>
							</div>
							<Form.Item
								name={'workplace'}
								rules={[{ required: true, message: 'Введите место работы' }]}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Место работы
									</label>
								}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
									disabled={haveNoExprience}
								></Input>
							</Form.Item>
							<Form.Item
								name={'seat'}
								rules={[{ required: true, message: 'Введите должность' }]}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Должность
									</label>
								}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
									disabled={haveNoExprience}
								></Input>
							</Form.Item>
							<div className="flex w-full">
								<Form.Item
									className="w-[50%]"
									name={'beginWork'}
									rules={[{ required: true, message: 'Укажите период работы' }]}
									label={
										<label className="text-black text-[18px]/[18px] font-content-font font-normal">
											Период работы
										</label>
									}
								>
									<DatePicker.MonthPicker
										className="w-full"
										disabled={haveNoExprience}
									/>
								</Form.Item>
								<Form.Item
									name={'endWork'}
									className="w-[50%] mt-auto"
									rules={[{ required: true, message: 'Укажите период работы' }]}
								>
									<DatePicker.MonthPicker
										className="w-full"
										disabled={haveNoExprience}
									/>
								</Form.Item>
							</div>
							<Form.Item
								name={'duties'}
								rules={[
									{ required: true, message: 'Укажите свои обязанности' }
								]}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Обязанности
									</label>
								}
							>
								<Input.TextArea
									autoSize={true}
									className="!h-[107px]"
									disabled={haveNoExprience}
								></Input.TextArea>
							</Form.Item>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/experience/edit'
					) && (
						<Form
							layout="vertical"
							requiredMark={false}
							initialValues={{
								workplace: experienceToEdit?.experience.workplace,
								beginWork: dayjs(
									experienceToEdit?.experience.beginWork,
									'DD.MM.YYYY'
								),
								endWork: dayjs(
									experienceToEdit?.experience.endWork,
									'DD.MM.YYYY'
								),
								seat: experienceToEdit?.experience.seat,
								duties: experienceToEdit?.experience.duties
							}}
							onFinish={values => {
								experienceToEdit !== undefined &&
									dispatch(
										alterExperience({
											id: experienceToEdit.id,
											workplace: values.workplace,
											beginWork: values.beginWork.$d
												.toLocaleDateString()
												.split('.')
												.join('-'),
											endWork: values.endWork.$d
												.toLocaleDateString()
												.split('.')
												.join('-'),
											seat: values.seat,
											duties: values.duties
										})
									)
								navigate(
									'/services/jobseeker/vacancyview/respond/experience/main'
								)
							}}
						>
							<div className="flex items-center mb-[38px]">
								<button
									onClick={() => {
										navigate(
											'/services/jobseeker/vacancyview/respond/experience/main'
										)
									}}
									className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
								>
									<ArrowIcon />
								</button>
								<p className="ml-[15px] font-content-font font-bold text-black text-[18px]/[21.6px]">
									Изменить место работы
								</p>
							</div>
							<Form.Item
								name={'workplace'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Место работы
									</label>
								}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
									disabled={haveNoExprience}
								></Input>
							</Form.Item>
							<Form.Item
								name={'seat'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Должность
									</label>
								}
							>
								<Input
									onPressEnter={e => {
										e.preventDefault()
									}}
									disabled={haveNoExprience}
								></Input>
							</Form.Item>
							<div className="flex w-full">
								<Form.Item
									className="w-[50%]"
									name={'beginWork'}
									rules={[{ required: true, message: 'Укажите период работы' }]}
									label={
										<label className="text-black text-[18px]/[18px] font-content-font font-normal">
											Период работы
										</label>
									}
								>
									<DatePicker.MonthPicker
										className="w-full"
										disabled={haveNoExprience}
									/>
								</Form.Item>
								<Form.Item
									name={'endWork'}
									className="w-[50%] mt-auto"
									rules={[{ required: true, message: 'Укажите период работы' }]}
								>
									<DatePicker.MonthPicker
										className="w-full"
										disabled={haveNoExprience}
									/>
								</Form.Item>
							</div>
							<Form.Item
								name={'duties'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Обязанности
									</label>
								}
							>
								<Input.TextArea
									autoSize={true}
									className="!h-[107px]"
									disabled={haveNoExprience}
								></Input.TextArea>
							</Form.Item>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)}
					{pathname.includes(
						'/services/jobseeker/vacancyview/respond/skills'
					) && (
						<Form
							layout="vertical"
							requiredMark={false}
							initialValues={{ details: skillsData.details }}
							onFinish={values => {
								dispatch(
									allSkillsData({
										skills: currentFormskills,
										details: values.details
									})
								)
								dispatch(completeSkills())
								navigate('services/jobseeker/vacancyview/respond/main')
							}}
						>
							<div className="flex items-center mb-[38px]">
								<button
									onClick={() => {
										navigate('/services/jobseeker/vacancyview/respond/main')
									}}
									className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
								>
									<ArrowIcon />
								</button>
								<p className="ml-[15px] font-content-font font-bold text-black text-[18px]/[21.6px]">
									Профессиональные навыки
								</p>
							</div>
							<Form.Item
								name={'skills'}
								rules={[
									{
										required: currentFormskills.length === 0,
										message: 'Введите свои навыки'
									}
								]}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Какими ключевыми навыками вы обладаете?
									</label>
								}
							>
								<Input
									placeholder='Например, "Прототипирование"'
									onChange={e => {
										setSkillInputValue(e.target.value)
									}}
									onPressEnter={e => {
										e.preventDefault()
										setcurrentFormSkills([
											...currentFormskills,
											skillInputValue
										])
										setSkillInputValue('')
									}}
									value={skillInputValue}
								/>
								{currentFormskills.map(skill => (
									<Tag
										closable={true}
										key={uuid()}
										// onClose={() => {
										// 	setcurrentFormSkills(
										// 		currentFormskills.filter(currentSkill => {
										// 			return currentSkill !== skill
										// 		})
										// 	)
										// }}
										onClose={() => {
											console.log(currentFormskills)
											setcurrentFormSkills(prev => [
												...prev.filter(currentSkill => currentSkill !== skill)
											])
											console.log(currentFormskills)
										}}
									>
										{skill}
									</Tag>
								))}
							</Form.Item>
							<Form.Item
								name={'details'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										О себе (необязательно)
									</label>
								}
							>
								<Input.TextArea
									autoSize={true}
									value={skillsData.details}
									className="!h-[107px]"
								/>
							</Form.Item>
							<Form.Item>
								<div style={{ textAlign: 'right', marginTop: 40 }}>
									<Button type="primary" htmlType="submit">
										Сохранить
									</Button>
								</div>
							</Form.Item>
						</Form>
					)}
				</Modal>
			</ConfigProvider>
		</>
	)
}
