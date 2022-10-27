import classNames from 'classnames/bind';
import { useState } from 'react';
import { CupIcon, HelpIcon, PlateIcon } from '../../assets/Icons';
import Modal from '../../components/Modal';
import HelpModal from '../components/HelpModal';
import PushModal from '../components/PushModal';
import SpinModal from '../components/SpinModal';
import VideoSection from '../components/Video/VideoSection';
import styles from './HomePage.module.scss';

let cx = classNames.bind(styles);

const Homepage = () => {
  const [openHelp, setOpenHelp] = useState(false)
  const [openSpin, setOpenSpin] = useState(false)
  const [openPush, setOpenPush] = useState(false)
  const handleOpenHelpModal = () => {
    setOpenHelp(true)
  }
  const handleCloseHelpModal = () => {
    setOpenHelp(false)
  }
  const handleOpenSpinModal = () => {
    setOpenSpin(true)
  }
  const handleCloseSpinModal = () => {
    setOpenSpin(false)
  }
  const handleOpenPushModal = () => {
    setOpenPush(true)
  }
  const handleClosePushModal = () => {
    setOpenPush(false)
  }
  return (
    <>
      <div className={cx('wrapper')}>
        <VideoSection />
        <div className={cx('group')}>
          <button type='button' className={cx('btn', 'get_spin')} onClick={handleOpenSpinModal}>Get more spin turns</button>
          <button type='button' className={cx('btn', 'push')} onClick={handleOpenPushModal} >Push Ads</button>
          <button type='button' className={cx('btn', 'add')}>
            +1000
            <PlateIcon className={cx('icon_plate')} />
          </button>
        </div>
        <div className={cx('reward')}>
          <CupIcon className={cx('icon_cup')} />
          10.000 USD
          <button className={cx('btn_help')} onClick={handleOpenHelpModal}>
            <HelpIcon className={cx('icon_help')} />
          </button>
        </div>
      </div>
      {openHelp &&
        <Modal onChange={handleCloseHelpModal} >
          <HelpModal />
        </Modal>
      }

      {openSpin &&
        <Modal onChange={handleCloseSpinModal} >
          <SpinModal />
        </Modal>
      }

      {openPush &&
        <Modal onChange={handleClosePushModal} >
          <PushModal />
        </Modal>
      }
    </>
  )

};

export default Homepage;
