import classNames from 'classnames/bind';
import React from 'react'
import { useTranslation } from 'react-i18next';
import styles from './PushModal.module.scss';

let cx = classNames.bind(styles);

const PushModal = () => {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('exchange')}>1USD = 5000 {t("VIEWS")}</div>
      <p className={cx('note')}>{t("CONTACT_EMAIL")} : <span className={cx('email')}>ngoduythanh2000@gmail.com</span></p>
    </div>
  )
}

export default PushModal