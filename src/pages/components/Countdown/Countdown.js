import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Countdown.module.scss';

let cx = classNames.bind(styles);
const Countdown = ({ time }) => {
    const eventNow = Date.now();
    const eventTime = new Date(time).getTime()
    const secontCoudown = Math.floor((eventTime - eventNow)/1000);
    const [duration, setDuration] = useState(secontCoudown);
    
    const countTimer = useRef(null);

    useEffect(() => {
        countTimer.current = setTimeout(() => {
            setDuration((countdown) => countdown - 1);
        }, 1000);
    
        duration < 0 && clearTimeout(countTimer.current);
      return () => {
        clearTimeout(countTimer.current);
      }
    }, [duration])
    
    return (
        <div className={cx('wrapper')}>
            Officially active:
            <p className={cx('num')}>
                {new Date(duration * 1000).toISOString().substring(11, 19)}s
            </p>
        </div>
    )
}

export default Countdown