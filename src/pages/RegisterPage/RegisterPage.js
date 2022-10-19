import classNames from 'classnames/bind';
import FormRegister from '../components/FormRegister';
import styles from './RegisterPage.module.scss';

let cx = classNames.bind(styles);

const RegisterPage = () => {

  const handleSubmit = (e, values) => {
    e.preventdefault();
    console.log(values);
  };

  return (
    <div className={cx('wrapper')}>
      <FormRegister onSubmit={handleSubmit} />
    </div>
  )

};

export default RegisterPage;
