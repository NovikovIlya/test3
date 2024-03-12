import { Select } from 'antd'
import { useState } from 'react'

import { useGetSeekerRespondsQuery } from '../../../store/api/serviceApi'
import { respondStatus } from '../../../store/type'

import { RespondItem } from './RespondItem'

export const MyResponds = () => {
	const [status, setStatus] = useState('')
	const { data: responds = [], refetch } = useGetSeekerRespondsQuery(status)

	return (
		<>
			<div className="w-full pl-[52px] pr-[52px] pt-[60px]">
				<h1 className="font-content-font font-normal text-black text-[28px]/[28px]">
					Мои отклики
				</h1>
				<div className="mt-[52px] mb-[60px] flex items-center gap-[16px]">
					<p className="font-content-font font-normal text-black text-[16px]/[16px]">
						Статус
					</p>
					<Select
						className="w-[301px]"
						options={[
							{ value: 'all', label: 'все' },
							{
								value: respondStatus.IN_PERSONNEL_DEPT_REVIEW,
								label: 'на рассмотрении у отдела кадров'
							},
							{
								value: respondStatus.IN_SUPERVISOR_REVIEW,
								label: 'на рассмотрении у руководителя'
							},
							{ value: respondStatus.INVITATION, label: 'приглашение' },
							{ value: respondStatus.REJECTED, label: 'отклонено' }
						]}
						onChange={(value: respondStatus) => {
							setStatus(respondStatus[value])
						}}
					/>
				</div>
				<div className="flex mb-[16px] pl-[20px]">
					<h3 className="font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>
					<h3 className="ml-[245px] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
					<h3 className="ml-[105px] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Статус
					</h3>
				</div>
				{responds.map(respond => (
					<RespondItem {...respond} refetch={refetch} />
				))}
			</div>
		</>
	)
}
