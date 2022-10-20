import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './FormRegister.module.scss';

let cx = classNames.bind(styles);

const FormRegister = (props) => {

  const [name, setName] = useState('Nguyễn Văn Anh');
  const [pass, setPass] = useState('@a1245');
  const [confPass, setConfPass] = useState('@a1245');
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(true);

  const defaultValues = {
    username : '',
    password: '',
    email: 'huydo@gmail.com'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    defaultValues.username = name;
    defaultValues.password = pass;
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(defaultValues);
    }
  };

  const handleClickToggleShowPass = () => {
    setShowPass(!showPass)
  }

  const handleClickToggleShowConfPass = () => {
    setShowConfPass(!showConfPass)
  }

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>SIGN UP</h1>
      <form className={cx('form_group')} onSubmit={handleSubmit}>
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
            New Password
          </label>
          <input
            id="password"
            type={showPass ? "text" : "password"}
            className={cx('input')}
            defaultValue={pass}
            autoComplete='on'
            onChange={(e) => setPass(e.target.value)}
          />
          <button type='button' className={cx('btn_toggle', showPass && 'show')} onClick={handleClickToggleShowPass}>
            <i className={cx('icon_eye')}></i>
          </button>
        </div>
        <div className={cx('form')}>
          <label htmlFor="conf_password" className={cx('label')}>
            Confirm Password
          </label>
          <input
            id="conf_password"
            type={showConfPass ? "text" : "password"}
            className={cx('input')}
            defaultValue={confPass}
            autoComplete='on'
            onChange={(e) => setConfPass(e.target.value)}
          />
          <button type='button' className={cx('btn_toggle', showConfPass && 'show')} onClick={handleClickToggleShowConfPass}>
            <i className={cx('icon_eye')}></i>
          </button>
        </div>
        <button type="submit" className={cx('submit')}>
          Sign up
        </button>
      </form>
      <p className={cx('sub')}>
        Already have an account?&nbsp;
        <Link to='/login' className={cx('link')}>Log In</Link>
      </p>
    </div>
  );
};

export default FormRegister;
