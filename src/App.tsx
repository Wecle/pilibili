import { Spin } from 'antd'
import { FC, ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import { IAppState } from './store'
import { ILoading } from './store/application/slice'
import styles from '@/styles/app.module.scss'

interface Props
{
	children?: ReactNode
}

const App: FC<Props> = (props) =>
{
	const { children } = props
	const loading = useSelector<IAppState, ILoading>(state => state.application.loading)
	// const [signing, setSigning] = useState<boolean>(true)

	return (
		<div className={styles.app}>
			<Spin
				spinning={loading.visible}
				tip={loading.text || '加载中'}
				size="large"
			/>
			{children}
		</div>
	)
}

export default App
