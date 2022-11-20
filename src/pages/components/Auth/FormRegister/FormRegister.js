import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'

import styles from './FormRegister.module.scss';
import { EyeHideIcon, EyeShowIcon } from '../../../../assets/Icons';
import { useTranslation } from 'react-i18next';

let cx = classNames.bind(styles);

const FormRegister = (props) => {
  const { t } = useTranslation();

  const [showPass, setShowPass] = useState(false);
  const { message } = props;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  const handleClickToggleShowPass = () => {
    setShowPass(!showPass)
  }

  const password = useRef();
  password.current = watch("password", "");

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>{t("SIGN_UP")}</h1>
      <form className={cx('form_group')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('form', errors.username && 'error')}>
          <label htmlFor="identifier" className={cx('label')}>
          {t("USERNAME")}
          </label>
          <input
            id="identifier"
            type="text"
            className={cx('input')}
            spellCheck={false}
            {...register("username", {
              required: t("VALIDATION_USERNAME_REQUIRED"),
            })}
          />
          {errors.username && <p className={cx('message')}>{errors.username.message}</p>}
        </div>
        <div className={cx('form', errors.password && 'error')}>
          <label htmlFor="password" className={cx('label')}>
          {t("N_PASSWORD")}
          </label>
          <input
            id="password"
            type={showPass ? "text" : "password"}
            className={cx('input')}
            spellCheck={false}
            autoComplete='on'
            {...register('password', {
              required: t("VALIDATION_PASS_REQUIRED"),
              minLength: {
                value: 6,
                message: t("VALIDATION_PASS_LENGTH")
              }
            })}
          />
          {errors.password && <p className={cx('message')}>{errors.password.message}</p>}
          <button type='button' className={cx('btn_toggle')} onClick={handleClickToggleShowPass}>
            {showPass ? <EyeShowIcon /> : <EyeHideIcon />}
            <i className={cx('icon_eye')}></i>
          </button>
        </div>
        {message && <p className={cx('message_submit')}>{message && t("USER_ALREADY")}</p>}
        <button type="submit" className={cx('submit')}>
          {t("SIGN_UP")}
        </button>
      </form>
      <p className={cx('sub')}>
        {t("ALREADY_ACCOUNT")}&nbsp;
        <Link to='/login' className={cx('link')}>{t("LOGIN")}</Link>
      </p>
    </div>
  );
};

export default FormRegister;
