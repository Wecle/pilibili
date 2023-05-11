import React, { useState } from 'react'
import styles from '@/styles/Pages/Cover/index.module.scss'
import { Button } from 'antd'
import { DoubleRightOutlined, GlobalOutlined } from '@ant-design/icons';
import { ICoverList } from '@/http/Types';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreaters } from '@/store/application/thunk';
import { IAppState } from '@/store';
import { ILocales } from '@/intl';
import { useIntl } from 'react-intl';

interface Props
{
	coverList: ICoverList[],
	scrollDom: string;
}

const Cover: React.FC<Props> = (props) =>
{
	const { coverList, scrollDom } = props
	const [curImg, setCurImg] = useState(coverList[0].url)
	const [, setImgIndex] = useState(1)
	const locale = useSelector<IAppState, ILocales>(state => state.application.locale)
	const dispatch = useDispatch()
	const intl = useIntl()

	const onSwitchClick = () =>
	{
		setImgIndex(index =>
		{
			setCurImg(coverList[index % 3].url)
			return index + 1
		})
	}

	const onGlobalClick = () =>
	{
		dispatch(actionCreaters.switchLocate(locale === 'zh-CN' ? 'en-US' : 'zh-CN'))
	}

	return (
		<div id='cover' className={styles.cover}>
			<section className={styles.globalBanner} style={{ backgroundImage: `url(${curImg})` }}>
				<div className={styles.bannerInner}>
					<span className={styles.innerTitle}>PILIBILI</span>
					<Button className={styles.innerBtn} type='dashed' size='large' ghost>
						{intl.formatMessage({ id: "START_EXPLORING" })}
					</Button>
				</div>

				<DoubleRightOutlined className={styles.scrollDown} rotate={90} onClick={() => document.getElementById(scrollDom)?.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })} />
				<Button className={styles.switchBtn} type="dashed" ghost onClick={onSwitchClick}>切换封面</Button>
				<GlobalOutlined className={styles.internationalBtn} onClick={onGlobalClick} />
			</section>
		</div>
	)
}

export default Cover
