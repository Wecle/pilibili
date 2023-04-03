import { SetLoadingAction } from './slice'

export interface IApplicationAction
{
	showLoading: (text?: string) => any;
	hideLoading: () => any;
}

export const actionCreaters: IApplicationAction = {
	showLoading: (text?: string): any => (dispatch: any) => dispatch(SetLoadingAction({ visible: true, text })),
	hideLoading: (): any => async (dispatch: any) =>
	{
		setTimeout(() =>
		{
			dispatch(SetLoadingAction({ visible: false }))
		}, 100)
	}
}
