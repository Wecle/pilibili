import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/Pages/Cover/index.module.scss'
import { Button } from 'antd'
import { DoubleRightOutlined } from '@ant-design/icons';
import ScreenShot from 'js-web-screen-shot';

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
			setCurImg(coverList[index % 3])
			return index + 1
		})
	}

	// const onScreenShot = () =>
	// {
	// 	new ScreenShot({
	// 		enableWebRtc: true,
	// 	})
	// }

	return (
		<div id='cover' className={styles.cover}>
			<section className={styles.globalBanner} style={{ backgroundImage: `url(${curImg})` }}>
				<div className={styles.bannerInner}>
					<span className={styles.innerTitle}>PILIBILI</span>
					<Button className={styles.innerBtn} type='dashed' size='large' ghost>开始探索</Button>
				</div>

				<DoubleRightOutlined className={styles.scrollDown} rotate={90} onClick={() => document.getElementById("cover")?.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })} />
				<Button className={styles.switchBtn} type="dashed" ghost onClick={onSwitchClick}>切换封面</Button>
			</section>
			<section className={styles.feature}>
				<span>PILIBILI</span>
			</section>
		</div>
	)
}

export default Cover
