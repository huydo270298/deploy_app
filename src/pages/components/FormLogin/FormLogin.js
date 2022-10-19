import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './FormLogin.module.scss';

let cx = classNames.bind(styles);

const FormUser = () => {
  const defaultValues = {
    name: '',
    dateOfBirth: '',
    phone: '',
    address: '',
  };

  const [name, setName] = useState('Nguyễn Văn Anh');
  const [pass, setPass] = useState('@a1245');
  const [showPass, setShowPass] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleClickToggleShowPass = () => {
    setShowPass(!showPass)
  }

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>LOG IN</h1>
      <form className={cx('form_group')} onSubmit={onSubmit}>
        <div className={cx('form')}>
          <label htmlFor="identifier" className={cx('label')}>
            Usename
          </label>
          <input
            id="identifier"
            type="text"
            className={cx('input')}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={cx('form')}>
          <label htmlFor="password" className={cx('label')}>
            Password
          </label>
          <input
            id="password"
            type={showPass ? "text" : "password"}
            className={cx('input')}
            defaultValue={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type='button' className={cx('btn_toggle', showPass && 'show')} onClick={handleClickToggleShowPass}>
            <i className={cx('icon_eye')}></i>
          </button>
        </div>
        <button type="submit" className={cx('submit')}>
          LOG IN
        </button>
      </form >
      <p className={cx('sub')}>
        Don’t have an account?&nbsp;
        <Link to='/register' className={cx('link')}>Sign Up</Link>
      </p>
    </div >
  );
};

export default FormUser;
