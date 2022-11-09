import classNames from 'classnames/bind';
import React from 'react'
import styles from './MissionModal.module.scss';

let cx = classNames.bind(styles);

const MissionModal = () => {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('tit')}>Mission List</h3>
      <ul className={cx('list')}>
        <li></li>
      </ul>
    </div>
  )
}

export default MissionModal;