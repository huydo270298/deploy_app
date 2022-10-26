import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import Controller from '../../Controller';
import usePIP from "../../../../hooks/usePip";

import styles from './VideoSection.module.scss';

let cx = classNames.bind(styles);

const VideoSection = () => {
  const listVideo = [
    {
      title: 'demo video',
      url: 'https://ia800300.us.archive.org/17/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
    },
    {
      title: 'Lil Nas X - STAR WALKIN',
      url: 'https://www.youtube.com/watch?v=kN0LtF9oWAk'
    },
    {
      title: 'Awaken | Season 2019 Cinematic - League of Legends',
      url: 'https://www.youtube.com/watch?v=zF5Ddo9JdpY'
    }
  ]

  // get add video
  /* useEffect(() => {
    (
      async () => {
        const reponse = await videoApi.getAll();
        console.log(reponse);
    })()
  }, []) */

  const countRef = useRef(null);
  const [video, setVideo] = useState(0)
  const [countdown, setCountdown] = useState(5);
  const [bookmark, setBookmark] = useState(false);
  const [prograssValue, setPrograssValue] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isStart, setIsStart] = useState(false)
  const handleCountdown = () => {
    countRef.current = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    countdown < 0 && clearInterval(countRef.current);
  }

  const handleClickBookMark = () => {
    setBookmark(!bookmark)
  }

  const handleStart = () => {
    handleCountdown();
    setIsStart(true);
  }

  const handlePrev = () => {
    setVideo(prev => prev - 1)
    clearInterval(countRef.current);
    setCountdown(5);
  }

  const handleNext = () => {
    setVideo(prev => prev + 1)
    clearInterval(countRef.current);
    setCountdown(5);
  }

  const videoElement = useRef();
  const { togglePIP } = usePIP(videoElement);
  videoElement.onProgress = (event) => {
    console.log(event);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('video')}>
        <iframe 
          src='https://olafwempe.com/mp3/silence/silence.mp3' 
          type='audio/mp3' 
          allow='autoplay' 
          id='audio' 
          title='audio'
          style={{'display': 'none'}}>
        </iframe>
        <video
          muted
          src={listVideo[video].url}
          autoPlay
          // controls
          ref={videoElement}
          className={cx('box')}
          onCanPlay ={handleStart}
          onDurationChange = {(e) => {setDuration(e.target.duration)}}
          onTimeUpdate = {(e)=> {setPrograssValue(e.target.currentTime)}}
        />
        {isStart && <Controller 
          handlePrev={handlePrev}
          handleNext={handleNext}
          handlePip={togglePIP}
          duration={duration}
          prograssValue={prograssValue}
          bookmark={bookmark}
          handleClickBookMark={handleClickBookMark}
          video={video}
          listVideo={listVideo}
          countdown={countdown}
        />}
      </div >
      <p className={cx('title')}>{listVideo[video].title}</p>
    </div>
  );
};

export default VideoSection;
