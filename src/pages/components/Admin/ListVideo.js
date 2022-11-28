import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import qs from 'qs';
import { BinIcon, CloseIcon, PenIcon } from '../../../assets/Icons';
import styles from './Admin.module.scss';
import videoApi from '../../../api/videoApi';
import Filter from './Filter';
import Pagination from '../../../components/Pagination';
import StorageKeys from '../../../constants/storage-keys';
import { useLocation, useNavigate } from 'react-router-dom';
import Update from './Update';

let cx = classNames.bind(styles);

const ListVideo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search.slice(1, location.search.length));

  const [video, setVideo] = useState([])
  const [pagination, setPagination] = useState({})
  const [toggleModalDelete, setToggleModalDelete] = useState(false)
  const [toggleModalUpdate, setToggleModalUpdate] = useState(false)
  const [videoCurrent, setVideoCurrent] = useState({})
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

  const handleShowModalDelete = (id, index) => {
    setToggleModalDelete(true)
    setVideoCurrent({id, index})
  }

  const handleShowModalUpdate = (video) => {
    setToggleModalUpdate(true)
    setVideoCurrent(video)
  }
  const handleCloseModalDelete = () => {
    setToggleModalDelete(false)
  }

  const handleCloseModalUpdate = () => {
    setToggleModalUpdate(false);
  }

  // get all videos
  useEffect(() => {
    videoApi.getAll(page)
      .then((reponse) => {
        setPagination({
          page: reponse.page,
          size: reponse.size,
          total: reponse.total,
        });
        return reponse.data
      })
      .then((reponse) => {
        const listVideo = reponse.map((item) => {
          return {
            id: item.id,
            title: item.videoName,
            link: item.videoLink || item.videoDescription,
            order: item.orderNo
          }
        })
        setVideo(listVideo);
      })
  }, [page, toggleModalUpdate, toggleModalDelete])
  let token = localStorage.getItem(StorageKeys.TOKEN);
  
  const headers= {
      'Authorization': `Bearer ${token}`,
      'My-Custom-Header': 'foobar'
    }
  const handleDelete = () => {
    videoApi.delete(videoCurrent.id, headers)
      .then (() => {
        setToggleModalDelete(false)
        video.splice(videoCurrent.index, 1)
      })
      .then (() => {
        setVideo(video)
      })
  }

  const handlePagination = (page) => {
    setPage((prevPage) => ({
      ...prevPage,
      page: page,
    }))
  }

  let total = Math.ceil(pagination.total / pagination.size);
  return (
    <div className={cx('content')}>
      <Filter />
      <ul className={cx('list')}>
        {video.map((item, index) => (
          <li key={item.id} className={cx('item')}>
            <div className={cx('img')}>
              <img src={`${StorageKeys.PATH}/api/v1/video/thumbnail/${item.id}.png`} alt='' />
              <div className={cx('plaholder')}>
                <button type='button' className={cx('btn_control')} onClick={() => handleShowModalDelete(item.id, index)}>
                  <BinIcon className={cx('icon_custom')} />
                  Remove
                </button>
                <button type='button' className={cx('btn_control')} onClick={() => handleShowModalUpdate(video[index])}>
                  <PenIcon className={cx('icon_custom')} />
                  Edit
                </button>
              </div>
            </div>
            <p className={cx('name')}>{item.title}</p>
          </li>
        ))}
      </ul>
      {pagination.total > 1 && <Pagination page={pagination.page} totalPages={total} handlePagination={handlePagination } />}
      
      { toggleModalDelete &&
        <div className={cx('dimmed')}>
          <div className={cx('modal')}>
            <button type='button' className={cx('btn_close')} onClick={handleCloseModalDelete} >
              <CloseIcon />
            </button>
            <p className={cx('text')}>Are you sure you want to remove this video permantly?</p>
            <div className={cx('group_btn')}>
              <button type='button' className={cx('btn', 'confirm')} onClick={handleDelete}>OK</button>
              <button type='button' className={cx('btn')} onClick={handleCloseModalDelete} >Cancel</button>
            </div>
          </div>
        </div>   
      }

      { toggleModalUpdate &&
        <div className={cx('dimmed')}>
          <div className={cx('modal', 'update')}>
            <button type='button' className={cx('btn_close')} onClick={handleCloseModalUpdate} >
              <CloseIcon />
            </button>
            <Update videoCurrent={videoCurrent} />
          </div>
        </div>   
      }
    </div>
    
  )
}

export default ListVideo