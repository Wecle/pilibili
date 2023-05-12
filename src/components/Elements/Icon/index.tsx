import React, { useEffect, useRef, useState } from 'react'

interface IconProps
{
	name: string;
	/**
	 * 是否为交互图标
	 */
	interactive?: boolean;
	className?: string;
	disabled?: boolean;
	width?: string | number;
	height?: string | number;
	cursor?: string,
	onClick?: () => void;
}

const Icon: React.FC<IconProps> = (props) =>
{
	const { name, interactive, className, disabled, width, height, cursor, onClick } = props
	const [isActive, setIsActive] = useState(false)
	const [isHover, setIsHover] = useState(false)
	// 设置一个状态，当全部导入完成时再显示图标，若不设置有可能出现不显示图标的情况
	const [isLoaded, setIsLoaded] = useState(false)
	const NormalIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>()
	const ActiveIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>()
	const HoverIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>()

	const initIcon = async (name: string, interactive?: boolean): Promise<void> =>
	{
		try
		{
			NormalIconRef.current = (await import(`../../../image/icons/normal/${name}.svg`)).ReactComponent
			ActiveIconRef.current = interactive ? (await import(`../../../image/icons/active/${name}-active.svg`)).ReactComponent : undefined
			HoverIconRef.current = interactive ? (await import(`../../../image/icons/hover/${name}-hover.svg`)).ReactComponent : undefined

			setIsLoaded(true)
		} catch (error)
		{
			console.error('Init Icon Failed:', error)
		}
	}

	const renderIcon = () =>
	{
		if (!isLoaded) return null
		const RenderIcon = interactive ? isActive ? ActiveIconRef.current : isHover ? HoverIconRef.current : NormalIconRef.current : NormalIconRef.current
		return RenderIcon ? <RenderIcon name={name} /> : null
	}

	useEffect(() =>
	{
		initIcon(name, interactive)
	}, [name])

	const baseStyle: React.CSSProperties = {
		display: 'flex',
		flexShrink: 0,
		alignItems: 'center',
		justifyContent: 'center',
		cursor: cursor,
		pointerEvents: disabled ? 'none' : undefined,
		opacity: disabled ? 0.4 : 1,
		width: typeof width === 'string' ? width : `${width}px`,
		height: typeof height === 'string' ? height : `${height}px`,
	}

	const onMouseClick = () =>
	{
		console.log(111)
		onClick && onClick()
	}

	const onMouseEnter = () =>
	{
		setIsHover(true)
	}

	const onMouseLeave = () =>
	{
		setIsHover(false)
		setIsActive(false)
	}

	const onMouseDown = () =>
	{
		setIsActive(true)
	}

	const onMouseUp = () =>
	{
		setIsActive(false)
	}

	return (
		<div
			className={className}
			style={baseStyle}
			onClick={onMouseClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			<div style={{ width: '100%', height: '100%', lineHeight: 0 }}>
				{
					renderIcon()
				}
			</div>
		</div>
	)
}

export default React.memo(Icon)
