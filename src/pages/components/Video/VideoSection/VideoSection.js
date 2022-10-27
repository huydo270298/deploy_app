import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import Controller from '../../Controller';
// import usePIP from "../../../../hooks/usePip";

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

  const countSkipRef = useRef(null);
  const countAlertRef = useRef(null);
  const [video, setVideo] = useState(0)
  const [countdownSkip, setCountdownSkip] = useState(5);
  const [countdownAlert, setCountdownAlert] = useState(2);
  const [bookmark, setBookmark] = useState(false);
  const [prograssValue, setPrograssValue] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isStart, setIsStart] = useState(false)
  const handleCountdownSkip = () => {
    countSkipRef.current = setInterval(() => {
      setCountdownSkip((countdown) => countdown - 1);
    }, 1000);

    countdownSkip < 0 && clearInterval(countSkipRef.current);
  }

  const handleCountdownAlert = () => {
    countAlertRef.current = setInterval(() => {
      setCountdownAlert((countdown) => countdown - 1);
    }, 1000);

    countdownAlert < 0 && clearInterval(countAlertRef.current);
  }

  const handleClickBookMark = () => {
    setBookmark(!bookmark)
  }

  const handleStart = () => {
    handleCountdownSkip();
    setIsStart(true);
  }

  const handleLoadAlert = () => {
    handleCountdownAlert()
    setCountdownAlert(2);
  }

  const handlePrev = () => {
    setVideo(prev => prev - 1)
    clearInterval(countSkipRef.current);
    setCountdownSkip(5);
  }

  const handleNext = () => {
    setVideo(prev => prev + 1)
    clearInterval(countSkipRef.current);
    setCountdownSkip(5);
  }

  const videoElement = useRef();
  // const { togglePIP } = usePIP(videoElement);
  videoElement.onProgress = (event) => {
    console.log(event);
  };

  const handlePip = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      videoElement.current.requestPictureInPicture();
    }
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('video')}>
        <video
          muted
          src={listVideo[video].url}
          autoPlay
          // controls
          ref={videoElement}
          className={cx('box')}
          onPlaying={handleStart}
          onCanPlay={handleLoadAlert}
          onDurationChange = {(e) => {setDuration(e.target.duration)}}
          onTimeUpdate = {(e)=> {setPrograssValue(e.target.currentTime)}}
        />
        {isStart && <Controller 
          handlePrev={handlePrev}
          handleNext={handleNext}
          // handlePip={togglePIP}
          handlePip={handlePip}
          duration={duration}
          prograssValue={prograssValue}
          bookmark={bookmark}
          handleClickBookMark={handleClickBookMark}
          video={video}
          listVideo={listVideo}
          countdown={countdownSkip}
        />}
        {countdownAlert >= 0 && <p className={cx('alert')}>Sorry! You have not won the prize yet</p>}
      </div >
      <p className={cx('title')}>{listVideo[video].title}</p>
    </div>
  );
};

export default VideoSection;
