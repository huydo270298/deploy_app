import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';

import { Outlet } from 'react-router-dom';
import Nav from '../components/Admin/Nav';

let cx = classNames.bind(styles);

const AdminPage = () => {

  return (
    <div className={cx('wrapper')}>
      {<div className={cx('inner')}>
        <Nav />
        <div className={cx('box')}>
          <Outlet/>
        </div>
      </div>}
    </div>
  )

};

export default AdminPage;
