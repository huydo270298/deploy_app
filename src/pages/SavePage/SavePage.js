import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userApi from '../../api/userApi';
import { play } from '../../app/videoSlice';
import Pagination from '../../components/Pagination';
import StorageKeys from '../../constants/storage-keys';
import styles from './SavePage.module.scss';

let cx = classNames.bind(styles);

const SavePage = () => {
  const { t } = useTranslation();
  const userId = useSelector(state => state.user.user)

  const [listVideo, setListVideo] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,
    size: 0,
    total: 0,
  })

  // get add save videos
  useEffect(() => {
     userApi.get(userId).then((res) => {
      setListVideo(res.data.videoSaved);
     })
  }, [userId])

  const handlePagination = () => {
    // setToggleModal(false)
  }

  const dispatch = useDispatch();
  const handlePlayVideo = (video) => {
    try {
      const action = play(video);
      dispatch(action);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{t("SAVED_VIDEOS")}</h2>
      <div className={cx('content')}>
        <ul className={cx('list')}>
          {listVideo.map((video,index) => (
            <li key={index} className={cx('item')}>
              <Link to={`/`} className={cx('link')} onClick={() => handlePlayVideo(video)}>
                <div className={cx('img')}>
                  <img src={`http://${StorageKeys.PATH}/api/v1/video/thumbnail/${video}.png`} alt='' />
                </div>
                <p className={cx('name')}>{video.title}</p>
              </Link>
            </li>
          ))}
        </ul>
        {pagination.page > 1 && <Pagination page={pagination.page} totalPages={pagination.total} handlePagination={handlePagination } />}
      </div>
    </div>
  );
};

export default SavePage;
