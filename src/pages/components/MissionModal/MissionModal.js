import classNames from 'classnames/bind';
import React from 'react'
import { useTranslation } from 'react-i18next';
import styles from './MissionModal.module.scss';

let cx = classNames.bind(styles);

const MissionModal = () => {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('tit')}>{t("MISSION_LIST")}</h3>
      <ul className={cx('list')}>
        <li>
          <span>{t("LINK_SHARE")}</span>
          <button className={cx('btn_copy')} onClick={() => navigator.clipboard.writeText('https://221.vn')}>{t("COPY_LINK")}</button>
        </li>
      </ul>
    </div>
  )
}

export default MissionModal;