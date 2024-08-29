import { Button, ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { DeleteSvg } from '../../../../../assets/svg/DeleteSvg'
import {
	useLazyGetVacancyViewQuery,
	useRequestDeleteVacancyMutation
} from '../../../../../store/api/serviceApi'
import { setCurrentVacancy } from '../../../../../store/reducers/CurrentVacancySlice'
import { VacancyItemType } from '../../../../../store/reducers/type'

export default function VacancyItem(props: VacancyItemType) {
	const [getVacancy, result] = useLazyGetVacancyViewQuery()
	const navigate = useNavigate()
	const [isModalOpen, setModalOpen] = useState(false)
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const dispatch = useDispatch()

	const [requestDeleteVacancy] = useRequestDeleteVacancyMutation()

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					bodyStyle={{ padding: 53 }}
					centered
					open={isSuccessModalOpen}
					onCancel={() => {
						setIsSuccessModalOpen(false)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
						Ваша заявка успешно отправлена. Вакансия будет удалена после
						рассмотрения заявки кадрами.
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto mr-auto"
							type="primary"
							onClick={() => {
								setIsSuccessModalOpen(false)
							}}
						>
							ОК
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
					bodyStyle={{ padding: 53 }}
					centered
					open={isModalOpen}
					onCancel={() => {
						setModalOpen(false)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
						Вы действительно хотите удалить вакансию?
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto"
							onClick={() => {
								setModalOpen(false)
							}}
						>
							Отменить
						</Button>
						<Button
							type="primary"
							className="rounded-[54.5px] mr-auto"
							onClick={() => {
								requestDeleteVacancy(props.id)
									.unwrap()
									.then(() => {
										setModalOpen(false)
										setIsSuccessModalOpen(true)
									})
							}}
						>
							Удалить
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="flex w-full bg-white pl-[20px] pr-[55px] pt-[20px] pb-[20px] items-center shadow-custom-shadow">
				<p className="w-[238px] shrink-0 font-content-font font-normal text-[16px]/[19px] text-black">
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
				<p className="ml-[140px] w-[150px] font-content-font font-normal text-[16px]/[19px] text-black">
					{props.salary}
				</p>
				<Button
					onClick={() => {
						getVacancy(props.id)
							.unwrap()
							.then(result => {
								dispatch(setCurrentVacancy(result))
								console.log(result)
								console.log(result.acf.responsibilities)
								navigate('/services/personnelaccounting/supervisor/vacancyview')
							})
					}}
					className="ml-[60px] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
				<Button
					className="ml-[90px]"
					onClick={() => {
						setModalOpen(true)
					}}
					type="text"
					icon={<DeleteSvg />}
				/>
			</div>
		</>
	)
}
