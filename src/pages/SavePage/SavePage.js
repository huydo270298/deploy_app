import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import videoApi from '../../api/videoApi'
import styles from './SavePage.module.scss';

let cx = classNames.bind(styles);

const SavePage = () => {
  const pageArr = [1, 2, 3, 4, 5]
  const [listVideo, setListVideo] = useState([])
  const [pageActive, setPageActive] = useState(1)

  // get add save videos
  useEffect(() => {
    videoApi.getCategoryList()
      .then((reponse) => {
        // const id = reponse.data[0].id;
        return reponse.data[0].id
      })
      .then((id) => {
        return videoApi.getCategoryItem(id)
      })
      .then((reponse) => {
        const listId = reponse.data.map((item) => {
          return {
            id: item.id,
            title: item.videoName
          }
        })
        setListVideo(listId);
      })
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
              <img src={`http://103.187.168.186:8027/api/v1/video/thumbnail/${video.id}.png`} alt='' className={cx('img')} />
              <p className={cx('name')}>{video.title}</p>
            </li>
          ))}
        </ul>
        <div className={cx('pagination')}>
          <ul>
            {pageActive > 1 && <li className={cx('btn', 'prev')}>&lt;</li>}
            {pageArr.map((item) => (
              <li key={item} className={cx('btn', pageActive === item && 'active')} onClick={() => handleClickPage(item)} >{item}</li>
            ))}
            {pageActive < pageArr.length && <li className={cx('btn', 'next')}>&gt;</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavePage;
