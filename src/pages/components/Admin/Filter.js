import classNames from 'classnames/bind';
import { useState } from 'react';
import { SearchIcon } from '../../../assets/Icons';
import Select from '../../../components/Select';
import styles from './Admin.module.scss';

let cx = classNames.bind(styles);

const Filter = () => {
  const arrSort = ['Last 24 hours', 'This week', 'This month']
  const [sort, setSort] = useState(arrSort[0])

  const handleChangeOptionSort = (value) => {
    setSort(value)
  }
  return (
    <div className={cx('filter')}>
      <div className={cx('search')}>
        <input type='text' className={cx('input')} />
        <button type='button' className={cx('btn_search')}>Search</button>
        <button type='button' className={cx('btn_search', 'mo')}>
          <SearchIcon className={cx('icon_search')} />
        </button>
      </div>
      <Select 
        classNameWrapper='sort'
        classNameButton='current'
        currentValue={sort} 
        arrayData={arrSort} 
        onChange={handleChangeOptionSort} 
      />
    </div>
  )
}

export default Filter