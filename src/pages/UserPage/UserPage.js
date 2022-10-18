import classNames from 'classnames/bind';
import FormUser from '../../components/FormUser';
import styles from './UserPage.module.scss';

let cx = classNames.bind(styles);

const UserPage = () => {
  const handleSubmit = (e, values) => {
    e.preventdefault();
    console.log(values);
  };

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>PERSONAL INFORMATION</h2>
      <p className={cx('note')}>Note: You can not get the prize if the information is wrong</p>
      <FormUser onSubmit={handleSubmit} />
    </div>
  );
};

export default UserPage;
