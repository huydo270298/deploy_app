import classNames from 'classnames/bind';
import React from 'react';
import { CloseIcon } from '../../assets/Icons';
import styles from './Modal.module.scss';

let cx = classNames.bind(styles);

const Modal = ({ children, onChange }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <button type='button' className={cx('btn')} onClick={onChange}>
          <CloseIcon className={cx('icon_close')} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
