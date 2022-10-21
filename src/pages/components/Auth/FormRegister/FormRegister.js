import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'

import styles from './FormRegister.module.scss';

let cx = classNames.bind(styles);

const FormRegister = (props) => {

  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(true);
  const { message } = props;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username : '',
      password: '',
      email: 'huydo400@gmail.com'
    }})

  const onSubmit = async (data) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  const handleClickToggleShowPass = () => {
    setShowPass(!showPass)
  }

  const handleClickToggleShowConfPass = () => {
    setShowConfPass(!showConfPass)
  }

  const password = useRef();
  password.current = watch("password", "");

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>SIGN UP</h1>
      <form className={cx('form_group')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('form', errors.username && 'error')}>
          <label htmlFor="identifier" className={cx('label')}>
            Username
          </label>
          <input
            id="identifier"
            type="text"
            className={cx('input')}
            spellCheck={false}
            {...register("username", {
              required: 'You must specify a username',
            })} 
          />
          {errors.username && <p className={cx('message')}>{errors.username.message}</p>}
        </div>
        <div className={cx('form', errors.password && 'error')}>
          <label htmlFor="password" className={cx('label')}>
            New Password
          </label>
          <input
            id="password"
            type={showPass ? "text" : "password"}
            className={cx('input')}
            spellCheck={false}
            autoComplete='on'
            {...register('password', {
              required: 'You must specify a password',
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters"
              }
            })}
          />
          {errors.password && <p className={cx('message')}>{errors.password.message}</p>}
          <button type='button' className={cx('btn_toggle', showPass && 'show')} onClick={handleClickToggleShowPass}>
            <i className={cx('icon_eye')}></i>
          </button>
        </div>
        <div className={cx('form', errors.conf_password && 'error')}>
          <label htmlFor="conf_password" className={cx('label')}>
            Confirm Password
          </label>
          <input
            id="conf_password"
            type={showConfPass ? "text" : "password"}
            className={cx('input')}
            spellCheck={false}
            autoComplete='on'
            ref={password}
            {...register('conf_password', {
              validate: value => value === password.current || "The passwords do not match"
            })}
          />
          <button type='button' className={cx('btn_toggle', showConfPass && 'show')} onClick={handleClickToggleShowConfPass}>
            <i className={cx('icon_eye')}></i>
          </button>
          {errors.conf_password && <p className={cx('message')}>{errors.conf_password.message}</p>}
        </div>
        {message && <p className={cx('message_submit')}>{message}</p>}
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
