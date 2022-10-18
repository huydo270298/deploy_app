import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './Select.module.scss';

let cx = classNames.bind(styles);

const Select = ({ currentValue, list, onChange }) => {
  const [openOption, setOpenOption] = useState(false)
  const handleClickSelect = () => {
    setOpenOption(!openOption)
  };
  return (
    <div className={cx('wrapper')}>
      <button type="button" className={cx('btn')} onClick={handleClickSelect}>
        {currentValue}
      </button>
      {openOption && <div className={cx('option')}>
        <ul className={cx('list')}>
          {list.map((item, index) => (
            <li
              key={index}
              className={cx('item', item === currentValue && 'active')}
              onClick={() => {
                onChange(item);
                handleClickSelect()
              }}>
              {item}
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
};

export default Select;
