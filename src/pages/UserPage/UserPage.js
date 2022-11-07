import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import FormUser from '../components/Auth/FormUser/FormUser';
import styles from './UserPage.module.scss';
import { update } from '../components/Auth/userSlice.js';
import { useEffect, useState } from 'react';
import userApi from '../../api/userApi';

let cx = classNames.bind(styles);

const UserPage = () => {

  const [info, setInfo] = useState({})
  const id = useSelector(state => state.user.current.data.id)
  useEffect(() => {
    (
      async () => {
        try {
          const result = await userApi.get(id);
          setInfo(result)
        } catch(error) {
          console.log('Failed to fetch product', error);
        }
      }
    )()
  }, [id]);
  const dispatch = useDispatch();

  const handleSubmit = async(values) => {
    try {
      const action = update(values);
      const resultAction = await dispatch(action);
      console.log(resultAction);
      // const user = unwrapResult(resultAction);
      // console.log(user);
    } catch (error) {
      console.log('error');
    }
  }

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>PERSONAL INFORMATION</h2>
      <p className={cx('note')}>Note: You can not get the prize if the information is wrong</p>
      <FormUser onSubmit={handleSubmit} info={info} />
    </div>
  );
};

export default UserPage;
