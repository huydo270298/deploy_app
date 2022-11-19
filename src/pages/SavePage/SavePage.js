import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import userApi from '../../api/userApi';
import { play } from '../../app/videoSlice';
import Pagination from '../../components/Pagination';
import StorageKeys from '../../constants/storage-keys';
import styles from './SavePage.module.scss';

let cx = classNames.bind(styles);

const SavePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useSelector(state => state.user.user)
  const queryParams = qs.parse(location.search.slice(1, location.search.length));

  const [pagination, setPagination] = useState({})
  const [listVideo, setListVideo] = useState([])
  const [page, setPage] = useState(() => ({
    ...queryParams,
    page: Number.parseInt(queryParams.page) || 1,
    size: Number.parseInt(queryParams.size) || 12,
  }))

  useEffect(() => {
    navigate({
      pathname: location.pathname,
      search: qs.stringify(page)
    });
  }, [navigate, location.pathname, page])

  // get add save videos
  useEffect(() => {
     userApi.getVideoSave(userId, page).then((res) => {
      setPagination({
        page: res.page,
        size: res.size,
        total: res.total,
      });
      setListVideo(res.data);
     })
  }, [userId, page])

  const dispatch = useDispatch();
  const handlePlayVideo = (id) => {
    try {
      const action = play(id);
      dispatch(action);
    } catch (error) {
      console.log(error)
    }
  }

  const handlePagination = (page) => {
    setPage((prevPage) => ({
      ...prevPage,
      page: page,
    }))
  }

  let total = Math.ceil(pagination.total / pagination.size);

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{t("SAVED_VIDEOS")}</h2>
      <div className={cx('content')}>
        <ul className={cx('list')}>
          {listVideo.map((video,index) => (
            <li key={index} className={cx('item')}>
              <Link to={'/'} className={cx('link')} onClick={() => handlePlayVideo(video.id)}>
                <div className={cx('img')}>
                  <img src={`${StorageKeys.PATH}/api/v1/video/thumbnail/${video.id}.png`} alt='' />
                </div>
                {/* <p className={cx('name')}>{video.videoName}</p> */}
              </Link>
            </li>
          ))}
        </ul>
        {pagination.total > 1 && <Pagination page={pagination.page} totalPages={total} handlePagination={handlePagination } />}
      </div>
    </div>
  );
};

export default SavePage;
