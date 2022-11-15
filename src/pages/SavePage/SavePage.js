import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import videoApi from '../../api/videoApi'
import Pagination from '../../components/Pagination';
import StorageKeys from '../../constants/storage-keys';
import styles from './SavePage.module.scss';

let cx = classNames.bind(styles);

const SavePage = () => {
  const { t } = useTranslation();

  const [listVideo, setListVideo] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,
    size: 0,
    total: 0,
  })

  // get add save videos
  useEffect(() => {
    videoApi.getCategoryList()
      .then((reponse) => {
        return reponse.data[0].id
      })
      .then((id) => {
        return videoApi.getCategoryItem(id)
      })
      .then((reponse) => {
        const listId = reponse.data.map((item) => {
          setPagination({
            page: reponse.data.page,
            size: reponse.data.size,
            total: reponse.data.total,
          });
          return {
            id: item.id,
            title: item.videoName,
          }
        })
        setListVideo(listId);
      })
  }, [])

  const handlePagination = () => {
    // setToggleModal(false)
  }

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{t("SAVED_VIDEOS")}</h2>
      <div className={cx('content')}>
        <ul className={cx('list')}>
          {listVideo.map((video) => (
            <li key={video.id} className={cx('item')}>
              <Link to={`/${video.id}`} className={cx('link')}>
                <div className={cx('img')}>
                  <img src={`http://${StorageKeys.PATH}/api/v1/video/thumbnail/${video.id}.png`} alt='' />
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
