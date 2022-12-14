import classNames from 'classnames/bind';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { PaypalIcon, PlateIcon } from '../../../assets/Icons';
// import Select from '../../../components/Select';
import styles from './SpinModal.module.scss';

let cx = classNames.bind(styles);
const SpinModal = () => {
  const { t } = useTranslation();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // }

  // const [arrCountry, setArrCountry] = useState([])
  // const [country, setCountry] = useState('Vietnam');
  // get add all Country
  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: 'https://countriesnow.space/api/v0.1/countries',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //     .then((response) => {
  //       setArrCountry(response.data.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [])

  // const handleChangeOptionCountry = (value) => {
  //   setCountry(value)
  // }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('exchange')}>
          1USD = 500
          <PlateIcon className={cx('icon_plate')} />
        </div>
        <div className={cx('bank')}>
          <dl>
            <dt>
              ACB VISA:
              </dt>
            <dd>5251627</dd>
            <dd>(Dang Hong Quan)</dd>
          </dl>
          <dl>
            <dt>
              <PaypalIcon className={cx('icon_paypal')} />
              PAYPAL:
            </dt>
            <dd>hquanpk555@gmail.com</dd>
          </dl>
        </div>
        {/* <form className={cx('form_group')} onSubmit={handleSubmit}>
          <div className={cx('form')}>
            <div htmlFor="address" className={cx('label')}>
            {t("COUNTRY")}
            </div>
            <Select currentValue={country} arrayData={arrCountry} onChange={handleChangeOptionCountry} />
          </div>
        </form> */}
        <p className={cx('note')}>{t("SPIN_DESC")}</p>
        <button type='submit' className={cx('submit')}>{t("TOP_UP")}</button>
      </div>
    </div>
  )
}

export default SpinModal