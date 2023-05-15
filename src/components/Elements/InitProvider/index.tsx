import { ILocales, getLocales } from '@/intl';
import { IAppState } from '@/store';
import React from 'react';
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';

interface Props
{
	children?: React.ReactNode
}

const InitProvider: React.FC<Props> = (props) =>
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
				<ConfigProvider
					autoInsertSpaceInButton={false}
					locale={locale === 'zh-CN' ? zhCN : enUS}
					getPopupContainer={trigger =>
					{
						if (trigger && trigger.parentElement)
						{
							return trigger.parentElement
						}
						return document.body
					}}
				>
					{children}
				</ConfigProvider>
			</IntlProvider>
		</div>
	)
}

export default InitProvider
