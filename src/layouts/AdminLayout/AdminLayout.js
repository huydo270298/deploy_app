import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.scss';

let cx = classNames.bind(styles);

const AdminLayout = () => {
  let navigate = useNavigate();
  const location = useLocation()
  
  const admin = useSelector(state => state.user.admin)
  useEffect(()=> {
    if(!admin) {
      navigate("/admin/login")
    } else if(location.pathname === '/admin') {
      navigate("/admin/dashboard")
    }
  },[admin, navigate, location.pathname])

  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <div className={cx('inner')}>
          <h1 className={cx('logo')}><Link to='/' className={cx('link')} ></Link></h1>
        </div>
      </header>
      <main className={cx('container')}>
        <div className={cx('inner')}>
          <Outlet />
        </div>
      </main>
      {/* <Footer/> */}
    </div>
  );
};

export default AdminLayout;
