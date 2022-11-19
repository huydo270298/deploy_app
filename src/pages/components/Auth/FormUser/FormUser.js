import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from '../../../../components/Select';

import styles from './FormUser.module.scss';

let cx = classNames.bind(styles);

const FormUser = ({ onSubmit, info }) => {
  const { t } = useTranslation();

  const arrSex = ['Male', 'Female']

  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState( '');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName(info?.fullName || '')
    setSex(info?.sex || 'Male')
    setBirthday(info?.dateOfBirth || '')
    setCountry(info?.country || 'Vietnam')
    setCity(info?.city || 'Hanoi')
    setAddress(info?.address || '')
    setPhone(info?.phoneNumber || '')
    setLink(info?.link || '')
  }, [info])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      // ...info,
      fullName: name,
      sex: sex,
      dateOfBirth: birthday,
      country: country,
      city: city,
      address: address,
      phoneNumber: phone,
      link: link,
      id: info.id
    }
    
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleChangeOptionSex = (value) => {
    setSex(value)
  }

  // get add all Country
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://countriesnow.space/api/v0.1/countries',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  }, [country])

  return (
    <form className={cx('form_group')} onSubmit={handleSubmit}>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <label htmlFor="name" className={cx('label')}>
            {t("FULLNAME")}
          </label>
          <input
            id="name"
            type="text"
            className={cx('input')}
            defaultValue={name}
            spellCheck={false}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <div htmlFor="sex" className={cx('label')}>
            {t("SEX")}
          </div>
          <Select currentValue={sex} arrayData={arrSex} onChange={handleChangeOptionSex} />
        </div>
        <div className={cx('form')}>
          <label htmlFor="dateOfBirth" className={cx('label')}>
            {t("DATEOFBIRTH")}
          </label>
          <input
            id="dateOfBirth"
            type="text"
            placeholder="DD/MM/YY"
            className={cx('input')}
            defaultValue={birthday}
            spellCheck={false}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
      </div>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <label htmlFor="country" className={cx('label')}>
            {t("COUNTRY")}
          </label>
          <input
            id="country"
            type="text"
            className={cx('input')}
            defaultValue={country || 'Vietnamese'}
            spellCheck={false}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className={cx('form')}>
          <label htmlFor="city" className={cx('label')}>
            {t("CITY")}
          </label>
          <input
            id="city"
            type="text"
            className={cx('input')}
            defaultValue={city || 'Hanoi'}
            spellCheck={false}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <label htmlFor="address" className={cx('label')}>
            {t("ADDRESS")}
          </label>
          <input
            name="address"
            type="text"
            defaultValue={address}
            className={cx('input')}
            spellCheck={false}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <label htmlFor="phone" className={cx('label')}>
            {t("PHONE")}
          </label>
          <input
            name="phone"
            type="text"
            defaultValue={phone}
            className={cx('input')}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={cx('form')}>
          <label htmlFor="link" className={cx('label')}>
            {t("LINK")} &#40; Facebook,...&#41;
          </label>
          <input
            name="link"
            type="text"
            defaultValue={link}
            className={cx('input')}
            spellCheck={false}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className={cx('submit')}>
        {t("SAVE")}
      </button>
    </form>
  );
};

export default FormUser;
