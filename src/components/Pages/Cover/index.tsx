import React, { useState } from 'react';
import styles from '@/styles/Pages/Cover/index.module.scss';
import { Button } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { ICoverList } from '@/http/Types';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreaters } from '@/store/application/thunk';
import { IAppState } from '@/store';
import { ILocales } from '@/intl';
import { useIntl } from 'react-intl';
import Icon from '@/components/Elements/Icon';

interface Props
{
	coverList: ICoverList[];
	scrollDom: string;
}

const Cover: React.FC<Props> = (props) =>
{
	const { coverList, scrollDom } = props;
	const [curImg, setCurImg] = useState(coverList[0].url);
	const [, setImgIndex] = useState(1);
	const locale = useSelector<IAppState, ILocales>(
		(state) => state.application.locale
	);
	const dispatch = useDispatch();
	const intl = useIntl();

	const onScrollClick = () => document.getElementById(scrollDom)?.scrollTo(
		{
			left: 0,
			top: document.body.scrollHeight,
			behavior: 'smooth',
		})

	const onSwitchClick = () =>
	{
		setImgIndex((index) =>
		{
			setCurImg(coverList[index % 3].url);
			return index + 1;
		});
	};

	const onGlobalClick = () =>
	{
		dispatch(
			actionCreaters.switchLocate(locale === 'zh-CN' ? 'en-US' : 'zh-CN')
		);
	};

	return (
		<div id="cover" className={styles.cover}>
			<section
				className={styles.globalBanner}
				style={{ backgroundImage: `url(${curImg})` }}
			>
				<div className={styles.bannerInner}>
					<span className={styles.innerTitle}>PILIBILI</span>
					<Button className={styles.innerBtn} type="dashed" size="large" ghost onClick={onScrollClick}>
						{intl.formatMessage({ id: 'START_EXPLORING' })}
					</Button>
				</div>

				<DoubleRightOutlined
					className={styles.scrollDown}
					rotate={90}
					onClick={onScrollClick}
				/>
				<Button
					className={styles.switchBtn}
					type="dashed"
					ghost
					onClick={onSwitchClick}
				>
					{intl.formatMessage({ id: 'SWITCH_COVER' })}
				</Button>
				<div className={styles.internationalBtn}>
					<Icon
						name='ic-language'
						cursor='pointer'
						interactive
						onClick={onGlobalClick}
					/>
				</div>
			</section>
		</div>
	);
};

export default Cover;
