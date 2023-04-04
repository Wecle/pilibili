import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './route'
import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import IntlContainer from './components/Elements/IntlContainer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<IntlContainer locale={store.getState().application.locale}>
				<ConfigProvider
					autoInsertSpaceInButton={false}
					locale={store.getState().application.locale === 'zh-CN' ? zhCN : enUS}
					getPopupContainer={trigger =>
					{
						if (trigger && trigger.parentElement)
						{
							return trigger.parentElement
						}
						return document.body
					}}
				>
					<BrowserRouter>
						<RootRouter />
					</BrowserRouter>
				</ConfigProvider>
			</IntlContainer>
		</Provider>
	</React.StrictMode>,
)
