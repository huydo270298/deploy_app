import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'

import FormRegister from '../components/Auth/FormRegister/FormRegister';
import { register } from '../components/userSlice';
import styles from './RegisterPage.module.scss';

let cx = classNames.bind(styles);

const RegisterPage = () => {

  const dispatch = useDispatch();

  const handleSubmit = async(values) => {
    console.log(values);
    
    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log(user);
    } catch (error) {
      console.log('error');
    }
  }

  return (
    <div className={cx('wrapper')}>
      <FormRegister onSubmit={handleSubmit} />
    </div>
  )

};

export default RegisterPage;
