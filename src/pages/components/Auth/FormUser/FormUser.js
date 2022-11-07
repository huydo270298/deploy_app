import axios from 'axios';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Select from '../../../../components/Select';

import styles from './FormUser.module.scss';

let cx = classNames.bind(styles);

const FormUser = (props) => {
  const { onSubmit, info } = props;

  console.log(info);

  const arrSex = ['Male', 'Female']
  const defaultValues = {
    sex: '',
    dateOfBirth: '',
    country: '',
    city: '',
    address: '',
    phoneNumber: '',
    link: ''
  };

  const [name, setName] = useState(info.fullName || '');
  const [sex, setSex] = useState(info.sex || arrSex[0]);
  const [birthday, setBirthday] = useState(info.dateOfBirth || '');
  const [arrCountry, setArrCountry] = useState([])
  const [country, setCountry] = useState( info.country || 'Vietnam');
  const [arrCities, setArrCities] = useState( )


  const [city, setCity] = useState(info.city || 'Hanoi');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(info.phoneNumber || '');
  const [link, setLink] = useState(info.link || '');

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
            Full Name
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
            SEX
          </div>
          <Select currentValue={sex} arrayData={arrSex} onChange={handleChangeOptionSex} />
        </div>
        <div className={cx('form')}>
          <label htmlFor="dateOfBirth" className={cx('label')}>
            Date Of Birth
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
            Country
          </div>
          <Select currentValue={country} arrayData={arrCountry} onChange={handleChangeOptionCountry} />
        </div>
        <div className={cx('form')}>
          <div htmlFor="address" className={cx('label')}>
            City/Province
          </div>
          <Select currentValue={city} nation={country} arrayData={arrCities} onChange={handleChangeOptionCities} />
        </div>
      </div>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <label htmlFor="address" className={cx('label')}>
            Address
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
            Phone Number
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
            Link &#40; Ex: Facebook,...&#41;
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
        Save
      </button>
    </form>
  );
};

export default FormUser;
