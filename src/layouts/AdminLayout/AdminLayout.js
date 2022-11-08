import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.scss';

let cx = classNames.bind(styles);

const AdminLayout = () => {
  let navigate = useNavigate();
  const user = useSelector(state => state.user)

  useEffect(()=> {
    if(user?.current.data?.roleName !== 'ADMIN') {
      return navigate("/admin/login")
    }
  },[user, navigate])

  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <h1 className={cx('logo')}><Link to='/' className={cx('link')} ></Link></h1>
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
