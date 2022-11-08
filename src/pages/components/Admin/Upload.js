import classNames from 'classnames/bind';
import styles from './Admin.module.scss';

let cx = classNames.bind(styles);

const Upload = () => {

  return (
    <div className={cx('content')}>
      <h3 className={cx('tit')}>Video</h3>
      <div className={cx('cont')}>

      </div>
      <h3 className={cx('tit')}>Video title</h3>
      <div className={cx('cont')}>
        <input type='text' className={cx('inp')} />
      </div>
    </div>
  )
}

export default Upload