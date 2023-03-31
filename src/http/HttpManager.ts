import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

export default class HttpManager
{
	private static _httpManager: HttpManager

	private instance: AxiosInstance

	constructor()
	{
		this.instance = axios.create({
			baseURL: import.meta.env.VITE_API_ROOT,
			timeout: 10000
		})
		this.initInterceptors()
	}

	public static getInstance(): HttpManager
	{
		if (!this._httpManager)
		{
			this._httpManager = new HttpManager()
		}

		return this._httpManager
	}

	public initInterceptors()
	{
		this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) =>
		{
			return config
		}, (error: AxiosError) =>
		{
			return Promise.reject(error)
		})

		this.instance.interceptors.response.use((response: AxiosResponse) =>
		{
			return Promise.resolve(response.data)
		}, (error: AxiosError) =>
		{
			if (error.response)
			{
				const { status } = error.response
				switch (status)
				{
					case 400:
						this.handleBadRequestError()
						break
					case 401:
						this.handleUnauthorizedError()
						break
					case 403:
						this.handlePermissionDeniedError();
						break;
					case 404:
						this.handleNotFoundError()
						break;
					case 409:
						this.handleResourceConflictError();
						break;
					case 419:
						// 自定义错误，需要在调用地方做处理
						return Promise.reject();
					case 429:
						this.handleResourceExhaustedError();
						break;
					case 499:
						this.handleCancelRequestError();
						break;
					case 500:
						this.handleServerError()
						break
					case 501:
						this.handleNotImplementedError();
						break;
					case 502:
						this.handleBadGatewayError();
						break;
					case 503:
						this.handleUnavailableError();
						break;
					case 504:
						this.handleDeadlineExceededError();
						break;
					default:
						console.error('Unhandled network error => ', error)
						break;
				}
			}
			else
			{
				if (error.message === 'Network Error')
				{
					console.warn('Network Error')
				}
			}
			return Promise.reject(error)
		})
	}

	/**
	 * 302 处理重定向
	 * @param location 重定向地址
	 */
	private handleBrowserRedirect(location: string)
	{
		window.location.href = decodeURI(location)
	}

	/**
	 * 400 处理客户端传参错误
	 */
	private handleBadRequestError()
	{

	}

	/**
	 * 401 处理客户端没有认证错误
	 */
	private handleUnauthorizedError()
	{

	}

	/**
	 * 403 处理客户端没有足够的权限错误
	 */
	private handlePermissionDeniedError()
	{

	}

	/**
	 * 404 处理找不到指定的资源，或者该请求被未公开的原因（例如白名单）拒绝。
	 */
	private handleNotFoundError()
	{

	}

	/**
	 * 409 处理资源冲突错误
	 */
	private handleResourceConflictError()
	{

	}

	/**
	 * 429 处理资源配额达到速率限制错误
	 */
	private handleResourceExhaustedError()
	{

	}

	/**
	 * 499 处理客户端取消请求错误
	 */
	private handleCancelRequestError()
	{

	}

	/**
	 * 500 处理服务端错误
	 */
	private handleServerError()
	{

	}

	/**
	 * 501 处理服务器未实现该API方法
	 */
	private handleNotImplementedError()
	// tslint:disable-next-line: no-empty
	{

	}

	/**
	 * 502 处理服务端重启中错误
	 */
	private handleBadGatewayError()
	{

	}

	/**
	 * 503 暂停服务。通常是服务器已经关闭。
	 */
	private handleUnavailableError()
	// tslint:disable-next-line: no-empty
	{

	}

	/**
	 * 504 已超过请求期限。如果重复发生，请考虑降低请求的复杂性。
	 */
	private handleDeadlineExceededError()
	// tslint:disable-next-line: no-empty
	{

	}

	public get<T>(url: string, params?: any): Promise<T>
	{
		if (params && Object.keys(params).length)
		{
			url = Object.keys(params).reduce((prevVal, curVal, _index) =>
			{
				if (_index === 0)
				{
					return `${prevVal}?${curVal}=${params[curVal]}`
				}
				return `${prevVal}&${curVal}=${params[curVal]}`
			}, url)
		}
		return this.instance.get(url)
	}

	public post<T>(url: string, data?: object): Promise<T>
	{
		return this.instance.post(url, data)
	}

	public put<T>(url: string, data?: object): Promise<T>
	{
		return this.instance.put(url, data)
	}

	public delete<T>(url: string, data?: object): Promise<T>
	{
		return this.instance.delete(url, data)
	}
}
