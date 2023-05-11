/* eslint-disable import/no-anonymous-default-export */
import zh_CN from "./zh_CN";
import en_US from "./en_US";
import { createIntl, createIntlCache } from 'react-intl';
import store from '@/store'

export type ILocales = 'en-US' | 'zh-CN'

const message = {
	"en-US": en_US,
	"zh-CN": zh_CN
}

export const getLocales = (lang: ILocales) => message[lang]

const cache = createIntlCache()

export const intl = createIntl(
	{
		locale: store.getState().application.locale,
		messages: getLocales(store.getState().application.locale)
	},
	cache
)

export default message
