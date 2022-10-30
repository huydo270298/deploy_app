import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './Countdown.module.scss';

let cx = classNames.bind(styles);
const Countdown = ({ time }) => {

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setInterval(() => {
            const now = moment();
            const then = moment(time);
            const countdown = moment(then - now);
            setHours(countdown.format('HH'));
            setMinutes(countdown.format('mm'));
            setSeconds(countdown.format('ss'));
        }, 1000);
    }, [time]);

    return (
        <div className={cx('wrapper')}>
            Officially active:
            <p className={cx('num')}>
                {hours} : {minutes} : {seconds}
            </p>
        </div>
    )
}

export default Countdown