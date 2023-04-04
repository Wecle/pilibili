/* eslint-disable import/no-anonymous-default-export */
import zh_CN from "./zh_CN";
import en_US from "./en_US";
import { createIntl, createIntlCache } from 'react-intl';
import store from '@/store'

export type ILocales = 'en-US' | 'zh-CN'

export function getLocales(lang: ILocales)
{
	switch (lang)
	{
		case ('en-US'):
			return en_US
		case ('zh-CN'):
			return zh_CN
		default:
			return en_US
	}
}

const cache = createIntlCache()
const message = {
	"en-US": en_US,
	"zh-CN": zh_CN
}
export const intl = createIntl(
	{
		locale: store.getState().application.locale,
		messages: getLocales(store.getState().application.locale)
	},
	cache
)

export default message
