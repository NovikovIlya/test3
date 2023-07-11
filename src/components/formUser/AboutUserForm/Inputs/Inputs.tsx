import { DatePicker, Input, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import clsx from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useDispatch } from 'react-redux';



import { useAppSelector } from '../../../../store';
import { birthDaySuccess, countrySuccess, nameSuccess, patronymicSuccess, phoneNumberSuccess, surNameSuccess } from '../../../../store/reducers/FormReducers/FormReducer';


export const Inputs = ({ error }: { error: boolean }) => {
	dayjs.locale('ru')
	const dispatch = useDispatch()
	const data = useAppSelector(state => state.Form)

	return (
		<div>
			<span className="text-sm">Фамилия</span>
			<Input
				id="surName"
				size="large"
				type="text"
				placeholder="Фамилия"
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && !data.surName && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(surNameSuccess(e.target.value))
				}}
				value={data.surName}
			/>

			<span className="text-sm">Имя</span>
			<Input
				size="large"
				type="text"
				placeholder="Имя"
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && !data.name && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(nameSuccess(e.target.value))
				}}
				value={data.name}
			/>

			<span className="text-sm">Отчество</span>
			<Input
				size="large"
				type="text"
				placeholder="Отчество"
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && !data.patronymic && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(patronymicSuccess(e.target.value))
				}}
				value={data.patronymic !== null ? data.patronymic : ''}
			/>

			<span className="text-sm">Дата рождения</span>
			<DatePicker
				className={clsx(
					'block mt-2 mb-4 shadow transition-all duration-500',
					error && !data.birthDay && 'border-rose-500'
				)}
				locale={locale}
				size="large"
				format={'DD.MM.YYYY'}
				onChange={e => {
					if (e != null) {
						dispatch(birthDaySuccess(e.format('DD.MM.YYYY')))
					}
				}}
				value={
					data.birthDay !== null ? dayjs(data.birthDay, 'DD.MM.YYYY') : null
				}
			/>
			<span className="text-sm">Страна гражданина</span>
			<Select
				className="block mt-2 mb-4 shadow transition-all duration-500"
				size="large"
				onChange={e => {
					dispatch(countrySuccess(e))
				}}
				defaultValue={data.country}
				options={[
					{ value: 'Российская Федерация' },
					{ value: 'Бангладеш' },
					{ value: 'Ботсвана' },
					{ value: 'Белиз' },
					{ value: 'Бруней' }
				]}
			/>

			<span className="text-sm">Телефон</span>
			<Input
				size="large"
				type="text"
				maxLength={11}
				placeholder="Телефон"
				className={clsx(
					'mt-2 mb-4 shadow transition-all duration-500',
					error && !data.name && 'border-rose-500'
				)}
				onChange={e => {
					dispatch(phoneNumberSuccess(e.target.value))
				}}
				value={data.phoneNumber}
			/>
		</div>
	)
}