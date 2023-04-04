import { ILocales } from "@/intl";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ILoading
{
	visible: boolean;
	text?: string;
}

export interface IApplicationState
{
	loading: ILoading,
	locale: ILocales
}

const initialState: IApplicationState = {
	loading: {
		visible: false
	},
	locale: 'zh-CN'
}

const slice = createSlice({
	name: 'application',
	initialState,
	reducers: {
		SetLoadingAction(state: IApplicationState, action: PayloadAction<ILoading>)
		{
			return {
				...state,
				loading: action.payload
			}
		}
	}
})

export const {
	SetLoadingAction
} = slice.actions

export default slice.reducer
