import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

let cx = classNames.bind(styles);

const Homepage = () => {
  return <div className={cx('wrapper')}>home</div>;
};

export default Homepage;
