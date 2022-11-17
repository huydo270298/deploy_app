import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import {
  generateVideoThumbnails
} from "@rajesh896/video-thumbnails-generator";
import styles from './Admin.module.scss';
import { UploadIcon } from '../../../assets/Icons';
import StorageKeys from '../../../constants/storage-keys';

let cx = classNames.bind(styles);

const FormUpload = () => {

  const valueTitleVideo = useRef('');
  const valueLinkVideo = useRef('');
  const fileInputRef = useRef();
  const progressRef = useRef();
  const uploadRef = useRef();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    let filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const dragOver = (e) => {
    preventDefault(e);
  };

  const dragEnter = (e) => {
    preventDefault(e);
  };

  const dragLeave = (e) => {
    preventDefault(e);
  };

  const fileDrop = (e) => {
    preventDefault(e);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFiles = (files) => {
    uploadRef.current.innerHTML = "";
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        generateVideoThumbnails(files[i]).then((thumbs) => {
          setThumbnails(thumbs);
        });
        let name = files[i].name;
        valueTitleVideo.current.value = name.slice(0, name.length - 4)
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("File type not permitted");
      }
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      "video/mp4"
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    let token = localStorage.getItem(StorageKeys.TOKEN);
    e.preventDefault();
    setShowProgress(true);
    uploadRef.current.innerHTML = "File Uploading...";
    for (let i = 0; i < validFiles.length; i++) {
      const formData = new FormData();
      formData.append("video", validFiles[i]);
      formData.append("videoName", valueTitleVideo.current.value);
      formData.append("videoDescription", valueLinkVideo.current.value);
      formData.append("idCategory", '63763ea761ea7a42deba7fad');
      axios
        .post(`http://${StorageKeys.PATH}/api/v1/video/upload` , formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            progressRef.current.style.width = `${uploadPercentage}%`;
            if (uploadPercentage === 100) {
              validFiles.length = 0;
              uploadRef.current.innerHTML = "File Uploaded";
              setValidFiles([...validFiles]);
              setSelectedFiles([...validFiles]);
              setShowProgress(false)
            }
          }
        })
        .catch(() => {
          progressRef.current.style.backgroundColor = "red";
        });
    }
  };

  return (
    <form className={cx('form')} onSubmit={handleSubmit} encType="multipart/form-data">
      <h3 className={cx('tit')}>Video</h3>
      <div className={cx('cont')}>
        <div 
          className={cx('file_box')} 
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <input
            ref={fileInputRef}
            className={cx('file_inp')}
            type="file"
            onChange={filesSelected}
          />
          <p className={cx('txt')}>Drag and drop video file to upload</p>
          <button type="button" className={cx('btn_upload')} onClick={fileInputClicked}>
            Upload video
            <UploadIcon />
          </button>
          {thumbnails.map((item, index) => {
            return (
              <img
                className={cx('img_file')}
                key={index}
                src={item}
                alt=""
              />
            );
          })}
        </div>
        
      </div>
      <h4 className={cx('tit')}>Title</h4>
      <div className={cx('cont')}>
        <textarea ref={valueTitleVideo} className={cx('inp_text')} spellCheck="false" defaultValue='' required />
      </div>
      <h4 className={cx('tit')}>Link</h4>
      <div className={cx('cont')}>
        <textarea ref={valueLinkVideo} className={cx('inp_text')} spellCheck="false" defaultValue='' required />
      </div>
      {showProgress && <div className={cx('progress')}>
        <div className={cx('progress_bar')} ref={progressRef}></div>
      </div>}
      <p className={cx('file_message', errorMessage && 'error')} ref={uploadRef}>{errorMessage}</p>
      <button type="submit" className={cx('submit', showProgress && 'disabled')}>
        Public
      </button>
    </form>
  )
}

export default FormUpload