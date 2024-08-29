import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setCurrentVacancyName } from '../../../store/reducers/CurrentVacancyNameSlice'
import { VacancyGroupedResponcesType } from '../../../store/reducers/type'

export const RespondItem = ({
	vacancyId,
	vacancyTitle,
	respondsCount
}: VacancyGroupedResponcesType) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<div className="w-full mb-[12px] flex items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
			<p className="w-[35%]">{vacancyTitle}</p>
			<p className="ml-[17%] w-[12%]">{respondsCount}</p>
			<Button
				onClick={() => {
					dispatch(setCurrentVacancyName(vacancyTitle))
					navigate(
						`/services/personnelaccounting/responds/byvacancy/${vacancyId}`
					)
				}}
				className="ml-[15%] max-w-[15%] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
			>
				Посмотреть
			</Button>
		</div>
	)
}
