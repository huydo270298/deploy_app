import classNames from 'classnames/bind';
import VideoSection from '../../components/VideoSection';
import styles from './HomePage.module.scss';

let cx = classNames.bind(styles);

const Homepage = () => {
  return (
    <div className={cx('wrapper')}>
      <VideoSection />
      <div className={cx('group')}>
        <button type='button' className={cx('btn', 'get_spin')}>Get more spin turns</button>
        <button type='button' className={cx('btn', 'push')}>Push Ads</button>
        <button type='button' className={cx('btn', 'add')}>+1000<i className={cx('icon_plate')}></i></button>
      </div>
      <div className={cx('reward')}>
        <i className={cx('icon_cup')}></i>
        10.000 USD
        <button className={cx('btn_help')}>
          <i className={cx('icon_help')}></i>
        </button>
      </div>
    </div>
  )
  
};

export default Homepage;
