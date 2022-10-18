import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './CommonLayout.module.scss';

let cx = classNames.bind(styles);

const CommonLayout = () => {
  return (
    <>
      <Header />
      <main className={cx('container')}>
        <div className={cx('inner')}>
          <Outlet />
        </div>
      </main>
      {/* <Footer/> */}
    </>
  );
};

export default CommonLayout;
