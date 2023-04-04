import React, { useState } from 'react'
import { IAppState } from '@/store'
import { ILoading } from '@/store/application/slice'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreaters } from '@/store/application/thunk'

interface Props
{

}

const Main: React.FC = (props: Props) =>
{
	const dispatch = useDispatch()
	const loading = useSelector<IAppState, ILoading>(state => state.application.loading)

	const onButtonClick = () =>
	{
		dispatch(actionCreaters.showLoading())
		setTimeout(() =>
		{
			dispatch(actionCreaters.hideLoading())
		}, 3000);
	}

	return (
		<div style={{ width: '200px' }}>
			<h1>{loading.visible ? 'Open' : 'Close'}</h1>
			<button onClick={onButtonClick}>test</button>
		</div>
	)
}

export default Main
