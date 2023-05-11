import React from 'react'
import { IAppState } from '@/store'
import { ILoading } from '@/store/application/slice'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreaters } from '@/store/application/thunk'
import styles from '@/styles/Pages/Home/index.module.scss'
import Cover from '../Cover'
import LazyImage from '@/components/Elements/LazyImage'
import { ICoverList } from '@/http/Types'

interface Props
{

}

const Main: React.FC = (props: Props) =>
{
	const dispatch = useDispatch()
	const loading = useSelector<IAppState, ILoading>(state => state.application.loading)

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

	const onButtonClick = () =>
	{
		dispatch(actionCreaters.showLoading())
		setTimeout(() =>
		{
			dispatch(actionCreaters.hideLoading())
		}, 3000);
	}

	return (
		<div id='home' className={styles.home}>
			<Cover coverList={coverList} scrollDom='home' />
			<section className={styles.feature}>
				<div style={{ display: 'flex', flexDirection: "column", width: '300px' }}>
					{coverList.map(cover => (
						<div key={cover.url}>
							<LazyImage src={cover.url} alt={cover.url} type='progressive' thumb={cover.thumb} />
						</div>
					))}
				</div>
			</section>
			<h1 className={styles.textColor}>{loading.visible ? 'Open' : 'Close'}</h1>
			<button onClick={onButtonClick}>test</button>
		</div>
	)
}

export default Main
