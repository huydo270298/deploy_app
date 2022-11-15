import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import FormUser from '../components/Auth/FormUser/FormUser';
import styles from './UserPage.module.scss';
import { update } from '../components/Auth/userSlice.js';
import { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import { useTranslation } from 'react-i18next';

let cx = classNames.bind(styles);

const UserPage = () => {
  const { t } = useTranslation();

  const [info, setInfo] = useState({})
  const id = useSelector(state => state.user.user)
  useEffect(() => {
    (
      async () => {
        try {
          const result = await userApi.get(id);
          setInfo(result.data)
        } catch(error) {
          console.log('Failed to fetch product', error);
        }
      }
    )()
  }, [id]);
  const dispatch = useDispatch();
  
  const handleSubmit = async(values) => {
    try {
      const action = update(values);
      const resultAction = await dispatch(action);
      resultAction.payload.code === '01' && alert('Update success')
      
    } catch (error) {
      console.log('error');
    }
  }

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{t("PERSONAL_TIT")}</h2>
      <p className={cx('note')}>{t("PERSONAL_NOTE")}</p>
      <FormUser onSubmit={handleSubmit} info={info} />
    </div>
  );
};

export default UserPage;
