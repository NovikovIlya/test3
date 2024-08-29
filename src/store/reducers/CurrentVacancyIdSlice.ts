import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { currentVacancyId: number } = { currentVacancyId: 0 }

const currentVacancyIdSlice = createSlice({
	name: 'currentVacancyId',
	initialState,
	reducers: {
		setCurrentVacancyId: (state, action: PayloadAction<number>) => {
			state.currentVacancyId = action.payload
		}
	}
})

export const { setCurrentVacancyId } = currentVacancyIdSlice.actions
export default currentVacancyIdSlice.reducer
