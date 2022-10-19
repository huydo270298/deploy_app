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
        <div className={cx('btn_group')}>
          <Link to='/login' className={cx('btn', 'btn_login')}>Log in</Link>
          <Link to='/register' className={cx('btn', 'btn_register')}>Sign Up</Link>
        </div>
        {/* <Link to="/user" className={cx('btn_user')}>
          <i className={cx('icon_user')}></i>
          PROFILE
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
