import classNames from 'classnames/bind';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { PlateIcon } from '../../../assets/Icons';
import styles from './HelpModal.module.scss';

let cx = classNames.bind(styles);

const HelpModal = () => {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        <li className={cx('item')}>{t("HELP_1")}</li>
        <li className={cx('item')}>{t("HELP_2")}</li>
      </ul>
      <p className={cx('sub')}>
        <PlateIcon className={cx('icon_plate')} />
        {/* <i className={cx('icon_plate')}></i> */}
        : {t("NUMBER_SPIN")}
      </p>
    </div>
  )
}

export default HelpModal