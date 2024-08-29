import { Radio, Select } from 'antd'
import { useState } from 'react'

import { useGetSeekerRespondsQuery } from '../../../store/api/serviceApi'
import { respondStatus } from '../../../store/reducers/type'

import { RespondItem } from './RespondItem'

export const MyResponds = () => {
	const [status, setStatus] = useState('все')
	const { data: responds = [], refetch } = useGetSeekerRespondsQuery(status)

	return (
		<>
			<div className="mt-[120px] pl-[52px] w-full">
				<h1 className="font-content-font font-normal text-black text-[28px]/[28px]">
					Мои отклики
				</h1>
				<div className="mt-[52px] mb-[40px] flex items-center gap-[16px]">
					<Radio.Group
						className="flex gap-[8px]"
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
						{/* <label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === respondStatus[respondStatus.ARCHIVE]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={respondStatus[respondStatus.ARCHIVE]}
								className="hidden"
							></Radio>
							архив
						</label> */}
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === respondStatus[respondStatus.IN_RESERVE]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={respondStatus[respondStatus.IN_RESERVE]}
								className="hidden"
							></Radio>
							отказано
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
								status === respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]}
								className="hidden"
							></Radio>
							на рассмотрении у HR
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
					</Radio.Group>
				</div>
				<div className="w-full flex mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>
					<h3 className="ml-[5%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
					<h3 className="ml-[2%] w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Статус
					</h3>
				</div>
				{responds.map(respond => (
					<RespondItem key={respond.id} {...respond} refetch={refetch} />
				))}
			</div>
		</>
	)
}
