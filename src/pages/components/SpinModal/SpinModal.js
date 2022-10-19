import classNames from 'classnames/bind';
import React from 'react'
import styles from './SpinModal.module.scss';

let cx = classNames.bind(styles);

const SpinModal = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('exchange')}>1USD = 5000 views</div>
      <p className={cx('note')}>Please contact us via email : <span className={cx('email')}>Abc@gmail.com</span></p>
    </div>
  )
}

export default SpinModal