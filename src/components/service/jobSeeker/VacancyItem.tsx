import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useLazyGetVacancyViewQuery } from '../../../store/api/serviceApi'
import { setCurrentVacancy } from '../../../store/reducers/CurrentVacancySlice'
import { VacancyItemType } from '../../../store/reducers/type'

export default function VacancyItem(props: VacancyItemType) {
	const [getVacancy, result] = useLazyGetVacancyViewQuery()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<div className="flex w-full bg-white pl-[20px] pr-[105px] pt-[20px] pb-[20px] items-center shadow-custom-shadow">
			<p className="w-[388px] shrink-0 font-content-font font-normal text-[16px]/[19px] text-black">
				{props.title}
			</p>
			<div className="ml-[30px] flex gap-[40px] justify-between">
				<p className="w-[104px] font-content-font font-normal text-[16px]/[19px] text-black whitespace-nowrap">
					{props.experience}
				</p>
				<p className="w-[104px] font-content-font font-normal text-[16px]/[19px] text-black whitespace-nowrap">
					{props.employment}
				</p>
			</div>
			<p className="ml-[140px] font-content-font font-normal text-[16px]/[19px] text-black">
				{props.salary}
			</p>
			<button
				className="ml-auto mb-[4px] bg-button-blue outline-none border-none hover:bg-button-blue-hover focus:border-[2px] focus:border-button-focus-border-blue font-content-font font-normal text-[16px]/[16px] text-white text-center w-[127px] h-[32px] pt-[8px] pb-[8px] pl-[24px] pr-[24px] rounded-[54px]"
				onClick={() => {
					getVacancy(props.id)
						.unwrap()
						.then(result => {
							dispatch(setCurrentVacancy(result))
							console.log(result)
							console.log(result.acf.responsibilities)
							navigate('/services/jobseeker/vacancyview')
						})
				}}
			>
				Подробнее
			</button>
		</div>
	)
}
