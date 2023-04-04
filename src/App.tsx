import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { IAppState } from './store'
import { ILoading } from './store/application/slice'

interface Props
{
	children?: ReactNode
}

const App: FC<Props> = (props) =>
{
	const { children } = props
	const loading = useSelector<IAppState, ILoading>(state => state.application.loading)

	return (
		<div className="App">
			{children}
		</div>
	)
}

export default App
