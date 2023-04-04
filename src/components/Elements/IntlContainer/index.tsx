import { getLocales, ILocales } from '@/intl'
import { FC, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'

interface Props
{
	locale: ILocales,
	children?: ReactNode
}

const IntlContainer: FC<Props> = (props) =>
{
	const { children, locale } = props

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
