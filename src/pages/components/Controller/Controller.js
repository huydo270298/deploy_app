import classNames from 'classnames/bind'
import React, { useRef } from 'react'
import { PipIcon, PlateIcon, PlayIcon, PrevIcon, SaveActiveIcon, SaveIcon, SkipIcon } from '../../../assets/Icons'
import styles from './Controller.module.scss'

let cx = classNames.bind(styles)

const Controller = (props) => {

  const {
    duration,
    prograssValue,
    handlePrev,
    handleNext,
    handlePlay,
    handlePip,
    bookmark,
    handleClickBookMark,
    play,
    listVideo,
    currentPlay,
    countdown
  } = props;

  const inputEl = useRef();
  let currentThumb = prograssValue / duration * 100 || 0;
  return (
    <div className={cx('wrapper')}>
      <button type='button' className={cx('btn', 'bookmark')} onClick={handleClickBookMark}>
        {bookmark ? <SaveActiveIcon className={cx('icon_bookmark')} /> : <SaveIcon className={cx('icon_bookmark')} />}
      </button>
      {!play && <button type='button' className={cx('btn', 'play')} onClick={handlePlay}>
        <PlayIcon className={cx('icon_play')} />
      </button>}
      {currentPlay !== (listVideo.length - 1) &&
        <button type='button' className={cx('skip', !(countdown >= 0) && 'active')} onClick={handleNext}>
          {countdown >= 0 ? `${countdown}s` : 'SKIP'}
          <PlateIcon className={cx('icon', 'icon_plate')} />
          <SkipIcon />
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
          style={{ 'backgroundSize': `${currentThumb}% 100%` }}
        />
      </div>
      <div className={cx('group')}>
        <button type='button' className={cx('btn', currentPlay === 0 && 'disable')} onClick={handlePrev}>
          <PrevIcon className={cx('icon')} />
        </button>
        <button type='button' className={cx('btn')} onClick={handlePip}>
          <PipIcon className={cx('icon')} />
        </button>
      </div>
    </div>
  )
}

export default Controller