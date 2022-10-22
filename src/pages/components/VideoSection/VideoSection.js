import classNames from 'classnames/bind';
import { useState } from 'react';
import ReactPlayer from 'react-player'

import styles from './VideoSection.module.scss';

let cx = classNames.bind(styles);

const VideoSection = () => {
  const [play, setPlay] = useState(false);
  const [skip, setSkip] = useState(5)

  const handlecountdown = () => {
    const interval = setInterval(() => {
      setSkip((counter) => counter - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }

  const handleClickPlay = () => {
    setPlay(!play)
  }
  return (
    <div className={cx('wrapper')}>
      <ReactPlayer
        url={[
          'https://www.youtube.com/watch?v=ZTJScH-jawM',
          'https://www.youtube.com/watch?v=XIbkVsSX23I'
        ]}
        playing={true}
        controls={false}
        volume={1}
        width='100%'
        height='auto'
        className={cx('box')}
        onStart={handlecountdown}
      />
      <div className={cx('group_btn')}>
        <button className={cx('skip')} onClick={handleClickPlay}>
          {skip >= 0 ? `${skip}s` : 'SKIP'}
          <i className={cx('icon_plate')}></i>
          <i className={cx('icon_skip')}></i>
        </button>
      </div>
    </div >
  );
};

export default VideoSection;
