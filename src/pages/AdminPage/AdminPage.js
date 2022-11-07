import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import videoApi from '../../api/videoApi';
import Select from '../../components/Select';
import styles from './AdminPage.module.scss';
import image from '../../assets/img_demo.png';

let cx = classNames.bind(styles);

const AdminPage = () => {
  const arrSort = ['Last 24 hours', 'This week', 'This month']
  const [sort, setSort] = useState(arrSort[0])

  const handleChangeOptionSort = (value) => {
    setSort(value)
  }

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
      <nav className={cx('menu')}>
        <h2 className={cx('title')}>Admin</h2>
        <ul className={cx('nav_lst')}>
          <li className={cx('nav_ite', 'active')}>Video Library</li>
          <li className={cx('nav_ite')}>Upload new video</li>
        </ul>
      </nav>
      <div className={cx('box')}>
        <div className={cx('filter')}>
          <div className={cx('search')}>
            <input type='text' className={cx('input')} />
            <button type='button' className={cx('btn')}>Search</button>
          </div>
          <Select 
            classNameWrapper='sort'
            classNameButton='current'
            currentValue={sort} 
            arrayData={arrSort} 
            onChange={handleChangeOptionSort} 
          />
        </div>
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
              {pageActive > 1 && <li className={cx('item', 'prev')}>&lt;</li>}
              {pageArr.map((item) => (
                <li key={item} className={cx('item', pageActive === item && 'active')} onClick={() => handleClickPage(item)} >{item}</li>
              ))}
              {pageActive < pageArr.length && <li className={cx('item', 'next')}>&gt;</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

};

export default AdminPage;
