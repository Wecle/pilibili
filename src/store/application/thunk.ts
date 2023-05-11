/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILocales } from '@/intl';
import { SetLoadingAction, SetLocaleAction } from './slice'

export interface IApplicationAction
{
	showLoading: (text?: string) => any;
	hideLoading: () => any;
	switchLocate: (locate: ILocales) => any;
}

export const actionCreaters: IApplicationAction = {
	showLoading: (text?: string): any => (dispatch: any) => dispatch(SetLoadingAction({ visible: true, text })),
	hideLoading: (): any => async (dispatch: any) =>
	{
		setTimeout(() =>
		{
			dispatch(SetLoadingAction({ visible: false }))
		}, 100)
	},
	switchLocate: (locate: ILocales): any => (dispatch: any) => dispatch(SetLocaleAction(locate))
}
