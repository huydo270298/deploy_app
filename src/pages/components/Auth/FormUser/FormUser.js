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
  const defaultValues = {
    id: '',
    sex: '',
    dateOfBirth: '',
    country: '',
    city: '',
    address: '',
    phoneNumber: '',
    link: ''
  };

  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [arrCountry, setArrCountry] = useState([])
  const [country, setCountry] = useState('');
  const [arrCities, setArrCities] = useState( )
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
      ...defaultValues,
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
    defaultValues.username = name;
    
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleChangeOptionSex = (value) => {
    setSex(value)
  }

  const handleChangeOptionCountry = (value) => {
    setCountry(value)
  }

  const handleChangeOptionCities = (value) => {
    setCity(value)
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
      .then((response) => {
        setArrCountry(response.data.data);
        setArrCities(response.data.data.filter((item) => {
          return item.country === country
        })[0]?.cities)
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
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
      </div>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <div htmlFor="address" className={cx('label')}>
            {t("COUNTRY")}
          </div>
          <Select currentValue={country} arrayData={arrCountry} onChange={handleChangeOptionCountry} />
        </div>
        <div className={cx('form')}>
          <div htmlFor="address" className={cx('label')}>
            {t("CITY")}
          </div>
          <Select currentValue={city} nation={country} arrayData={arrCities} onChange={handleChangeOptionCities} />
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
