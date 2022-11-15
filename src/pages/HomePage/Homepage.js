import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import videoApi from '../../api/videoApi';
import { CupIcon, HelpIcon, PlateIcon } from '../../assets/Icons';
import Modal from '../../components/Modal';
import HelpModal from '../components/HelpModal';
import MissionModal from '../components/MissionModal';
import PushModal from '../components/PushModal';
import SpinModal from '../components/SpinModal';
import VideoSection from '../components/Video/VideoSection';
import styles from './HomePage.module.scss';

let cx = classNames.bind(styles);

const HomePage = () => {
  const { t } = useTranslation();

  const [openHelp, setOpenHelp] = useState(false)
  const [openSpin, setOpenSpin] = useState(false)
  const [openPush, setOpenPush] = useState(false)
  const [openMission, setOpenMission] = useState(false)
  const [video, setVideo] = useState([])

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

  const handleOpenMissionModal = () => {
    setOpenMission(true)
  }
  const handleCloseMisionModal = () => {
    setOpenMission(false)
  }

  // get add video
  useEffect(() => {
    
    videoApi.getCategoryList()
      .then((reponse) => {
        return reponse.data[0].id
      })
      .then((id) => {
        return videoApi.getCategoryItem(id)
      })
      .then((reponse) => {
        const listId = reponse.data.map((item) => {
          return item.id
        })
        setVideo(listId);
      })
  }, [])

  const countReward = useRef(null);

  const [num, setNum] = useState(0);
  useEffect(() => {
    countReward.current = setInterval(() => {
      setNum((countdown) => countdown + 1);
    }, 200);

    num > 10000000000000 && clearTimeout(countReward.current);
    num > 10000000000000 && setNum(0);

    return () => {
      clearTimeout(countReward.current);
    }
  }, [num])
  
  return (
    <>
      <div className={cx('wrapper')}>
        <VideoSection video={video} />
        <div className={cx('group')}>
          <button type='button' className={cx('btn', 'get_spin')} onClick={handleOpenSpinModal}>{t("GET_MORE")}</button>
          <button type='button' className={cx('btn', 'push')} onClick={handleOpenPushModal} >{t("PUSH_ADS")}</button>
          <button type='button' className={cx('btn', 'add')} onClick={handleOpenMissionModal} >
            +1000
            <PlateIcon className={cx('icon_plate')} />
          </button>
        </div>
        <div className={cx('reward')}>
          <CupIcon className={cx('icon_cup')} />
          {num} USD
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

      {openMission &&
        <Modal onChange={handleCloseMisionModal} >
          <MissionModal />
        </Modal>
      }
    </>
  )

};

export default HomePage;
