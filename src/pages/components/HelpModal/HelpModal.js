import classNames from 'classnames/bind';
import React from 'react'
import { PlateIcon } from '../../../assets/Icons';
import styles from './HelpModal.module.scss';

let cx = classNames.bind(styles);

const HelpModal = () => {
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        <li className={cx('item')}>1. You can join the spin for free.</li>
        <li className={cx('item')}>2. The luckiest will be contacted and given the prize</li>
      </ul>
      <p className={cx('sub')}>
        <PlateIcon />
        {/* <i className={cx('icon_plate')}></i> */}
        : the numbers of spin turns
      </p>
    </div>
  )
}

export default HelpModal