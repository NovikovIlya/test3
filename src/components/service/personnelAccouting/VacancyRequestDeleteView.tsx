import { Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	useAcceptDeleteVacancyRequestMutation,
	useGetVacancyRequestsQuery
} from '../../../store/api/serviceApi'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyRequestDeleteView = () => {
	const { currentVacancy } = useAppSelector(state => state.currentVacancy)
	const { requestId } = useAppSelector(state => state.currentRequest)

	const navigate = useNavigate()
	const [acceptRequest] = useAcceptDeleteVacancyRequestMutation()

	const { refetch } = useGetVacancyRequestsQuery('все')

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

	return (
		<>
			<div
				id="wrapper"
				className="pl-[54px] pr-[54px] pt-[120px] pb-[52px] w-full"
			>
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/vacancyrequests')
						}}
						className="bg-inherit h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{currentVacancy !== null ? currentVacancy.title.rendered : ''}
					</p>
				</div>
				<div className="w-[50%] mt-[80px] flex flex-col gap-[40px]">
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
					<Button
						onClick={() => {
							acceptRequest(requestId)
								.unwrap()
								.then(() => {
									refetch()
								})
								.then(() => {
									navigate('/services/personnelaccounting/vacancyrequests')
								})
						}}
						type="primary"
						className="rounded-[54.5px] w-[121px]"
					>
						Удалить
					</Button>
				</div>
			</div>
		</>
	)
}
