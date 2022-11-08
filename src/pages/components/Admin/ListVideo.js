import classNames from 'classnames/bind';
import { BinIcon, CloseIcon, PenIcon } from '../../../assets/Icons';
import styles from './Admin.module.scss';
import image from '../../../assets/img_demo.png';
import { useEffect, useState } from 'react';
import videoApi from '../../../api/videoApi';
import Filter from './Filter';

let cx = classNames.bind(styles);

const ListVideo = () => {
  const [listVideo, setListVideo] = useState([])
  const pageArr = [1, 2, 3, 4, 5]
  const [pageActive, setPageActive] = useState(2)
  const [toggleModal, setToggleModal] = useState(false)

  const handleClickPage = (item) => {
    setPageActive(item)
  }

  const handleShowModal = () => {
    setToggleModal(true)
  }

  const handleCloseModal = () => {
    setToggleModal(false)
  }

  // get all videos
  useEffect(() => {
    (
      async () => {
        const reponse = await videoApi.getAll({
          page: 1,
          size: 0
        });
        setListVideo(reponse.data);
      })()
  }, [])

  return (
    <div className={cx('content')}>
      <Filter />
      <ul className={cx('list')}>
        {listVideo.map((video) => (
          <li key={video.id} className={cx('item')}>
            {/* <img src={video.src} alt='' className={cx('img')} />
            <p className={cx('name')}>{video.title}</p> */}
            <div className={cx('img')}>
              <img src={image} alt='' />
              <div className={cx('dimmer')}>
                <button type='button' className={cx('btn_control')} onClick={handleShowModal}>
                  <BinIcon />
                  Remove
                </button>
                <button type='button' className={cx('btn_control')}>
                  <PenIcon />
                  Edit
                </button>
              </div>
            </div>
            <p className={cx('name')}>How to make youtube thumbnail that work</p>
          </li>
        ))}
      </ul>
      <div className={cx('pagination')}>
        <ul>
          {pageActive > 1 && <li className={cx('item', 'prev')}>&lt;</li>}
          {pageArr.map((item) => (
            <li key={item} className={cx('item', pageActive === item && 'active')} onClick={() => handleClickPage(item)} >{item}</li>
          ))}
          {pageActive < pageArr.length && <li className={cx('item', 'next')}>&gt;</li>}
        </ul>
      </div>
      { toggleModal &&
            <div className={cx('dimmed')}>
              <div className={cx('modal')}>
                <button type='button' className={cx('btn_close')} onClick={handleCloseModal} >
                  <CloseIcon />
                </button>
                <p className={cx('text')}>Are you sure you want to remove this video permantly?</p>
                <div className={cx('group_btn')}>
                  <button type='button' className={cx('btn', 'confirm')}>OK</button>
                  <button type='button' className={cx('btn')} onClick={handleCloseModal} >Cancel</button>
                </div>
              </div>
            </div>  
          }
    </div>
    
  )
}

export default ListVideo