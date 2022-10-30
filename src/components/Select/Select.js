import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import styles from './Select.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick'
import { ArrowBotIcon } from '../../assets/Icons/Icons';

let cx = classNames.bind(styles);

const Select = ({ currentValue, arrayData, onChange }) => {
  const [openOption, setOpenOption] = useState(false)

  const handleClickSelect = () => {
    setOpenOption(!openOption)
  };

  const elSelect = useRef(null);

  useOutsideClick(elSelect, () => {
    setOpenOption(false);
  });

  return (
    <div className={cx('wrapper')} ref={elSelect} >
      <button type="button" className={cx('btn')} onClick={handleClickSelect}>
        {currentValue}
        <ArrowBotIcon className={cx('icon_arrow')} />
      </button>
      {openOption && <div className={cx('option')}>
        <ul className={cx('list')}>
          {arrayData.map((item, index) => {
            if (typeof (item) === 'object') {
              return (
                <li
                  key={index}
                  className={cx('item', (item.country === currentValue && 'active'))}
                  onClick={() => {
                    onChange(item.country);
                    handleClickSelect()
                  }}
                >
                  {item.country}
                </li>
              )
            } else {
              return (
                <li
                  key={index}
                  className={cx('item', item === currentValue && 'active')}
                  onClick={() => {
                    onChange(item);
                    handleClickSelect()
                  }}
                >
                  {item}
                </li>
              )
            }
          })}
        </ul>
      </div>}
    </div>
  );
};

export default Select;
