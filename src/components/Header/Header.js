import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

import styles from './Header.module.scss';
import { LangIcon, SaveIcon, UserIcon } from '../../assets/Icons';
// import Countdown from '../../pages/components/Countdown';
import { Lang } from './Lang'
import { change } from '../../app/langSlice';

let cx = classNames.bind(styles);

const Header = () => {
  const loggedInUser = useSelector(state => state.user.user);
  
  const isLoggedInUser = !!loggedInUser;

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  
  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    dispatch(change(lang))
  }
  
  const [openOption, setOpenOption] = useState(false)
  let valueLang = localStorage.getItem('i18nextLng') || 'en';

  const handleClickSelect = () => {
    setOpenOption(!openOption)
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner', isLoggedInUser && 'loggedin'
      )}>
        <h1 className={cx('logo')}><Link to='/' className={cx('link')} ></Link></h1>
        {/* <Countdown time={'2022-11-23 15:00:00'} /> */}
        {
          isLoggedInUser &&
          <div className={cx('btn_group', 'type')}>
            <Link to="/bookmarks" className={cx('btn', 'btn_save')}>
              <SaveIcon />
              {/* SAVE */}
            </Link>
            <Link to="/user" className={cx('btn', 'btn_user')}>
              <UserIcon />
              {/* PROFILE */}
            </Link>
          </div>
        } 

        {
          !isLoggedInUser &&
          <div className={cx('btn_group', 'type2')}>
            <Link to='/login' className={cx('btn', 'login')} >{t("LOGIN")}</Link>
            <Link to='/register' className={cx('btn')}>{t("SIGN_UP")}</Link>
          </div>
        }

        <div className={cx('btn', 'btn_lang')}>
          <button type="button" className={cx('btn')} onClick={handleClickSelect}>
            <LangIcon />
          </button>
          {openOption && <div className={cx('option')}>
            <ul className={cx('list')}>
              {Lang.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={cx('item', (item.id === valueLang && 'active'))}
                    onClick={() => {
                      handleChangeLang(item.id);
                      handleClickSelect();
                    }}
                  >
                    {item.name}
                  </li>
                )
              })}
            </ul>
          </div>}
        </div>
      </div>
    </header>
  );
};

export default Header;
