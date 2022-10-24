import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import videoApi from '../../../api/videoApi';

import styles from './VideoSection.module.scss';

let cx = classNames.bind(styles);

const VideoSection = () => {
  const listVideo = [
    {
      title: 'Top 50 Remix Nghe Nhiều 2022 💘 Bên Trên Tầng Lầu, Bắt Cóc Con Tim, Xin Má Rước Dâu, Mặt Trời Khóc',
      url: 'https://www.youtube.com/watch?v=ZTJScH-jawM'
    },
    {
      title: '20 Bài Hát Hot Nhất TikTok Hiện Nay | Top EDM TikTok Hay Nhất 2022 | Nhạc Trẻ Remix Hot Tiktok 2022',
      url: 'https://www.youtube.com/watch?v=XIbkVsSX23I'
    },
    {
      title: 'NHẠC TRẺ MASHUP TIKTOK 2022 HAY NHẤT - Dương Lan Nhi, Linh Hương, Anh Thư, Yulim Trần, Minh Anh',
      url: 'https://www.youtube.com/watch?v=pt3L21X0lR4'
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
  const [video, setVideo] = useState(1)
  const [countdown, setCountdown] = useState(5);
  const [bookmark, setBookmark] = useState(false)

  const handlecountdown = () => {
    countRef.current = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    countdown < 0 && clearInterval(countRef.current);
  }

  const handleClickPrev = () => {
    setVideo(prev => prev - 1)
    clearInterval(countRef.current);
    setCountdown(5);
  }

  const handleClickNext = () => {
    setVideo(prev => prev + 1)
    clearInterval(countRef.current);
    setCountdown(5);
  }

  const handleClickBookMark = () => {
    setBookmark(!bookmark)
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('video')}>
        <ReactPlayer
          url={listVideo[video].url}
          playing={true}
          controls={false}
          volume={1}
          loop={false}
          muted
          width='100%'
          height='auto'
          className={cx('box')}
          onStart={handlecountdown}
        />
        <div className={cx('group_btn')}>
          <button type='button' className={cx('btn', 'bookmark', bookmark && 'active')} onClick={handleClickBookMark}>
            <i className={cx('icon_bookmark')}></i>
          </button>
          <button type='button' className={cx('btn', 'prev', video === 0 && 'disable' )} onClick={handleClickPrev}>
            <i className={cx('icon_prev')}></i>
          </button>
          { video !== (listVideo.length - 1) && 
            <button type='button' className={cx('btn', 'skip', !(countdown >= 0) && 'active')} onClick={handleClickNext}>
              {countdown >= 0 ? `${countdown}s` : 'SKIP'}
              <i className={cx('icon_plate')}></i>
              <i className={cx('icon_skip')}></i>
            </button>
          }
        </div>
      </div >
      <p className={cx('title')}>{listVideo[video].title}</p>
    </div>
  );
};

export default VideoSection;
