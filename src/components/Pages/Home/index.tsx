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

	const [signing, setSigning] = useState<boolean>(false)

	const onButtonClick = () =>
	{
		dispatch(actionCreaters.showLoading())
		setSigning(true)
		setTimeout(() =>
		{
			dispatch(actionCreaters.hideLoading())
			setSigning(false)
		}, 3000);
	}

	return (
		<>
			<h1>{loading.visible || signing ? 'Open' : 'Close'}</h1>
			<button onClick={onButtonClick}>test</button>
		</>
	)
}

export default Main
