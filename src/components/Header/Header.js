import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

let cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1 className={cx('logo')}>Logo</h1>
        <Link to="/user" className={cx('btn')}>
          <i className={cx('icon_user')}></i>
          Cá nhân
        </Link>
      </div>
    </header>
  );
};

export default Header;
