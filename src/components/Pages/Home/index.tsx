import React, { useEffect, useState } from 'react'
import styles from '@/styles/Pages/Home/index.module.scss'
import Cover from '../Cover'
import LazyImage from '@/components/Elements/LazyImage'
import { ICoverList } from '@/http/Types'
import Icon from '@/components/Elements/Icon/index'


interface Props
{

}

const Main: React.FC = (props: Props) =>
{

	const coverList: ICoverList[] = [
		{
			url: "https://cdn.jsdelivr.net/gh/Wecle/md-tube/pilibili/20230511114918.jpg",
			thumb: "https://cdn.jsdelivr.net/gh/Wecle/md-tube/pilibili/20230511114930.jpg"
		},
		{
			url: "https://cdn.jsdelivr.net/gh/Wecle/md-tube/pilibili/output.jpg",
			thumb: "https://cdn.jsdelivr.net/gh/Wecle/md-tube/pilibili/202305111640352.jpg"
		},
		{
			url: "https://cdn.jsdelivr.net/gh/Wecle/md-tube/pilibili/5234523.jpg",
			thumb: "https://cdn.jsdelivr.net/gh/Wecle/md-tube/pilibili/202305111640479.jpg"
		}
	]

	return (
		<div id='home' className={styles.home}>
			<Cover coverList={coverList} scrollDom='home' />
			<section className={styles.feature}>
				<div style={{ display: 'flex', flexDirection: "column", width: '300px' }}>
					{coverList.map(cover => (
						<div key={cover.url}>
							<LazyImage
								src={cover.url}
								alt={cover.url}
								type='progressive'
								thumb={cover.thumb}
							/>
						</div>
					))}
				</div>
			</section>
			<Icon name='ic-language' />
		</div>
	)
}

export default Main
