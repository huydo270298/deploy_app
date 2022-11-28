import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import spinApi from '../../../../api/spinApi';
import userApi from '../../../../api/userApi';
import videoApi from '../../../../api/videoApi';
import { play } from '../../../../app/videoSlice';
import StorageKeys from '../../../../constants/storage-keys';
import Controller from '../../Controller';

import styles from './VideoSection.module.scss';

let cx = classNames.bind(styles);

const VideoSection = ({video, idCategory}) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idUser = useSelector(state => state.user.user);
  const idVideo = useSelector(state=> state.video.videoId) || video[0]?.id;
  
  const countSkipRef = useRef(null);
  const countAlertRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(false)
  const [countdownSkip, setCountdownSkip] = useState(5);
  const [bookmark, setBookmark] = useState(true);
  const [listBookmark, setListBookmark] = useState([]);
  const [prograssValue, setPrograssValue] = useState(0)
  const [duration, setDuration] = useState(0)
  const [resultSpin, setResultSpin] = useState(false)
  const [messageSpin, setMessageSpin] = useState('')

  const handleSpin = () => {
    if(idUser) {
      spinApi.getResult(idUser)
        .then((response) => {
          let result = response.data.result;
          result === 'Lose'? setMessageSpin(t("LOST")) : setMessageSpin('');
        }  
      );
    } else {
      setMessageSpin(t("LOST"));
    }
    handleCountdownAlert();
  }

  useEffect(() => {
    idUser && userApi.getInfo(idUser)
      .then((res) => {
        if (res.code === '01') {
          setListBookmark(res.data.videoSaved)
        }
      })
  
  }, [dispatch, idUser])

  useEffect(() => {
    listBookmark.includes(idVideo) ? setBookmark(true) : setBookmark(false)
  }, [idVideo, listBookmark])

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
    idUser && !bookmark && userApi.addVideo(idUser, idVideo)
      .then((res) => {
        if (res.code === '01') {
          setBookmark(true)
        }
      })

    idUser && bookmark && userApi.removeVideo(idUser, idVideo)
      .then((res) => {
        if (res.code === '01') {
          setBookmark(false)
        }
      })
  }

  const handleStart = () => {
    handleCountdownSkip();
  }

  const [prevListVideo, setPrevListVideo] = useState([]);
  const [playedListVideo, setPlayedListVideo] = useState([]);
  // useEffect(() => {
  //   if(!playedListVideo.includes(idVideo)) {
  //     setPlayedListVideo(prev => [...prev, idVideo]);
  //   }
  // });

  const handleAddPrevVideo = () => {
    setPrevListVideo(prev => [...prev, idVideo]);
  }

  

  const handlePrev = () => {
    if(prevListVideo.length > 1) {
      dispatch(play(prevListVideo[prevListVideo.length-1]))
      clearInterval(countSkipRef.current);
      setCountdownSkip(5);
      setPrevListVideo(prevListVideo.filter((item, index) => {
        return item !== prevListVideo[prevListVideo.length - 1];
      }))
      if(prevListVideo.length === 2) {
        handleAddPrevVideo();
      }
    }
  }

  const handleNext = () => {
    videoApi.getCategoryItem(idCategory).then((res) => res.data)
      .then(data => {
        for(let i=0; i <= data.length; i++) {
          if(!playedListVideo.includes(data[i].id)) {
            dispatch(play(data[i].id));
            break;
          }
        }
      })
    clearInterval(countSkipRef.current);
    setCountdownSkip(5);
    handleSpin();
    handleAddPrevVideo();
  }

  const handlePlay = () => {
    handleAddPrevVideo();
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
    localStorage.getItem('idVideo', idVideo || video[0]?.id)
  })
  
  return (
    <div className={cx('wrapper')}>
      <div className={cx('video')}>
        {idVideo && <video
          muted={false}
          src={`${StorageKeys.PATH}/api/v1/video/stream/${idVideo}.mp4`}
          autoPlay={autoPlay}
          ref={videoElement}
          autopictureinpicture='true'
          // preload='auto'
          className={cx('box')}
          onPlaying={()=> {
            handleStart();
            setPlayedListVideo(prev => [...prev, idVideo]);
          }}
          onDurationChange={(e) => { setDuration(e.target.duration) }}
          onTimeUpdate={(e) => { setPrograssValue(e.target.currentTime) }}
          onEnded={handleSpin}
          playsInline
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
        {resultSpin && <p className={cx('alert')}>{messageSpin}</p>}
        {video.map((item, index) => {
          if(item.id === idVideo) {
            return (
            <div key={index} className={cx('link_area')}>
              <a href={`${item.link}`} className={cx('link')}>{t("VISIT_LINK")}</a>
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
