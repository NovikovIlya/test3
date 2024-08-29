import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { VacancyViewResponceType } from '../reducers/type'

const initialState: { currentVacancy: VacancyViewResponceType | null } = {
	currentVacancy: null
}

const currentVacancySlice = createSlice({
	name: 'currentVacancy',
	initialState,
	reducers: {
		setCurrentVacancy(
			state,
			action: PayloadAction<VacancyViewResponceType | null>
		) {
			state.currentVacancy = action.payload
		}
	}
})

export const { setCurrentVacancy } = currentVacancySlice.actions

export default currentVacancySlice.reducer
