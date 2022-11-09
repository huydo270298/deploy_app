import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import spinApi from '../../../../api/spinApi';
import videoApi from '../../../../api/videoApi';
import Controller from '../../Controller';

import styles from './VideoSection.module.scss';

let cx = classNames.bind(styles);

const VideoSection = () => {
  const [video, setVideo] = useState([])
  const [currentPlay, setCurrentPlay] = useState(0)

  const idUser = useSelector(state => state.user.user)
  // get add video
    useEffect(() => {
      videoApi.getCategoryList()
          .then((reponse) => {
            // const id = reponse.data[0].id;
            return reponse.data[0].id
          })
          .then ((id) => {
            return videoApi.getCategoryItem(id)
          })
          .then ((reponse) => {
            const listId = reponse.data.map((item) => {
              return item.id
            })
            setVideo(listId);
          })
  }, [])

  const countSkipRef = useRef(null);
  const countAlertRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(false)
  const [countdownSkip, setCountdownSkip] = useState(5);
  const [countdownAlert, setCountdownAlert] = useState(3);
  const [bookmark, setBookmark] = useState(false);
  const [prograssValue, setPrograssValue] = useState(0)
  const [duration, setDuration] = useState(0)
  const [resultSpin, setResultSpin] = useState(false)
  
  const handleSpin = () => {
    spinApi.getResult(idUser)
      .then((response) => {
        if(response.data.result) {
          return handleCountdownAlert()
        }
      })
      
      
  }

  const handleCountdownSkip = () => {
    countSkipRef.current = setInterval(() => {
      setCountdownSkip((countdown) => countdown - 1);
    }, 1000);

    countdownSkip < 0 && clearInterval(countSkipRef.current);
  }

  const handleCountdownAlert = () => {
    
    countAlertRef.current = setInterval(() => {
      setResultSpin(true)
      setCountdownAlert((countdown) => countdown - 1);
    }, 1000);
    countdownAlert < 0 && clearInterval(countAlertRef.current);
    countdownAlert < 0 && setResultSpin(false);
  }

  const handleClickBookMark = () => {
    setBookmark(!bookmark)
  }

  const handleStart = () => {
    handleCountdownSkip();
  }

  // const handleLoadAlert = () => {
  //   handleCountdownAlert()
  //   setCountdownAlert(3);
  // }

  const handlePrev = () => {
    setCurrentPlay(prev => prev - 1)
    clearInterval(countSkipRef.current);
    setCountdownSkip(5);
  }

  const handleNext = () => {
    setCurrentPlay(prev => prev + 1)
    clearInterval(countSkipRef.current);
    setCountdownSkip(5);
    handleSpin()
  }

  const handlePlay = () => {
    setAutoPlay(true);
    videoElement.current.play();
  }

  const videoElement = useRef();
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
          muted={false}
          src={`http://103.187.168.186:8027/api/v1/video/stream/${video[currentPlay]}.mp4`}
          autoPlay={autoPlay}
          // controls
          ref={videoElement}
          className={cx('box')}
          onPlaying={handleStart}
          onDurationChange={(e) => { setDuration(e.target.duration) }}
          onTimeUpdate={(e) => { setPrograssValue(e.target.currentTime) }}
          onEnded={handleSpin}
        />
        <Controller
          handlePrev={handlePrev}
          handleNext={handleNext}
          handlePlay={handlePlay}
          handlePip={handlePip}
          duration={duration}
          prograssValue={prograssValue}
          bookmark={bookmark}
          handleClickBookMark={handleClickBookMark}
          currentPlay={currentPlay}
          play={autoPlay}
          listVideo={video}
          countdown={countdownSkip}
        />
        {resultSpin && <p className={cx('alert')}>Sorry! You have not won the prize yet</p>}
      </div >
      {/* <p className={cx('title')}>{listVideo[video].title}</p> */}
    </div>
  );
};

export default VideoSection;
