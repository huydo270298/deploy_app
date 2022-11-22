import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import qs from 'qs';
import { CloseIcon } from '../../../assets/Icons';
import styles from './Admin.module.scss';
import Filter from './Filter';
import Pagination from '../../../components/Pagination';
import StorageKeys from '../../../constants/storage-keys';
import { useLocation, useNavigate } from 'react-router-dom';
import userApi from '../../../api/userApi';

let cx = classNames.bind(styles);

const ListUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search.slice(1, location.search.length));

  const [user, setUser] = useState([])
  const [pagination, setPagination] = useState({})
  const [toggleModalDelete, setToggleModalDelete] = useState(false)
  const [toggleModalDetail, setToggleModalDetail] = useState(false)
  const [userCurrent, setUserCurrent] = useState({})
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

  const handleShowModalDelete = (item) => {
    setToggleModalDelete(true)
    setUserCurrent(item)
  }

  const handleShowModalDetail = (item) => {
    setToggleModalDetail(true)
    setUserCurrent(item)
  }

  const handleCloseModalDelete = () => {
    setToggleModalDelete(false)
  }

  const handleCloseModalUpdate = () => {
    setToggleModalDetail(false);
  }

  // get all videos
  useEffect(() => {
    userApi.getAll(page)
      .then((reponse) => {
        setPagination({
          page: reponse.page,
          size: reponse.size,
          total: reponse.total,
        });
        return reponse.data
      })
      .then((reponse) => {
        const listUser = reponse.map((item) => {
          return item
        })
        setUser(listUser);
      })
  }, [page, toggleModalDetail, toggleModalDelete])
  let token = localStorage.getItem(StorageKeys.TOKEN);
  
  const headers= {
      'Authorization': `Bearer ${token}`,
      'My-Custom-Header': 'foobar'
    }
  const handleDelete = () => {
    userApi.delete(userCurrent.id, headers)
      .then (() => {
        setToggleModalDelete(false)
        user.splice(userCurrent.index, 1)
      })
      .then (() => {
        setUser(user)
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
      <Filter placeholder={'Username / ID'}/>
      <div className={cx('user_area')}>
        <table>
          <colgroup>
            <col style={{'width': '72px'}}/>
            <col style={{'width': '241px'}}/>
            <col style={{'width': '270px'}}/>
            <col style={{'width': '150px'}}/>
            <col/>
            <col style={{'width': '269px'}}/>
          </colgroup>
          <thead>
            <tr>
              <th>Order</th>
              <th>ID</th>
              <th>User Name</th>
              <th>Phone number</th>
              <th>Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => (
              <tr key={item.id} className={cx('tr')}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.phone}</td>
                <td>{item.link ? <a href={item.link} className={cx('link')}>{item.link}</a> : ''}</td>
                <td>
                  <button type='button' className={cx('view_details')} onClick={() => handleShowModalDetail(item)}>View details</button>
                  <button type='button' className={cx('btn_delete')} onClick={() => handleShowModalDelete(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      {pagination.total > 1 && <Pagination page={pagination.page} totalPages={total} handlePagination={handlePagination } />}
      
      { toggleModalDelete &&
        <div className={cx('dimmed')}>
          <div className={cx('modal')}>
            <button type='button' className={cx('btn_close')} onClick={handleCloseModalDelete} >
              <CloseIcon />
            </button>
            <p className={cx('text')}>Are you sure you want to delete this user permantly?</p>
            <div className={cx('group_btn')}>
              <button type='button' className={cx('btn', 'confirm')} onClick={handleDelete}>OK</button>
              <button type='button' className={cx('btn')} onClick={handleCloseModalDelete} >Cancel</button>
            </div>
          </div>
        </div>   
      }

      { toggleModalDetail &&
        <div className={cx('dimmed')}>
          <div className={cx('modal', 'info')}>
            <button type='button' className={cx('btn_close')} onClick={handleCloseModalUpdate} >
              <CloseIcon />
            </button>
            <div className={cx('info_area')}>
              <h2 className={cx('tit')}>Personal Information</h2>
              <div className={cx('info_box')}>
                <dl>
                  <dt>Full Name</dt>
                  <dd>{userCurrent.fullName}</dd>
                </dl>
                <dl>
                  <dt>Sex</dt>
                  <dd>{userCurrent.sex}</dd>
                </dl>
                <dl>
                  <dt>Date Of Birth</dt>
                  <dd>{userCurrent.dateOfBirth}</dd>
                </dl>
                <dl>
                  <dt>Country</dt>
                  <dd>{userCurrent.country}</dd>
                </dl>
                <dl>
                  <dt>City/Province</dt>
                  <dd>{userCurrent.city}</dd>
                </dl>
                <dl>
                  <dt>Address</dt>
                  <dd>{userCurrent.address}</dd>
                </dl>
                <dl>
                  <dt>Phone Number</dt>
                  <dd>{userCurrent.fullName}</dd>
                </dl>
                <dl>
                  <dt>Link ( Ex: Facebook,...)</dt>
                  <dd>{userCurrent.link}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>   
      }
    </div>
    
  )
}

export default ListUser