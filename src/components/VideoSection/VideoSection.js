import classNames from 'classnames/bind';
import ReactPlayer from 'react-player'

import styles from './VideoSection.module.scss';

let cx = classNames.bind(styles);

const VideoSection = () => {
  
  return (
    <ReactPlayer 
      url='https://www.youtube.com/watch?v=DVVIKctYZ68' 
      playing={true} 
      volume={1}
      width='100%'
      height='auto'
      className={cx('wrapper')}
    />
  );
};

export default VideoSection;
