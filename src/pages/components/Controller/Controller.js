import classNames from 'classnames/bind'
import React, { useRef } from 'react'
import styles from './Controller.module.scss'

let cx = classNames.bind(styles)

const Controller = (props) => {

  const {
          duration,
          prograssValue, 
          handlePrev, 
          handleNext,
          handlePip,
          bookmark,
          handleClickBookMark,
          video,
          listVideo,
          countdown
        } = props;

  const inputEl = useRef();
  let currentThumb = prograssValue/duration*100 || 0;
  return (
    <div className={cx('wrapper')}>
      <button type='button' className={cx('btn', 'bookmark', bookmark && 'active')} onClick={handleClickBookMark}>
        <i className={cx('icon_bookmark')}></i>
      </button>
      {/* <button type='button' className={cx('btn', 'prev', video === 0 && 'disable' )} onClick={handlePrev}>
        <i className={cx('icon_prev')}></i>
      </button> */}
      { video !== (listVideo.length - 1) && 
        <button type='button' className={cx('skip', !(countdown >= 0) && 'active')} onClick={handleNext}>
          {countdown >= 0 ? `${countdown}s` : 'SKIP'}
          <i className={cx('icon_plate')}></i>
          <i className={cx('icon_skip')}></i>
        </button>
      }
      <div className={cx('progress')}>
        <input
          ref={inputEl}
          type="range"
          className={cx('input')}
          min={0}
          max={100}
          step={0.1}
          value={currentThumb.toFixed(2)}
          readOnly
          style={{'backgroundSize': `${currentThumb}% 100%`}}
        />
      </div>
      <div className={cx('group')}>
        <button type='button' className={cx('btn', video === 0 && 'disable')} onClick={handlePrev}>
          <i className={cx('icon', 'icon_controller_prev')} />
        </button>
        <button type='button' className={cx('btn')} onClick={handlePip}>
          <i className={cx('icon', 'icon_pip')} />
        </button>
      </div>
    </div>
  )
}

export default Controller