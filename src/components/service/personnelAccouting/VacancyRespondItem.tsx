import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useLazyGetRespondFullInfoQuery } from '../../../store/api/serviceApi'
import { setCurrentResponce } from '../../../store/reducers/CurrentResponceSlice'
import {
	VacancyRespondItemType,
	respondStatus
} from '../../../store/reducers/type'

export const VacancyRespondItem = (
	props: VacancyRespondItemType & {
		itemType: 'PERSONNEL_DEPARTMENT' | 'SUPERVISOR'
	}
) => {
	const [getResponceInfo] = useLazyGetRespondFullInfoQuery()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<>
			<div className="w-full mb-[12px] flex items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p className="w-[25%]">
					{props.userData
						? props.userData.lastname +
						  ' ' +
						  props.userData.firstname +
						  ' ' +
						  props.userData.middlename
						: 'Толстой Лев Николаевич'}
				</p>
				{props.itemType === 'PERSONNEL_DEPARTMENT' ? (
					<>
						<p className="ml-[10%] w-[8%]">
							{props.responseDate.split('-').reverse().join('.')}
						</p>
						<p className="ml-[1%] w-[25%]">
							{props.status ===
							respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
								? 'на рассмотрении у отдела кадров'
								: props.status ===
								  respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]
								? 'на рассмотрении у руководителя'
								: props.status === respondStatus[respondStatus.INVITATION]
								? 'приглашение'
								: props.status === respondStatus[respondStatus.REJECTED]
								? 'отклонено'
								: 'на рассмотрении'}
						</p>
					</>
				) : (
					<>
						<p className="ml-[5%] w-[25%]">{props.vacancyName}</p>
						<p className="ml-[5%] w-[8%]">
							{props.responseDate.split('-').reverse().join('.')}
						</p>
					</>
				)}
				<Button
					onClick={() => {
						dispatch(setCurrentResponce(props.id))
						props.itemType === 'PERSONNEL_DEPARTMENT'
							? navigate(`services/personnelaccounting/responds/fullinfo`)
							: navigate(
									'services/personnelaccounting/supervisor/responds/fullinfo'
							  )
					}}
					className="ml-[10%] max-w-[15%] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
			</div>
		</>
	)
}
