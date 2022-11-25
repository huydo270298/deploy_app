import classNames from 'classnames/bind';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon } from '../../../assets/Icons';
import styles from './Admin.module.scss';

let cx = classNames.bind(styles);

const Nav = () => {

  const [toggleMenu, setToggleMenu] = useState(false)

  const handleClickMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleHideMenu = () => {
    setToggleMenu(false)
  }
  return (
    <div className={cx('menu_box')}>
      <nav className={cx('menu', toggleMenu && 'show')}>
        <h2 className={cx('title')}>Admin</h2>
        <div className={cx('nav_lst')}>
          <NavLink to="/admin/dashboard" end className={(nav) => cx('nav_ite', { active: nav.isActive })} onClick={handleHideMenu}>Video Library</NavLink>
          <NavLink to="/admin/dashboard/upload" className={(nav) => cx('nav_ite', { active: nav.isActive })} onClick={handleHideMenu}>Upload new video</NavLink>
          <NavLink to="/admin/dashboard/user" className={(nav) => cx('nav_ite', { active: nav.isActive })} onClick={handleHideMenu}>Users</NavLink>
        </div>
      </nav>
      <button type="button" className={cx('btn_menu')} onClick={handleClickMenu}>
        <MenuIcon className={cx('icon_menu')} />  
        Menu
      </button>
    </div>
  )
}

export default Nav