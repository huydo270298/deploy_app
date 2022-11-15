import classNames from 'classnames/bind';
import videoApi from '../../../api/videoApi';
import styles from './Admin.module.scss';
import FormUpload from './FormUpload';

let cx = classNames.bind(styles);

const Upload = () => {

  const handleSubmit = async(values) => {
    videoApi.upload(values)
      .then((response) => {
        if (response.data.result) {
          // return handleCountdownAlert()
        }
      })
  }

  return (
    <div className={cx('content')}>
      <FormUpload onSubmit={handleSubmit} />
    </div>
  )
}

export default Upload