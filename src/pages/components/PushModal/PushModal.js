import classNames from 'classnames/bind';
import React, { useState } from 'react'
import Select from '../../../components/Select';
import styles from './PushModal.module.scss';

let cx = classNames.bind(styles);

const PushModal = () => {
  const arrCountry = ['Việt Nam', 'Thái Lan', 'Singapore', 'Malaysia'];
  const arrCard = ['Visa', 'ATM', 'Master']

  const [country, setCountry] = useState(arrCountry[0]);
  const [card, setCard] = useState(arrCard[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChangeOptionCountry = (value) => {
    setCountry(value)
  }

  const handleChangeOptionCard = (value) => {
    setCard(value)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('exchange')}>
        1USD = 500
        <i className={cx('icon_plate')}></i>
      </div>
      <form className={cx('form_group')} onSubmit={handleSubmit}>
        <div className={cx('form')}>
          <div htmlFor="address" className={cx('label')}>
            Country
          </div>
          <Select currentValue={country} list={arrCountry} onChange={handleChangeOptionCountry} />
        </div>
        <div className={cx('form')}>
          <div htmlFor="address" className={cx('label')}>
            Card
          </div>
          <Select currentValue={card} list={arrCard} onChange={handleChangeOptionCard} />
        </div>
      </form>
      <button type='submit' className={cx('submit')}>TOP UP</button>
    </div>
  )
}

export default PushModal