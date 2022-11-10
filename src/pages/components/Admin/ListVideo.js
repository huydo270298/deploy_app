import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { BinIcon, CloseIcon, PenIcon } from '../../../assets/Icons';
import styles from './Admin.module.scss';
import videoApi from '../../../api/videoApi';
import Filter from './Filter';
import Pagination from '../../../components/Pagination';

let cx = classNames.bind(styles);

const ListVideo = () => {
  const [video, setVideo] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,
    size: 0,
    total: 0,
  })
  const [toggleModal, setToggleModal] = useState(false)
  const [videoCurrent, setVideoCurrent] = useState({id: 0, index: 0})

  const handleShowModal = (id, index) => {
    setToggleModal(true)
    setVideoCurrent({id, index})
  }

  const handleCloseModal = () => {
    setToggleModal(false)
  }

  // get all videos
  useEffect(() => {
    videoApi.getAll()
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
          }
        })
        setVideo(listVideo);
      })
  }, [])
  
  const handleDelete = () => {
    videoApi.delete(videoCurrent.id)
      .then (() => {
        setToggleModal(false)
        video.splice(videoCurrent.index, 1)
      })
      .then (() => {
        setVideo(video)
      })
  }

  const handlePagination = () => {
    setToggleModal(false)
  }
  return (
    <div className={cx('content')}>
      <Filter />
      <ul className={cx('list')}>
        {video.map((item) => (
          <li key={item.id} className={cx('item')}>
            <div className={cx('img')}>
              <img src={`http://103.187.168.186:8027/api/v1/video/thumbnail/${item.id}.png`} alt='' />
              <div className={cx('plaholder')}>
                <button type='button' className={cx('btn_control')} onClick={() => handleShowModal(item.id)}>
                  <BinIcon />
                  Remove
                </button>
                <button type='button' className={cx('btn_control')}>
                  <PenIcon />
                  Edit
                </button>
              </div>
            </div>
            <p className={cx('name')}>{item.title}</p>
          </li>
        ))}
      </ul>
      {pagination.page > 1 && <Pagination page={pagination.page} totalPages={pagination.total} handlePagination={handlePagination } />}
      
      { toggleModal &&
        <div className={cx('dimmed')}>
          <div className={cx('modal')}>
            <button type='button' className={cx('btn_close')} onClick={handleCloseModal} >
              <CloseIcon />
            </button>
            <p className={cx('text')}>Are you sure you want to remove this video permantly?</p>
            <div className={cx('group_btn')}>
              <button type='button' className={cx('btn', 'confirm')} onClick={handleDelete}>OK</button>
              <button type='button' className={cx('btn')} onClick={handleCloseModal} >Cancel</button>
            </div>
          </div>
        </div>   
      }
    </div>
    
  )
}

export default ListVideo