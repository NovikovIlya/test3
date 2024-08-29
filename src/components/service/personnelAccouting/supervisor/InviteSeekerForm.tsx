import {
	Button,
	ConfigProvider,
	DatePicker,
	Form,
	Input,
	Modal,
	Select
} from 'antd'
import { useState } from 'react'
import uuid from 'react-uuid'

import { useInviteSeekerMutation } from '../../../../store/api/serviceApi'

export const InviteSeekerForm = (props: { respondId: number }) => {
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)

	const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
	const [format, setFormat] = useState<'OFFLINE' | 'ONLINE'>('OFFLINE')
	const [reservedTime, setReservedTimes] = useState<
		{ id: string; time: string; timeToSend: any }[]
	>([])

	const [inviteSeeker] = useInviteSeekerMutation()

	const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)
	const [resultModalText, setResultModalText] = useState<string>('')

	return (
		<>
			<Button
				onClick={() => {
					setIsFormOpen(true)
				}}
				disabled={isButtonDisabled}
				type="primary"
				className="font-content-font font-normal text-white text-[16px]/[16px] rounded-[54.5px] w-[257px] h-[40px] py-[8px] px-[24px]"
			>
				Пригласить на собеседование
			</Button>
			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					bodyStyle={{
						padding: '26px'
					}}
					width={407}
					className="pr-[52px] pl-[52px] pb-[52px]"
					open={isResultModalOpen}
					title={null}
					footer={null}
					centered
					onCancel={() => {
						setIsResultModalOpen(false)
					}}
				>
					<p className="text-center font-content-font text-black text-[16px]/[20px] font-normal">
						{resultModalText}
					</p>
					<Button
						className="rounded-[40px] w-full !py-[13px] mt-[40px]"
						type="primary"
						onClick={() => {
							setIsResultModalOpen(false)
						}}
					>
						Ок
					</Button>
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
					bodyStyle={{
						padding: '26px'
					}}
					width={622}
					className="pr-[52px] pl-[52px] pb-[52px]"
					open={isFormOpen}
					title={null}
					footer={null}
					onCancel={() => {
						setIsFormOpen(false)
					}}
				>
					<Form
						layout="vertical"
						requiredMark={false}
						onFinish={values => {
							console.log(
								values.mainTime.$y +
									'-' +
									(values.mainTime.$M + 1 >= 10
										? values.mainTime.$M + 1
										: '0' + (values.mainTime.$M + 1)) +
									'-' +
									values.mainTime.$D +
									'T' +
									values.mainTime.$H +
									':' +
									(values.mainTime.$m >= 10
										? values.mainTime.$m
										: '0' + values.mainTime.$m) +
									':' +
									(values.mainTime.$s >= 10
										? values.mainTime.$s
										: '0' + values.mainTime.$s) +
									'.020Z'
							)
							inviteSeeker({
								respondId: props.respondId,
								format: values.format,
								mainTime:
									values.mainTime.$y +
									'-' +
									(values.mainTime.$M + 1 >= 10
										? values.mainTime.$M + 1
										: '0' + (values.mainTime.$M + 1)) +
									'-' +
									(values.mainTime.$D >= 10
										? values.mainTime.$D
										: '0' + values.mainTime.$D) +
									'T' +
									values.mainTime.$H +
									':' +
									(values.mainTime.$m >= 10
										? values.mainTime.$m
										: '0' + values.mainTime.$m) +
									':' +
									(values.mainTime.$s >= 10
										? values.mainTime.$s
										: '0' + values.mainTime.$s) +
									'.020Z',
								reservedTimes:
									// reservedTime[0].timeToSend.$y +
									// '-' +
									// (reservedTime[0].timeToSend.$M + 1 >= 10
									// 	? reservedTime[0].timeToSend.$M + 1
									// 	: '0' + (reservedTime[0].timeToSend.$M + 1)) +
									// '-' +
									// (reservedTime[0].timeToSend.$D >= 10
									// 	? reservedTime[0].timeToSend.$D
									// 	: '0' + reservedTime[0].timeToSend.$D) +
									// 'T' +
									// reservedTime[0].timeToSend.$H +
									// ':' +
									// (reservedTime[0].timeToSend.$m >= 10
									// 	? reservedTime[0].timeToSend.$m
									// 	: '0' + reservedTime[0].timeToSend.$m) +
									// ':' +
									// (reservedTime[0].timeToSend.$s >= 10
									// 	? reservedTime[0].timeToSend.$s
									// 	: '0' + reservedTime[0].timeToSend.$s) +
									// '.020Z',
									// ['2024-05-17T13:40:00+03:00'],
									reservedTime.map(
										reserve =>
											reserve.timeToSend.$y +
											'-' +
											(reserve.timeToSend.$M + 1 >= 10
												? reserve.timeToSend.$M + 1
												: '0' + (reserve.timeToSend.$M + 1)) +
											'-' +
											(reserve.timeToSend.$D >= 10
												? reserve.timeToSend.$D
												: '0' + reserve.timeToSend.$D) +
											'T' +
											reserve.timeToSend.$H +
											':' +
											(reserve.timeToSend.$m >= 10
												? reserve.timeToSend.$m
												: '0' + reserve.timeToSend.$m) +
											':' +
											(reserve.timeToSend.$s >= 10
												? reserve.timeToSend.$s
												: '0' + reserve.timeToSend.$s) +
											'.020Z'
									),
								additionalInfo:
									format === 'OFFLINE' ? values.details : undefined
							})
								.unwrap()
								.then(() => {
									setIsFormOpen(false)
									setResultModalText('Приглашение успешно отправлено')
									setIsResultModalOpen(true)
									setIsButtonDisabled(true)
								})
								.catch(error => {
									try {
										setResultModalText(error.data.errors[0].message as string)
									} catch (err) {
										setResultModalText(
											'Что-то пошло не так, приносим извинения за неудобства'
										)
									}
									setIsFormOpen(false)
									setIsResultModalOpen(true)
								})
						}}
					>
						<Form.Item
							name={'format'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal">
									Формат собеседования
								</label>
							}
							rules={[{ required: true, message: 'Не выбран формат' }]}
						>
							<Select
								placeholder="Выбрать"
								onChange={e => {
									setFormat(e)
								}}
								options={[
									{ value: 'OFFLINE', label: 'Оффлайн' },
									{ value: 'ONLINE', label: 'Онлайн' }
								]}
							></Select>
						</Form.Item>
						<Form.Item
							name={'mainTime'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal">
									Дата и время
								</label>
							}
							rules={[{ required: true, message: 'Не выбрано основное время' }]}
						>
							<DatePicker
								format={'DD.MM.YYYY, h:mm'}
								showTime={{
									minuteStep: 15,
									disabledHours: () => {
										return [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23]
									},
									hideDisabledOptions: true
								}}
								className="w-full"
								onChange={(e, dateString) => {
									console.log(e)
									console.log(dateString)
								}}
							></DatePicker>
						</Form.Item>
						<p className="mt-[40px] mb-[24px] font-content-font font-normal text-[16px]/[16px] text-black">
							Выберете резервное время для собеседования, если кандидат не
							сможет в основное
						</p>
						<Form.Item
							name={'reserveTime'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal">
									Дата и время
								</label>
							}
							rules={[
								{
									required: reservedTime.length === 0,
									message: 'Не выбрано резервное время'
								}
							]}
						>
							<DatePicker
								format={'DD.MM.YYYY, h:mm'}
								showTime={{
									minuteStep: 15,
									disabledHours: () => {
										return [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23]
									},
									hideDisabledOptions: true
								}}
								className="w-full"
								onChange={(e, dateString) => {
									setReservedTimes([
										...reservedTime,
										{ id: uuid(), time: dateString as string, timeToSend: e }
									])
								}}
							></DatePicker>
							<ul className="mt-[24px] ml-[20px]">
								{reservedTime.map(res => (
									<li>
										<div className="flex gap-[60px]">
											<p className="w-[140px]">{res.time}</p>
											<label
												className="cursor-pointer underline text-black font-content-font font-normal text-[16px]/[16px] opacity-40"
												onClick={() => {
													setReservedTimes(prev =>
														reservedTime.filter(
															delTime => delTime.id !== res.id
														)
													)
												}}
											>
												Удалить
											</label>
										</div>
									</li>
								))}
							</ul>
						</Form.Item>
						{format === 'OFFLINE' && (
							<Form.Item
								name={'details'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Адрес и дополнительная информация
									</label>
								}
							>
								<Input.TextArea
									autoSize
									className="!h-[107px]"
								></Input.TextArea>
							</Form.Item>
						)}
						<Form.Item>
							<div style={{ textAlign: 'right', marginTop: 40 }}>
								<Button type="primary" htmlType="submit">
									Пригласить
								</Button>
							</div>
						</Form.Item>
					</Form>
				</Modal>
			</ConfigProvider>
		</>
	)
}
