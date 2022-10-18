import classNames from 'classnames/bind';
import React from 'react';
import styles from './Select.module.scss';

let cx = classNames.bind(styles);

const Select = ({ currentValue, list }) => {
  const handleClickSelect = () => {};
  return (
    <div className={cx('wrapper')}>
      <button type="button" onClick={handleClickSelect}>
        {currentValue}
      </button>
      <div className={cx('option')}>
        <ul className={cx('list')}>
          {/* {list.map((item, index) => (
            <li key={index} className={cx('item')} onClick={onChange}>
              {item}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default Select;
