import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import styles from './Select.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick'

let cx = classNames.bind(styles);

const Select = ({ currentValue, list, onChange}) => {
  const [openOption, setOpenOption] = useState(false)
  const handleClickSelect = () => {
    setOpenOption(!openOption)
  };
  
  const elSelect = useRef(null);

  useOutsideClick(elSelect, () => {
    setOpenOption(false);
  });
  console.log(elSelect);
  return (
    <div className={cx('wrapper')} ref={elSelect} >
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
