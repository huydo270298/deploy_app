import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import spinApi from '../../../../api/spinApi';
import userApi from '../../../../api/userApi';
import StorageKeys from '../../../../constants/storage-keys';
import Controller from '../../Controller';

import styles from './VideoSection.module.scss';

let cx = classNames.bind(styles);

const VideoSection = ({video}) => {

  const idUser = useSelector(state => state.user.user)
  const { id } = useParams()

  const countSkipRef = useRef(null);
  const countAlertRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(false)
  const [countdownSkip, setCountdownSkip] = useState(5);
  const [bookmark, setBookmark] = useState(true);
  const [listBookmark, setListBookmark] = useState([]);
  const [prograssValue, setPrograssValue] = useState(0)
  const [duration, setDuration] = useState(0)
  const [resultSpin, setResultSpin] = useState(false)

  const handleSpin = () => {
    spinApi.getResult(idUser)
      .then((response) => {
        if (response.data?.result) {
          return handleCountdownAlert()
        }
      })
  }

  useEffect(() => {
    userApi.get(idUser)
      .then((res) => {
        if (res.code === '01') {
          setListBookmark(res.data.videoSaved)
        }
      })
  
  }, [idUser])

  useEffect(() => {
    listBookmark.includes(id) ? setBookmark(true) : setBookmark(false)
  }, [id, listBookmark])
  

  const handleCountdownSkip = () => {
    countSkipRef.current = setInterval(() => {
      setCountdownSkip((countdown) => countdown - 1);
    }, 1000);

    countdownSkip < 0 && clearInterval(countSkipRef.current);
  }

  const handleCountdownAlert = () => {
    setResultSpin(true)
    clearInterval(countAlertRef.current);
    countAlertRef.current = setTimeout(() => {
      setResultSpin(false)
    }, 3000);
  }

  const handleClickBookMark = () => {
    userApi.addVideo(idUser, id)
      .then((res) => {
        if (res.code === '01') {
          setBookmark(!bookmark)
        }
      })
  }

  const handleStart = () => {
    handleCountdownSkip();
  }

  const navigate =  useNavigate()

  const handlePrev = () => {
    video.forEach((item, index) => {
      if(item === id && index > 0) {
        clearInterval(countSkipRef.current);
        setCountdownSkip(5);
        return navigate(`/${video[index-1]}`)
      } 
    })
  }

  const handleNext = () => {
    video.forEach((item, index) => {
      if(item === id && index < video.length - 1) {
        clearInterval(countSkipRef.current);
        setCountdownSkip(5);
        handleSpin()
        return navigate(`/${video[index+1]}`)
      } 
    })
  }

  const handlePlay = () => {
    setAutoPlay(true);
    videoElement.current.play();
  }

  const videoElement = useRef();
  videoElement.onProgress = (event) => {
    // console.log(event);
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
          src={`http://${StorageKeys.PATH}/api/v1/video/stream/${id}.mp4`}
          autoPlay={autoPlay}
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
          play={autoPlay}
          listVideo={video}
          countdown={countdownSkip}
        />
        {resultSpin && <p className={cx('alert')}>Sorry! You have not won the prize yet</p>}
      </div >
    </div>
  );
};

export default VideoSection;
