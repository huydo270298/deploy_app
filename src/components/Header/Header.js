import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss';
import { SaveIcon, UserIcon } from '../../assets/Icons';
import Countdown from '../../pages/components/Countdown';

let cx = classNames.bind(styles);

const Header = () => {
  const loggedInUser = useSelector(state => state.user.user);
  const isLoggedInUser = !!loggedInUser;

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner', isLoggedInUser && 'loggedin'
      )}>
        <h1 className={cx('logo')}><Link to='/' className={cx('link')} ></Link></h1>
        <Countdown time={'2022-11-14 00:00:00'} />
        {
          isLoggedInUser &&
          <div className={cx('btn_group', 'type')}>
            <Link to="/bookmarks" className={cx('btn', 'btn_save')}>
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
          !isLoggedInUser &&
          <div className={cx('btn_group', 'type2')}>
            <Link to='/login' className={cx('btn', 'login')} >Log in</Link>
            <Link to='/register' className={cx('btn')}>Sign Up</Link>
          </div>
        }
      </div>
    </header>
  );
};

export default Header;
