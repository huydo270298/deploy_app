import axios from 'axios';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react'
import { PlateIcon } from '../../../assets/Icons';
import Select from '../../../components/Select';
import styles from './SpinModal.module.scss';

let cx = classNames.bind(styles);
  const SpinModal = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const [arrCountry, setArrCountry] = useState([])
  const [country, setCountry] = useState('Vietnam');
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
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  const handleChangeOptionCountry = (value) => {
    setCountry(value)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('exchange')}>
          1USD = 500
          <PlateIcon className={cx('icon_plate')} />
        </div>
        <form className={cx('form_group')} onSubmit={handleSubmit}>
          <div className={cx('form')}>
            <div htmlFor="address" className={cx('label')}>
              Country
            </div>
            <Select currentValue={country} arrayData={arrCountry} onChange={handleChangeOptionCountry} />
          </div>
        </form>
        <p className={cx('note')}>You need to leave information in the notes in case of asking for a transfer, we will contact you through the information provided.</p>
        <button type='submit' className={cx('submit')}>TOP UP</button>
      </div>
    </div>
  )
}

export default SpinModal