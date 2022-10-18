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
      <h2 className={cx('title')}>THÔNG TIN CÁ NHÂN</h2>
      <p className={cx('note')}>Lưu ý: Nhập sai thông tin sẽ không thể được nhận giải</p>
      <FormUser onSubmit={handleSubmit} />
    </div>
  );
};

export default UserPage;
