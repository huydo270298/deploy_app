import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import spinApi from '../../../../api/spinApi';
import userApi from '../../../../api/userApi';
import { play } from '../../../../app/videoSlice';
import StorageKeys from '../../../../constants/storage-keys';
import Controller from '../../Controller';

import styles from './VideoSection.module.scss';

let cx = classNames.bind(styles);

const VideoSection = ({video}) => {
  const dispatch = useDispatch();
  const idUser = useSelector(state => state.user.user)
  const idVideo = useSelector(state=> state.video.videoId) || video[0].id
  
  const countSkipRef = useRef(null);
  const countAlertRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(false)
  const [countdownSkip, setCountdownSkip] = useState(5);
  const [bookmark, setBookmark] = useState(true);
  const [listBookmark, setListBookmark] = useState([]);
  const [prograssValue, setPrograssValue] = useState(0)
  const [duration, setDuration] = useState(0)
  const [resultSpin, setResultSpin] = useState(false)
  const [videoPlay, setvideoPlay] = useState(idVideo)

  const handleSpin = () => {

    idUser && spinApi.getResult(idUser)
      .then((response) => {
        if (response.data?.result) {
          return handleCountdownAlert()
        }
      })
  }

  useEffect(() => {
    idUser && userApi.get(idUser)
      .then((res) => {
        if (res.code === '01') {
          setListBookmark(res.data.videoSaved)
        }
      })
  
  }, [idUser])

  useEffect(() => {
    try {
      dispatch(play(idVideo));

    } catch (error) {
      console.log(error)
    }
  
  }, [dispatch, idVideo])

  useEffect(() => {
    listBookmark.includes(idVideo) ? setBookmark(true) : setBookmark(false)
  }, [idVideo, listBookmark])

  useEffect(() => {
    setvideoPlay(idVideo);
    
  }, [idVideo])

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
    idUser && userApi.addVideo(idUser, idVideo)
      .then((res) => {
        if (res.code === '01') {
          setBookmark(!bookmark)
        }
      })
  }

  const handleStart = () => {
    handleCountdownSkip();
  }

  const handlePrev = () => {
    video.forEach((item, index) => {
      if(item.id === idVideo && index > 0) {
        clearInterval(countSkipRef.current);
        setCountdownSkip(5);
        dispatch(play(video[index-1].id))
      } 
    })
  }

  const handleNext = () => {
    video.forEach((item, index) => {
      if(item.id === idVideo && index < video.length - 1) {
        clearInterval(countSkipRef.current);
        setCountdownSkip(5);
        handleSpin()
        dispatch(play(video[index+1].id))
      } 
    })
  }

  const handlePlay = () => {
    setAutoPlay(true);
    videoElement.current.play();
  }

  const videoElement = useRef();
  videoElement.onProgress = (event) => {
    
  };

  const handlePip = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      videoElement.current.requestPictureInPicture();
    }
  }
  
  useEffect(() => {
    localStorage.getItem('idVideo', idVideo || video[0].id)
  })

  
  
  return (
    <div className={cx('wrapper')}>
      <div className={cx('video')}>
        {videoPlay && <video
          muted={false}
          src={`http://${StorageKeys.PATH}/api/v1/video/stream/${videoPlay}.mp4`}
          autoPlay={autoPlay}
          ref={videoElement}
          autopictureinpicture='true'
          preload='auto'
          className={cx('box')}
          onPlaying={handleStart}
          onDurationChange={(e) => { setDuration(e.target.duration) }}
          onTimeUpdate={(e) => { setPrograssValue(e.target.currentTime) }}
          onEnded={handleSpin}
        />}
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
        {video.map((item, index) => {
          if(item.id === videoPlay) {
            return (
            <div key={index} className={cx('link_area')}>
              <a href={`https://${item.link}`} className={cx('link')}>Visit advertiser link</a>
            </div>
            )
          } else {
            return '';
          }
        })}
      </div >
    </div>
  );
};

export default VideoSection;
