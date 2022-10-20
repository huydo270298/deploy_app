import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import FormUser from '../components/Auth/FormUser/FormUser';
import styles from './UserPage.module.scss';
import { push } from '../components/userSlice';

let cx = classNames.bind(styles);

const UserPage = () => {

  const dispatch = useDispatch();

  const handleSubmit = async(values) => {
    try {
      const action = push(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log(user);
    } catch (error) {
      console.log('error');
    }
  }

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>PERSONAL INFORMATION</h2>
      <p className={cx('note')}>Note: You can not get the prize if the information is wrong</p>
      <FormUser onSubmit={handleSubmit} />
    </div>
  );
};

export default UserPage;
