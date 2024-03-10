import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

import { BriefcaseSvg } from '../../../assets/svg/BriefcaseSvg'
import CalendarSvg from '../../../assets/svg/CalendarSvg'
import { MyDocsSvg } from '../../../assets/svg/MyDocsSvg'

import { Chat } from './Chat'
import { Employment } from './Employment'
import { MyResponds } from './MyResponds'

export const NavMyResponds = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const handleNavigate = (url: string) => {
		navigate(url)
	}

	const navList = [
		{
			id: '/services/myresponds/responds',
			icon: <BriefcaseSvg />,
			name: 'Мои отклики'
		},
		{
			id: '/services/myresponds/chat',
			icon: <MyDocsSvg />,
			name: 'Сообщения'
		},
		{
			id: '/services/myresponds/employment',
			icon: <CalendarSvg />,
			name: 'Этап трудоустройства'
		}
	]

	const handleList = navList.map(({ id, icon, name }, index) => {
		return (
			<li
				key={index}
				className={clsx(
					'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
					id === pathname && 'bg-[#F5F8FB]'
				)}
				onClick={() => handleNavigate(id)}
			>
				<div className="flex items-center gap-[10px]">
					{icon}
					<p className="text-base">{name}</p>
				</div>
			</li>
		)
	})

	return (
		<>
			<div className="shadowNav">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4 ">
					{handleList}
				</ul>
			</div>
			<div className="bg-[#F5F8FB] flex w-full">
				{pathname === navList[0].id && <MyResponds />}
				{pathname === navList[1].id && <Chat />}
				{pathname === navList[2].id && <Employment />}
			</div>
		</>
	)
}
