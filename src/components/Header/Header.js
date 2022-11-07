import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss';
import { SaveIcon, UserIcon } from '../../assets/Icons';
import Countdown from '../../pages/components/Countdown';

let cx = classNames.bind(styles);

const Header = () => {
  const loggedInUser = useSelector(state => state.user.current.data);
  const isLoggedIn = loggedInUser && Object.keys(loggedInUser).length > 0;

  const [active, setActive] = useState(0)
  const handleClick = (value) => {
    setActive(value)
  }
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner', isLoggedIn && 'loggedin')}>
        <h1 className={cx('logo')}><Link to='/' className={cx('link')} ></Link></h1>
        {isLoggedIn && <Countdown time={'2022-10-30 00:00:00'} />}
        {
          isLoggedIn &&
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
          !isLoggedIn &&
          <div className={cx('btn_group', 'type2')}>
            <Link to='/login' className={cx('btn', active === 0 && 'active')} onClick={() => handleClick(0)} >Log in</Link>
            <Link to='/register' className={cx('btn', active === 1 && 'active')} onClick={() => handleClick(1)}>Sign Up</Link>
          </div>
        }
      </div>
    </header>
  );
};

export default Header;
