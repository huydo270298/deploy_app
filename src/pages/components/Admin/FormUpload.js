import React, { useEffect, useRef, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { UploadIcon } from '../../../assets/Icons';

let cx = classNames.bind(styles);

const FormUpload = (props) => {
  const [files, setFiles] = useState([]);
  const valueSubmit = {
    video: null,
    videoName: '',
    videoDescription: '',
  }
  const {getRootProps, getInputProps, open} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: {
      'video/*': ['.mp4']
    },
    onDrop: acceptedFiles => {
      
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => {
    return (
      <video className={cx('img_thumb')} key={file.path} src={`${file.preview}#t=8`} onLoad={() => { URL.revokeObjectURL(file.preview) }} />
    )
  }
  );

  const valueTitleVideo = useRef('')
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(1);
    files.forEach((file) => {
      valueSubmit.video = file;
      valueSubmit.videoName = valueTitleVideo.current.value;
      valueSubmit.videoDescription = '';
    })
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(valueSubmit);
    }
  };

  // console.log(valueSubmit);

  return (
    <form className={cx('form')} onSubmit={handleSubmit} enctype="multipart/form-data">
      <h3 className={cx('tit')}>Video</h3>
      <div className={cx('cont')}>
        <div className={cx('file_box')}>
          <div {...getRootProps({className: cx('area')})}>
            <input {...getInputProps()} />
            <p className={cx('txt')}>Drag and drop video file to upload</p>
            <button type="button" className={cx('btn_upload')} onClick={open}>
              Upload video
              <UploadIcon />
            </button>
          </div>
          {files.length>0 && <div className={cx('img_file')}>
            {thumbs}
          </div>}
        </div>
        
      </div>
      <h4 className={cx('tit')}>Video title</h4>
      <div className={cx('cont')}>
        <textarea ref={valueTitleVideo} className={cx('inp_text')} spellCheck="false" defaultValue='abc' />
      </div>
      <button type="submit" className={cx('submit')}>
        Public
      </button>
    </form>
  )
}

export default FormUpload