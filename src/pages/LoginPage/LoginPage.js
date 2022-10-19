import classNames from 'classnames/bind';
import FormLogin from '../components/FormLogin';
import styles from './LoginPage.module.scss';

let cx = classNames.bind(styles);

const LoginPage = () => {

  const handleSubmit = (e, values) => {
    e.preventdefault();
    console.log(values);
  };

  return (
    <div className={cx('wrapper')}>
      <FormLogin onSubmit={handleSubmit} />
    </div>
  )

};

export default LoginPage;
