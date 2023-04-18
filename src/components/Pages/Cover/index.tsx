import React, { useState } from 'react'
import styles from '@/styles/Pages/Cover/index.module.scss'
import { Button } from 'antd'

interface Props
{

}

const coverList = [
	'https://raw.githubusercontent.com/Wecle/md-tube/main/pilibili/1296285.jpg',
	'https://cdn.jsdelivr.net/gh/Wecle/md-tube/pilibili/1296311.jpg',
	'https://cdn.jsdelivr.net/gh/Wecle/md-tube/pilibili/1296216.jpg'
]

const Cover: React.FC<Props> = (props) =>
{
	const [curImg, setCurImg] = useState(coverList[0])
	const [imgIndex, setImgIndex] = useState(1)

	const onSwitchClick = () =>
	{
		setImgIndex(index =>
		{
			console.log(index % 3)
			setCurImg(coverList[index % 3])
			return index + 1
		})
	}

	return (
		<div className={styles.cover}>
			<section className={styles.globalBanner} style={{ backgroundImage: `url(${curImg})` }}>
				<div className={styles.bannerInner}>
					<span>PiliBili</span>
				</div>
			</section>
			<Button className={styles.switchBtn} type="dashed" ghost onClick={onSwitchClick}>切换封面</Button>
		</div>
	)
}

export default Cover
