import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss';
import { SaveIcon, UserIcon } from '../../assets/Icons';

let cx = classNames.bind(styles);

const Header = () => {
  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner', isLoggedIn && 'loggedin')}>
        <h1 className={cx('logo')}><Link to='/' className={cx('link')} ></Link></h1>
        {
          isLoggedIn &&
          <div className={cx('btn_group', 'type')}>
            <Link to="/user" className={cx('btn', 'btn_save')}>
              <SaveIcon />
              SAVE
            </Link>
            <Link to="/user" className={cx('btn', 'btn_user')}>
              <UserIcon />
              PROFILE
            </Link>
          </div>
        }

        {
          !isLoggedIn &&
          <div className={cx('btn_group', 'type2')}>
            <Link to='/login' className={cx('btn', 'btn_login')}>Log in</Link>
            <Link to='/register' className={cx('btn', 'btn_register')}>Sign Up</Link>
          </div>
        }
      </div>
    </header>
  );
};

export default Header;
