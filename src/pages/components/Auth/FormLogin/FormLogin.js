import classNames from 'classnames/bind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { EyeHideIcon, EyeShowIcon } from '../../../../assets/Icons';

import styles from './FormLogin.module.scss';

let cx = classNames.bind(styles);

const FormUser = (props) => {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  const { message } = props

  const defaultValues = {
    username: '',
    password: '',
  };

  const handleClickToggleShowPass = () => {
    setShowPass(!showPass)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    defaultValues.username = name;
    defaultValues.password = pass;
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(defaultValues);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>{t("LOGIN")}</h1>
      <form className={cx('form_group')} onSubmit={handleSubmit}>
        <div className={cx('form')}>
          <label htmlFor="identifier" className={cx('label')}>
            {t("USERNAME")}
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
            {t("PASSWORD")}
          </label>
          <input
            id="password"
            type={showPass ? "text" : "password"}
            className={cx('input')}
            defaultValue={pass}
            autoComplete="on"
            onChange={(e) => setPass(e.target.value)}
          />
          <button type='button' className={cx('btn_toggle')} onClick={handleClickToggleShowPass}>
            {showPass ? <EyeShowIcon /> : <EyeHideIcon />}
          </button>
          <p className={cx('message')}>{message}</p>
        </div>
        <button type="submit" className={cx('submit')}>
          {t("LOGIN")}
        </button>
      </form >
      <p className={cx('sub')}>
        {t("DONT_ACCOUNT")}&nbsp;
        <Link to='/register' className={cx('link')}>{t("SIGN_UP")}</Link>
      </p>
    </div >
  );
};

export default FormUser;
