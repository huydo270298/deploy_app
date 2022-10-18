import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './FormUser.module.scss';

let cx = classNames.bind(styles);

const FormUser = () => {
  const defaultValues = {
    name: '',
    dateOfBirth: '',
    phone: '',
    address: '',
  };

  const [name, setName] = useState('Nguyễn Văn Anh');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(1);
  };
  return (
    <form className={cx('form_group')} onSubmit={onSubmit}>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <label htmlFor="name" className={cx('label')}>
            Họ tên
          </label>
          <input
            id="name"
            type="text"
            className={cx('input')}
            defaultValue={name}
            /* onChange={(e) => setName(e.target.value)}  */
          />
        </div>
      </div>
      {/* <div className={cx('line')}>
        <div className={cx('form')}>
          <label htmlFor="dateOfBirth" className={cx('label')}>
            Ngày sinh
          </label>
          <input id="dateOfBirth" name="dateOfBirth" type="text" placeholder="DD/MM/YY" className={cx('input')} />
        </div>
      </div>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <label htmlFor="address" className={cx('label')}>
            Địa chỉ
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={'Số nhà 12 ngõ 24 phường Đại Mỗ, Nam Từ Liêm'}
            className={cx('input')}
          />
        </div>
      </div>
      <div className={cx('line')}>
        <div className={cx('form')}>
          <label htmlFor="phone" className={cx('label')}>
            Số điện thoại
          </label>
          <input id="phone" name="phone" type="text" value={'0345759994'} className={cx('input')} />
        </div>
        <div className={cx('form')}>
          <label htmlFor="link" className={cx('label')}>
            Link ( VD: facebook,...)
          </label>
          <input id="link" name="link" type="text" value={'http://abc'} className={cx('input')} />
        </div>
      </div> */}
      <button type="submit" className={cx('submit')}>
        LƯU THÔNG TIN
      </button>
    </form>
  );
};

export default FormUser;
