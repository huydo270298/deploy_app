import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Admin.module.scss';

let cx = classNames.bind(styles);

const Nav = () => {

  return (
    <nav className={cx('menu')}>
      <h2 className={cx('title')}>Admin</h2>
      <div className={cx('nav_lst')}>
        <NavLink to="/admin/dashboard" end className={(nav) => cx('nav_ite', { active: nav.isActive })} >Video Library</NavLink>
        <NavLink to="/admin/dashboard/upload" className={(nav) => cx('nav_ite', { active: nav.isActive })} >Upload new video</NavLink>
        <NavLink to="/admin/dashboard/user" className={(nav) => cx('nav_ite', { active: nav.isActive })} >Users</NavLink>
      </div>
    </nav>
  )
}

export default Nav