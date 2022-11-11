import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import videoApi from '../../api/videoApi'
import Pagination from '../../components/Pagination';
import styles from './SavePage.module.scss';

let cx = classNames.bind(styles);

const SavePage = () => {
  const pageArr = [1, 2, 3, 4, 5]
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
        // const id = reponse.data[0].id;
        return reponse.data[0].id
      })
      .then((id) => {
        return videoApi.getCategoryItem(id)
      })
      .then((reponse) => {
        console.log(reponse);
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
      <h2 className={cx('title')}>Saved Videos</h2>
      <div className={cx('content')}>
        <ul className={cx('list')}>
          {listVideo.map((video) => (
            <li key={video.id} className={cx('item')}>
              <Link to={`/${video.id}`}>
                <div className={cx('img')}>
                  <img src={`http://103.187.168.186:8027/api/v1/video/thumbnail/${video.id}.png`} alt='' />
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
