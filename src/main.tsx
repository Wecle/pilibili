import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './route'
import InitProvider from './components/Elements/InitProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<InitProvider>
				<BrowserRouter>
					<RootRouter />
				</BrowserRouter>
			</InitProvider>
		</Provider>
	</React.StrictMode>,
)
