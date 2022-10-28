import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import videoApi from '../../api/videoApi'
import styles from './SavePage.module.scss';
import image from '../../assets/img_demo.png'; 

let cx = classNames.bind(styles);

const SavePage = () => {
  const pageArr = [1, 2, 3, 4, 5]
  const [listVideo, setListVideo] = useState([])
  const [pageActive, setPageActive] = useState(2)
// get add save videos
  useEffect(() => {
    (
      async () => {
        const reponse = await videoApi.getAll({
          _start: 0,
          _limit: 10
        });
        setListVideo(reponse);
    })()
  }, [])

  const handleClickPage = (item) => {
    setPageActive(item)
  }

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Saved Videos</h2>
      <div className={cx('content')}>
        <ul className={cx('list')}>
          {listVideo.map((video) => (
            <li key={video.id} className={cx('item')}>
              {/* <img src={video.src} alt='' className={cx('img')} />
              <p className={cx('name')}>{video.title}</p> */}

              <img src={image} alt='' className={cx('img')} />
              <p className={cx('name')}>How to make youtube thumbnail that work</p>
            </li>
          ))}
        </ul>
        <div className={cx('pagination')}>
          <ul>
            { pageActive > 1 && <li className={cx('btn', 'prev')}>&lt;</li>}
            {pageArr.map((item) => (
              <li key={item} className={cx('btn', pageActive === item && 'active' )} onClick={() => handleClickPage(item)} >{item}</li>
            ))}
            { pageActive < pageArr.length && <li className={cx('btn', 'next')}>&gt;</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavePage;
