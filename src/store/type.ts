import { IGender } from '../api/types'

export interface InitialState {
	accessToken: string | null
	refreshToken: string | null
	user: User | null
	edit: boolean
}
export type Documentation = {
	links: {
		additionalProp1: Template[]
		additionalProp2: Template[]
		additionalProp3: Template[]
	}
}
export type Template = {
	documentName: string
	link: string
}
export type Email = {
	id: number
	email: string
	verified: boolean
}
export interface User {
	username: string
	firstname: string
	lastname: string
	middlename: string
	birthday: string
	phone: string
	email: string
	citizenship: string
	roles: Role[]
	sessionId: string
	sessionHash: string
	allId: string
}
export type IDocumentsRequest = {
	id: number
	type: string
}
export interface Role {
	login: string
	id: string
	type: string
}
export interface ICalendarItem {
	semester: number
	type_id: number
	type_name: string
	gost_hours: number
	laboratory_hours: number
	total_laboratory_hours: number
	lecture_hours: number
	total_lecture_hours: number
	practice_hours: number
	total_practice_hours: number
	seminar_hours: number
	total_seminar_hours: number
	independent_hours: number
	total_independent_hours: number
	is_exam: boolean
	is_quiz: boolean
	subject_id: number
	subject_name: string
	full_shifr: string
}

export interface ICalendar {
	subjects: ICalendarItem[]
}

interface Day {
	name: string
	time: string
	teacher: string
	teacherId: number
	building: string
	room: string
	type: string
}
export interface Exam {
	building_name: string
	room_num: string
	name: string
	employee_id: number
	employee_name: string
	date_note: string
	time_note: string
}
export type TypeSchedule = {
	sunday: Day[]
	monday: Day[]
	tuesday: Day[]
	wednesday: Day[]
	thursday: Day[]
	friday: Day[]
	saturday: Day[]
}
export interface IMe {
	name: string
	surName: string
	patronymic: string
	birthDay: string
	gender: string
	phone: string
	countryId: number
}

export type VacancyItemType = {
	id: number
	title: string
	experience: string
	employment: string
	salary: string
}

export type CategoryType = {
	title: string
	direction: boolean
	subdivision: boolean
}

export type VacancyViewResponceType = {
	id: number
	acf: {
		experience: string
		salary: string
		employment: string
		responsibilities: string
		skills: string
		conditions: string
		category: string
		direction: string
		subdivision: string
	}
	title: {
		rendered: string
	}
}

export enum respondStatus {
	'IN_REVIEW',
	'IN_SUPERVISOR_REVIEW',
	'IN_PERSONNEL_DEPT_REVIEW',
	'INVITATION',
	'REJECTED',
	'ARCHIVE'
}

export type RespondItemType = {
	id: number
	name: string
	respondDate: string
	status: string
}

type experienceResponceType = {
	workPlace: string
	position: string
	beginWork: string
	endWork: string
	duties: string
}

type educationResponceType = {
	educationLevel: string
	country: string
	institution: string
	speciality?: string
	endYear: number
}

export type ResponceType = {
	coverLetter: string
	aboutMe: {
		gender: IGender
		lastname: string
		firstname: string
		patronymic: string
		birthday: string
		citizenship: string
		phone: string
		email: string
	}
	educations: educationResponceType[]
	portfolio: {
		url: string
		workExperiences: experienceResponceType[]
	}
	skills: {
		keySkills: string[]
		aboutMe: string
	}
}

export type VacancyGroupedResponcesType = {
	vacancyId: number
	vacancyTitle: string
	respondsCount: number
}

export type VacancyRespondItemType = {
	id: number
	responseDate: string
	respondDate: string
	vacancyName: string
	status: string
	recipient: string
	desiredJob: string
	type: 'DIRECTLY' | 'RESERVE'
	userData: null | {
		firstname: string
		lastname: String
		middlename: string
		email: string
		phone: string
	}
	respondData: {
		portfolio: {
			url: string
			workExperiences: experienceResponceType[]
		}
		skills: {
			keySkills: string[]
			aboutMe: string
		}
	}
	educations: {
		educationLevel: string
		country: string
		endYear: string
		speciality: string | null
		nameOfInstitute: string
	}[]
}

export type ChatMessageType = {
	id: number
	sender: 'SEEKER' | 'PERSONNEL_DEPARTMENT'
	text: string
	read: boolean
	sendDate: string
	type:
		| 'TEXT'
		| 'FILE'
		| 'RESPOND'
		| 'IN_SUPERVISOR_REVIEW'
		| 'INVITATION'
		| 'REJECTED'
	fileInfos: { id: number; name: string }[] | null
}

export enum ChatMessageDateDisplayEnum {
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'
}

export type VacancyRequestType = {
	post: string
	experience: string
	salary: string
	employment: string
	responsibilities: string
	skills: string
	conditions: string
	category: string
	direction: string
}

export type VacancyRequestItemType = {
	id: number
	vacancy: {
		id: number
		post: string
	}
	action: 'CREATE' | 'UPDATE' | 'DELETE'
	status: string
}

export type VacancyRequestViewType = {
	id: number
	authorId: number
	vacancyId: number | null
	action: 'CREATE' | 'UPDATE' | 'DELETE'
	status: string
	newData: VacancyRequestType
	oldData: VacancyRequestType | null
}