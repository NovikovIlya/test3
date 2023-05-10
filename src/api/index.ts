import { AxiosPromise } from 'axios'

import endpoints from './endpoints'
import { axiosInstance } from './instance'
import { IAuthSuccess } from './types'
import { IAuthRequest, IRefreshRequest, IRegfreshSuccess } from './types'

export const login = (params: IAuthRequest): AxiosPromise<IAuthSuccess> =>
	axiosInstance.post(endpoints.AUTH.LOGIN, params)

export const refresh = (
	params: IRefreshRequest
): AxiosPromise<IRegfreshSuccess> =>
	axiosInstance.post(endpoints.AUTH.REFRESH, params)