import classNames from 'classnames/bind';
import { useState } from 'react';
import Select from '../../../../components/Select';

import styles from './FormUser.module.scss';

let cx = classNames.bind(styles);

const FormUser = (props) => {
  const arrSex = ['Male', 'Female']
  const arrCountry = ['Việt Nam', 'Thái Lan', 'Singapore', 'Malaysia']
  const defaultValues = {
    username: '',
    sex: '',
    dateOfBirth: '',
    country: '',
    city: '',
    address: '',
    phone: '',
    link: ''
  };

  const [name, setName] = useState('Nguyễn Văn Anh');
  const [sex, setSex] = useState(arrSex[0]);
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState(arrCountry[0]);
  const [address, setAddress] = useState('No.12, Alley24, Đại Mỗ, Nam Từ Liêm');
  const [phone, setPhone] = useState('0345759994');
  const [link, setLink] = useState('http://abc');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      ...defaultValues,
      username: name,
      sex: sex,
      dateOfBirth: birthday,
      country: country,
      city: country,
      address: address,
      phone: phone,
      link: link,
    }
    defaultValues.username = name;
    const { onSubmit } = props;
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
          <Select currentValue={sex} list={arrSex} onChange={handleChangeOptionSex} />
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
          <Select currentValue={country} list={arrCountry} onChange={handleChangeOptionCountry} />
        </div>
        <div className={cx('form')}>
          <div htmlFor="address" className={cx('label')}>
            City/Province
          </div>
          <Select currentValue={country} list={arrCountry} onChange={handleChangeOptionCountry} />
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
