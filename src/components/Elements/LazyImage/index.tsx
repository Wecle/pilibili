import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Image } from 'antd';
import styles from '@/styles/Elements/LazyImage/index.module.scss'
import { sleep } from '@/constants/utils';

const ErrorImage = "https://cdn.jsdelivr.net/gh/Wecle/md-tube/pilibili/20230511134321.png"

interface Props
{
	src: string;
	alt: string;
	width?: string;
	height?: string;
	// 图片加载类型
	type?: 'normal' | 'progressive'
	// 预览开关
	preview?: boolean;
	// 略缩图
	thumb?: string;
}

const LazyImage: React.FC<Props> = (props) =>
{
	const baseBlur = 5
	const { src, alt, width, height, type, preview, thumb } = props
	const [progress, setProgress] = useState(0)
	const [imageSrc, setImageSrc] = useState<string | null>(() => thumb ?? null);
	const [isLoaded, setIsLoaded] = useState(false)
	const [isProgressive,] = useState(() => type === 'progressive')
	const [blurProgress, setBlurProgress] = useState(baseBlur)
	const imageRef = useRef<HTMLImageElement>(null);

	const baseStyle = {
		width: width ?? '100%',
		height: height ?? '100%'
	}

	const progressiveStyle = useMemo(() => (
		{
			filter: isLoaded ? 'none' : `blur(${blurProgress}px)`,
			transition: 'filter 1s'
		}), [isLoaded, blurProgress])

	const loadImage = useCallback(async () =>
	{
		if (!thumb && isProgressive)
		{
			await sleep(500).then(() =>
			{
				setImageSrc(src)
				setIsLoaded(true)
			})
		} else
		{
			const xhr = new XMLHttpRequest()
			xhr.responseType = 'blob'
			xhr.onprogress = event =>
			{
				if (event.lengthComputable)
				{
					const percentComplete = event.loaded / event.total * 100
					setProgress(percentComplete)
					setBlurProgress(baseBlur - baseBlur / 100 * percentComplete)
				}
			}
			xhr.onload = () =>
			{
				setImageSrc(URL.createObjectURL(xhr.response));
				setIsLoaded(true)
			};
			xhr.open('GET', src);
			xhr.send();
		}
	}, [src, isProgressive, thumb])

	useEffect(() =>
	{
		const observer = new IntersectionObserver((entries) =>
		{
			entries.forEach((entry) =>
			{
				if (entry.isIntersecting)
				{
					loadImage();
					observer.disconnect();
				}
			});
		});
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		observer.observe(imageRef.current!);
		return () => observer.disconnect();
	}, []);

	return (
		<div className={styles.lazyImage} ref={imageRef} style={baseStyle}>
			<img src={imageSrc ?? (isProgressive ? '' : ErrorImage)} alt={alt} style={isProgressive || !!thumb ? { ...progressiveStyle, ...baseStyle } : baseStyle} />
		</div>
	);
};

export default LazyImage;
