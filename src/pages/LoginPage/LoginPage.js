import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import FormLogin from '../components/Auth/FormLogin';
import { login } from '../components/userSlice';
import styles from './LoginPage.module.scss';

let cx = classNames.bind(styles);

const LoginPage = () => {

  const dispatch = useDispatch();

  const handleSubmit = async(values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log(user);
    } catch (error) {
      console.log('error');
    }
  }

  return (
    <div className={cx('wrapper')}>
      <FormLogin onSubmit={handleSubmit} />
    </div>
  )

};

export default LoginPage;
