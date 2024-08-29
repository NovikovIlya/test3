import { Select } from 'antd'
import { useState } from 'react'

import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useGetVacancyGroupedResponcesQuery
} from '../../../store/api/serviceApi'

import { RespondItem } from './RespondItem'

export const Responds = () => {
	const [categoryTitle, setCategoryTitle] = useState('АУП')
	const [directoryTitle, setDirectoryTitle] = useState('Все')
	const [subdivisionTitle, setSubdivisionTitle] = useState('')
	const [secondOption, setSecondOption] = useState<string | null>('Все')
	const { data: categories = [], isLoading: isCategoriesLoading } =
		useGetCategoriesQuery()
	const { data: directions = [], isLoading: isDirectionsLoading } =
		useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [], isLoading: isSubdivisionsLoading } =
		useGetSubdivisionsQuery(categoryTitle)
	const { data: responds = [] } = useGetVacancyGroupedResponcesQuery(
		directoryTitle === 'Все'
			? { category: categoryTitle, role: 'PERSONNEL_DEPARTMENT' }
			: {
					category: categoryTitle,
					direction: directoryTitle,
					role: 'PERSONNEL_DEPARTMENT'
			  }
	)

	return (
		<>
			<div
				id="wrapper"
				className="pl-[54px] pr-[54px] pt-[60px] w-full bg-content-gray mt-[60px]"
			>
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Отклики
				</h1>
				<h2 className="mt-[52px] font-content-font font-normal text-[18px]/[18px] text-black">
					Категория сотрудников
				</h2>
				<Select
					className="mt-[16px]"
					style={{ width: 622 }}
					options={categories.map(category => ({
						value: category.title,
						label: category.title
					}))}
					defaultValue={'АУП'}
					onChange={(value: string) => {
						;(() => {
							setCategoryTitle(value)
							setDirectoryTitle('')
							setSubdivisionTitle('')
							setSecondOption(null)
						})()
					}}
					placeholder={!isCategoriesLoading && 'Выбрать'}
					loading={isCategoriesLoading}
					disabled={isCategoriesLoading}
				/>
				<h2 className="mt-[36px] font-content-font font-normal text-[18px]/[18px] text-black">
					{categories.find(category => category.title === categoryTitle)
						?.direction
						? 'Профобласть'
						: 'Подразделение'}
				</h2>
				<Select
					className="mt-[16px]"
					style={{ width: 622 }}
					options={
						categories.find(category => category.title === categoryTitle)
							?.direction
							? [
									{ value: 'Все', label: 'Все' },
									...directions.map(dir => ({
										value: dir.title,
										label: dir.title
									}))
							  ]
							: subdivisions.map(sub => ({
									value: sub.title,
									label: sub.title
							  }))
					}
					defaultValue={'Все'}
					onChange={(value: string) => {
						categories.find(category => category.title === categoryTitle)
							?.direction
							? (() => {
									setDirectoryTitle(value)
									setSecondOption(value)
							  })()
							: (() => {
									setSubdivisionTitle(value)
									setSecondOption(value)
							  })()
					}}
					placeholder={
						!isDirectionsLoading && !isSubdivisionsLoading && 'Выбрать'
					}
					loading={
						categoryTitle === ''
							? false
							: isDirectionsLoading || isSubdivisionsLoading
					}
					disabled={
						categoryTitle === ''
							? true
							: isDirectionsLoading || isSubdivisionsLoading
					}
					value={secondOption}
				/>
				<div className="flex items-center mt-[60px] mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[35%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>
					<h3 className="ml-[17%] w-[12%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Кол-во откликов
					</h3>
				</div>
				{responds.map(resp => (
					<RespondItem {...resp} />
				))}
			</div>
		</>
	)
}
