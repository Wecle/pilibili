import { getLocales, ILocales } from '@/intl'
import { IAppState } from '@/store'
import { FC, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'

interface Props
{
	children?: ReactNode
}

const IntlContainer: FC<Props> = (props) =>
{
	const { children } = props
	const locale = useSelector<IAppState, ILocales>(state => state.application.locale)

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<IntlProvider
				locale={locale}
				messages={getLocales(locale)}
				onError={(err) =>
				{
					console.warn(err)
				}}
			>
				{children}
			</IntlProvider>
		</div>
	)
}

export default IntlContainer
