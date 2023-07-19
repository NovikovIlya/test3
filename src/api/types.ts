export interface IRegRequest {
	lastName: string
	password: string
	firstName: string
	email: string | null
	agreement: string | null
}

export interface IAuthRequest {
	username: string
	password: string
}

export interface IError {
	message: string
}

export interface IRegError {
	errors: IError[]
}

export interface IAuthSuccess {
	accessToken: string
	refreshToken: string
	user: IUserData
}

export interface IUserData {
	username: string
	firstname: string
	lastname: string
	middlename: string
	birthday: string
	phone: string
	email: string
	citizenship: string
	roles: IRole[]
}

export interface IRole {
	login: string
	id: number | null
	type: string
}

export interface IAuthRegState {
	authData: {
		accessToken: string | null
		error: IError[] | null
	}
	regData: {
		error: IError[] | null
	}
}

export interface IProfileState {
	profileData: {
		error: IError[] | null | String
		CurrentData: IUserData | null
	}
}

export type TypeRole =
	| 'enrollee'
	| 'student'
	| 'schoolboy'
	| 'listener'
	| 'applicant'
	| 'guest'

export interface IinfoUserState {
	role: TypeRole
}

export interface IFormState {
	name: string
	surName: string
	patronymic: string | null
	birthDay: string | null
	gender: string
	phone: string
	country: string
}

export interface IDocumentState {
	nameDocument: string
	passwordSeries: string | null
	passwordNumber: string | null
	issuedBy: string | null
	dateIssue: string | null
	divisionCode: string
	inn: string
	snils: string
}

export interface IEdForm {
	id: number
	nameOfInstitute: string
	educationLevel: string
	documentNumber: string
	documentSeries: string
	educationCountry: string
}

export interface IParentState {
	FIO: string
	eMail: string
	phone: string
	nameDocument: string
	divisionCode: string
	issuedBy: string | null
	passwordSeries: string | null
	passwordNumber: string | null
	dateIssue: string | null
	inn: string
	snils: string
	registrationAddress: string
	residenceAddress: string
}

export interface IRefreshRequest {
	refreshToken: string
}

export interface IRefreshSuccess {
	accessToken: string
}

export interface data {
	tittle1: string
	tittle2: string
}

export interface IApproveRequest {
	id: string | null
	hash: string | null
}
