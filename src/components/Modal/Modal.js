import classNames from 'classnames/bind';
import React from 'react';
import styles from './Modal.module.scss';

let cx = classNames.bind(styles);

const Modal = ({children, onChange}) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <button type='button' className={cx('btn')} onClick={onChange}>
          <i className={cx('icon_close')}></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
