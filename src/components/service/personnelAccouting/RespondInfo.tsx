import { Button, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Margin, usePDF } from 'react-to-pdf'
import uuid from 'react-uuid'

import { AvatartandardSvg } from '../../../assets/svg/AvatarStandardSvg'
import { RespondDownload } from '../../../assets/svg/RespondDownload'
import { useAppSelector } from '../../../store'
import {
	useApproveRespondMutation,
	useGetRespondFullInfoQuery,
	useLazyGetRespondFullInfoQuery,
	useSendRespondToArchiveMutation,
	useSendRespondToReserveMutation
} from '../../../store/api/serviceApi'
import ArrowIcon from '../jobSeeker/ArrowIcon'

import { InviteSeekerForm } from './supervisor/InviteSeekerForm'

export const RespondInfo = (props: {
	type: 'PERSONNEL_DEPARTMENT' | 'SUPERVISOR' | 'SEEKER'
}) => {
	const respondId = useAppSelector(state => state.currentResponce)

	const { data: res } = useGetRespondFullInfoQuery(respondId.respondId)
	const [approveRespond] = useApproveRespondMutation()
	const [sendToArchive] = useSendRespondToArchiveMutation()
	const [sendToReserve] = useSendRespondToReserveMutation()

	const [isRespondSentToSupervisor, setIsRespondSentToSupervisor] =
		useState<boolean>(res?.status === 'IN_SUPERVISOR_REVIEW')
	const [isRespondSentToArchive, setIsRespondSentToArchive] = useState<boolean>(
		res?.status === 'ARCHIVE'
	)
	const [isRespondSentToReserve, setIsRespondSentToReserve] = useState<boolean>(
		res?.status === 'IN_RESERVE'
	)
	const [isRespondInvited, setIsRespondInvited] = useState<boolean>(
		res?.status === 'INVITATION'
	)
	const [isRespondEmployed, setIsRespondEmployed] = useState<boolean>(
		res?.status === 'EMPLOYMENT_REQUEST'
	)

	useEffect(() => {
		setIsRespondSentToSupervisor(
			res?.status === 'IN_SUPERVISOR_REVIEW' ||
				res?.status === 'INVITATION' ||
				res?.status === 'EMPLOYMENT_REQUEST'
		)
		setIsRespondSentToArchive(res?.status === 'ARCHIVE')
		setIsRespondSentToReserve(res?.status === 'IN_RESERVE')
		setIsRespondInvited(res?.status === 'INVITATION')
		setIsRespondEmployed(res?.status === 'EMPLOYMENT_REQUEST')
	}, [res])

	const navigate = useNavigate()

	const { toPDF, targetRef } = usePDF({
		filename:
			res?.userData?.lastname +
			' ' +
			res?.userData?.firstname +
			' ' +
			res?.userData?.middlename,
		page: {
			margin: Margin.SMALL
		}
	})

	if (res === undefined) {
		return <></>
	} else {
		return (
			<>
				<div className="pl-[52px] pr-[10%] py-[60px] mt-[60px] w-full">
					<div>
						<Button
							onClick={() => {
								props.type === 'PERSONNEL_DEPARTMENT'
									? navigate('/services/personnelaccounting/responds')
									: props.type === 'SUPERVISOR'
									? navigate(
											'/services/personnelaccounting/supervisor/responds'
									  )
									: navigate('/services/myresponds/responds')
							}}
							className="bg-inherit h-[38px] w-[99px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer font-normal text-black text-[16px]/[16px] flex gap-[8px]"
						>
							<ArrowIcon />
							Назад
						</Button>
					</div>
					<div className="mt-[52px] flex flex-col gap-[36px]" ref={targetRef}>
						<div className="flex flex-wrap gap-[150px]">
							<div className="flex gap-[20px]">
								<div className="flex h-[167px] w-[167px] bg-[#D9D9D9]">
									<AvatartandardSvg />
								</div>
								<div className="flex flex-col gap-[8px]">
									<p className="font-content-font font-normal text-black text-[24px]/[28.8px]">
										{res?.userData?.lastname +
											' ' +
											res?.userData?.firstname +
											' ' +
											res?.userData?.middlename}
									</p>
									<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
										Мужчина, 21 год
									</p>
									<div className="flex gap-[36px]">
										<div className="flex flex-col gap-[8px]">
											<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
												Дата рождения
											</p>
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												16.05.2002
											</p>
										</div>
										<div className="flex flex-col gap-[8px]">
											<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
												Страна гражданства
											</p>
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												РФ
											</p>
										</div>
									</div>
									<div className="flex flex-col gap-[8px]">
										<p className="font-content-font font-normal text-black text-[12px]/[14.4x] opacity-40">
											Контакты:
										</p>
										<div className="flex gap-[24px]">
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												{res?.userData?.phone}
											</p>
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												{res?.userData?.email}
											</p>
										</div>
									</div>
								</div>
							</div>
							{props.type === 'PERSONNEL_DEPARTMENT' && (
								<div className="self-center grid grid-cols-2 grid-rows-[40px_40px_40px] gap-x-[12px] gap-y-[12px]">
									<Button
										onClick={() => {
											approveRespond(respondId.respondId)
												.unwrap()
												.then(() => {
													setIsRespondSentToSupervisor(true)
												})
										}}
										disabled={isRespondSentToSupervisor}
										type="primary"
										className="font-content-font font-normal text-white text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px]"
									>
										Отправить руководителю
									</Button>
									<Button
										onClick={() => {
											sendToArchive({
												id: respondId.respondId,
												role: 'PERSONNEL_DEPARTMENT'
											})
												.unwrap()
												.then(() => {
													setIsRespondSentToArchive(true)
												})
										}}
										disabled={
											isRespondSentToArchive || isRespondSentToSupervisor
										}
										className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
									>
										Отказать
									</Button>
									<Button
										disabled={
											isRespondSentToReserve || isRespondSentToSupervisor
										}
										onClick={() => {
											sendToReserve(respondId.respondId)
												.unwrap()
												.then(() => {
													setIsRespondSentToReserve(true)
												})
										}}
										className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
									>
										Отправить в резерв
									</Button>
									<Button
										onClick={() => {}}
										className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
									>
										Перейти в чат
									</Button>
									<Button
										onClick={() => toPDF()}
										className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[224px] h-[40px] py-[8px] px-[24px] border-black"
									>
										<RespondDownload /> Скачать
									</Button>
								</div>
							)}
							{props.type === 'SUPERVISOR' && (
								<div className="self-center grid grid-cols-1 grid-rows-[40px_40px_40px] gap-y-[12px]">
									<InviteSeekerForm respondId={respondId.respondId} />
									<Button
										disabled={
											isRespondSentToArchive ||
											isRespondInvited ||
											isRespondEmployed
										}
										onClick={() => {
											sendToArchive({
												id: respondId.respondId,
												role: 'SUPERVISOR'
											})
												.unwrap()
												.then(() => {
													setIsRespondSentToArchive(true)
												})
										}}
										className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[257px] h-[40px] py-[8px] px-[24px] border-black"
									>
										Отказать
									</Button>
									<Button
										onClick={() => toPDF()}
										className="bg-inherit font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] w-[257px] h-[40px] py-[8px] px-[24px] border-black"
									>
										<RespondDownload /> Скачать
									</Button>
								</div>
							)}
						</div>
						<hr />
						<div className="flex flex-col gap-[24px]">
							<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">
								Сопроводительное письмо
							</p>
							<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
								{res.respondData.coverLetter}
							</p>
						</div>
						<hr />
						<div className="flex flex-col gap-[24px]">
							<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">
								Опыт работы
							</p>
							<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
								{res.respondData.portfolio.workExperiences.map(exp => (
									<>
										<div className="flex flex-col gap-[4px]">
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												{exp.beginWork.substring(0, 4)}-
												{exp.endWork.substring(0, 4)}
											</p>
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												{parseInt(exp.endWork.substring(0, 4)) -
													parseInt(exp.beginWork.substring(0, 4)) ===
												0
													? ''
													: parseInt(exp.endWork.substring(0, 4)) -
													  parseInt(exp.beginWork.substring(0, 4))}
												{parseInt(exp.endWork.substring(0, 4)) -
													parseInt(exp.beginWork.substring(0, 4)) ===
													1 && ' год'}
												{parseInt(exp.endWork.substring(0, 4)) -
													parseInt(exp.beginWork.substring(0, 4)) >=
													2 &&
													parseInt(exp.endWork.substring(0, 4)) -
														parseInt(exp.beginWork.substring(0, 4)) <=
														4 &&
													' года'}
												{parseInt(exp.endWork.substring(0, 4)) -
													parseInt(exp.beginWork.substring(0, 4)) >
													4 && ' лет'}
											</p>
										</div>
										<div className="flex flex-col gap-[8px]">
											<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">
												{exp.position}
											</p>
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												{exp.workPlace}
											</p>
											<p className="font-content-font font-normal text-black text-[14px]/[16.8px]">
												{exp.duties}
											</p>
										</div>
									</>
								))}
							</div>
						</div>
						<hr />
						<div className="flex flex-col gap-[24px]">
							<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">
								Образование
							</p>
							<div className="grid grid-cols-[194px_auto] gap-x-[20px] gap-y-[24px] w-[90%]">
								{res.educations.map(edu => (
									<>
										<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
											{edu.endYear}
										</p>
										<div className="flex flex-col gap-[8px]">
											<p className="font-content-font font-bold text-black text-[16px]/[19.2px]">
												{edu.nameOfInstitute + ', ' + edu.country}
											</p>
											<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
												{edu.speciality === null ? '' : edu.speciality + ', '}
												{edu.educationLevel}
											</p>
										</div>
									</>
								))}
							</div>
						</div>
						<hr />
						<div className="flex flex-col gap-[24px]">
							<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40">
								О себе
							</p>
							<p className="font-content-font font-normal text-black text-[16px]/[19.2px]">
								{res.respondData.skills.aboutMe}
							</p>
						</div>
						<hr />
						<div className="flex flex-col">
							<p className="font-content-font font-normal text-black text-[18px]/[21.6x] opacity-40 w-[194px]">
								Профессиональные навыки
							</p>
							<div className="grid grid-cols-[194px_auto] gap-x-[20px] w-[90%]">
								{/* <div className="col-start-2">
									{res.respondData.skills.aboutMe}
								</div> */}
								<div className="col-start-2 flex gap-[8px] flex-wrap">
									{res.respondData.skills.keySkills.map(skill => (
										<Tag
											className="bg-black bg-opacity-10 rounded-[40px] py-[8px] px-[16px] font-content-font font-normal text-black text-[16px]/[19.2px]"
											key={uuid()}
										>
											{skill}
										</Tag>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}
