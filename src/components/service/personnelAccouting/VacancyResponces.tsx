import { Radio, Select } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import { useGetResponcesByVacancyQuery } from '../../../store/api/serviceApi'
import { respondStatus } from '../../../store/reducers/type'
import ArrowIcon from '../jobSeeker/ArrowIcon'

import { VacancyRespondItem } from './VacancyRespondItem'

export const VacancyResponces = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const currentVacancyTitle = useAppSelector(state => state.currentVacancyName)

	const pathVacancyId = pathname.split('/').pop() as string

	const vacancyId = parseInt(pathVacancyId)

	const [status, setStatus] = useState('все')
	const { data: responds = [] } = useGetResponcesByVacancyQuery({
		id: vacancyId,
		status: status,
		role: 'PERSONNEL_DEPARTMENT'
	})

	return (
		<>
			<div className="w-full pl-[52px] pr-[52px] pt-[60px] mt-[60px]">
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/responds')
						}}
						className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						Отклики на вакансию «{currentVacancyTitle.vacancyTitle}»
					</p>
				</div>
				<div className="mt-[52px] mb-[60px] flex items-center gap-[16px]">
					<Radio.Group
						className="flex flex-wrap gap-[12px]"
						value={status}
						onChange={e => {
							setStatus(e.target.value)
							console.log(status)
						}}
					>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === 'все'
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={'все'} className="hidden"></Radio>
							все
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === respondStatus[respondStatus.IN_REVIEW]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={respondStatus[respondStatus.IN_REVIEW]}
								className="hidden"
							></Radio>
							на рассмотрении
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === respondStatus[respondStatus.EMPLOYMENT_REQUEST]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={respondStatus[respondStatus.EMPLOYMENT_REQUEST]}
								className="hidden"
							></Radio>
							этап трудоустройства
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]}
								className="hidden"
							></Radio>
							на рассмотрении у руководителя
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === respondStatus[respondStatus.INVITATION]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={respondStatus[respondStatus.INVITATION]}
								className="hidden"
							></Radio>
							приглашение на собеседование
						</label>
					</Radio.Group>
				</div>
				<div className="flex mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						ФИО
					</h3>

					<h3 className="ml-[10%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
					<h3 className="ml-[1%] w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Статус
					</h3>
				</div>
				{responds.map(respond => (
					<VacancyRespondItem {...respond} itemType="PERSONNEL_DEPARTMENT" />
				))}
			</div>
		</>
	)
}
