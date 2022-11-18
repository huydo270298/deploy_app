import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { UploadIcon } from '../../../assets/Icons';
import StorageKeys from '../../../constants/storage-keys';

let cx = classNames.bind(styles);

const Update = ({videoCurrent}) => {
  console.log(videoCurrent);
  const valueTitleVideo = useRef('');
  const valueLinkVideo = useRef('');
  const fileInputRef = useRef();
  const progressRef = useRef();
  const uploadRef = useRef();

  const [showProgress, setShowProgress] = useState(false);

  const handleSubmit = async (e) => {
    let token = localStorage.getItem(StorageKeys.TOKEN);
    e.preventDefault();
    setShowProgress(true);
    uploadRef.current.innerHTML = "File Uploading...";
    axios
      .put(`http://${StorageKeys.PATH}/api/v1/video/update` , {
        id: videoCurrent.id,
        videoName: valueTitleVideo.current.value,
        videoDescription: valueLinkVideo.current.value,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
          progressRef.current.style.width = `${uploadPercentage}%`;
          if (uploadPercentage === 100) {
            uploadRef.current.innerHTML = "File updated";
            setShowProgress(false)
          }
        }
      })
      .catch(() => {
        progressRef.current.style.backgroundColor = "red";
      });
  };

  return (
    <div className={cx('content')}>
      <form className={cx('form')} onSubmit={handleSubmit} encType="multipart/form-data">
        <h3 className={cx('tit')}>Video</h3>
        <div className={cx('cont')}>
          <div 
            className={cx('file_box')} 
          >
            <input
              ref={fileInputRef}
              className={cx('file_inp')}
              type="file"
            />
            <p className={cx('txt')}>Drag and drop video file to upload</p>
            <button type="button" className={cx('btn_upload', 'disabled')} disabled>
              Upload video
              <UploadIcon />
            </button>
            <img
              className={cx('img_file')}
              src={`http://${StorageKeys.PATH}/api/v1/video/thumbnail/${videoCurrent.id}.png`}
              alt=""
            />
          </div>
          
        </div>
        <h4 className={cx('tit')}>Title</h4>
        <div className={cx('cont')}>
          <textarea ref={valueTitleVideo} className={cx('inp_text')} spellCheck="false" defaultValue={videoCurrent.title} required />
        </div>
        <h4 className={cx('tit')}>Link</h4>
        <div className={cx('cont')}>
          <textarea ref={valueLinkVideo} className={cx('inp_text')} spellCheck="false" defaultValue={videoCurrent.link} required />
        </div>
        {showProgress && <div className={cx('progress')}>
          <div className={cx('progress_bar')} ref={progressRef}></div>
        </div>}
        <p className={cx('file_message')} ref={uploadRef}></p>
        <button type="submit" className={cx('submit', showProgress && 'disabled')}>
          Update
        </button>
      </form>
    </div>
  )
}

export default Update