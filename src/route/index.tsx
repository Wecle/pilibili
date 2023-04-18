import App from '@/App'
import { URLS } from '@/constants/urls'
import { FC } from 'react'
import Routes from './routes'

const RootRouter: FC = () =>
{
	return (
		<App>
			<Routes />
		</App>
	)
}

export default RootRouter
