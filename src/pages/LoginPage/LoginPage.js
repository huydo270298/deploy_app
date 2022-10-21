import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import FormLogin from '../components/Auth/FormLogin';
import { login } from '../components/userSlice';
import styles from './LoginPage.module.scss';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

let cx = classNames.bind(styles);

const LoginPage = () => {

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [mesError, setMesError] = useState('')

  const handleSubmit = async(values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      if (user) {
        return navigate("/");
      }
    } catch (error) {
      setMesError(error)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <FormLogin onSubmit={handleSubmit} message={mesError} />
    </div>
  )

};

export default LoginPage;
