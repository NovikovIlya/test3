import { useGetSupervisorVacancyQuery } from '../../../../../store/api/serviceApi'

import SupervisorVacancyItem from './SupervisorVacancyItem'

export const SupervisorVacancies = () => {
	const { data: vacancies = [] } = useGetSupervisorVacancyQuery()

	return (
		<>
			<div className="pl-[54px] pr-[54px] pt-[120px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Вакансии
				</h1>
				<div className="mt-[60px] ml-[20px] flex">
					<h3 className="w-[238px] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Должность
					</h3>
					<div className="ml-[30px] flex gap-[40px]">
						<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
							Опыт работы
						</h3>
						<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
							График работы
						</h3>
					</div>
					<h3 className="ml-[140px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Заработная плата
					</h3>
				</div>
				<div className="mt-[16px] mb-[50px] flex flex-col w-full gap-[10px]">
					{vacancies.map(vac => (
						<SupervisorVacancyItem {...vac} key={vac.id} />
					))}
				</div>
			</div>
		</>
	)
}
