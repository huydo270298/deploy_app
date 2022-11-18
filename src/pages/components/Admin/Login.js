import classNames from 'classnames/bind';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormLogin from '../Auth/FormLogin';
import { login } from '../Auth/userSlice';
import styles from './Admin.module.scss';

let cx = classNames.bind(styles);

const Login = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [mesError, setMesError] = useState('')

  const handleSubmit = async(values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      if(resultAction.payload.code === '02') {
        setMesError(resultAction.payload.message)
      } else if (resultAction.payload.data.userInfo.roleName === 'ADMIN') {
        return navigate("/admin/dashboard");
      } else {
        setMesError('Username or password incorrect.')
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
}

export default Login