import classNames from 'classnames/bind';
import { useState } from 'react';
import ReactPlayer from 'react-player'

import styles from './VideoSection.module.scss';

let cx = classNames.bind(styles);

const VideoSection = () => {
  const [play, setPlay] = useState(false);
  const handleClickPlay = () => {
    setPlay(!play)
  }
  return (
    <div className={cx('wrapper')}>
      <ReactPlayer
        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
        playing={play}
        controls={false}
        volume={1}
        width='100%'
        height='auto'
        pip={true}
        className={cx('box')}
      // onPlay={() => console.log('play')}
      />
      <div className={cx('group_btn')}>
        <button className={cx('play')} onClick={handleClickPlay}>
          <i className={cx('icon_play')}></i>
        </button>
      </div>
    </div >
  );
};

export default VideoSection;
